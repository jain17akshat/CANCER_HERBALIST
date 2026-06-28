const express  = require('express');
const Razorpay = require('razorpay');
const router   = express.Router();

/* Initialize once with your keys from .env */
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * POST /api/create-order
 *
 * Body: { amount, productName, productId, customerName, phone, email }
 * Returns: { success, orderId, amount, currency, key }
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, productName, productId, customerName, phone, email } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid order amount.' });
    }

    const options = {
      amount:   Math.round(Number(amount) * 100), // paise
      currency: 'INR',
      receipt:  `ch_${Date.now()}`,
      notes: { productName, productId, customerName, phone, email },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success:  true,
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      key:      process.env.RAZORPAY_KEY_ID, // safe — this is the public key
    });
  } catch (err) {
    console.error('[create-order]', err.message);
    res.status(500).json({ error: 'Could not create order. Check your Razorpay keys.' });
  }
});

module.exports = router;
