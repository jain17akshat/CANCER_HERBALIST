import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaChevronDown, FaLeaf, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Care Programs', href: '/care-programs' },
  { label: 'Our Team', href: '/doctors' },
  { label: 'Stories', href: '/testimonials' },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: '📝 Blog', href: '/blog' },
      { label: '🧬 Patient Education', href: '/patient-education' },
      { label: '🛒 Herbal Store', href: '/store' },
      { label: '📦 Track Order', href: '/track-order' },
      { label: '📋 My Orders', href: '/my-orders' },
      { label: '💬 FAQs & Help', href: '/faqs' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { content } = useContent();
  const contactInfo = content?.contact || {
    phone: '+91 88845 88835',
    email: 'cancerherbalist@gmail.com',
    whatsapp: '918884588835',
    timings: 'Mon–Sat, 9 AM–6 PM',
    address: 'Bangalore, India'
  };

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // desktop
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null); // mobile

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { cartCount, setIsCartOpen } = useCart();

  // We'd use useWishlist here, but to avoid an error if context isn't available everywhere we can just show the icon.
  // We will import it at the top.

  const isActive = (href) => {
    if (href === '#') return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const isGroupActive = (link) => {
    if (!link.children) return isActive(link.href);
    return link.children.some((c) => isActive(c.href));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpenDropdown(null);
  }, [location.pathname]);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('ch_admin_authed') === 'true');
  }, [location.pathname]);

  const visibleLinks = isAdmin
    ? [...navLinks, { label: 'Admin 🛡️', href: '/admin' }]
    : navLinks;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ─── NAVBAR ─────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? `1px solid ${ACCENT}33` : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
          }}
        >
          {/* ── Logo ── */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <img
              src="/logo2.png"
              alt="Cancer Herbalist"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="ch-desktop-nav" ref={dropdownRef}>
            {visibleLinks.map((link) => (
              <div key={link.label} className="ch-nav-item">
                {link.children ? (
                  <>
                    <button
                      className={`ch-nav-btn${isGroupActive(link) ? ' ch-active' : ''}`}
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                    >
                      {link.label}
                      <FaChevronDown
                        className="ch-chevron"
                        style={{
                          transform: openDropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="ch-dropdown"
                        >
                          {link.children.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className={`ch-dropdown-item${isActive(sub.href) ? ' ch-active' : ''}`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {sub.label}
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

          {/* ── Right side ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* <a
              href="tel:+918884588835"
              className="ch-phone-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                color: PRIMARY,
              }}
            >
              <FaPhone style={{ fontSize: '11px' }} />
              +91 8884588835
            </a> */}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              style={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc',
                color: PRIMARY, transition: 'background 0.2s', position: 'relative'
              }}
              className="ch-cart-icon"
              title="Your Cart"
            >
              <FaShoppingBag style={{ fontSize: '18px' }} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  background: '#ef4444', color: '#fff', fontSize: '10px',
                  fontWeight: 700, borderRadius: '50%', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff'
                }}>
                  {cartCount}
                </span>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/wishlist')}
              style={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9',
                color: '#ef4444', transition: 'background 0.2s'
              }}
              className="ch-wishlist-icon"
              title="My Wishlist"
            >
              <FaHeart style={{ fontSize: '18px' }} />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/contact')}
              className="ch-cta-btn"
            >
              Book Consultation
            </motion.button>

            {/* Hamburger */}
            <button
              className="ch-hamburger"
              onClick={() => {
                setMenuOpen((p) => !p);
                setOpenDropdown(null);
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── MOBILE MENU ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
            className="ch-mobile-menu"
          >
            <div style={{ padding: '12px 20px 20px' }}>
              {visibleLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.children ? (
                    <div>
                      {/* Accordion trigger */}
                      <button
                        className={`ch-mobile-link ch-mobile-accordion${isGroupActive(link) ? ' ch-active' : ''}`}
                        onClick={() =>
                          setMobileOpenDropdown(
                            mobileOpenDropdown === link.label ? null : link.label
                          )
                        }
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          style={{
                            fontSize: '11px',
                            transition: 'transform 0.25s',
                            transform:
                              mobileOpenDropdown === link.label
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                          }}
                        />
                      </button>

                      {/* Sub-items */}
                      <AnimatePresence>
                        {mobileOpenDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            style={{ overflow: 'hidden', paddingLeft: '12px' }}
                          >
                            {link.children.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.href}
                                className={`ch-mobile-sub${isActive(sub.href) ? ' ch-active' : ''}`}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setMobileOpenDropdown(null);
                                }}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className={`ch-mobile-link${isActive(link.href) ? ' ch-active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <Link
                to="/wishlist"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ef4444',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  marginTop: '10px',
                  padding: '10px 14px',
                  background: '#fef2f2',
                  borderRadius: '10px'
                }}
                onClick={() => setMenuOpen(false)}
              >
                <FaHeart style={{ fontSize: '14px' }} />
                My Wishlist
              </Link>

              <button
                onClick={() => { setMenuOpen(false); setIsCartOpen(true); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: PRIMARY,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  marginTop: '6px',
                  padding: '10px 14px',
                  background: '#f1f5f9',
                  borderRadius: '10px',
                  border: 'none',
                  width: '100%',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  justifyContent: 'flex-start'
                }}
              >
                <FaShoppingBag style={{ fontSize: '14px' }} />
                My Cart {cartCount > 0 && <span style={{ background: '#ef4444', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '50px' }}>{cartCount}</span>}
              </button>

              <motion.a
                href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: PRIMARY,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  marginTop: '10px',
                  padding: '10px 14px',
                }}
              >
                <FaPhone style={{ fontSize: '12px' }} />
                {contactInfo.phone}
              </motion.a>

              <button
                onClick={() => {
                  navigate('/contact');
                  setMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  marginTop: '12px',
                  padding: '14px',
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  letterSpacing: '0.3px',
                }}
              >
                Book Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── STYLES ─────────────────────────────────────────────────── */}
      <style>{`
        /* ── Desktop nav ── */
        .ch-desktop-nav {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .ch-nav-item {
          position: relative;
        }
        .ch-nav-link,
        .ch-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 13px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          color: #374151;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
          font-family: inherit;
        }
        .ch-nav-link:hover,
        .ch-nav-btn:hover {
          color: ${PRIMARY};
          background: ${ACCENT}18;
        }
        .ch-nav-link.ch-active,
        .ch-nav-btn.ch-active {
          color: ${PRIMARY};
          background: ${ACCENT}22;
          font-weight: 600;
        }
        .ch-chevron {
          font-size: 10px;
          transition: transform 0.25s ease;
        }

        /* ── Dropdown ── */
        .ch-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1px solid ${ACCENT}44;
          border-radius: 12px;
          min-width: 190px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          padding: 6px;
          z-index: 20;
        }
        .ch-dropdown-item {
          display: block;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          color: #374151;
          transition: background 0.2s, color 0.2s;
        }
        .ch-dropdown-item:hover {
          background: ${ACCENT}18;
          color: ${PRIMARY};
        }
        .ch-dropdown-item.ch-active {
          background: ${ACCENT}22;
          color: ${PRIMARY};
          font-weight: 600;
        }

        /* ── CTA Button ── */
        .ch-cta-btn {
          padding: 9px 18px;
          background: linear-gradient(135deg, ${PRIMARY}, ${ACCENT});
          color: #fff;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
          white-space: nowrap;
          font-family: inherit;
          box-shadow: 0 4px 14px ${ACCENT}44;
        }
        .ch-cta-btn:hover {
          box-shadow: 0 6px 20px ${ACCENT}66;
        }

        /* ── Phone link ── */
        .ch-phone-link {
          white-space: nowrap;
        }

        /* ── Hamburger ── */
        .ch-hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #374151;
          padding: 4px;
        }

        /* ── Mobile menu ── */
        .ch-mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          z-index: 999;
          background: #fff;
          border-bottom: 2px solid ${ACCENT}44;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .ch-mobile-link {
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
          transition: background 0.2s, color 0.2s;
          margin-bottom: 2px;
        }
        .ch-mobile-link:hover,
        .ch-mobile-accordion:hover {
          background: ${ACCENT}14;
          color: ${PRIMARY};
        }
        .ch-mobile-link.ch-active {
          background: ${ACCENT}20;
          color: ${PRIMARY};
          font-weight: 600;
        }
        .ch-mobile-accordion {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ch-mobile-sub {
          display: block;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #4b5563;
          text-decoration: none;
          background: transparent;
          transition: background 0.2s, color 0.2s;
          margin-bottom: 2px;
        }
        .ch-mobile-sub:hover {
          background: ${ACCENT}14;
          color: ${PRIMARY};
        }
        .ch-mobile-sub.ch-active {
          background: ${ACCENT}20;
          color: ${PRIMARY};
          font-weight: 600;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 960px) {
          .ch-desktop-nav {
            display: none !important;
          }
          .ch-phone-link {
            display: none !important;
          }
          .ch-cta-btn {
            display: none !important;
          }
          .ch-hamburger {
            display: block !important;
          }
        }

        @media (min-width: 961px) {
          .ch-mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}