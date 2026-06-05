// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   FaLeaf, FaShieldAlt, FaUserMd, FaStar,
//   FaPlay, FaArrowRight, FaCheckCircle, FaGlobe
// } from 'react-icons/fa';

// const floatingStats = [
//   { icon: <FaUserMd />, value: '10,000+', label: 'Patients Helped', color: '#00C853' },
//   { icon: <FaGlobe />, value: '45+', label: 'Countries Served', color: '#FF6D00' },
//   { icon: <FaStar />, value: '4.9/5', label: 'Patient Rating', color: '#FFD600' },
// ];

// const trustItems = [
//   'Natural Herbal Treatments',
//   'Certified Practitioners',
//   'Personalized Care Plans',
//   '24/7 Patient Support',
// ];

// export default function Hero() {
//   const [currentWord, setCurrentWord] = useState(0);
//   const words = ['Naturally', 'Holistically', 'Effectively', 'Safely'];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWord((prev) => (prev + 1) % words.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
// <section
//        id="home"
//        style={{
//          minHeight: '100vh',
//          background: 'linear-gradient(135deg, #F8FAFC 0%, #DBEAFE 100%)',
//          position: 'relative',
//          overflow: 'hidden',
//          display: 'flex',
//          alignItems: 'center',
//          paddingTop: '80px',
//        }}
//      >
//       {/* Animated Background Elements */}
//       <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
//         {/* Green glow circles */}
//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.05, 0.12, 0.05],
//             }}
//             transition={{
//               duration: 4 + i,
//               repeat: Infinity,
//               delay: i * 0.8,
//             }}
//             style={{
//               position: 'absolute',
//               width: `${200 + i * 80}px`,
//               height: `${200 + i * 80}px`,
//               borderRadius: '50%',
//               background: i % 2 === 0
//                 ? 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)'
//                 : 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
//               left: `${[10, 70, 25, 80, 50][i]}%`,
//               top: `${[20, 10, 60, 50, 80][i]}%`,
//               transform: 'translate(-50%, -50%)',
//             }}
//           />
//         ))}

//         {/* Floating leaves */}
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={`leaf-${i}`}
//             animate={{
//               y: [-20, 20, -20],
//               rotate: [0, 180, 360],
//               opacity: [0.1, 0.3, 0.1],
//             }}
//             transition={{
//               duration: 5 + i,
//               repeat: Infinity,
//               delay: i * 0.6,
//               ease: 'easeInOut',
//             }}
//             style={{
//               position: 'absolute',
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               color: 'var(--primary)',
//               fontSize: `${12 + i * 3}px`,
//             }}
//           >
//             <FaLeaf />
//           </motion.div>
//         ))}

//         {/* Grid pattern */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             backgroundImage: `
//               linear-gradient(rgba(37,99,235,0.02) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(37,99,235,0.02) 1px, transparent 1px)
//             `,
//             backgroundSize: '60px 60px',
//           }}
//         />
//       </div>

//       <div
//         className="container"
//         style={{ position: 'relative', zIndex: 1, width: '100%' }}
//       >
//         <div
//           className="hero-grid"
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//             gap: '60px',
//             alignItems: 'center',
//           }}
//         >
//           {/* Left Content */}
//           <div>
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 background: 'var(--primary-light)',
//                 border: '1px solid rgba(37,99,235,0.2)',
//                 color: 'var(--primary-dark)',
//                 padding: '8px 18px',
//                 borderRadius: '50px',
//                 fontSize: '13px',
//                 fontWeight: '600',
//                 marginBottom: '24px',
//               }}
//             >
//               <motion.span
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//               >
//                 <FaLeaf />
//               </motion.span>
//               Natural Cancer Treatment Specialists
//               <span
//                 style={{
//                   width: '6px',
//                   height: '6px',
//                   borderRadius: '50%',
//                   background: 'var(--primary)',
//                   animation: 'pulse-green 1.5s infinite',
//                 }}
//               />
//             </motion.div>

//             {/* Main Heading */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               style={{
//                 fontSize: 'clamp(32px, 6vw, 68px)',
//                 fontWeight: '800',
//                 color: 'var(--dark-2)',
//                 lineHeight: '1.15',
//                 marginBottom: '8px',
//               }}
//             >
//               Fight Cancer
//             </motion.h1>

//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
// style={{
//                    fontSize: 'clamp(32px, 6vw, 68px)',
//                    fontWeight: '800',
//                    lineHeight: '1.15',
//                    marginBottom: '24px',
//                    height: 'clamp(44px, 8vw, 88px)',
//                    overflow: 'hidden',
//                  }}
//                >
//                 {words.map((word, i) => (
//                   <motion.span
//                     key={word}
//                     initial={{ y: '100%' }}
//                     animate={{ y: currentWord === i ? '0%' : currentWord > i ? '-100%' : '100%' }}
//                     transition={{ duration: 0.5, ease: 'easeInOut' }}
//                     style={{
//                       display: currentWord === i ? 'block' : 'none',
//                       background: 'var(--gradient-primary)',
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent',
//                       backgroundClip: 'text',
//                     }}
//                   >
//                   {word}
//                 </motion.span>
//               ))}
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//               style={{
//                 fontSize: '17px',
//                 color: 'var(--gray-3)',
//                 lineHeight: '1.8',
//                 marginBottom: '32px',
//                 maxWidth: '500px',
//               }}
//             >
//               Combining ancient herbal wisdom with modern medical knowledge to provide
//               holistic, personalized cancer treatment support. Your journey to healing
//               starts here.
//             </motion.p>

//             {/* Trust Items */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.4 }}
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(2, 1fr)',
//                 gap: '10px',
//                 marginBottom: '36px',
//               }}
//             >
//               {trustItems.map((item) => (
//                 <div
//                   key={item}
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     color: 'var(--dark-3)',
//                     fontSize: '13px',
//                     fontWeight: '500',
//                   }}
//                 >
//                   <FaCheckCircle style={{ color: 'var(--primary)', fontSize: '14px', flexShrink: 0 }} />
//                   {item}
//                 </div>
//               ))}
//             </motion.div>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.5 }}
//               className="hero-btns"
//               style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
//             >
//               <motion.a
//                 href="#consultation"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="btn-primary"
//                 style={{ fontSize: '16px', padding: '16px 32px' }}
//               >
//                 Book Free Consultation
//                 <FaArrowRight />
//               </motion.a>
//               <motion.a
//                 href="#testimonials"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '12px',
//                   color: 'var(--dark-2)',
//                   textDecoration: 'none',
//                   fontSize: '15px',
//                   fontWeight: '500',
//                   padding: '16px 24px',
//                   border: '2px solid var(--gray-2)',
//                   borderRadius: '50px',
//                   background: 'var(--white)',
//                   transition: 'all 0.3s ease',
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = 'var(--primary)';
//                   e.currentTarget.style.background = 'var(--secondary-light)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = 'var(--gray-2)';
//                   e.currentTarget.style.background = 'var(--white)';
//                 }}
//               >
//                 <div
//                   style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
// background: 'var(--gradient-primary)',
//                      display: 'flex',
//                      alignItems: 'center',
//                      justifyContent: 'center',
//                      flexShrink: 0,
//                    }}
//                 >
//                   <FaPlay />
//                 </div>
//               </motion.a>
//             </motion.div>
//           </div>

//           {/* Right Content - Visual Cards */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             style={{ position: 'relative' }}
//           >
//             {/* Main Visual Card */}
//             <div
//               style={{
//                 background: 'var(--white)',
//                 backdropFilter: 'blur(20px)',
//                 border: '1px solid var(--gray-2)',
//                 borderRadius: '24px',
//                 padding: 'var(--card-padding-md, 32px)',
//                 position: 'relative',
//                 boxShadow: 'var(--shadow-lg)',
//               }}
//             >
//               {/* Header */}
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px',
//                   marginBottom: '24px',
//                 }}
//               >
//                 <div
//                   style={{
//                     width: '50px',
//                     height: '50px',
//                     borderRadius: '14px',
//                     background: 'var(--gradient-green)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <FaShieldAlt style={{ color: 'white', fontSize: '22px' }} />
//                 </div>
//                 <div>
//                   <div style={{ color: 'var(--dark-2)', fontWeight: '700', fontSize: '16px' }}>
//                     Holistic Treatment Approach
//                   </div>
//                   <div style={{ color: 'var(--gray-3)', fontSize: '12px' }}>
//                     Evidence-based herbal care
//                   </div>
//                 </div>
//               </div>

//               {/* Treatment Aspects */}
//               {[
//                 { label: 'Immune System Boost', progress: 92, color: 'var(--primary)' },
//                 { label: 'Pain Management', progress: 88, color: 'var(--secondary)' },
//                 { label: 'Quality of Life', progress: 95, color: 'var(--accent-dark)' },
//                 { label: 'Natural Detox', progress: 85, color: 'var(--purple)' },
//               ].map((item, i) => (
//                 <div key={item.label} style={{ marginBottom: '16px' }}>
//                   <div
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       marginBottom: '6px',
//                     }}
//                   >
//                     <span style={{ color: 'var(--dark-3)', fontSize: '13px' }}>
//                       {item.label}
//                     </span>
//                     <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: '600' }}>
//                       {item.progress}%
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       height: '6px',
//                       background: 'var(--gray-1)',
//                       borderRadius: '3px',
//                       overflow: 'hidden',
//                     }}
//                   >
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${item.progress}%` }}
//                       transition={{ duration: 1.2, delay: 0.8 + i * 0.1 }}
//                       style={{
//                         height: '100%',
//                         background: item.color,
//                         borderRadius: '3px',
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}

//               {/* Bottom Stats Row */}
//               <div
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(3, 1fr)',
//                   gap: '12px',
//                   marginTop: '24px',
//                   paddingTop: '20px',
//                   borderTop: '1px solid var(--gray-2)',
//                 }}
//               >
//                 {floatingStats.map((stat) => (
//                   <div
//                     key={stat.label}
//                     style={{ textAlign: 'center' }}
//                   >
//                     <div
//                       style={{
//                         color: stat.color,
//                         fontSize: '20px',
//                         fontWeight: '800',
//                         fontFamily: 'Poppins, sans-serif',
//                       }}
//                     >
//                       {stat.value}
//                     </div>
//                     <div
//                       style={{
//                         color: 'var(--gray-3)',
//                         fontSize: '10px',
//                         lineHeight: '1.3',
//                       }}
//                     >
//                       {stat.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Floating Badge - Top Right */}
//             <motion.div
//               className="hero-badge-tr"
//               animate={{ y: [-5, 5, -5] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//               style={{
//                 position: 'absolute',
//                 top: '-20px',
//                 right: '-20px',
// background: 'var(--gradient-primary)',
//                  borderRadius: '16px',
//                  padding: '12px 16px',
//                  boxShadow: 'var(--shadow-primary)',
//               }}
//             >
//               <div style={{ color: 'white', fontWeight: '800', fontSize: '20px', lineHeight: 1 }}>
//                 20+
//               </div>
//               <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '10px', fontWeight: '500' }}>
//                 Years Expert
//               </div>
//             </motion.div>

//             {/* Floating Badge - Bottom Left */}
//             <motion.div
//               className="hero-badge-bl"
//               animate={{ y: [5, -5, 5] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
//               style={{
//                 position: 'absolute',
//                 bottom: '-20px',
//                 left: '-20px',
//                 background: 'rgba(255,255,255,0.95)',
//                 borderRadius: '16px',
//                 padding: '12px 16px',
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//               }}
//             >
//               <div
//                 style={{
//                   width: '36px',
//                   height: '36px',
//                   borderRadius: '10px',
//                   background: 'var(--gradient-green)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <FaStar style={{ color: 'white', fontSize: '16px' }} />
//               </div>
//               <div>
//                 <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--dark-2)' }}>
//                   4.9 ★ Rating
//                 </div>
//                 <div style={{ fontSize: '11px', color: 'var(--gray-3)' }}>
//                   2,500+ Reviews
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Bottom Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5 }}
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             marginTop: '60px',
//           }}
//         >
//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             style={{
//               width: '24px',
//               height: '40px',
//               border: '2px solid rgba(255,255,255,0.3)',
//               borderRadius: '12px',
//               display: 'flex',
//               justifyContent: 'center',
//               paddingTop: '6px',
//             }}
//           >
//             <div
//               style={{
//                 width: '4px',
//                 height: '8px',
//                 background: 'var(--primary)',
//                 borderRadius: '2px',
//               }}
//             />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaLeaf, FaShieldAlt, FaUserMd, FaStar,
  FaPlay, FaArrowRight, FaCheckCircle, FaGlobe
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const ACCENT_LIGHT = '#38bed520';
const ACCENT_MID = '#38bed533';

const floatingStats = [
   { icon: <FaUserMd />, value: '10,000+', label: 'Patients Helped', color: '#00C853' },
   { icon: <FaGlobe />, value: '45+', label: 'Countries Served', color: '#FF6D00' },
   { icon: <FaStar />, value: '4.9/5', label: 'Patient Rating', color: '#FFD600' },
];

const trustItems = [
  'Natural Herbal Treatments',
  'Certified Practitioners',
  'Personalized Care Plans',
  '24/7 Patient Support',
];

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Naturally', 'Holistically', 'Effectively', 'Safely'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, #f0fbfd 0%, #e0f7fa 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
      }}
    >
      {/* Animated Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            style={{
              position: 'absolute',
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${ACCENT}20 0%, transparent 70%)`,
              left: `${[10, 70, 25, 80, 50][i]}%`,
              top: `${[20, 10, 60, 50, 80][i]}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Floating leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            animate={{ y: [-20, 20, -20], rotate: [0, 180, 360], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              color: ACCENT,
              fontSize: `${12 + i * 3}px`,
            }}
          >
            <FaLeaf />
          </motion.div>
        ))}

        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(${ACCENT}08 1px, transparent 1px),
              linear-gradient(90deg, ${ACCENT}08 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: ACCENT_MID,
                border: `1px solid ${ACCENT}40`,
                color: ACCENT,
                padding: '8px 18px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '24px',
              }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <FaLeaf />
              </motion.span>
              Natural Cancer Treatment Specialists
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: ACCENT,
                  animation: 'pulse-green 1.5s infinite',
                }}
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: 'clamp(32px, 6vw, 68px)',
                fontWeight: '800',
                color: 'var(--dark-2)',
                lineHeight: '1.15',
                marginBottom: '8px',
              }}
            >
              Fight Cancer
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: 'clamp(32px, 6vw, 68px)',
                fontWeight: '800',
                lineHeight: '1.15',
                marginBottom: '24px',
                height: 'clamp(44px, 8vw, 88px)',
                overflow: 'hidden',
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ y: '100%' }}
                  animate={{ y: currentWord === i ? '0%' : currentWord > i ? '-100%' : '100%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{
                    display: currentWord === i ? 'block' : 'none',
                    color: ACCENT,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontSize: '17px',
                color: 'var(--gray-3)',
                lineHeight: '1.8',
                marginBottom: '32px',
                maxWidth: '500px',
              }}
            >
              Combining ancient herbal wisdom with modern medical knowledge to provide
              holistic, personalized cancer treatment support. Your journey to healing
              starts here.
            </motion.p>

            {/* Trust Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '36px',
              }}
            >
              {trustItems.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--dark-3)',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  <FaCheckCircle style={{ color: ACCENT, fontSize: '14px', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hero-btns"
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#consultation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                style={{
                  fontSize: '16px',
                  padding: '16px 32px',
                  background: ACCENT,
                  color: 'white',
                  borderRadius: '50px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: `0 8px 24px ${ACCENT}44`,
                }}
              >
                Book Free Consultation
                <FaArrowRight />
              </motion.a>

              <motion.a
                href="/testimonials"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'var(--dark-2)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  padding: '16px 24px',
                  border: `2px solid ${ACCENT}40`,
                  borderRadius: '50px',
                  background: 'var(--white)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.background = ACCENT_MID;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${ACCENT}40`;
                  e.currentTarget.style.background = 'var(--white)';
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FaPlay style={{ color: 'white', fontSize: '14px' }} />
                </div>
                Watch Story
              </motion.a>
            </motion.div>
          </div>

          {/* Right Content - Visual Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ position: 'relative' }}
          >
            {/* Main Visual Card */}
            <div
              style={{
                background: 'var(--white)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${ACCENT_MID}`,
                borderRadius: '24px',
                padding: '32px',
                position: 'relative',
                boxShadow: `0 20px 60px ${ACCENT}18`,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 20px ${ACCENT}44`,
                  }}
                >
                  <FaShieldAlt style={{ color: 'white', fontSize: '22px' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--dark-2)', fontWeight: '700', fontSize: '16px' }}>
                    Holistic Treatment Approach
                  </div>
                  <div style={{ color: 'var(--gray-3)', fontSize: '12px' }}>
                    Evidence-based herbal care
                  </div>
                </div>
              </div>

              {/* Treatment Aspects */}
              {[
                { label: 'Immune System Boost', progress: 92 },
                { label: 'Pain Management', progress: 88 },
                { label: 'Quality of Life', progress: 95 },
                { label: 'Natural Detox', progress: 85 },
              ].map((item, i) => (
                <div key={item.label} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--dark-3)', fontSize: '13px' }}>{item.label}</span>
                    <span style={{ color: ACCENT, fontSize: '13px', fontWeight: '600' }}>
                      {item.progress}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: '6px',
                      background: ACCENT_MID,
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.8 + i * 0.1 }}
                      style={{ height: '100%', background: ACCENT, borderRadius: '3px' }}
                    />
                  </div>
                </div>
              ))}

              {/* Bottom Stats Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: `1px solid ${ACCENT_MID}`,
                }}
              >
                {floatingStats.map((stat) => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        color: ACCENT,
                        fontSize: '20px',
                        fontWeight: '800',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ color: 'var(--gray-3)', fontSize: '10px', lineHeight: '1.3' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Badge - Top Right */}
            <motion.div
              className="hero-badge-tr"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: ACCENT,
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: `0 8px 24px ${ACCENT}55`,
              }}
            >
              <div style={{ color: 'white', fontWeight: '800', fontSize: '20px', lineHeight: 1 }}>
                20+
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '10px', fontWeight: '500' }}>
                Years Expert
              </div>
            </motion.div>

            {/* Floating Badge - Bottom Left */}
            <motion.div
              className="hero-badge-bl"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: `0 8px 32px ${ACCENT}33`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: ACCENT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${ACCENT}44`,
                }}
              >
                <FaStar style={{ color: 'white', fontSize: '16px' }} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--dark-2)' }}>
                  4.9 ★ Rating
                </div>
                <div style={{ fontSize: '11px', color: 'var(--gray-3)' }}>2,500+ Reviews</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '24px',
              height: '40px',
              border: `2px solid ${ACCENT}50`,
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                background: ACCENT,
                borderRadius: '2px',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}