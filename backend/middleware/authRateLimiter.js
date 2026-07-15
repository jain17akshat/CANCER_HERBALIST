/**
 * authRateLimiter.js
 * 
 * Custom rate limiter for admin authentication paths.
 * Implements exponential backoff per IP address on failed attempts.
 */

// In-memory store for tracking auth failures
// Structure: { ipAddress: { count: Number, lockedUntil: Timestamp, lastAttempt: Timestamp } }
const failureCache = new Map();

// Load configurations from process.env with sensible defaults
const BASE_COOLDOWN = Number(process.env.AUTH_LIMIT_BASE_COOLDOWN_MS) || 5000; // 5 seconds
const MAX_COOLDOWN = Number(process.env.AUTH_LIMIT_MAX_COOLDOWN_MS) || 1800000; // 30 minutes
const WINDOW_MS = Number(process.env.AUTH_LIMIT_WINDOW_MS) || 86400000; // 24 hours to clear history
const MAX_FAILURES = Number(process.env.RATE_LIMIT_MAX_AUTH_FAILURES) || 5;

// Periodically clean up stale entries from memory
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of failureCache.entries()) {
    if (now - data.lastAttempt > WINDOW_MS) {
      failureCache.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Clean up every hour

/**
 * Middleware that checks if an IP is currently locked out.
 */
function checkAuthLockout(req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    return next(); // Skip during local development testing if desired, or keep active
  }

  const ip = req.ip || req.connection?.remoteAddress || 'unknown-ip';
  const now = Date.now();
  const data = failureCache.get(ip);

  if (data && data.lockedUntil > now) {
    const waitSeconds = Math.ceil((data.lockedUntil - now) / 1000);
    return res.status(429).json({
      success: false,
      error: `Too many authentication attempts. Please try again in ${waitSeconds} seconds.`,
    });
  }

  next();
}

/**
 * Helper to record a failed auth attempt and compute next lockout timestamp.
 */
function recordAuthFailure(ip) {
  const now = Date.now();
  let data = failureCache.get(ip);

  if (!data || (now - data.lastAttempt > WINDOW_MS)) {
    data = { count: 0, lockedUntil: 0, lastAttempt: now };
  }

  data.count += 1;
  data.lastAttempt = now;

  // Exponential backoff logic: delay doubles with each consecutive failure
  // 1st failure: count=1, delay = 0 (no lockout)
  // 2nd failure: count=2, delay = BASE_COOLDOWN * 2^0 = 5s
  // 3rd failure: count=3, delay = BASE_COOLDOWN * 2^1 = 10s
  // 4th failure: count=4, delay = BASE_COOLDOWN * 2^2 = 20s
  // 5th failure: count=5, delay = BASE_COOLDOWN * 2^3 = 40s, and so on...
  if (data.count >= 2) {
    const exponent = Math.min(data.count - 2, 10); // cap exponent to prevent overflow
    const delay = Math.min(BASE_COOLDOWN * Math.pow(2, exponent), MAX_COOLDOWN);
    data.lockedUntil = now + delay;
    console.warn(`[Auth rate-limit] IP ${ip} locked out for ${delay / 1000}s (Failure count: ${data.count})`);
  }

  failureCache.set(ip, data);
}

/**
 * Helper to clear failures on successful authentication.
 */
function recordAuthSuccess(ip) {
  if (failureCache.has(ip)) {
    failureCache.delete(ip);
  }
}

module.exports = {
  checkAuthLockout,
  recordAuthFailure,
  recordAuthSuccess,
};
