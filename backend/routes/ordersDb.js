/**
 * ordersDb.js
 * JSON file-based database manager for orders, refunds, and orderEvents.
 */

const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REFUNDS_FILE = path.join(DATA_DIR, 'refunds.json');
const EVENTS_FILE = path.join(DATA_DIR, 'orderEvents.json');

// Helper: read file safely
function readJSON(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content || '[]');
    }
  } catch (err) {
    console.error(`[ordersDb] Error reading file ${filePath}:`, err.message);
  }
  return [];
}

// Helper: write file safely
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`[ordersDb] Error writing file ${filePath}:`, err.message);
    return false;
  }
}

/* ── Order Database Helpers ───────────────────────────────────────── */

function getOrders() {
  return readJSON(ORDERS_FILE);
}

function saveOrder(orderData) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.orderId === orderData.orderId);
  const now = new Date().toISOString();

  if (index >= 0) {
    orders[index] = {
      ...orders[index],
      ...orderData,
      updatedAt: now
    };
  } else {
    orders.push({
      ...orderData,
      createdAt: orderData.createdAt || now,
      updatedAt: now
    });
  }

  writeJSON(ORDERS_FILE, orders);
  return orderData;
}

function getOrderById(orderId) {
  const orders = getOrders();
  return orders.find(o => o.orderId === orderId) || null;
}

function getOrderByShipmentId(shipmentId) {
  const orders = getOrders();
  return orders.find(o => String(o.shipmentId) === String(shipmentId)) || null;
}

function getOrderByAwb(awb) {
  const orders = getOrders();
  return orders.find(o => o.awb === awb) || null;
}

function getOrdersByContact(contact) {
  const orders = getOrders();
  const cleanContact = String(contact).trim().toLowerCase();
  
  return orders.filter(o => 
    String(o.phone).trim() === cleanContact || 
    String(o.email).trim().toLowerCase() === cleanContact
  );
}

/* ── Refund Database Helpers ──────────────────────────────────────── */

function getRefunds() {
  return readJSON(REFUNDS_FILE);
}

function saveRefund(refundData) {
  const refunds = getRefunds();
  const index = refunds.findIndex(r => r.refundId === refundData.refundId);
  const now = new Date().toISOString();

  let finalRefund = { ...refundData };
  if (index >= 0) {
    refunds[index] = {
      ...refunds[index],
      ...refundData,
      updatedAt: now
    };
    finalRefund = refunds[index];
  } else {
    finalRefund.createdAt = now;
    finalRefund.updatedAt = now;
    refunds.push(finalRefund);
  }

  writeJSON(REFUNDS_FILE, refunds);
  return finalRefund;
}

function getRefundById(refundId) {
  const refunds = getRefunds();
  return refunds.find(r => r.refundId === refundId) || null;
}

function getRefundByOrderId(orderId) {
  const refunds = getRefunds();
  return refunds.find(r => r.orderId === orderId) || null;
}

/* ── Event Database Helpers ───────────────────────────────────────── */

function getEvents() {
  return readJSON(EVENTS_FILE);
}

function getEventsByOrderId(orderId) {
  const events = getEvents();
  return events
    .filter(e => e.orderId === orderId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function addOrderEvent(orderId, eventType, status, customerMessage, internalMetadata = null) {
  const events = getEvents();
  const now = new Date().toISOString();
  
  const event = {
    eventId: `EV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    orderId,
    eventType,
    status,
    customerMessage,
    internalMetadata,
    createdAt: now
  };

  events.push(event);
  writeJSON(EVENTS_FILE, events);
  return event;
}

/**
 * Transactional-style helper to update order status and record an event simultaneously.
 */
function updateOrderStatus(orderId, status, customerMessage, eventType = 'STATUS_UPDATE', internalMetadata = null) {
  const order = getOrderById(orderId);
  if (!order) return null;

  order.orderStatus = status;
  saveOrder(order);
  addOrderEvent(orderId, eventType, status, customerMessage, internalMetadata);
  
  return order;
}

module.exports = {
  getOrders,
  saveOrder,
  getOrderById,
  getOrderByShipmentId,
  getOrderByAwb,
  getOrdersByContact,
  getRefunds,
  saveRefund,
  getRefundById,
  getRefundByOrderId,
  getEvents,
  getEventsByOrderId,
  addOrderEvent,
  updateOrderStatus
};
