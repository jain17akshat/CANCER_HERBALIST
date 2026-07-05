import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLeaf, FaHeart, FaShieldAlt, FaRegLightbulb, FaUserMd,
  FaSeedling, FaFlask, FaHandHoldingHeart, FaGlobe,
  FaArrowRight, FaCheckCircle, FaQuoteLeft, FaPlay
} from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const ACCENT = '#38bed5';
const DARK   = '#0a1628';

export default function About() {
  const { content } = useContent();
  const [isPlaying, setIsPlaying] = useState(false);

  // Load sections from context or default
  const aboutHero = content?.aboutHero || {};
  const aboutStory = content?.aboutStory || {};
  const aboutVideo = content?.aboutVideo || {};
  const aboutMission = content?.aboutMission || {};
  const aboutValues = content?.aboutValues || { items: [] };
  const aboutMilestones = content?.aboutMilestones || { items: [] };
  const aboutApproach = content?.aboutApproach || { items: [] };
  const aboutFounderProfile = content?.aboutFounderProfile || {};

  // Setup static icons map for repeatable values
  const staticValuesIcons = [
    <FaHandHoldingHeart />,
    <FaFlask />,
    <FaShieldAlt />,
    <FaRegLightbulb />,
    <FaLeaf />,
    <FaGlobe />
  ];

  const staticMilestonesIcons = [
    <FaSeedling />,
    <FaShieldAlt />,
    <FaFlask />,
    <FaGlobe />,
    <FaUserMd />,
    <FaLeaf />,
    <FaLeaf />
  ];

  const activeValues = (aboutValues.items || []).map((v, i) => ({
    ...v,
    icon: staticValuesIcons[i % staticValuesIcons.length]
  }));

  const activeMilestones = (aboutMilestones.items || []).map((m, i) => ({
    ...m,
    icon: staticMilestonesIcons[i % staticMilestonesIcons.length]
  }));

  const activeApproach = aboutApproach.items || [];

  return (
    <div style={{ background: '#f8fafc' }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,22,40,0.93) 0%, rgba(10,22,40,0.65) 55%, rgba(56,190,213,0.18) 100%)' }} />

        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(120px, 18vw, 160px) clamp(16px, 4vw, 40px) clamp(60px, 10vw, 100px)', width: '100%', boxSizing: 'border-box' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${ACCENT}22`, border: `1px solid ${ACCENT}55`, color: ACCENT, padding: '8px 20px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '28px' }}>
              <FaLeaf /> {aboutHero.badge || 'About Cancer Herbalist'}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', color: '#fff', lineHeight: 1.2, marginBottom: '28px', maxWidth: '760px' }}>
            {aboutHero.headline || 'Two Decades of'} <br />
            <span style={{ color: ACCENT }}>{aboutHero.headlineAccent || 'Healing Through Nature'}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.80)', fontSize: '1.15rem', lineHeight: '1.9', maxWidth: '620px', marginBottom: '40px' }}>
            {aboutHero.subline || 'Since 2012 Cancer Herbalist has been a trusted partner...'}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to={aboutHero.cta1Link || '/contact'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: ACCENT, color: '#fff', padding: '15px 32px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: `0 8px 28px ${ACCENT}55` }}>
              {aboutHero.cta1Label || 'Book Free Consultation'} <FaArrowRight />
            </Link>
            <Link to={aboutHero.cta2Link || '/care-programs'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '15px 32px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '15px', border: '1px solid rgba(255,255,255,0.25)' }}>
              {aboutHero.cta2Label || 'Our Approach'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ STORY SECTION ══════════ */}
      <section style={{ background: '#fff', padding: 'clamp(50px, 8vw, 100px) 20px' }}>
        <div className="about-story-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
          {/* Image side */}
          <motion.div data-aos="fade-right" style={{ position: 'relative', paddingBottom: '60px', paddingRight: '28px' }}>
            <img
              src={aboutStory.founderImage || '/images/doctor1.png'}
              alt={aboutStory.founderQuoteAuthor || 'Prof Ramesh Babu — Founder, Cancer Herbalist'}
              className="founder-img"
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
                "{aboutStory.founderQuote || 'Nature holds the answers.'}"
              </p>
              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '2px', background: ACCENT, borderRadius: '2px'
                }} />
                <p style={{ color: ACCENT, fontWeight: 700, fontSize: '12.5px', margin: 0, letterSpacing: '0.3px' }}>
                  {aboutStory.founderQuoteAuthor || 'Prof Ramesh Babu, Founder'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div data-aos="fade-left">
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {aboutStory.badge || 'Our Story'}
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: DARK, marginTop: '12px', marginBottom: '24px', lineHeight: 1.25 }}>
              {aboutStory.title ? (
                <>
                  {aboutStory.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: ACCENT }}>{aboutStory.title.split(' ').slice(-1)[0]}</span>
                </>
              ) : (
                <>A Mission Born from <span style={{ color: ACCENT }}>Compassion</span></>
              )}
            </h2>
            {(aboutStory.paragraphs || []).map((p, i) => (
              <p key={i} style={{ color: '#475569', lineHeight: '1.9', fontSize: '1rem', marginBottom: '18px' }}>
                {p}
              </p>
            ))}

            {/* Key differentiators */}
            {(aboutStory.highlights || []).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <FaCheckCircle style={{ color: ACCENT, flexShrink: 0, marginTop: '3px', fontSize: '16px' }} />
                <span style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ VIDEO SECTION ══════════ */}
      <section style={{ padding: 'clamp(50px, 8vw, 80px) 20px', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '32px' }}>
            <span style={{
              background: '#e0f2fe',
              color: '#0369a1',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '14px'
            }}>
              Clinical Video
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: DARK, marginBottom: '16px' }}>
              {aboutVideo.title || 'Watch Our Story'}
            </h2>
            <p style={{ color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.98rem' }}>
              {aboutVideo.subtitle || 'Discover how we combine scientific research and botanical medicine to support cancer patients.'}
            </p>
          </div>

          <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            background: '#000',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {!isPlaying ? (
              <div 
                onClick={() => setIsPlaying(true)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  backgroundImage: aboutVideo.thumbnailUrl ? `url(${aboutVideo.thumbnailUrl}), linear-gradient(135deg, #0e6655 0%, #0a1628 100%)` : 'linear-gradient(135deg, #0e6655 0%, #0a1628 100%)',
                  backgroundSize: aboutVideo.thumbnailUrl && aboutVideo.thumbnailUrl.toLowerCase().includes('logo') ? 'contain' : 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2
                }}
              >
                {/* Shimmer overlay for extra premium look */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45))',
                  zIndex: 1
                }} />

                {/* Animated Pulsing Play Button */}
                <div 
                  className="play-button-outer"
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <FaPlay style={{ color: '#fff', fontSize: '24px', marginLeft: '6px' }} />
                </div>
              </div>
            ) : (
              <video 
                src={aboutVideo.videoUrl || '/cancer-herbalist.mp4'} 
                controls 
                autoPlay 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  zIndex: 1
                }}
              />
            )}
          </div>
        </div>
        
        {/* Style injection for play button hover/pulses */}
        <style dangerouslySetInnerHTML={{ __html: `
          .play-button-outer:hover {
            transform: scale(1.1);
            background: rgba(255, 255, 255, 0.35) !important;
            border-color: rgba(255, 255, 255, 0.6) !important;
            box-shadow: 0 12px 40px rgba(56, 190, 213, 0.4) !important;
          }
        `}} />
      </section>

      {/* ══════════ MISSION + VISION ══════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f3460 50%, #0e6655 100%)', padding: 'clamp(50px, 8vw, 100px) 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: ACCENT, opacity: 0.05, filter: 'blur(80px)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '16px' }}>
              {aboutMission.title ? (
                <>
                  {aboutMission.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: ACCENT }}>{aboutMission.title.split(' ').slice(-1)[0]}</span>
                </>
              ) : (
                <>Mission & <span style={{ color: ACCENT }}>Vision</span></>
              )}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '560px', margin: '0 auto', lineHeight: '1.8' }}>
              {aboutMission.subtitle || 'Two guiding stars that shape every decision we make.'}
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
              <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '18px' }}>{aboutMission.missionTitle || 'Our Mission'}</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: '1.9', fontSize: '1rem' }}>
                {aboutMission.missionText || 'To provide safe, personalised, evidence-based herbal support...'}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div data-aos="fade-up" data-aos-delay="100"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${ACCENT}33`, borderRadius: '28px', padding: '44px 40px', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#10b981', borderRadius: '4px 0 0 4px' }} />
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(16,185,129,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#10b981', marginBottom: '24px' }}>
                <FaGlobe />
              </div>
              <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '18px' }}>{aboutMission.visionTitle || 'Our Vision'}</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: '1.9', fontSize: '1rem' }}>
                {aboutMission.visionText || 'A world where every cancer patient...'}
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
              {aboutValues.title ? (
                <>
                  {aboutValues.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: ACCENT }}>{aboutValues.title.split(' ').slice(-1)[0]}</span>
                </>
              ) : (
                <>Our Core <span style={{ color: ACCENT }}>Values</span></>
              )}
            </h2>
            <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: '1.8' }}>
              {aboutValues.subtitle || 'These principles are not aspirational...'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '28px' }}>
            {activeValues.map((v, i) => (
              <motion.div key={i} data-aos="fade-up" data-aos-delay={i * 70}
                whileHover={{ y: -8, boxShadow: `0 20px 50px rgba(0,0,0,0.1)` }}
                style={{ background: '#f8fafc', borderRadius: '24px', padding: '36px 32px', border: '1px solid #e2e8f0', transition: 'all 0.35s ease', cursor: 'default' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${v.color || ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: v.color || ACCENT, marginBottom: '22px' }}>
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
              {aboutMilestones.title ? (
                <>
                  {aboutMilestones.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: ACCENT }}>{aboutMilestones.title.split(' ').slice(-1)[0]}</span>
                </>
              ) : (
                <>Two Decades of <span style={{ color: ACCENT }}>Milestones</span></>
              )}
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}22)`, transform: 'translateX(-50%)' }} className="about-timeline-line" />

            {activeMilestones.map((m, i) => {
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
              {aboutApproach.title ? (
                <>
                  {aboutApproach.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: ACCENT }}>{aboutApproach.title.split(' ').slice(-1)[0]}</span>
                </>
              ) : (
                <>Our Care <span style={{ color: ACCENT }}>Approach</span></>
              )}
            </h2>
            <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: '1.8' }}>
              {aboutApproach.subtitle || 'A four-principle framework...'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '28px' }}>
            {activeApproach.map((a, i) => (
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
            <span style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {aboutFounderProfile.subtitle || 'The Person Behind the Practice'}
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginTop: '12px', lineHeight: 1.25 }}>
              {aboutFounderProfile.title ? (
                <>
                  {aboutFounderProfile.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: ACCENT }}>{aboutFounderProfile.title.split(' ').slice(-1)[0]}</span>
                </>
              ) : (
                <>Meet the <span style={{ color: ACCENT }}>Founder</span></>
              )}
            </h2>
          </div>

          <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center' }}>
            {/* Left — image + credentials */}
            <motion.div data-aos="fade-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', background: `conic-gradient(${ACCENT}, #10b981, ${ACCENT})`, opacity: 0.3, filter: 'blur(14px)' }} />
                <img
                  src={aboutFounderProfile.image || '/images/doctor1.2.png'}
                  alt={aboutFounderProfile.name || 'Prof. Ramesh Babu — Founder, Cancer Herbalist'}
                  style={{ width: '100%', borderRadius: '50%', display: 'block', position: 'relative', zIndex: 1, border: `4px solid ${ACCENT}44`, aspectRatio: '1 / 1', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
                {(aboutFounderProfile.credentials || []).map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px' }}>
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{['🎓', '🏛️', '✅'][i % 3]}</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12.5px', lineHeight: '1.5', fontWeight: 500 }}>{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — copy */}
            <motion.div data-aos="fade-left">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#fff', marginBottom: '6px', lineHeight: 1.2 }}>
                {aboutFounderProfile.name || 'Prof. Ramesh Babu'}
              </h3>
              <p style={{ color: ACCENT, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', marginBottom: '32px', textTransform: 'uppercase' }}>
                {aboutFounderProfile.role || 'Founder & Chief Herbalist'}
              </p>

              {(aboutFounderProfile.paragraphs || []).map((p, i) => {
                const hasStrong = p.includes('one to two hours with every patient');
                return (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.78)', lineHeight: '1.9', fontSize: '1rem', marginBottom: '20px' }}>
                    {hasStrong ? (
                      <>
                        He spends <strong style={{ color: '#fff' }}>one to two hours with every patient</strong> — compared to the industry average of 5 minutes. Not because he has to. Because he believes that no meaningful healing conversation can happen in a fraction of that time.
                      </>
                    ) : p}
                  </p>
                );
              })}

              {/* Pull quote */}
              {aboutFounderProfile.quote && (
                <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: '24px', margin: '32px 0' }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: '#fff', fontStyle: 'italic', lineHeight: '1.8', margin: 0 }}>
                    "{aboutFounderProfile.quote}"
                  </p>
                  <p style={{ color: ACCENT, fontWeight: 700, fontSize: '13px', marginTop: '12px', marginBottom: 0 }}>
                    — {aboutFounderProfile.quoteAuthor || aboutFounderProfile.name}
                  </p>
                </div>
              )}
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
              Meet Our Team
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
            bottom: auto !important;
            right: auto !important;
            left: auto !important;
            margin: 16px 0 0 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            box-sizing: border-box !important;
            z-index: 2;
          }
          .founder-img {
            max-height: 320px !important;
            width: 100% !important;
            object-fit: cover !important;
          }
          .about-story-grid > div:first-child {
            padding-bottom: 0 !important;
            padding-right: 0 !important;
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