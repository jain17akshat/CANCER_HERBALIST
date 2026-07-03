const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');

const createOrderRoute    = require('./routes/createOrder');
const verifyPaymentRoute  = require('./routes/verifyPayment');
const validateVpaRoute    = require('./routes/validateVpa');
const submitOrderRoute    = require('./routes/submitOrder');
const bookAppointmentRoute = require('./routes/bookAppointment');
const dynamicContentRoute  = require('./routes/dynamicContent');

const app  = express();
app.set('trust proxy', 1); // Trust Vercel's proxy for accurate rate limiting and to prevent ValidationErrors
const PORT = process.env.PORT || 5001;


/* ── Security headers ──────────────────────────────────────── */
app.use(helmet());

/* ── CORS ───────────────────────────────────────────────────── */
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://cancer-herbalist-s1bz.vercel.app',
  // Local development
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin) and whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin "${origin}" not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

/* ── Rate limiting ──────────────────────────────────────────── */
const isLocalRequest = (req) => {
  if (process.env.NODE_ENV === 'development') return true;
  const ip = req.ip || req.connection?.remoteAddress || '';
  return ip.includes('127.0.0.1') || ip.includes('::1') || ip.includes('localhost');
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,                 // Increased threshold to accommodate admin dashboard polling
  standardHeaders: true,
  legacyHeaders: false,
  skip: isLocalRequest,
  message: { error: 'Too many requests. Please try again later.' },
});

// Tighter limit on order creation to prevent Razorpay quota abuse
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: isLocalRequest,
  message: { error: 'Too many order requests. Please wait before trying again.' },
});

/* ── Body parser ────────────────────────────────────────────── */
app.use(express.json({ limit: '10kb' })); // Prevent large payload DoS

/* ── Health check ───────────────────────────────────────────── */
app.get('/', (_req, res) =>
  res.send('Cancer Herbalist Backend API is running successfully. 🌿')
);

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', service: 'Cancer Herbalist Payment API' })
);

/* ── Routes ─────────────────────────────────────────────────── */
app.use('/api', apiLimiter);
app.use('/api/create-order', orderLimiter);
app.use('/api/submit-order', orderLimiter);
app.use('/api', createOrderRoute);
app.use('/api', verifyPaymentRoute);
app.use('/api', validateVpaRoute);
app.use('/api', submitOrderRoute);
app.use('/api', bookAppointmentRoute);
app.use('/api', dynamicContentRoute);

/* ── Start ──────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n✅  Cancer Herbalist API running on port ${PORT}`);

  // Validate all critical env vars at startup
  const required = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'FRONTEND_URL'];
  const missing  = required.filter(k => !process.env[k]);
  if (missing.length) {
    console.error('\n❌  Missing required env vars:', missing.join(', '));
    console.error('   Set these in backend/.env or in your Vercel project settings.\n');
  }

  const shiprocketMissing = !process.env.SHIPROCKET_EMAIL || !process.env.SHIPROCKET_PASSWORD;
  if (shiprocketMissing) {
    console.warn('⚠️   SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD not set — orders will NOT be pushed to Shiprocket.');
  } else {
    console.log('✅  Shiprocket credentials found.');
  }

  const zohoMissing = !process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_REFRESH_TOKEN;
  if (zohoMissing) {
    console.warn('⚠️   ZOHO_CLIENT_ID / ZOHO_REFRESH_TOKEN not set — orders will NOT be pushed to Zoho CRM.');
  } else {
    console.log('✅  Zoho CRM credentials found.');
  }

  if (process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test_')) {
    console.warn('⚠️   Running with RAZORPAY TEST keys — do NOT use in production.');
  }
});

module.exports = app;
// Force nodemon reload: 2026-07-03
