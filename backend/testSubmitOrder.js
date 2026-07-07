const http = require('http');

const orderData = JSON.stringify({
  customerName: 'Test Customer',
  phone: '9876543210',
  email: 'test@example.com',
  address: '123 Test Street',
  city: 'Bangalore',
  state: 'Karnataka',
  pincode: '560001',
  productName: 'T-Cell Formula',
  productId: 'tcell-formula',
  quantity: 1,
  unitPrice: 3850,
  orderAmount: 3850,
  paymentMethod: 'COD / Bank Transfer'
});

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/submit-order',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(orderData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('BODY:');
    try {
      console.log(JSON.parse(body));
    } catch (e) {
      console.log(body);
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(orderData);
req.end();
