import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt, FaFileMedical, FaFileSignature,
  FaCapsules, FaUserShield, FaArrowRight
} from 'react-icons/fa';

export default function TreatmentMethods() {
  const steps = [
    {
      num: '01',
      icon: <FaCalendarAlt />,
      title: 'Initial Consultation',
      desc: 'Book your free discovery consultation to discuss your medical history, current condition, and treatment goals.',
    },
    {
      num: '02',
      icon: <FaFileMedical />,
      title: 'Comprehensive Evaluation',
      desc: 'Our medical team reviews your clinical reports, scans, and diagnostic tests to understand your unique case.',
    },
    {
      num: '03',
      icon: <FaFileSignature />,
      title: 'Personalized Treatment Plan',
      desc: 'We create a customized herbal regimen alongside nutritional and lifestyle recommendations tailored to your needs.',
    },
    {
      num: '04',
      icon: <FaCapsules />,
      title: 'Treatment Initiation',
      desc: 'You receive your premium herbal formulations with detailed dosing instructions and administration guidance.',
    },
    {
      num: '05',
      icon: <FaUserShield />,
      title: 'Ongoing Support & Monitoring',
      desc: 'Regular follow-ups, symptom tracking, and protocol adjustments to ensure optimal progress and well-being.',
    },
  ];

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, var(--gray-1) 0%, var(--white) 100%)' }}>
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-badge">
            <FaFileMedical /> How We Support You
          </span>
          <h2 className="section-title">
            Your Healing <span>Journey</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A structured, professional step-by-step methodology to support your recovery process through personalized herbal care.
          </p>
        </div>

        {/* Process Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '30px',
            position: 'relative',
          }}
        >
          {/* Connector Line (Desktop) */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '40px',
              right: '40px',
              height: '3px',
              background: 'var(--primary-light)',
              zIndex: 0,
              opacity: 0.5,
            }}
            className="desktop-connector"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: 'var(--card-padding-sm, 32px 24px)',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(0,0,0,0.03)',
                textAlign: 'center',
              }}
            >
              {/* Number Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '24px',
                  background: 'var(--gray-1)',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: '800',
                  color: 'var(--primary-dark)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(37,99,235,0.2)',
                }}
              >
                {step.num}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--secondary-light)',
                  color: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  margin: '0 auto 24px',
                  boxShadow: `0 0 0 8px ${step.color}08`,
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--dark-2)',
                  marginBottom: '12px',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--gray-3)',
                  lineHeight: '1.6',
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="/Contact" className="btn-secondary" data-aos="fade-up">
            Start Your Journey Now <FaArrowRight />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .desktop-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}