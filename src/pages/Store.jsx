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
    image: '/products/product1.jpg',
    images: [
      '/products/product1.jpg',
      '/products/product1.2.png',
      '/products/product1.3.png',
      '/products/product1.4.png',
      '/products/product1.5.png',
    ],
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
    image: '/products/product2.1.png',
    images: [
      '/products/product2.1.png',
      '/products/product2.2.jpg',
      '/products/product2.3.jpg',
    ],
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
    image: '/products/product3.1.jpg',
    images: [
      '/products/product3.1.jpg',
      '/products/product3.2.jpg',
      '/products/product3.3.jpg',
    ],
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
    image: '/products/product4.1.jpg',
    images: [
      '/products/product4.1.jpg',
      '/products/product4.2.jpg',
      '/products/product4.3.jpg', 

    ],
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
    image: '/products/product5.1.jpg',
    images: [
      '/products/product5.1.jpg',
      '/products/product5.2.jpg',
      '/products/product5.3.jpg',
    ],
    color: '#0f3460',
    icon: '💊',
    badge: 'Premium',
    description: 'Our flagship multi-herb protocol combining 12 clinically researched plants targeting multiple cancer pathways simultaneously.',
    benefits: ['Multi-pathway cancer support', 'Synergistic herbal blend', 'Works alongside chemo/radio'],
    size: '90 capsules / 30 days',
  },
  {
    id: 6,
    name: 'Organic MCT Oil',
    category: 'Nutrition',
    price: 849,
    originalPrice: 1099,
    rating: 4.5,
    reviews: 63,
    image: '/products/product6.1.jpg',
    images: [
      '/products/product6.1.jpg',
      '/products/product6.2.jpg',
      '/products/product6.3.jpg',
      '/products/product6.4.jpg',
    ],
    color: '#d97706',
    icon: '🫒',
    badge: null,
    description: 'Organic Medium Chain Triglycerides (MCT) oil — a rapidly absorbed energy source that supports ketogenic metabolism, reduces cancer-related cachexia, and fuels the body during treatment.',
    benefits: ['Rapid energy without glucose spike', 'Supports ketogenic metabolism', 'Reduces cancer-related weight loss'],
    size: '250ml bottle / 30 days',
  },
  {
    id: 7,
    name: 'Phytox Chlorella',
    category: 'Detox',
    price: 1199,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 87,
    image: '/products/product7.1.jpg',
    images: [
      '/products/product7.1.jpg',
      '/products/product7.3.jpg',
      '/products/product7.4.jpg',
    ],
    color: '#059669',
    icon: '🟢',
    badge: 'New',
    description: 'Chlorella pyrenoidosa extract (400mg) — a potent green superfood developed by Cancer Herbalist for deep cellular detoxification, heavy metal chelation, and immune restoration.',
    benefits: ['Heavy metal chelation & detox', 'Rich in chlorophyll & protein', 'Boosts immune cell production'],
    size: '50 capsules / 25 days',
  },
  {
    id: 8,
    name: 'Frankincense Essential Oil',
    category: 'Essential Oils',
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviews: 74,
    image: '/products/product8.jpg',
    images: [
      '/products/product8.1.jpg',
      '/products/product8.4.jpg',
      '/products/product8.3.jpg',

       '/products/product8.2.jpg',
    ],
    color: '#b45309',
    icon: '🫙',
    badge: null,
    description: 'Premium Frankincense (Boswellia Frerana) essential oil — 100% pure & natural therapeutic grade. Used in aromatherapy for its anti-inflammatory, calming, and immune-supporting properties during cancer care.',
    benefits: ['Potent anti-inflammatory (boswellic acids)', 'Calming aromatherapy for anxiety relief', 'Supports immune cell modulation'],
    size: '200ml bottle',
  },
  {
    id: 9,
    name: 'MCT Powder',
    category: 'Nutrition',
    price: 999,
    originalPrice: 1399,
    rating: 4.6,
    reviews: 58,
    image: '/products/product9.1.jpg',
    images: [
      '/products/product9.1.jpg',
      '/products/product9.2.jpg',
      '/products/product9.3.jpg',
    ],
    color: '#16a34a',
    icon: '🥥',
    badge: null,
    description: 'MCT Powder by Cancer Herbalist — a convenient, easily mixable powder form of Medium Chain Triglycerides derived from coconut and palm for rapid energy, ketogenic support, and cancer-related weight management.',
    benefits: ['Easy-to-mix powder form of MCTs', 'Rapid ketone energy without glucose', 'Supports healthy weight during treatment'],
    size: '200g jar / 30 days',
  },
  {
    id: 10,
    name: 'OXY Forte',
    category: 'Immunity',
    price: 1099,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 52,
    image: '/products/product10.jpg',
    images: [
      '/products/product10.jpg',
      '/products/product10.1.jpg',
      '/products/product10.2.jpg',
    ],
    color: '#e11d48',
    icon: '💊',
    badge: null,
    description: 'OXY Forte is a multi-action herbal capsule formulation by Vibes India, FSSAI certified, designed to enhance cellular oxygenation and antioxidant defence during cancer treatment.',
    benefits: ['Enhances cellular oxygenation', 'Multi-herb antioxidant defence', 'FSSAI certified formulation'],
    size: '30 capsules / 15 days',
  },
  {
    id: 11,
    name: 'Sodium Bicarbonate',
    category: 'Alkaline Therapy',
    price: 499,
    originalPrice: 699,
    rating: 4.5,
    reviews: 45,
    image: '/products/product11.0.jpg',
    images: [
      '/products/product11.0.jpg',
      '/products/product11.jpg',
      '/products/product11.1.jpg',
      '/products/product11.2.jpg',
    ],
    color: '#7c3aed',
    icon: '⚗️',
    badge: null,
    description: 'Pharmaceutical-grade Sodium Bicarbonate by Dr Herbalist — used to alkalise the body, support pH balance, and create an unfavourable environment for cancer cell proliferation.',
    benefits: ['Alkalises body pH naturally', 'Supports healthy acid-base balance', 'Pharmaceutical-grade purity'],
    size: '100g tub',
  },
  {
    id: 12,
    name: 'MethiPower',
    category: 'Nutrition',
    price: 599,
    originalPrice: 799,
    rating: 4.5,
    reviews: 41,
    image: '/products/product12.0.jpg',
    images: [
      '/products/product12.jpg',
      '/products/product12.1.jpg',
      '/products/product12.2.jpg',
    ],
    color: '#ca8a04',
    icon: '🌾',
    badge: null,
    description: 'MethiPower — Trigonella Foenum-Graecum (Fenugreek) powder, 100g. A traditional Ayurvedic supplement for blood sugar regulation, appetite support, and anti-inflammatory benefits during cancer care.',
    benefits: ['Regulates blood sugar levels', 'Rich in fibre & antioxidants', 'Anti-inflammatory support'],
    size: '100g jar',
  },
  {
    id: 13,
    name: 'Fulvican',
    category: 'Stress & Recovery',
    price: 599,
    originalPrice: 738,
    rating: 4.8,
    reviews: 65,
    image: '/products/product13.jpg',
    images: [
      '/products/product13.jpg',
      '/products/product13.1.jpg',
      '/products/product13.2.jpg',
    ],
    color: '#854d0e',
    icon: '⚡',
    badge: null,
    description: 'Fulvican contains premium Asphaltum punjabianum (Shilajit) extract (400mg) developed by Cancer Herbalist. Rich in fulvic acid, it supports cellular energy, recovery, and revitalization.',
    benefits: ['Enhances cellular energy production', 'Rich in fulvic acid and trace minerals', 'Supports recovery and reduces fatigue'],
    size: '60 capsules',
  },
  {
    id: 14,
    name: 'Livocin',
    category: 'Detox',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 58,
    image: '/products/product14.jpg',
    images: [
      '/products/product14.jpg',
      '/products/product14.1.jpg',
      '/products/product14.2.jpg',
    ],
    color: '#0d9488',
    icon: '🌿',
    badge: null,
    description: 'Livocin is a potent hepatoprotective formulation featuring Andrographis paniculata and Tribulus terrestris. It supports liver detoxification and immune function during intensive cancer treatments.',
    benefits: ['Supports liver detoxification', 'Hepatoprotective formulation', 'Boosts immune function'],
    size: '30 capsules',
  },
  {
    id: 15,
    name: 'K27 Comprehensive Care',
    category: 'Anti-Tumor',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 82,
    image: '/products/product15.jpg',
    images: [
      '/products/product15.jpg',
      '/products/product15.1.jpg',
      '/products/product15.2.jpg',
    ],
    color: '#6b21a8',
    icon: '🔮',
    badge: 'Premium',
    description: 'K27 is our flagship comprehensive formulation. Enhanced with CAQO, it delivers a powerful synergistic blend of potent botanicals designed for multi-pathway support against tumor progression.',
    benefits: ['Comprehensive multi-pathway support', 'Enhanced with CAQO for high bioavailability', 'Flagship anti-tumor formulation'],
    size: '60 capsules',
  },
  {
    id: 16,
    name: 'Cyanolina',
    category: 'Nutrition',
    price: 699,
    originalPrice: 899,
    rating: 4.6,
    reviews: 47,
    image: '/products/product16.1.jpg',
    images: [
          '/products/product16.1.jpg',
      '/products/product16.jpg',
      '/products/product16.2.jpg',
    ],
    color: '#0284c7',
    icon: '🌊',
    badge: null,
    description: 'Cyanolina provides 500mg of premium Spirulina per tablet. Rich in Phycocyanin (blue spirulina), it offers powerful antioxidant support, essential nutrients, and immune-boosting properties.',
    benefits: ['Rich in Phycocyanin (blue spirulina)', 'Powerful antioxidant support', 'Provides essential nutrients'],
    size: '60 tablets',
  },
];

const categories = ['All', 'Immunity', 'Anti-Tumor', 'Detox', 'Stress & Recovery', 'Nutrition', 'Essential Oils', 'Alkaline Therapy'];

// Placeholder image component
function ProductPlaceholder({ color, icon }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '3 / 4',
      background: `linear-gradient(135deg, ${color}18, ${color}38)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{ fontSize: '48px' }}>{icon}</span>
    </div>
  );
}

// ── Main Store Component ────────────────────────────────────────
export default function Store() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

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
              onClick={() => navigate(`/store/${product.id}`)}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3 / 4',
                overflow: 'hidden',
                background: '#f8f8f8',
              }}>
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ProductPlaceholder color={product.color} icon={product.icon} />
                )}
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
                  onClick={e => { e.stopPropagation(); navigate(`/store/${product.id}`); }}
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
        {/* Enquiry modal removed – navigation now opens detailed page */}
      </AnimatePresence>
    </div>
  );
}
