import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookmark, FaRegChartBar, FaNotesMedical, FaRegClock, FaRibbon, FaFlask } from 'react-icons/fa';
import Reviews from './Reviews';

const caseStudies = [
  {
    id: 'breast',
    tabTitle: 'Breast Cancer (Stage 3)',
    patientName: 'Patient S. H.',
    ageGender: '42, Female',
    diagnosis: 'Infiltrating Ductal Carcinoma, HER2 Positive',
    duration: '12 Months Support',
    biomarkers: [
      { metric: 'Immune cell count (NK)', pre: 'Deficient (180)', post: 'Optimized (420)' },
      { metric: 'Quality-of-Life Score', pre: '35/100', post: '88/100' },
      { metric: 'Inflammatory Markers (hs-CRP)', pre: '8.4 mg/L', post: '1.2 mg/L' }
    ],
    protocol: 'Cellular vitality tinctures, active green botanical infusions, custom low-inflammatory dietary guidelines.',
    clinicalSummary: 'The patient integrated herbal support in combination with her conventional targeted therapy. Biomarker scans showed stable cardiac protection, zero severe fatigue, and complete cellular healing post-resection.',
  },
  {
    id: 'colon',
    tabTitle: 'Colon Cancer (Stage 4)',
    patientName: 'Patient R. B.',
    ageGender: '58, Male',
    diagnosis: 'Adenocarcinoma with secondary hepatic lesions',
    duration: '18 Months Support',
    biomarkers: [
      { metric: 'CEA Tumor Marker', pre: '45.0 ng/mL', post: '1.8 ng/mL (Normal)' },
      { metric: 'Liver Enzyme (ALT)', pre: 'Elevated (110 U/L)', post: 'Normal (32 U/L)' },
      { metric: 'Weight Stability', pre: '-12kg Loss', post: '+8kg Recovered' }
    ],
    protocol: 'Hepatoprotective botanical extracts, gut mucosa barrier-repair powders, organic cellular detox syrups.',
    clinicalSummary: 'The patient sought complementary care to assist liver regeneration during systemic treatment. Follow-up CT scans demonstrated a reduction in secondary lesions, and blood reports indicated normalized liver function.',
  },
  {
    id: 'blood',
    tabTitle: 'Blood Cancer (CLL)',
    patientName: 'Patient K. D.',
    ageGender: '65, Male',
    diagnosis: 'Chronic Lymphocytic Leukemia (CLL) - Watch & Wait Phase',
    duration: '24 Months Support',
    biomarkers: [
      { metric: 'White Blood Cell Count', pre: '52,000 /µL', post: '14,500 /µL (Stable)' },
      { metric: 'Hemoglobin Levels', pre: '10.2 g/dL', post: '13.8 g/dL' },
      { metric: 'Spleen Dimension', pre: 'Moderate Splenomegaly', post: 'Fully Normalized' }
    ],
    protocol: 'Blood-vitality adaptogens, spleen lymphatic-draining concentrates, micro-nutrition support capsules.',
    clinicalSummary: 'During the clinical "Watch & Wait" window, the patient utilized specific herbal extraction blends. Two years of follow-up reports show stabilized leukocyte graphs, preventing the immediate need for aggressive chemotherapy.',
  },
];

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState('breast');
  const activeData = caseStudies.find(study => study.id === activeTab);

  return (
    <section
      id="success-stories"
      className="section-padding"
      style={{ background: 'var(--gray-1)' }}
    >
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-badge">
            <FaFlask /> Clinical Case Studies
          </span>
          <h2 className="section-title">
            Evidence-Based <span>Outcomes</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A detailed review of patient biomarkers, treatments, and clinical timelines showcasing our integrative healing approach.
          </p>
        </div>

        {/* Tabs Panel */}
        <div
          className="tabs-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '36px',
          }}
          data-aos="fade-up"
        >
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveTab(study.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '600',
                border: activeTab === study.id ? 'none' : '1px solid var(--primary-light)',
                background: activeTab === study.id ? 'var(--gradient-green)' : 'white',
                color: activeTab === study.id ? 'white' : 'var(--primary-dark)',
                cursor: 'pointer',
                boxShadow: activeTab === study.id ? 'var(--shadow-green)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {study.tabTitle}
            </button>
          ))}
        </div>

        {/* Case Study Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: 'var(--card-padding-lg, 40px)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
                gap: '40px',
              }}
            >
              {/* Left Column: Diagnostics and Biomarkers */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContainer: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontSize: '18px' }}>
                    <FaNotesMedical />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--dark-2)' }}>{activeData.patientName}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--gray-3)' }}>Age/Gender: {activeData.ageGender}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '6px' }}>
                    Diagnosis
                  </div>
                  <div style={{ fontSize: '14.5px', color: 'var(--dark-2)', fontWeight: '600' }}>
                    {activeData.diagnosis}
                  </div>
                </div>

                {/* Biomarker Table */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '12px' }}>
                    <FaRegChartBar style={{ color: 'var(--primary)' }} /> Biomarker Progression
                  </div>

                  <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', minWidth: '280px', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--gray-2)', textAlign: 'left' }}>
                          <th style={{ padding: '8px 0', color: 'var(--gray-3)', whiteSpace: 'nowrap' }}>Biomarker / Metric</th>
                          <th style={{ padding: '8px 0', color: 'var(--red)', whiteSpace: 'nowrap' }}>Pre-Herbal</th>
                          <th style={{ padding: '8px 0', color: 'var(--primary)', whiteSpace: 'nowrap' }}>Post-Treatment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeData.biomarkers.map((bio, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid var(--gray-1)' }}>
                            <td style={{ padding: '10px 10px 10px 0', fontWeight: '500', color: 'var(--dark-3)' }}>{bio.metric}</td>
                            <td style={{ padding: '10px 10px 10px 0', color: 'var(--red)', fontWeight: '600', whiteSpace: 'nowrap' }}>{bio.pre}</td>
                            <td style={{ padding: '10px 0', color: 'var(--primary-dark)', fontWeight: '600', whiteSpace: 'nowrap' }}>{bio.post}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: Protocols and Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Timeline Badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--secondary-light)', border: '1px solid rgba(46,125,50,0.15)', color: 'var(--primary-dark)', padding: '6px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: '600', marginBottom: '24px' }}>
                    <FaRegClock /> {activeData.duration}
                  </div>

                  {/* Protocol */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '8px' }}>
                      <FaRibbon style={{ color: 'var(--primary)' }} /> Supportive Herbal Protocol
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--dark-3)', lineHeight: '1.7', fontWeight: '500' }}>
                      {activeData.protocol}
                    </p>
                  </div>

                  {/* Summary */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '8px' }}>
                      <FaBookmark style={{ color: 'var(--secondary)' }} /> Clinical Summary
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.7' }}>
                      {activeData.clinicalSummary}
                    </p>
                  </div>
                </div>

                {/* Disclaimer */}
                <div style={{ background: 'var(--gray-1)', padding: '14px 18px', borderRadius: '12px', fontSize: '11px', color: 'var(--gray-3)', borderLeft: '3px solid var(--primary)', lineHeight: '1.5' }}>
                  <strong>Disclaimer:</strong> Herbal protocols are complementary support systems. Outcomes vary and should be administered in coordination with a certified oncologist.
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Google Reviews — moved here from Home */}
      <Reviews />
    </section>
  );
}
