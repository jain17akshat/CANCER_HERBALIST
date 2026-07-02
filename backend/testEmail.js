const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('🔑 RESEND_API_KEY:', process.env.RESEND_API_KEY ? `***${process.env.RESEND_API_KEY.slice(-4)}` : 'NOT SET');

(async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',         // use this until you verify your domain
      to: ['cancerherbalist@gmail.com'],      // your inbox to receive test
      subject: '✅ Resend Email Test',
      html: '<h2>✅ Email is working!</h2><p>Resend is configured correctly for your Cancer Herbalist backend.</p>',
    });

    if (error) {
      console.log('❌ Send failed:', error);
    } else {
      console.log('✅ Email sent successfully! ID:', data.id);
      console.log('   Check inbox of: cancerherbalist@gmail.com');
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
})();
