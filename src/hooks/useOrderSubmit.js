/**
 * useOrderSubmit.js
 *
 * Submits order data to a Google Apps Script Web App which writes to Google Sheets.
 * The Apps Script URL is stored in the VITE_APPS_SCRIPT_URL environment variable.
 *
 * Returns { submitOrder, status, error, reset }
 *   status: 'idle' | 'submitting' | 'success' | 'error'
 */

import { useState, useCallback } from 'react';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export function useOrderSubmit() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError]   = useState(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  /**
   * @param {Object} orderData  - All order fields
   * @returns {Promise<{orderId: string}>}
   */
  const submitOrder = useCallback(async (orderData) => {
    if (!APPS_SCRIPT_URL) {
      console.error('[useOrderSubmit] VITE_APPS_SCRIPT_URL is not set in .env');
      setStatus('error');
      setError('Configuration error: order endpoint not set.');
      return;
    }

    setStatus('submitting');
    setError(null);

    // Generate a client-side order ID as a fallback reference
    const orderId = `CH-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const payload = {
      ...orderData,
      orderId,
      orderDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      // Apps Script redirects POST → GET, so doPost never fires.
      // Reliable approach: send as GET with URL query parameters.
      const url = new URL(APPS_SCRIPT_URL);
      Object.entries(payload).forEach(([k, v]) =>
        url.searchParams.append(k, String(v))
      );

      await fetch(url.toString(), { mode: 'no-cors' });

      // no-cors gives an opaque response — reaching here means success
      setStatus('success');
      return { orderId };
    } catch (err) {
      console.error('[useOrderSubmit]', err);
      setStatus('error');
      setError(err.message || 'Failed to place order. Please try again.');
      throw err;
    }
  }, []);

  return { submitOrder, status, error, reset };
}
