const express = require('express');
const router  = express.Router();
const { createShiprocketOrder }         = require('./shiprocket');
const { validateOrderAmount }           = require('./priceList');
const { pushOrderToZoho }               = require('./zoho');
const { sendOrderConfirmationEmails }   = require('./emailService');
const { saveOrder, addOrderEvent, updateOrderStatus, getOrderById } = require('./ordersDb');
const { ORDER_STATUSES } = require('./orderStatuses');

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

    // Phone: exactly 10 digits
    if (!/^\d{10}$/.test(String(phone).trim())) {
      return res.status(400).json({ success: false, error: 'Invalid phone number. Must be 10 digits.' });
    }
    // Pincode: exactly 6 digits (if provided)
    if (pincode && !/^\d{6}$/.test(String(pincode).trim())) {
      return res.status(400).json({ success: false, error: 'Invalid pincode. Must be 6 digits.' });
    }
    // Email: basic format check (if provided)
    if (email && !/\S+@\S+\.\S+/.test(String(email).trim())) {
      return res.status(400).json({ success: false, error: 'Invalid email address.' });
    }
    // customerName: no script tags
    if (/<[^>]*>/.test(customerName)) {
      return res.status(400).json({ success: false, error: 'Invalid characters in name.' });
    }

    /* ── 1b. Server-side price validation (prevents price tampering) ── */
    const priceCheck = validateOrderAmount(productId, quantity, orderAmount);
    if (!priceCheck.valid) {
      console.warn(`[submit-order] Price validation failed: ${priceCheck.reason}`);
      return res.status(400).json({ success: false, error: 'Invalid order details. Please refresh and try again.' });
    }

    /* ── 2. Build internal order record ───────────────────────────── */
    const orderId   = `CH-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const orderDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const orderRow = {
      orderId, customerName, phone, email,
      address, city, state, pincode,
      productName, productId,
      quantity: Number(quantity) || 1, 
      unitPrice: Number(unitPrice) || Number(orderAmount), 
      orderAmount: Number(orderAmount),
      paymentMethod: paymentMethod || 'COD / Bank Transfer',
      paymentStatus: 'COD_PENDING',
      orderStatus: ORDER_STATUSES.ORDER_PLACED,
      shipmentStatus: null,
      cancellationStatus: null,
      returnStatus: null,
      refundStatus: null,
      shiprocketOrderId: null,
      shipmentId: null,
      awb: null,
      courierId: null,
      courierName: null,
      trackingUrl: null,
      estimatedDeliveryDate: null,
      latestStatus: null,
      lastSyncedAt: null,
      orderDate,
    };

    // Save order immediately as PLACED
    saveOrder(orderRow);
    addOrderEvent(orderId, 'STATUS_UPDATE', ORDER_STATUSES.ORDER_PLACED, 'Your order has been successfully placed. We are preparing it for confirmation.');

    /* ── 3. Execute integrations in parallel (necessary for Vercel serverless environment) ── */
    const promises = [];

    // Google Sheets
    if (process.env.APPS_SCRIPT_URL) {
      const sheetsPromise = (async () => {
        try {
          const url = new URL(process.env.APPS_SCRIPT_URL);
          Object.entries(orderRow).forEach(([k, v]) =>
            url.searchParams.append(k, String(v ?? ''))
          );
          const res = await fetch(url.toString());
          if (!res.ok) console.warn('[submit-order] Sheets returned status:', res.status);
        } catch (e) {
          console.warn('[submit-order] Sheets error:', e.message);
        }
      })();
      promises.push(sheetsPromise);
    }

    // Shiprocket
    let shiprocketOrderId = null;
    let shipmentId = null;
    let awb = null;
    let courierName = null;
    let trackingUrl = null;

    if (process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD) {
      const shiprocketPromise = (async () => {
        try {
          const srData = await createShiprocketOrder(orderRow);
          shiprocketOrderId = srData.order_id || srData.id || null;
          shipmentId = srData.shipment_id || null;
          awb = srData.awb_code || null;
          courierName = srData.courier_name || null;
          trackingUrl = srData.tracking_url || null;

          console.log(`[submit-order] Shiprocket order created: ${shiprocketOrderId}, shipment: ${shipmentId}`);
          
          // Update DB with Shiprocket details
          const order = getOrderById(orderId);
          if (order) {
            order.shiprocketOrderId = shiprocketOrderId;
            order.shipmentId = shipmentId;
            order.awb = awb;
            order.courierName = courierName;
            order.trackingUrl = trackingUrl;
            if (awb) order.shipmentStatus = 'AWB_ASSIGNED';
            saveOrder(order);
          }
        } catch (srErr) {
          console.error('[submit-order] Shiprocket error:', srErr.message);
          const order = getOrderById(orderId);
          if (order) {
            order.orderStatus = ORDER_STATUSES.SHIPMENT_CREATION_FAILED;
            saveOrder(order);
            addOrderEvent(orderId, 'SYSTEM_ERROR', ORDER_STATUSES.SHIPMENT_CREATION_FAILED, 'Fulfillment creation failed. Our support team will manually process it.', { error: srErr.message });
          }
        }
      })();
      promises.push(shiprocketPromise);
    } else {
      console.warn('[submit-order] SHIPROCKET_EMAIL/PASSWORD not set — skipping Shiprocket.');
    }

    // Zoho CRM
    if (process.env.ZOHO_CLIENT_ID && process.env.ZOHO_REFRESH_TOKEN) {
      const zohoPromise = (async () => {
        try {
          await pushOrderToZoho(orderRow);
        } catch (err) {
          console.error('[submit-order] Zoho CRM error:', err.message);
        }
      })();
      promises.push(zohoPromise);
    }

    // Wait for all integrations to finish before sending response (prevent serverless termination)
    await Promise.all(promises);

    // Update order status to CONFIRMED
    const updatedOrder = getOrderById(orderId);
    if (updatedOrder && updatedOrder.orderStatus !== ORDER_STATUSES.SHIPMENT_CREATION_FAILED) {
      updateOrderStatus(orderId, ORDER_STATUSES.ORDER_CONFIRMED, 'Your order has been confirmed. We are scheduling it for shipment.');
    }

    // Email confirmation (customer + admin) - sent ONLY after backend has successfully processed everything
    const finalOrder = getOrderById(orderId) || orderRow;
    await sendOrderConfirmationEmails(finalOrder);

    /* ── 4. Respond ───────────────────────────────────────────────── */
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
