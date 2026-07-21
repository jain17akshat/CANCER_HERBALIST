import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookmark, FaRegChartBar, FaNotesMedical, FaRegClock, FaRibbon, FaFlask } from 'react-icons/fa';
import Reviews from './Reviews';

const caseStudies = [
  {
    id: 'breast',
    tabTitle: 'Hodgkin Lymphoma',
    patientName: 'Mr. Sharath',
    ageGender: '33 Years, Male',
    diagnosis: 'Hodgkin Lymphoma (Chemo No Response)',
    duration: '18 Months Support',
    biomarkers: [
      { metric: 'Chemotherapy Response', pre: 'No Response / Progression', post: 'Stable / Inactive' },
      { metric: 'Nutritional Therapy (NT)', pre: 'Not Initiated', post: 'Integrated with HCT' },
      { metric: 'Quality-of-Life Score', pre: 'Poor / Severe Organ Strain', post: 'Optimized / Restored' }
    ],
    protocol: 'Standardized phytotherapy targeting non-dividing and circulating cells, integrated with Nutritional Therapy (NT) alongside salvage chemotherapy.',
    clinicalSummary: 'Diagnosed at age 33 with Hodgkin Lymphoma. Conventional chemotherapy yielded no response. Upon initiating customized Herbal Chemotherapy (HCT) combined with intensive Nutritional Therapy (NT) alongside conventional care, the patient experienced minimized toxic effects, stabilized cellular markers, and restored physical strength.',
  },
  {
    id: 'adrenal',
    tabTitle: 'Pediatric Adrenal Cancer',
    patientName: 'Sarvesh (Son of Anand Keerthana)',
    ageGender: '2 Years, Male',
    diagnosis: 'Adrenal Cancer with bone metastasis (post-chemo/radiotherapy)',
    duration: '6 Months Support',
    biomarkers: [
      { metric: 'Leg Bone Metastasis', pre: 'Active Spread', post: 'Inactive / Stable' },
      { metric: 'Pain & Swelling', pre: 'Severe / Debilitating', post: 'Fully Resolved' },
      { metric: 'Body Weight', pre: 'Underweight', post: '+3 kg Gained' }
    ],
    protocol: 'Pediatric-safe phytotherapy protocol, bone-supportive herbal extracts, customized easy-to-digest nutrition charts.',
    clinicalSummary: 'Following conventional surgery, radiotherapy, and chemotherapy, follow-up scans revealed bone metastasis. Within 6 months of starting complementary herbal therapy, the child became highly active, pain-free, bone lesions stabilized as inactive, and he gained 3 kg.',
  },
  {
    id: 'colon',
    tabTitle: 'Advanced Colon Cancer',
    patientName: 'Uncle of Subash Ricardo S',
    ageGender: 'Male',
    diagnosis: 'Advanced Colon Cancer (Late-stage Chemotherapy support)',
    duration: 'Several Months Care',
    biomarkers: [
      { metric: 'Chemo-induced Distress', pre: 'Severe Fatigue & Pain', post: 'Eased / Manageable' },
      { metric: 'Digestive Comfort', pre: 'Critical Appetite Loss', post: 'Improved Food Intake' },
      { metric: 'Quality-of-Life Duration', pre: 'Low Vitality', post: 'Maintained Comfortably' }
    ],
    protocol: 'Hepatoprotective liver-safe herbs, digestive comfort extracts, weekly follow-up consultations.',
    clinicalSummary: 'Integrated the herbal support plan in the very late stages of advanced colon cancer after multiple cycles of chemotherapy. Although the patient later passed away, the protocol provided crucial comfort, support, and pain relief for several months.',
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
                          <th style={{ padding: '8px 0', color: 'var(--red)', whiteSpace: 'nowrap' }}>Pre HCT</th>
                          <th style={{ padding: '8px 0', color: 'var(--primary)', whiteSpace: 'nowrap' }}>Post HCT</th>
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
