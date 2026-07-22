import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaArrowLeft, FaExclamationTriangle, FaStethoscope } from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

export default function MedicalDisclaimer() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`, padding: '130px 20px 60px', textAlign: 'center', color: '#fff' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${ACCENT}33`, border: `2px solid ${ACCENT}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px', color: ACCENT }}>
          <FaStethoscope />
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '0 0 12px' }}>
          Medical Disclaimer
        </h1>
        <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>Important Clinical &amp; Educational Disclosures</p>
      </section>

      {/* BODY */}
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '60px 20px 80px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: PRIMARY, fontWeight: 600, fontSize: '13px', textDecoration: 'none', marginBottom: '32px' }}>
          <FaArrowLeft style={{ fontSize: '11px' }} /> Back to Home
        </Link>

        <div style={{ background: '#fff', borderRadius: '24px', padding: 'clamp(24px, 5vw, 44px)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          
          <div style={{ background: '#fffbeb', borderLeft: '4px solid #d97706', borderRadius: '12px', padding: '20px 24px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b45309', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>
              <FaExclamationTriangle /> Important Notice
            </div>
            <p style={{ color: '#78350f', fontSize: '0.94rem', lineHeight: '1.7', margin: 0 }}>
              The information and herbal formulations provided by Cancer Herbalist are intended solely for complementary health support and educational purposes. They are not intended as a substitute for professional oncological medical advice, diagnosis, or treatment.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#475569', lineHeight: '1.85', fontSize: '14.5px' }}>
            <div>
              <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 10px', borderLeft: `3px solid ${ACCENT}`, paddingLeft: '10px' }}>
                1. Educational &amp; Complementary Scope
              </h3>
              <p>
                All content on this website—including articles, videos, product descriptions, and consultation summaries—is published for general educational purposes. Our botanical therapies (Herbal Chemotherapy / HCT) are designed to provide phytotherapeutic cellular support and mitigate treatment side effects alongside standard oncology protocols.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 10px', borderLeft: `3px solid ${ACCENT}`, paddingLeft: '10px' }}>
                2. Non-Substitution of Conventional Oncology
              </h3>
              <p>
                Patients should never disregard, delay, or modify their conventional medical treatments (such as surgery, chemotherapy, or radiation) based on information presented on this platform. Always consult your primary oncologist or qualified healthcare team before starting any new dietary or herbal intervention.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 10px', borderLeft: `3px solid ${ACCENT}`, paddingLeft: '10px' }}>
                3. Individual Treatment Responses
              </h3>
              <p>
                Biological responses to phytotherapeutic protocols vary between individuals depending on tumor genetics, stage, baseline organ filtration capacity, and concurrent oncology regimens. Testimonials and case studies shared on this site reflect individual patient experiences and do not guarantee identical outcomes for every individual.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 10px', borderLeft: `3px solid ${ACCENT}`, paddingLeft: '10px' }}>
                4. Safety &amp; Herb-Drug Interaction Audits
              </h3>
              <p>
                Our pharmacology board conducts rigorous reviews to evaluate potential herb-drug interactions. Patients are required to disclose a complete list of current prescription medications to enable safe compounding.
              </p>
            </div>

            <div style={{ marginTop: '16px', padding: '20px 24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#0f172a' }}>Cancer Herbalist Clinical Support Desk</p>
              <p style={{ margin: '0', fontSize: '13.5px', color: '#64748b' }}>
                📞 +91 88845 88835 | ✉️ cancerherbalist@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
