const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function run() {
  const paymentId = 'pay_TBMKsOALiBAbxY';
  try {
    console.log('Fetching payment details for:', paymentId);
    const payment = await razorpay.payments.fetch(paymentId);
    console.log('Payment Details:', payment);
  } catch (error) {
    console.error('Fetch Failed:', error);
  }
}

run();
