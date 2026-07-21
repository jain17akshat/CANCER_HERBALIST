import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUserCheck, FaFileMedical, FaVials, FaAppleAlt,
  FaHeartbeat, FaClipboardList, FaChartLine, FaUserPlus,
  FaArrowRight
} from 'react-icons/fa';

const ORANGE = '#d97706';
const LIGHT_BG = '#fffbeb';

const steps = [
  { icon: <FaUserCheck />, title: 'Initial Assessment', desc: 'Comprehensive intake to understand your baseline health and treatment goals.' },
  { icon: <FaFileMedical />, title: 'Medical History Review', desc: 'Thorough evaluation of current diagnoses, surgeries, and oncology reports.' },
  { icon: <FaVials />, title: 'Laboratory Report Analysis', desc: 'Deep-dive review of blood panels, tumor markers, and pathology results.' },
  { icon: <FaAppleAlt />, title: 'Nutrition Evaluation', desc: 'Assessing dietary habits and cellular nourishment gaps to build an anti-cancer diet.' },
  { icon: <FaHeartbeat />, title: 'Lifestyle Assessment', desc: 'Evaluating sleep, stress levels, toxic exposures, and physical activity.' },
  { icon: <FaClipboardList />, title: 'Customized Wellness Plan', desc: 'Formulating your personalized herbal, nutritional, and supportive care protocols.' },
  { icon: <FaChartLine />, title: 'Progress Monitoring', desc: 'Regular check-ins and laboratory follow-ups to measure marker changes.' },
  { icon: <FaUserPlus />, title: 'Follow-Up Care', desc: 'Adjusting formulations as standard treatments change to maintain peak tolerance.' }
];

export default function PersonalizedTreatmentPlans() {
  return (
    <section 
      style={{ 
        padding: '80px 20px', 
        background: '#fff',
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
        className="plans-container"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{ 
                minWidth: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: ORANGE, 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '24px', 
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)'
              }}
            >
              5
            </div>
            <h2 
              style={{ 
                color: ORANGE, 
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', 
                fontFamily: 'Playfair Display, serif', 
                fontWeight: '800',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Personalized Treatment Plans
            </h2>
          </div>

          {/* Grid Layout for Split */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '40px' 
            }}
            className="plans-split"
          >
            {/* Left side list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {steps.map((item, index) => (
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
                    background: LIGHT_BG,
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: '1px solid rgba(217, 119, 6, 0.12)'
                  }}
                >
                  <div 
                    style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: '#fff', 
                      color: ORANGE, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '16px',
                      boxShadow: '0 2px 6px rgba(217, 119, 6, 0.08)'
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
                        color: '#78350f',
                        fontFamily: 'Poppins, sans-serif'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      style={{ 
                        margin: 0, 
                        fontSize: '13.5px', 
                        color: '#92400e', 
                        lineHeight: '1.6',
                        opacity: 0.85
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              <div style={{ marginTop: '12px' }}>
                <Link 
                  to="/personalized-treatment-plans" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: ORANGE,
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '14.5px',
                    border: `1.5px solid ${ORANGE}`,
                    padding: '12px 24px',
                    borderRadius: '50px',
                    background: '#fff',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.05)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = LIGHT_BG; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                >
                  Learn More about Personalized Plans <FaArrowRight style={{ fontSize: '12px' }} />
                </Link>
              </div>
            </div>

            {/* Right side clipboard consultation image */}
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
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                border: '1px solid #fed7aa'
              }}
              className="plans-image-wrapper"
            >
              <img 
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80" 
                alt="Personalized Treatment Plans"
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
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(217,119,6,0.2) 100%)' 
                }} 
              />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .plans-split {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        @media (max-width: 991px) {
          .plans-image-wrapper {
            min-height: 300px !important;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
