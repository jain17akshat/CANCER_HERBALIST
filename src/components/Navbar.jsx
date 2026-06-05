// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaLeaf, FaBars, FaTimes, FaPhone } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// const navLinks = [
//   { label: 'Home', href: '/' },
//   { label: 'About', href: '/about' },
//   { label: 'Services', href: '/services' },
//   { label: 'Treatment', href: '/treatment-methods' },
//   { label: 'Doctors', href: '/doctors' },
//   { label: 'Testimonials', href: '/testimonials' },
//   { label: 'Blog', href: '/blog' },
//   { label: 'Contact', href: '/contact' },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState('Home');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLinkClick = (label) => {
//     setActiveLink(label);
//     setMenuOpen(false);
//   };

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1000,
//           background: scrolled
//             ? 'rgba(255,255,255,0.98)'
//             : 'rgba(248,250,252,0.7)',
//           backdropFilter: 'blur(20px)',
//           borderBottom: scrolled ? '1px solid var(--gray-2)' : 'none',
//           transition: 'all 0.4s ease',
//           padding: '0 20px',
//         }}
//       >
//         <div
//           style={{
//             maxWidth: '1200px',
//             margin: '0 auto',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             height: '72px',
//           }}
//         >
//           {/* Logo */}
//           <motion.a
//             href="/"
//             whileHover={{ scale: 1.02 }}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               textDecoration: 'none',
//             }}
//           >
//             <div
//               style={{
//                 width: '42px',
//                 height: '42px',
//                 borderRadius: '12px',
//                 background: 'var(--gradient-primary)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 boxShadow: 'var(--shadow-primary)',
//               }}
//             >
//               <FaLeaf style={{ color: 'white', fontSize: '18px' }} />
//             </div>
//             <div>
//               <div
//                 style={{
//                   fontFamily: 'Playfair Display, serif',
//                   fontSize: '18px',
//                   fontWeight: '700',
//                   color: 'var(--dark-2)',
//                   lineHeight: '1.1',
//                   transition: 'color 0.4s ease',
//                 }}
//               >
//                 Cancer
//               </div>
//               <div
//                 style={{
//                   fontFamily: 'Playfair Display, serif',
//                   fontSize: '18px',
//                   fontWeight: '700',
//                   background: 'var(--gradient-primary)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   lineHeight: '1.1',
//                 }}
//               >
//                 Herbalist
//               </div>
//             </div>
//           </motion.a>

//           {/* Desktop Nav Links */}
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px',
//             }}
//             className="desktop-nav"
//           >
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 to={link.href}
//                 onClick={() => handleLinkClick(link.label)}
//                 style={{
//                   padding: '8px 14px',
//                   borderRadius: '8px',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   color: activeLink === link.label
//                     ? 'var(--primary)'
//                     : 'var(--dark-2)',
//                   textDecoration: 'none',
//                   background: activeLink === link.label
//                     ? 'var(--secondary-light)'
//                     : 'transparent',
//                   transition: 'all 0.3s ease',
//                 }}
//                 onMouseEnter={(e) => {
//                   if (activeLink !== link.label) {
//                     e.target.style.color = 'var(--primary)';
//                     e.target.style.background = 'var(--secondary-light)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (activeLink !== link.label) {
//                     e.target.style.color = 'var(--dark-2)';
//                     e.target.style.background = 'transparent';
//                   }
//                 }}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* CTA Button */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <a
//               href="tel:+918884588835"
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '6px',
//                 color: 'var(--dark-2)',
//                 textDecoration: 'none',
//                 fontSize: '13px',
//                 fontWeight: '500',
//                 transition: 'color 0.4s ease',
//               }}
//               className="phone-link"
//             >
//               <FaPhone style={{ fontSize: '12px', color: 'var(--primary)' }} />
//               +91 88845 88835
//             </a>
//             <motion.a
//               href="/appointment"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="btn-primary header-cta"
//               style={{ padding: '10px 20px', fontSize: '13px' }}
//             >
//               Book Consultation
//             </motion.a>
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: 'var(--dark-2)',
//                 fontSize: '20px',
//                 display: 'none',
//               }}
//               className="menu-btn"
//             >
//               {menuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             style={{
//               position: 'fixed',
//               top: '72px',
//               left: 0,
//               right: 0,
//               zIndex: 999,
//               background: 'white',
//               boxShadow: 'var(--shadow-lg)',
//               padding: '20px',
//               borderBottom: '3px solid var(--primary)',
//               maxHeight: 'calc(100vh - 72px)',
//               overflowY: 'auto',
//             }}
//           >
//             {navLinks.map((link, i) => (
//               <motion.a
//                 key={link.label}
//                 href={link.href}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 onClick={() => {
//                   setActiveLink(link.label);
//                   setMenuOpen(false);
//                 }}
//                 style={{
//                   display: 'block',
//                   padding: '12px 16px',
//                   borderRadius: '10px',
//                   color: 'var(--dark-2)',
//                   textDecoration: 'none',
//                   fontSize: '15px',
//                   fontWeight: '500',
//                   marginBottom: '4px',
//                   background: activeLink === link.label
//                     ? 'var(--secondary-light)'
//                     : 'transparent',
//                 }}
//               >
//                 {link.label}
//               </motion.a>
//             ))}
//             <motion.a
//               href="/appointment"
//               className="btn-primary"
//               style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
//               onClick={() => setMenuOpen(false)}
//             >
//               Book Free Consultation
//             </motion.a>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         @media (max-width: 900px) {
//           .desktop-nav { display: none !important; }
//           .phone-link { display: none !important; }
//           .menu-btn { display: block !important; }
//           .header-cta { display: none !important; }
//         }
//       `}</style>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLeaf, FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Treatment', href: '/treatment-methods' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (label) => {
    setActiveLink(label);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled
            ? 'rgba(255,255,255,0.98)'
            : 'rgba(248,250,252,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid var(--gray-2)' : 'none',
          transition: 'all 0.4s ease',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <motion.div
  whileHover={{ scale: 1.02 }}
  onClick={() => navigate('/')}
  style={{
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  }}
>
  <img
    src="/logo2.png"
    alt="Cancer Herbalist"
    style={{
      height: '55px',
      width: 'auto',
      objectFit: 'contain',
    }}
  />
</motion.div>

          {/* Desktop Navigation */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleLinkClick(link.label)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  color:
                    activeLink === link.label
                      ? 'var(--primary)'
                      : 'var(--dark-2)',
                  background:
                    activeLink === link.label
                      ? 'var(--secondary-light)'
                      : 'transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <a
              href="tel:+918884588835"
              className="phone-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--dark-2)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              <FaPhone
                style={{
                  fontSize: '12px',
                  color: 'var(--primary)',
                }}
              />
              +91 88845 88835
            </a>

            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary header-cta"
              style={{
                padding: '10px 20px',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Book Consultation
            </motion.button>

            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--dark-2)',
                fontSize: '20px',
                display: 'none',
              }}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'white',
              boxShadow: 'var(--shadow-lg)',
              padding: '20px',
              borderBottom: '3px solid var(--primary)',
              maxHeight: 'calc(100vh - 72px)',
              overflowY: 'auto',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  navigate(link.href);
                  setActiveLink(link.label);
                  setMenuOpen(false);
                }}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  color: 'var(--dark-2)',
                  fontSize: '15px',
                  fontWeight: '500',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  background:
                    activeLink === link.label
                      ? 'var(--secondary-light)'
                      : 'transparent',
                }}
              >
                {link.label}
              </motion.div>
            ))}

            <motion.button
              onClick={() => {
                navigate('/contact');
                setMenuOpen(false);
              }}
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: '12px',
                border: 'none',
                cursor: 'pointer',
                justifyContent: 'center',
              }}
            >
              Book Free Consultation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }

          .phone-link {
            display: none !important;
          }

          .menu-btn {
            display: block !important;
          }

          .header-cta {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}