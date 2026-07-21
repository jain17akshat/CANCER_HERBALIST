/**
 * supabaseClient.js
 *
 * Singleton Supabase client for the Cancer Herbalist backend.
 * All routes import from here so we create the client exactly once.
 *
 * Required env vars (add to backend/.env and Vercel project settings):
 *   SUPABASE_URL       = https://xxxxxxxxxxx.supabase.co
 *   SUPABASE_ANON_KEY  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl  = process.env.SUPABASE_URL;
const supabaseKey  = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '⚠️  SUPABASE_URL or SUPABASE_ANON_KEY not set — Supabase storage disabled. ' +
    'Falling back to in-memory / filesystem storage.'
  );
}

// createClient is safe to call even with empty strings — it just won't connect.
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

module.exports = supabase;
