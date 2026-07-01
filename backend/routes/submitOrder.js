const express = require('express');
const router  = express.Router();
const { createShiprocketOrder } = require('./shiprocket');

/**
 * POST /api/submit-order
 *
 * Handles Cash-on-Delivery (COD) and offline/bank-transfer orders.
 * Records the order to Google Sheets (via Apps Script) and creates
 * a Shiprocket shipment — without any third-party automation tools.
 *
 * Body: {
 *   customerName, phone, email,
 *   address, city, state, pincode,
 *   productName, productId, quantity, unitPrice, orderAmount,
 *   paymentMethod   — e.g. "COD / Bank Transfer"
 * }
 *
 * Returns: { success, orderId, shiprocketOrderId }
 */
router.post('/submit-order', async (req, res) => {
  try {
    const {
      customerName, phone, email,
      address, city, state, pincode,
      productName, productId,
      quantity, unitPrice, orderAmount,
      paymentMethod,
    } = req.body;

    /* ── 1. Validate required fields ──────────────────────────────── */
    if (!customerName || !phone || !address || !orderAmount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required order fields.',
      });
    }

    /* ── 2. Build internal order record ───────────────────────────── */
    const orderId   = `CH-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const orderDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const orderRow = {
      orderId, customerName, phone, email,
      address, city, state, pincode,
      productName, productId,
      quantity, unitPrice, orderAmount,
      paymentMethod: paymentMethod || 'COD / Bank Transfer',
      paymentStatus: 'PENDING',
      orderDate,
    };

    /* ── 3. Record to Google Sheets (fire-and-forget) ─────────────── */
    if (process.env.APPS_SCRIPT_URL) {
      try {
        const url = new URL(process.env.APPS_SCRIPT_URL);
        Object.entries(orderRow).forEach(([k, v]) =>
          url.searchParams.append(k, String(v ?? ''))
        );
        fetch(url.toString()).catch(() => {});
      } catch (e) {
        console.warn('[submit-order] Sheets error:', e.message);
      }
    }

    /* ── 4. Create Shiprocket order ───────────────────────────────── */
    let shiprocketOrderId = null;

    if (process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD) {
      try {
        const srData = await createShiprocketOrder(orderRow);
        shiprocketOrderId = srData.order_id || srData.id || null;
        console.log(`[submit-order] Shiprocket order created: ${shiprocketOrderId}`);
      } catch (srErr) {
        // Non-fatal — log and continue so the customer still gets a confirmation
        console.error('[submit-order] Shiprocket error:', srErr.message);
      }
    } else {
      console.warn('[submit-order] SHIPROCKET_EMAIL/PASSWORD not set — skipping Shiprocket.');
    }

    /* ── 5. Respond ───────────────────────────────────────────────── */
    res.json({
      success: true,
      orderId,
      shiprocketOrderId,
    });

  } catch (err) {
    console.error('[submit-order]', err.message);
    res.status(500).json({ success: false, error: 'Failed to place order. Please try again.' });
  }
});

module.exports = router;
