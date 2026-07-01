/**
 * zoho.js — Zoho CRM Integration Service (India Data Center)
 *
 * Creates a Contact + Deal in Zoho CRM for every order placed.
 *
 * Auth: OAuth2 with Refresh Token (offline access)
 * Data Center: zoho.in
 * Docs: https://www.zoho.com/crm/developer/docs/api/v2/
 *
 * Env vars required:
 *   ZOHO_CLIENT_ID      — from Zoho API Console (Self Client)
 *   ZOHO_CLIENT_SECRET  — from Zoho API Console
 *   ZOHO_REFRESH_TOKEN  — generated once via the setup script
 */

const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.in/oauth/v2/token';
const ZOHO_API_BASE     = 'https://www.zohoapis.in/crm/v2';

/* ── In-memory access token cache (expires every 1 hour) ─────────────── */
let _accessToken    = null;
let _tokenExpiresAt = 0;

/**
 * Gets a valid Zoho access token, refreshing if needed.
 */
async function getAccessToken() {
  const now = Date.now();

  // Reuse cached token if it has more than 5 minutes of life left
  if (_accessToken && now < _tokenExpiresAt - 5 * 60 * 1000) {
    return _accessToken;
  }

  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN } = process.env;

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error('Zoho OAuth credentials not configured. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN in .env');
  }

  const params = new URLSearchParams({
    grant_type:    'refresh_token',
    client_id:     ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    refresh_token: ZOHO_REFRESH_TOKEN,
  });

  const res = await fetch(`${ZOHO_ACCOUNTS_URL}?${params}`, { method: 'POST' });
  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(`Zoho token refresh failed: ${data.error || res.status}`);
  }

  _accessToken    = data.access_token;
  _tokenExpiresAt = now + (data.expires_in || 3600) * 1000; // typically 1 hour

  console.log('[Zoho] Access token refreshed.');
  return _accessToken;
}

/**
 * Searches for an existing Contact by phone number.
 * Returns the contact ID if found, or null.
 */
async function findContactByPhone(phone, token) {
  const res = await fetch(
    `${ZOHO_API_BASE}/Contacts/search?criteria=(Phone:equals:${encodeURIComponent(phone)})`,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (res.status === 204) return null; // no records found
  if (!res.ok) return null;

  const data = await res.json();
  return data.data?.[0]?.id || null;
}

/**
 * Creates or updates a Zoho Contact from an order.
 * Returns the contact ID.
 */
async function upsertContact(orderRow, token) {
  // First check if contact already exists by phone
  const existingId = await findContactByPhone(String(orderRow.phone), token);

  const [firstName, ...rest] = String(orderRow.customerName || '').trim().split(' ');
  const lastName = rest.join(' ') || '-';

  const contactData = {
    First_Name:  firstName,
    Last_Name:   lastName,
    Phone:       String(orderRow.phone),
    Email:       orderRow.email || '',
    Mailing_Street:  orderRow.address || '',
    Mailing_City:    orderRow.city    || '',
    Mailing_State:   orderRow.state   || '',
    Mailing_Zip:     String(orderRow.pincode || ''),
    Mailing_Country: 'India',
    Lead_Source:     'Cancer Herbalist Store',
    Description:    `Customer from Cancer Herbalist online store.`,
  };

  if (existingId) {
    // Update existing contact
    const res = await fetch(`${ZOHO_API_BASE}/Contacts/${existingId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [contactData] }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Zoho Contact update failed: ${JSON.stringify(data)}`);
    console.log(`[Zoho] Contact updated: ${existingId}`);
    return existingId;
  } else {
    // Create new contact
    const res = await fetch(`${ZOHO_API_BASE}/Contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [contactData] }),
    });
    const data = await res.json();
    if (!res.ok || data.data?.[0]?.status === 'error') {
      throw new Error(`Zoho Contact creation failed: ${JSON.stringify(data)}`);
    }
    const contactId = data.data?.[0]?.details?.id;
    console.log(`[Zoho] New Contact created: ${contactId}`);
    return contactId;
  }
}

/**
 * Creates a Deal (order) in Zoho CRM linked to the Contact.
 */
async function createDeal(orderRow, contactId, token) {
  const isOnline = String(orderRow.paymentMethod || '').toLowerCase().includes('online') ||
                   String(orderRow.paymentMethod || '').toLowerCase().includes('razorpay');

  const dealData = {
    Deal_Name:    `Order ${orderRow.orderId} — ${orderRow.productName}`,
    Amount:       Number(orderRow.orderAmount) || 0,
    Stage:        isOnline ? 'Closed Won' : 'Proposal/Price Quote', // COD pending = Proposal
    Lead_Source:  'Cancer Herbalist Store',
    Description:  [
      `Order ID: ${orderRow.orderId}`,
      `Product: ${orderRow.productName}`,
      `Quantity: ${orderRow.quantity}`,
      `Amount: ₹${orderRow.orderAmount}`,
      `Payment: ${orderRow.paymentMethod}`,
      `Payment Status: ${orderRow.paymentStatus}`,
      `Order Date: ${orderRow.orderDate}`,
    ].join('\n'),
    Contact_Name: { id: contactId },
  };

  const res = await fetch(`${ZOHO_API_BASE}/Deals`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [dealData] }),
  });

  const data = await res.json();
  if (!res.ok || data.data?.[0]?.status === 'error') {
    throw new Error(`Zoho Deal creation failed: ${JSON.stringify(data)}`);
  }

  const dealId = data.data?.[0]?.details?.id;
  console.log(`[Zoho] Deal created: ${dealId}`);
  return dealId;
}

/**
 * Main exported function.
 * Creates/updates a Contact + Deal in Zoho CRM for an order.
 *
 * @param {Object} orderRow — standard orderRow from submitOrder / verifyPayment
 * @returns {Promise<{ contactId, dealId }>}
 */
async function pushOrderToZoho(orderRow) {
  const token     = await getAccessToken();
  const contactId = await upsertContact(orderRow, token);
  const dealId    = await createDeal(orderRow, contactId, token);
  return { contactId, dealId };
}

module.exports = { pushOrderToZoho };
