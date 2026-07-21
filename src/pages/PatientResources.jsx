import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBriefcaseMedical, FaQuestionCircle, FaDownload,
  FaPlaneDeparture, FaGlobeAmericas, FaChevronDown,
  FaCheckCircle, FaFilePdf, FaHotel, FaMapMarkerAlt,
  FaPhoneAlt, FaArrowRight, FaShip, FaExclamationTriangle
} from 'react-icons/fa';

const TEAL = '#0f4c5c';
const PRIMARY = '#1a6e52';
const LIGHT_BG = '#ecfeff';
const ACCENT = '#38bed5';

const resourcesDetail = [
  {
    icon: <FaBriefcaseMedical />,
    title: 'Preparing for Your Visit',
    desc: 'Guidelines on what reports, medical summaries, and questions to bring to your consultation.',
    details: 'To ensure a comprehensive review, please prepare the following records ahead of your session:',
    checklist: [
      'Recent pathology and biopsy reports (ideally within the last 30 days).',
      'All relevant imaging scans (PET, CT, MRI scans and written descriptions).',
      'Complete list of current prescription medications, chemotherapy drugs, and dosages.',
      'Detailed list of all vitamins, herbal supplements, or home remedies you are currently taking.',
      'List of questions you and your family wish to discuss with our clinical team.'
    ]
  },
  {
    icon: <FaQuestionCircle />,
    title: 'Frequently Asked Questions',
    desc: 'Quick answers about consulting formats, pricing, shipping, and integrating with chemotherapy.',
    details: 'Find rapid answers to the most common questions regarding our integrative therapies:',
    checklist: [
      'Are video consultations available? Yes, we conduct secure video consultations globally.',
      'How are herbal formulations shipped? We ship worldwide using temperature-controlled medical couriers.',
      'Are these safe during chemotherapy? Yes, our pharmacologists customize dosages to prevent any interactions.',
      'How long are the consultations? The initial clinical assessment typically takes 45 to 60 minutes.'
    ]
  },
  {
    icon: <FaDownload />,
    title: 'Downloadable Guides',
    desc: 'Complementary PDF manuals on basic anti-cancer nutrition, immune support, and safety guidelines.',
    details: 'Access our clinical resource library and download detailed guidebooks compiled by our medical board:',
    checklist: [
      '🌿 Anti-Cancer Nutrition Guide (PDF, 4.2 MB) - Dietary charts and low-glycemic recipes.',
      '🛡️ Immune Support Protocols (PDF, 2.8 MB) - Lifestyle habits to maintain white blood cell counts.',
      '⚠️ Herb-Drug Integration Principles (PDF, 1.9 MB) - Safety manual for patients undergoing active chemo.'
    ],
    hasDownloads: true
  },
  {
    icon: <FaPlaneDeparture />,
    title: 'Travel & Accommodation',
    desc: 'Logistics support, hotel recommendations, and transport guides for patients visiting our Bangalore clinic.',
    details: 'For patients traveling to our clinic in Bangalore, we provide comprehensive logistics support:',
    checklist: [
      'Partner Hotel Discounts: We offer corporate rates at hotels within 2 km of our center.',
      'Airport Pick-up: We can arrange private medical transport from Kempegowda International Airport (BLR).',
      'Clinic Hours: Monday to Saturday, 9:00 AM - 6:00 PM (by appointment only).',
      'Wheelchair & Stretcher Access: Our clinic is fully optimized for patients with limited mobility.'
    ]
  },
  {
    icon: <FaGlobeAmericas />,
    title: 'International Patients',
    desc: 'Dedicated support for overseas patients, customs clearances, courier shipping, and video consults.',
    details: 'We support hundreds of patients worldwide with specialized international care workflows:',
    checklist: [
      'Customs Clearance Documentation: We provide complete pharmacological certifications to clear global customs.',
      'Timezone-Aligned Consults: Video consults are scheduled around your convenient local time.',
      'Multilingual Coordination: Translation support is available for multiple European and Asian languages.',
      'Global Support Line: 24/7 emergency support desk for international formulation queries.'
    ]
  }
];

export default function PatientResourcesPage() {
  const [openSection, setOpenSection] = useState(0);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* ── HERO SECTION ── */}
      <section style={{ 
        background: 'linear-gradient(135deg, #062c35 0%, #0f4c5c 50%, #1e293b 100%)', 
        padding: '140px 20px 80px', 
        textAlign: 'center', 
        color: '#fff', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Soft Background Glows */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: ACCENT, opacity: 0.15, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: PRIMARY, opacity: 0.1, filter: 'blur(80px)' }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ 
            background: 'rgba(14, 116, 144, 0.2)', 
            border: '1px solid rgba(14, 116, 144, 0.4)', 
            color: '#a5f3fc', 
            padding: '8px 24px', 
            borderRadius: '50px', 
            fontSize: '13.5px', 
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            📁 Phase 6 — Onboarding & Support
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', 
            fontFamily: 'Playfair Display, serif', 
            fontWeight: 800,
            marginTop: '10px', 
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Patient <span style={{ color: '#22d3ee' }}>Resources</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', opacity: 0.9, lineHeight: '1.8', maxWidth: '720px', margin: '0 auto' }}>
            Everything you need to streamline your journey—from checklist preparation and downloadable clinical guides to travel logistics and international customs support.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        
        {/* ── SPLIT OVERVIEW ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '60px'
        }} className="resources-intro-grid">
          
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ color: '#0f4c5c', fontSize: '28px', fontWeight: 800, fontFamily: 'Playfair Display, serif', margin: 0 }}>
              Supporting You at Every Step
            </h2>
            <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Entering integrative care can feel overwhelming. We provide tools to make the transition as smooth as possible. Whether you are arranging medical travels, compiling medical records, or requiring door-to-door delivery in Europe or North America, our support managers are ready to assist.
              <br /><br />
              Browse the <strong>5 resource sections below</strong> to access checklists, book travel aid, or download complementary nutrition guidelines.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0e7490', fontWeight: 600, fontSize: '14px' }}>
                <FaCheckCircle style={{ color: '#22d3ee' }} /> Global Logistics Support
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0e7490', fontWeight: 600, fontSize: '14px' }}>
                <FaCheckCircle style={{ color: '#22d3ee' }} /> Video Consultation Portals
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0e7490', fontWeight: 600, fontSize: '14px' }}>
                <FaCheckCircle style={{ color: '#22d3ee' }} /> PDF Nutrition Guides
              </div>
            </div>
          </div>

          {/* Right Graphical Box */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            border: '1px solid #c5f2f7',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(15, 76, 92, 0.05)',
              zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: TEAL, 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '16px'
                }}>6</span>
                <span style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: TEAL }}>Patient Onboarding</span>
              </div>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                Our patient coordination system handles travel arrangements, document checks, and global delivery customs.
              </p>
              
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {resourcesDetail.map((r, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: 600, color: '#0f4c5c' }}>
                    <FaCheckCircle style={{ color: '#06b6d4', flexShrink: 0 }} /> {r.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── THE Accordion LIST ── */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#0f4c5c', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, fontFamily: 'Playfair Display, serif', margin: '0 0 10px 0' }}>
              Resource Directories
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '600px', margin: '0 auto', fontSize: '14.5px', lineHeight: '1.7' }}>
              Click on any directory below to download PDF templates, view checklist preparations, or request transport details.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '900px', margin: '0 auto' }}>
            {resourcesDetail.map((r, idx) => {
              const isOpen = openSection === idx;
              return (
                <motion.div
                  key={idx}
                  layout
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    border: isOpen ? `2px solid ${TEAL}` : '1.5px solid #e5e7eb',
                    boxShadow: isOpen ? '0 10px 30px rgba(15, 76, 92, 0.08)' : '0 4px 12px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    transition: 'border 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  {/* Accordion Row Header */}
                  <button
                    onClick={() => setOpenSection(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      background: isOpen ? `${TEAL}05` : 'transparent',
                      border: 'none',
                      padding: '24px 30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        background: isOpen ? TEAL : `${TEAL}12`,
                        color: isOpen ? '#fff' : TEAL,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        transition: 'all 0.25s ease',
                        flexShrink: 0
                      }}>
                        {r.icon}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', background: TEAL, padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                            Resource 0{idx + 1}
                          </span>
                          <h3 style={{ margin: 0, fontSize: '16.5px', fontWeight: 700, color: '#1f2937' }}>
                            {r.title}
                          </h3>
                        </div>
                        <p style={{ margin: '6px 0 0', fontSize: '13.5px', color: '#6b7280', lineHeight: 1.5 }}>
                          {r.desc}
                        </p>
                      </div>
                    </div>
                    <FaChevronDown style={{
                      color: isOpen ? TEAL : '#9ca3af',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0
                    }} />
                  </button>

                  {/* Accordion Expanded Details */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div style={{ padding: '0 30px 30px', borderTop: '1px solid #f1f5f9', background: '#fafbfd' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginTop: '24px' }} className="resource-inner-layout">
                            
                            {/* Short Overview Text */}
                            <div>
                              <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 800, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Details & Overview
                              </h4>
                              <p style={{ margin: '0 0 16px 0', fontSize: '14.5px', color: '#4b5563', lineHeight: '1.7' }}>
                                {r.details}
                              </p>
                              {r.hasDownloads && (
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
                                  <button style={{
                                    background: PRIMARY,
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 2px 6px rgba(26,110,82,0.15)'
                                  }}>
                                    <FaFilePdf /> Download Patient Pack
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Checklist Block */}
                            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e5e7eb' }}>
                              <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 800, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {r.hasDownloads ? 'Available Documents' : 'Key Guidelines'}
                              </h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {r.checklist.map((c, cIdx) => (
                                  <div key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <FaCheckCircle style={{ color: '#06b6d4', fontSize: '14px', marginTop: '3px', flexShrink: 0 }} />
                                    <span style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: '1.5' }}>{c}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── CLINICAL DISCLAIMER ── */}
        <div style={{ 
          background: '#fffbeb', 
          border: '1px solid #fef3c7', 
          borderRadius: '16px', 
          padding: '20px 24px', 
          marginBottom: '60px', 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '14px' 
        }}>
          <FaExclamationTriangle style={{ color: '#d97706', fontSize: '20px', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#92400e' }}>Important Disclaimer</h4>
            <p style={{ margin: 0, color: '#b45309', fontSize: '13px', lineHeight: '1.7' }}>
              All downloadable manuals, nutritional guidebooks, and check-lists are complementary materials designed to assist in onboarding and general wellness. They do not constitute official medical prescription. Consult your oncology department prior to implementing dietary or herbal protocols.
            </p>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #062c35, #0f4c5c)', 
          borderRadius: '30px', 
          padding: '60px 40px', 
          color: '#fff',
          boxShadow: '0 12px 40px rgba(15, 76, 92, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800, marginBottom: '16px' }}>
            Need Personalized Assistance?
          </h2>
          <p style={{ opacity: 0.88, marginBottom: '36px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: '1.8', fontSize: '15px' }}>
            Contact our care coordinators for travel bookings, customs assistance, and clinical video consult scheduling.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: PRIMARY,
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '50px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14.5px',
                boxShadow: `0 8px 24px ${PRIMARY}44`,
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Contact Support Coordinator <FaArrowRight />
            </Link>
            <Link
              to="/care-programs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '50px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '14.5px',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Explore Care Programs
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .resource-inner-layout {
            grid-template-columns: 1.3fr 0.7fr !important;
          }
        }
        @media (min-width: 992px) {
          .resources-intro-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
        @media (max-width: 991px) {
          .resources-intro-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
