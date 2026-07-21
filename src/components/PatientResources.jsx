import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBriefcaseMedical, FaQuestionCircle, FaDownload,
  FaPlaneDeparture, FaGlobeAmericas
} from 'react-icons/fa';

const TEAL = '#0f4c5c';
const LIGHT_BG = '#ecfeff';

const resources = [
  { icon: <FaBriefcaseMedical />, title: 'Preparing for Your Visit', desc: 'Guidelines on what reports, medical summaries, and questions to bring to your consultation.' },
  { icon: <FaQuestionCircle />, title: 'Frequently Asked Questions', desc: 'Quick answers about consulting formats, pricing, shipping, and integrating with chemotherapy.' },
  { icon: <FaDownload />, title: 'Downloadable Guides', desc: 'Complementary PDF manuals on basic anti-cancer nutrition, immune support, and safety guidelines.' },
  { icon: <FaPlaneDeparture />, title: 'Travel & Accommodation', desc: 'Logistics support, hotel recommendations, and transport guides for patients visiting our Bangalore clinic.' },
  { icon: <FaGlobeAmericas />, title: 'International Patients', desc: 'Dedicated support for overseas patients, custom custom clearances, courier shipping, and video consults.' }
];

export default function PatientResources() {
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
        className="resources-container"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{ 
                minWidth: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: TEAL, 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '24px', 
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(15, 76, 92, 0.2)'
              }}
            >
              6
            </div>
            <h2 
              style={{ 
                color: TEAL, 
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', 
                fontFamily: 'Playfair Display, serif', 
                fontWeight: '800',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Patient Resources
            </h2>
          </div>

          {/* Grid Layout for Split */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '40px' 
            }}
            className="resources-split"
          >
            {/* Left side list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {resources.map((item, index) => (
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
                    border: '1px solid rgba(15, 76, 92, 0.12)'
                  }}
                >
                  <div 
                    style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: '#fff', 
                      color: TEAL, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '16px',
                      boxShadow: '0 2px 6px rgba(15, 76, 92, 0.08)'
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
                        color: '#083344',
                        fontFamily: 'Poppins, sans-serif'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      style={{ 
                        margin: 0, 
                        fontSize: '13.5px', 
                        color: '#155e75', 
                        lineHeight: '1.6',
                        opacity: 0.85
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side travel map globe illustration image */}
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
                border: '1px solid #c5f2f7'
              }}
              className="resources-image-wrapper"
            >
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80" 
                alt="Patient Resources Map and Plane"
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
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(15,76,92,0.2) 100%)' 
                }} 
              />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .resources-split {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        @media (max-width: 991px) {
          .resources-image-wrapper {
            min-height: 300px !important;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
