import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserCheck, FaFileMedical, FaVials, FaAppleAlt,
  FaHeartbeat, FaClipboardList, FaChartLine, FaUserPlus,
  FaChevronDown, FaCheckCircle, FaExclamationTriangle, FaArrowRight,
  FaFileAlt, FaHandshake, FaLock
} from 'react-icons/fa';

const ORANGE = '#d97706';
const PRIMARY = '#1a6e52';
const ACCENT = '#38bed5';
const LIGHT_BG = '#fffbeb';

const steps = [
  { 
    icon: <FaUserCheck />, 
    title: 'Initial Assessment', 
    desc: 'Comprehensive intake to understand your baseline health, current energy levels, and treatment goals.',
    details: 'During this phase, we map your current symptoms, daily energy cycles, and key concerns. This establishes a clear baseline before starting any phytotherapeutic support.',
    focusPoints: ['Comprehensive lifestyle intake', 'Symptom severity mapping', 'Establish baseline vitality scores']
  },
  { 
    icon: <FaFileMedical />, 
    title: 'Medical History Review', 
    desc: 'Thorough evaluation of current oncology diagnoses, past surgeries, and clinical treatment history.',
    details: 'We carefully examine your historical medical files to understand the timeline of your condition, past response to treatments, and any pre-existing co-morbidities.',
    focusPoints: ['Analyze oncology diagnosis timeline', 'Review past surgeries & clinical response', 'Audit historical medical files']
  },
  { 
    icon: <FaVials />, 
    title: 'Laboratory Report Analysis', 
    desc: 'Deep-dive review of blood panels, tumor markers, biopsy results, and genetic sequencing reports.',
    details: 'Our pharmacology team checks specific organ biomarkers (kidney, liver filtration) and inflammatory markers to customize dosage limits and prevent organ strain.',
    focusPoints: ['Deep check of liver & kidney filtration', 'Monitor inflammatory biomarkers', 'Track tumor marker trends']
  },
  { 
    icon: <FaAppleAlt />, 
    title: 'Nutrition Evaluation', 
    desc: 'Assessing dietary habits and cellular nourishment gaps to build an anti-cancer nutritional foundation.',
    details: 'We look for micronutrient deficiencies, glycemic habits that feed tumor pathways, and construct an anti-inflammatory dietary chart that is easy to follow.',
    focusPoints: ['Identify metabolic/glycemic triggers', 'Audit cellular nourishment gaps', 'Formulate anti-inflammatory dietary chart']
  },
  { 
    icon: <FaHeartbeat />, 
    title: 'Lifestyle Assessment', 
    desc: 'Evaluating sleep patterns, circadian rhythms, stress levels, toxic exposures, and physical capacity.',
    details: 'Immune recovery is deeply linked to cortisol regulation and deep sleep cycles. We audit your recovery habits to optimize cellular healing environments.',
    focusPoints: ['Analyze sleep & circadian patterns', 'Audit daily stress & cortisol triggers', 'Identify environmental toxic exposures']
  },
  { 
    icon: <FaClipboardList />, 
    title: 'Customized Wellness Plan', 
    desc: 'Formulating your personalized herbal remedies, nutrition guidance, and supportive care protocols.',
    details: 'A fully personalized synergistic plan combining organic botanicals, anti-cancer diet recipes, and stress support, written clearly with step-by-step guidance.',
    focusPoints: ['Formulate synergistic herbal compounds', 'Deliver step-by-step guidance guidelines', 'Include anti-cancer recipes']
  },
  { 
    icon: <FaChartLine />, 
    title: 'Progress Monitoring', 
    desc: 'Regular consultations and laboratory follow-ups to measure marker changes and track response.',
    details: 'We evaluate how your body is responding by tracking clinical blood panels every 4-6 weeks and fine-tuning botanical strengths accordingly.',
    focusPoints: ['Scheduled follow-up consultations', 'Re-assess blood panels every 4-6 weeks', 'Fine-tune botanical dosages']
  },
  { 
    icon: <FaUserPlus />, 
    title: 'Follow-Up Care', 
    desc: 'Adjusting formulations as standard treatments change to maintain peak tolerance and reduce toxicity.',
    details: 'If your conventional oncologist changes your chemotherapy drug or dosage, we immediately revise your herbal protocol to prevent any conflicts.',
    focusPoints: ['Liaison with primary oncology changes', 'Adjust formulas to prevent drug conflicts', 'Long-term tolerance maintenance']
  }
];

const faqs = [
  {
    q: 'How long does it take to prepare my Personalized Treatment Plan?',
    a: 'Once we receive all your medical records, laboratory reports, and complete the initial consultation, our pharmacological and medical team takes 48 to 72 hours to build, review, and deliver your customized protocol.'
  },
  {
    q: 'Can my plan be adjusted if my conventional treatment changes?',
    a: 'Absolutely. In fact, this is a core part of our follow-up care. Whenever your oncologist updates your chemotherapy, radiation, or hormone dosages, we immediately review and adjust your herbal formulations to ensure zero drug-herb conflicts.'
  },
  {
    q: 'Do you collaborate with my primary oncologist?',
    a: 'Yes, we promote open communication. We provide detailed summaries of our herbal ingredients and their active scientific mechanisms, which you can easily share with your oncology team.'
  },
  {
    q: 'What types of reports should I upload for review?',
    a: 'Please share your latest blood panels (CBC, LFT, KFT), recent diagnostic scans (CT, PET, MRI), histopathology/biopsy reports, and a complete list of your current medications and supplements.'
  }
];

export default function PersonalizedTreatmentPlansPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openStep, setOpenStep] = useState(0);

  return (
    <div style={{ background: '#fcfbf8', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* ── HERO SECTION ── */}
      <section style={{ 
        background: 'linear-gradient(135deg, #2d1e15 0%, #7c2d12 50%, #1c1917 100%)', 
        padding: '140px 20px 80px', 
        textAlign: 'center', 
        color: '#fff', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Soft Background Glows */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: ORANGE, opacity: 0.15, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: PRIMARY, opacity: 0.1, filter: 'blur(80px)' }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', 
            fontFamily: 'Playfair Display, serif', 
            fontWeight: 800,
            marginTop: '10px', 
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Personalized <span style={{ color: ORANGE }}>Treatment Plans</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', opacity: 0.9, lineHeight: '1.8', maxWidth: '720px', margin: '0 auto' }}>
            A precise, 8-step clinical framework tailored specifically to your tumor biology, organ filtration capacity, nutritional needs, and lifestyle factors. Designed to work alongside conventional cancer therapies.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        
        {/* ── SPLIT OVERVIEW AND IMAGE ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '60px'
        }} className="plans-intro-grid">
          
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ color: '#431407', fontSize: '28px', fontWeight: 800, fontFamily: 'Playfair Display, serif', margin: 0 }}>
              Why a Personalized Care Protocol is Crucial
            </h2>
            <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Cancer is a complex, multi-pathway disease. Generic, one-size-fits-all herbal supplements can be ineffective or, worse, interfere with your chemotherapy and radiation treatments. 
              <br /><br />
              At Cancer Herbalist, our pharmacological team reviews your oncology reports to craft a protocol unique to your body. We assess everything—from liver enzyme levels to tumor receptor types—ensuring your herbal support is both exceptionally safe and highly targeted.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c2d12', fontWeight: 600, fontSize: '14px' }}>
                <FaCheckCircle style={{ color: ORANGE }} /> No Herb-Drug Conflicts
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c2d12', fontWeight: 600, fontSize: '14px' }}>
                <FaCheckCircle style={{ color: ORANGE }} /> Tailored to Tumor Biology
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c2d12', fontWeight: 600, fontSize: '14px' }}>
                <FaCheckCircle style={{ color: ORANGE }} /> Organ-Safe Dosages
              </div>
            </div>
          </div>

          {/* Right Checklist Graphic */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
            border: '1px solid #fed7aa',
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
              background: 'rgba(217, 119, 6, 0.05)',
              zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: ORANGE, 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '16px'
                }}>5</span>
                <span style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: ORANGE }}>Personalized Framework</span>
              </div>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                Our 8-point checklist ensures all physical, nutritional, and emotional bases of recovery are fully optimized.
              </p>
              
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {steps.map((s, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', fontWeight: 600, color: '#431407' }}>
                    <FaCheckCircle style={{ color: ORANGE, flexShrink: 0 }} /> {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── THE 8-STEP BREAKDOWN (RESPONSIVE ACCORDION) ── */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#431407', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, fontFamily: 'Playfair Display, serif', margin: '0 0 10px 0' }}>
              The 8 Dimensions of Your Custom Plan
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '600px', margin: '0 auto', fontSize: '14.5px', lineHeight: '1.7' }}>
              Select any of the 8 steps below to view its clinical focus, key objectives, and scientific parameters.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '900px', margin: '0 auto' }}>
            {steps.map((s, idx) => {
              const isOpen = openStep === idx;
              return (
                <motion.div
                  key={idx}
                  layout
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    border: isOpen ? `2px solid ${ORANGE}` : '1.5px solid #e5e7eb',
                    boxShadow: isOpen ? '0 10px 30px rgba(217, 119, 6, 0.08)' : '0 4px 12px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    transition: 'border 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  {/* Step Row Trigger */}
                  <button
                    onClick={() => setOpenStep(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      background: isOpen ? `${ORANGE}05` : 'transparent',
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
                        background: isOpen ? ORANGE : `${ORANGE}12`,
                        color: isOpen ? '#fff' : ORANGE,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        transition: 'all 0.25s ease',
                        flexShrink: 0
                      }}>
                        {s.icon}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', background: ORANGE, padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                            Step 0{idx + 1}
                          </span>
                          <h3 style={{ margin: 0, fontSize: '16.5px', fontWeight: 700, color: '#1f2937' }}>
                            {s.title}
                          </h3>
                        </div>
                        <p style={{ margin: '6px 0 0', fontSize: '13.5px', color: '#6b7280', lineHeight: 1.5 }}>
                          {s.desc}
                        </p>
                      </div>
                    </div>
                    <FaChevronDown style={{
                      color: isOpen ? ORANGE : '#9ca3af',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0
                    }} />
                  </button>

                  {/* Expanding Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div style={{ padding: '0 30px 30px', borderTop: '1px solid #f1f5f9', background: '#fafbfd' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginTop: '24px' }} className="step-inner-layout">
                            
                            {/* Detailed Description */}
                            <div>
                              <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Clinical Focus & Parameters
                              </h4>
                              <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: '1.7' }}>
                                {s.details}
                              </p>
                            </div>

                            {/* Focus Checklist */}
                            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e5e7eb' }}>
                              <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 800, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Key Objectives
                              </h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {s.focusPoints.map((fp, fpIdx) => (
                                  <div key={fpIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FaCheckCircle style={{ color: PRIMARY, fontSize: '14px', flexShrink: 0 }} />
                                    <span style={{ fontSize: '13.5px', color: '#4b5563' }}>{fp}</span>
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

        {/* ── CONSULTATION WORKFLOW ── */}
        <section style={{ 
          background: '#fff', 
          borderRadius: '28px', 
          padding: '50px 40px', 
          border: '1px solid #e5e7eb', 
          marginBottom: '80px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.02)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ background: '#f3f4f6', color: '#4b5563', padding: '6px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Flowchart
            </span>
            <h2 style={{ color: '#1f2937', fontSize: '28px', fontWeight: 800, fontFamily: 'Playfair Display, serif', marginTop: '10px', marginBottom: '10px' }}>
              How the Process Works
            </h2>
            <p style={{ color: '#6b7280', fontSize: '14.5px', margin: 0 }}>
              Three simple steps to secure your personalized, organ-safe phytotherapy roadmap.
            </p>
          </div>

          <div className="flow-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
            {[
              { idx: '1', icon: <FaFileAlt />, title: 'Upload Reports', desc: 'Submit your recent blood counts, biochemistry panels, scans, and drug history through our secure portal.' },
              { idx: '2', icon: <FaHandshake />, title: 'Clinical Review & Consult', desc: 'Prof. Ramesh and our pharmacologists review your parameters in a deep one-on-one consultation.' },
              { idx: '3', icon: <FaLock />, title: 'Receive Safe Protocol', desc: 'Get your customized herbal formulation plan delivered securely with clear guidelines, diet charts, and safe dosing schedules.' }
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: LIGHT_BG,
                  color: ORANGE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 6px 0' }}>
                    {f.idx}. {f.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ── */}
        <section style={{ marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#431407', fontSize: '28px', fontWeight: 800, fontFamily: 'Playfair Display, serif', margin: '0 0 10px 0' }}>
              Questions & Answers
            </h2>
            <p style={{ color: '#6b7280', fontSize: '14.5px', margin: 0 }}>
              Everything you need to know about report requirements, oncologist alignment, and timeline.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    border: isOpen ? `1.5px solid ${ORANGE}` : '1.5px solid #e5e7eb',
                    overflow: 'hidden',
                    boxShadow: isOpen ? '0 8px 24px rgba(217, 119, 6, 0.06)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      background: isOpen ? '#fffdfa' : 'transparent',
                      border: 'none',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>
                      {faq.q}
                    </span>
                    <FaChevronDown
                      style={{
                        color: isOpen ? ORANGE : '#9ca3af',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div
                          style={{
                            padding: '20px 24px',
                            borderTop: '1px solid #e5e7eb',
                            color: '#4b5563',
                            fontSize: '14px',
                            lineHeight: '1.7',
                            whiteSpace: 'pre-line'
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#92400e' }}>Important Clinical Disclaimer</h4>
            <p style={{ margin: 0, color: '#b45309', fontSize: '13px', lineHeight: '1.7' }}>
              Personalized Treatment Plans are strictly supportive and complementary therapies. They are designed to work alongside conventional oncological interventions, such as surgery, chemotherapy, radiotherapy, and immunotherapies, rather than act as a replacement. All herbal formulas are developed by pharmacy and pharmacology researchers, prioritizing organ safety and preventing drug-herb interaction risks. Please consult your medical oncology team prior to commencing any supplementary protocols.
            </p>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #431407, #7c2d12)', 
          borderRadius: '30px', 
          padding: '60px 40px', 
          color: '#fff',
          boxShadow: '0 12px 40px rgba(124, 45, 18, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Begin Your Custom Care Roadmap?
          </h2>
          <p style={{ opacity: 0.88, marginBottom: '36px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: '1.8', fontSize: '15px' }}>
            Book a complimentary 30-minute discovery consultation. Submit your pathology reports, and let our research team craft your safe complementary protocol.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: ORANGE,
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '50px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14.5px',
                boxShadow: `0 8px 24px ${ORANGE}44`,
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Book Free Consultation <FaArrowRight />
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
          .step-inner-layout {
            grid-template-columns: 1.3fr 0.7fr !important;
          }
        }
        @media (min-width: 992px) {
          .plans-intro-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
          .flow-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 991px) {
          .plans-intro-grid {
            grid-template-columns: 1fr !important;
          }
          .flow-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
