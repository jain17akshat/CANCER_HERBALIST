import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLeaf, FaPlay, FaArrowRight, FaCheckCircle,
  FaClock, FaFlask, FaShieldAlt, FaHandHoldingHeart,
  FaChevronLeft, FaChevronRight, FaUserMd, FaStar
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

/* ─── Slide Data ─────────────────────────────────────── */
const slides = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #f0fbfd 0%, #e0f7fa 60%, #f8fafc 100%)',
    accentColor: ACCENT,
    badge: '🌿 Natural Cancer Treatment Specialists',
    headline: ['Fight Cancer', 'Holistically'],
    headlineAccent: 'Holistically',
    subline: 'Combining ancient herbal wisdom with modern medical knowledge for personalized cancer support.',
    highlights: [
      'Natural Herbal Treatments',
      'Certified Practitioners',
      'Personalized Care Plans',
      'Regular Support (9AM–6PM)',
    ],
    stat: { value: '4000+', label: 'Patients Supported' },
    cta: { label: 'Book Free Consultation', href: '/contact' },
    secondaryCta: { label: 'Watch Story', href: '/testimonials' },
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 60%, #f0fdf4 100%)',
    accentColor: PRIMARY,
    badge: '⏰ Unmatched Patient Dedication',
    headline: ['1–2 Hours With', 'Every Patient'],
    headlineAccent: 'Every Patient',
    subline: 'While the industry average is just 15 minutes, Prof. Ramesh Babu personally reviews your reports, scans, and history in a deep one-on-one session.',
    highlights: [
      'Full Report Review',
      'Scan & Biopsy Analysis',
      'Personalized Strategy',
      'Zero Rushed Consultations',
    ],
    stat: { value: '15 min', label: 'vs Our 1–2 Hour Sessions' },
    statDanger: true,
    cta: { label: 'Book Your Session', href: '/contact' },
    secondaryCta: { label: 'Read Success Stories', href: '/testimonials' },
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 60%, #f5f3ff 100%)',
    accentColor: '#7c3aed',
    badge: '🧪 Integrative, Not Alternative',
    headline: ['Works Alongside', 'Chemotherapy'],
    headlineAccent: 'Chemotherapy',
    subline: 'Our herbal protocols are screened for drug-herb interactions and complement your conventional treatment — reducing side effects and supporting recovery.',
    highlights: [
      'No Drug Conflicts',
      'Reduces Chemo Side Effects',
      'Supports Immunity',
      'Improves Quality of Life',
    ],
    stat: { value: '87%', label: 'Patients Report Improved Energy' },
    cta: { label: 'Start Integrative Care', href: '/contact' },
    secondaryCta: { label: 'Explore Our Products', href: '/store' },
  },
  {
    id: 4,
    bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 60%, #fff5f5 100%)',
    accentColor: '#e11d48',
    badge: '❤️ No Patient Left Alone',
    headline: ['Weekly Follow-Ups,', 'Every Time'],
    headlineAccent: 'Every Time',
    subline: 'Your protocol evolves with you. Our team refines your diet plans, herbal formulas, and lifestyle guidance every week based on how your body responds.',
    highlights: [
      'Custom Diet Charts',
      'WhatsApp Support Line',
      'Formula Adjustments',
      'Monthly Report Reviews',
    ],
    stat: { value: '95%', label: 'Patient Retention Rate' },
    cta: { label: 'Join Our Program', href: '/contact' },
    secondaryCta: { label: 'Meet Our Team', href: '/doctors' },
  },
  {
    id: 5,
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 60%, #fffdf0 100%)',
    accentColor: '#d97706',
    badge: '🛡️ Certified, Safe & Trusted',
    headline: ['FSSAI Certified', 'Formulations'],
    headlineAccent: 'Formulations',
    subline: 'Every herbal product is lab-tested, made by standardized extracts, and FSSAI certified. We\'re not making claims — we\'re backed by science, certification, and 35+ years of research & practice.',
    highlights: [
      'Lab-Tested Purity',
      'Standardized Extracts',
      'FSSAI Licence Verified',
      '35+ Years of Research',
    ],
    stat: { value: '35+', label: 'Years of Research & Practice' },
    cta: { label: 'Shop Certified Products', href: '/store' },
    secondaryCta: { label: 'Learn About Us', href: '/about' },
  },
];

/* ─── Slide transition variants ──────────────────────── */
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  // Auto-advance every 4s — always on
  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: '80px', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Animated background ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'absolute', inset: 0, background: slide.bg, zIndex: 0 }}
        />
      </AnimatePresence>

      {/* Floating leaves (decorative) */}
      {!isMobile && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [-20, 20, -20], rotate: [0, 180, 360], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
              style={{ position: 'absolute', left: `${(i * 17) % 100}%`, top: `${(i * 13) % 100}%`, color: slide.accentColor, fontSize: `${10 + i * 3}px` }}
            >
              <FaLeaf />
            </motion.div>
          ))}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${slide.accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${slide.accentColor}08 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>
      )}

      {/* ── Slide Content ── */}
      <div className="container" style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '40px', paddingBottom: '100px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-slide-content"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(30px, 5vw, 80px)', alignItems: 'center' }}
          >
            {/* LEFT — Text */}
            <div>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${slide.accentColor}20`, border: `1px solid ${slide.accentColor}40`, color: slide.accentColor, padding: '8px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', marginBottom: '28px' }}>
                {slide.badge}
              </div>

              {/* Headline */}
              <h1 style={{ fontSize: 'clamp(34px, 5.5vw, 68px)', fontWeight: '900', color: '#0f172a', lineHeight: '1.12', marginBottom: '20px' }}>
                {slide.headline.map((line, li) => (
                  <span key={li} style={{ display: 'block', color: line === slide.headlineAccent ? slide.accentColor : '#0f172a' }}>
                    {line}
                  </span>
                ))}
              </h1>

              {/* Subline */}
              <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: '#475569', lineHeight: '1.8', marginBottom: '28px', maxWidth: '500px' }}>
                {slide.subline}
              </p>

              {/* Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '36px' }}>
                {slide.highlights.map((h) => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500', color: '#334155' }}>
                    <FaCheckCircle style={{ color: slide.accentColor, fontSize: '13px', flexShrink: 0 }} /> {h}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="hero-btns" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href={slide.cta.href}
                  style={{ fontSize: '15px', padding: '14px 30px', background: slide.accentColor, color: 'white', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: '700', boxShadow: `0 8px 24px ${slide.accentColor}44`, transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {slide.cta.label} <FaArrowRight />
                </a>
                <a href={slide.secondaryCta.href}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#1e293b', textDecoration: 'none', fontSize: '14px', fontWeight: '600', padding: '14px 22px', border: `2px solid ${slide.accentColor}50`, borderRadius: '50px', background: 'rgba(255,255,255,0.8)', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${slide.accentColor}18`; e.currentTarget.style.borderColor = slide.accentColor; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = `${slide.accentColor}50`; }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: slide.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaPlay style={{ color: 'white', fontSize: '11px' }} />
                  </div>
                  {slide.secondaryCta.label}
                </a>
              </div>
            </div>

            {/* RIGHT — Visual stat card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Main stat card */}
              <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRadius: '28px', padding: '40px', border: `1px solid ${slide.accentColor}25`, boxShadow: `0 20px 60px ${slide.accentColor}15`, position: 'relative', overflow: 'hidden' }}>
                {/* bg circle */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: slide.accentColor, opacity: 0.07, filter: 'blur(30px)' }} />

                {/* Slide number */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '11px', fontWeight: '700', color: `${slide.accentColor}80`, letterSpacing: '1px' }}>
                  {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>

                {/* Big stat */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: '900', color: slide.statDanger ? '#ef4444' : slide.accentColor, lineHeight: 1, fontFamily: 'Poppins, sans-serif' }}>
                    {slide.stat.value}
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '6px' }}>
                    {slide.stat.label}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: `${slide.accentColor}20`, marginBottom: '24px' }} />

                {/* Highlights grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {slide.highlights.map((h) => (
                    <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: `${slide.accentColor}15`, border: `1px solid ${slide.accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <FaCheckCircle style={{ color: slide.accentColor, fontSize: '10px' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#475569', fontWeight: '500', lineHeight: '1.4' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust strip */}
              <div style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', borderRadius: '16px', padding: '14px 20px', border: `1px solid ${slide.accentColor}20`, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  { icon: <FaStar />, v: '4.9★', s: 'Rating' },
                  { icon: <FaUserMd />, v: '22 Yrs', s: 'Experience' },
                  { icon: <FaShieldAlt />, v: 'FSSAI', s: 'Certified' },
                ].map((t) => (
                  <div key={t.v} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: slide.accentColor, fontSize: '14px' }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{t.v}</div>
                      <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '500' }}>{t.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation Controls ── */}
      {/* Prev / Next arrows */}
      {!isMobile && (
        <>
          <button onClick={prev}
            style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: `1px solid ${slide.accentColor}30`, color: slide.accentColor, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', transition: 'all 0.2s', backdropFilter: 'blur(10px)' }}
            onMouseEnter={e => { e.currentTarget.style.background = slide.accentColor; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = slide.accentColor; }}
          >
            <FaChevronLeft />
          </button>
          <button onClick={next}
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: `1px solid ${slide.accentColor}30`, color: slide.accentColor, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', transition: 'all 0.2s', backdropFilter: 'blur(10px)' }}
            onMouseEnter={e => { e.currentTarget.style.background = slide.accentColor; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = slide.accentColor; }}
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {/* Dot indicators + progress bar */}
      <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {slides.map((s, i) => (
            <button key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              style={{ width: current === i ? '32px' : '8px', height: '8px', borderRadius: '4px', background: current === i ? slide.accentColor : `${slide.accentColor}40`, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.35s ease', boxShadow: current === i ? `0 2px 8px ${slide.accentColor}66` : 'none' }}
            />
          ))}
        </div>
        {/* Auto-play progress bar */}
        <div style={{ width: '120px', height: '2px', background: `${slide.accentColor}25`, borderRadius: '1px', overflow: 'hidden' }}>
          <motion.div
            key={current}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
            style={{ height: '100%', background: slide.accentColor, borderRadius: '1px' }}
          />
        </div>
      </div>

      {/* Mobile swipe hint */}
      {isMobile && (
        <div style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '6px', alignItems: 'center' }}>
          <FaChevronLeft style={{ fontSize: '10px', color: `${slide.accentColor}80` }} />
          <span style={{ fontSize: '10px', color: `${slide.accentColor}80`, fontWeight: '600', letterSpacing: '1px' }}>SWIPE</span>
          <FaChevronRight style={{ fontSize: '10px', color: `${slide.accentColor}80` }} />
        </div>
      )}

      <style>{`
        .hero-slide-content {
          width: 100%;
        }
        @media (max-width: 900px) {
          .hero-slide-content {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          #home { padding-top: 72px !important; }
        }
      `}</style>
    </section>
  );
}