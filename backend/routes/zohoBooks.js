/**
 * zohoBooks.js — Zoho Books Integration Service (India Data Center)
 *
 * Automates customer creation, invoice generation, and payment recording
 * in Zoho Books for every order placed.
 *
 * Auth: Shared OAuth2 via utils/zohoAuth
 * Data Center: zohoapis.in
 */

const { getAccessToken } = require('../utils/zohoAuth');

const ZOHO_BOOKS_API_BASE = 'https://www.zohoapis.in/books/v3';

/**
 * Searches for an existing Customer (Contact) in Zoho Books by email or phone.
 * Returns the contact_id if found, or null.
 */
async function findContact(phone, email, token, orgId) {
  try {
    // 1. Search by email first
    if (email) {
      const res = await fetch(
        `${ZOHO_BOOKS_API_BASE}/contacts?organization_id=${orgId}&email=${encodeURIComponent(email)}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.code === 0 && data.contacts && data.contacts.length > 0) {
          return data.contacts[0].contact_id;
        }
      }
    }

    // 2. Fallback: Search by phone
    if (phone) {
      const res = await fetch(
        `${ZOHO_BOOKS_API_BASE}/contacts?organization_id=${orgId}&phone=${encodeURIComponent(phone)}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.code === 0 && data.contacts && data.contacts.length > 0) {
          return data.contacts[0].contact_id;
        }
      }
    }
  } catch (err) {
    console.warn('[Zoho Books] Contact search failed:', err.message);
  }
  return null;
}

/**
 * Creates a new Customer (Contact) in Zoho Books.
 */
async function createContact(orderRow, token, orgId) {
  const [firstName, ...rest] = String(orderRow.customerName || '').trim().split(' ');
  const lastName = rest.join(' ') || '-';

  const contactData = {
    contact_name: orderRow.customerName || 'Walk-in Customer',
    company_name: '',
    contact_persons: [
      {
        first_name: firstName,
        last_name: lastName,
        email: orderRow.email || '',
        phone: String(orderRow.phone),
        is_primary_contact: true,
      },
    ],
    billing_address: {
      address: orderRow.address || '',
      city: orderRow.city || '',
      state: orderRow.state || '',
      zip: String(orderRow.pincode || ''),
      country: 'India',
    },
    shipping_address: {
      address: orderRow.address || '',
      city: orderRow.city || '',
      state: orderRow.state || '',
      zip: String(orderRow.pincode || ''),
      country: 'India',
    },
  };

  const res = await fetch(`${ZOHO_BOOKS_API_BASE}/contacts?organization_id=${orgId}`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Zoho Books customer creation failed: ${data.message} (${data.code})`);
  }

  const contactId = data.contact.contact_id;
  console.log(`[Zoho Books] Customer created: ${contactId}`);
  return contactId;
}

/**
 * Creates an Invoice in Zoho Books.
 * Returns the invoice object containing invoice_id and invoice_number.
 */
async function createInvoice(orderRow, contactId, token, orgId) {
  // Format current date as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const invoiceData = {
    customer_id: contactId,
    date: today,
    due_date: today,
    is_inclusive_tax: true,
    line_items: [
      {
        name: orderRow.productName || 'Herbal Formulation / Treatment Consultation',
        description: `Order ID: ${orderRow.orderId} - Product: ${orderRow.productName} (Qty: ${orderRow.quantity})`,
        rate: Number(orderRow.unitPrice) || Number(orderRow.orderAmount),
        quantity: Number(orderRow.quantity) || 1,
      },
    ],
  };

  const res = await fetch(`${ZOHO_BOOKS_API_BASE}/invoices?organization_id=${orgId}`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  });

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Zoho Books invoice creation failed: ${data.message} (${data.code})`);
  }

  const invoice = data.invoice;
  console.log(`[Zoho Books] Draft Invoice created: ${invoice.invoice_number} (ID: ${invoice.invoice_id})`);
  return invoice;
}

/**
 * Marks a Draft Invoice as "Sent" (Active).
 */
async function markInvoiceAsSent(invoiceId, token, orgId) {
  const res = await fetch(
    `${ZOHO_BOOKS_API_BASE}/invoices/${invoiceId}/status/sent?organization_id=${orgId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    }
  );

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Failed to mark invoice as sent: ${data.message}`);
  }

  console.log(`[Zoho Books] Invoice approved/sent successfully.`);
}

/**
 * Records a payment against an invoice in Zoho Books.
 */
async function recordPayment(invoiceId, contactId, orderRow, token, orgId) {
  const today = new Date().toISOString().split('T')[0];

  const paymentData = {
    customer_id: contactId,
    payment_mode: orderRow.paymentMethod || 'Online - Razorpay',
    amount: Number(orderRow.orderAmount),
    date: today,
    reference_number: orderRow.razorpayPaymentId || orderRow.orderId,
    description: `Payment verified for Order ID: ${orderRow.orderId}. Razorpay Payment ID: ${orderRow.razorpayPaymentId || 'N/A'}`,
    invoices: [
      {
        invoice_id: invoiceId,
        amount_applied: Number(orderRow.orderAmount),
      },
    ],
  };

  const res = await fetch(`${ZOHO_BOOKS_API_BASE}/customerpayments?organization_id=${orgId}`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Zoho Books payment record failed: ${data.message} (${data.code})`);
  }

  console.log(`[Zoho Books] Payment of ₹${orderRow.orderAmount} recorded against invoice: ${invoiceId}`);
}

/**
 * Main exported function.
 * Pushes an order to Zoho Books (Customer -> Invoice -> Approve -> Record Payment if paid).
 */
async function pushOrderToZohoBooks(orderRow) {
  const orgId = process.env.ZOHO_BOOKS_ORGANIZATION_ID;
  if (!orgId) {
    console.warn('[Zoho Books] Skipping integration: ZOHO_BOOKS_ORGANIZATION_ID is not configured in .env');
    return;
  }

  const token = await getAccessToken();

  // 1. Get or create Customer
  let contactId = await findContact(orderRow.phone, orderRow.email, token, orgId);
  if (!contactId) {
    contactId = await createContact(orderRow, token, orgId);
  } else {
    console.log(`[Zoho Books] Existing customer found: ${contactId}`);
  }

  // 2. Create Draft Invoice
  const invoice = await createInvoice(orderRow, contactId, token, orgId);
  const invoiceId = invoice.invoice_id;

  // 3. Approve Invoice (moves status from Draft to Sent)
  await markInvoiceAsSent(invoiceId, token, orgId);

  // 4. If order is pre-paid (paymentStatus is PAID), record payment immediately
  if (orderRow.paymentStatus === 'PAID') {
    await recordPayment(invoiceId, contactId, orderRow, token, orgId);
  }
}

module.exports = { pushOrderToZohoBooks };
