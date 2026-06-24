import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileContract, FaArrowLeft } from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '36px' }}>
    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', borderLeft: `4px solid ${ACCENT}`, paddingLeft: '12px' }}>
      {title}
    </h2>
    <div style={{ color: '#475569', lineHeight: '1.85', fontSize: '14.5px' }}>{children}</div>
  </div>
);

export default function TermsOfService() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <section style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`, padding: '120px 20px 60px', textAlign: 'center', color: '#fff' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${ACCENT}33`, border: `2px solid ${ACCENT}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px', color: ACCENT }}>
          <FaFileContract />
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '0 0 12px' }}>Terms of Service</h1>
        <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>Last updated: June 2025</p>
      </section>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '60px 20px 80px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: PRIMARY, fontWeight: 600, fontSize: '13px', textDecoration: 'none', marginBottom: '40px' }}>
          <FaArrowLeft fontSize="11px" /> Back to Home
        </Link>

        <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', lineHeight: '1.85', fontSize: '14.5px', marginBottom: '36px', padding: '16px 20px', background: '#f1f5f9', borderRadius: '10px', borderLeft: `4px solid ${ACCENT}` }}>
            By accessing or using the Cancer Herbalist website and services, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.
          </p>

          <Section title="1. Medical Disclaimer">
            <div style={{ background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '10px', padding: '16px 20px' }}>
              <p style={{ fontWeight: 700, color: '#92400e', marginBottom: '6px' }}>⚕ Important Health Notice</p>
              <p style={{ color: '#78350f' }}>The information, products, and services on this website are for <strong>educational and complementary support purposes only</strong>. They are NOT intended to diagnose, cure, treat, or prevent any disease. Always consult your licensed oncologist before starting any herbal or nutritional protocol.</p>
            </div>
          </Section>

          <Section title="2. Our Services">
            <p>Cancer Herbalist provides herbal supplement products (FSSAI certified), free discovery consultations with integrative practitioners, educational content, and dietary guidance as complementary support.</p>
          </Section>

          <Section title="3. Product Use">
            <p>All products are FSSAI certified (Licence No. 11226998000043), intended as dietary supplements (not pharmaceutical drugs), and should be used under practitioner guidance. Results may vary between individuals.</p>
          </Section>

          <Section title="4. User Responsibilities">
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Provide accurate information during consultations and orders</li>
              <li>Do not use our services as a substitute for conventional medical treatment</li>
              <li>Disclose all existing medications to our practitioners</li>
              <li>Do not reproduce or commercially exploit our content without permission</li>
            </ul>
          </Section>

          <Section title="5. Orders & Payment">
            <p>All orders are subject to availability. Prices are in Indian Rupees (₹). We accept Cash on Delivery (COD) and bank transfers. Our team confirms and arranges payment post-order.</p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>All content on this website — text, images, videos, product formulations, and educational materials — is the exclusive intellectual property of Cancer Herbalist. Unauthorized use is strictly prohibited.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>Cancer Herbalist shall not be liable for any indirect or consequential damages from use of our website, products, or services. Our total liability shall not exceed the amount paid for the relevant product or service.</p>
          </Section>

          <Section title="8. Governing Law">
            <p>These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka, India.</p>
          </Section>

          <Section title="9. Contact">
            <div style={{ padding: '16px 20px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '4px 0' }}><strong>Cancer Herbalist</strong> — Agara Main Road, Kaggalipura, Bangalore 560116</p>
              <p style={{ margin: '4px 0' }}>📞 <a href="tel:+918884588835" style={{ color: ACCENT }}>+91 88845 88835</a> &nbsp;|&nbsp; ✉️ <a href="mailto:cancerherbalist@gmail.com" style={{ color: ACCENT }}>cancerherbalist@gmail.com</a></p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
