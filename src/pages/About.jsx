import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLeaf, FaHeart, FaShieldAlt, FaRegLightbulb, FaUserMd,
  FaSeedling, FaFlask, FaHandHoldingHeart, FaGlobe,
  FaArrowRight, FaCheckCircle, FaQuoteLeft
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const DARK   = '#0a1628';

/* ─── data ──────────────────────────────────────────────── */

const values = [
  {
    icon: <FaHandHoldingHeart />,
    title: 'Compassionate Care',
    desc:  'Every patient is treated like family. We listen deeply, respond with empathy, and walk beside you through every step of your healing journey.',
    color: '#ef4444',
  },
  {
    icon: <FaFlask />,
    title: 'Evidence-Based Science',
    desc:  'Our herbal protocols are grounded in peer-reviewed research, clinical studies, and decades of integrative oncology practice — not guesswork.',
    color: '#8b5cf6',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Safety First, Always',
    desc:  'Every formula is screened for drug-herb interactions and contraindications. Transparency with your oncology team is non-negotiable.',
    color: ACCENT,
  },
  {
    icon: <FaRegLightbulb />,
    title: 'Continuous Innovation',
    desc:  'Our research team continuously reviews the latest phytotherapy literature so your protocol reflects the most current science available.',
    color: '#f59e0b',
  },
  {
    icon: <FaLeaf />,
    title: 'Holistic Wellness',
    desc:  'We treat the whole person — body, mind, and spirit — through herbal medicine, nutrition coaching, and emotional wellbeing support.',
    color: '#10b981',
  },
  {
    icon: <FaGlobe />,
    title: 'Accessible to All',
    desc:  'Whether you are in Bangalore or abroad, our teleconsultation platform brings world-class integrative oncology support to your home.',
    color: '#3b82f6',
  },
];

const milestones = [
  { year: '2012', icon: <FaSeedling />, title: 'Clinic Founded', desc: 'Opened our first integrative herbal oncology clinic in Bangalore with a vision to merge botanical medicine with modern cancer care.' },
  { year: '2014', icon: <FaShieldAlt />, title: 'Clinical Recognition', desc: 'Recognized by integrative medicine bodies for developing standardized, evidence-informed herbal support protocols for cancer patients.' },
  { year: '2016', icon: <FaFlask />,    title: 'Research Wing Opens', desc: 'Established a dedicated botanical research laboratory to study herbal formulations, bioavailability, and drug-herb interactions.' },
  { year: '2016', icon: <FaGlobe />,   title: 'Global Teleconsultation', desc: 'Launched our digital consultation platform, enabling patients across India and internationally to access our specialized care remotely.' },
  { year: '2020', icon: <FaUserMd />,  title: 'Integrative Team Grows', desc: 'Expanded our multidisciplinary team of herbalists, nutritionists, and integrative oncologists to serve a wider range of cancer types.' },
  { year: '2024', icon: <FaLeaf />,    title: 'Two Decades of Healing', desc: 'Celebrating 20 years of service — continuing to refine our protocols, train new practitioners, and deepen our commitment to patient wellbeing.' },
];

const approach = [
  { step: '01', title: 'Listen & Understand', desc: 'We begin by deeply understanding your diagnosis, medical history, current treatment, and personal goals — before prescribing anything.' },
  { step: '02', title: 'Personalise', desc: 'No two patients are the same. Every formula, dietary plan, and follow-up schedule is crafted specifically for you.' },
  { step: '03', title: 'Collaborate', desc: 'We work alongside your oncology team — sharing protocols, respecting boundaries, and ensuring complete safety.' },
  { step: '04', title: 'Support Continuously', desc: 'Healing is a journey. Monthly check-ins, WhatsApp support, and protocol adjustments ensure you are never alone.' },
];

/* ─── component ─────────────────────────────────────────── */

export default function About() {
  return (
    <div style={{ background: '#f8fafc' }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background image */}
        {/* <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1800&q=80"
          alt="Herbal medicine research"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        /> */}
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,22,40,0.93) 0%, rgba(10,22,40,0.65) 55%, rgba(56,190,213,0.18) 100%)' }} />

        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(120px, 18vw, 160px) clamp(16px, 4vw, 40px) clamp(60px, 10vw, 100px)', width: '100%', boxSizing: 'border-box' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}22`, border: `1px solid ${ACCENT}55`, color: ACCENT, padding: '8px 20px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '28px' }}>
              <FaLeaf /> About Cancer Herbalist
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', color: '#fff', lineHeight: 1.2, marginBottom: '28px', maxWidth: '760px' }}>
            Two Decades of <br />
            <span style={{ color: ACCENT }}>Healing Through Nature</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.80)', fontSize: '1.15rem', lineHeight: '1.9', maxWidth: '620px', marginBottom: '40px' }}>
            Since 2012 Cancer Herbalist has been a trusted partner for patients navigating cancer — combining the wisdom of botanical medicine with the rigour of modern integrative oncology to support healing at every level.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: ACCENT, color: '#fff', padding: '15px 32px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: `0 8px 28px ${ACCENT}55` }}>
              Book Free Consultation <FaArrowRight />
            </Link>
            <Link to="/treatment-methods"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '15px 32px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '15px', border: '1px solid rgba(255,255,255,0.25)' }}>
              Our Approach
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ STORY SECTION ══════════ */}
      <section style={{ background: '#fff', padding: 'clamp(50px, 8vw, 100px) 20px' }}>
        <div className="about-story-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
          {/* Image side */}
          <motion.div data-aos="fade-right" style={{ position: 'relative' }}>
            {/* Decorative accent frame behind the image */}
            <div style={{
              position: 'absolute', top: '-14px', left: '-14px',
              width: '100%', height: '100%',
              borderRadius: '28px',
              border: `3px solid ${ACCENT}44`,
              zIndex: 0,
              pointerEvents: 'none',
            }} />
            {/* Decorative accent dot pattern */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '80px', height: '80px',
              backgroundImage: `radial-gradient(${ACCENT}33 2px, transparent 2px)`,
              backgroundSize: '12px 12px',
              zIndex: 0,
              pointerEvents: 'none',
            }} />

            <img
              src="/images/doctor1.2.png"
              alt="Prof Ramesh Babu — Founder, Cancer Herbalist"
              style={{
                width: '100%',
                borderRadius: '28px',
                boxShadow: '0 24px 64px rgba(56,190,213,0.18)',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                objectFit: 'cover',
                maxHeight: '520px',
              }}
            />

            {/* Quote card overlay */}
            <div className="quote-card" style={{
              position: 'absolute', bottom: '-32px', right: '-20px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
              maxWidth: '290px',
              border: `1px solid ${ACCENT}22`,
              zIndex: 2,
            }}>
              <FaQuoteLeft style={{ color: ACCENT, fontSize: '24px', marginBottom: '12px' }} />
              <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.75', fontStyle: 'italic', margin: 0, fontFamily: 'Playfair Display, serif' }}>
                "Nature holds the answers. We hold the knowledge to translate them into healing."
              </p>
              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '2px', background: ACCENT, borderRadius: '2px'
                }} />
                <p style={{ color: ACCENT, fontWeight: 700, fontSize: '12.5px', margin: 0, letterSpacing: '0.3px' }}>
                  Prof Ramesh Babu, Founder
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div data-aos="fade-left">
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Story</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: DARK, marginTop: '12px', marginBottom: '24px', lineHeight: 1.25 }}>
              A Mission Born from <span style={{ color: ACCENT }}>Compassion</span>
            </h2>
            <p style={{ color: '#475569', lineHeight: '1.9', fontSize: '1rem', marginBottom: '18px' }}>
              Cancer Herbalist was founded in 2012 by a team of integrative medicine practitioners who witnessed firsthand how conventional oncology, while life-saving, often left patients struggling with side effects, fear, and a sense of helplessness.
            </p>
            <p style={{ color: '#475569', lineHeight: '1.9', fontSize: '1rem', marginBottom: '18px' }}>
              Our founders believed that herbal medicine — when practised with scientific rigour and deep respect for conventional treatment — could meaningfully improve quality of life, reduce treatment burden, and support the body's innate capacity to heal.
            </p>
            <p style={{ color: '#475569', lineHeight: '1.9', fontSize: '1rem', marginBottom: '32px' }}>
              Today, Cancer Herbalist operates from Bangalore, India, serving patients locally and internationally through our in-clinic and teleconsultation services. We remain committed to our founding principle: compassionate, evidence-based, integrative care for every patient who walks through our door.
            </p>

            {/* Key differentiators */}
            {[
              'Practitioner team trained in both herbal and integrative medicine',
              'All protocols reviewed for drug-herb interaction safety',
              'Teleconsultation available across India and internationally',
              'Personalised formulas — never one-size-fits-all',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <FaCheckCircle style={{ color: ACCENT, flexShrink: 0, marginTop: '3px', fontSize: '16px' }} />
                <span style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ MISSION + VISION ══════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f3460 50%, #0e6655 100%)', padding: 'clamp(50px, 8vw, 100px) 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: ACCENT, opacity: 0.05, filter: 'blur(80px)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '16px' }}>
              Mission & <span style={{ color: ACCENT }}>Vision</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '560px', margin: '0 auto', lineHeight: '1.8' }}>
              Two guiding stars that shape every decision we make.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '32px' }}>
            {/* Mission */}
            <motion.div data-aos="fade-up"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${ACCENT}33`, borderRadius: '28px', padding: '44px 40px', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: ACCENT, borderRadius: '4px 0 0 4px' }} />
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: ACCENT, marginBottom: '24px' }}>
                <FaHeart />
              </div>
              <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '18px' }}>Our Mission</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: '1.9', fontSize: '1rem' }}>
                To provide safe, personalised, evidence-based herbal support protocols that complement conventional cancer treatment — reducing side effects, improving quality of life, and empowering patients to take an active role in their own healing.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div data-aos="fade-up" data-aos-delay="100"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${ACCENT}33`, borderRadius: '28px', padding: '44px 40px', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#10b981', borderRadius: '4px 0 0 4px' }} />
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(16,185,129,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#10b981', marginBottom: '24px' }}>
                <FaGlobe />
              </div>
              <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '18px' }}>Our Vision</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: '1.9', fontSize: '1rem' }}>
                A world where every cancer patient — regardless of geography or background — has access to integrative care that honours the whole person: body, mind, and spirit. Where herbal medicine and modern oncology are not opposites, but partners in healing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ CORE VALUES ══════════ */}
      <section style={{ background: '#fff', padding: 'clamp(50px, 8vw, 100px) 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }} data-aos="fade-up">
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>What Drives Us</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: DARK, marginTop: '12px', marginBottom: '16px' }}>
              Our Core <span style={{ color: ACCENT }}>Values</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: '1.8' }}>
              These principles are not aspirational — they are the living standards by which every practitioner at Cancer Herbalist operates, every day.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '28px' }}>
            {values.map((v, i) => (
              <motion.div key={i} data-aos="fade-up" data-aos-delay={i * 70}
                whileHover={{ y: -8, boxShadow: `0 20px 50px rgba(0,0,0,0.1)` }}
                style={{ background: '#f8fafc', borderRadius: '24px', padding: '36px 32px', border: '1px solid #e2e8f0', transition: 'all 0.35s ease', cursor: 'default' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${v.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: v.color, marginBottom: '22px' }}>
                  {v.icon}
                </div>
                <h3 style={{ color: DARK, fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>{v.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.93rem', lineHeight: '1.8', margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TIMELINE ══════════ */}
      <section style={{ background: '#f0fdfe', padding: 'clamp(50px, 8vw, 100px) 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }} data-aos="fade-up">
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Journey</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: DARK, marginTop: '12px' }}>
              Two Decades of <span style={{ color: ACCENT }}>Milestones</span>
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}22)`, transform: 'translateX(-50%)' }} className="about-timeline-line" />

            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={i} data-aos={isLeft ? 'fade-right' : 'fade-left'} data-aos-delay={i * 80}
                  className="timeline-item"
                  style={{ display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start', marginBottom: '40px', position: 'relative', paddingRight: isLeft ? 'calc(50% + 40px)' : '0', paddingLeft: isLeft ? '0' : 'calc(50% + 40px)' }}>
                  {/* Dot */}
                  <div className="timeline-dot" style={{ position: 'absolute', left: '50%', top: '28px', transform: 'translateX(-50%)', width: '18px', height: '18px', borderRadius: '50%', background: ACCENT, border: '4px solid #f0fdfe', zIndex: 2, boxShadow: `0 0 0 4px ${ACCENT}33` }} />

                  <div className="timeline-content" style={{ background: '#fff', borderRadius: '20px', padding: '28px 32px', boxShadow: '0 8px 30px rgba(0,0,0,0.07)', border: `1px solid ${ACCENT}22`, maxWidth: '420px', width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <span style={{ background: ACCENT, color: '#fff', padding: '4px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: 800 }}>{m.year}</span>
                      <span style={{ color: ACCENT, fontSize: '18px' }}>{m.icon}</span>
                    </div>
                    <h4 style={{ color: DARK, fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>{m.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ OUR APPROACH ══════════ */}
      <section style={{ background: '#fff', padding: 'clamp(50px, 8vw, 100px) 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }} data-aos="fade-up">
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>How We Work</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: DARK, marginTop: '12px', marginBottom: '16px' }}>
              Our Care <span style={{ color: ACCENT }}>Approach</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: '1.8' }}>
              A four-principle framework that guides how we engage with every patient, every time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '28px' }}>
            {approach.map((a, i) => (
              <motion.div key={i} data-aos="fade-up" data-aos-delay={i * 80}
                style={{ background: 'linear-gradient(135deg, #f0fdfe, #fff)', borderRadius: '24px', padding: '36px 28px', border: `1px solid ${ACCENT}22`, textAlign: 'center' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: 900, color: ACCENT, opacity: 0.2, lineHeight: 1, marginBottom: '8px' }}>{a.step}</div>
                <h4 style={{ color: DARK, fontWeight: 700, fontSize: '1.05rem', marginBottom: '12px' }}>{a.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.8', margin: 0 }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FOUNDER SECTION ══════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2a45 60%, #0e3d30 100%)', padding: 'clamp(60px, 10vw, 120px) 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: ACCENT, opacity: 0.04, filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: '#10b981', opacity: 0.05, filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>The Person Behind the Practice</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginTop: '12px', lineHeight: 1.25 }}>
              Meet the <span style={{ color: ACCENT }}>Founder</span>
            </h2>
          </div>

          <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center' }}>
            {/* Left — image + credentials */}
            <motion.div data-aos="fade-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', background: `conic-gradient(${ACCENT}, #10b981, ${ACCENT})`, opacity: 0.3, filter: 'blur(14px)' }} />
                <img
                  src="/images/doctor1.2.png"
                  alt="Prof. Ramesh Babu — Founder, Cancer Herbalist"
                  style={{ width: '100%', borderRadius: '50%', display: 'block', position: 'relative', zIndex: 1, border: `4px solid ${ACCENT}44`, aspectRatio: '1 / 1', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
                {[
                  { icon: '🎓', text: 'University Trained Integrative Pharmacologist' },
                  { icon: '🏛️', text: 'Member — Karnataka State Pharmacy Council' },
                  { icon: '✅', text: 'Board-Registered Practitioner' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px' }}>
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12.5px', lineHeight: '1.5', fontWeight: 500 }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — copy */}
            <motion.div data-aos="fade-left">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#fff', marginBottom: '6px', lineHeight: 1.2 }}>
                Prof. Ramesh Babu
              </h3>
              <p style={{ color: ACCENT, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', marginBottom: '32px', textTransform: 'uppercase' }}>
                Founder &amp; Chief Herbalist
              </p>

              <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: '1.9', fontSize: '1rem', marginBottom: '20px' }}>
                He spends <strong style={{ color: '#fff' }}>one to two hours with every patient</strong> — compared to the industry average of 5 minutes. Not because he has to. Because he believes that no meaningful healing conversation can happen in a fraction of that time.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: '1.9', fontSize: '1rem', marginBottom: '20px' }}>
                Prof. Ramesh Babu uses conventional treatment every day. He is not against it. He has seen it save lives. But he also sees what it leaves behind — fatigue, fear, and a body that needs more than a prescription to recover.
              </p>

              {/* Pull quote */}
              <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: '24px', margin: '32px 0' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: '#fff', fontStyle: 'italic', lineHeight: '1.8', margin: 0 }}>
                  "Your immune system deserves a real conversation — not a footnote in a 15-minute appointment."
                </p>
                <p style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', marginTop: '12px', marginBottom: 0 }}>— Prof. Ramesh Babu</p>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: '1.9', fontSize: '1rem', marginBottom: '36px' }}>
                That conviction is why Cancer Herbalist was built the way it was — unhurried, deeply personal, and rooted in the belief that the body's own intelligence, properly supported, is one of the most powerful healing forces in medicine.
              </p>

              {/* <Link to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: ACCENT, color: '#fff', padding: '14px 32px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: `0 8px 28px ${ACCENT}44` }}>
                Book a Consultation <FaArrowRight />
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA STRIP ══════════ */}
      <section style={{ background: `linear-gradient(135deg, ${DARK} 0%, #0f3460 60%, #0e6655 100%)`, padding: '80px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: ACCENT, opacity: 0.06, filter: 'blur(60px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', marginBottom: '16px' }}>
            Ready to Begin Your <span style={{ color: ACCENT }}>Healing Journey?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: '1.8', marginBottom: '36px', fontSize: '1rem' }}>
            Book a free 30-minute discovery consultation with one of our senior practitioners. No pressure, no obligations — just a conversation about how we can support you.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: ACCENT, color: '#fff', padding: '16px 36px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: `0 8px 28px ${ACCENT}55` }}>
              Book Free Consultation <FaArrowRight />
            </Link>
            <Link to="/doctors"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '16px 36px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '15px', border: '1px solid rgba(255,255,255,0.22)' }}>
              Meet Our Doctors
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .founder-grid {
            grid-template-columns: 1fr !important;
          }
          .quote-card {
             position: relative !important;
             bottom: 0 !important;
             right: 0 !important;
             margin-top: -24px;
             margin-left: auto;
             margin-right: auto;
             max-width: 100% !important;
             z-index: 10;
          }
        }
        @media (max-width: 768px) {
          .about-timeline-line { display: none !important; }
          .timeline-dot { display: none !important; }
          .timeline-item {
             padding-left: 0 !important;
             padding-right: 0 !important;
             justify-content: flex-start !important;
          }
          .timeline-content {
             max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}