import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaChevronDown, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';

const PRIMARY = '#1a6e52';
const ACCENT  = '#38bed5';
const DARK    = '#0f172a';

/* ─── Navigation Structure ─────────────────────────────────────── */
const navLinks = [
  { label: 'Home',              href: '/' },
  { label: 'About',             href: '/about' },
  { label: 'Cancer Overview',   href: '/cancer-overview' },
  {
    label: 'Treatments',
    href: '/integrative-therapies',
    children: [
      { label: 'Integrative Therapies',    href: '/integrative-therapies',        desc: 'Gene-targeted & holistic care' },
      { label: 'Personalized Care',        href: '/personalized-treatment-plans', desc: 'Plans tailored just for you' },
    ],
  },
  { label: 'Stories',           href: '/testimonials' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Products Hub',  href: '/products',      desc: 'Explore all herbal products' },
      { label: 'Herbal Store',  href: '/store',         desc: 'Shop natural remedies' },
      { label: 'Track Order',   href: '/track-order',   desc: 'Check your order status' },
      { label: 'My Orders',     href: '/my-orders',     desc: 'View order history' },
    ],
  },
  {
    label: 'Education',
    href: '/education-resources',
    children: [
      { label: 'All Resources',       href: '/education-resources',                                  desc: 'Full library' },
      { label: 'Cancer Awareness',    href: '/education-resources?category=cancer-awareness',        desc: 'Know the facts' },
      { label: 'Cancer Prevention',   href: '/education-resources?category=cancer-prevention',       desc: 'Reduce your risk' },
      { label: 'Nutrition Guide',     href: '/education-resources?category=nutrition-guide',         desc: 'Eat to heal' },
      { label: 'Herbal Medicine',     href: '/education-resources?category=herbal-medicine',         desc: 'Nature\'s pharmacy' },
      { label: 'Mental Wellness',     href: '/education-resources?category=mental-wellness',         desc: 'Mind-body balance' },
      { label: 'Exercise & Recovery', href: '/education-resources?category=exercise-recovery',       desc: 'Move to recover' },
      { label: 'Research Updates',    href: '/education-resources?category=research-updates',        desc: 'Latest science' },
      { label: 'Healthy Recipes',     href: '/education-resources?category=healthy-recipes',         desc: 'Nourishing meals' },
    ],
  },
  { label: 'Patient Onboarding', href: '/patient-onboarding' },
  { label: 'Contact',            href: '/contact' },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function Navbar() {
  const { content } = useContent();
  const contactInfo = content?.contact || {
    phone: '+91 88845 88835',
    email: 'cancerherbalist@gmail.com',
  };

  const [scrolled,            setScrolled]            = useState(false);
  const [menuOpen,            setMenuOpen]            = useState(false);
  const [openDropdown,        setOpenDropdown]        = useState(null);
  const [mobileOpenDropdown,  setMobileOpenDropdown]  = useState(null);
  const [isAdmin,             setIsAdmin]             = useState(false);

  const navigate      = useNavigate();
  const location      = useLocation();
  const dropdownRef   = useRef(null);

  const isActive = (href) => {
    if (href === '#') return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.split('?')[0]);
  };

  const isGroupActive = (link) =>
    link.children ? link.children.some((c) => isActive(c.href)) : isActive(link.href);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('ch_admin_authed') === 'true');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleLinks = isAdmin
    ? [...navLinks, { label: 'Admin', href: '/admin' }]
    : navLinks;

  /* ─── Mega-menu column count ─── */
  const megaCols = (count) => (count > 5 ? 3 : count > 3 ? 2 : 1);

  return (
    <>

      {/* ══════════ MAIN NAV ══════════ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`ch-navbar${scrolled ? ' ch-scrolled' : ''}`}
      >
        <div className="ch-nav-inner">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate('/')}
            className="ch-logo"
          >
            <img src="/logo2.png" alt="Cancer Herbalist" />
          </motion.div>

          {/* Desktop links */}
          <nav className="ch-desktop-nav" ref={dropdownRef}>
            {visibleLinks.map((link) => (
              <div
                key={link.label}
                className="ch-nav-item"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => link.children && setOpenDropdown(null)}
              >
                {link.children ? (
                  <>
                    <button
                      className={`ch-nav-btn${isGroupActive(link) ? ' ch-active' : ''}`}
                      onClick={() => navigate(link.href)}
                    >
                      {link.label}
                      <FaChevronDown
                        className="ch-chevron"
                        style={{ transform: openDropdown === link.label ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0,  scale: 1    }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.16 }}
                          className="ch-dropdown"
                          style={{
                            gridTemplateColumns: `repeat(${megaCols(link.children.length)}, 1fr)`,
                          }}
                        >
                          {link.children.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className={`ch-dropdown-item${isActive(sub.href) ? ' ch-active' : ''}`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="ch-drop-label">{sub.label}</span>
                              {sub.desc && <span className="ch-drop-desc">{sub.desc}</span>}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`ch-nav-link${isActive(link.href) ? ' ch-active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="ch-nav-actions">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/contact')}
              className="ch-cta-btn"
            >
              Book Consultation
            </motion.button>
            <button
              className="ch-hamburger"
              onClick={() => { setMenuOpen((p) => !p); setOpenDropdown(null); }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ══════════ MOBILE MENU ══════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="ch-mobile-menu"
          >
            <div className="ch-mobile-inner">
              {visibleLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                >
                  {link.children ? (
                    <div>
                      <button
                        className={`ch-mob-row ch-mob-accordion${isGroupActive(link) ? ' ch-active' : ''}`}
                        onClick={() =>
                          setMobileOpenDropdown(mobileOpenDropdown === link.label ? null : link.label)
                        }
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          style={{
                            fontSize: '11px',
                            transition: 'transform 0.25s',
                            transform: mobileOpenDropdown === link.label ? 'rotate(180deg)' : 'rotate(0)',
                          }}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileOpenDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden' }}
                          >
                            {link.children.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.href}
                                className={`ch-mob-sub${isActive(sub.href) ? ' ch-active' : ''}`}
                                onClick={() => { setMenuOpen(false); setMobileOpenDropdown(null); }}
                              >
                                <span className="ch-mob-sub-label">{sub.label}</span>
                                {sub.desc && <span className="ch-mob-sub-desc">{sub.desc}</span>}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className={`ch-mob-row${isActive(link.href) ? ' ch-active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <div className="ch-mob-footer">
                <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="ch-mob-phone">
                  <FaPhone style={{ fontSize: '12px' }} />
                  {contactInfo.phone}
                </a>
                <button
                  onClick={() => { navigate('/contact'); setMenuOpen(false); }}
                  className="ch-mob-cta"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ STYLES ══════════ */}
      <style>{`
        /* ── Topbar ── */
        .ch-topbar {
          background: ${DARK};
          color: rgba(255,255,255,0.75);
          font-size: 12.5px;
          height: 36px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1001;
        }
        .ch-topbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ch-topbar-contact { display: flex; align-items: center; gap: 16px; }
        .ch-topbar-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          font-size: 12.5px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .ch-topbar-link:hover { color: ${ACCENT}; }
        .ch-topbar-divider {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .ch-topbar-right { display: flex; align-items: center; gap: 16px; }
        .ch-topbar-tag { white-space: nowrap; font-size: 12px; color: rgba(255,255,255,0.55); }

        /* ── Main Navbar ── */
        .ch-navbar {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }
        .ch-navbar.ch-scrolled {
          background: rgba(255,255,255,0.99);
          box-shadow: 0 2px 24px rgba(0,0,0,0.09);
        }
        .ch-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ── Logo ── */
        .ch-logo {
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .ch-logo img {
          height: 46px;
          width: auto;
          object-fit: contain;
        }

        /* ── Desktop nav container ── */
        .ch-desktop-nav {
          display: flex;
          align-items: center;
          gap: 0px;
          flex: 1;
          justify-content: center;
        }
        .ch-nav-item { position: relative; }

        /* ── Links & buttons ── */
        .ch-nav-link,
        .ch-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 8px 13px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          color: #374151;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
          font-family: inherit;
          line-height: 1;
        }
        .ch-nav-link:hover,
        .ch-nav-btn:hover {
          color: ${PRIMARY};
          background: ${PRIMARY}0d;
        }
        .ch-nav-link.ch-active,
        .ch-nav-btn.ch-active {
          color: ${PRIMARY};
          font-weight: 600;
          background: ${PRIMARY}12;
        }
        .ch-chevron {
          font-size: 9px;
          transition: transform 0.25s ease;
          opacity: 0.6;
        }

        /* ── Mega Dropdown ── */
        .ch-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
          padding: 10px;
          z-index: 200;
          display: grid;
          gap: 4px;
          min-width: 200px;
        }
        .ch-dropdown-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 11px 14px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.18s, transform 0.18s;
        }
        .ch-dropdown-item:hover {
          background: ${PRIMARY}0d;
          transform: translateX(2px);
        }
        .ch-dropdown-item.ch-active {
          background: ${PRIMARY}14;
        }
        .ch-drop-label {
          font-size: 13.5px;
          font-weight: 600;
          color: ${DARK};
          line-height: 1.2;
        }
        .ch-dropdown-item.ch-active .ch-drop-label { color: ${PRIMARY}; }
        .ch-drop-desc {
          font-size: 11.5px;
          color: #9ca3af;
          font-weight: 400;
          line-height: 1;
        }

        /* ── Nav actions ── */
        .ch-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* ── CTA Button ── */
        .ch-cta-btn {
          padding: 10px 22px;
          background: ${PRIMARY};
          color: #fff;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          font-family: inherit;
          letter-spacing: -0.01em;
        }
        .ch-cta-btn:hover {
          background: #155c43;
          box-shadow: 0 4px 16px ${PRIMARY}44;
        }

        /* ── Hamburger ── */
        .ch-hamburger {
          display: none;
          background: none;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          color: #374151;
          padding: 8px 10px;
          transition: background 0.2s;
        }
        .ch-hamburger:hover { background: rgba(0,0,0,0.05); }

        /* ── Mobile menu ── */
        .ch-mobile-menu {
          position: sticky;
          top: 68px;
          left: 0;
          right: 0;
          z-index: 999;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .ch-mobile-inner { padding: 12px 20px 20px; }
        .ch-mob-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.18s, color 0.18s;
          margin-bottom: 2px;
        }
        .ch-mob-row:hover,
        .ch-mob-accordion:hover { background: ${PRIMARY}0d; color: ${PRIMARY}; }
        .ch-mob-row.ch-active { background: ${PRIMARY}12; color: ${PRIMARY}; font-weight: 600; }
        .ch-mob-accordion {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ch-mob-sub {
          display: flex;
          flex-direction: column;
          gap: 1px;
          padding: 10px 14px 10px 28px;
          border-radius: 8px;
          text-decoration: none;
          background: transparent;
          transition: background 0.18s, color 0.18s;
          margin-bottom: 2px;
        }
        .ch-mob-sub:hover { background: ${PRIMARY}0a; }
        .ch-mob-sub.ch-active { background: ${PRIMARY}12; }
        .ch-mob-sub-label { font-size: 14px; font-weight: 500; color: #374151; }
        .ch-mob-sub.ch-active .ch-mob-sub-label { color: ${PRIMARY}; font-weight: 600; }
        .ch-mob-sub-desc { font-size: 11.5px; color: #9ca3af; }
        .ch-mob-footer {
          padding-top: 14px;
          margin-top: 10px;
          border-top: 1px solid rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ch-mob-phone {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${PRIMARY};
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 14px;
        }
        .ch-mob-cta {
          width: 100%;
          padding: 14px;
          background: ${PRIMARY};
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: -0.01em;
          transition: background 0.2s;
        }
        .ch-mob-cta:hover { background: #155c43; }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .ch-desktop-nav { display: none !important; }
          .ch-cta-btn     { display: none !important; }
          .ch-hamburger   { display: flex !important; align-items: center; }
          .ch-topbar-right { display: none !important; }
        }
        @media (max-width: 600px) {
          .ch-topbar { display: none !important; }
          .ch-topbar-contact { display: none !important; }
        }
        @media (min-width: 1101px) {
          .ch-mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}