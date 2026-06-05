import React from 'react';
import { motion } from 'framer-motion';
import {
  FaRibbon, FaLungs, FaAppleAlt,
  FaHeartbeat, FaRegHospital, FaTint, FaArrowRight
} from 'react-icons/fa';

export default function Services() {
  const cancerServices = [
    {
      icon: <FaRibbon />,
      title: 'Breast Cancer Support',
      desc: 'Targeted herbal formulas designed to regulate hormone levels, support cell health, and minimize treatment side effects.',
      color: '#2563EB',
      gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)',
    },
    {
      icon: <FaLungs />,
      title: 'Lung Cancer Support',
      desc: 'Respiratory strengthening herbs that improve lung capacity, reduce coughing, and support pulmonary tissue resilience.',
      color: '#1E40AF',
      gradient: 'linear-gradient(135deg, #1E40AF, #2563EB)',
    },
    {
      icon: <FaAppleAlt />,
      title: 'Colon Cancer Support',
      desc: 'Gut-healing botanicals that optimize digestion, restore the intestinal flora, and soothe abdominal inflammation.',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #34D399)',
    },
    {
      icon: <FaHeartbeat />,
      title: 'Prostate Cancer Support',
      desc: 'Herbs targeting endocrine health, reducing inflammation in pelvic tissues, and supporting urinary tract function.',
      color: '#7C3AED',
      gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
    },
    {
      icon: <FaRegHospital />,
      title: 'Liver Cancer Support',
      desc: 'Hepatoprotective herbs that boost liver detoxification, aid cell regeneration, and improve metabolic strength.',
      color: '#DC2626',
      gradient: 'linear-gradient(135deg, #DC2626, #F87171)',
    },
    {
      icon: <FaTint />,
      title: 'Blood Cancer Support',
      desc: 'Immune system tonics and blood-purifying botanicals aimed at supporting marrow health and optimizing energy.',
      color: '#0891B2',
      gradient: 'linear-gradient(135deg, #0891B2, #22D3EE)',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-badge">
            <FaHeartbeat /> Our Treatment Support Programs
          </span>
          <h2 className="section-title">
            Specialized <span>Herbal Care</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We provide targeted, evidence-based herbal support protocols tailored for specific cancer types to complement standard medical treatments.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
          }}
        >
          {cancerServices.map((service, i) => (
            <motion.div
              key={service.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              whileHover={{ scale: 1.03, y: -8 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: 'var(--card-padding, 36px)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: service.color,
                  filter: 'blur(50px)',
                  opacity: 0.15,
                }}
              />

              <div>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: 'white',
                    marginBottom: '28px',
                    boxShadow: `0 8px 24px ${service.color}40`,
                  }}
                >
                  {service.icon}
                </div>

                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: 'var(--dark-2)',
                    marginBottom: '14px',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--gray-3)',
                    lineHeight: '1.7',
                    marginBottom: '24px',
                  }}
                >
                  {service.desc}
                </p>
              </div>

              <a
                href="#consultation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--primary-dark)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginTop: 'auto',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => (e.target.style.gap = '12px')}
                onMouseLeave={(e) => (e.target.style.gap = '8px')}
              >
                Inquire About Treatment <FaArrowRight style={{ fontSize: '12px', transition: 'all 0.3s' }} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}