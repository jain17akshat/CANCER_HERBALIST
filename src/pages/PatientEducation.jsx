import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBookMedical, FaShieldAlt, FaMicroscope, FaDna,
  FaArrowRight, FaBrain, FaHeartbeat, FaSeedling,
} from 'react-icons/fa';

const ACCENT = '#38bed5';

/* ── Article listing data ── */
const articles = [
  {
    id: 'tcells-vs-nk-cells',
    icon: <FaShieldAlt />,
    category: 'Immunology',
    title: 'T-Cells vs NK Cells: Your Body\'s Cancer-Fighting Warriors',
    excerpt:
      'Discover the two key immune cell types — T-cells and NK cells — that form your body\'s frontline defense against cancer, and learn how they work together to hunt and destroy malignant cells.',
    readTime: '10 min read',
    gradient: 'linear-gradient(135deg, #0b5b67 0%, #38bed5 100%)',
    badge: '🧬 Immune Defence',
  },
  {
    id: 'coming-soon-nutrition',
    icon: <FaSeedling />,
    category: 'Nutrition',
    title: 'Anti-Cancer Nutrition: Foods That Fuel Your Immunity',
    excerpt:
      'Learn which superfoods, herbs, and dietary strategies can support your immune system during and after cancer treatment.',
    readTime: 'Coming Soon',
    gradient: 'linear-gradient(135deg, #2ca8be 0%, #e0f7fa 100%)',
    badge: '🥦 Diet & Healing',
    disabled: true,
  },
  {
    id: 'coming-soon-mindset',
    icon: <FaBrain />,
    category: 'Mental Wellness',
    title: 'The Psychology of Healing: Building a Fighter\'s Mindset',
    excerpt:
      'Explore evidence-backed mental wellness strategies — from meditation to visualization — that help cancer patients stay resilient and hopeful.',
    readTime: 'Coming Soon',
    gradient: 'linear-gradient(135deg, #38bed5 0%, #0b5b67 100%)',
    badge: '🧠 Mind & Body',
    disabled: true,
  },
];

/* ── Immune system quick stats ── */
const quickStats = [
  { value: '2 Billion+', label: 'T-Cells in Your Body', icon: <FaDna /> },
  { value: '5–15%', label: 'Of Blood Lymphocytes Are NK Cells', icon: <FaShieldAlt /> },
  { value: '24/7', label: 'Immune Surveillance', icon: <FaMicroscope /> },
  { value: '∞', label: 'Capacity to Learn & Adapt', icon: <FaHeartbeat /> },
];

export default function PatientEducation() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* ═══ Hero ═══ */}
      <section
        style={{
          padding: '130px 20px 80px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f0fdfe 0%, #dbeafe 50%, #e0f7fa 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: ACCENT,
            filter: 'blur(120px)',
            opacity: 0.1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-60px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: '#0b5b67',
            filter: 'blur(110px)',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(56,190,213,0.12)',
              border: '1px solid rgba(56,190,213,0.25)',
              color: '#0b5b67',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            <FaBookMedical /> Patient Education Centre
          </span>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              color: '#0f172a',
              fontFamily: 'Playfair Display, serif',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            Fight Cancer{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #38bed5, #0b5b67)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Better
            </span>
          </h1>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              color: '#475569',
              lineHeight: 1.8,
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            }}
          >
            Knowledge is your most powerful weapon. Explore easy-to-understand
            educational guides that help you understand your immune system,
            nutrition, and mental wellness — everything a cancer warrior needs.
          </p>
        </motion.div>
      </section>

      {/* ═══ Quick Stats Bar ═══ */}
      <section
        style={{
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '36px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {quickStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  color: ACCENT,
                  marginBottom: '4px',
                }}
              >
                {s.icon}
              </div>
              <span
                style={{
                  fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
                  fontWeight: 800,
                  color: '#0b5b67',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {s.value}
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Articles Grid ═══ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              color: '#0f172a',
              fontFamily: 'Playfair Display, serif',
              marginBottom: '12px',
            }}
          >
            Educational Guides
          </h2>
          <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Expert-curated articles that simplify complex cancer science into
            actionable knowledge for patients and caregivers.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '28px',
          }}
        >
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={!article.disabled ? { y: -8, boxShadow: `0 20px 60px ${ACCENT}22` } : {}}
              onClick={() => !article.disabled && navigate(`/patient-education/${article.id}`)}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 8px 28px rgba(0,0,0,0.06)',
                cursor: article.disabled ? 'default' : 'pointer',
                opacity: article.disabled ? 0.65 : 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: '1px solid #e2e8f022',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Gradient Header */}
              <div
                style={{
                  background: article.gradient,
                  padding: '32px 28px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Pattern overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.06,
                    backgroundImage:
                      'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '5px 14px',
                    borderRadius: '50px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '16px',
                    letterSpacing: '0.3px',
                  }}
                >
                  {article.badge}
                </span>
                <div
                  style={{
                    fontSize: '42px',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: '8px',
                  }}
                >
                  {article.icon}
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: '28px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: ACCENT,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    marginBottom: '10px',
                  }}
                >
                  {article.category}
                </span>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1.35,
                    marginBottom: '12px',
                  }}
                >
                  {article.title}
                </h3>

                <p
                  style={{
                    color: '#64748b',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {article.excerpt}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '16px',
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                    {article.readTime}
                  </span>

                  {!article.disabled ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: ACCENT,
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      Read Guide <FaArrowRight style={{ fontSize: '12px' }} />
                    </span>
                  ) : (
                    <span
                      style={{
                        background: '#f1f5f9',
                        color: '#94a3b8',
                        padding: '4px 14px',
                        borderRadius: '50px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0b5b67 0%, #38bed5 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '14px',
          }}
        >
          Have Questions About Your Treatment?
        </h2>
        <p
          style={{
            maxWidth: '600px',
            margin: '0 auto 30px',
            opacity: 0.9,
            lineHeight: 1.7,
          }}
        >
          Our herbal medicine specialists are here to guide you with personalized
          advice and compassionate support.
        </p>
        <button
          onClick={() => navigate('/contact')}
          style={{
            background: '#fff',
            color: '#0b5b67',
            border: 'none',
            padding: '16px 40px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}
        >
          Book Free Consultation
        </button>
      </section>
    </div>
  );
}
