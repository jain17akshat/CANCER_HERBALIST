import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaVideo, FaCheckCircle, FaStar, FaQuoteLeft, FaBookmark, FaRegChartBar, FaNotesMedical, FaRegClock, FaRibbon, FaFlask } from 'react-icons/fa';

const videos = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    condition: 'Breast Cancer (Stage 3)',
    status: '5 Years Cancer-Free',
    title: 'Dr. Carter\'s support plan helped restore my cellular vitality.',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=400',
    videoUrl: 'https://www.youtube.com/watch?v=i5VuQjcV30w',
  },
  {
    id: 2,
    name: 'Robert Chen',
    condition: 'Lung Cancer (Stage 2)',
    status: '3 Years Stable & Healthy',
    title: 'The pulmonary herbal blends significantly helped ease my breathing.',
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    name: 'Helena Silva',
    condition: 'Colon Cancer (Stage 4)',
    status: 'In Full Remission',
    title: 'Restoring my gut flora naturally changed my whole prognosis.',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

const reviewsList = [
  { name: 'Emily Watson', location: 'United Kingdom', rating: 5, text: 'Dr. Carter\'s team was incredibly supportive. We integrated the herbal mixtures alongside chemotherapy, and my oncology team was amazed at my blood count stability.', date: '2 weeks ago' },
  { name: 'Arthur Pendelton', location: 'United States', rating: 5, text: 'Getting a custom cancer herbal support protocol helped me regain my appetite and sleep. My fatigue levels went down significantly within the first 3 weeks.', date: '1 month ago' },
  { name: 'Kari Niemi', location: 'Finland', rating: 5, text: 'Absolutely recommend the free discovery call. They reviewed my biopsy and scan results, explaining the exact role of each herb in my personalized formulation.', date: '2 months ago' },
  { name: 'Devendra Sharma', location: 'India', rating: 5, text: 'The support doesn\'t stop at sending herbal supplements. The lifestyle diet charts and weekly follow-up consultations were vital in keeping me positive.', date: '3 months ago' },
];

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

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('breast');
  const activeCaseStudy = caseStudies.find(study => study.id === activeTab);

  return (
    <>
      {/* Video Testimonials Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-badge" style={{ background: 'var(--secondary-light)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)' }}>
              <FaVideo /> Patient Video Journeys
            </span>
            <h2 className="section-title">Inspiring <span>Success Stories</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto', color: 'var(--gray-3)' }}>
              Watch detailed accounts of our patients discussing their healing journeys, clinical milestones, and holistic experiences.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '30px' }}>
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                whileHover={{ scale: 1.02 }}
                style={{ background: 'var(--white)', border: '1px solid var(--gray-2)', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', cursor: 'pointer' }}
                onClick={() => setActiveVideo(video)}
              >
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img src={video.thumbnail} alt={video.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="video-card-overlay" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s ease' }}>
                    <motion.div whileHover={{ scale: 1.15 }} style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-primary)', fontSize: '18px', color: 'white', paddingLeft: '4px' }}>
                      <FaPlay />
                    </motion.div>
                  </div>
                </div>
                <div style={{ padding: 'var(--card-padding-sm, 24px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--dark-2)' }}>{video.name}</div>
                    <div style={{ display: 'flex', gap: '2px', color: '#FBBF24', fontSize: '12px' }}>
                      {[...Array(5)].map((_, idx) => <FaStar key={idx} />)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span style={{ fontSize: '11px', background: 'var(--gray-1)', padding: '4px 10px', borderRadius: '50px', color: 'var(--gray-3)', border: '1px solid var(--gray-2)' }}>{video.condition}</span>
                    <span style={{ fontSize: '11px', background: 'var(--secondary-light)', padding: '4px 10px', borderRadius: '50px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaCheckCircle style={{ fontSize: '9px' }} /> {video.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--gray-3)', lineHeight: '1.6', fontStyle: 'italic' }}>"{video.title}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{ width: '100%', maxWidth: '800px', background: 'var(--dark-2)', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setActiveVideo(null)} style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', zIndex: 10 }}>
                  <FaTimes />
                </button>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe src={activeVideo.videoUrl} title={activeVideo.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>{activeVideo.name} — {activeVideo.condition}</div>
                  <div style={{ fontSize: '14px', color: 'var(--primary)' }}>{activeVideo.status}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Written Reviews Section */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div data-aos="fade-up" className="rating-overview-container" style={{ background: 'var(--gray-1)', borderRadius: '24px', padding: 'var(--card-padding-lg, 36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '48px', border: '1px solid var(--gray-2)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3B82F6', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                <FaPlay /> Patient Testimonials
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark-2)' }}>Trusted by <span>Patients Worldwide</span></h3>
            </div>
            <div className="rating-row" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--dark-2)', lineHeight: 1 }}>4.9</div>
                <div style={{ display: 'flex', gap: '2px', color: '#FBBF24', margin: '4px 0' }}>
                  {[...Array(5)].map((_, idx) => <FaStar key={idx} />)}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--gray-3)', fontWeight: '500' }}>Based on 2,500+ reviews</div>
              </div>
              <div className="divider" style={{ height: '70px', width: '1px', background: 'var(--gray-2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaCheckCircle style={{ color: 'var(--primary)', fontSize: '20px' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--dark-2)' }}>100% Verified</div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-3)' }}>Patient identities anonymized for privacy</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '24px' }}>
            {reviewsList.map((review, i) => (
              <motion.div
                key={review.name}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                whileHover={{ y: -4 }}
                style={{ background: 'white', borderRadius: '16px', padding: 'var(--card-padding-sm, 24px)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--gray-2)', position: 'relative' }}
              >
                <FaQuoteLeft style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', color: 'var(--primary)', opacity: 0.1 }} />
                <div style={{ display: 'flex', gap: '2px', color: '#FBBF24', marginBottom: '14px' }}>
                  {[...Array(review.rating)].map((_, idx) => <FaStar key={idx} />)}
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-3)', lineHeight: '1.6', marginBottom: '20px' }}>"{review.text}"</p>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--dark-2)' }}>{review.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--gray-3)', marginTop: '2px' }}>
                    <span>{review.location}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="section-padding" style={{ background: 'var(--gray-1)' }}>
        <div className="container">
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-badge"><FaFlask /> Clinical Case Studies</span>
            <h2 className="section-title">Evidence-Based <span>Outcomes</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>A detailed review of patient biomarkers, treatments, and clinical timelines showcasing our integrative healing approach.</p>
          </div>

          <div className="tabs-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }} data-aos="fade-up">
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
                  background: activeTab === study.id ? 'var(--gradient-primary)' : 'white',
                  color: activeTab === study.id ? 'white' : 'var(--primary-dark)',
                  cursor: 'pointer',
                  boxShadow: activeTab === study.id ? 'var(--shadow-primary)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {study.tabTitle}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{ background: 'white', borderRadius: '24px', padding: 'var(--card-padding-lg, 40px)', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '40px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--secondary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontSize: '18px' }}>
                      <FaNotesMedical />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--dark-2)' }}>{activeCaseStudy.patientName}</h3>
                      <div style={{ fontSize: '12px', color: 'var(--gray-3)' }}>Age/Gender: {activeCaseStudy.ageGender}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '6px' }}>Diagnosis</div>
                    <div style={{ fontSize: '14.5px', color: 'var(--dark-2)', fontWeight: '600' }}>{activeCaseStudy.diagnosis}</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '12px' }}>
                      <FaRegChartBar style={{ color: 'var(--primary)' }} /> Biomarker Progression
                    </div>
                    <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', minWidth: '280px', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--gray-2)', textAlign: 'left' }}>
                            <th style={{ padding: '8px 0', color: 'var(--gray-3)', whiteSpace: 'nowrap' }}>Biomarker / Metric</th>
                            <th style={{ padding: '8px 0', color: '#EF4444', whiteSpace: 'nowrap' }}>Pre-Herbal</th>
                            <th style={{ padding: '8px 0', color: 'var(--primary-dark)', whiteSpace: 'nowrap' }}>Post-Treatment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeCaseStudy.biomarkers.map((bio, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid var(--gray-1)' }}>
                              <td style={{ padding: '10px 10px 10px 0', fontWeight: '500', color: 'var(--dark-3)' }}>{bio.metric}</td>
                              <td style={{ padding: '10px 10px 10px 0', color: '#EF4444', fontWeight: '600', whiteSpace: 'nowrap' }}>{bio.pre}</td>
                              <td style={{ padding: '10px 0', color: 'var(--primary-dark)', fontWeight: '600', whiteSpace: 'nowrap' }}>{bio.post}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--secondary-light)', border: '1px solid rgba(37,99,235,0.15)', color: 'var(--primary-dark)', padding: '6px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: '600', marginBottom: '24px' }}>
                      <FaRegClock /> {activeCaseStudy.duration}
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '8px' }}>
                        <FaRibbon style={{ color: 'var(--primary)' }} /> Supportive Herbal Protocol
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--dark-3)', lineHeight: '1.7', fontWeight: '500' }}>{activeCaseStudy.protocol}</p>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '8px' }}>
                        <FaBookmark style={{ color: 'var(--secondary)' }} /> Clinical Summary
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.7' }}>{activeCaseStudy.clinicalSummary}</p>
                    </div>
                  </div>
                  <div style={{ background: 'var(--gray-1)', padding: '14px 18px', borderRadius: '12px', fontSize: '11px', color: 'var(--gray-3)', borderLeft: '3px solid var(--primary)', lineHeight: '1.5' }}>
                    <strong>Disclaimer:</strong> Herbal protocols are complementary support systems. Outcomes vary and should be administered in coordination with a certified oncologist.
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .rating-overview-container { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .rating-row { flex-direction: column !important; align-items: center !important; gap: 16px !important; width: 100% !important; }
          .rating-row .divider { display: none !important; }
          .tabs-container { flex-direction: column !important; align-items: center !important; width: 100% !important; gap: 8px !important; }
          .tabs-container button { width: 100% !important; text-align: center !important; padding: 10px 16px !important; }
        }
      `}</style>
    </>
  );
}