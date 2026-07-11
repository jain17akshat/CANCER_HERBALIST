/**
 * testZohoIntegration.js
 * 
 * Direct unit test for Zoho CRM and Zoho Books integrations using your .env credentials.
 * Run using:
 *   node testZohoIntegration.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { pushOrderToZoho } = require('./routes/zoho');
const { pushOrderToZohoBooks } = require('./routes/zohoBooks');

const mockOrder = {
  orderId: `TEST-CH-${Date.now()}`,
  customerName: 'Integration Tester',
  phone: '9999999999',
  email: 'tester@cancerherbalist.com',
  address: '456 Innovation Road',
  city: 'New Delhi',
  state: 'Delhi',
  pincode: '110001',
  productName: 'T-Cell Formula',
  productId: 'tcell-formula',
  quantity: 2,
  unitPrice: 3850,
  orderAmount: 7700,
  paymentMethod: 'Online - Razorpay',
  paymentStatus: 'PAID', // Set to PAID to test invoice payment recording
  razorpayPaymentId: 'pay_test_payment_123',
  orderDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
};

async function runTests() {
  console.log('🧪 Starting Zoho Integration Tests...\n');
  console.log(`Using Organization ID: ${process.env.ZOHO_BOOKS_ORGANIZATION_ID}`);
  console.log(`Using Client ID: ${process.env.ZOHO_CLIENT_ID}\n`);

  // 1. Test Zoho CRM
  console.log('--------------------------------------------------');
  console.log('1. Testing Zoho CRM (Contacts + Deals)...');
  try {
    const crmResult = await pushOrderToZoho(mockOrder);
    console.log('✅ Zoho CRM Test Success!');
    console.log('   Contact ID:', crmResult.contactId);
    console.log('   Deal ID:', crmResult.dealId);
  } catch (err) {
    console.error('❌ Zoho CRM Test Failed:', err.message);
  }

  // 2. Test Zoho Books
  console.log('\n--------------------------------------------------');
  console.log('2. Testing Zoho Books (Customers + Invoices + Payments)...');
  try {
    await pushOrderToZohoBooks(mockOrder);
    console.log('✅ Zoho Books Test Success!');
    console.log('   Check your Zoho Books dashboard for the new invoice and payment.');
  } catch (err) {
    console.error('❌ Zoho Books Test Failed:', err.message);
  }
  console.log('--------------------------------------------------\n');
}

runTests();
