// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//   FaCalendarAlt, FaFileMedical, FaFileSignature,
//   FaCapsules, FaUserShield, FaArrowRight
// } from 'react-icons/fa';

// const steps = [
//   {
//     num: '01',
//     icon: <FaCalendarAlt />,
//     title: 'Consultation',
//     desc: 'Book your free discovery consultation to discuss your medical history, current condition, and treatments.',
//   },
//   {
//     num: '02',
//     icon: <FaFileMedical />,
//     title: 'Evaluation',
//     desc: 'Our medical experts evaluate your clinical reports, scans, and diagnostic logs to understand your status.',
//   },
//   {
//     num: '03',
//     icon: <FaFileSignature />,
//     title: 'Personalized Plan',
//     desc: 'We formulate a customized herbal remedy plan alongside targeted nutritional and lifestyle guidance.',
//   },
//   {
//     num: '04',
//     icon: <FaCapsules />,
//     title: 'Treatment Guidance',
//     desc: 'Receive your premium herbal formulations with step-by-step instructions on dosages and timing.',
//   },
//   {
//     num: '05',
//     icon: <FaUserShield />,
//     title: 'Follow-Up Support',
//     desc: 'Continuous monitoring, symptom tracking, and treatment modifications to ensure your recovery is on track.',
//   },
// ];

// export default function TreatmentProcess() {
//   return (
//     <section
//       id="treatment"
//       className="section-padding"
//       style={{
// background: 'linear-gradient(180deg, #38bed508 0%, #ffffff 100%)',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       <div className="container">
//         <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
//           <span className="section-badge">
//             <FaFileMedical /> How We Support You
//           </span>
//           <h2 className="section-title">
//             Your Healing <span>Journey</span>
//           </h2>
//           <p className="section-subtitle" style={{ margin: '0 auto' }}>
//             A structured, professional step-by-step methodology to support your recovery process through personalized herbal care.
//           </p>
//         </div>

//         {/* Process Steps */}
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//             gap: '30px',
//             position: 'relative',
//           }}
//         >
//           {/* Connector Line (Desktop) */}
//           <div
//             style={{
//               position: 'absolute',
//               top: '50px',
//               left: '40px',
//               right: '40px',
//               height: '3px',
//             background: '#38bed515',
//               zIndex: 0,
//               opacity: 0.5,
//             }}
//             className="desktop-connector"
//           />

//           {steps.map((step, i) => (
//             <motion.div
//               key={step.num}
//               data-aos="fade-up"
//               data-aos-delay={i * 120}
//           whileHover={{
//   scale: 1.05,
//   y: -8,
// }}
//               style={{
//                 background: 'white',
//                 borderRadius: '24px',
//                 padding: 'var(--card-padding-sm, 32px 24px)',
//                 boxShadow: 'var(--shadow-md)',
//                 position: 'relative',
//                 zIndex: 1,
// border: '1px solid #38bed520',
//                 textAlign: 'center',
//               }}
//             >
//               {/* Number Badge */}
//               <div
//                 style={{
//                   position: 'absolute',
//                   top: '-15px',
//                   right: '24px',
//                  background: '#38bed515',
//                   padding: '4px 12px',
//                   borderRadius: '50px',
//                   fontSize: '13px',
//                   fontWeight: '800',
// color: '#0B5B67',
//                   boxShadow: 'var(--shadow-sm)',
//                 border: '1px solid #38bed530',
//                 }}
//               >
//                 {step.num}
//               </div>

//               {/* Icon */}
//               <div
//               style={{
//   width: '64px',
//   height: '64px',
//   borderRadius: '50%',
//   background: '#38bed515',
//   color: '#38BED5',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: '24px',
//   margin: '0 auto 24px',
//   boxShadow: '0 0 0 8px #38bed510',
// }}
//               >
//                 {step.icon}
//               </div>

//               {/* Title */}
//               <h3
//                 style={{
//                   fontSize: '18px',
//                   fontWeight: '700',
//                   color: 'var(--dark-2)',
//                   marginBottom: '12px',
//                   fontFamily: 'Poppins, sans-serif',
//                 }}
//               >
//                 {step.title}
//               </h3>

//               {/* Description */}
//               <p
//                 style={{
//                   fontSize: '13px',
//                   color: 'var(--gray-3)',
//                   lineHeight: '1.6',
//                 }}
//               >
//                 {step.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Action Button */}
//         <div style={{ textAlign: 'center', marginTop: '48px' }}>
//           <a href="#consultation" className="btn-secondary" data-aos="fade-up">
//             Start Your Journey Now <FaArrowRight />
//           </a>
//         </div>
//       </div>

//       <style>{`
//         @media (max-width: 991px) {
//           .desktop-connector { display: none !important; }
//         }
//       `}</style>
//     </section>
//   );
// }


import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import {
  FaCalendarAlt,
  FaFileMedical,
  FaFileSignature,
  FaCapsules,
  FaUserShield,
  FaArrowRight,
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const ACCENT_LIGHT = '#38bed520';
const ACCENT_MID = '#38bed540';
const ACCENT_DARK = '#2ca8be';
const steps = [
  {
    num: '01',
    icon: <FaCalendarAlt />,
    color: '#38bed5', // Blue
    title: 'Consultation',
    desc: 'Book your free discovery consultation...',
  },
  {
    num: '02',
    icon: <FaFileMedical />,
    color: '#22c55e', // Green
    title: 'Evaluation',
    desc: 'Our medical experts evaluate...',
  },
  {
    num: '03',
    icon: <FaFileSignature />,
    color: '#f59e0b', // Amber
    title: 'Personalized Plan',
    desc: 'We formulate a customized...',
  },
  {
    num: '04',
    icon: <FaCapsules />,
    color: '#8b5cf6', // Purple
    title: 'Treatment Guidance',
    desc: 'Receive your premium herbal formulations...',
  },
  {
    num: '05',
    icon: <FaUserShield />,
    color: '#ef4444', // Red
    title: 'Follow-Up Support',
    desc: 'Continuous monitoring...',
  },
];
export default function TreatmentProcess() {
  return (
    <section
      id="treatment"
      className="section-padding"
      style={{
        background: `linear-gradient(
          180deg,
          ${ACCENT_LIGHT} 0%,
          #ffffff 50%,
          ${ACCENT_LIGHT} 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">

        <div
          data-aos="fade-up"
          style={{
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          <span className="section-badge">
            <FaFileMedical /> How We Support You
          </span>

          <h2 className="section-title">
            Your Healing <span style={{ color: ACCENT }}>Journey</span>
          </h2>

          <p
            className="section-subtitle"
            style={{ margin: '0 auto' }}
          >
            A structured, professional step-by-step methodology to support
            your recovery process through personalized herbal care.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: '30px',
            position: 'relative',
          }}
        >
          <div
            className="desktop-connector"
            style={{
              position: 'absolute',
              top: '50px',
              left: '40px',
              right: '40px',
              height: '3px',
              background: `linear-gradient(
                90deg,
                ${ACCENT_MID},
                ${ACCENT},
                ${ACCENT_MID}
              )`,
              zIndex: 0,
              opacity: 0.7,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              whileHover={{
                scale: 1.04,
                y: -10,
              }}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '32px 24px',
                boxShadow: `0 10px 30px ${ACCENT_LIGHT}`,
                position: 'relative',
                zIndex: 1,
                border: `1px solid ${ACCENT_MID}`,
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '24px',
                  background: `linear-gradient(
                    135deg,
                    ${ACCENT},
                    ${ACCENT_DARK}
                  )`,
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: '800',
                  color: '#ffffff',
                  boxShadow: `0 8px 20px ${ACCENT_MID}`,
                }}
              >
                {step.num}
              </div>

              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: ACCENT_LIGHT,
                  color: ACCENT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  margin: '0 auto 24px',
                  border: `2px solid ${ACCENT_MID}`,
                  boxShadow: `0 0 0 10px ${ACCENT_LIGHT}`,
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--dark-2)',
                  marginBottom: '12px',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--gray-3)',
                  lineHeight: '1.7',
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '56px',
          }}
        >
          <Link
            to="/contact"
            data-aos="fade-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: `linear-gradient(
                135deg,
                ${ACCENT},
                ${ACCENT_DARK}
              )`,
              color: '#ffffff',
              padding: '15px 34px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: `0 10px 25px ${ACCENT_MID}`,
              transition: 'all 0.3s ease',
            }}
          >
            Start Your Journey Now
            <FaArrowRight />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .desktop-connector {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

