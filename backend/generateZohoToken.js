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
  console.log('🌿 --- Zoho OAuth Refresh Token Generator (India Server — zoho.in) --- 🌿\n');
  console.log('Steps to get the required values:');
  console.log('1. Go to Zoho API Console: https://api-console.zoho.in');
  console.log('2. Click on your registered Client (e.g. "Self Client").');
  console.log('3. Under "Generate Code" tab, enter ALL of the following scopes');
  console.log('   (paste this entire line into the Scope field):');
  console.log('');
  console.log('   ZohoCRM.modules.contacts.ALL,ZohoCRM.modules.deals.ALL,ZohoCRM.modules.Events.ALL,ZohoBooks.fullaccess.ALL,ZohoSign.documents.ALL,ZohoCampaigns.contact.ALL,Desk.tickets.ALL,Desk.contacts.READ');
  console.log('');
  console.log('   What each scope does:');
  console.log('   • ZohoCRM.modules.contacts.ALL  → Create/update patient contacts in CRM');
  console.log('   • ZohoCRM.modules.deals.ALL     → Create order deals in CRM');
  console.log('   • ZohoCRM.modules.Events.ALL    → Create appointment events/meetings in CRM');
  console.log('   • ZohoBooks.fullaccess.ALL      → Create invoices and record payments in Books');
  console.log('   • ZohoSign.documents.ALL        → Send consent forms for e-signature');
  console.log('   • ZohoCampaigns.contact.ALL     → Subscribe patients to newsletter');
  console.log('   • Desk.tickets.ALL              → Create and manage support tickets');
  console.log('   • Desk.contacts.READ            → Read Desk contact info');
  console.log('');
  console.log('4. Select "No Expiry" (or "10 Minutes" for one-time use) and click GENERATE.');
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
