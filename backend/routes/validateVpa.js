const express = require('express');
const router  = express.Router();

/**
 * POST /api/validate-vpa
 *
 * Validates a Virtual Payment Address (VPA / UPI ID) using Razorpay's API.
 * Body: { vpa }
 * Returns: { success, customerName, vpa }
 */
router.post('/validate-vpa', async (req, res) => {
  const { vpa } = req.body;
  console.log(`[validate-vpa] Incoming Request -> VPA: "${vpa}", Key ID: "${process.env.RAZORPAY_KEY_ID || 'NOT SET'}"`);

  try {
    if (!vpa || !vpa.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please enter a valid VPA format (e.g., username@bank).' });
    }

    // 1. Mock successful verification in Test Mode
    const keyId = process.env.RAZORPAY_KEY_ID || '';
    if (keyId.startsWith('rzp_test_')) {
      return res.json({
        success: true,
        customerName: 'Test UPI Account (Mode: Test)',
        vpa: vpa.trim(),
        isMock: true,
      });
    }

    // 2. Real validation in Live Mode
    const authString = `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`;
    const authHeader = `Basic ${Buffer.from(authString).toString('base64')}`;

    const apiRes = await fetch('https://api.razorpay.com/v1/payments/validate/vpa', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ vpa }),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      // If Razorpay returns a 400 or 404 (e.g., endpoint deprecated or API not enabled for merchant)
      // fall back to format verification so the user checkout is not blocked.
      if (apiRes.status === 400 || apiRes.status === 404) {
        console.warn(`[validate-vpa] Razorpay returned status ${apiRes.status}. Falling back to format validation.`);
        return res.json({
          success: true,
          customerName: 'UPI Account (Format Verified)',
          vpa: vpa.trim(),
          warning: 'Automatic verification unavailable. Format is valid.',
        });
      }

      return res.status(apiRes.status).json({
        success: false,
        error:   data.error?.description || 'Verification failed. Please check the UPI ID.',
      });
    }

    res.json({
      success:      data.success,
      customerName: data.customer_name,
      vpa:          data.vpa,
    });

  } catch (err) {
    console.error('[validate-vpa] Error:', err.message);
    
    // 3. Fallback for network issues, fetch not supported in older Node versions, etc.
    // Allow the customer to proceed if the format is correct
    if (vpa && vpa.includes('@')) {
      return res.json({
        success: true,
        customerName: 'UPI Account (Format Verified)',
        vpa: vpa.trim(),
        warning: 'Verification service offline. Proceeding with format verification.',
      });
    }

    res.status(500).json({ success: false, error: 'Could not connect to Razorpay validation service.' });
  }
});

module.exports = router;
