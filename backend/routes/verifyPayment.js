const express = require('express');
const crypto  = require('crypto'); // built-in — no install needed
const router  = express.Router();
const Razorpay = require('razorpay');
const { createShiprocketOrder }         = require('./shiprocket');
const { validateOrderAmount }           = require('./priceList');
const { pushOrderToZoho }               = require('./zoho');
const { sendOrderConfirmationEmails }   = require('./emailService');

/* Razorpay SDK — for fetching order amount post-payment */
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * POST /api/verify-payment
 *
 * Verifies Razorpay signature, records order to Google Sheets,
 * and creates a Shiprocket shipment automatically.
 *
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature,
 *         customerName, phone, email, address, city, state, pincode,
 *         productName, productId, quantity, unitPrice, orderAmount }
 */
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName, phone, email,
      address, city, state, pincode,
      productName, productId,
      quantity, unitPrice, orderAmount,
    } = req.body;

    /* ── 1. Guard: all payment fields must be present ──────────── */
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing payment verification fields.' });
    }

    /* ── 1a. Verify Razorpay HMAC signature ─────────────────────── */
    const body             = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSig      = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Payment verification failed — signature mismatch.' });
    }

    /* ── 1b. Re-fetch order from Razorpay to confirm actual amount ─ */
    const rzOrder = await razorpay.orders.fetch(razorpay_order_id);
    const actualPaidAmountINR = rzOrder.amount / 100; // Razorpay stores in paise
    if (Math.abs(actualPaidAmountINR - Number(orderAmount)) > 1) {
      console.warn(`[verify-payment] Amount mismatch: Razorpay=₹${actualPaidAmountINR}, client=₹${orderAmount}`);
      return res.status(400).json({ success: false, error: 'Payment amount mismatch. Please contact support.' });
    }

    /* ── 1c. Server-side price validation (prevents price tampering) */
    const priceCheck = validateOrderAmount(productId, quantity, orderAmount);
    if (!priceCheck.valid) {
      console.warn(`[verify-payment] Price validation failed: ${priceCheck.reason}`);
      return res.status(400).json({ success: false, error: 'Invalid order details. Please contact support.' });
    }

    /* ── 2. Build internal order reference ─────────────────────── */
    const orderId   = `CH-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const orderDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const orderRow  = {
      orderId, customerName, phone, email,
      address, city, state, pincode,
      productName, productId, quantity, unitPrice, orderAmount,
      paymentMethod:      'Online - Razorpay',
      razorpayOrderId:    razorpay_order_id,
      razorpayPaymentId:  razorpay_payment_id,
      paymentStatus:      'PAID',
      orderDate,
    };

    /* ── 3. Execute integrations in parallel (necessary for Vercel serverless environment) ── */
    const promises = [];

    // Google Sheets
    if (process.env.APPS_SCRIPT_URL) {
      const sheetsPromise = (async () => {
        try {
          const url = new URL(process.env.APPS_SCRIPT_URL);
          Object.entries(orderRow).forEach(([k, v]) => url.searchParams.append(k, String(v ?? '')));
          const res = await fetch(url.toString());
          if (!res.ok) console.warn('[verify] Sheets returned status:', res.status);
        } catch (e) {
          console.warn('[verify] Sheets error:', e.message);
        }
      })();
      promises.push(sheetsPromise);
    }

    // Shiprocket
    if (process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD) {
      const shiprocketPromise = (async () => {
        try {
          const srData = await createShiprocketOrder(orderRow);
          console.log(`[verify-payment] Shiprocket order created: ${srData.order_id || srData.id}`);
        } catch (srErr) {
          console.error('[verify-payment] Shiprocket error:', srErr.message);
        }
      })();
      promises.push(shiprocketPromise);
    } else {
      console.warn('[verify-payment] SHIPROCKET_EMAIL/PASSWORD not set — skipping Shiprocket.');
    }

    // Zoho CRM
    if (process.env.ZOHO_CLIENT_ID && process.env.ZOHO_REFRESH_TOKEN) {
      const zohoPromise = (async () => {
        try {
          await pushOrderToZoho(orderRow);
        } catch (err) {
          console.error('[verify-payment] Zoho CRM error:', err.message);
        }
      })();
      promises.push(zohoPromise);
    }

    // Email confirmation (customer + admin)
    promises.push(sendOrderConfirmationEmails(orderRow));

    // Wait for all integrations to finish before sending response (prevent serverless termination)
    await Promise.all(promises);

    /* ── 4. Respond success ─────────────────────────────────────── */
    res.json({ success: true, orderId, paymentId: razorpay_payment_id });

  } catch (err) {
    console.error('[verify-payment]', err.message);
    res.status(500).json({ success: false, error: 'Payment verification failed.' });
  }
});

module.exports = router;
