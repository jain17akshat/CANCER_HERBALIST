import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaShoppingBag, FaShippingFast, FaClipboardList, FaLeaf,
  FaShieldAlt, FaCheckCircle, FaArrowRight, FaStar, FaGlobe, FaSearch
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';
const DARK = '#0a1628';

export default function ProductsHub() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Herbal Store',
      desc: 'Browse our complete catalog of standardized, organic phytotherapeutic formulations, targeted extract blends, and clinical nutrition supplements.',
      icon: <FaShoppingBag />,
      link: '/store',
      btnText: 'Explore Herbal Store',
      badge: '🛒 Organic & Standardized',
      color: PRIMARY
    },
    {
      title: 'Track Order & Refund History',
      desc: 'Track the real-time shipping status of your orders and view your complete refund history, refund status updates, and credited amounts.',
      icon: <FaShippingFast />,
      link: '/track-order',
      btnText: 'Track Order & Refunds',
      badge: '📦 Order & Refund Tracking',
      color: ACCENT
    },
    {
      title: 'My Orders & History',
      desc: 'View your historical prescription orders, download invoices, review dosage refills, and request formulation updates.',
      icon: <FaClipboardList />,
      link: '/my-orders',
      btnText: 'View My Orders',
      badge: '📋 Order Management',
      color: '#0f3460'
    }
  ];

  const featuredFormulations = [
    {
      name: 'Curcuminoid Bio-Active Extract 95%',
      category: 'Gene Targeted Support',
      desc: 'Standardized turmeric extract enriched with piperine for 2000% enhanced bio-availability. Targets NF-kB inflammation pathways.',
      badge: 'Bestseller'
    },
    {
      name: 'Immune Shield Polysaccharide Complex',
      category: 'Immune Modulation',
      desc: 'Synergistic beta-glucan formulation combining Reishi, Maitake, and Turkey Tail extracts to optimize NK cell surveillance.',
      badge: 'Clinical Favorite'
    },
    {
      name: 'Boswellia Serrata Joint & Tissue Comfort',
      category: 'Anti-Inflammatory',
      desc: 'High-purity boswellic acid extract engineered for 5-LOX inhibition and relief from peritumoral tissue swelling.',
      badge: 'Standardized Extract'
    }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1a6e52 50%, #0e6655 100%)',
        padding: '140px 20px 80px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: ACCENT, opacity: 0.15, filter: 'blur(90px)' }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{
            background: `${ACCENT}22`,
            border: `1px solid ${ACCENT}55`,
            color: ACCENT,
            padding: '8px 24px',
            borderRadius: '50px',
            fontSize: '13.5px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '18px'
          }}>
            🌿 Phytotherapeutic Solutions
          </span>

          <h1 style={{
            fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Products <span style={{ color: ACCENT }}>& Orders</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.8',
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            Access our standardized herbal formulations, track active courier shipments, or manage past prescription refills all in one place.
          </p>
        </div>
      </section>

      {/* THREE MAIN PRODUCTS NAVIGATION CARDS */}
      <section style={{ maxWidth: '1200px', margin: '-40px auto 80px', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '32px' }}>
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              style={{
                background: '#fff',
                borderRadius: '28px',
                padding: '40px 32px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <span style={{
                  display: 'inline-block',
                  background: `${sec.color}15`,
                  color: sec.color,
                  padding: '6px 16px',
                  borderRadius: '50px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  marginBottom: '20px'
                }}>
                  {sec.badge}
                </span>

                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  background: sec.color,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  marginBottom: '20px'
                }}>
                  {sec.icon}
                </div>

                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: DARK, marginBottom: '12px' }}>
                  {sec.title}
                </h2>

                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '28px' }}>
                  {sec.desc}
                </p>
              </div>

              <Link
                to={sec.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: sec.color,
                  color: '#fff',
                  padding: '14px 24px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
              >
                {sec.btnText} <FaArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED FORMULATIONS */}
      <section style={{ background: '#fff', padding: '80px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: PRIMARY, fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>High-Purity Phytotherapy</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: DARK, marginTop: '8px' }}>
              Featured Herbal Formulations
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '32px' }}>
            {featuredFormulations.map((item, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: ACCENT, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  {item.category}
                </span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: DARK, margin: '0 0 12px' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.7', margin: '0 0 24px', flex: 1 }}>
                  {item.desc}
                </p>
                <button
                  onClick={() => navigate('/store')}
                  style={{
                    background: 'none',
                    border: `1.5px solid ${PRIMARY}`,
                    color: PRIMARY,
                    padding: '10px 20px',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  View Product in Store <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
