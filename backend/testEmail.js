const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('📧 GMAIL_USER:', process.env.GMAIL_USER);
console.log('🔑 GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? `***${process.env.GMAIL_APP_PASSWORD.slice(-4)} (len: ${process.env.GMAIL_APP_PASSWORD.length})` : 'NOT SET');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log('❌ Connection failed:', error.message);
  } else {
    console.log('✅ Gmail SMTP connected — sending test email...');
    transporter.sendMail({
      from: `"Cancer Herbalist" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: '✅ Gmail SMTP Test',
      html: '<h2>✅ Gmail SMTP is working!</h2>',
    }, (err, info) => {
      if (err) console.log('❌ Send failed:', err.message);
      else console.log('✅ Email sent! ID:', info.messageId);
    });
  }
});
