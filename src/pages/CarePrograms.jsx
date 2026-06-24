import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaRibbon, FaLungs, FaAppleAlt, FaHeartbeat,
  FaRegHospital, FaTint, FaArrowRight,
  FaCalendarAlt, FaFileMedical, FaFileSignature,
  FaCapsules, FaUserShield, FaLeaf,
} from 'react-icons/fa';

const ACCENT      = '#38bed5';
const ACCENT_LIGHT = '#38bed520';
const ACCENT_MID  = '#38bed540';
const ACCENT_DARK = '#2ca8be';
const PRIMARY     = '#1a6e52';

/* ─── Cancer Support Cards ─────────────────────────────────────── */
const cancerServices = [
  { icon: <FaRibbon />,       title: 'Breast Cancer Support',   slug: 'breast-cancer',   desc: 'Targeted herbal formulas designed to regulate hormone levels, support cell health, and minimize treatment side effects.' },
  { icon: <FaLungs />,        title: 'Lung Cancer Support',     slug: 'lung-cancer',     desc: 'Respiratory strengthening herbs that improve lung capacity, reduce coughing, and support pulmonary tissue resilience.' },
  { icon: <FaAppleAlt />,     title: 'Colon Cancer Support',    slug: 'colon-cancer',    desc: 'Gut-healing botanicals that optimize digestion, restore the intestinal flora, and soothe abdominal inflammation.' },
  { icon: <FaHeartbeat />,    title: 'Prostate Cancer Support', slug: 'prostate-cancer', desc: 'Herbs targeting endocrine health, reducing inflammation in pelvic tissues, and supporting urinary tract function.' },
  { icon: <FaRegHospital />,  title: 'Liver Cancer Support',    slug: 'liver-cancer',    desc: 'Hepatoprotective herbs that boost liver detoxification, aid cell regeneration, and improve metabolic strength.' },
  { icon: <FaTint />,         title: 'Blood Cancer Support',    slug: 'blood-cancer',    desc: 'Immune system tonics and blood-purifying botanicals aimed at supporting marrow health and optimizing energy.' },
];

/* ─── Treatment Steps ──────────────────────────────────────────── */
const steps = [
  { num: '01', icon: <FaCalendarAlt />,   title: 'Free Consultation',          desc: 'Begin with a no-obligation discovery call with one of our senior practitioners. We listen to your story, understand your diagnosis, and explain how our programs work.' },
  { num: '02', icon: <FaFileMedical />,   title: 'Comprehensive Evaluation',   desc: 'A detailed review of all your medical records, diagnostic reports, imaging, lab values, and current medication list to fully assess your health.' },
  { num: '03', icon: <FaFileSignature />, title: 'Personalized Treatment Plan', desc: 'We formulate a customized herbal remedy plan alongside targeted nutritional and lifestyle guidance tailored specifically to your cancer type and stage.' },
  { num: '04', icon: <FaCapsules />,      title: 'Treatment Guidance',         desc: 'Receive your premium herbal formulations with step-by-step instructions on dosages, timing, and dietary protocols to follow.' },
  { num: '05', icon: <FaUserShield />,    title: 'Ongoing Follow-Up Support',  desc: 'Continuous monitoring, weekly check-ins, symptom tracking, and formula adjustments to ensure your recovery stays on track.' },
];

export default function CarePrograms() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* ── Hero Banner ── */}
      <section style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
        padding: '130px 20px 70px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* bg circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: ACCENT, opacity: 0.07, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: ACCENT, opacity: 0.06, filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
          <span style={{
            background: `${ACCENT}30`, border: `1px solid ${ACCENT}60`,
            color: ACCENT, padding: '6px 18px', borderRadius: '50px',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
            display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px',
          }}>
            <FaLeaf /> Our Care Programs
          </span>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900, lineHeight: 1.2, marginBottom: '20px',
          }}>
            Specialized <span style={{ color: ACCENT }}>Herbal Care</span> &amp; Your Healing Journey
          </h1>
          <p style={{ opacity: 0.85, lineHeight: '1.85', fontSize: '1.05rem', marginBottom: '36px' }}>
            Targeted, evidence-based herbal support for each cancer type — combined with a structured
            5-step treatment process to guide you from first consultation to full recovery.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* <Link to="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: ACCENT, color: '#fff', padding: '15px 34px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: `0 8px 28px ${ACCENT}55` }}>
              Book Free Consultation <FaArrowRight />
            </Link> */}
            <a href="#how-we-treat"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '15px 34px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '15px', border: '1px solid rgba(255,255,255,0.25)' }}>
              See How We Treat
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PART 1 — Specialized Herbal Care (Services)
      ══════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: 'clamp(60px, 8vw, 100px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header */}
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: `${ACCENT}15`, border: `1px solid ${ACCENT}33`,
              color: ACCENT, padding: '6px 18px', borderRadius: '50px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px',
            }}>
              <FaHeartbeat /> Condition-Specific Support
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: '#0f172a', marginBottom: '16px' }}>
              Specialized <span style={{ color: ACCENT }}>Herbal Care</span> by Cancer Type
            </h2>
            <p style={{ color: '#64748b', maxWidth: '620px', margin: '0 auto', lineHeight: '1.8', fontSize: '1rem' }}>
              We provide targeted, evidence-based herbal support protocols tailored for specific cancer
              types to complement standard medical treatments.
            </p>
          </div>

          {/* Cancer Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '28px',
          }}>
            {cancerServices.map((service, i) => (
              <motion.div
                key={service.slug}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                whileHover={{ scale: 1.03, y: -8 }}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
                  border: `1px solid ${ACCENT_MID}`,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Glow */}
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '120px', height: '120px', borderRadius: '50%', background: ACCENT, filter: 'blur(50px)', opacity: 0.09, pointerEvents: 'none' }} />

                <div>
                  {/* Icon */}
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white', marginBottom: '24px', boxShadow: `0 8px 24px ${ACCENT}44` }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', fontFamily: 'Playfair Display, serif' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.75', marginBottom: '24px' }}>
                    {service.desc}
                  </p>
                </div>

                <Link
                  to={`/services/${service.slug}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: ACCENT, textDecoration: 'none', fontSize: '14px', fontWeight: 600, padding: '10px 20px', background: `${ACCENT}15`, borderRadius: '50px', border: `1px solid ${ACCENT}44`, width: 'fit-content', transition: 'gap 0.3s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
                >
                  Learn More <FaArrowRight style={{ fontSize: '12px' }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════════════ */}
      <div style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)`, height: '2px', maxWidth: '800px', margin: '0 auto' }} />

      {/* ══════════════════════════════════════════════════
          PART 2 — Your Healing Journey (Treatment Process)
      ══════════════════════════════════════════════════ */}
      <section id="how-we-treat" style={{
        background: `linear-gradient(180deg, ${ACCENT_LIGHT} 0%, #ffffff 50%, ${ACCENT_LIGHT} 100%)`,
        padding: 'clamp(60px, 8vw, 100px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header */}
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: `${ACCENT}15`, border: `1px solid ${ACCENT}33`,
              color: ACCENT, padding: '6px 18px', borderRadius: '50px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px',
            }}>
              <FaFileMedical /> How We Support You
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: '#0f172a', marginBottom: '16px' }}>
              Your Healing <span style={{ color: ACCENT }}>Journey</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '580px', margin: '0 auto', lineHeight: '1.8', fontSize: '1rem' }}>
              A structured, professional step-by-step methodology to support your recovery process
              through personalized herbal care.
            </p>
          </div>

          {/* Steps Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: '28px',
            position: 'relative',
          }}>
            {/* Connector line (desktop only) */}
            <div className="care-connector" style={{
              position: 'absolute',
              top: '50px', left: '40px', right: '40px',
              height: '3px',
              background: `linear-gradient(90deg, ${ACCENT_MID}, ${ACCENT}, ${ACCENT_MID})`,
              zIndex: 0, opacity: 0.6,
            }} />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                whileHover={{ scale: 1.04, y: -10 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '32px 24px',
                  boxShadow: `0 10px 30px ${ACCENT_LIGHT}`,
                  position: 'relative',
                  zIndex: 1,
                  border: `1px solid ${ACCENT_MID}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Step badge */}
                <div style={{
                  position: 'absolute', top: '-15px', right: '20px',
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`,
                  padding: '5px 14px', borderRadius: '50px',
                  fontSize: '12px', fontWeight: 800, color: '#fff',
                  boxShadow: `0 6px 18px ${ACCENT_MID}`,
                }}>
                  {step.num}
                </div>

                {/* Icon */}
                <div style={{
                  width: '68px', height: '68px', borderRadius: '50%',
                  background: ACCENT_LIGHT, color: ACCENT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '26px', margin: '0 auto 22px',
                  border: `2px solid ${ACCENT_MID}`,
                  boxShadow: `0 0 0 10px ${ACCENT_LIGHT}`,
                }}>
                  {step.icon}
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', fontFamily: 'Poppins, sans-serif' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.75' }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Strip ── */}
      <section style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
        padding: '60px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: ACCENT, opacity: 0.06, filter: 'blur(60px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '620px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginBottom: '14px' }}>
            Ready to Begin Your <span style={{ color: ACCENT }}>Healing Journey?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', marginBottom: '32px', fontSize: '1rem' }}>
            Book a free 30-minute consultation with one of our senior practitioners today.
          </p>
          <Link to="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: ACCENT, color: '#fff', padding: '16px 40px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: `0 8px 32px ${ACCENT}55` }}>
            Book Free Consultation <FaArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .care-connector { display: none !important; }
        }
      `}</style>
    </div>
  );
}
