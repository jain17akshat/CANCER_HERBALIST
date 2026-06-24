import React from 'react';
import { Link } from 'react-router-dom';
import { FaUndoAlt, FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '36px' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', borderLeft: `4px solid ${ACCENT}`, paddingLeft: '12px' }}>
      {title}
    </h2>
    <div style={{ color: '#475569', lineHeight: '1.85', fontSize: '14.5px' }}>
      {children}
    </div>
  </div>
);

export default function RefundPolicy() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`, padding: '120px 20px 60px', textAlign: 'center', color: '#fff' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${ACCENT}33`, border: `2px solid ${ACCENT}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px', color: ACCENT }}>
          <FaUndoAlt />
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '0 0 12px' }}>
          Refund & Returns Policy
        </h1>
        <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>Last updated: June 2025</p>
      </section>

      {/* Body */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '60px 20px 80px' }}>

        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: PRIMARY, fontWeight: 600, fontSize: '13px', textDecoration: 'none', marginBottom: '40px' }}>
          <FaArrowLeft fontSize="11px" /> Back to Home
        </Link>

        <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0' }}>

          <p style={{ color: '#64748b', lineHeight: '1.85', fontSize: '14.5px', marginBottom: '36px', padding: '16px 20px', background: '#f1f5f9', borderRadius: '10px', borderLeft: `4px solid ${ACCENT}` }}>
            At Cancer Herbalist, we are committed to ensuring your complete satisfaction with every purchase. Please read this policy carefully before placing your order.
          </p>

          {/* Eligible / Not Eligible Quick Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '16px', marginBottom: '36px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#166534', marginBottom: '12px' }}>
                <FaCheckCircle /> Eligible for Refund
              </div>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#166534' }}>
                <li>Damaged or defective product received</li>
                <li>Wrong item delivered</li>
                <li>Product not received within 15 days</li>
                <li>Tampered or unsealed packaging on arrival</li>
              </ul>
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#991b1b', marginBottom: '12px' }}>
                <FaTimesCircle /> Not Eligible for Refund
              </div>
              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#991b1b' }}>
                <li>Opened or partially used products</li>
                <li>Change of mind after delivery</li>
                <li>Allergic reactions (consult before ordering)</li>
                <li>Products purchased more than 7 days ago</li>
              </ul>
            </div>
          </div>

          <Section title="1. Return Window">
            <p>You may request a return within <strong>7 days of delivery</strong> for eligible items. Products must be returned in their original, unopened packaging with all seals intact.</p>
          </Section>

          <Section title="2. How to Request a Refund">
            <p>To initiate a return or refund, please follow these steps:</p>
            <ol style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Contact us via WhatsApp at <a href="https://wa.me/918884588835" style={{ color: ACCENT }}>+91 88845 88835</a> or email <a href="mailto:cancerherbalist@gmail.com" style={{ color: ACCENT }}>cancerherbalist@gmail.com</a></li>
              <li>Provide your Order ID, product name, and reason for return</li>
              <li>Share clear photographs of the product and packaging (for damaged/defective claims)</li>
              <li>Our team will review your request within <strong>2–3 business days</strong></li>
              <li>If approved, you will receive return shipping instructions</li>
            </ol>
          </Section>

          <Section title="3. Refund Processing">
            <p>Once the returned product is received and inspected, refunds are processed within <strong>5–7 business days</strong>. Refunds are issued via:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Bank Transfer (NEFT/IMPS):</strong> To your registered bank account</li>
              <li><strong>UPI:</strong> To your registered UPI ID</li>
            </ul>
            <p style={{ marginTop: '12px' }}>For Cash on Delivery (COD) orders, refunds are processed via bank transfer only. Please provide your bank account details at the time of the refund request.</p>
          </Section>

          <Section title="4. Shipping Costs for Returns">
            <p>If the return is due to a defective, damaged, or wrong product, <strong>we will cover the return shipping cost</strong>. For other eligible returns, the customer is responsible for return shipping charges.</p>
          </Section>

          <Section title="5. Cancellations">
            <p>Orders can be cancelled <strong>free of charge before dispatch</strong>. Once the product has been dispatched, cancellations are no longer possible. Contact us immediately at <a href="tel:+918884588835" style={{ color: ACCENT }}>+91 88845 88835</a> if you need to cancel.</p>
          </Section>

          <Section title="6. Consultation Bookings">
            <p>Free consultation appointments can be rescheduled up to <strong>24 hours before the booked slot</strong> without any charges. To reschedule, contact us via WhatsApp or call.</p>
          </Section>

          <Section title="7. Contact for Disputes">
            <p>If you are unsatisfied with the resolution of your refund request, please escalate to:</p>
            <div style={{ marginTop: '12px', padding: '16px 20px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '4px 0' }}><strong>Cancer Herbalist — Customer Support</strong></p>
              <p style={{ margin: '4px 0' }}>📞 <a href="tel:+918884588835" style={{ color: ACCENT }}>+91 88845 88835</a> (Mon–Sat, 9 AM–6 PM)</p>
              <p style={{ margin: '4px 0' }}>✉️ <a href="mailto:cancerherbalist@gmail.com" style={{ color: ACCENT }}>cancerherbalist@gmail.com</a></p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}
