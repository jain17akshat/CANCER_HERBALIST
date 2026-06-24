import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCertificate, FaAward, FaFlask, FaHandshake,
  FaShieldAlt, FaGraduationCap, FaMedkit, FaStar
} from 'react-icons/fa';

const badges = [
  
 
  {
    icon: <FaFlask />,
    title: 'Research Backed',
    subtitle: 'Clinical Studies',
    color: ' #38bed5',
    gradient: 'linear-gradient(135deg, #38bed5, #38bed5)',
  },
  {
    icon: <FaHandshake />,
    title: 'Trusted Partners',
    subtitle: 'Global Network',
    color: '#38bed5',
    gradient: 'linear-gradient(135deg, #38bed5 , #38bed5)',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Govt. Registered',
    subtitle: 'Licensed Practice',
    color: ' #38bed5',
    gradient: 'linear-gradient(135deg, #38bed5, #38bed5)',
  },
  {
    icon: <FaGraduationCap />,
    title: 'Expert Team',
    subtitle: 'MD Certified',
    color: ' #38bed5',
    gradient: 'linear-gradient(135deg, #38bed5,  #38bed5)',
  },
  {
    icon: <FaMedkit />,
    title: 'Safe & Natural',
    subtitle: 'Zero Side Effects',
    color:  ' #38bed5',
    gradient: 'linear-gradient(135deg, #38bed5 ,  #38bed5)',
  },
  {
    icon: <FaStar />,
    title: '4.5★ Rated',
    subtitle: '2500+ Reviews',
    color: '#38bed5',
    gradient: 'linear-gradient(135deg, #38bed5, #38bed5)',
  },
];

export default function TrustBadges() {
  return (
    <section
      className="section-padding"
      style={{ background: 'var(--gray-1)' }}
    >
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-badge">
            <FaShieldAlt /> Our Certifications & Trust
          </span>
          <h2 className="section-title">
  Backed by <span style={{ color: '#38bed5' }}>Authority</span>
</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Our credentials, certifications, and global partnerships that establish
            our authority in herbal cancer care.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, calc(50% - 10px)), 1fr))',
            gap: '20px',
          }}
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              data-aos="zoom-in"
              data-aos-delay={i * 80}
              whileHover={{ scale: 1.04, translateY: -4 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: `2px solid ${badge.color}20`,
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: badge.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px',
                  fontSize: '24px',
                  color: 'white',
                  boxShadow: `0 8px 20px ${badge.color}35`,
                }}
              >
                {badge.icon}
              </div>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '14px',
                  color: 'var(--dark-2)',
                  marginBottom: '4px',
                }}
              >
                {badge.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--gray-3)' }}>
                {badge.subtitle}
              </div>
            </motion.div>
          ))}
        </div>

        {/* / */}
      </div>
    </section>
  );
}
