const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Step 1: Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Connection failed:', error.message);
  } else {
    console.log('✅ SMTP connection OK — sending test email...');

    // Step 2: Send test email
    transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // sends to yourself
      subject: '✅ Nodemailer Test',
      text: 'If you received this, Nodemailer is working correctly!',
      html: '<h2>✅ Nodemailer is working!</h2><p>Your email setup is configured correctly.</p>',
    }, (err, info) => {
      if (err) {
        console.log('❌ Send failed:', err.message);
      } else {
        console.log('✅ Email sent successfully!');
        console.log('   Message ID:', info.messageId);
        console.log('   Check inbox of:', process.env.GMAIL_USER);
      }
    });
  }
});
