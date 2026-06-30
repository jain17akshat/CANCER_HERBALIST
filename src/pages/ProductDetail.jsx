import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar, FaShieldAlt, FaLeaf, FaCheck, FaArrowLeft,
  FaWhatsapp, FaPhoneAlt, FaShoppingBag, FaTruck,
  FaUndo, FaAward, FaChevronDown, FaChevronUp,
  FaTimes, FaPaperPlane, FaSpinner, FaCheckCircle, FaHeart, FaRegHeart, FaShoppingCart
} from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';

// ── Shared product data (must match Store.jsx) ─────────────────────────────
export const products = [
  {
    id: 1,
    name: 'Cap CH95 (30Cap)',
    category: 'Immunity',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 124,
    images: [
      '/products/product1.jpg',
      '/products/product1.2.png',
      '/products/product1.3.png',
    ],
    color: '#38bed5',
    icon: '🌿',
    badge: 'Best Seller',
    tagline: 'Premium immunity support capsule for cellular defense and resilience.',
    description: 'Cap CH95 is a specialized herbal formulation designed to bolster the body\'s immune system, enhance cellular resilience, and combat chronic fatigue during intensive clinical treatments. Rich in natural immunomodulators and antioxidants, it supports general vitality and wellness.',
    benefits: [
      'Boosts natural killer (NK) cell activity',
      'Protects cells from oxidative damage',
      'Helps reduce post-treatment fatigue',
      'Supports white blood cell count restoration',
    ],
    ingredients: 'Tinospora Cordifolia (Giloy) 250mg, Ocimum Sanctum (Tulsi) 200mg, Withania Somnifera (Ashwagandha) 150mg.',
    dosage: '1 capsule twice daily after meals, or as advised by your healthcare specialist.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 2,
    name: 'C3M Powder',
    category: 'Nutrition',
    price: 2599,
    originalPrice: 3299,
    rating: 4.9,
    reviews: 98,
    images: [
      '/products/product9.1.jpg',
      '/products/product9.2.jpg',
      '/products/product9.3.jpg',
    ],
    color: '#f59e0b',
    icon: '🟡',
    badge: 'Top Rated',
    tagline: 'High-absorption Curcumin & MCT blend for advanced nutritional therapy.',
    description: 'C3M Powder combines premium Medium Chain Triglycerides (MCT) with highly bioavailable Curcumin (standardized to 95% curcuminoids). This synergistic formulation provides readily absorbable calories while delivering powerful anti-inflammatory and cellular protection support.',
    benefits: [
      'High-bioavailability Curcumin (95% curcuminoids)',
      'Rapid energy source via MCTs without glucose spikes',
      'Supports healthy anti-inflammatory pathways',
      'Preserves lean muscle mass and combats weight loss',
    ],
    ingredients: 'Coconut-derived MCT Powder 70%, Curcuma Longa extract (95% curcuminoids) 25%, Piperine 5%.',
    dosage: '1 scoop (approx. 10g) mixed into warm water, milk, or smoothies daily.',
    size: '200g jar / 20-day supply',
    inStock: true,
  },
  {
    id: 3,
    name: 'CUP Powder',
    category: 'Alkaline Therapy',
    price: 2299,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 76,
    images: [
      '/products/product11.0.jpg',
      '/products/product11.jpg',
      '/products/product11.1.jpg',
    ],
    color: '#10b981',
    icon: '🍃',
    badge: null,
    tagline: 'Advanced alkalizing blend to support healthy metabolic pH balance.',
    description: 'CUP Powder is a pharmaceutical-grade alkalizing formula designed to buffer cellular acidity and support metabolic pH balance. Restoring an optimal alkaline environment helps normalize cellular metabolism and supports overall recovery.',
    benefits: [
      'Supports optimal metabolic pH buffering',
      'Alkalizes the cellular microenvironment naturally',
      'Aids kidney function and metabolic detoxification',
      'Pharmaceutical-grade purity for maximum safety and absorption',
    ],
    ingredients: 'Purified Sodium Bicarbonate, Potassium Citrate, and alkaline mineral buffers.',
    dosage: '½ teaspoon dissolved in a glass of water daily on an empty stomach, or as directed by your doctor.',
    size: '250g tub / 50-day supply',
    inStock: true,
  },
  {
    id: 4,
    name: 'Cap Withangen (30Cap)',
    category: 'Stress & Recovery',
    price: 799,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 89,
    images: [
      '/products/product4.1.jpg',
      '/products/product4.2.jpg',
      '/products/product4.3.jpg',
    ],
    color: '#8b5cf6',
    icon: '🌱',
    badge: null,
    tagline: 'Standardized Ashwagandha adaptogen for stress defense and sleep support.',
    description: 'Cap Withangen features high-potency Withania Somnifera (Ashwagandha) extract standardized for maximum withanolide content. It targets the HPA axis to normalize cortisol levels, reduce anxiety, and improve sleep quality during recovery.',
    benefits: [
      'Modulates cortisol levels to combat stress',
      'Improves sleep latency and overall sleep quality',
      'Enhances stamina and reduces physical fatigue',
      'Supports cognitive function, memory, and focus',
    ],
    ingredients: 'Withania Somnifera (Ashwagandha KSM-66®) extract standardized to 5% withanolides 500mg.',
    dosage: '1 capsule twice daily, preferably with warm milk or water after meals.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 5,
    name: 'Cap AC95 (30Cap)',
    category: 'Anti-Tumor',
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 142,
    images: [
      '/products/product2.1.png',
      '/products/product2.2.jpg',
      '/products/product2.3.jpg',
    ],
    color: '#0f3460',
    icon: '💊',
    badge: 'Premium',
    tagline: 'Ultra-pure Active Curcumin 95% for targeted anti-inflammatory defense.',
    description: 'Cap AC95 delivers pharmaceutical-grade Active Curcumin standardized to 95% curcuminoids, enhanced with black pepper extract to maximize cellular absorption. It acts as a powerful anti-inflammatory and supports healthy cell proliferation pathways.',
    benefits: [
      'Targets NF-kB and critical inflammatory pathways',
      'Provides powerful cellular antioxidant defense',
      'Supports healthy tissue regeneration and recovery',
      'BioPerine-enhanced for 2000% higher cellular absorption',
    ],
    ingredients: 'Curcuma Longa extract (95% curcuminoids) 500mg, BioPerine® (Piper Nigrum extract) 5mg.',
    dosage: '1 capsule twice daily with meals.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 6,
    name: 'Cap Livocin (30Cap)',
    category: 'Detox',
    price: 2199,
    originalPrice: 2799,
    rating: 4.7,
    reviews: 58,
    images: [
      '/products/product14.jpg',
      '/products/product14.1.jpg',
      '/products/product14.2.jpg',
    ],
    color: '#d97706',
    icon: '🫒',
    badge: null,
    tagline: 'Potent hepatoprotective formula for liver detox and digestive care.',
    description: 'Cap Livocin is formulated with hepatoprotective botanicals like Andrographis Paniculata and Tribulus Terrestris. It aids in clearing toxic metabolites, supporting liver enzyme normalization, and promoting healthy digestion during therapy.',
    benefits: [
      'Supports liver enzyme (ALT/AST) normalization',
      'Aids clearance of clinical chemical residues and toxins',
      'Promotes healthy digestion, appetite, and gut lining',
      'Protects liver cells from oxidative stress and free radicals',
    ],
    ingredients: 'Andrographis Paniculata extract 350mg, Tribulus Terrestris extract 50mg, CAQO bio-enhancer.',
    dosage: '1 capsule twice daily after meals.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 7,
    name: 'Cap Fulvican (30Cap)',
    category: 'Stress & Recovery',
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 65,
    images: [
      '/products/product13.jpg',
      '/products/product13.1.jpg',
      '/products/product13.2.jpg',
    ],
    color: '#059669',
    icon: '🟢',
    badge: 'New',
    tagline: 'Premium purified Shilajit extract rich in Fulvic Acid for cellular energy.',
    description: 'Cap Fulvican features purified Asphaltum Punjabianum (Shilajit) extract rich in fulvic acid and essential trace minerals. It works at the mitochondrial level to rejuvenate energy production, enhance nutrient uptake, and speed up tissue recovery.',
    benefits: [
      'Boosts mitochondrial ATP energy production',
      'Rich source of fulvic acid and over 80 trace minerals',
      'Improves overall cellular nutrient and mineral absorption',
      'Alleviates deep exhaustion and promotes physical recovery',
    ],
    ingredients: 'Purified Asphaltum Punjabianum (Shilajit) extract 400mg (high fulvic acid content).',
    dosage: '1 capsule daily in the morning with warm water or milk, or as directed.',
    size: '30 capsules / 30-day supply',
    inStock: true,
  },
  {
    id: 8,
    name: 'Frank Oil 100ml',
    category: 'Essential Oils',
    price: 1599,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 74,
    images: [
      '/products/product8.jpg',
      '/products/product8.1.jpg',
      '/products/product8.4.jpg',
    ],
    color: '#b45309',
    icon: '🫙',
    badge: null,
    tagline: '100% pure Boswellia Frerana oil for therapeutic aromatherapy and massage.',
    description: 'Frank Oil is a premium, therapeutic-grade Frankincense (Boswellia Frerana) essential oil. High in natural boswellic acids, it is ideal for soothing aromatherapy, stress relief, and topical application (diluted) to ease discomfort and inflammation.',
    benefits: [
      'Rich in active anti-inflammatory boswellic acids',
      'Promotes relaxation and reduces nervous tension or anxiety',
      'Soothes skin and supports tissue repair when diluted topically',
      '100% pure steam-distilled essential oil, free of synthetic additives',
    ],
    ingredients: '100% Pure Boswellia Frerana (Frankincense) essential oil. FSSAI certified.',
    dosage: 'Aromatherapy: Add 3–5 drops to a diffuser. Topical: Dilute with a carrier oil (e.g. coconut oil) and massage gently.',
    size: '100ml bottle',
    inStock: true,
  },
  {
    id: 9,
    name: 'Tab Cyanolina (60Tab)',
    category: 'Nutrition',
    price: 599,
    originalPrice: 799,
    rating: 4.6,
    reviews: 47,
    images: [
      '/products/product16.1.jpg',
      '/products/product16.jpg',
      '/products/product16.2.jpg',
    ],
    color: '#16a34a',
    icon: '🥥',
    badge: null,
    tagline: 'Blue Spirulina extract rich in Phycocyanin for antioxidant support.',
    description: 'Tab Cyanolina provides premium Spirulina tablets standardized for high Phycocyanin content. This blue superfood offers exceptional antioxidant defense, aids cell renewal, and supplies essential amino acids and trace minerals.',
    benefits: [
      'Rich in Phycocyanin, a powerful blue antioxidant compound',
      'Supports red blood cell production and oxygen transport',
      'Supplies essential plant-based proteins, amino acids, and B-vitamins',
      'Promotes natural cellular detoxification and immune defense',
    ],
    ingredients: 'Purified Spirulina Platensis extract 500mg. FSSAI certified.',
    dosage: '2 tablets daily with water, preferably in the morning.',
    size: '60 tablets / 30-day supply',
    inStock: true,
  },
  {
    id: 10,
    name: 'Tab Phytox (60Tab)',
    category: 'Detox',
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 87,
    images: [
      '/products/product7.1.jpg',
      '/products/product7.3.jpg',
      '/products/product7.4.jpg',
    ],
    color: '#e11d48',
    icon: '💊',
    badge: null,
    tagline: 'Broken cell-wall Chlorella for heavy metal chelation & deep detox.',
    description: 'Tab Phytox features organic broken cell-wall Chlorella Pyrenoidosa. It is engineered to naturally bind and safely eliminate heavy metals, toxins, and drug metabolites from the body while restoring essential trace nutrition.',
    benefits: [
      'Binds heavy metals and environmental toxins for safe excretion',
      'Supports natural liver and kidney detoxification pathways',
      'Rich in natural chlorophyll, beta-glucans, and protein',
      'Provides comprehensive cellular nutrient replenishment and energy',
    ],
    ingredients: 'Chlorella Pyrenoidosa (broken cell wall) 400mg, chlorophyll buffers.',
    dosage: '2 tablets twice daily after meals with a full glass of water.',
    size: '60 tablets / 15-day supply',
    inStock: true,
  },
  {
    id: 11,
    name: 'Quinoil',
    category: 'Nutrition',
    price: 1199,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 63,
    images: [
      '/products/product6.1.jpg',
      '/products/product6.2.jpg',
      '/products/product6.3.jpg',
    ],
    color: '#7c3aed',
    icon: '⚗️',
    badge: null,
    tagline: 'Premium bioactive lipid complex for cellular energy and weight support.',
    description: 'Quinoil is a premium organic lipid blend formulated to provide a concentrated, easily metabolized energy source. Formulated for recovery support, it helps preserve muscle mass and supports ketogenesis without causing blood sugar spikes.',
    benefits: [
      'Provides clean, rapid cellular energy bypassing glucose pathway',
      'Supports ketogenic metabolism during intensive clinical recovery',
      'Helps prevent muscle wasting and treatment-related cachexia',
      'Mild, neutral taste—easy to mix with food, salads, or smoothies',
    ],
    ingredients: 'Medium Chain Triglycerides (C8/C10 lipids) derived from organic coconut oil.',
    dosage: '1 tablespoon (15ml) daily mixed into food, salad dressings, or smoothies.',
    size: '250ml bottle',
    inStock: true,
  },
  {
    id: 12,
    name: 'Anacose Powder',
    category: 'Nutrition',
    price: 1599,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 41,
    images: [
      '/products/product12.0.jpg',
      '/products/product12.1.jpg',
      '/products/product12.2.jpg',
    ],
    color: '#ca8a04',
    icon: '🌾',
    badge: null,
    tagline: 'Nutrient-dense herbal powder for digestive and appetite restoration.',
    description: 'Anacose Powder is a proprietary dietary supplement designed to stimulate appetite, improve digestion, and reduce treatment-related nausea. Its blend of traditional herbs helps the body absorb vital nutrients efficiently during recovery.',
    benefits: [
      'Restores appetite and reduces treatment-induced nausea',
      'Improves overall gastrointestinal health and gut lining stability',
      'Supports nutrient absorption and systemic energy balance',
      'Rich in natural fibers, minerals, and digestive enzymes',
    ],
    ingredients: 'Trigonella Foenum-Graecum (Fenugreek) extract, Zingiber Officinale (Ginger) extract, Elettaria Cardamomum.',
    dosage: '1 scoop (5g) mixed in warm water twice daily before meals.',
    size: '150g jar / 30-day supply',
    inStock: true,
  },
  {
    id: 13,
    name: 'Methicon',
    category: 'Nutrition',
    price: 999,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 38,
    images: [],
    color: '#854d0e',
    icon: '🌾',
    badge: null,
    tagline: 'Purified Methi extract for glycemic regulation and cellular defense.',
    description: 'Methicon is a purified, standardised extract made from Trigonella foenum-graecum (Methi) designed to effectively lower blood sugar levels, limiting the glucose-rich environment that fuels cancer growth, multiplication, and spread. Standardised to Glucomannan, this bioactive glycoside acts on key metabolic organs to stabilise glucose levels, giving the body a stronger, healthier platform to fight cancer without conventional metabolic side effects.',
    benefits: [
      'Lowers blood sugar levels to restrict abnormal cellular growth and replication',
      'Inhibits glucose pathways that fuel cancer cell multiplication and spread',
      'Standardised to Glucomannan for organ-level glycemic and metabolic stability',
      'Supports healthy insulin sensitivity and immune health without side effects',
    ],
    ingredients: 'Purified standardised extract of Trigonella foenum-graecum (Methi) (standardised to Glucomannan).',
    dosage: '1 capsule twice daily after meals with water.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 14,
    name: 'Cap K27 (30Cap)',
    category: 'Anti-Tumor',
    price: 2699,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 82,
    images: [
      '/products/product15.jpg',
      '/products/product15.1.jpg',
      '/products/product15.2.jpg',
    ],
    color: '#0d9488',
    icon: '🌿',
    badge: 'Premium',
    tagline: 'Flagship multi-pathway botanical defense capsule.',
    description: 'Cap K27 is a flagship formulation delivering a synergistic blend of anti-tumor botanicals designed to inhibit abnormal angiogenesis, stimulate cellular apoptosis, and support immune cell surveillance. Enhanced with the bio-active CAQO complex.',
    benefits: [
      'Comprehensive multi-pathway tumor defense and cellular protection',
      'Inhibits angiogenesis (blood supply formation to abnormal cells)',
      'Promotes normal healthy cell apoptosis and cycle regulation',
      'Enhanced with CAQO complex for maximum cellular bioavailability',
    ],
    ingredients: 'Proprietary K27 botanical complex (Curcumin, Boswellia, Ashwagandha), CAQO absorption enhancer.',
    dosage: '1-2 capsules daily as strictly directed by your oncology herbal specialist.',
    size: '30 capsules / 30-day supply',
    inStock: true,
  },
  {
    id: 15,
    name: 'Cap Oxy95 (30Cap)',
    category: 'Immunity',
    price: 3299,
    originalPrice: 4199,
    rating: 4.6,
    reviews: 52,
    images: [
      '/products/product3.1.jpg',
      '/products/product3.2.jpg',
      '/products/product3.3.jpg',
    ],
    color: '#6b21a8',
    icon: '🔮',
    badge: 'Premium',
    tagline: 'Oxygenation support formula for cellular energy and immune strength.',
    description: 'Cap Oxy95 is designed to support healthy cellular respiration and oxygenation. By promoting optimal oxygen delivery at the tissue level, it enhances cellular mitochondrial efficiency, boosts immune response, and fights extreme fatigue.',
    benefits: [
      'Supports optimal tissue oxygenation and respiration efficiency',
      'Enhances mitochondrial energy production and ATP synthesis',
      'Combats severe chronic treatment fatigue and weakness',
      'Boosts overall immune cellular activity and resistance',
    ],
    ingredients: 'Oxygen-coordinating organic herbal extracts, Cordyceps Sinensis extract.',
    dosage: '1 capsule twice daily after meals.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 16,
    name: 'Cap OxyForte (30Cap)',
    category: 'Immunity',
    price: 3999,
    originalPrice: 4999,
    rating: 4.6,
    reviews: 54,
    images: [
      '/products/product10.jpg',
      '/products/product10.1.jpg',
      '/products/product10.2.jpg',
    ],
    color: '#0284c7',
    icon: '🌊',
    badge: 'Premium',
    tagline: 'Maximum strength cellular oxygenation and defense formula.',
    description: 'Cap OxyForte is our maximum-strength cellular oxygenation formulation. Engineered for patients requiring advanced support, it works synergistically to elevate cellular energy, optimize blood oxygen transport, and defend cells against oxidative stress.',
    benefits: [
      'Advanced cellular oxygenation and tissue perfusion support',
      'Protects cells from intensive therapeutic oxidative stress',
      'Supports red blood cell function and systemic oxygen delivery',
      'Strengthens immune cell modulation and defense mechanisms',
    ],
    ingredients: 'Concentrated organic oxygenators, proprietary botanical cell-defense blend.',
    dosage: '1 capsule twice daily after meals.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 17,
    name: 'Cap PSP (30Cap)',
    category: 'Immunity',
    price: 1399,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 64,
    images: [],
    color: '#ec4899',
    icon: '🌸',
    badge: null,
    tagline: 'Polysaccharide-Peptide formulation for deep immune system modulation.',
    description: 'Cap PSP features purified Polysaccharide-Peptide (PSP) extracts derived from Coriolus Versicolor (Turkey Tail mushroom). Widely researched in oncology, PSP is a potent immunomodulator that supports T-cell and NK-cell counts during clinical therapies.',
    benefits: [
      'Modulates and strengthens the immune response',
      'Supports T-lymphocyte and Natural Killer (NK) cell populations',
      'Helps mitigate severe side effects of conventional treatments',
      'FSSAI certified, highly researched botanical immune support',
    ],
    ingredients: 'Coriolus Versicolor (Turkey Tail) extract standardized to 40% polysaccharides 500mg.',
    dosage: '1 capsule twice daily after meals with water.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 18,
    name: '3C (30Cap)',
    category: 'Anti-Tumor',
    price: 1799,
    originalPrice: 2299,
    rating: 4.8,
    reviews: 79,
    images: [
      '/products/product5.1.jpg',
      '/products/product5.2.jpg',
      '/products/product5.3.jpg',
    ],
    color: '#f43f5e',
    icon: '⚡',
    badge: null,
    tagline: 'Triple-action botanical complex targeting abnormal cell pathways.',
    description: '3C is a triple-action formulation combining three of the most researched anti-tumor herbs in integrative herbal medicine. It works synergistically to inhibit abnormal cell signaling, support healthy cell cycle regulation, and reduce chronic inflammation.',
    benefits: [
      'Synergistic triple-herb anti-tumor pathway support',
      'Aids in healthy cell cycle regulation and cellular protection',
      'Helps suppress major systemic inflammatory markers (TNF-alpha, IL-6)',
      'Works safely alongside conventional treatment protocols to enhance outcomes',
    ],
    ingredients: 'Curcuma Longa extract (standardized curcuminoids 95%), Green Tea Extract (EGCG 50%), Boswellia Serrata extract.',
    dosage: '1 capsule twice daily after meals.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 19,
    name: 'Tab BLOO',
    category: 'Anti-Tumor',
    price: 3740,
    originalPrice: 4690,
    rating: 4.9,
    reviews: 110,
    images: [],
    color: '#3b82f6',
    icon: '💎',
    badge: 'Premium',
    tagline: 'Specialized bio-active formulation for comprehensive oncology support.',
    description: 'Tab BLOO is a premium, high-potency tablet formulation developed by Cancer Herbalist for advanced complementary support. Combining rare botanical extracts and active phyto-nutrients, it promotes healthy cell signaling, cellular detoxification, and robust immune defenses.',
    benefits: [
      'Advanced bio-active cellular defense and signaling formula',
      'Promotes healthy cellular signaling and programmed cell death (apoptosis)',
      'Encourages deep tissue detoxification and metabolic clearance',
      'Supports systemic defense, patient recovery, and general vitality',
    ],
    ingredients: 'Proprietary oncology-support phyto-nutrient complex, rare organic botanical extracts, bio-enhancers.',
    dosage: '1 tablet daily after breakfast, or as recommended by your healthcare specialist.',
    size: '30 tablets / 30-day supply',
    inStock: true,
  },
];

function StarRating({ rating, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(n => (
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

// ── Enquiry Modal ────────────────────────────────────────────────────────────
function EnquiryModal({ product, onClose }) {
  const ACCENT = '#38bed5';
  const PRIMARY = '#1a6e52';

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    message: `Hi, I am interested in ${product.name} (₹${product.price.toLocaleString('en-IN')}). Please share more details.`,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.phone.trim()) return 'Please enter your phone number.';
    if (!form.email.trim()) return 'Please enter your email address.';
    return null;
  };

  const handleEmailSend = async () => {
    const err = validate();
    if (err) { setErrorMsg(err); return; }
    setErrorMsg('');
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key:       WEB3FORMS_KEY,
          subject:          `🌿 Product Enquiry — ${product.name}`,
          from_name:        form.name,
          email:            form.email,   // Web3Forms uses this as reply-to
          // ── Fields that appear in the email body ──
          'Customer Name':    form.name,
          'Customer Phone':   form.phone,
          'Customer Email':   form.email,
          'Product':          product.name,
          'Category':         product.category,
          'Price':            `₹${product.price.toLocaleString('en-IN')}`,
          'Message':          form.message || 'No additional message.',
          'Product URL':      `${window.location.origin}/store/${product.id}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
      setErrorMsg('Failed to send. Please try WhatsApp below.');
    }
  };

  const waText = encodeURIComponent(
    `Hi, I am interested in *${product.name}* (₹${product.price.toLocaleString('en-IN')}).\n` +
    (form.name ? `Name: ${form.name}\n` : '') +
    (form.phone ? `Phone: ${form.phone}\n` : '') +
    `\n${form.message}`
  );

  const inStyle = {
    width: '100%', padding: '12px 16px', marginBottom: '14px',
    border: '1.5px solid #e2e8f0', borderRadius: '10px',
    fontSize: '14px', outline: 'none', background: '#f8fafc',
    color: '#0f172a', boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif', transition: 'border-color 0.2s',
  };
  const focus = (e) => (e.target.style.borderColor = ACCENT);
  const blur = (e) => (e.target.style.borderColor = '#e2e8f0');

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(10,20,40,0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        {/* Modal card */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#fff', borderRadius: '24px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
            width: '100%', maxWidth: '480px',
            maxHeight: '92vh', overflowY: 'auto',
            position: 'relative',
          }}
        >
          {/* ── Close button ── */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: '#f1f5f9', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748b', fontSize: '16px', zIndex: 10,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}
          >
            <FaTimes />
          </button>

          {/* ── Product Banner ── */}
          <div style={{
            background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)`,
            borderRadius: '24px 24px 0 0',
            padding: '28px 28px 22px',
            display: 'flex', gap: '16px', alignItems: 'center',
          }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.3)',
              overflow: 'hidden', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {product.images?.[0] ? (
                <img
                  src={product.images[0]} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px', boxSizing: 'border-box' }}
                />
              ) : (
                <span style={{ fontSize: '32px' }}>{product.icon}</span>
              )}
            </div>
            <div>
              <p style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px'
              }}>
                Product Enquiry
              </p>
              <h3 style={{
                color: '#fff', fontFamily: 'Playfair Display, serif',
                fontSize: '1.15rem', margin: '0 0 6px', lineHeight: 1.3
              }}>
                {product.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.55)', fontSize: '13px',
                  textDecoration: 'line-through'
                }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>

              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ padding: '28px' }}>

            {status === 'success' ? (
              /* ── Success state ── */
              <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: `${ACCENT}18`, border: `3px solid ${ACCENT}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: '32px', color: ACCENT,
                }}>
                  <FaCheckCircle />
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif', color: '#0f172a',
                  fontSize: '1.4rem', marginBottom: '10px'
                }}>
                  Enquiry Sent! 🌿
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '8px' }}>
                  A confirmation has been sent to{' '}
                  <strong style={{ color: ACCENT }}>{form.email}</strong>.
                </p>
                <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '24px' }}>
                  Our team will contact you at <strong>{form.phone}</strong> within 24 hours.
                </p>
                {/* WhatsApp follow-up */}
                <a
                  href={`https://wa.me/918884588835?text=${waText}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: '#25d366', color: '#fff',
                    padding: '12px 24px', borderRadius: '12px',
                    textDecoration: 'none', fontWeight: 700, fontSize: '14px',
                  }}
                >
                  <FaWhatsapp style={{ fontSize: '18px' }} /> Also message on WhatsApp
                </a>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <p style={{
                  color: '#64748b', fontSize: '13.5px', lineHeight: 1.7,
                  marginBottom: '20px', marginTop: 0
                }}>
                  Fill in your details and we'll get back to you within 24 hours.
                </p>

                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: 700,
                  color: '#334155', marginBottom: '6px', textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Full Name *</label>
                <input
                  type="text" name="name" placeholder="e.g. Rahul Sharma"
                  value={form.name} onChange={handleChange}
                  style={inStyle} onFocus={focus} onBlur={blur}
                />

                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: 700,
                  color: '#334155', marginBottom: '6px', textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Phone Number *</label>
                <input
                  type="tel" name="phone" placeholder="+91 98765 43210"
                  value={form.phone} onChange={handleChange}
                  style={inStyle} onFocus={focus} onBlur={blur}
                />

                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: 700,
                  color: '#334155', marginBottom: '6px', textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Email Address *</label>
                <input
                  type="email" name="email" placeholder="your@email.com"
                  value={form.email} onChange={handleChange}
                  style={inStyle} onFocus={focus} onBlur={blur}
                />

                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: 700,
                  color: '#334155', marginBottom: '6px', textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Message</label>
                <textarea
                  name="message" rows={3}
                  value={form.message} onChange={handleChange}
                  style={{ ...inStyle, resize: 'vertical' }}
                  onFocus={focus} onBlur={blur}
                />

                {(errorMsg || status === 'error') && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>
                    ⚠ {errorMsg || 'Something went wrong. Try WhatsApp below.'}
                  </p>
                )}

                {/* ── Dual CTA ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>

                  {/* Email send */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleEmailSend}
                    disabled={status === 'sending'}
                    style={{
                      width: '100%', padding: '15px',
                      background: status === 'sending'
                        ? '#94a3b8'
                        : `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                      color: '#fff', border: 'none', borderRadius: '12px',
                      fontWeight: 700, fontSize: '14px', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', fontFamily: 'inherit',
                      boxShadow: status !== 'sending' ? `0 6px 20px ${ACCENT}44` : 'none',
                    }}
                  >
                    {status === 'sending'
                      ? <><FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Sending Enquiry…</>
                      : <><FaPaperPlane /> Send Enquiry via Email</>
                    }
                  </motion.button>

                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                    <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                  </div>

                  {/* WhatsApp */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/918884588835?text=${waText}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      width: '100%', padding: '14px',
                      background: '#25d366',
                      color: '#fff', borderRadius: '12px',
                      fontWeight: 700, fontSize: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', textDecoration: 'none', boxSizing: 'border-box',
                    }}
                  >
                    <FaWhatsapp style={{ fontSize: '18px' }} /> Enquire via WhatsApp
                  </motion.a>

                  {/* Call */}
                  <a
                    href="tel:8884588835"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', color: PRIMARY, fontWeight: 600, fontSize: '13px',
                      textDecoration: 'none', padding: '10px',
                      border: `1.5px solid ${PRIMARY}44`, borderRadius: '10px',
                    }}
                  >
                    <FaPhoneAlt /> Call Us: 88845 88835
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!product) return;

    // 1. Update Title
    const pageTitle = `${product.name} | Integrative Cancer Support | Cancer Herbalist Store`;
    document.title = pageTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', product.description);

    // 3. Update OG Tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', product.description);
    updateOGTag('og:url', window.location.href);
    if (product.images && product.images.length > 0) {
      updateOGTag('og:image', `${window.location.origin}${product.images[0]}`);
    }

    // 4. Inject Product Schema Markup
    const existingScript = document.getElementById('seo-schema-markup');
    if (existingScript) {
      existingScript.remove();
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'image': product.images && product.images.length > 0 ? `${window.location.origin}${product.images[0]}` : '',
      'description': product.description,
      'category': product.category,
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'INR',
        'price': product.price,
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'url': window.location.href,
        'priceValidUntil': '2027-12-31'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': product.rating,
        'reviewCount': product.reviews
      }
    };

    const script = document.createElement('script');
    script.id = 'seo-schema-markup';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const scriptToRemove = document.getElementById('seo-schema-markup');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

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
              {product.images && product.images.map((img, i) => (
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
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

              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: '12px', boxSizing: 'border-box' }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${product.color}15, ${product.color}35)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '96px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}>{product.icon}</span>
                </div>
              )}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>

              {/* Primary Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product, 1)}
                  style={{
                    flex: 1, padding: '16px 12px',
                    background: '#f8fafc',
                    color: PRIMARY, border: `2px solid ${PRIMARY}`, borderRadius: '12px',
                    fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                >
                  <FaShoppingCart style={{ fontSize: '16px' }} /> Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/checkout', { state: { product, qty: 1 } })}
                  style={{
                    flex: 1, padding: '16px 12px',
                    background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', fontFamily: 'inherit',
                    boxShadow: `0 8px 20px ${ACCENT}40`,
                    transition: 'all 0.2s',
                  }}
                >
                  <FaShoppingBag style={{ fontSize: '16px' }} /> Buy Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleWishlist(product.id)}
                  style={{
                    width: '56px', background: '#fff', border: '2px solid #e2e8f0',
                    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: isInWishlist(product.id) ? '#ef4444' : '#64748b',
                    fontSize: '22px', transition: 'all 0.2s'
                  }}
                  title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                </motion.button>
              </div>

              {/* Secondary Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEnquiryOpen(true)}
                  style={{
                    padding: '14px',
                    background: '#f8fafc',
                    color: PRIMARY, border: `1.5px solid ${PRIMARY}`, borderRadius: '12px',
                    fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'inherit',
                    transition: 'background 0.2s',
                  }}
                >
                  Enquire
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/918884588835?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(₹${product.price})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '14px',
                    background: '#25d366',
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', textDecoration: 'none', boxSizing: 'border-box',
                    boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
                  }}
                >
                  <FaWhatsapp style={{ fontSize: '16px' }} /> WhatsApp
                </motion.a>
              </div>
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

            {/* Appearance disclaimer */}
            <div style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start',
              background: '#f8fafc', border: '1px dashed #cbd5e1',
              borderRadius: '10px', padding: '11px 14px', marginTop: '10px',
            }}>
              <span style={{ fontSize: '16px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>🎨</span>
              <p style={{ color: '#64748b', fontSize: '11.5px', margin: 0, lineHeight: '1.75' }}>
                <strong style={{ color: '#475569' }}>Appearance Note:</strong>{' '}
                Product colour, packaging, or label design may vary slightly from the images shown — a natural result of batch-to-batch sourcing of premium botanicals.
                Rest assured, the <strong style={{ color: PRIMARY }}>formulation, potency, and therapeutic efficacy remain exactly the same</strong> in every batch.
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
                <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', position: 'relative', background: '#f8fafc' }}>
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${p.color}18, ${p.color}38)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '48px' }}>{p.icon}</span>
                    </div>
                  )}
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
            flex-direction: column;
          }
          .pd-main-img {
            height: 320px;
            min-height: 260px;
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
            height: 280px;
            min-height: 220px;
          }
          .pd-thumbs > div {
            width: 56px !important;
            height: 56px !important;
          }
          .pd-related {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Enquiry Modal */}
      {enquiryOpen && product && (
        <EnquiryModal product={product} onClose={() => setEnquiryOpen(false)} />
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
