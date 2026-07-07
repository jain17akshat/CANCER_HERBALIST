/**
 * orderStatuses.js
 * Centralized status system for the post-purchase order lifecycle.
 */

const ORDER_STATUSES = {
  // Primary Flow
  ORDER_PLACED: 'ORDER_PLACED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  ORDER_CONFIRMED: 'ORDER_CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  DELIVERY_FAILED: 'DELIVERY_FAILED',
  ORDER_CLOSED: 'ORDER_CLOSED',

  // Exception / Shipping Flow
  SHIPMENT_CREATION_FAILED: 'SHIPMENT_CREATION_FAILED',
  AWB_ASSIGNMENT_FAILED: 'AWB_ASSIGNMENT_FAILED',
  DELAYED: 'DELAYED',
  RTO_INITIATED: 'RTO_INITIATED',
  RTO_IN_TRANSIT: 'RTO_IN_TRANSIT',
  RTO_DELIVERED: 'RTO_DELIVERED',

  // Cancellation Flow
  CANCELLATION_REQUESTED: 'CANCELLATION_REQUESTED',
  CANCELLED: 'CANCELLED',

  // Return Flow
  RETURN_REQUESTED: 'RETURN_REQUESTED',
  RETURN_APPROVED: 'RETURN_APPROVED',
  RETURN_REJECTED: 'RETURN_REJECTED',
  RETURN_PICKUP_SCHEDULED: 'RETURN_PICKUP_SCHEDULED',
  RETURN_PICKED_UP: 'RETURN_PICKED_UP',
  RETURN_RECEIVED: 'RETURN_RECEIVED',

  // Refund Flow
  REFUND_REQUESTED: 'REFUND_REQUESTED',
  REFUND_APPROVED: 'REFUND_APPROVED',
  REFUND_REJECTED: 'REFUND_REJECTED',
  REFUND_INITIATED: 'REFUND_INITIATED',
  REFUND_PROCESSING: 'REFUND_PROCESSING',
  REFUND_PROCESSED: 'REFUND_PROCESSED',
  REFUND_FAILED: 'REFUND_FAILED'
};

const ORDER_STATUS_LABELS = {
  ORDER_PLACED: 'Order Placed',
  PAYMENT_PENDING: 'Payment Pending',
  PAYMENT_FAILED: 'Payment Failed',
  ORDER_CONFIRMED: 'Order Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  DELIVERY_FAILED: 'Delivery Failed',
  ORDER_CLOSED: 'Order Closed',
  SHIPMENT_CREATION_FAILED: 'Shipment Creation Failed',
  AWB_ASSIGNMENT_FAILED: 'AWB Assignment Failed',
  DELAYED: 'Delayed',
  RTO_INITIATED: 'Returning to Sender',
  RTO_IN_TRANSIT: 'RTO in Transit',
  RTO_DELIVERED: 'Returned to Sender',
  CANCELLATION_REQUESTED: 'Cancellation Requested',
  CANCELLED: 'Cancelled',
  RETURN_REQUESTED: 'Return Requested',
  RETURN_APPROVED: 'Return Approved',
  RETURN_REJECTED: 'Return Rejected',
  RETURN_PICKUP_SCHEDULED: 'Return Pickup Scheduled',
  RETURN_PICKED_UP: 'Return Picked Up',
  RETURN_RECEIVED: 'Return Received',
  REFUND_REQUESTED: 'Refund Requested',
  REFUND_APPROVED: 'Refund Approved',
  REFUND_REJECTED: 'Refund Rejected',
  REFUND_INITIATED: 'Refund Initiated',
  REFUND_PROCESSING: 'Refund Processing',
  REFUND_PROCESSED: 'Refund Credited',
  REFUND_FAILED: 'Refund Failed'
};

/**
 * Maps Shiprocket tracking statuses to our internal order status.
 * Shiprocket statuses can be numbers (status codes) or uppercase strings.
 * 
 * @param {string|number} srStatus - External Shiprocket status
 * @returns {string} - Internal ORDER_STATUSES
 */
function mapShiprocketStatus(srStatus) {
  const status = String(srStatus).toLowerCase().trim();

  switch (status) {
    case '1':
    case 'awb assigned':
      return ORDER_STATUSES.PROCESSING;
    case '2':
    case 'label generated':
    case '3':
    case 'pickup scheduled':
    case '4':
    case 'pickup queued':
    case '5':
    case 'manifest generated':
      return ORDER_STATUSES.PROCESSING;
    case '6':
    case 'shipped':
    case '7':
    case 'in transit':
      return ORDER_STATUSES.SHIPPED;
    case '8':
    case 'out for delivery':
      return ORDER_STATUSES.OUT_FOR_DELIVERY;
    case '9':
    case 'delivered':
      return ORDER_STATUSES.DELIVERED;
    case '10':
    case 'undelivered':
    case 'delivery failed':
      return ORDER_STATUSES.DELIVERY_FAILED;
    case '11':
    case 'rto initiated':
      return ORDER_STATUSES.RTO_INITIATED;
    case '12':
    case 'rto delivered':
      return ORDER_STATUSES.RTO_DELIVERED;
    case '13':
    case 'canceled':
      return ORDER_STATUSES.CANCELLED;
    case '14':
    case 'rto in transit':
      return ORDER_STATUSES.RTO_IN_TRANSIT;
    default:
      // Fallback
      if (status.includes('transit')) return ORDER_STATUSES.SHIPPED;
      if (status.includes('delivery')) return ORDER_STATUSES.OUT_FOR_DELIVERY;
      if (status.includes('fail') || status.includes('undeliver')) return ORDER_STATUSES.DELIVERY_FAILED;
      if (status.includes('rto')) return ORDER_STATUSES.RTO_INITIATED;
      return ORDER_STATUSES.PROCESSING;
  }
}

module.exports = {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  mapShiprocketStatus
};
