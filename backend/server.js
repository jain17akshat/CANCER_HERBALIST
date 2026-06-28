require('dotenv').config();
const express = require('express');
const cors = require('cors');

const createOrderRoute    = require('./routes/createOrder');
const verifyPaymentRoute  = require('./routes/verifyPayment');

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ─────────────────────────────────────────────── */
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

/* ── Health check ───────────────────────────────────────────── */
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', service: 'Cancer Herbalist Payment API' })
);

/* ── Routes ─────────────────────────────────────────────────── */
app.use('/api', createOrderRoute);
app.use('/api', verifyPaymentRoute);

/* ── Start ──────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`✅  Cancer Herbalist API → http://localhost:${PORT}`);
  if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
    console.warn('⚠️   RAZORPAY_KEY_ID is not set in backend/.env');
  }
});
