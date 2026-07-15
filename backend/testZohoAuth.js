const { getAccessToken } = require('./utils/zohoAuth');
require('dotenv').config();

async function test() {
  try {
    const token = await getAccessToken();
    console.log('✅ Zoho OAuth token successfully retrieved:', token.substring(0, 10) + '...');
  } catch (error) {
    console.error('❌ Zoho OAuth token retrieval failed:', error.message);
  }
}

test();
