const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const path = require('path');

// Load .env
dotenv.config({ path: path.join(__dirname, '.env') });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

async function run() {
  console.log('Using Key ID:', process.env.RAZORPAY_KEY_ID);
  const paymentId = 'pay_TBMKsOALiBAbxY'; // From order CH-1783590335287-14PD
  
  try {
    console.log('Initiating refund on Razorpay for payment:', paymentId);
    const rzRefund = await razorpay.payments.refund(paymentId, {
      amount: 1000 // ₹10 in paise
    });
    console.log('Refund Success:', rzRefund);
  } catch (error) {
    console.log('Refund Failed.');
    console.log('Error Object:', error);
    console.log('Error keys:', Object.keys(error));
    console.log('Error message property:', error.message);
    console.log('Error description property:', error.description);
  }
}

run();
