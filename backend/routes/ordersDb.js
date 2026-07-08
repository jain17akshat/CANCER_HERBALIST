/**
 * ordersDb.js
 * JSON file-based database manager for orders, refunds, and orderEvents,
 * with real-time automatic synchronization to Google Sheets.
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

// In-memory cache variables for serverless context
let cachedOrders = null;
let cachedRefunds = null;
let cachedEvents = null;
let lastSyncTime = 0;
const SYNC_COOLDOWN_MS = 5000; // 5 seconds cooldown to prevent spamming Google Sheets

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

// Helper: write file safely (fails silently on Vercel read-only filesystem, which is fine since cache is updated)
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    // Fail silently or log error — Vercel read-only is expected
    return false;
  }
}

// Initialize memory cache from files if empty
function initCache() {
  if (cachedOrders === null) cachedOrders = readJSON(ORDERS_FILE);
  if (cachedRefunds === null) cachedRefunds = readJSON(REFUNDS_FILE);
  if (cachedEvents === null) cachedEvents = readJSON(EVENTS_FILE);
}

// Push updates to Google Sheets in background
async function syncToSheets(sheetName, rowData) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return;
  try {
    const sheetUrl = new URL(url);
    sheetUrl.searchParams.append('action', 'updateRow');
    sheetUrl.searchParams.append('sheet', sheetName);
    
    Object.entries(rowData).forEach(([k, v]) => {
      let val = v;
      if (typeof v === 'object' && v !== null) val = JSON.stringify(v);
      sheetUrl.searchParams.append(k, String(val ?? ''));
    });
    
    const res = await fetch(sheetUrl.toString());
    if (!res.ok) console.warn(`[ordersDb] Sheets sync returned status ${res.status}`);
  } catch (err) {
    console.warn('[ordersDb] Error syncing to Sheets:', err.message);
  }
}

// Pull all latest data from Google Sheets into memory and files
async function syncFromSheets(force = false) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) {
    initCache();
    return false;
  }
  
  const now = Date.now();
  if (!force && cachedOrders !== null && (now - lastSyncTime < SYNC_COOLDOWN_MS)) {
    return true; // Use fresh cache
  }
  
  try {
    const fetchSheet = async (sheetName) => {
      const res = await fetch(`${url}?action=getRows&sheet=${sheetName}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      return data.success ? data.rows : [];
    };
    
    const [orders, refunds, events] = await Promise.all([
      fetchSheet('orders'),
      fetchSheet('refunds'),
      fetchSheet('orderEvents')
    ]);
    
    // Filter out empty rows (e.g. if the user cleared cells directly in Google Sheets)
    const validOrders = (orders || []).filter(o => o && o.orderId && String(o.orderId).trim());
    const validRefunds = (refunds || []).filter(r => r && r.refundId && String(r.refundId).trim());
    const validEvents = (events || []).filter(e => e && e.orderId && String(e.orderId).trim());

    cachedOrders = validOrders;
    cachedRefunds = validRefunds;
    cachedEvents = validEvents;
    lastSyncTime = Date.now();
    
    // Backup cache to local files (will fail gracefully on Vercel)
    writeJSON(ORDERS_FILE, validOrders);
    writeJSON(REFUNDS_FILE, validRefunds);
    writeJSON(EVENTS_FILE, validEvents);
    
    console.log('[ordersDb] Successfully synced latest data from Google Sheets.');
    return true;
  } catch (err) {
    console.error('[ordersDb] Google Sheets sync failed, falling back to local cache/files:', err.message);
    initCache();
    return false;
  }
}

/* ── Order Database Helpers ───────────────────────────────────────── */

function getOrders() {
  initCache();
  return cachedOrders;
}

function saveOrder(orderData) {
  initCache();
  const index = cachedOrders.findIndex(o => o.orderId === orderData.orderId);
  const now = new Date().toISOString();
  let updatedOrder;

  if (index >= 0) {
    updatedOrder = {
      ...cachedOrders[index],
      ...orderData,
      updatedAt: now
    };
    cachedOrders[index] = updatedOrder;
  } else {
    updatedOrder = {
      ...orderData,
      createdAt: orderData.createdAt || now,
      updatedAt: now
    };
    cachedOrders.push(updatedOrder);
  }

  writeJSON(ORDERS_FILE, cachedOrders);
  
  // Real-time synchronization to Google Sheets
  syncToSheets('orders', updatedOrder);
  
  return updatedOrder;
}

function getOrderById(orderId) {
  initCache();
  return cachedOrders.find(o => o.orderId === orderId) || null;
}

function getOrderByShipmentId(shipmentId) {
  initCache();
  return cachedOrders.find(o => String(o.shipmentId) === String(shipmentId)) || null;
}

function getOrderByAwb(awb) {
  initCache();
  return cachedOrders.find(o => o.awb === awb) || null;
}

function getOrdersByContact(contact) {
  initCache();
  const cleanContact = String(contact).trim().toLowerCase();
  
  return cachedOrders.filter(o => 
    String(o.phone).trim() === cleanContact || 
    String(o.email).trim().toLowerCase() === cleanContact
  );
}

/* ── Refund Database Helpers ──────────────────────────────────────── */

function getRefunds() {
  initCache();
  return cachedRefunds;
}

function saveRefund(refundData) {
  initCache();
  const index = cachedRefunds.findIndex(r => r.refundId === refundData.refundId);
  const now = new Date().toISOString();
  let finalRefund = { ...refundData };

  if (index >= 0) {
    cachedRefunds[index] = {
      ...cachedRefunds[index],
      ...refundData,
      updatedAt: now
    };
    finalRefund = cachedRefunds[index];
  } else {
    finalRefund.createdAt = now;
    finalRefund.updatedAt = now;
    cachedRefunds.push(finalRefund);
  }

  writeJSON(REFUNDS_FILE, cachedRefunds);
  
  // Sync refund to Google Sheets
  syncToSheets('refunds', finalRefund);
  
  return finalRefund;
}

function getRefundById(refundId) {
  initCache();
  return cachedRefunds.find(r => r.refundId === refundId) || null;
}

function getRefundByOrderId(orderId) {
  initCache();
  return cachedRefunds.find(r => r.orderId === orderId) || null;
}

/* ── Event Database Helpers ───────────────────────────────────────── */

function getEvents() {
  initCache();
  return cachedEvents;
}

function getEventsByOrderId(orderId) {
  initCache();
  return cachedEvents
    .filter(e => e.orderId === orderId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function addOrderEvent(orderId, eventType, status, customerMessage, internalMetadata = null) {
  initCache();
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

  cachedEvents.push(event);
  writeJSON(EVENTS_FILE, cachedEvents);
  
  // Sync event to Google Sheets
  syncToSheets('orderEvents', event);
  
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

async function deleteFromSheets(sheetName, idVal) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return;
  try {
    const sheetUrl = new URL(url);
    sheetUrl.searchParams.append('action', 'deleteRow');
    sheetUrl.searchParams.append('sheet', sheetName);
    
    let idKey = 'orderId';
    if (sheetName === 'appointments') idKey = 'apptId';
    else if (sheetName === 'refunds') idKey = 'refundId';
    else if (sheetName === 'orderEvents') idKey = 'eventId';
    
    sheetUrl.searchParams.append(idKey, idVal);
    
    const res = await fetch(sheetUrl.toString());
    if (!res.ok) console.warn(`[ordersDb] Sheets delete returned status ${res.status}`);
  } catch (err) {
    console.warn('[ordersDb] Error deleting from Sheets:', err.message);
  }
}

async function clearSheets(sheetName) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return;
  try {
    const sheetUrl = new URL(url);
    sheetUrl.searchParams.append('action', 'clearSheet');
    sheetUrl.searchParams.append('sheet', sheetName);
    
    const res = await fetch(sheetUrl.toString());
    if (!res.ok) console.warn(`[ordersDb] Sheets clear returned status ${res.status}`);
  } catch (err) {
    console.warn('[ordersDb] Error clearing Sheets:', err.message);
  }
}

function deleteOrder(orderId) {
  initCache();
  const index = cachedOrders.findIndex(o => o.orderId === orderId);
  if (index >= 0) {
    cachedOrders.splice(index, 1);
    writeJSON(ORDERS_FILE, cachedOrders);
    
    // Also delete any events for this order in local cache
    cachedEvents = cachedEvents.filter(e => e.orderId !== orderId);
    writeJSON(EVENTS_FILE, cachedEvents);
    
    // Sync to Sheets
    deleteFromSheets('orders', orderId);
    return true;
  }
  return false;
}

function clearAllOrders() {
  initCache();
  cachedOrders = [];
  writeJSON(ORDERS_FILE, cachedOrders);
  
  cachedEvents = [];
  writeJSON(EVENTS_FILE, cachedEvents);
  
  cachedRefunds = [];
  writeJSON(REFUNDS_FILE, cachedRefunds);
  
  // Sync to Sheets
  clearSheets('orders');
  clearSheets('orderEvents');
  clearSheets('refunds');
  return true;
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
  updateOrderStatus,
  syncFromSheets,
  deleteOrder,
  clearAllOrders
};
