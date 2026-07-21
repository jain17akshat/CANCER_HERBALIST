import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaDna, FaCapsules, FaAppleAlt, FaLeaf, FaShieldAlt,
  FaHandHoldingHeart, FaBolt, FaMoon, FaHeartbeat, FaArrowRight
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

const therapies = [
  {
    icon: <FaDna />,
    title: 'Gene centric Therapy',
    desc: 'Targeted botanical protocols designed to regulate cell signaling pathways and support genetic stability.'
  },
  {
    icon: <FaCapsules />,
    title: 'Herbal Medicine / Supplements',
    desc: 'Custom-compounded organic herbal extracts and evidence-based clinical supplements.'
  },
  {
    icon: <FaAppleAlt />,
    title: 'Nutritional Therapy',
    desc: 'Personalized, anti-inflammatory dietary plans to optimize energy and support healthy cellular function.'
  },
  {
    icon: <FaLeaf />,
    title: 'Detoxification Programs',
    desc: 'Evidence-based support to aid natural liver and kidney clearance pathways, acknowledging clinical limitations.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Immune Support',
    desc: 'Adaptogenic and immunomodulatory botanicals to optimize natural killer cells and immune resilience.'
  },
  {
    icon: <FaHandHoldingHeart />,
    title: 'Pain Management',
    desc: 'Complementary natural comforts and systemic support to help manage physical pain and inflammation.'
  },
  {
    icon: <FaBolt />,
    title: 'Fatigue Management',
    desc: 'Vitalizing tonic herbs and mitochondria-supportive nutrition to resolve persistent fatigue.'
  },
  {
    icon: <FaMoon />,
    title: 'Sleep Therapy',
    desc: 'Soothing nervine botanicals and sleep-hygiene support to restore deep, restorative sleep cycles.'
  },
  {
    icon: <FaHeartbeat />,
    title: 'Palliative & Supportive Care',
    desc: 'Compassionate whole-person support to maintain quality of life, comfort, and vitality.'
  }
];


export default function IntegrativeTherapies() {
  return (
    <section 
      style={{ 
        padding: '80px 20px', 
        background: '#f8fafc',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '40px',
          alignItems: 'center'
        }}
        className="therapies-container"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{ 
                minWidth: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: PRIMARY, 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '24px', 
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(26, 110, 82, 0.2)'
              }}
            >
              4
            </div>
            <h2 
              style={{ 
                color: PRIMARY, 
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', 
                fontFamily: 'Playfair Display, serif', 
                fontWeight: '800',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Integrative Therapies
            </h2>
          </div>

          {/* Grid Layout for Split */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '40px' 
            }}
            className="therapies-split"
          >
            {/* Left side list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {therapies.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    alignItems: 'flex-start',
                    background: '#fff',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(56, 190, 213, 0.08)'
                  }}
                >
                  <div 
                    style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: `${PRIMARY}12`, 
                      color: PRIMARY, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '16px' 
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 
                      style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '16px', 
                        fontWeight: '700', 
                        color: '#0f172a',
                        fontFamily: 'Poppins, sans-serif'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      style={{ 
                        margin: 0, 
                        fontSize: '13.5px', 
                        color: '#64748b', 
                        lineHeight: '1.6' 
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              <div style={{ marginTop: '12px' }}>
                <Link
                  to="/integrative-therapies"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: PRIMARY,
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '50px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '14.5px',
                    boxShadow: '0 4px 14px rgba(26, 110, 82, 0.3)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = ACCENT;
                    e.currentTarget.style.boxShadow = `0 6px 20px ${ACCENT}44`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = PRIMARY;
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(26, 110, 82, 0.3)';
                  }}
                >
                  Explore All 9 Therapies <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Right side banner image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                position: 'relative', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                height: '100%', 
                minHeight: '400px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0'
              }}
              className="therapies-image-wrapper"
            >
              <img 
                src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80" 
                alt="Integrative Therapies"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute',
                  inset: 0
                }}
              />
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(26,110,82,0.4) 100%)' 
                }} 
              />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .therapies-split {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        @media (max-width: 991px) {
          .therapies-image-wrapper {
            min-height: 300px !important;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
