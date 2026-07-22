import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FaFileSignature, FaCheckCircle, FaShieldAlt,
  FaLock, FaPhone, FaEnvelope, FaInfoCircle, FaLeaf
} from 'react-icons/fa';

const ACCENT = '#38bed5';

/* ── Consent Text ─────────────────────────────────────────────── */
const CONSENT_SECTIONS = [
  {
    title: '1. Nature of Services',
    text: `Cancer Herbalist provides integrative, evidence-based herbal and nutritional support as a complementary approach alongside conventional oncology treatments. Our services include herbal formulation protocols, dietary guidance, nutritional supplementation advice, and wellness consultations. These services are NOT a replacement for surgery, chemotherapy, radiotherapy, or any conventional medical treatment prescribed by your oncology team.`
  },
  {
    title: '2. No Claim of Cure',
    text: `By agreeing to this form, you acknowledge that Cancer Herbalist does not claim to diagnose, cure, treat, or prevent cancer or any other disease. Our practitioners are trained in integrative phytotherapy and nutritional science. Treatment outcomes vary between individuals and no specific results are guaranteed.`
  },
  {
    title: '3. Information Accuracy',
    text: `You confirm that all personal, medical, and health-related information provided to Cancer Herbalist is accurate and complete to the best of your knowledge. You agree to inform us of any changes to your medical condition, medications, or conventional treatments.`
  },
  {
    title: '4. Data Privacy & Storage',
    text: `Your personal and medical information is stored securely and used solely to provide you with personalized care recommendations. We comply with applicable Indian data protection regulations. Your data will never be sold or shared with third parties without your explicit consent, except as required by law.`
  },
  {
    title: '5. Voluntary Participation',
    text: `Participation in Cancer Herbalist's programs is entirely voluntary. You may withdraw at any time without penalty. You retain the right to refuse any recommended herbal formulation or dietary change at any time.`
  },
  {
    title: '6. Communication Consent',
    text: `You consent to receive consultation confirmations, appointment reminders, progress updates, and health information via email, SMS, and/or WhatsApp at the contact details you have provided. You may opt out of marketing communications at any time.`
  },
  {
    title: '7. Photography / Testimonial (Optional)',
    text: `Any photographs, case studies, or testimonials shared by you may be used for educational or promotional purposes only with your separate and explicit written permission. This consent form does not cover such use.`
  },
];

export default function ZohoConsent() {
  const [params] = useSearchParams();
  const [agreed, setAgreed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const name = params.get('name') || '';
  const email = params.get('email') || '';

  const handleConfirm = () => {
    if (!agreed) return;
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)', minHeight: '100vh', paddingTop: '100px' }}>

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '40px 20px 32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}18`, color: ACCENT, padding: '8px 18px', borderRadius: '999px', fontWeight: 600, fontSize: '13px', marginBottom: '16px' }}>
          <FaShieldAlt /> Integrative Care Consent
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#0f172a', marginBottom: '12px' }}>
          Patient Consent <span style={{ color: ACCENT }}>Form</span>
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto', color: '#64748b', lineHeight: '1.8', fontSize: '1rem' }}>
          Please read this consent form carefully before agreeing. Your agreement confirms that you understand and accept the terms of our integrative care services.
        </p>
      </section>

      <div style={{ maxWidth: '860px', margin: '0 auto 80px', padding: '0 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: '32px', alignItems: 'start' }}>

        {/* ── Left: Consent Document ── */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: `1px solid ${ACCENT}20` }}>

          {/* Document Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '2px solid #f1f5f9' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, fontSize: '20px' }}>
              <FaFileSignature />
            </div>
            <div>
              <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.2rem', fontWeight: 700 }}>
                Integrative Care Consent Agreement
              </h2>
              <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '12.5px' }}>
                Cancer Herbalist · {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Consent Sections */}
          {CONSENT_SECTIONS.map((s, i) => (
            <div key={i} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: i < CONSENT_SECTIONS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <h3 style={{ color: '#0f172a', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: '1.8', margin: 0 }}>{s.text}</p>
            </div>
          ))}

          {/* Agreement Checkbox */}
          <div style={{
            background: agreed ? '#f0fdf4' : '#f8fafc',
            border: `2px solid ${agreed ? '#22c55e' : '#e2e8f0'}`,
            borderRadius: '14px', padding: '20px', marginTop: '8px',
            transition: 'all 0.3s'
          }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', cursor: confirmed ? 'default' : 'pointer' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => !confirmed && setAgreed(e.target.checked)}
                disabled={confirmed}
                style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: ACCENT, flexShrink: 0 }}
              />
              <span style={{ color: '#334155', fontSize: '14px', lineHeight: '1.7', fontWeight: 500 }}>
                I have read, understood, and voluntarily agree to all sections of this Integrative Care Consent Agreement. I confirm that the information I provide is accurate and that I am over 18 years of age (or acting as a guardian).
              </span>
            </label>
          </div>

          {/* Submit button (mobile — shows below consent doc) */}
          <div style={{ marginTop: '24px', display: 'none' }} className="mobile-confirm-btn">
            {!confirmed ? (
              <button
                onClick={handleConfirm}
                disabled={!agreed}
                style={{
                  width: '100%', background: agreed ? ACCENT : '#94a3b8',
                  color: '#fff', border: 'none', padding: '14px', borderRadius: '12px',
                  fontWeight: 700, cursor: agreed ? 'pointer' : 'not-allowed',
                  fontSize: '14px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
                }}
              >
                <FaCheckCircle /> I Agree & Confirm
              </button>
            ) : (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <FaCheckCircle style={{ color: '#22c55e', fontSize: '28px', marginBottom: '8px' }} />
                <p style={{ color: '#22c55e', fontWeight: 700, margin: 0 }}>Consent Confirmed</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Action Panel ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '110px' }}>

          {/* Confirm Card */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 8px 32px rgba(0,0,0,0.09)', border: `1px solid ${ACCENT}20` }}>
            {!confirmed ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <FaLeaf style={{ color: ACCENT, fontSize: '18px' }} />
                  <h3 style={{ color: '#0f172a', fontSize: '16px', fontWeight: 700, margin: 0 }}>
                    Your Agreement
                  </h3>
                </div>
                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px', lineHeight: '1.6' }}>
                  Read the full consent document on the left, check the agreement box, then click below to confirm.
                </p>

                <button
                  onClick={handleConfirm}
                  disabled={!agreed}
                  style={{
                    width: '100%',
                    background: agreed
                      ? `linear-gradient(135deg, ${ACCENT}, #2e9ab0)`
                      : '#e2e8f0',
                    color: agreed ? '#fff' : '#94a3b8',
                    border: 'none', padding: '14px', borderRadius: '12px',
                    fontWeight: 700, cursor: agreed ? 'pointer' : 'not-allowed',
                    fontSize: '14px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                    transition: 'all 0.3s',
                    boxShadow: agreed ? '0 4px 18px rgba(56,190,213,0.35)' : 'none',
                  }}
                >
                  <FaCheckCircle /> I Agree & Confirm
                </button>

                {!agreed && (
                  <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '11.5px', marginTop: '10px' }}>
                    Please read and check the agreement box first
                  </p>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: '#f0fdf4', border: '3px solid #22c55e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', fontSize: '28px', color: '#22c55e'
                }}>
                  <FaCheckCircle />
                </div>
                <h4 style={{ color: '#0f172a', marginBottom: '8px', fontWeight: 700 }}>Consent Confirmed!</h4>
                {name && (
                  <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                    Thank you, <strong>{name}</strong>. Your consent has been recorded for this session.
                  </p>
                )}
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
                  <p style={{ color: '#166534', fontSize: '12px', margin: 0, lineHeight: '1.6' }}>
                    ✓ Agreed on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  {email && <p style={{ color: '#166534', fontSize: '12px', margin: '4px 0 0' }}>✓ {email}</p>}
                </div>
                <Link
                  to="/"
                  style={{
                    display: 'inline-block', color: ACCENT,
                    fontWeight: 600, fontSize: '13px', textDecoration: 'none'
                  }}
                >
                  ← Back to Home
                </Link>
              </div>
            )}
          </div>

          {/* Security Badge */}
          <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', borderRadius: '16px', padding: '20px', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FaLock style={{ color: ACCENT }} />
              <span style={{ fontWeight: 700, fontSize: '13px' }}>Your Privacy is Protected</span>
            </div>
            {[
              'Consent recorded securely',
              'Data never sold to third parties',
              'Compliant with Indian IT Act',
              'You may withdraw at any time',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12.5px', color: 'rgba(255,255,255,0.75)' }}>
                <FaCheckCircle style={{ color: '#22c55e', flexShrink: 0, fontSize: '11px' }} />
                {item}
              </div>
            ))}
          </div>

          {/* Help */}
          <div style={{ background: '#fff', borderRadius: '14px', padding: '18px', border: `1px solid ${ACCENT}20` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <FaInfoCircle style={{ color: ACCENT }} />
              <span style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>Questions?</span>
            </div>
            <a href="tel:+918884588835" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontSize: '13px', marginBottom: '8px' }}>
              <FaPhone style={{ color: ACCENT, fontSize: '11px' }} /> +91 88845 88835
            </a>
            <a href="mailto:cancerherbalist@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>
              <FaEnvelope style={{ color: ACCENT, fontSize: '11px' }} /> cancerherbalist@gmail.com
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: static !important;
          }
          .mobile-confirm-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
