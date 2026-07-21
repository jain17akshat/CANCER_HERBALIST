import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaDna, FaCapsules, FaAppleAlt, FaLeaf, FaShieldAlt,
  FaHandHoldingHeart, FaBolt, FaMoon, FaHeartbeat,
  FaArrowRight, FaCheckCircle, FaExclamationTriangle, FaChevronDown
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

const therapiesDetail = [
  {
    id: 'gene-centric',
    icon: <FaDna />,
    title: 'Gene centric Therapy',
    short: 'Targeted botanical protocols designed to regulate cell signaling pathways and support genetic stability.',
    clinicalFocus: 'Down-regulation of oncogenes and stabilization of tumor-suppressive pathways.',
    mechanism: 'Botanicals like high-purity curcumin, EGCG, and resveratrol target NF-kB and PI3K/Akt/mTOR pathways to inhibit cell replication signals.',
    evidence: 'In vitro studies indicate specific phytochemicals promote apoptosis in malignant cells without harming normal tissues.',
    benefits: ['Supports cellular genetic stability', 'Inhibits proliferation pathways', 'Acts synergistically with oncology protocols']
  },
  {
    id: 'herbal-medicine',
    icon: <FaCapsules />,
    title: 'Herbal Medicine / Supplements',
    short: 'Custom-compounded organic herbal extracts and evidence-based clinical supplements.',
    clinicalFocus: 'Direct tumor microenvironment modulation and systemic organ protection.',
    mechanism: 'Standardized phytotherapeutic preparations (e.g., Scutellaria barbata, Astragalus, mistletoe) are compounded to match patient pathology.',
    evidence: 'Trials demonstrate standardized herbal compounds modify inflammatory cytokines and mitigate chemo/radiotherapy side effects.',
    benefits: ['Direct immune system activation', 'Assists in reducing tumor angiogenesis', 'Protects healthy tissues from chemo toxicity']
  },
  {
    id: 'nutritional-therapy',
    icon: <FaAppleAlt />,
    title: 'Nutritional Therapy',
    short: 'Personalized, anti-inflammatory dietary plans to optimize energy and support healthy cellular function.',
    clinicalFocus: 'Curbing cancer cell energy pathways (glycolysis) and reversing cachexia.',
    mechanism: 'Developing tailored low-glycemic dietary protocols designed to exploit the Warburg Effect (malignant cells\' reliance on glucose).',
    evidence: 'Research associates low-glycemic or ketogenic-supportive diets with reduced circulating insulin and tumor growth factors.',
    benefits: ['Reduces systemic inflammation markers', 'Limits glucose availability to tumors', 'Preserves lean muscle mass and stamina']
  },
  {
    id: 'detoxification',
    icon: <FaLeaf />,
    title: 'Detoxification Programs',
    short: 'Evidence-based hepatic and renal clearance support, emphasizing strict clinical limitations.',
    clinicalFocus: 'Assisting natural Phase I and Phase II liver pathways and maintaining renal filtration.',
    mechanism: 'We focus on scientifically validated hepatic and renal pathways using NAC, Milk Thistle (silymarin), and cruciferous sulforaphanes.',
    evidence: 'Silymarin and NAC have been shown in multiple randomized trials to protect hepatocytes and reduce chemo-induced hepatotoxicity.',
    limitations: 'WARNING & CLINICAL LIMITATIONS: We strictly reject unscientific "purges," coffee enemas, or extreme water fasts which cause electrolyte imbalances and delay medical care. Detoxification is an enzymatic liver/kidney process. Protocols must be timed carefully to avoid accelerating the clearance of active oncology drugs.',
    benefits: ['Protects liver and kidney tissues from toxicity', 'Promotes endogenous glutathione production', 'Maintains efficient clearance of metabolic debris']
  },
  {
    id: 'immune-support',
    icon: <FaShieldAlt />,
    title: 'Immune Support',
    short: 'Adaptogenic and immunomodulatory botanicals to optimize natural killer cells and immune resilience.',
    clinicalFocus: 'NK-cell activation and prevention of treatment-induced myelosuppression.',
    mechanism: 'Using polysaccharide-rich botanicals (beta-glucans from Reishi/Turkey Tail) and adaptogens like Ashwagandha to stimulate immune surveillance.',
    evidence: 'Research shows medicinal mushrooms act as response modifiers, binding to receptors on immune cells to restore defenses damaged by chemotherapy.',
    benefits: ['Optimizes NK-cell and macrophage activity', 'Helps prevent drops in white blood cell counts', 'Supports physical resilience against infections']
  },
  {
    id: 'pain-management',
    icon: <FaHandHoldingHeart />,
    title: 'Pain Management',
    short: 'Complementary natural comforts and systemic support to help manage physical pain and inflammation.',
    clinicalFocus: 'Non-toxic, multi-pathway pain mitigation and nervous system soothing.',
    mechanism: 'Implementing botanical anti-inflammatories that inhibit COX-2 and 5-LOX enzymes (such as Boswellia and Ginger) to reduce nerve pain.',
    evidence: 'Clinical trials indicate Boswellia extracts can reduce peritumoral brain edema and pain with a superior safety profile compared to NSAIDs.',
    benefits: ['Reduces inflammatory prostaglandin production', 'Alleviates neuropathic discomfort without cognitive side effects', 'Reduces dependency on heavy analgesics']
  },
  {
    id: 'fatigue-management',
    icon: <FaBolt />,
    title: 'Fatigue Management',
    short: 'Vitalizing tonic herbs and mitochondria-supportive nutrition to resolve persistent fatigue.',
    clinicalFocus: 'Reversing cancer-related fatigue (CRF) and optimizing mitochondrial ATP production.',
    mechanism: 'Targeting mitochondrial function using CoQ10, L-Carnitine, and adaptogens (Rhodiola and Cordyceps) to restore energy cycles.',
    evidence: 'Clinical trials evaluating adaptogens show improvements in fatigue scores, cognitive function, and self-reported quality of life.',
    benefits: ['Enhances cellular energy (ATP) production', 'Helps regulate hypothalamic-pituitary-adrenal axis balance', 'Combats cognitive fog and mental fatigue']
  },
  {
    id: 'sleep-therapy',
    icon: <FaMoon />,
    title: 'Sleep Therapy',
    short: 'Soothing nervine botanicals and sleep-hygiene support to restore deep, restorative sleep cycles.',
    clinicalFocus: 'Re-establishing circadian rhythms and maximizing nocturnal melatonin synthesis.',
    mechanism: 'Using non-habit-forming, GABA-modulating nervines (Passionflower, Valerian, L-Theanine) to calm the nervous system.',
    evidence: 'Studies show GABAergic botanicals reduce sleep latency and increase slow-wave sleep critical for cell repair.',
    benefits: ['Promotes restorative slow-wave sleep cycles', 'Lowers cortisol spikes that cause sleep disruptions', 'Reduces evening anxiety and stress markers']
  },
  {
    id: 'palliative-care',
    icon: <FaHeartbeat />,
    title: 'Palliative & Supportive Care',
    short: 'Compassionate whole-person support to maintain quality of life, comfort, and vitality.',
    clinicalFocus: 'Symptom mitigation, digestive protection, and general emotional comfort.',
    mechanism: 'Providing supportive protocols for treatment-induced nausea, appetite loss, and mucosal dryness with organic carminatives and mucilages.',
    evidence: 'Early integration of palliative care is strongly linked in major trials to improved quality of life and reduced hospitalizations.',
    benefits: ['Improves appetite and mitigates treatment-induced nausea', 'Protects GI mucosal lining from radiation and drug damage', 'Provides ongoing emotional and physical comfort']
  }
];

export default function IntegrativeTherapies() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0d3b2e 0%, #1a6e52 50%, #0f4c81 100%)', 
        padding: '140px 20px 80px', 
        textAlign: 'center', 
        color: '#fff', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: ACCENT, opacity: 0.1, filter: 'blur(80px)' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ 
            background: 'rgba(255,255,255,0.12)', 
            border: '1px solid rgba(255,255,255,0.25)', 
            color: '#a7f3d0', 
            padding: '8px 24px', 
            borderRadius: '50px', 
            fontSize: '13.5px', 
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            🌿 Section 4 — Care Roadmap
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', 
            fontFamily: 'Playfair Display, serif', 
            fontWeight: 800,
            marginTop: '10px', 
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Integrative <span style={{ color: ACCENT }}>Therapies</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', opacity: 0.9, lineHeight: '1.8', maxWidth: '680px', margin: '0 auto' }}>
            An evidence-based suite of 9 complementary protocols designed to strengthen cell resilience, optimize immune activity, protect healthy organs, and improve daily quality of life during your healing journey.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        
        {/* Intro Card */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
          border: '1px solid #e2e8f0',
          marginBottom: '48px'
        }}>
          <h2 style={{ color: PRIMARY, fontSize: '20px', fontWeight: 800, marginTop: 0, marginBottom: '12px', fontFamily: 'Playfair Display, serif' }}>
            Bridging Natural Medicine and Oncology Science
          </h2>
          <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '14.5px', margin: 0 }}>
            At Cancer Herbalist, our Integrative Therapies do not conflict with your core conventional medical treatments. Instead, they act as critical supportive pathways. By combining targeted botanical extracts (phytotherapy), molecular nutrition, and cellular symptom management, we address the whole person.
            <br /><br />
            Select any of the <strong>9 therapies below</strong> to view its clinical focus, scientific mechanism, evidence-based research, and detailed benefits.
          </p>
        </div>

        {/* Therapy Accordion Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {therapiesDetail.map((t, idx) => {
            const isOpen = openCard === t.id;
            return (
              <motion.div
                key={t.id}
                layout
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  border: isOpen ? `2px solid ${PRIMARY}` : '1.5px solid #e2e8f0',
                  boxShadow: isOpen ? '0 10px 30px rgba(26, 110, 82, 0.08)' : '0 4px 12px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  transition: 'border 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => setOpenCard(isOpen ? null : t.id)}
                  style={{
                    width: '100%',
                    background: isOpen ? `${PRIMARY}05` : 'transparent',
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
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      background: isOpen ? PRIMARY : `${PRIMARY}12`,
                      color: isOpen ? '#fff' : PRIMARY,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      transition: 'all 0.25s ease'
                    }}>
                      {t.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', background: ACCENT, padding: '2px 8px', borderRadius: '12px' }}>
                          0{idx + 1}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#0f172a', fontFamily: 'Poppins, sans-serif' }}>
                          {t.title}
                        </h3>
                      </div>
                      <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                        {t.short}
                      </p>
                    </div>
                  </div>
                  <FaChevronDown style={{
                    color: isOpen ? PRIMARY : '#94a3b8',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0
                  }} />
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div style={{ padding: '0 30px 30px', borderTop: '1px solid #f1f5f9', background: '#fafbfd' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginTop: '24px' }} className="details-inner-grid">
                          
                          {/* Left Column: Explanations */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                              <h4 style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clinical Focus</h4>
                              <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.7' }}>{t.clinicalFocus}</p>
                            </div>
                            
                            <div>
                              <h4 style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scientific Mechanism</h4>
                              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.7' }}>{t.mechanism}</p>
                            </div>

                            <div>
                              <h4 style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Research & Evidence</h4>
                              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.7', fontStyle: 'italic' }}>{t.evidence}</p>
                            </div>

                            {t.limitations && (
                              <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '8px', padding: '16px', marginTop: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
                                  <FaExclamationTriangle /> Evidence & Limitations Notice
                                </div>
                                <p style={{ margin: 0, fontSize: '13px', color: '#991b1b', lineHeight: '1.7' }}>
                                  {t.limitations}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Right Column: Key Benefits List */}
                          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
                            <h4 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Benefits</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {t.benefits.map((b, bIdx) => (
                                <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                  <FaCheckCircle style={{ color: PRIMARY, fontSize: '15px', marginTop: '3px', flexShrink: 0 }} />
                                  <span style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.5' }}>{b}</span>
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

        {/* Clinical Disclaimer */}
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px 24px', marginTop: '48px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <FaExclamationTriangle style={{ color: '#d97706', fontSize: '20px', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: '#92400e' }}>Important Clinical Disclaimer</h4>
            <p style={{ margin: 0, color: '#92400e', fontSize: '13px', lineHeight: '1.7' }}>
              Our integrative support programs are complementary therapies designed to work in synergy with, and not as a replacement for, standard conventional oncology treatments (surgery, chemotherapy, and radiotherapy). All herbal formulations are closely reviewed by our pharmacologists for safety, purity, and drug-herb interactions. Always consult your oncology supervisor or primary care medical team before starting any complementary treatment programs.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #0d3b2e, #1a6e52)', 
          borderRadius: '30px', 
          padding: '60px 40px', 
          color: '#fff',
          marginTop: '60px',
          boxShadow: '0 12px 40px rgba(26, 110, 82, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800, marginBottom: '16px' }}>
            Looking for a Personalized Integrative Protocol?
          </h2>
          <p style={{ opacity: 0.88, marginBottom: '36px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: '1.8', fontSize: '15px' }}>
            Book a complimentary 30-minute discovery consultation. Our clinical herbalists will review your pathology reports and outline a custom treatment roadmap.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: ACCENT,
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '50px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14.5px',
                boxShadow: `0 8px 24px ${ACCENT}44`,
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
          .details-inner-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}</style>
    </div>
  );
}
