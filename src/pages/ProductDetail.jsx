import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaStar, FaShieldAlt, FaLeaf, FaCheck, FaArrowLeft,
  FaWhatsapp, FaPhoneAlt, FaShoppingBag, FaTruck,
  FaUndo, FaAward, FaChevronDown, FaChevronUp,
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

// ── Shared product data (must match Store.jsx) ─────────────────────────────
export const products = [
  {
    id: 1,
    name: 'ImmunoHerb Complex',
    category: 'Immunity',
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 124,
    images: [
      '/products/product1.1.png',
      '/products/product1.2.png',
      '/products/product1.3.png',
      // '/products/product1.4.png',
      '/products/product1.5.png',
    ],
    color: '#38bed5',
    badge: 'Best Seller',
    tagline: 'Your daily immunity shield, clinically crafted from ancient herbs.',
    description:
      'ImmunoHerb Complex is a clinically validated blend of Tulsi, Ashwagandha & Giloy — three of Ayurveda\'s most potent immunomodulators — combined in precise therapeutic ratios. Designed to strengthen immune response during and after cancer treatment, this formulation works synergistically to elevate NK cell activity, restore white blood cell counts, and reduce post-chemotherapy fatigue.',
    benefits: [
      'Boosts Natural Killer (NK) cell activity by up to 40%',
      'Reduces chemotherapy-related fatigue and weakness',
      'Supports white blood cell (WBC) count restoration',
      'Adaptogenic — helps body cope with physical & emotional stress',
      'Contains no steroids, synthetic hormones, or heavy metals',
    ],
    ingredients: 'Ocimum sanctum (Tulsi) 300mg, Withania somnifera (Ashwagandha KSM-66®) 250mg, Tinospora cordifolia (Giloy) 200mg, Piperine 5mg (bioavailability enhancer)',
    dosage: '2 capsules twice daily after meals, or as directed by your herbalist.',
    size: '60 capsules / 30-day supply',
    inStock: true,
  },
  {
    id: 2,
    name: 'TurmaCure Gold',
    category: 'Anti-Tumor',
    price: 1799,
    originalPrice: 2399,
    rating: 4.9,
    reviews: 98,
    images: [
      '/products/product2.1.png',
      '/products/product2.2.jpg',
      '/products/product2.3.jpg',
      // '/products/product1.4.png',
    ],
    color: '#f59e0b',
    badge: 'Top Rated',
    tagline: 'Pharmaceutical-grade Curcumin with 95% curcuminoids.',
    description:
      'TurmaCure Gold features pharmaceutical-grade Curcumin standardised to 95% curcuminoids, combined with BioPerine® to enhance absorption by 2000%. Curcumin targets the NF-κB pathway — a key driver of tumor growth and inflammation — making it one of the most researched plant compounds in oncology support. Each capsule delivers a potent, bioavailable dose proven to complement conventional cancer therapy.',
    benefits: [
      'Inhibits tumor angiogenesis (blood vessel formation in tumors)',
      'Powerful anti-inflammatory — reduces CRP and IL-6 markers',
      'NF-κB pathway suppression (key anti-tumor mechanism)',
      'Enhances sensitivity of cancer cells to chemotherapy',
      'Antioxidant protection against free-radical damage',
    ],
    ingredients: 'Curcuma longa extract (95% curcuminoids) 500mg, BioPerine® (Piper nigrum) 5mg, Boswellia serrata extract 150mg',
    dosage: '1 capsule three times daily with meals.',
    size: '60 capsules / 20-day supply',
    inStock: true,
  },
  {
    id: 3,
    name: 'DetoxHerb Blend',
    category: 'Detox',
    price: 999,
    originalPrice: 1299,
    rating: 4.6,
    reviews: 76,
    images: [
      '/products/product3.1.jpg',
      '/products/product3.2.jpg',
      '/products/product3.3.jpg',
    ],
    color: '#10b981',
    badge: null,
    tagline: 'Gentle liver & kidney detox tea for chemotherapy recovery.',
    description:
      'DetoxHerb Blend is a thoughtfully curated herbal tea that combines Neem leaf, Moringa, and Dandelion root — three renowned detoxifying botanicals that work in concert to support hepatic and renal clearance of chemotherapy metabolites. It gently restores digestive enzymes, improves appetite, and helps normalise liver function tests (LFTs) elevated by oncological treatments.',
    benefits: [
      'Liver enzyme (ALT/AST) normalisation after chemo',
      'Accelerates clearance of chemo-related toxins',
      'Restores appetite and reduces nausea',
      'Rich in chlorophyll — alkalises and cleanses blood',
      'Soothing on the gut lining — reduces colitis risk',
    ],
    ingredients: 'Azadirachta indica (Neem) leaf 40%, Moringa oleifera leaf 35%, Taraxacum officinale (Dandelion root) 25%',
    dosage: 'Steep 1 sachet in 200ml hot water for 5 minutes. Drink once daily, preferably in the morning.',
    size: '30 sachets / 30-day supply',
    inStock: true,
  },
  {
    id: 4,
    name: 'AshwaShield Adaptogen',
    category: 'Stress & Recovery',
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviews: 89,
    images: [
      '/products/product4.1.jpg',
      '/products/product4.2.jpg',
       '/products/product4.3.jpg',
    ],
    color: '#8b5cf6',
    badge: null,
    tagline: 'Combat cancer-related anxiety, fatigue & brain fog.',
    description:
      'AshwaShield Adaptogen combines KSM-66® Ashwagandha — the most extensively studied root extract in clinical trials — with Brahmi (Bacopa monnieri) to address the triad of cancer-related psychological burden: anxiety, cognitive decline ("chemo brain"), and chronic fatigue. This adaptogenic duo modulates the HPA axis, reduces cortisol, and supports neurogenesis for clearer thinking and better sleep.',
    benefits: [
      'Clinically reduces cortisol levels by up to 28%',
      'Improves sleep quality and reduces insomnia',
      'Enhances cognitive function — memory & focus',
      'Alleviates chemo-induced anxiety and depression',
      'Non-habit forming — safe for long-term use',
    ],
    ingredients: 'Ashwagandha root extract KSM-66® 600mg, Bacopa monnieri extract (45% bacosides) 300mg, Shankhpushpi 100mg',
    dosage: '1 capsule twice daily. Take evening dose 1 hour before sleep for best results.',
    size: '60 capsules / 30-day supply',
    inStock: true,
  },
  {
    id: 5,
    name: 'OncoClear Formula',
    category: 'Anti-Tumor',
    price: 2499,
    originalPrice: 3199,
    rating: 4.9,
    reviews: 142,
    images: [
      '/products/product5.1.jpg',
      '/products/product5.2.jpg',
      '/products/product5.3.jpg',
    ],
    color: '#0f3460',
    badge: 'Premium',
    tagline: 'Our flagship multi-herb protocol for comprehensive cancer support.',
    description:
      'OncoClear Formula is our most advanced multi-herb protocol, combining 12 clinically researched medicinal plants that target multiple cancer pathways simultaneously. This synergistic blend has been formulated by integrative oncology herbalists to work safely alongside chemotherapy and radiotherapy, enhancing treatment outcomes while minimising side effects.',
    benefits: [
      'Targets multiple cancer pathways simultaneously',
      'Synergistic blend of 12 research-backed herbs',
      'Safe to use alongside chemo and radiotherapy',
      'Supports apoptosis (programmed cancer cell death)',
      'Comprehensive antioxidant and immune protection',
    ],
    ingredients: 'Proprietary blend of Curcumin, Ashwagandha, Tulsi, Giloy, Neem, Moringa, Punarnava, Shatavari, Amalaki, Brahmi, Shankhpushpi, Boswellia — 1500mg total per serving',
    dosage: '3 capsules twice daily after meals, or as directed by your herbalist.',
    size: '90 capsules / 30-day supply',
    inStock: true,
  },
];

function StarRating({ rating, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(n => (
          <FaStar
            key={n}
            style={{
              color: n <= Math.round(rating) ? '#f59e0b' : '#e2e8f0',
              fontSize: '14px',
            }}
          />
        ))}
      </div>
      <span style={{ fontWeight: 700, color: '#f59e0b', fontSize: '14px' }}>{rating}</span>
      <span style={{ color: '#94a3b8', fontSize: '13px' }}>({count} verified reviews)</span>
    </div>
  );
}

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #e2e8f0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '16px 0', background: 'none',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>{title}</span>
        {open ? <FaChevronUp style={{ color: '#94a3b8' }} /> : <FaChevronDown style={{ color: '#94a3b8' }} />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ paddingBottom: '16px', color: '#475569', fontSize: '14px', lineHeight: '1.8' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <FaLeaf style={{ fontSize: '48px', color: ACCENT, opacity: 0.5 }} />
        <h2 style={{ color: '#0f172a' }}>Product not found</h2>
        <Link to="/store" style={{ color: ACCENT, fontWeight: 600 }}>← Back to Store</Link>
      </div>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const savings = product.originalPrice - product.price;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/store" style={{ color: '#64748b', textDecoration: 'none' }}>Store</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 60px' }}>

        {/* Back button */}
        <button
          onClick={() => navigate('/store')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#64748b', fontSize: '14px', marginBottom: '24px',
            padding: '8px 0', fontFamily: 'inherit',
          }}
        >
          <FaArrowLeft /> Back to Store
        </button>

        {/* Main Product Layout */}
        <div className="pd-layout">

          {/* ── LEFT: Image Gallery ── */}
          <div className="pd-gallery">

            {/* Thumbnails (vertical on desktop, horizontal on mobile) */}
            <div className="pd-thumbs">
              {product.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: '68px', height: '68px', borderRadius: '8px',
                    overflow: 'hidden', cursor: 'pointer',
                    background: '#fff',
                    border: activeImg === i
                      ? `3px solid ${ACCENT}`
                      : '2px solid #e2e8f0',
                    flexShrink: 0,
                    boxShadow: activeImg === i ? `0 2px 12px ${ACCENT}44` : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', boxSizing: 'border-box' }} />
                </motion.div>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              key={activeImg}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="pd-main-img"
              style={{
                position: 'relative',
              }}
            >
              {product.badge && (
                <span style={{
                  position: 'absolute', top: '16px', left: '16px', zIndex: 2,
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                  color: '#fff', padding: '5px 14px', borderRadius: '50px',
                  fontSize: '12px', fontWeight: 700,
                }}>
                  {product.badge}
                </span>
              )}
              <span style={{
                position: 'absolute', top: '16px', right: '16px', zIndex: 2,
                background: '#22c55e', color: '#fff',
                padding: '5px 12px', borderRadius: '8px',
                fontSize: '12px', fontWeight: 700,
              }}>
                {discount}% OFF
              </span>
              <img
                src={product.images[activeImg]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: '12px', boxSizing: 'border-box' }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="pd-info">

            {/* Category pill */}
            <span style={{
              display: 'inline-block',
              background: `${product.color}18`,
              color: product.color,
              border: `1px solid ${product.color}44`,
              padding: '4px 14px', borderRadius: '50px',
              fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.5px',
              marginBottom: '12px',
            }}>
              {product.category}
            </span>

            <h1 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontFamily: 'Playfair Display, serif',
              color: '#0f172a', margin: '0 0 6px', lineHeight: '1.2',
            }}>
              {product.name}
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 14px', fontStyle: 'italic' }}>
              {product.tagline}
            </p>

            <StarRating rating={product.rating} count={product.reviews} />

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '20px 0' }} />

            {/* Pricing */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: PRIMARY }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span style={{
                  background: '#dcfce7', color: '#16a34a',
                  padding: '3px 10px', borderRadius: '6px',
                  fontSize: '13px', fontWeight: 700,
                }}>
                  Save ₹{savings.toLocaleString('en-IN')}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '4px 0 0' }}>
                Inclusive of all taxes. Free shipping on orders above ₹999.
              </p>
            </div>

            {/* Pack size */}
            <div style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <FaLeaf style={{ color: PRIMARY, fontSize: '14px', flexShrink: 0 }} />
              <span style={{ color: '#374151', fontSize: '13.5px', fontWeight: 600 }}>{product.size}</span>
            </div>

            {/* Trust icons row */}
            <div style={{
              display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px',
            }}>
              {[
                { icon: <FaTruck />, label: 'Free Delivery' },
                { icon: <FaUndo />, label: '7-Day Returns' },
                { icon: <FaShieldAlt />, label: 'FSSAI Certified' },
                { icon: <FaAward />, label: 'Doctor Formulated' },
              ].map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  background: '#fff', border: '1px solid #e2e8f0',
                  borderRadius: '8px', padding: '7px 12px',
                  fontSize: '12px', color: '#374151', fontWeight: 500,
                }}>
                  <span style={{ color: PRIMARY, fontSize: '12px' }}>{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </div>

            {/* In Stock */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#22c55e', display: 'inline-block',
                boxShadow: '0 0 6px #22c55e88',
              }} />
              <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '14px' }}>In Stock — Ready to Ship</span>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const params = new URLSearchParams({ product: product.name, price: product.price });
                  navigate(`/contact?${params.toString()}`);
                }}
                style={{
                  width: '100%', padding: '16px',
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                  color: '#fff', border: 'none', borderRadius: '12px',
                  fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', fontFamily: 'inherit',
                  boxShadow: `0 6px 20px ${ACCENT}44`,
                }}
              >
                <FaShoppingBag /> Send Product Enquiry
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/918884588835?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(₹${product.price})`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%', padding: '14px',
                  background: '#25d366',
                  color: '#fff', border: 'none', borderRadius: '12px',
                  fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', textDecoration: 'none', boxSizing: 'border-box',
                }}
              >
                <FaWhatsapp style={{ fontSize: '18px' }} /> Order via WhatsApp
              </motion.a>
              <a
                href="tel:8884588835"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', color: PRIMARY, fontWeight: 600, fontSize: '14px',
                  textDecoration: 'none', padding: '10px',
                  border: `1.5px solid ${PRIMARY}44`, borderRadius: '10px',
                  transition: 'background 0.2s',
                }}
              >
                <FaPhoneAlt /> Call to Order: 88845 88835
              </a>
            </div>

            {/* Medical disclaimer */}
            <div style={{
              background: '#fffbeb', border: '1px solid #fbbf24',
              borderRadius: '10px', padding: '12px 16px',
            }}>
              <p style={{ color: '#92400e', fontSize: '12px', margin: 0, lineHeight: '1.7' }}>
                ⚕️ <strong>Medical Note:</strong> This product is a complementary herbal supplement and is not a substitute for conventional cancer treatment. Please consult your oncologist before use.
              </p>
            </div>
          </div>
        </div>

        {/* ── Product Details Accordion ── */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          padding: '8px 32px', marginTop: '32px',
        }}>
          <AccordionItem title="Product Description">
            <p>{product.description}</p>
          </AccordionItem>
          <AccordionItem title="Key Benefits">
            <ul style={{ paddingLeft: '0', listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.benefits.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: PRIMARY, fontSize: '12px', marginTop: '3px', flexShrink: 0 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </AccordionItem>
          <AccordionItem title="Ingredients">
            <p>{product.ingredients}</p>
          </AccordionItem>
          <AccordionItem title="Dosage & Usage">
            <p>{product.dosage}</p>
          </AccordionItem>
          <AccordionItem title="Shipping & Returns">
            <p>✅ <strong>Free shipping</strong> on orders above ₹999.</p>
            <p>📦 Dispatched within <strong>1–2 business days</strong>. Delivered in 3–7 days across India.</p>
            <p>🔄 <strong>7-day hassle-free returns</strong> if the product is unopened and in original packaging.</p>
          </AccordionItem>
        </div>

        {/* ── You May Also Like ── */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0f172a', marginBottom: '20px', fontSize: '1.4rem' }}>
            You May Also Like
          </h2>
          <div className="pd-related">
            {products.filter(p => p.id !== product.id).slice(0, 3).map(p => (
              <motion.div
                key={p.id}
                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
                onClick={() => navigate(`/store/${p.id}`)}
                style={{
                  background: '#fff', borderRadius: '14px', overflow: 'hidden',
                  border: '1px solid #e2e8f0', cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)', transition: 'all 0.25s',
                }}
              >
                <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', position: 'relative' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: '#22c55e', color: '#fff',
                    padding: '3px 8px', borderRadius: '6px',
                    fontSize: '10px', fontWeight: 700,
                  }}>
                    {Math.round((1 - p.price / p.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <div style={{ padding: '12px 14px 14px' }}>
                  <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0 0 4px', textTransform: 'uppercase', fontWeight: 600 }}>{p.category}</p>
                  <h4 style={{ color: '#0f172a', fontSize: '14px', fontWeight: 700, margin: '0 0 8px' }}>{p.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, color: PRIMARY, fontSize: '15px' }}>₹{p.price.toLocaleString('en-IN')}</span>
                    <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '12px' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .pd-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .pd-gallery {
          display: flex;
          gap: 12px;
          position: sticky;
          top: 90px;
          align-items: start;
        }
        .pd-thumbs {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }
        .pd-main-img {
          flex: 1;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          height: 500px;
          min-height: 400px;
        }
        .pd-related {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .pd-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .pd-gallery {
            position: static;
            flex-direction: column-reverse;
          }
          .pd-main-img {
            height: 420px;
            min-height: 320px;
          }
          .pd-thumbs {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 4px;
          }
          .pd-thumbs::-webkit-scrollbar { display: none; }
          .pd-related {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .pd-main-img {
            height: 350px;
            min-height: 280px;
          }
          .pd-related {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
