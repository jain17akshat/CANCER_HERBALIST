/**
 * zohoSign.js — Zoho Sign Integration (India Data Center)
 *
 * POST /api/zoho-sign/send-consent
 *   → Sends a consent form to the patient via Zoho Sign for e-signature
 *   → Uses a pre-created template stored in ZOHO_SIGN_TEMPLATE_ID
 *
 * GET  /api/zoho-sign/status/:requestId
 *   → Returns the signing status of a request
 */

const express = require('express');
const { getAccessToken } = require('../utils/zohoAuth');
const router = express.Router();

const ZOHO_SIGN_API = 'https://sign.zoho.in/api/v1';

/* ── POST /api/zoho-sign/send-consent ─────────────────────────── */
router.post('/zoho-sign/send-consent', async (req, res) => {
  const { name, email, phone, treatment, apptId } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'name and email are required.' });
  }

  const templateId = process.env.ZOHO_SIGN_TEMPLATE_ID;
  if (!templateId) {
    return res.status(503).json({
      success: false,
      error: 'Zoho Sign template not configured. Set ZOHO_SIGN_TEMPLATE_ID in environment variables.',
    });
  }

  if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_REFRESH_TOKEN) {
    return res.status(503).json({ success: false, error: 'Zoho OAuth not configured.' });
  }

  try {
    const token = await getAccessToken();

    // Step 1: Create a signing request from template
    const requestBody = {
      templates: {
        field_data: {
          field_text_data: {
            'Patient Name': name,
            'Phone Number': phone || '',
            'Consultation Type': treatment || 'General Consultation',
            'Appointment ID': apptId || '',
            'Date': new Date().toLocaleDateString('en-IN'),
          },
        },
        actions: [
          {
            recipient_name: name,
            recipient_email: email,
            action_type: 'SIGN',
            private_notes: `Please sign this consent form for your upcoming ${treatment || 'consultation'} at Cancer Herbalist.`,
          },
        ],
        notes: `Consent form for patient ${name} (Appointment: ${apptId || 'N/A'})`,
      },
    };

    const response = await fetch(`${ZOHO_SIGN_API}/templates/${templateId}/createdocument`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
      console.error('[Zoho Sign] Request creation failed:', JSON.stringify(data));
      throw new Error(data.message || `Zoho Sign API error (${response.status})`);
    }

    const requestId = data.requests?.request_id;
    console.log(`[Zoho Sign] Consent form sent to ${email} — Request ID: ${requestId}`);

    return res.json({
      success: true,
      requestId,
      message: `Consent form sent to ${email}. Please check your inbox to sign.`,
    });

  } catch (err) {
    console.error('[Zoho Sign] Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/* ── GET /api/zoho-sign/status/:requestId ───────────────────────── */
router.get('/zoho-sign/status/:requestId', async (req, res) => {
  const { requestId } = req.params;
  if (!requestId) return res.status(400).json({ success: false, error: 'requestId required.' });

  if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_REFRESH_TOKEN) {
    return res.status(503).json({ success: false, error: 'Zoho OAuth not configured.' });
  }

  try {
    const token = await getAccessToken();

    const response = await fetch(`${ZOHO_SIGN_API}/requests/${requestId}`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || `Status ${response.status}`);

    const req_status = data.requests?.request_status;
    return res.json({
      success: true,
      requestId,
      status: req_status, // e.g. "pending", "completed", "declined"
      signerStatus: data.requests?.actions?.[0]?.action_status,
    });

  } catch (err) {
    console.error('[Zoho Sign] Status check error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
