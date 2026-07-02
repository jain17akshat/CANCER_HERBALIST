/**
 * testOrderEmail.js
 * Simulates a real order and sends both customer + admin emails.
 * Run: node testOrderEmail.js
 */

require('dotenv').config();
const { sendOrderConfirmationEmails } = require('./routes/emailService');

const mockOrder = {
  orderId:          'TEST-ORDER-001',
  customerName:     'Rahul Sharma',
  email:            'drherbalistindia@gmail.com',   // ← receives the customer email
  phone:            '9876543210',
  productName:      'Herbal Cancer Care Kit',
  quantity:         1,
  orderAmount:      2999,
  paymentMethod:    'COD',
  paymentStatus:    'PENDING',
  address:          '123 MG Road',
  city:             'Bangalore',
  state:            'Karnataka',
  pincode:          '560001',
  orderDate:        new Date().toLocaleString('en-IN'),
  razorpayPaymentId: null,
};

console.log('📦 Simulating order:', mockOrder.orderId);
console.log('📧 Customer email →', mockOrder.email);
console.log('📧 Admin email    →', process.env.ADMIN_EMAIL || 'cancerherbalist@gmail.com');
console.log('');

sendOrderConfirmationEmails(mockOrder)
  .then(() => console.log('✅ Done! Check both inboxes.'))
  .catch(err => console.error('❌ Error:', err.message));
