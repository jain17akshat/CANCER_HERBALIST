/**
 * bookAppointment.js
 *
 * POST /api/book-appointment
 *   → Validates input, saves to Google Sheets, sends 2 emails (patient + admin)
 *
 * GET  /api/appointments?key=ADMIN_SECRET&date=YYYY-MM-DD
 *   → Returns all appointments (or filtered by date) for the admin dashboard
 */

const express = require('express');
const nodemailer = require('nodemailer');
const { validateSchema } = require('../utils/validateSchema');
const router = express.Router();

/* ── Gmail transporter ───────────────────────────────────────────── */
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

/* ── Patient confirmation email HTML ─────────────────────────────── */
function buildPatientEmailHtml(data) {
  const { name, treatment, stage, appointmentDay, appointmentSlot, message } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Appointment Confirmed — Cancer Herbalist</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a6e52 0%,#0f3460 100%);padding:40px 40px 32px;text-align:center;">
            <p style="margin:0 0 10px;font-size:36px;">🌿</p>
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Cancer Herbalist</h1>
            <p style="margin:8px 0 0;color:#a7f3d0;font-size:13px;letter-spacing:0.5px;">APPOINTMENT CONFIRMATION</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:36px 40px 0;">
            <h2 style="margin:0 0 10px;color:#0f172a;font-size:22px;">Your appointment is confirmed, ${name}! 🎉</h2>
            <p style="margin:0;color:#64748b;font-size:14px;line-height:1.8;">
              We look forward to connecting with you. Below are the details of your consultation booking.
            </p>
          </td>
        </tr>

        <!-- Appointment Card -->
        <tr>
          <td style="padding:24px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1.5px solid #22c55e44;border-radius:14px;overflow:hidden;">
              <tr>
                <td style="padding:18px 24px;border-bottom:1px solid #dcfce7;">
                  <p style="margin:0 0 3px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Date</p>
                  <p style="margin:0;font-size:15px;color:#0f172a;font-weight:700;">📅 ${appointmentDay}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 24px;border-bottom:1px solid #dcfce7;">
                  <p style="margin:0 0 3px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Time Slot</p>
                  <p style="margin:0;font-size:15px;color:#0f172a;font-weight:700;">🕐 ${appointmentSlot}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 24px;border-bottom:1px solid #dcfce7;">
                  <p style="margin:0 0 3px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Consultation Type</p>
                  <p style="margin:0;font-size:15px;color:#0f172a;font-weight:700;">🩺 ${treatment}</p>
                </td>
              </tr>
              ${stage ? `<tr>
                <td style="padding:18px 24px;">
                  <p style="margin:0 0 3px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Cancer Stage</p>
                  <p style="margin:0;font-size:15px;color:#0f172a;font-weight:700;">${stage}</p>
                </td>
              </tr>` : ''}
            </table>
          </td>
        </tr>

        <!-- What to Expect -->
        <tr>
          <td style="padding:0 40px 24px;">
            <h3 style="margin:0 0 16px;color:#0f172a;font-size:15px;font-weight:700;">What to Expect</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:8px 0;vertical-align:top;">
                <span style="background:#1a6e5218;color:#1a6e52;border-radius:50%;width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;margin-right:12px;">1</span>
                <span style="color:#475569;font-size:13.5px;">Our doctor will call you at your registered phone number at the booked time.</span>
              </td></tr>
              <tr><td style="padding:8px 0;vertical-align:top;">
                <span style="background:#1a6e5218;color:#1a6e52;border-radius:50%;width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;margin-right:12px;">2</span>
                <span style="color:#475569;font-size:13.5px;">Please keep your medical reports and prescriptions ready for reference.</span>
              </td></tr>
              <tr><td style="padding:8px 0;vertical-align:top;">
                <span style="background:#1a6e5218;color:#1a6e52;border-radius:50%;width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;margin-right:12px;">3</span>
                <span style="color:#475569;font-size:13.5px;">The consultation is completely free with no obligations.</span>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Reschedule Notice -->
        <tr>
          <td style="padding:0 40px 24px;">
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:14px 18px;">
              <p style="margin:0;color:#92400e;font-size:13px;line-height:1.6;">
                ⚠️ <strong>Need to reschedule?</strong> Please inform us at least 24 hours in advance via WhatsApp or call. Slots are limited.
              </p>
            </div>
          </td>
        </tr>

        <!-- WhatsApp CTA -->
        <tr>
          <td style="padding:0 40px 36px;text-align:center;">
            <a href="https://wa.me/918884588835" style="display:inline-block;background:#25d366;color:#ffffff;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:12px;">
              💬 Chat on WhatsApp
            </a>
            <p style="margin:12px 0 0;color:#94a3b8;font-size:12px;">
              Questions? Call <a href="tel:+918884588835" style="color:#1a6e52;font-weight:600;">+91 88845 88835</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#94a3b8;font-size:11.5px;line-height:1.7;">
              Cancer Herbalist | Kaggalipura, Bangalore 560116<br/>
              cancerherbalist@gmail.com | +91 88845 88835<br/>
              <span style="font-size:10px;">This is an automated confirmation. Please do not reply to this email.</span>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Admin notification email HTML ───────────────────────────────── */
function buildAdminEmailHtml(data) {
  const { name, phone, email, treatment, stage, appointmentDay, appointmentSlot, message } = data;
  const bookingTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Appointment — ${name}</title></head>
<body style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#1a6e52;color:#fff;padding:24px 32px;">
      <h2 style="margin:0;font-size:20px;">📅 New Appointment Booked</h2>
      <p style="margin:6px 0 0;opacity:0.8;font-size:13px;">Received: ${bookingTime} IST</p>
    </div>
    <div style="padding:28px 32px;">
      <table width="100%" cellpadding="8" cellspacing="0" style="font-size:13.5px;color:#334155;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#94a3b8;font-weight:600;width:40%;padding:10px 8px;">Patient Name</td>
          <td style="padding:10px 8px;"><strong style="color:#0f172a;">${name}</strong></td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#94a3b8;font-weight:600;padding:10px 8px;">Phone</td>
          <td style="padding:10px 8px;"><a href="tel:${phone}" style="color:#1a6e52;font-weight:700;">${phone}</a></td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#94a3b8;font-weight:600;padding:10px 8px;">Email</td>
          <td style="padding:10px 8px;">${email || '—'}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#94a3b8;font-weight:600;padding:10px 8px;">Date</td>
          <td style="padding:10px 8px;"><strong>📅 ${appointmentDay}</strong></td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#94a3b8;font-weight:600;padding:10px 8px;">Time Slot</td>
          <td style="padding:10px 8px;"><strong>🕐 ${appointmentSlot}</strong></td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#94a3b8;font-weight:600;padding:10px 8px;">Consultation</td>
          <td style="padding:10px 8px;">🩺 ${treatment}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#94a3b8;font-weight:600;padding:10px 8px;">Cancer Stage</td>
          <td style="padding:10px 8px;">${stage || 'Not specified'}</td>
        </tr>
        ${message ? `<tr>
          <td style="color:#94a3b8;font-weight:600;padding:10px 8px;vertical-align:top;">Message</td>
          <td style="padding:10px 8px;color:#475569;font-style:italic;">"${message}"</td>
        </tr>` : ''}
      </table>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;display:flex;gap:12px;text-align:center;">
      <a href="https://wa.me/91${String(phone).replace(/\D/g, '')}"
        style="display:inline-block;background:#25d366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;margin-right:8px;">
        WhatsApp Patient
      </a>
      <a href="tel:${phone}"
        style="display:inline-block;background:#1a6e52;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">
        Call Patient
      </a>
    </div>
  </div>
</body>
</html>`;
}

/* ── Save appointment to Google Sheets ───────────────────────── */
async function saveToSheets(appt) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) { console.warn('[bookAppointment] APPS_SCRIPT_URL not set — skipping Sheets.'); return; }
  try {
    const sheetUrl = new URL(url);
    // prefix keys so the Apps Script can route to an Appointments sheet
    const row = {
      type: 'APPOINTMENT',
      apptId: appt.apptId,
      name: appt.name,
      phone: appt.phone,
      email: appt.email,
      treatment: appt.treatment,
      stage: appt.stage || '',
      message: appt.message || '',
      appointmentDay: appt.appointmentDay,
      appointmentSlot: appt.appointmentSlot,
      bookedAt: appt.bookedAt,
      status: 'Confirmed',
    };
    Object.entries(row).forEach(([k, v]) => sheetUrl.searchParams.append(k, String(v ?? '')));
    const res = await fetch(sheetUrl.toString());
    if (!res.ok) console.warn('[bookAppointment] Sheets returned status:', res.status);
    else console.log('[bookAppointment] Appointment saved to Google Sheets.');
  } catch (e) {
    console.warn('[bookAppointment] Sheets error:', e.message);
  }
}

const appointmentStore = [];
let cachedAppointments = null;
let lastApptSyncTime = 0;
const APPT_SYNC_COOLDOWN_MS = 5000;

async function syncAppointmentsFromSheets(force = false) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return false;

  const now = Date.now();
  if (!force && cachedAppointments !== null && (now - lastApptSyncTime < APPT_SYNC_COOLDOWN_MS)) {
    return true;
  }

  try {
    const res = await fetch(`${url}?action=getRows&sheet=appointments`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (data.success) {
      const validAppts = (data.rows || []).filter(a => a && a.apptId && String(a.apptId).trim());
      cachedAppointments = validAppts;
      appointmentStore.length = 0;
      appointmentStore.push(...validAppts);
      lastApptSyncTime = Date.now();
      return true;
    }
  } catch (err) {
    console.error('[bookAppointment] Failed to sync appointments from Google Sheets:', err.message);
  }
  return false;
}

const bookAppointmentSchema = {
  name: { type: 'string', required: true, min: 2, max: 100, format: 'name' },
  phone: { type: 'string', required: true, format: 'phone' },
  email: { type: 'string', required: true, format: 'email', max: 100 },
  treatment: { type: 'string', required: true, min: 2, max: 100 },
  stage: { type: 'string', required: false, min: 1, max: 50 },
  message: { type: 'string', required: false, min: 0, max: 1000 },
  appointmentDay: { type: 'string', required: true, min: 2, max: 100 },
  appointmentSlot: { type: 'string', required: true, min: 2, max: 100 },
};

/* ── POST /api/book-appointment ──────────────────────────────── */
router.post('/book-appointment', async (req, res) => {
  const validationError = validateSchema(req.body, bookAppointmentSchema);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const {
    name, phone, email,
    treatment, stage, message,
    appointmentDay, appointmentSlot,
  } = req.body;

  // ── Slot conflict check ──────────────────────────────────
  const conflict = appointmentStore.find(a =>
    a.appointmentDay === appointmentDay &&
    a.appointmentSlot === appointmentSlot
  );
  if (conflict) {
    return res.status(409).json({
      success: false,
      error: `The ${appointmentSlot} slot on ${appointmentDay} is already booked. Please choose a different time.`,
    });
  }

  const apptId = `APT-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  const bookedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const appt = { apptId, name, phone, email, treatment, stage, message, appointmentDay, appointmentSlot, bookedAt };

  // Save to in-memory store
  appointmentStore.push(appt);

  const transporter = createTransporter();
  if (!transporter) {
    console.error('[bookAppointment] Email transporter not configured.');
    await saveToSheets(appt);
    return res.json({ success: true, apptId, warning: 'Email not configured on server.' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'cancerherbalist@gmail.com';
  const fromAddr = `"Cancer Herbalist" <${process.env.GMAIL_USER}>`;

  const data = { name, phone, email, treatment, stage, message, appointmentDay, appointmentSlot };

  try {
    await Promise.all([
      // 1. Patient confirmation
      transporter.sendMail({
        from: fromAddr,
        to: email,
        subject: `✅ Appointment Confirmed — ${appointmentDay} at ${appointmentSlot} | Cancer Herbalist`,
        text: `Dear ${name},\n\nYour consultation appointment has been confirmed.\n\nDate: ${appointmentDay}\nTime: ${appointmentSlot}\nConsultation: ${treatment}\n\nOur doctor will call you at your registered number at the booked time.\nQuestions? WhatsApp: +91 88845 88835\n\n— Cancer Herbalist Team`,
        html: buildPatientEmailHtml(data),
      }),

      // 2. Admin notification
      transporter.sendMail({
        from: fromAddr,
        to: adminEmail,
        subject: `📅 New Appointment: ${name} — ${appointmentDay} ${appointmentSlot}`,
        text: `New Appointment Booked\nPatient: ${name}\nPhone: ${phone}\nEmail: ${email}\nDate: ${appointmentDay}\nTime: ${appointmentSlot}\nConsultation: ${treatment}\nStage: ${stage || 'N/A'}\nMessage: ${message || 'None'}`,
        html: buildAdminEmailHtml(data),
      }),

      // 3. Save to Google Sheets
      saveToSheets(appt),
    ]);

    console.log(`[bookAppointment] Confirmation emails sent for ${name} (${email})`);
    res.json({ success: true, apptId });

  } catch (err) {
    console.error('[bookAppointment] Failed:', err.message);
    res.status(500).json({ success: false, error: 'Failed to send confirmation email. Please try again.' });
  }
});

/* ── GET /api/available-slots (public — no auth needed) ──────── */
// Returns booked slot times for a given appointmentDay string.
// Used by the Contact form to grey out already-booked slots.
router.get('/available-slots', async (req, res) => {
  const { date } = req.query; // partial match on appointmentDay
  if (!date) {
    return res.status(400).json({ success: false, error: 'date query param required.' });
  }
  await syncAppointmentsFromSheets();
  const booked = appointmentStore
    .filter(a => a.appointmentDay.toLowerCase() === date.toLowerCase())
    .map(a => a.appointmentSlot);
  res.json({ success: true, bookedSlots: booked });
});

// Admin auth check middleware with exponential backoff rate limiting
const checkAdmin = (req, res, next) => {
  checkAuthLockout(req, res, () => {
    const key = req.query.key || req.headers['x-admin-key'];
    const adminSecret = process.env.ADMIN_SECRET || 'ch-admin-2024';
    const ip = req.ip || req.connection?.remoteAddress || 'unknown';

    if (key !== adminSecret) {
      recordAuthFailure(ip);
      return res.status(401).json({ success: false, error: 'Unauthorized.' });
    }

    recordAuthSuccess(ip);
    next();
  });
};

/* ── GET /api/appointments (Admin dashboard) ─────────────────── */
router.get('/appointments', checkAdmin, async (req, res) => {
  const { date } = req.query;

  await syncAppointmentsFromSheets();
  let results = [...appointmentStore];

  // Optional: filter by date string (partial match on appointmentDay)
  if (date) {
    results = results.filter(a =>
      a.appointmentDay.toLowerCase().includes(date.toLowerCase())
    );
  }

  // Sort by slot time
  results.sort((a, b) => a.appointmentSlot.localeCompare(b.appointmentSlot));

  res.json({ success: true, count: results.length, appointments: results });
});

module.exports = router;
