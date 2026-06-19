import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar, FaShieldAlt, FaLeaf, FaCheck, FaArrowLeft,
  FaWhatsapp, FaPhoneAlt, FaShoppingBag, FaTruck,
  FaUndo, FaAward, FaChevronDown, FaChevronUp,
  FaTimes, FaPaperPlane, FaSpinner, FaCheckCircle,
} from 'react-icons/fa';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

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
      '/products/product1.jpg',

      '/products/product1.2.png',
      '/products/product1.3.png',
      // '/products/product1.4.png',
      // '/products/product1.5.png',
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
  {
    id: 6,
    name: 'Organic MCT Oil',
    category: 'Nutrition',
    price: 849,
    originalPrice: 1099,
    rating: 4.5,
    reviews: 63,
    images: [
      '/products/product6.1.jpg',
      '/products/product6.2.jpg',
      '/products/product6.3.jpg',
      '/products/product6.4.jpg',
    ],
    color: '#d97706',
    badge: null,
    tagline: 'Organic MCT fuel for energy, metabolism & cancer-related weight management.',
    description:
      'Organic MCT Oil delivers Medium Chain Triglycerides — a rapidly absorbed, clean energy source derived from organic coconut. Unlike long-chain fats, MCTs are metabolised directly by the liver, providing instant cellular fuel without relying on glucose. Specially formulated for cancer patients experiencing cachexia (treatment-related weight loss) and fatigue, this oil supports ketogenic metabolism, preserves lean muscle mass, and provides sustained energy throughout the day.',
    benefits: [
      'Rapid energy source — bypasses normal fat digestion',
      'Supports ketogenic metabolism during cancer treatment',
      'Reduces cancer-related cachexia and weight loss',
      'Preserves lean muscle mass during chemotherapy',
      'Tasteless and odourless — easy to add to food or drinks',
    ],
    ingredients: 'Organic Medium Chain Triglycerides (C8 Caprylic Acid 60%, C10 Capric Acid 40%) derived from organic coconut oil. 250ml per bottle.',
    dosage: '1 tablespoon (15ml) once or twice daily. Mix into smoothies, salads, or take directly. Start with a smaller dose and gradually increase.',
    size: '250ml bottle / 30-day supply',
    inStock: true,
  },
  {
    id: 7,
    name: 'Phytox Chlorella',
    category: 'Detox',
    price: 1199,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 87,
    images: [
      '/products/product7.1.jpg',
      '/products/product7.3.jpg',
      '/products/product7.4.jpg',
    ],
    color: '#059669',
    badge: 'New',
    tagline: 'Chlorella-powered deep detox for heavy metal chelation & immune revival.',
    description:
      'Phytox is a premium Chlorella pyrenoidosa extract developed exclusively by Cancer Herbalist for patients undergoing chemotherapy and radiation therapy. Each capsule delivers 400mg of broken cell-wall Chlorella — one of nature\'s most potent chelating agents — along with a dense nutritional profile of plant-based protein, chlorophyll, beta-glucans, and B-vitamins. Phytox binds to heavy metals and chemo metabolites, facilitating their safe excretion while simultaneously nourishing depleted cells.',
    benefits: [
      'Binds and removes heavy metals (mercury, lead, cadmium)',
      'Accelerates clearance of chemotherapy metabolites',
      'Rich in chlorophyll — alkalises blood and supports liver',
      'Contains 60% plant-based protein for muscle preservation',
      'Beta-glucans stimulate NK cell and macrophage activity',
    ],
    ingredients: 'Chlorella pyrenoidosa extract (broken cell wall) 400mg, Chlorophyll complex 20mg, Beta-glucan 15mg. Vegetarian capsule shell.',
    dosage: '2 capsules twice daily after meals with a full glass of water, or as directed by your herbalist.',
    size: '50 capsules / 25-day supply',
    inStock: true,
  },
  {
    id: 8,
    name: 'Frankincense Essential Oil',
    category: 'Essential Oils',
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviews: 74,
    images: [
      '/products/product8.0.jpg',

      '/products/product8.1.jpg',

      '/products/product8.4.jpg',
      // '/products/product8.3.jpg',
      // '/products/product8.2.jpg',
    ],
    color: '#b45309',
    badge: null,
    tagline: '100% pure Boswellia Frerana oil for therapeutic aromatherapy & topical healing.',
    description:
      'Frankincense Essential Oil is extracted from the resin of the Boswellia Frerana tree — a sacred botanical revered for millennia for its profound healing properties. This 100% pure, natural, therapeutic-grade oil is rich in boswellic acids, which are potent anti-inflammatory and anti-tumor compounds extensively studied in oncology research. FSSAI certified and manufactured by Vibes India, Bengaluru, this oil is ideal for diffusion aromatherapy to reduce anxiety, topical application (diluted) for pain relief, and as an adjunct to holistic cancer care protocols.',
    benefits: [
      'Rich in boswellic acids — potent anti-inflammatory compounds',
      'Aromatherapy reduces cancer-related anxiety and insomnia',
      'Studied for anti-tumor properties (inhibits 5-LOX pathway)',
      'Topical pain relief for radiation-induced skin irritation',
      'Calming woody aroma promotes emotional well-being',
    ],
    ingredients: '100% pure Boswellia Frerana (Frankincense) essential oil. Cold-pressed, undiluted, therapeutic grade. FSSAI Lic No: 1122332000580.',
    dosage: 'Aromatherapy: Add 3–5 drops to a diffuser. Topical: Dilute 2–3 drops in a carrier oil (coconut/jojoba) and apply to affected area. Do not ingest.',
    size: '200ml bottle',
    inStock: true,
  },
  {
    id: 9,
    name: 'MCT Powder',
    category: 'Nutrition',
    price: 999,
    originalPrice: 1399,
    rating: 4.6,
    reviews: 58,
    images: [
      '/products/product9.1.jpg',
      '/products/product9.2.jpg',
      '/products/product9.3.jpg',
    ],
    color: '#16a34a',
    badge: null,
    tagline: 'Convenient MCT powder for instant ketone energy & cancer-related weight support.',
    description:
      'MCT Powder by Cancer Herbalist delivers Medium Chain Triglycerides in a convenient, easily mixable powder form — perfect for patients who find liquid MCT oil difficult to tolerate. Derived from premium coconut and palm sources, this powder dissolves instantly in water, smoothies, or food, providing rapid ketone energy that bypasses glucose metabolism. Formulated specifically for cancer patients experiencing cachexia, treatment fatigue, and appetite loss, it supports healthy caloric intake and preserves lean body mass throughout chemotherapy and radiation therapy.',
    benefits: [
      'Convenient powder form — mixes instantly into any drink or food',
      'Rapid ketone energy without relying on glucose metabolism',
      'Supports healthy weight maintenance during cancer treatment',
      'Gentle on the stomach — better tolerated than liquid MCT oil',
      'Preserves lean muscle mass and prevents cachexia',
    ],
    ingredients: 'Medium Chain Triglycerides (from coconut & palm oil) 70%, Acacia fibre (carrier) 28%, Sunflower lecithin 2%. 200g per jar.',
    dosage: '1 scoop (approx. 7g) mixed into water, smoothie, coffee, or food, once or twice daily. Start with half a scoop and increase gradually.',
    size: '200g jar / 30-day supply',
    inStock: true,
  },
  {
    id: 10,
    name: 'OXY Forte',
    category: 'Immunity',
    price: 1099,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 52,
    images: [
      '/products/product10.jpg',
      '/products/product10.1.jpg',
      '/products/product10.2.jpg',
    ],
    color: '#e11d48',
    badge: null,
    tagline: 'Multi-action herbal capsules for cellular oxygenation & antioxidant defence.',
    description:
      'OXY Forte is a multi-action herbal capsule formulation by Vibes India, FSSAI certified, designed to enhance cellular oxygenation and fortify the body\'s antioxidant defence systems during cancer treatment. The unique blend of multi-colored capsules contains a synergistic combination of herbal extracts that work to improve oxygen delivery to tissues, neutralise free radicals generated during chemotherapy, and support mitochondrial energy production — helping patients feel more energised and resilient throughout their treatment journey.',
    benefits: [
      'Enhances cellular oxygenation and tissue perfusion',
      'Multi-herb antioxidant defence against free radical damage',
      'Supports mitochondrial energy production during treatment',
      'Reduces oxidative stress from chemotherapy and radiation',
      'FSSAI certified — manufactured to pharmaceutical standards',
    ],
    ingredients: 'Proprietary multi-herb blend including antioxidant-rich botanical extracts. FSSAI certified. Manufactured by Vibes India, Bengaluru.',
    dosage: '1 capsule of each colour twice daily after meals, or as directed by your herbalist.',
    size: '30 capsules / 15-day supply',
    inStock: true,
  },
  {
    id: 11,
    name: 'Sodium Bicarbonate',
    category: 'Alkaline Therapy',
    price: 499,
    originalPrice: 699,
    rating: 4.5,
    reviews: 45,
    images: [
      '/products/product11.0.jpg',
      '/products/product11.jpg',
      '/products/product11.1.jpg',
      '/products/product11.2.jpg',
    ],
    color: '#7c3aed',
    badge: null,
    tagline: 'Pharmaceutical-grade alkalising powder for pH balance & metabolic support.',
    description:
      'Sodium Bicarbonate by Dr Herbalist (Cancer Herbalist) is a pharmaceutical-grade alkalising powder formulated to support the body\'s natural acid-base balance. Cancer cells thrive in acidic microenvironments, and maintaining an alkaline pH can create conditions less favourable for tumor proliferation. This 100g tub provides pure, food-grade sodium bicarbonate that can be dissolved in water for daily alkaline therapy — a complementary approach used alongside conventional cancer treatment to support metabolic health and reduce treatment-related acidity.',
    benefits: [
      'Alkalises body pH — creates unfavourable conditions for cancer cells',
      'Reduces treatment-related metabolic acidosis',
      'Supports kidney function and bicarbonate buffering',
      'Relieves chemotherapy-induced nausea and acid reflux',
      'Pharmaceutical-grade purity — no additives or fillers',
    ],
    ingredients: '100% Sodium Bicarbonate (NaHCO₃), pharmaceutical/food grade. 100g per tub.',
    dosage: 'Dissolve ½ teaspoon (approx. 2.5g) in a glass of water, once daily on an empty stomach. Do not exceed recommended dose. Consult your oncologist before use.',
    size: '100g tub / 40-day supply',
    inStock: true,
  },
  {
    id: 12,
    name: 'MethiPower',
    category: 'Nutrition',
    price: 599,
    originalPrice: 799,
    rating: 4.5,
    reviews: 41,
    images: [
      '/products/product12.0.jpg',
      // '/products/product12.jpg',
      '/products/product12.1.jpg',
      '/products/product12.2.jpg',
    ],
    color: '#ca8a04',
    badge: null,
    tagline: 'Fenugreek power for blood sugar control, appetite & anti-inflammatory support.',
    description:
      'MethiPower is a 100% pure Trigonella Foenum-Graecum (Fenugreek) powder — one of Ayurveda\'s most versatile botanicals, now formulated as a dietary supplement for cancer patients. Fenugreek is rich in galactomannan fibre, saponins, and 4-hydroxyisoleucine, compounds clinically shown to regulate blood glucose, stimulate appetite, and reduce systemic inflammation. Ideal for patients experiencing chemotherapy-induced appetite loss, insulin resistance, or metabolic disruption, MethiPower can be mixed into warm water or food for easy daily consumption.',
    benefits: [
      'Regulates blood sugar — clinically proven glycaemic control',
      'Stimulates appetite in chemotherapy-induced anorexia',
      'Rich in soluble fibre — supports digestive health',
      'Anti-inflammatory saponins reduce systemic inflammation',
      'Contains iron, magnesium & B-vitamins for energy support',
    ],
    ingredients: '100% Trigonella Foenum-Graecum (Fenugreek seed) powder. 100g per jar. No additives, preservatives, or fillers.',
    dosage: '1–2 teaspoons mixed in warm water or food, once or twice daily. Can also be added to smoothies or yoghurt.',
    size: '100g jar / 30-day supply',
    inStock: true,
  },
  {
    id: 13,
    name: 'Fulvican',
    category: 'Stress & Recovery',
    price: 599,
    originalPrice: 738,
    rating: 4.8,
    reviews: 65,
    images: [
      '/products/product13.jpg',
      '/products/product13.1.jpg',
      '/products/product13.2.jpg',
    ],
    color: '#854d0e',
    badge: null,
    tagline: 'Premium Shilajit extract for cellular energy, recovery, & revitalization.',
    description:
      'Fulvican is a potent dietary supplement formulated by Cancer Herbalist, featuring 400mg of premium Asphaltum punjabianum (Shilajit) extract. Revered in Ayurveda as a profound rejuvenator, Shilajit is naturally rich in fulvic acid and trace minerals. It works at a cellular level to enhance mitochondrial energy production, combat severe fatigue, and support the body\'s natural recovery processes. Ideal for patients experiencing post-treatment exhaustion or general debility, Fulvican helps restore vitality and resilience.',
    benefits: [
      'Boosts mitochondrial function and cellular energy production',
      'Rich source of fulvic acid and over 80 trace minerals',
      'Combats severe fatigue and treatment-related exhaustion',
      'Enhances nutrient absorption at the cellular level',
      'Supports deep tissue recovery and revitalization',
    ],
    ingredients: 'Each capsule contains: Asphaltum punjabianum (Shilajit) extract - 400 mg. Standardised to contain high levels of fulvic acid. FSSAI certified.',
    dosage: '1–2 capsules per day with water or milk, preferably after meals, or as directed by your healthcare provider.',
    size: '60 capsules / 30-day supply',
    inStock: true,
  },
  {
    id: 14,
    name: 'Livocin',
    category: 'Detox',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 58,
    images: [
      '/products/product14.jpg',
      '/products/product14.1.jpg',
      '/products/product14.2.jpg',
    ],
    color: '#0d9488',
    badge: null,
    tagline: 'Hepatoprotective formulation for liver detox & immune function.',
    description:
      'Livocin is a potent hepatoprotective formulation by Cancer Herbalist, featuring 350mg of Andrographis paniculata and 50mg of Tribulus terrestris per capsule. Designed specifically for intensive liver support during and after cancer treatments, this unique blend aids in detoxifying the liver from chemotherapy residues and heavy metals. With added CAQO for enhanced bioavailability, Livocin not only protects liver cells but also stimulates the immune system, improving overall resilience and vitality.',
    benefits: [
      'Provides powerful hepatoprotective action to shield liver cells',
      'Aids in the detoxification of chemotherapy residues',
      'Stimulates and supports robust immune function',
      'Enhanced with CAQO for superior bioavailability',
      'Synergistic blend of Andrographis and Tribulus terrestris',
    ],
    ingredients: 'Each capsule contains: Andrographis paniculata extract 350mg, Tribulus terrestris extract 50mg, CAQO. FSSAI certified. Manufactured by VIBES INDIA.',
    dosage: '1 capsule daily, or as directed by your healthcare provider.',
    size: '30 capsules / 30-day supply',
    inStock: true,
  },
  {
    id: 15,
    name: 'K27 Comprehensive Care',
    category: 'Anti-Tumor',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 82,
    images: [
      '/products/product15.jpg',
      '/products/product15.1.jpg',
      '/products/product15.2.jpg',
    ],
    color: '#6b21a8',
    badge: 'Premium',
    tagline: 'Flagship synergistic formulation for comprehensive multi-pathway support.',
    description:
      'K27 is the flagship comprehensive formulation developed by Cancer Herbalist. It is a powerful, synergistic blend of premium botanicals, meticulously designed to provide multi-pathway support against tumor progression. Enhanced with our proprietary CAQO delivery system for superior bioavailability, K27 works synergistically to modulate the immune response, inhibit angiogenesis, and support cellular apoptosis. Available in capsule, liquid extract, and powder forms, it represents the pinnacle of integrated herbal oncology care.',
    benefits: [
      'Comprehensive multi-pathway support against tumor progression',
      'Enhanced with CAQO delivery system for maximum bioavailability',
      'Modulates immune response and supports natural killer (NK) cell activity',
      'Contains potent anti-angiogenic and pro-apoptotic botanical compounds',
      'Available in versatile formats (capsule, liquid, powder) for patient compliance',
    ],
    ingredients: 'Proprietary blend of synergistic anti-tumor botanicals including active CAQO complex. FSSAI certified.',
    dosage: 'Capsules: 1-2 daily. Liquid/Powder: As strictly directed by your oncology herbalist. Do not exceed recommended dosage.',
    size: '60 capsules (also available as 100ml liquid or 50g powder)',
    inStock: true,
  },
  {
    id: 16,
    name: 'Cyanolina',
    category: 'Nutrition',
    price: 699,
    originalPrice: 899,
    rating: 4.6,
    reviews: 47,
    images: [

      '/products/product16.1.jpg',
      '/products/product16.jpg',
      '/products/product16.2.jpg',
    ],
    color: '#0284c7',
    badge: null,
    tagline: 'Premium blue spirulina tablets for antioxidant & immune support.',
    description:
      'Cyanolina is a premium nutritional supplement developed by Cancer Herbalist, providing 500mg of highly purified Spirulina per tablet. Specially selected for its high Phycocyanin (blue spirulina) content, Cyanolina delivers exceptional antioxidant properties that help neutralize free radicals generated during intensive therapies. This dense superfood is also rich in essential amino acids, B-vitamins, and trace minerals, offering comprehensive nutritional support to boost immune function and maintain vitality throughout the healing journey.',
    benefits: [
      'Rich in Phycocyanin, providing powerful antioxidant protection',
      'Helps neutralize free radicals associated with cancer treatments',
      'Boosts immune system function and overall vitality',
      'Dense source of bioavailable plant protein and essential amino acids',
      'Provides crucial B-vitamins and trace minerals for cellular health',
    ],
    ingredients: 'Each tablet contains: Extract of Spirulina - 500mg. High Phycocyanin content. FSSAI certified. Manufactured by VIBES INDIA.',
    dosage: '1–2 tablets daily with water, or as directed by your healthcare provider.',
    size: '60 blue tablets / 30-day supply',
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
            }}>
              <img
                src={product.images[0]} alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px', boxSizing: 'border-box' }}
              />
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
                onClick={() => setEnquiryOpen(true)}
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
                <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', position: 'relative' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

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
