/**
 * zohoAuth.js
 * 
 * Shared Zoho OAuth 2.0 helper to refresh and cache access tokens (India Data Center).
 */

const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.in/oauth/v2/token';

let _accessToken = null;
let _tokenExpiresAt = 0;

/**
 * Gets a valid Zoho access token, refreshing if needed.
 */
async function getAccessToken() {
  const now = Date.now();

  // Reuse cached token if it has more than 5 minutes of life left
  if (_accessToken && now < _tokenExpiresAt - 5 * 60 * 1000) {
    return _accessToken;
  }

  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN } = process.env;

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error('Zoho OAuth credentials not configured. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN in .env');
  }

  console.log('[Zoho Auth] Refreshing access token...');

  const params = new URLSearchParams({
    grant_type:    'refresh_token',
    client_id:     ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    refresh_token: ZOHO_REFRESH_TOKEN,
  });

  const res = await fetch(`${ZOHO_ACCOUNTS_URL}?${params}`, { method: 'POST' });
  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(`Zoho token refresh failed: ${data.error || res.status}`);
  }

  _accessToken    = data.access_token;
  _tokenExpiresAt = now + (data.expires_in || 3600) * 1000; // typically 1 hour

  console.log('[Zoho Auth] Access token successfully cached.');
  return _accessToken;
}

module.exports = { getAccessToken };
