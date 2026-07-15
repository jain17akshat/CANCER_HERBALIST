/**
 * zohoCampaigns.js — Zoho Campaigns Integration (India Data Center)
 *
 * POST /api/zoho-campaigns/subscribe
 *   → Adds a subscriber to your Zoho Campaigns mailing list
 *
 * Requires in .env:
 *   ZOHO_CAMPAIGNS_LIST_KEY   — from Campaigns → Mailing Lists → click the list → API Name / List Key
 */

const express = require('express');
const { getAccessToken } = require('../utils/zohoAuth');
const router = express.Router();

const ZOHO_CAMPAIGNS_API = 'https://campaigns.zoho.in/api/v1.1';

/* ── POST /api/zoho-campaigns/subscribe ─────────────────────────── */
router.post('/zoho-campaigns/subscribe', async (req, res) => {
  const { email, name, phone } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }

  const listKey = process.env.ZOHO_CAMPAIGNS_LIST_KEY;
  if (!listKey) {
    return res.status(503).json({
      success: false,
      error: 'Zoho Campaigns list not configured. Set ZOHO_CAMPAIGNS_LIST_KEY in environment variables.',
    });
  }

  if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_REFRESH_TOKEN) {
    return res.status(503).json({ success: false, error: 'Zoho OAuth not configured.' });
  }

  try {
    const token = await getAccessToken();

    // Build subscriber contact info
    const [firstName, ...rest] = String(name || '').trim().split(' ');
    const lastName = rest.join(' ') || '';

    const contactInfo = JSON.stringify({
      'Contact Email': email,
      'First Name': firstName || '',
      'Last Name': lastName,
      'Phone': phone || '',
      'Source': 'Cancer Herbalist Website',
    });

    const params = new URLSearchParams({
      resfmt: 'JSON',
      listkey: listKey,
      contactinfo: contactInfo,
    });

    const response = await fetch(
      `${ZOHO_CAMPAIGNS_API}/json/listsubscribe?${params}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );

    const data = await response.json();

    // Zoho Campaigns returns code "success" or specific error codes
    if (data.code === 'success' || data.status === 'success') {
      console.log(`[Zoho Campaigns] Subscribed: ${email}`);
      return res.json({ success: true, message: `${email} successfully subscribed!` });
    }

    // "Contact already exists" is not a failure — treat as success
    if (data.code === 'DUPLICATE_EMAIL') {
      return res.json({ success: true, message: 'You are already subscribed. Thank you!' });
    }

    console.warn('[Zoho Campaigns] Unexpected response:', data);
    throw new Error(data.message || data.code || 'Subscription failed');

  } catch (err) {
    console.error('[Zoho Campaigns] Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
