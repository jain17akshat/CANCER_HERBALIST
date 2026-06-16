import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaSearch, FaTimes, FaShoppingBag, FaStar, FaShieldAlt, FaCheck } from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

// ── Dummy product data ──────────────────────────────────────────
const products = [
  {
    id: 1,
    name: 'ImmunoHerb Complex',
    category: 'Immunity',
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 124,
    image: null, // will use placeholder
    color: '#38bed5',
    icon: '🌿',
    badge: 'Best Seller',
    description: 'A clinically validated blend of Tulsi, Ashwagandha & Giloy to strengthen your immune response during cancer treatment.',
    benefits: ['Boosts NK cell activity', 'Reduces chemo fatigue', 'Supports white blood cell count'],
    size: '60 capsules / 30 days',
  },
  {
    id: 2,
    name: 'TurmaCure Gold',
    category: 'Anti-Tumor',
    price: 1799,
    originalPrice: 2399,
    rating: 4.9,
    reviews: 98,
    image: null,
    color: '#f59e0b',
    icon: '🟡',
    badge: 'Top Rated',
    description: 'Pharmaceutical-grade Curcumin with enhanced bioavailability (95% curcuminoids) for anti-tumor and anti-inflammatory support.',
    benefits: ['Inhibits tumor angiogenesis', 'Powerful anti-inflammatory', 'NF-κB pathway suppression'],
    size: '60 capsules / 30 days',
  },
  {
    id: 3,
    name: 'DetoxHerb Blend',
    category: 'Detox',
    price: 999,
    originalPrice: 1299,
    rating: 4.6,
    reviews: 76,
    image: null,
    color: '#10b981',
    icon: '🍃',
    badge: null,
    description: 'A herbal tea blend of Neem, Moringa & Dandelion root to support liver and kidney detoxification during chemotherapy.',
    benefits: ['Liver enzyme normalisation', 'Reduces chemo toxins', 'Improves appetite'],
    size: '30 sachets / 30 days',
  },
  {
    id: 4,
    name: 'AshwaShield Adaptogen',
    category: 'Stress & Recovery',
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviews: 89,
    image: null,
    color: '#8b5cf6',
    icon: '🌱',
    badge: null,
    description: 'Ashwagandha root extract (KSM-66®) combined with Brahmi to combat cancer-related anxiety, fatigue and cognitive decline.',
    benefits: ['Reduces cortisol levels', 'Improves sleep quality', 'Enhances cognitive function'],
    size: '60 capsules / 30 days',
  },
  {
    id: 5,
    name: 'OncoClear Formula',
    category: 'Anti-Tumor',
    price: 2499,
    originalPrice: 3199,
    rating: 4.9,
    reviews: 142,
    image: null,
    color: '#0f3460',
    icon: '💊',
    badge: 'Premium',
    description: 'Our flagship multi-herb protocol combining 12 clinically researched plants targeting multiple cancer pathways simultaneously.',
    benefits: ['Multi-pathway cancer support', 'Synergistic herbal blend', 'Works alongside chemo/radio'],
    size: '90 capsules / 30 days',
  },
  {
    id: 6,
    name: 'HematoBoost Syrup',
    category: 'Blood Support',
    price: 849,
    originalPrice: 1099,
    rating: 4.5,
    reviews: 63,
    image: null,
    color: '#ef4444',
    icon: '🩸',
    badge: null,
    description: 'Iron-rich herbal syrup with Punarnava, Shatavari & Amalaki to restore haemoglobin and platelet counts after chemotherapy.',
    benefits: ['Raises haemoglobin naturally', 'Platelet count support', 'Rich in natural iron & Vit C'],
    size: '200ml / 30 days',
  },
];

const categories = ['All', 'Immunity', 'Anti-Tumor', 'Detox', 'Stress & Recovery', 'Blood Support'];

// Placeholder image component
function ProductPlaceholder({ color, icon }) {
  return (
    <div style={{
      width: '100%',
      height: '150px',
      background: `linear-gradient(135deg, ${color}18, ${color}38)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
    }}>
      <span style={{ fontSize: '48px' }}>{icon}</span>
    </div>
  );
}

// Enquiry Modal
function EnquiryModal({ product, onClose }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.55)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '20px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '20px', padding: '32px',
          maxWidth: '480px', width: '100%', position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: '#f3f4f6', border: 'none', borderRadius: '50%',
          width: '32px', height: '32px', cursor: 'pointer', fontSize: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FaTimes />
        </button>

        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{product.icon}</div>
        <h3 style={{ color: '#0f172a', marginBottom: '4px', fontSize: '1.2rem' }}>{product.name}</h3>
        <p style={{ color: ACCENT, fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>
          ₹{product.price.toLocaleString('en-IN')} <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '0.9rem' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
        </p>
        <p style={{ color: '#64748b', fontSize: '0.93rem', lineHeight: '1.7', marginBottom: '20px' }}>
          {product.description}
        </p>
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px' }}>
          {product.benefits.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: i < product.benefits.length - 1 ? '8px' : 0 }}>
              <FaCheck style={{ color: PRIMARY, fontSize: '11px', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: '#374151' }}>{b}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px' }}>
          <p style={{ color: '#92400e', fontSize: '12px', margin: 0 }}>
            ⚕️ <strong>Note:</strong> These products are complementary supplements. Please consult your oncologist before use.
          </p>
        </div>
        <button
          onClick={() => {
            const params = new URLSearchParams({ product: product.name, price: product.price });
            navigate(`/contact?${params.toString()}`);
            onClose();
          }}
          style={{
            width: '100%', padding: '14px',
            background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
            color: '#fff', border: 'none', borderRadius: '12px',
            fontWeight: 700, fontSize: '15px', cursor: 'pointer',
            letterSpacing: '0.3px',
          }}
        >
          📩 Send Enquiry for this Product
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Main Store Component ────────────────────────────────────────
export default function Store() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 60%, #1a5276 100%)`,
        padding: '130px 20px 70px', textAlign: 'center', color: '#fff',
      }}>
        <span style={{
          background: `${ACCENT}33`, border: `1px solid ${ACCENT}66`,
          color: ACCENT, padding: '6px 18px', borderRadius: '50px',
          fontSize: '13px', fontWeight: 600,
        }}>
          🌿 Herbal Medicine Store
        </span>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontFamily: 'Playfair Display, serif',
          margin: '20px 0 16px',
        }}>
          Clinically Validated <span style={{ color: ACCENT }}>Herbal Formulations</span>
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.87, lineHeight: '1.8', fontSize: '1.05rem' }}>
          Personalised herbal supplements designed to support your cancer treatment journey.
          All products are evidence-based and complementary to conventional therapy.
        </p>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
          {['100% Natural', 'No Side Effects', 'Doctor Formulated', 'Free Consultation Included'].map(b => (
            <div key={b} style={{
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50px', padding: '6px 16px', fontSize: '13px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <FaShieldAlt style={{ color: ACCENT, fontSize: '11px' }} /> {b}
            </div>
          ))}
        </div>
      </section>

      {/* Filters + Search */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 12px 0' }}>

        {/* Search bar — full width on mobile */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '13px' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search herbal products…"
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '11px 14px 11px 38px',
              border: '1px solid #e2e8f0', borderRadius: '12px',
              fontSize: '14px', outline: 'none',
              background: '#fff', color: '#374151',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          />
        </div>

        {/* Horizontally scrollable category pills */}
        <div style={{
          display: 'flex', gap: '8px', overflowX: 'auto',
          paddingBottom: '10px', marginBottom: '20px',
          scrollbarWidth: 'none',
        }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '7px 16px', borderRadius: '50px', border: 'none',
              fontSize: '12px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
              flexShrink: 0,
              background: activeCategory === cat ? `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})` : '#fff',
              color: activeCategory === cat ? '#fff' : '#64748b',
              boxShadow: activeCategory === cat ? `0 4px 14px ${ACCENT}44` : '0 1px 4px rgba(0,0,0,0.07)',
              transition: 'all 0.2s',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product count */}
        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '14px' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Product Grid — 2 cols on mobile, 3-4 on desktop */}
        <div className="store-grid" style={{ paddingBottom: '60px' }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
              <FaLeaf style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.4 }} />
              <p>No products found.</p>
            </div>
          ) : filtered.map((product, i) => (
            <motion.div
              key={product.id}
              className="store-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image */}
              <div style={{ position: 'relative' }}>
                <ProductPlaceholder color={product.color} icon={product.icon} />
                {product.badge && (
                  <span style={{
                    position: 'absolute', top: '8px', left: '8px',
                    background: product.badge === 'Premium'
                      ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                      : `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                    color: '#fff', padding: '3px 9px', borderRadius: '50px',
                    fontSize: '10px', fontWeight: 700,
                  }}>
                    {product.badge}
                  </span>
                )}
                {/* Discount badge top-right */}
                <span style={{
                  position: 'absolute', top: '8px', right: '8px',
                  background: '#22c55e', color: '#fff',
                  padding: '3px 8px', borderRadius: '6px',
                  fontSize: '10px', fontWeight: 700,
                }}>
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              {/* Info */}
              <div className="store-card-body">
                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '4px' }}>
                  <FaStar style={{ color: '#f59e0b', fontSize: '10px' }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>{product.rating}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>({product.reviews})</span>
                </div>

                <h3 className="store-card-title">{product.name}</h3>

                <p className="store-card-desc">
                  {product.description.substring(0, 60)}…
                </p>

                {/* Price row */}
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: PRIMARY }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '5px' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  className="store-card-btn"
                  onClick={e => { e.stopPropagation(); setSelectedProduct(product); }}
                >
                  <FaShoppingBag style={{ fontSize: '11px' }} /> Enquire
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive styles */}
        <style>{`
          .store-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          .store-card {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.07);
            cursor: pointer;
            transition: box-shadow 0.25s, transform 0.25s;
            border: 1px solid #f1f5f9;
          }
          .store-card:hover {
            box-shadow: 0 6px 24px rgba(0,0,0,0.12);
            transform: translateY(-3px);
          }
          .store-card-body {
            padding: 10px 12px 12px;
          }
          .store-card-title {
            font-size: 0.88rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 4px;
            line-height: 1.3;
          }
          .store-card-desc {
            font-size: 0.75rem;
            color: #64748b;
            line-height: 1.5;
            margin-bottom: 8px;
          }
          .store-card-btn {
            width: 100%;
            padding: 8px;
            background: linear-gradient(135deg, ${PRIMARY}, ${ACCENT});
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            font-family: inherit;
          }
          @media (max-width: 1024px) {
            .store-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (max-width: 640px) {
            .store-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }
            .store-card-body { padding: 8px 10px 10px; }
            .store-card-title { font-size: 0.82rem; }
            .store-card-desc { display: none; }
          }
        `}</style>
      </div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <EnquiryModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
