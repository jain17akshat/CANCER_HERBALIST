const https = require('https');

const options = {
  hostname: 'cancer-herbalist-rhgj.vercel.app',
  port: 443,
  path: '/api/admin/orders/CH-1783590335287-14PD/refund/initiate?key=ch-admin-2024',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response Body:', data);
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e);
});

req.write(JSON.stringify({}));
req.end();
