/**
 * zohoDesk.js — Zoho Desk Integration (India Data Center)
 *
 * POST /api/zoho-desk/ticket
 *   → Creates a support ticket in Zoho Desk
 *
 * GET /api/zoho-desk/ticket/:ticketId
 *   → Returns the status/details of a support ticket (public, no auth)
 *
 * Requires in .env:
 *   ZOHO_DESK_ORG_ID         — from Zoho Desk → Setup → Developer Space → Organization ID
 *   ZOHO_DESK_DEPARTMENT_ID  — (optional) department ID, defaults to first available
 */

const express = require('express');
const { getAccessToken } = require('../utils/zohoAuth');
const router = express.Router();

const ZOHO_DESK_API = 'https://desk.zoho.in/api/v1';

/* ── POST /api/zoho-desk/ticket ──────────────────────────────────── */
router.post('/zoho-desk/ticket', async (req, res) => {
  const { name, email, phone, subject, description, orderId, category } = req.body;

  if (!name || !email || !subject || !description) {
    return res.status(400).json({
      success: false,
      error: 'name, email, subject, and description are required.',
    });
  }

  const orgId = process.env.ZOHO_DESK_ORG_ID;
  if (!orgId) {
    return res.status(503).json({
      success: false,
      error: 'Zoho Desk not configured. Set ZOHO_DESK_ORG_ID in environment variables.',
    });
  }

  if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_REFRESH_TOKEN) {
    return res.status(503).json({ success: false, error: 'Zoho OAuth not configured.' });
  }

  try {
    const token = await getAccessToken();

    const ticketBody = {
      subject,
      description: [
        description,
        orderId ? `\n\nOrder ID: ${orderId}` : '',
        `\nPhone: ${phone || 'Not provided'}`,
      ].join(''),
      departmentId: process.env.ZOHO_DESK_DEPARTMENT_ID || undefined,
      contact: {
        lastName: name,
        email,
        phone: phone || '',
      },
      channel: 'Web',
      priority: 'Medium',
      classification: category || 'General',
      cf: {
        cf_order_id: orderId || '',
      },
    };

    // Remove undefined fields
    if (!ticketBody.departmentId) delete ticketBody.departmentId;

    const response = await fetch(`${ZOHO_DESK_API}/tickets`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
        orgId: orgId,
      },
      body: JSON.stringify(ticketBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Zoho Desk] Ticket creation failed:', JSON.stringify(data));
      throw new Error(data.message || `Zoho Desk error (${response.status})`);
    }

    console.log(`[Zoho Desk] Ticket created: #${data.ticketNumber} (ID: ${data.id})`);
    return res.json({
      success: true,
      ticketId: data.id,
      ticketNumber: data.ticketNumber,
      webUrl: data.webUrl,
      message: `Support ticket #${data.ticketNumber} created. Our team will respond within 24 hours.`,
    });

  } catch (err) {
    console.error('[Zoho Desk] Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* ── GET /api/zoho-desk/ticket/:ticketId ────────────────────────── */
router.get('/zoho-desk/ticket/:ticketId', async (req, res) => {
  const { ticketId } = req.params;
  const orgId = process.env.ZOHO_DESK_ORG_ID;

  if (!orgId || !process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_REFRESH_TOKEN) {
    return res.status(503).json({ success: false, error: 'Zoho Desk not configured.' });
  }

  try {
    const token = await getAccessToken();

    const response = await fetch(`${ZOHO_DESK_API}/tickets/${ticketId}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        orgId: orgId,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || `Status ${response.status}`);

    return res.json({
      success: true,
      ticketId: data.id,
      ticketNumber: data.ticketNumber,
      subject: data.subject,
      status: data.status,
      priority: data.priority,
      createdTime: data.createdTime,
    });

  } catch (err) {
    console.error('[Zoho Desk] Status fetch error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
