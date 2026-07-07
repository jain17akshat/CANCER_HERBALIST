/**
 * orderActions.js
 * Customer-facing post-purchase order management endpoints.
 */

const express = require('express');
const router  = express.Router();
const Razorpay = require('razorpay');
const { 
  getOrderById, 
  getOrdersByContact, 
  getEventsByOrderId, 
  getRefundByOrderId,
  saveOrder, 
  addOrderEvent, 
  updateOrderStatus 
} = require('./ordersDb');
const { ORDER_STATUSES, ORDER_STATUS_LABELS } = require('./orderStatuses');
const { sendStatusNotificationEmail } = require('./emailService');

// Initialize Razorpay SDK for payment retries
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * POST /api/orders/track
 * Secure tracking lookup that requires Order ID AND either phone or email verification.
 */
router.post('/orders/track', async (req, res) => {
  try {
    const { orderId, contact } = req.body;

    if (!orderId || !contact) {
      return res.status(400).json({ success: false, error: 'Please provide both Order ID and Phone/Email.' });
    }

    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found. Please verify details.' });
    }

    // Verify phone or email match
    const cleanContact = String(contact).trim().toLowerCase();
    const phoneMatch   = String(order.phone).trim() === cleanContact;
    const emailMatch   = String(order.email).trim().toLowerCase() === cleanContact;

    if (!phoneMatch && !emailMatch) {
      return res.status(401).json({ success: false, error: 'Verification failed. The contact details do not match this Order ID.' });
    }

    // Fetch order history events and refund status (if any)
    const events = getEventsByOrderId(orderId);
    const refund = getRefundByOrderId(orderId);

    // Return sanitized data
    res.json({
      success: true,
      order,
      events: events.map(e => ({
        status: e.status,
        customerMessage: e.customerMessage,
        createdAt: e.createdAt
      })),
      refund
    });

  } catch (err) {
    console.error('[orders/track]', err.message);
    res.status(500).json({ success: false, error: 'Failed to retrieve tracking details.' });
  }
});

/**
 * POST /api/orders/cancel
 * Request cancellation of an order before shipment.
 */
router.post('/orders/cancel', async (req, res) => {
  try {
    const { orderId, contact, reason, comments } = req.body;

    if (!orderId || !contact || !reason) {
      return res.status(400).json({ success: false, error: 'Missing required cancellation fields.' });
    }

    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    // Verification check
    const cleanContact = String(contact).trim().toLowerCase();
    if (String(order.phone).trim() !== cleanContact && String(order.email).trim().toLowerCase() !== cleanContact) {
      return res.status(401).json({ success: false, error: 'Verification failed. Contact details mismatch.' });
    }

    // Eligibility check
    const nonCancelableStatuses = [
      ORDER_STATUSES.SHIPPED,
      ORDER_STATUSES.OUT_FOR_DELIVERY,
      ORDER_STATUSES.DELIVERED,
      ORDER_STATUSES.DELIVERY_FAILED,
      ORDER_STATUSES.CANCELLED,
      ORDER_STATUSES.CANCELLATION_REQUESTED
    ];

    if (nonCancelableStatuses.includes(order.orderStatus)) {
      return res.status(400).json({ success: false, error: `This order is in status ${ORDER_STATUS_LABELS[order.orderStatus]} and cannot be canceled.` });
    }

    // Set cancellation status
    order.cancellationStatus = 'REQUESTED';
    order.orderStatus = ORDER_STATUSES.CANCELLATION_REQUESTED;
    saveOrder(order);

    addOrderEvent(
      orderId, 
      'CANCELLATION', 
      ORDER_STATUSES.CANCELLATION_REQUESTED, 
      'Your order cancellation request has been submitted and is under review.',
      { reason, comments }
    );

    // Notify customer
    await sendStatusNotificationEmail(
      order, 
      ORDER_STATUSES.CANCELLATION_REQUESTED, 
      `Your cancellation request for order ${orderId} has been received. Reason: ${reason}. Our team will review and approve it shortly.`
    );

    res.json({ success: true, message: 'Cancellation request submitted.' });

  } catch (err) {
    console.error('[orders/cancel]', err.message);
    res.status(500).json({ success: false, error: 'Failed to submit cancellation request.' });
  }
});

/**
 * POST /api/orders/return
 * Request a return/refund after delivery.
 */
router.post('/orders/return', async (req, res) => {
  try {
    const { orderId, contact, reason, comments, evidenceImage } = req.body;

    if (!orderId || !contact || !reason) {
      return res.status(400).json({ success: false, error: 'Missing required return request fields.' });
    }

    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    // Verification check
    const cleanContact = String(contact).trim().toLowerCase();
    if (String(order.phone).trim() !== cleanContact && String(order.email).trim().toLowerCase() !== cleanContact) {
      return res.status(401).json({ success: false, error: 'Verification failed. Contact details mismatch.' });
    }

    // Return request eligibility window: must be DELIVERED
    if (order.orderStatus !== ORDER_STATUSES.DELIVERED) {
      return res.status(400).json({ success: false, error: 'Returns can only be requested for delivered orders.' });
    }

    if (order.returnStatus === 'REQUESTED' || order.returnStatus === 'APPROVED') {
      return res.status(400).json({ success: false, error: 'A return has already been requested or approved for this order.' });
    }

    // Update return status
    order.returnStatus = 'REQUESTED';
    order.orderStatus = ORDER_STATUSES.RETURN_REQUESTED;
    saveOrder(order);

    addOrderEvent(
      orderId, 
      'RETURN', 
      ORDER_STATUSES.RETURN_REQUESTED, 
      'Your return request has been submitted. Our team is reviewing the details.',
      { reason, comments, hasEvidence: !!evidenceImage }
    );

    // Notify customer
    await sendStatusNotificationEmail(
      order, 
      ORDER_STATUSES.RETURN_REQUESTED, 
      `Your return request for order ${orderId} has been successfully submitted. Our team will review the request and get back to you within 24-48 hours.`
    );

    res.json({ success: true, message: 'Return request submitted successfully.' });

  } catch (err) {
    console.error('[orders/return]', err.message);
    res.status(500).json({ success: false, error: 'Failed to submit return request.' });
  }
});

/**
 * POST /api/orders/retry-payment
 * Allows retrying payment on failed or pending prepaid orders.
 */
router.post('/orders/retry-payment', async (req, res) => {
  try {
    const { orderId, contact } = req.body;

    if (!orderId || !contact) {
      return res.status(400).json({ success: false, error: 'Order ID and contact details are required.' });
    }

    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    // Verification check
    const cleanContact = String(contact).trim().toLowerCase();
    if (String(order.phone).trim() !== cleanContact && String(order.email).trim().toLowerCase() !== cleanContact) {
      return res.status(401).json({ success: false, error: 'Verification failed. Contact details mismatch.' });
    }

    // Only allow retry if payment is pending/failed
    if (order.paymentStatus === 'PAID') {
      return res.status(400).json({ success: false, error: 'This order is already paid.' });
    }

    // Create a new Razorpay order
    const options = {
      amount:   Math.round(Number(order.orderAmount) * 100), // paise
      currency: 'INR',
      receipt:  `ch_retry_${Date.now()}`,
      notes: { 
        productName: order.productName, 
        productId: order.productId, 
        customerName: order.customerName, 
        phone: order.phone, 
        email: order.email,
        originalOrderId: order.orderId
      },
    };

    const rzpOrder = await razorpay.orders.create(options);

    // Update order with new Razorpay order ID
    order.razorpayOrderId = rzpOrder.id;
    saveOrder(order);

    res.json({
      success:  true,
      orderId:  rzpOrder.id,
      amount:   rzpOrder.amount,
      currency: rzpOrder.currency,
      key:      process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    console.error('[orders/retry-payment]', err.message);
    res.status(500).json({ success: false, error: 'Could not regenerate payment token. Check Razorpay keys.' });
  }
});

/**
 * POST /api/orders/lookup
 * Allows a customer to retrieve all their order IDs by providing phone or email.
 */
router.post('/orders/lookup', async (req, res) => {
  try {
    const { contact } = req.body;
    if (!contact) {
      return res.status(400).json({ success: false, error: 'Contact detail (phone/email) is required.' });
    }

    const orders = getOrdersByContact(contact);
    
    // Return sanitized list of orders
    const sanitizedOrders = orders.map(o => ({
      orderId: o.orderId,
      orderDate: o.orderDate,
      productName: o.productName,
      orderAmount: o.orderAmount,
      orderStatus: o.orderStatus,
      paymentStatus: o.paymentStatus,
      createdAt: o.createdAt
    }));

    res.json({
      success: true,
      orders: sanitizedOrders
    });

  } catch (err) {
    console.error('[orders/lookup]', err.message);
    res.status(500).json({ success: false, error: 'Failed to retrieve orders.' });
  }
});

module.exports = router;
