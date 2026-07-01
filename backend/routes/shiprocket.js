/**
 * shiprocket.js — Shiprocket API service
 *
 * Handles JWT token caching (valid 10 days) and exposes a single
 * helper: createShiprocketOrder(orderRow)
 *
 * Env vars required:
 *   SHIPROCKET_EMAIL    — API user email (create in Shiprocket → Settings → API)
 *   SHIPROCKET_PASSWORD — API user password
 *
 * Shiprocket docs: https://apidocs.shiprocket.in/
 */

const BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

/* ── In-memory token cache ─────────────────────────────────────────── */
let _cachedToken     = null;
let _tokenExpiresAt  = 0; // epoch ms — token is valid for 10 days

async function getAuthToken() {
  const now = Date.now();

  // Reuse cached token if it has more than 1 hour of life left
  if (_cachedToken && now < _tokenExpiresAt - 60 * 60 * 1000) {
    return _cachedToken;
  }

  const email    = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    throw new Error('SHIPROCKET_EMAIL or SHIPROCKET_PASSWORD env var is not set.');
  }

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shiprocket auth failed (${res.status}): ${body}`);
  }

  const data = await res.json();

  _cachedToken    = data.token;
  _tokenExpiresAt = now + 10 * 24 * 60 * 60 * 1000; // 10 days in ms

  console.log('[Shiprocket] New token obtained, expires in 10 days.');
  return _cachedToken;
}

/**
 * Maps our internal order object to the Shiprocket adhoc order payload.
 *
 * @param {Object} orderRow — the standard orderRow built in verifyPayment / submitOrder
 * @returns {Promise<Object>} — Shiprocket API response data
 */
async function createShiprocketOrder(orderRow) {
  const token = await getAuthToken();

  // Build item array — supports multiple products (comma-separated productName)
  const productNames = String(orderRow.productName || '').split(',').map(n => n.trim());
  const quantities   = String(orderRow.quantity || '1').split(',').map(q => Number(q.trim()) || 1);
  const unitPrices   = String(orderRow.unitPrice || orderRow.orderAmount || '0')
    .split(',')
    .map(p => Number(p.trim()) || 0);

  const order_items = productNames.map((name, i) => ({
    name:         name,
    sku:          `SKU-${(orderRow.productId || 'PROD').split(',')[i]?.trim() || i}`,
    units:        quantities[i] || quantities[0] || 1,
    selling_price: unitPrices[i] || unitPrices[0] || Number(orderRow.orderAmount) || 0,
    discount:     0,
    tax:          0,
  }));

  const payload = {
    order_id:            orderRow.orderId,
    order_date:          new Date().toISOString().replace('T', ' ').slice(0, 19), // "YYYY-MM-DD HH:MM:SS"
    pickup_location:     'THE CANCERHERBALIST', // Address Nickname from Shiprocket → Settings → Pick Up Address

    /* ── Billing / Shipping address ─── */
    billing_customer_name:  orderRow.customerName || '',
    billing_last_name:      '',
    billing_address:        orderRow.address       || '',
    billing_address_2:      '',
    billing_city:           orderRow.city          || '',
    billing_pincode:        String(orderRow.pincode || ''),
    billing_state:          orderRow.state         || '',
    billing_country:        'India',
    billing_email:          orderRow.email         || '',
    billing_phone:          String(orderRow.phone  || ''),
    billing_alternate_phone: '',

    shipping_is_billing:    true,   // same address for shipping

    /* ── Order items ─── */
    order_items,

    /* ── Payment ─── */
    payment_method: orderRow.paymentMethod?.toLowerCase().includes('online') ? 'Prepaid' : 'COD',
    sub_total:      Number(orderRow.orderAmount) || 0,
    length:         10,    // cm — update if you have per-product dims
    breadth:        10,
    height:         10,
    weight:         0.5,   // kg — update per product
  };

  const res = await fetch(`${BASE_URL}/orders/create/adhoc`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    // Shiprocket can return 401 when the token is revoked mid-session
    if (res.status === 401) {
      // Invalidate cache and let the caller retry once
      _cachedToken    = null;
      _tokenExpiresAt = 0;
    }
    throw new Error(
      `Shiprocket order creation failed (${res.status}): ${JSON.stringify(data)}`
    );
  }

  return data; // { order_id, shipment_id, status, ... }
}

module.exports = { createShiprocketOrder };
