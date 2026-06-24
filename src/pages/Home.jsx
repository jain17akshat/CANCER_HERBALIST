import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLeaf, FaHeartbeat, FaShieldAlt, FaMicroscope,
  FaHandHoldingHeart, FaSeedling, FaArrowRight
} from 'react-icons/fa';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import TrustBadges from '../components/TrustBadges';
import Services from '../components/Services';
import TreatmentProcess from '../components/TreatmentProcess';


const ACCENT = '#38bed5';

/* ─── Why Choose Us – unique to Home ─── */
const whyChooseUs = [
  {
    icon: <FaMicroscope />,
    title: 'Personalized Protocols',
    desc: 'Every patient receives a unique herbal formula tailored to their specific cancer type, staging, and treatment history.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Safety-First Approach',
    desc: 'All herbs are screened against your medications to eliminate drug-herb interactions before we begin.',
  },
  {
    icon: <FaHandHoldingHeart />,
    title: 'Continuous Support',
    desc: 'Weekly check-ins, diet adjustments, and formula refinements so you are never alone on your healing path.',
  },
  {
    icon: <FaSeedling />,
    title: 'Certified Organic Sourcing',
    desc: 'We source from GMP-certified organic farms with full lab-tested purity and potency reports.',
  },
];

/* ─── Healing Pillars – unique to Home ─── */
const healingPillars = [
  { icon: <FaLeaf />, title: 'Herbal Formulation', stat: '20+', statLabel: 'Custom Blends', desc: 'Precision-crafted tinctures combining ancient wisdom with modern pharmacognosy research.' },
  { icon: <FaHeartbeat />, title: 'Lifestyle Integration', stat: '95%', statLabel: 'Patient Compliance', desc: 'Anti-cancer nutrition plans, breathing protocols, and stress-reduction frameworks.' },
  { icon: <FaShieldAlt />, title: 'Immune Optimization', stat: '87%', statLabel: 'Improved Markers', desc: 'Targeted adaptogens and immunomodulators to strengthen your bodys natural defenses.' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <TrustBadges />
      <Services />
      <TreatmentProcess />

      {/* ═══ NEW: Why Choose Us – unique to Home page ═══ */}
      <section
        className="section-padding"
        style={{ background: 'var(--white)' }}
      >
        <div className="container">
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-badge">
              <FaShieldAlt /> What Sets Us Apart
            </span>
            <h2 className="section-title">
              Why Patients <span style={{ color: ACCENT }}>Trust Us</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Our integrative approach combines clinical precision with compassionate, whole-person care.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '24px',
            }}
          >
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                whileHover={{ y: -6 }}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '32px 28px',
                  boxShadow: 'var(--shadow-md)',
                  border: `1px solid ${ACCENT}18`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: ACCENT,
                    filter: 'blur(50px)',
                    opacity: 0.08,
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: `${ACCENT}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    color: ACCENT,
                    marginBottom: '20px',
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--dark-2)',
                    marginBottom: '10px',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.7' }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEW: Healing Pillars – unique to Home page ═══ */}
      <section
        className="section-padding"
        style={{
          background: 'linear-gradient(135deg, #f0fdfe 0%, #e0f7fa 50%, #f8fafc 100%)',
        }}
      >
        <div className="container">
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-badge">
              <FaLeaf /> Our Healing Framework
            </span>
            <h2 className="section-title">
              Three Pillars of <span style={{ color: ACCENT }}>Recovery</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A clinically structured framework that addresses the physical, nutritional, and immunological dimensions of cancer care.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '28px',
            }}
          >
            {healingPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                whileHover={{ y: -6, boxShadow: `0 16px 48px ${ACCENT}20` }}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  boxShadow: 'var(--shadow-md)',
                  border: `1px solid ${ACCENT}22`,
                  textAlign: 'center',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    color: 'white',
                    margin: '0 auto 20px',
                    boxShadow: `0 8px 24px ${ACCENT}33`,
                  }}
                >
                  {pillar.icon}
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'var(--dark-2)',
                    marginBottom: '8px',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  {pillar.title}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    gap: '6px',
                    marginBottom: '14px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '28px',
                      fontWeight: '800',
                      color: ACCENT,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {pillar.stat}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--gray-3)', fontWeight: '500' }}>
                    {pillar.statLabel}
                  </span>
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--gray-3)', lineHeight: '1.7' }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div data-aos="fade-up" style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: ACCENT,
                color: '#fff',
                padding: '16px 40px',
                borderRadius: '50px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '1rem',
                boxShadow: `0 8px 32px ${ACCENT}44`,
              }}
            >
              Start Your Healing Journey <FaArrowRight style={{ fontSize: '14px' }} />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}