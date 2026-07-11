/**
 * generateZohoToken.js
 * 
 * Simple utility script to exchange a Zoho authorization Grant Code (from Self Client)
 * for a permanent Refresh Token.
 * 
 * Run it using:
 *   node generateZohoToken.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🌿 --- Zoho OAuth Refresh Token Generator (India Server) --- 🌿\n');
  console.log('Steps to get the required values:');
  console.log('1. Go to Zoho API Console: https://api-console.zoho.in');
  console.log('2. Click on your registered Client (e.g. "Self Client").');
  console.log('3. Under "Generate Code" tab, enter scope:');
  console.log('   ZohoCRM.modules.contacts.ALL,ZohoCRM.modules.deals.ALL,ZohoBooks.fullaccess.ALL');
  console.log('4. Select "10 Minutes" duration and click GENERATE.');
  console.log('5. Copy the generated Grant Code and paste below.\n');

  try {
    const clientId = (await askQuestion('Enter ZOHO_CLIENT_ID: ')).trim();
    const clientSecret = (await askQuestion('Enter ZOHO_CLIENT_SECRET: ')).trim();
    const code = (await askQuestion('Enter generated Grant Code: ')).trim();

    if (!clientId || !clientSecret || !code) {
      console.log('\n❌ All fields are required!');
      rl.close();
      return;
    }

    console.log('\nExchanging code for token...');

    const tokenUrl = 'https://accounts.zoho.in/oauth/v2/token';
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: 'http://localhost:3000'
    });

    const response = await fetch(`${tokenUrl}?${params}`, {
      method: 'POST'
    });

    const data = await response.json();

    if (data.error) {
      console.error('\n❌ Zoho API Error:', data.error);
      if (data.error === 'invalid_code') {
        console.log('Note: The grant code might have expired (valid for 10 minutes) or has already been used once.');
      }
    } else {
      console.log('\n✅ Success! Here are your credentials:');
      console.log('--------------------------------------------------');
      console.log(`ZOHO_CLIENT_ID=${clientId}`);
      console.log(`ZOHO_CLIENT_SECRET=${clientSecret}`);
      console.log(`ZOHO_REFRESH_TOKEN=${data.refresh_token}`);
      console.log('--------------------------------------------------');
      console.log('\nCopy these directly into your backend/.env file and restart/redeploy the server.');
    }
  } catch (error) {
    console.error('\n❌ Network or execution error:', error.message);
  } finally {
    rl.close();
  }
}

main();
