/**
 * adminOrders.js
 * Admin-facing endpoints for managing order statuses, cancellation/return requests,
 * and processing refunds.
 */

const express = require('express');
const router  = express.Router();
const Razorpay = require('razorpay');
const { 
  getOrders, 
  getOrderById, 
  saveOrder, 
  addOrderEvent, 
  updateOrderStatus,
  getEventsByOrderId,
  getRefundByOrderId,
  saveRefund
} = require('./ordersDb');
const { ORDER_STATUSES, ORDER_STATUS_LABELS } = require('./orderStatuses');
const { sendStatusNotificationEmail } = require('./emailService');

// Initialize Razorpay SDK
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Admin auth check matching dynamicContent.js
const checkAdmin = (req, res, next) => {
  const key = req.query.key || req.headers['x-admin-key'];
  const adminSecret = process.env.ADMIN_SECRET || 'ch-admin-2024';
  if (key !== adminSecret) {
    return res.status(401).json({ success: false, error: 'Unauthorized.' });
  }
  next();
};

// Mount admin auth check on all routes in this file
router.use(checkAdmin);

/**
 * GET /api/admin/orders
 * List all orders with searching, sorting, and filtering.
 */
router.get('/admin/orders', async (req, res) => {
  try {
    const { search, orderStatus, paymentStatus, shipmentStatus, refundStatus } = req.query;
    let orders = getOrders();

    // 1. Filtering
    if (orderStatus) {
      orders = orders.filter(o => o.orderStatus === orderStatus);
    }
    if (paymentStatus) {
      orders = orders.filter(o => o.paymentStatus === paymentStatus);
    }
    if (shipmentStatus) {
      orders = orders.filter(o => o.shipmentStatus === shipmentStatus);
    }
    if (refundStatus) {
      orders = orders.filter(o => o.refundStatus === refundStatus);
    }

    // 2. Searching
    if (search) {
      const q = String(search).toLowerCase().trim();
      orders = orders.filter(o => 
        String(o.orderId).toLowerCase().includes(q) ||
        String(o.customerName).toLowerCase().includes(q) ||
        String(o.phone).includes(q) ||
        String(o.email).toLowerCase().includes(q)
      );
    }

    // Sort by createdAt descending (newest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, orders });

  } catch (err) {
    console.error('[admin/orders]', err.message);
    res.status(500).json({ success: false, error: 'Failed to retrieve orders.' });
  }
});

/**
 * GET /api/admin/orders/:orderId
 * Get single order details with complete event history and refund records.
 */
router.get('/admin/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    const events = getEventsByOrderId(orderId);
    const refund = getRefundByOrderId(orderId);

    res.json({ success: true, order, events, refund });

  } catch (err) {
    console.error('[admin/orders/:orderId]', err.message);
    res.status(500).json({ success: false, error: 'Failed to retrieve order details.' });
  }
});

/**
 * PUT /api/admin/orders/:orderId/cancellation
 * Approve or reject an order cancellation request.
 */
router.put('/admin/orders/:orderId/cancellation', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { approved, remarks, rejectionReason } = req.body;

    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    if (order.cancellationStatus !== 'REQUESTED') {
      return res.status(400).json({ success: false, error: 'No cancellation request pending for this order.' });
    }

    if (approved) {
      order.cancellationStatus = 'APPROVED';
      order.orderStatus = ORDER_STATUSES.CANCELLED;
      saveOrder(order);

      addOrderEvent(
        orderId, 
        'CANCELLATION', 
        ORDER_STATUSES.CANCELLED, 
        `Cancellation approved by administrator. Remarks: ${remarks || 'None'}`,
        { remarks }
      );

      // Cancel on Shiprocket if exists
      if (order.shiprocketOrderId) {
        try {
          const { cancelShiprocketOrder } = require('./shiprocket');
          await cancelShiprocketOrder(order.shiprocketOrderId);
          console.log(`[admin/cancellation] Order ${orderId} (Shiprocket: ${order.shiprocketOrderId}) cancelled on Shiprocket.`);
        } catch (srErr) {
          console.error(`[admin/cancellation] Failed to cancel order ${orderId} on Shiprocket:`, srErr.message);
          addOrderEvent(
            orderId, 
            'SYSTEM_ERROR', 
            order.orderStatus, 
            `Failed to cancel shipment on Shiprocket: ${srErr.message}`
          );
        }
      }

      // Trigger refund flow if prepaid
      if (order.paymentMethod.toLowerCase().includes('online') && order.paymentStatus === 'PAID') {
        order.refundStatus = 'APPROVED';
        saveOrder(order);

        const refundData = {
          refundId: `RF-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
          orderId,
          amount: order.orderAmount,
          method: 'Razorpay',
          status: 'APPROVED',
          reason: 'Order Cancelled by Customer',
          approvedAt: new Date().toISOString()
        };
        saveRefund(refundData);

        addOrderEvent(
          orderId, 
          'REFUND', 
          ORDER_STATUSES.REFUND_APPROVED, 
          `Refund of ₹${order.orderAmount} approved for cancelled order. Ready to initiate.`
        );

        await sendStatusNotificationEmail(
          order, 
          ORDER_STATUSES.CANCELLED, 
          `Your order cancellation request has been approved. Since this was a prepaid order, a refund of ₹${order.orderAmount} has been approved and will be initiated shortly.`
        );
      } else {
        // COD - close order
        order.orderStatus = ORDER_STATUSES.CANCELLED;
        saveOrder(order);

        await sendStatusNotificationEmail(
          order, 
          ORDER_STATUSES.CANCELLED, 
          `Your order cancellation request has been approved. Your order ${orderId} has been cancelled successfully.`
        );
      }
    } else {
      order.cancellationStatus = 'REJECTED';
      order.orderStatus = ORDER_STATUSES.ORDER_CONFIRMED; // Restore to confirmed
      saveOrder(order);

      addOrderEvent(
        orderId, 
        'CANCELLATION', 
        ORDER_STATUSES.ORDER_CONFIRMED, 
        `Cancellation request rejected. Reason: ${rejectionReason || 'Not eligible.'}`,
        { rejectionReason }
      );

      // Recreate/create on Shiprocket if missing
      if (!order.shiprocketOrderId) {
        try {
          const { createShiprocketOrder } = require('./shiprocket');
          const srData = await createShiprocketOrder(order);
          order.shiprocketOrderId = srData.order_id || srData.id || null;
          order.shipmentId = srData.shipment_id || null;
          order.awb = srData.awb_code || null;
          order.courierName = srData.courier_name || null;
          order.trackingUrl = srData.tracking_url || null;
          if (order.awb) order.shipmentStatus = 'AWB_ASSIGNED';
          saveOrder(order);
          console.log(`[admin/cancellation] Order ${order.orderId} successfully created on Shiprocket: ${order.shiprocketOrderId}`);
        } catch (srErr) {
          console.error(`[admin/cancellation] Failed to create order ${order.orderId} on Shiprocket:`, srErr.message);
          addOrderEvent(
            orderId, 
            'SYSTEM_ERROR', 
            order.orderStatus, 
            `Failed to push shipment to Shiprocket: ${srErr.message}`
          );
        }
      }

      await sendStatusNotificationEmail(
        order, 
        ORDER_STATUSES.ORDER_CONFIRMED, 
        `Your order cancellation request was reviewed and declined. Reason: ${rejectionReason || 'Our team has already dispatched your package.'}. Your order will proceed normally.`
      );
    }

    res.json({ success: true, message: 'Cancellation request processed successfully.', order });

  } catch (err) {
    console.error('[admin/cancellation]', err.message);
    res.status(500).json({ success: false, error: 'Failed to process cancellation request.' });
  }
});

/**
 * POST /api/admin/orders/:orderId/cancel
 * Admin directly cancels/removes an order (whether cancellation was requested or not).
 */
router.post('/admin/orders/:orderId/cancel', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { remarks } = req.body;

    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    // Check if order is already cancelled
    if (order.orderStatus === ORDER_STATUSES.CANCELLED) {
      return res.status(400).json({ success: false, error: 'Order is already cancelled.' });
    }

    // Set cancellation status
    order.cancellationStatus = order.cancellationStatus || 'CANCELLED_BY_ADMIN';
    order.orderStatus = ORDER_STATUSES.CANCELLED;
    saveOrder(order);

    addOrderEvent(
      orderId, 
      'CANCELLATION', 
      ORDER_STATUSES.CANCELLED, 
      `Order cancelled by administrator. Remarks: ${remarks || 'Direct admin cancellation.'}`,
      { remarks }
    );

    // Cancel on Shiprocket if exists
    if (order.shiprocketOrderId) {
      try {
        const { cancelShiprocketOrder } = require('./shiprocket');
        await cancelShiprocketOrder(order.shiprocketOrderId);
        console.log(`[admin/cancel] Order ${orderId} (Shiprocket: ${order.shiprocketOrderId}) cancelled on Shiprocket.`);
      } catch (srErr) {
        console.error(`[admin/cancel] Failed to cancel order ${orderId} on Shiprocket:`, srErr.message);
        addOrderEvent(
          orderId, 
          'SYSTEM_ERROR', 
          order.orderStatus, 
          `Failed to cancel shipment on Shiprocket: ${srErr.message}`
        );
      }
    }

    // Trigger refund flow if prepaid
    if (order.paymentMethod.toLowerCase().includes('online') && order.paymentStatus === 'PAID') {
      order.refundStatus = 'APPROVED';
      saveOrder(order);

      const refundData = {
        refundId: `RF-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        orderId,
        amount: order.orderAmount,
        method: 'Razorpay',
        status: 'APPROVED',
        reason: 'Order Cancelled by Admin',
        approvedAt: new Date().toISOString()
      };
      saveRefund(refundData);

      addOrderEvent(
        orderId, 
        'REFUND', 
        ORDER_STATUSES.REFUND_APPROVED, 
        `Refund of ₹${order.orderAmount} approved for cancelled order. Ready to initiate.`
      );

      await sendStatusNotificationEmail(
        order, 
        ORDER_STATUSES.CANCELLED, 
        `Your order ${orderId} has been cancelled by our administration. Since this was a prepaid order, a refund of ₹${order.orderAmount} has been approved and will be initiated shortly.`
      );
    } else {
      await sendStatusNotificationEmail(
        order, 
        ORDER_STATUSES.CANCELLED, 
        `Your order ${orderId} has been cancelled by our administration.`
      );
    }

    res.json({ success: true, message: 'Order successfully cancelled.', order });

  } catch (err) {
    console.error('[admin/cancel]', err.message);
    res.status(500).json({ success: false, error: 'Failed to cancel order.' });
  }
});

/**
 * PUT /api/admin/orders/:orderId/return
 * Approve or reject a return request.
 */
router.put('/admin/orders/:orderId/return', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { approved, physicalReturnRequired, remarks, rejectionReason } = req.body;

    const order = getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    if (order.returnStatus !== 'REQUESTED') {
      return res.status(400).json({ success: false, error: 'No return request pending for this order.' });
    }

    if (approved) {
      order.returnStatus = 'APPROVED';

      if (physicalReturnRequired) {
        order.orderStatus = ORDER_STATUSES.RETURN_PICKUP_SCHEDULED;
        saveOrder(order);

        addOrderEvent(
          orderId, 
          'RETURN', 
          ORDER_STATUSES.RETURN_PICKUP_SCHEDULED, 
          `Return request approved. Physical return required. Return pickup has been scheduled. Remarks: ${remarks || 'None'}`,
          { remarks }
        );

        await sendStatusNotificationEmail(
          order, 
          ORDER_STATUSES.RETURN_PICKUP_SCHEDULED, 
          `Your return request is approved. A pickup has been scheduled at your shipping address. Please keep the products packed and ready.`
        );
      } else {
        // Direct Refund Approval (no physical product return needed)
        order.orderStatus = ORDER_STATUSES.REFUND_APPROVED;
        order.refundStatus = 'APPROVED';
        saveOrder(order);

        const refundData = {
          refundId: `RF-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
          orderId,
          amount: order.orderAmount,
          method: order.paymentMethod.toLowerCase().includes('online') ? 'Razorpay' : 'Manual',
          status: 'APPROVED',
          reason: 'Return Approved (No product return required)',
          approvedAt: new Date().toISOString()
        };
        saveRefund(refundData);

        addOrderEvent(
          orderId, 
          'REFUND', 
          ORDER_STATUSES.REFUND_APPROVED, 
          `Return approved without physical return. Refund of ₹${order.orderAmount} approved.`
        );

        await sendStatusNotificationEmail(
          order, 
          ORDER_STATUSES.REFUND_APPROVED, 
          `Your return request has been approved. We do not require a physical return. A refund of ₹${order.orderAmount} has been approved and will be initiated.`
        );
      }
    } else {
      order.returnStatus = 'REJECTED';
      order.orderStatus = ORDER_STATUSES.DELIVERED; // Restore to delivered
      saveOrder(order);

      addOrderEvent(
        orderId, 
        'RETURN', 
        ORDER_STATUSES.DELIVERED, 
        `Return request rejected. Reason: ${rejectionReason || 'Does not meet criteria.'}`,
        { rejectionReason }
      );

      await sendStatusNotificationEmail(
        order, 
        ORDER_STATUSES.DELIVERED, 
        `Your return request was declined. Reason: ${rejectionReason || 'The product was found ineligible for returns under our policy.'}.`
      );
    }

    res.json({ success: true, message: 'Return request processed.', order });

  } catch (err) {
    console.error('[admin/return]', err.message);
    res.status(500).json({ success: false, error: 'Failed to process return request.' });
  }
});

/**
 * PUT /api/admin/orders/:orderId/return/receive
 * Mark a return item as received and verified.
 */
router.put('/admin/orders/:orderId/return/receive', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { received, remarks } = req.body;

    const order = getOrderById(orderId);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found.' });

    if (order.returnStatus !== 'APPROVED' || order.orderStatus !== ORDER_STATUSES.RETURN_PICKUP_SCHEDULED) {
      return res.status(400).json({ success: false, error: 'Order is not in Return Pickup Scheduled status.' });
    }

    if (received) {
      order.orderStatus = ORDER_STATUSES.REFUND_APPROVED;
      order.refundStatus = 'APPROVED';
      saveOrder(order);

      const refundData = {
        refundId: `RF-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        orderId,
        amount: order.orderAmount,
        method: order.paymentMethod.toLowerCase().includes('online') ? 'Razorpay' : 'Manual',
        status: 'APPROVED',
        reason: 'Return received and verified',
        approvedAt: new Date().toISOString()
      };
      saveRefund(refundData);

      addOrderEvent(
        orderId, 
        'RETURN', 
        ORDER_STATUSES.REFUND_APPROVED, 
        `Return item received and verified at warehouse. Refund of ₹${order.orderAmount} approved. Remarks: ${remarks || 'None'}`,
        { remarks }
      );

      await sendStatusNotificationEmail(
        order, 
        ORDER_STATUSES.REFUND_APPROVED, 
        `Your return package has been received and verified. A refund of ₹${order.orderAmount} is approved and will be initiated.`
      );
    } else {
      // Failed return collection
      order.orderStatus = ORDER_STATUSES.DELIVERY_FAILED; // Return failed
      saveOrder(order);

      addOrderEvent(
        orderId, 
        'RETURN', 
        ORDER_STATUSES.DELIVERY_FAILED, 
        `Return pickup failed or rejected. Remarks: ${remarks}`
      );
    }

    res.json({ success: true, order });

  } catch (err) {
    console.error('[admin/return/receive]', err.message);
    res.status(500).json({ success: false, error: 'Failed to update return state.' });
  }
});

/**
 * POST /api/admin/orders/:orderId/refund/initiate
 * Trigger refund in payment gateway (Razorpay) or record manual transaction details (COD).
 */
router.post('/admin/orders/:orderId/refund/initiate', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { manualTxnId, manualMethod } = req.body;

    const order = getOrderById(orderId);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found.' });

    const refund = getRefundByOrderId(orderId);
    if (!refund) {
      return res.status(400).json({ success: false, error: 'No approved refund request exists for this order.' });
    }

    if (refund.status === 'PROCESSED' || refund.status === 'PROCESSING') {
      return res.status(400).json({ success: false, error: `Refund is already ${refund.status}.` });
    }

    // Prevent refund amount from exceeding paid order amount
    if (Number(refund.amount) > Number(order.orderAmount)) {
      return res.status(400).json({ success: false, error: 'Refund amount cannot exceed the order amount.' });
    }

    const isPrepaid = order.paymentMethod.toLowerCase().includes('online');

    if (isPrepaid) {
      /* ── Razorpay Refund Initiation ── */
      if (!order.razorpayPaymentId) {
        return res.status(400).json({ success: false, error: 'Missing Razorpay Payment ID on order record.' });
      }

      try {
        console.log(`[admin/refund] Calling Razorpay refund API for payment ID: ${order.razorpayPaymentId}`);
        
        const rzRefund = await razorpay.payments.refund(order.razorpayPaymentId, {
          amount: Math.round(Number(refund.amount) * 100), // paise
          notes: { orderId, refundId: refund.refundId }
        });

        // Update refund state
        refund.paymentGatewayRefundId = rzRefund.id;
        refund.status = 'INITIATED';
        refund.initiatedAt = new Date().toISOString();
        saveRefund(refund);

        order.refundStatus = 'INITIATED';
        order.orderStatus = ORDER_STATUSES.REFUND_INITIATED;
        saveOrder(order);

        addOrderEvent(
          orderId, 
          'REFUND', 
          ORDER_STATUSES.REFUND_INITIATED, 
          `Refund of ₹${refund.amount} initiated via Razorpay. Refund ID: ${rzRefund.id}`,
          { rzRefund }
        );

        await sendStatusNotificationEmail(
          order, 
          ORDER_STATUSES.REFUND_INITIATED, 
          `Your refund of ₹${refund.amount} has been initiated. The money will credit back to your original payment method in 5-7 business days.`
        );

        res.json({ success: true, message: 'Razorpay refund initiated successfully.', refund });

      } catch (rzErr) {
        console.error('[admin/refund] Razorpay Refund Error:', rzErr.message);
        refund.status = 'FAILED';
        refund.failedAt = new Date().toISOString();
        refund.failureReason = rzErr.message;
        saveRefund(refund);

        order.refundStatus = 'FAILED';
        order.orderStatus = ORDER_STATUSES.REFUND_FAILED;
        saveOrder(order);

        addOrderEvent(
          orderId, 
          'REFUND', 
          ORDER_STATUSES.REFUND_FAILED, 
          `Razorpay refund failed: ${rzErr.message}`,
          { error: rzErr.message }
        );

        res.status(500).json({ success: false, error: `Razorpay refund failed: ${rzErr.message}` });
      }
    } else {
      /* ── COD / Manual Refund Processing ── */
      if (!manualTxnId || !manualMethod) {
        return res.status(400).json({ success: false, error: 'Please provide Bank Transaction ID and Refund Method.' });
      }

      refund.paymentGatewayRefundId = manualTxnId;
      refund.method = manualMethod;
      refund.status = 'PROCESSED';
      refund.initiatedAt = new Date().toISOString();
      refund.processedAt = new Date().toISOString();
      saveRefund(refund);

      order.refundStatus = 'PROCESSED';
      order.orderStatus = ORDER_STATUSES.REFUND_PROCESSED;
      saveOrder(order);

      addOrderEvent(
        orderId, 
        'REFUND', 
        ORDER_STATUSES.REFUND_PROCESSED, 
        `Refund of ₹${refund.amount} completed manually via ${manualMethod}. Transaction ID: ${manualTxnId}`,
        { manualTxnId, manualMethod }
      );

      await sendStatusNotificationEmail(
        order, 
        ORDER_STATUSES.REFUND_PROCESSED, 
        `Your refund of ₹${refund.amount} has been successfully credited to your account via ${manualMethod}. Reference Transaction ID: ${manualTxnId}.`
      );

      res.json({ success: true, message: 'Manual refund recorded successfully.', refund });
    }

  } catch (err) {
    console.error('[admin/refund/initiate]', err.message);
    res.status(500).json({ success: false, error: 'Failed to initiate refund.' });
  }
});

/**
 * POST /api/admin/orders/:orderId/refund/sync
 * Manually sync/complete initiated refunds by querying Razorpay API.
 */
router.post('/api/admin/orders/:orderId/refund/sync', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = getOrderById(orderId);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found.' });

    const refund = getRefundByOrderId(orderId);
    if (!refund || !refund.paymentGatewayRefundId) {
      return res.status(400).json({ success: false, error: 'No gateway refund exists to sync.' });
    }

    if (refund.status === 'PROCESSED') {
      return res.json({ success: true, message: 'Refund already processed.', refund });
    }

    // Fetch refund state from Razorpay
    const rzRefund = await razorpay.refunds.fetch(refund.paymentGatewayRefundId);
    
    if (rzRefund.status === 'processed') {
      refund.status = 'PROCESSED';
      refund.processedAt = new Date().toISOString();
      saveRefund(refund);

      order.refundStatus = 'PROCESSED';
      order.orderStatus = ORDER_STATUSES.REFUND_PROCESSED;
      saveOrder(order);

      addOrderEvent(
        orderId, 
        'REFUND', 
        ORDER_STATUSES.REFUND_PROCESSED, 
        `Razorpay confirmed refund processed. Refund ID: ${rzRefund.id}`
      );

      await sendStatusNotificationEmail(
        order, 
        ORDER_STATUSES.REFUND_PROCESSED, 
        `Your refund of ₹${refund.amount} has been successfully credited to your account. Transaction Reference: ${rzRefund.id}.`
      );
    } else if (rzRefund.status === 'failed') {
      refund.status = 'FAILED';
      refund.failedAt = new Date().toISOString();
      refund.failureReason = 'Razorpay refund failed';
      saveRefund(refund);

      order.refundStatus = 'FAILED';
      order.orderStatus = ORDER_STATUSES.REFUND_FAILED;
      saveOrder(order);

      addOrderEvent(
        orderId, 
        'REFUND', 
        ORDER_STATUSES.REFUND_FAILED, 
        `Razorpay refund failed during processing.`
      );
    }

    res.json({ success: true, message: `Refund status synced: ${refund.status}`, refund });

  } catch (err) {
    console.error('[admin/refund/sync]', err.message);
    res.status(500).json({ success: false, error: 'Failed to sync refund status.' });
  }
});

module.exports = router;
