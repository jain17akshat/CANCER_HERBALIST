const express = require('express');
const crypto  = require('crypto'); // built-in — no install needed
const router  = express.Router();
const { createShiprocketOrder } = require('./shiprocket');

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

    /* ── 1. Verify Razorpay signature ─────────────────────────── */
    const body             = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSig      = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Payment verification failed — signature mismatch.' });
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

    /* ── 3. Record to Google Sheets (via Apps Script) ──────────── */
    if (process.env.APPS_SCRIPT_URL) {
      try {
        const url = new URL(process.env.APPS_SCRIPT_URL);
        Object.entries(orderRow).forEach(([k, v]) => url.searchParams.append(k, String(v ?? '')));
        // fire-and-forget
        fetch(url.toString()).catch(() => {});
      } catch (e) {
        console.warn('[verify] Sheets error:', e.message);
      }
    }

    /* ── 4. Create Shiprocket order ────────────────────────────── */
    if (process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD) {
      try {
        const srData = await createShiprocketOrder(orderRow);
        console.log(`[verify-payment] Shiprocket order created: ${srData.order_id || srData.id}`);
      } catch (srErr) {
        // Non-fatal — payment is already verified; log and continue
        console.error('[verify-payment] Shiprocket error:', srErr.message);
      }
    } else {
      console.warn('[verify-payment] SHIPROCKET_EMAIL/PASSWORD not set — skipping Shiprocket.');
    }

    /* ── 5. Respond success ─────────────────────────────────────── */
    res.json({ success: true, orderId, paymentId: razorpay_payment_id });

  } catch (err) {
    console.error('[verify-payment]', err.message);
    res.status(500).json({ success: false, error: 'Payment verification failed.' });
  }
});

module.exports = router;
