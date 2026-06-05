// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaStethoscope, FaHeart, FaUsers, FaAward, FaGlobe, FaShieldAlt, FaRegLightbulb, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


// export default function About() {
//   const milestones = [
//     { year: '2004', title: 'Founded', desc: 'Established with mission to integrate herbal medicine with modern oncology' },
//     { year: '2008', title: 'Certification', desc: 'WHO certified for complementary cancer support protocols' },
//     { year: '2012', title: 'Research Wing', desc: 'Opened dedicated botanical research laboratory' },
//     { year: '2016', title: 'Global Network', desc: 'Expanded to serve patients in 25+ countries' },
//     { year: '2020', title: 'Digital Platform', desc: 'Launched teleconsultation and remote monitoring services' },
//     { year: '2024', title: '10,000+ Patients', desc: 'Celebrated milestone of 10,000+ patients supported worldwide' },
//   ];

//   const values = [
//     { icon: <FaHeart />, title: 'Compassionate Care', desc: 'Every patient receives personalized attention and support throughout their journey' },
//     { icon: <FaShieldAlt />, title: 'Evidence-Based', desc: 'All protocols are backed by scientific research and clinical studies' },
//     { icon: <FaUsers />, title: 'Patient-Centered', desc: 'Your comfort, safety, and recovery are our top priorities' },
//     { icon: <FaRegLightbulb />, title: 'Innovation', desc: 'Continuous research and development in herbal oncology support' },
//   ];

//   return (
//     <>
//       <section
//         style={{
//           minHeight: '60vh',
//           background: 'linear-gradient(135deg, #F8FAFC 0%, #DBEAFE 100%)',
//           display: 'flex',
//           alignItems: 'center',
//           paddingTop: '80px',
//         }}
//       >
//         <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
//           <motion.span
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="section-badge"
//             style={{ background: 'var(--secondary-light)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)' }}
//           >
//             <FaStethoscope /> About Our Clinic
//           </motion.span>
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '800', color: 'var(--dark-2)', marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}
//           >
//             Pioneering <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Integrative Cancer Care</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             style={{ fontSize: '18px', color: 'var(--gray-3)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}
//           >
//             For over two decades, Cancer Herbalist has been at the forefront of integrating evidence-based herbal medicine with conventional cancer treatment, providing holistic support to patients worldwide.
//           </motion.p>
//         </div>
//       </section>

//       <section className="section-padding" style={{ background: 'var(--white)' }}>
//         <div className="container">
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
//             <div data-aos="fade-right">
//               <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '24px' }}>
//                 Our Mission & Vision
//               </h2>
//               <p style={{ fontSize: '15px', color: 'var(--gray-3)', lineHeight: '1.8', marginBottom: '20px' }}>
//                 Our mission is to provide safe, effective botanical support protocols that complement conventional cancer treatments, enhancing patient well-being and recovery outcomes.
//               </p>
//               <p style={{ fontSize: '15px', color: 'var(--gray-3)', lineHeight: '1.8', marginBottom: '20px' }}>
//                 We envision a world where every cancer patient has access to integrative care that addresses not just the disease, but the whole person - body, mind, and spirit.
//               </p>
//               <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
//                 <div style={{ background: 'var(--secondary-light)', padding: '16px 24px', borderRadius: '12px', flex: 1, minWidth: '120px' }}>
//                   <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-dark)' }}>20+</div>
//                   <div style={{ fontSize: '13px', color: 'var(--gray-3)' }}>Years Experience</div>
//                 </div>
//                 <div style={{ background: 'var(--secondary-light)', padding: '16px 24px', borderRadius: '12px', flex: 1, minWidth: '120px' }}>
//                   <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-dark)' }}>45+</div>
//                   <div style={{ fontSize: '13px', color: 'var(--gray-3)' }}>Countries Served</div>
//                 </div>
//               </div>
//             </div>
//             <div data-aos="fade-left">
//               <img
//                 src="https://images.unsplash.com/photo-1576091160399-112768aecf0a?auto=format&fit=crop&q=80&w=600&h=400"
//                 alt="Our Clinic"
//                 style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="section-padding" style={{ background: 'var(--gray-1)' }}>
//         <div className="container">
//           <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
//             <span className="section-badge" style={{ background: 'var(--secondary-light)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)' }}>
//               <FaAward /> Our Core Values
//             </span>
//             <h2 className="section-title">
//               Principles That <span>Guide Us</span>
//             </h2>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
//             {values.map((value, i) => (
//               <motion.div
//                 key={value.title}
//                 data-aos="fade-up"
//                 data-aos-delay={i * 100}
//                 whileHover={{ y: -4 }}
//                 style={{ background: 'white', borderRadius: '24px', padding: 'var(--card-padding-sm, 32px)', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}
//               >
//                 <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px', color: 'white' }}>
//                   {value.icon}
//                 </div>
//                 <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '12px' }}>{value.title}</h3>
//                 <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.6' }}>{value.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="section-padding" style={{ background: 'var(--white)' }}>
//         <div className="container">
//           <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
//             <span className="section-badge" style={{ background: 'var(--secondary-light)', border: '1px solid var(--primary-light)', color: 'var(--primary-dark)' }}>
//               <FaGlobe /> Our Journey
//             </span>
//             <h2 className="section-title">
//               Milestones & <span>Achievements</span>
//             </h2>
//           </div>
//           <div style={{ position: 'relative' }}>
//             <div style={{ position: 'absolute', top: '30px', left: '50%', width: '4px', height: 'calc(100% - 60px)', background: 'var(--primary-light)', transform: 'translateX(-50%)', display: 'none' }} className="timeline-line"></div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
//               {milestones.map((milestone, i) => (
//                 <motion.div
//                   key={milestone.year}
//                   data-aos="fade-up"
//                   data-aos-delay={i * 100}
//                   style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-md)', borderLeft: '4px solid var(--primary)', position: 'relative' }}
//                 >
//                   <div style={{ position: 'absolute', top: '-10px', left: '24px', background: 'var(--gradient-primary)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '700' }}>
//                     {milestone.year}
//                   </div>
//                   <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--dark-2)', marginTop: '16px' }}>{milestone.title}</h3>
//                   <p style={{ fontSize: '13px', color: 'var(--gray-3)', marginTop: '8px' }}>{milestone.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//     </>
//   );
// }

// <style>{`
//   @media (max-width: 768px) {
//     .timeline-line { display: block !important; }
//   }
// `}</style>



import React from 'react';
import { motion } from 'framer-motion';
import { FaStethoscope, FaHeart, FaUsers, FaAward, FaGlobe, FaShieldAlt, FaRegLightbulb, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ACCENT = '#38bed5';
const ACCENT_LIGHT = '#38bed515';
const ACCENT_MID = '#38bed533';

export default function About() {
  const milestones = [
    { year: '2004', title: 'Founded', desc: 'Established with mission to integrate herbal medicine with modern oncology' },
    { year: '2008', title: 'Certification', desc: 'WHO certified for complementary cancer support protocols' },
    { year: '2012', title: 'Research Wing', desc: 'Opened dedicated botanical research laboratory' },
    { year: '2016', title: 'Global Network', desc: 'Expanded to serve patients in 25+ countries' },
    { year: '2020', title: 'Digital Platform', desc: 'Launched teleconsultation and remote monitoring services' },
    { year: '2024', title: '10,000+ Patients', desc: 'Celebrated milestone of 10,000+ patients supported worldwide' },
  ];

  const values = [
    { icon: <FaHeart />, title: 'Compassionate Care', desc: 'Every patient receives personalized attention and support throughout their journey' },
    { icon: <FaShieldAlt />, title: 'Evidence-Based', desc: 'All protocols are backed by scientific research and clinical studies' },
    { icon: <FaUsers />, title: 'Patient-Centered', desc: 'Your comfort, safety, and recovery are our top priorities' },
    { icon: <FaRegLightbulb />, title: 'Innovation', desc: 'Continuous research and development in herbal oncology support' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          minHeight: '60vh',
          background: `linear-gradient(135deg, ${ACCENT_LIGHT} 0%, #f0fbfd 100%)`,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '80px',
        }}
      >
        <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-badge"
            style={{
              background: ACCENT_LIGHT,
              border: `1px solid ${ACCENT_MID}`,
              color: ACCENT,
            }}
          >
            <FaStethoscope /> About Our Clinic
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: '800',
              color: 'var(--dark-2)',
              marginBottom: '24px',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Pioneering{' '}
            <span style={{ color: ACCENT }}>
              Integrative Cancer Care
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: 'var(--gray-3)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8',
            }}
          >
            For over two decades, Cancer Herbalist has been at the forefront of integrating
            evidence-based herbal medicine with conventional cancer treatment, providing
            holistic support to patients worldwide.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div data-aos="fade-right">
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '24px' }}>
                Our Mission & Vision
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--gray-3)', lineHeight: '1.8', marginBottom: '20px' }}>
                Our mission is to provide safe, effective botanical support protocols that complement
                conventional cancer treatments, enhancing patient well-being and recovery outcomes.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--gray-3)', lineHeight: '1.8', marginBottom: '20px' }}>
                We envision a world where every cancer patient has access to integrative care that
                addresses not just the disease, but the whole person — body, mind, and spirit.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_MID}`, padding: '16px 24px', borderRadius: '12px', flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: ACCENT }}>20+</div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-3)' }}>Years Experience</div>
                </div>
                <div style={{ background: ACCENT_LIGHT, border: `1px solid ${ACCENT_MID}`, padding: '16px 24px', borderRadius: '12px', flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: ACCENT }}>45+</div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-3)' }}>Countries Served</div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112768aecf0a?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Our Clinic"
                style={{
                  width: '100%',
                  borderRadius: '24px',
                  boxShadow: `0 20px 60px ${ACCENT_LIGHT}`,
                  border: `1px solid ${ACCENT_MID}`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" style={{ background: 'var(--gray-1)' }}>
        <div className="container">
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span
              className="section-badge"
              style={{
                background: ACCENT_LIGHT,
                border: `1px solid ${ACCENT_MID}`,
                color: ACCENT,
              }}
            >
              <FaAward /> Our Core Values
            </span>
            <h2 className="section-title">
              Principles That <span style={{ color: ACCENT }}>Guide Us</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                whileHover={{ y: -4 }}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: 'var(--card-padding-sm, 32px)',
                  boxShadow: 'var(--shadow-md)',
                  textAlign: 'center',
                  border: `1px solid ${ACCENT_MID}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '24px',
                    color: 'white',
                    boxShadow: `0 8px 24px ${ACCENT_MID}`,
                  }}
                >
                  {value.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '12px' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.6' }}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span
              className="section-badge"
              style={{
                background: ACCENT_LIGHT,
                border: `1px solid ${ACCENT_MID}`,
                color: ACCENT,
              }}
            >
              <FaGlobe /> Our Journey
            </span>
            <h2 className="section-title">
              Milestones & <span style={{ color: ACCENT }}>Achievements</span>
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '30px',
                left: '50%',
                width: '4px',
                height: 'calc(100% - 60px)',
                background: ACCENT_MID,
                transform: 'translateX(-50%)',
                display: 'none',
              }}
              className="timeline-line"
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: 'var(--shadow-md)',
                    borderLeft: `4px solid ${ACCENT}`,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '24px',
                      background: ACCENT,
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: '700',
                      boxShadow: `0 4px 12px ${ACCENT_MID}`,
                    }}
                  >
                    {milestone.year}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--dark-2)', marginTop: '16px' }}>
                    {milestone.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--gray-3)', marginTop: '8px' }}>
                    {milestone.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { display: block !important; }
        }
      `}</style>
    </>
  );
}