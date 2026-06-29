const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');

const createOrderRoute    = require('./routes/createOrder');
const verifyPaymentRoute  = require('./routes/verifyPayment');
const validateVpaRoute    = require('./routes/validateVpa');

const app  = express();
const PORT = process.env.PORT || 5001;

/* ── Middleware ─────────────────────────────────────────────── */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://cancer-herbalist-s1bz.vercel.app',
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
app.use('/api', validateVpaRoute);

/* ── Start ──────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n✅  Cancer Herbalist API → http://localhost:${PORT}`);
  
  // Print all loaded routes for debugging
  console.log('📡 Registered endpoints:');
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      console.log(`   - ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          const path = handler.route.path;
          const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
          console.log(`   - ${methods} /api${path}`);
        }
      });
    }
  });
  console.log(''); // newline

  if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
    console.warn('⚠️   RAZORPAY_KEY_ID is not set in backend/.env');
  }
});

module.exports = app;
