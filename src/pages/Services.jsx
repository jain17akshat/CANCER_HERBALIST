import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaRibbon, FaLungs, FaAppleAlt,
  FaHeartbeat, FaRegHospital, FaTint, FaArrowRight
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const ACCENT_MID = '#38bed533';

const cancerServices = [
  { icon: <FaRibbon />, title: 'Breast Cancer Support', slug: 'breast-cancer', desc: 'Targeted herbal formulas designed to regulate hormone levels, support cell health, and minimize treatment side effects.' },
  { icon: <FaLungs />, title: 'Lung Cancer Support', slug: 'lung-cancer', desc: 'Respiratory strengthening herbs that improve lung capacity, reduce coughing, and support pulmonary tissue resilience.' },
  { icon: <FaAppleAlt />, title: 'Colon Cancer Support', slug: 'colon-cancer', desc: 'Gut-healing botanicals that optimize digestion, restore the intestinal flora, and soothe abdominal inflammation.' },
  { icon: <FaHeartbeat />, title: 'Prostate Cancer Support', slug: 'prostate-cancer', desc: 'Herbs targeting endocrine health, reducing inflammation in pelvic tissues, and supporting urinary tract function.' },
  { icon: <FaRegHospital />, title: 'Liver Cancer Support', slug: 'liver-cancer', desc: 'Hepatoprotective herbs that boost liver detoxification, aid cell regeneration, and improve metabolic strength.' },
  { icon: <FaTint />, title: 'Blood Cancer Support', slug: 'blood-cancer', desc: 'Immune system tonics and blood-purifying botanicals aimed at supporting marrow health and optimizing energy.' },
];

export default function Services() {
  return (
    <section id="services" className="section-padding" style={{ background: 'var(--white)', paddingTop: '120px' }}>
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-badge">
            <FaHeartbeat /> Our Treatment Support Programs
          </span>
          <h1 className="section-title">
            Specialized <span style={{ color: ACCENT }}>Herbal Care</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We provide targeted, evidence-based herbal support protocols tailored for specific
            cancer types to complement standard medical treatments.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '30px' }}>
          {cancerServices.map((service, i) => (
            <motion.div
              key={service.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              whileHover={{ scale: 1.03, y: -8 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: 'var(--shadow-md)',
                border: `1px solid ${ACCENT_MID}`,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '120px', height: '120px', borderRadius: '50%', background: ACCENT, filter: 'blur(50px)', opacity: 0.1, pointerEvents: 'none' }} />

              <div>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white', marginBottom: '28px', boxShadow: `0 8px 24px ${ACCENT_MID}` }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '14px', fontFamily: 'Playfair Display, serif' }}>{service.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.7', marginBottom: '24px' }}>{service.desc}</p>
              </div>

              <Link
                to={`/services/${service.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: ACCENT,
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  width: 'fit-content',
                  transition: 'gap 0.3s ease',
                  padding: '10px 20px',
                  background: `${ACCENT}15`,
                  borderRadius: '50px',
                  border: `1px solid ${ACCENT}44`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
                onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
              >
                Read More <FaArrowRight style={{ fontSize: '12px' }} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}