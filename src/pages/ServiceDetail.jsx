import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaRibbon, FaLungs, FaAppleAlt, FaHeartbeat, FaRegHospital, FaTint,
  FaArrowLeft, FaLeaf, FaCheckCircle, FaFlask, FaShieldAlt, FaUserMd
} from 'react-icons/fa';

const ACCENT = '#38bed5';

const servicesData = {
  'breast-cancer': {
    icon: <FaRibbon />,
    title: 'Breast Cancer Support',
    subtitle: 'Holistic Herbal Care for Breast Health & Recovery',
    heroImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1600&q=80',
    overview: `Breast cancer is the most common cancer among women worldwide. At Cancer Herbalist, we offer a comprehensive herbal support program designed to work alongside your conventional medical treatment. Our protocols are built on decades of clinical herbal medicine experience and are tailored to each patient's unique hormonal, metabolic, and emotional profile.`,
    howWeHelp: [
      'Hormone regulation using phytoestrogenic and adaptogenic herbs',
      'Immune system strengthening to support the body\'s natural defenses',
      'Reducing chemotherapy and radiation side effects naturally',
      'Anti-inflammatory botanical blends to reduce systemic inflammation',
      'Liver detoxification support for medication processing',
      'Emotional wellbeing support through nervine and adaptogenic herbs',
    ],
    keyHerbs: [
      { name: 'Turmeric (Curcumin)', benefit: 'Potent anti-inflammatory and anti-tumor properties' },
      { name: 'Ashwagandha', benefit: 'Reduces stress hormones and supports immune function' },
      { name: 'Green Tea Extract', benefit: 'Rich in EGCG, shown to inhibit cancer cell proliferation' },
      { name: 'Milk Thistle', benefit: 'Protects and regenerates liver cells during treatment' },
      { name: 'Flaxseed', benefit: 'Contains lignans that help regulate estrogen metabolism' },
      { name: 'Reishi Mushroom', benefit: 'Powerful immune modulator and adaptogen' },
    ],
    process: [
      { step: '01', title: 'Intake Assessment', desc: 'Complete health history, current medications, and cancer staging review.' },
      { step: '02', title: 'Personalized Formula', desc: 'Custom herbal blend crafted based on your unique health profile.' },
      { step: '03', title: 'Nutrition Protocol', desc: 'Anti-cancer dietary plan rich in phytonutrients and antioxidants.' },
      { step: '04', title: 'Monthly Follow-up', desc: 'Regular check-ins to adjust formulas and track progress.' },
    ],
    disclaimer: 'Our herbal support programs are complementary therapies and do not replace conventional medical treatment. Always consult your oncologist before starting any herbal regimen.',
  },
  'lung-cancer': {
    icon: <FaLungs />,
    title: 'Lung Cancer Support',
    subtitle: 'Respiratory Strength & Pulmonary Tissue Resilience',
    heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1600&q=80',
    overview: `Lung cancer poses unique challenges including respiratory compromise, fatigue, and treatment-related side effects. Our herbal lung support protocol focuses on strengthening pulmonary function, clearing inflammation in the airways, and supporting the body through chemotherapy or radiation therapy.`,
    howWeHelp: [
      'Bronchodilatory herbs to ease breathing and reduce congestion',
      'Anti-fibrotic botanicals to preserve healthy lung tissue',
      'Expectorant herbs for mucus clearance and comfort',
      'Antioxidant support to combat oxidative damage from radiation',
      'Energy tonics to combat treatment-related fatigue',
      'Immune boosters to reduce infection risk',
    ],
    keyHerbs: [
      { name: 'Licorice Root', benefit: 'Soothes inflamed airways and acts as natural expectorant' },
      { name: 'Thyme', benefit: 'Antimicrobial and bronchospasm-reducing herb' },
      { name: 'Elecampane', benefit: 'Strengthens lung tissue and clears respiratory mucus' },
      { name: 'Astragalus', benefit: 'Boosts immune function and improves stamina' },
      { name: 'Cordyceps', benefit: 'Increases oxygen utilization and energy production' },
      { name: 'Mullein', benefit: 'Classic lung herb for soothing and healing airways' },
    ],
    process: [
      { step: '01', title: 'Respiratory Evaluation', desc: 'Review of lung function, symptoms, and current treatment protocol.' },
      { step: '02', title: 'Pulmonary Herbal Blend', desc: 'Customized tinctures and teas targeting lung health.' },
      { step: '03', title: 'Breathing Exercises', desc: 'Guided pranayama and breathing techniques to support lung capacity.' },
      { step: '04', title: 'Ongoing Monitoring', desc: 'Regular symptom tracking and formula adjustments.' },
    ],
    disclaimer: 'Our herbal support programs are complementary therapies and do not replace conventional medical treatment. Always consult your oncologist before starting any herbal regimen.',
  },
  'colon-cancer': {
    icon: <FaAppleAlt />,
    title: 'Colon Cancer Support',
    subtitle: 'Gut Healing, Microbiome Balance & Digestive Restoration',
    heroImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80',
    overview: `Colon cancer and its treatments—surgery, chemotherapy, radiation—significantly impact digestive health and gut microbiome diversity. Our herbal colon care program focuses on healing the intestinal lining, restoring healthy flora, reducing inflammation, and improving nutritional absorption to support the recovery journey.`,
    howWeHelp: [
      'Gut-healing herbs to repair intestinal lining damage',
      'Prebiotic and probiotic-supportive botanicals for microbiome health',
      'Anti-inflammatory herbs to reduce bowel inflammation',
      'Digestive enzymes and bitter herbs to improve nutrient absorption',
      'Detoxification support for improved elimination',
      'Anti-tumor polyphenol-rich formulas',
    ],
    keyHerbs: [
      { name: 'Slippery Elm', benefit: 'Coats and soothes irritated intestinal lining' },
      { name: 'Aloe Vera', benefit: 'Reduces bowel inflammation and aids healing' },
      { name: 'Triphala', benefit: 'Classic Ayurvedic bowel tonic and antioxidant' },
      { name: 'Ginger', benefit: 'Reduces nausea, aids digestion, anti-inflammatory' },
      { name: 'Wormwood', benefit: 'Antimicrobial and digestive stimulant' },
      { name: 'Marshmallow Root', benefit: 'Demulcent herb that calms gut irritation' },
    ],
    process: [
      { step: '01', title: 'Gut Health Assessment', desc: 'Evaluation of digestive symptoms, diet, and bowel function.' },
      { step: '02', title: 'Gut Healing Protocol', desc: 'Targeted herbs to repair and restore intestinal health.' },
      { step: '03', title: 'Anti-Cancer Diet Plan', desc: 'High-fiber, plant-rich eating plan to reduce recurrence risk.' },
      { step: '04', title: 'Microbiome Monitoring', desc: 'Ongoing assessment and formula refinement based on symptoms.' },
    ],
    disclaimer: 'Our herbal support programs are complementary therapies and do not replace conventional medical treatment. Always consult your oncologist before starting any herbal regimen.',
  },
  'prostate-cancer': {
    icon: <FaHeartbeat />,
    title: 'Prostate Cancer Support',
    subtitle: 'Hormonal Balance, Pelvic Health & Urinary Function',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    overview: `Prostate cancer affects millions of men, and treatment side effects—including hormonal disruption, urinary issues, and fatigue—can significantly impact quality of life. Our herbal prostate support program addresses these challenges with targeted botanicals that support endocrine health, reduce pelvic inflammation, and improve urinary comfort.`,
    howWeHelp: [
      'Phytosterol-rich herbs to support healthy testosterone metabolism',
      'Anti-inflammatory botanicals for pelvic tissue relief',
      'Urinary tract-supporting herbs to ease flow and comfort',
      'Hormonal balance support during androgen deprivation therapy',
      'Bone-strengthening herbs to counteract density loss',
      'Mental health support to address anxiety and depression',
    ],
    keyHerbs: [
      { name: 'Saw Palmetto', benefit: 'Reduces DHT and supports urinary flow' },
      { name: 'Pygeum Africanum', benefit: 'Reduces prostate inflammation and improves urinary symptoms' },
      { name: 'Stinging Nettle Root', benefit: 'Binds SHBG and supports hormonal balance' },
      { name: 'Pomegranate', benefit: 'Rich in ellagitannins with potent anti-prostate-cancer activity' },
      { name: 'Lycopene (Tomato)', benefit: 'Carotenoid linked to reduced prostate cancer risk' },
      { name: 'Green Tea', benefit: 'EGCG suppresses androgen receptor signaling in prostate cells' },
    ],
    process: [
      { step: '01', title: 'Hormonal Profile Review', desc: 'Assessment of PSA, testosterone levels, and urinary function.' },
      { step: '02', title: 'Endocrine Herbal Blend', desc: 'Targeted herbs for hormonal support and pelvic health.' },
      { step: '03', title: 'Lifestyle Optimization', desc: 'Diet, exercise, and stress reduction plan for prostate health.' },
      { step: '04', title: 'Regular PSA Tracking', desc: 'Support alongside conventional PSA monitoring protocol.' },
    ],
    disclaimer: 'Our herbal support programs are complementary therapies and do not replace conventional medical treatment. Always consult your oncologist before starting any herbal regimen.',
  },
  'liver-cancer': {
    icon: <FaRegHospital />,
    title: 'Liver Cancer Support',
    subtitle: 'Hepatoprotection, Detoxification & Cell Regeneration',
    heroImage: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1600&q=80',
    overview: `Liver cancer and hepatic complications from cancer treatment require specialized support. The liver is the body's primary detoxification organ, and supporting its health is critical for overall recovery. Our hepatoprotective herbal program combines ancient wisdom with modern evidence to protect liver cells, enhance detoxification, and support regeneration.`,
    howWeHelp: [
      'Hepatoprotective herbs to shield liver cells from toxin damage',
      'Cholagogue botanicals to improve bile flow and fat digestion',
      'Antioxidant-rich herbs to reduce oxidative stress on liver tissue',
      'Anti-fibrotic herbs to prevent progression of liver fibrosis',
      'Energy-restoring adaptogens for fatigue and weakness',
      'Digestive support to ease liver-related digestive symptoms',
    ],
    keyHerbs: [
      { name: 'Milk Thistle (Silymarin)', benefit: 'Most studied hepatoprotective herb; regenerates liver cells' },
      { name: 'Dandelion Root', benefit: 'Bitter tonic that stimulates bile production and liver function' },
      { name: 'Schisandra', benefit: 'Adaptogen with proven liver-protective and detoxifying properties' },
      { name: 'Artichoke Leaf', benefit: 'Stimulates bile and supports liver detox pathways' },
      { name: 'Turmeric', benefit: 'Reduces liver inflammation and oxidative damage' },
      { name: 'Bupleurum', benefit: 'Traditional Chinese herb for liver Qi stagnation and hepatitis' },
    ],
    process: [
      { step: '01', title: 'Liver Function Review', desc: 'Analysis of liver enzymes, bilirubin, and current treatment plan.' },
      { step: '02', title: 'Hepatoprotective Formula', desc: 'Custom blend to protect, detoxify, and regenerate liver tissue.' },
      { step: '03', title: 'Detox Diet Protocol', desc: 'Low-toxin, nutrient-dense eating plan to reduce liver burden.' },
      { step: '04', title: 'Enzyme Monitoring', desc: 'Coordination with liver function tests for safe supplementation.' },
    ],
    disclaimer: 'Our herbal support programs are complementary therapies and do not replace conventional medical treatment. Always consult your oncologist before starting any herbal regimen.',
  },
  'blood-cancer': {
    icon: <FaTint />,
    title: 'Blood Cancer Support',
    subtitle: 'Immune Modulation, Bone Marrow Support & Energy Restoration',
    heroImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&q=80',
    overview: `Blood cancers including leukemia, lymphoma, and myeloma challenge the body's immune and hematopoietic systems. Our blood cancer herbal support program focuses on immune modulation, supporting bone marrow function, purifying the blood, and restoring vitality lost through intensive chemotherapy and bone marrow treatments.`,
    howWeHelp: [
      'Immune-modulating herbs to balance, not overstimulate, immune response',
      'Blood-building tonics rich in iron and hematopoietic cofactors',
      'Bone marrow supporting botanicals for WBC and platelet recovery',
      'Lymphatic system herbs to support detoxification and circulation',
      'Anti-fatigue adaptogens for energy restoration',
      'Infection-prevention antimicrobial herbs during immunosuppression',
    ],
    keyHerbs: [
      { name: 'Astragalus', benefit: 'Stimulates bone marrow and WBC production; immune modulator' },
      { name: 'Cat\'s Claw', benefit: 'Enhances immune function and has anti-leukemic properties' },
      { name: 'Nettle Leaf', benefit: 'Iron-rich blood builder; supports red blood cell production' },
      { name: 'Reishi Mushroom', benefit: 'Triterpenes support immune balance and reduce inflammation' },
      { name: 'Elderberry', benefit: 'Antiviral and immune-supporting during treatment' },
      { name: 'Ginseng', benefit: 'Adaptogen that restores energy and immune vitality' },
    ],
    process: [
      { step: '01', title: 'Blood Panel Review', desc: 'Assessment of CBC, WBC, platelets, and current treatment phase.' },
      { step: '02', title: 'Immune-Modulating Blend', desc: 'Careful herbal protocol that supports without overstimulating immunity.' },
      { step: '03', title: 'Nutritional Fortification', desc: 'Iron-rich, anti-inflammatory diet to support blood health.' },
      { step: '04', title: 'Safety Monitoring', desc: 'Close coordination with oncology team for drug-herb safety.' },
    ],
    disclaimer: 'Our herbal support programs are complementary therapies and do not replace conventional medical treatment. Always consult your oncologist before starting any herbal regimen.',
  },
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = servicesData[id];

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: '#0f172a' }}>Service not found</h2>
        <Link to="/services" style={{ color: ACCENT, textDecoration: 'none', fontWeight: 600 }}>← Back to Services</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img
          src={service.heroImage}
          alt={service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,30,60,0.82) 0%, rgba(10,30,60,0.4) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5%', maxWidth: '900px' }}>
          <Link to="/services" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
            <FaArrowLeft /> Back to Care Programs
          </Link>
          <div style={{ fontSize: '48px', color: ACCENT, marginBottom: '16px' }}>{service.icon}</div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>{service.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '600px' }}>{service.subtitle}</p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>

        {/* Overview */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ background: '#fff', borderRadius: '24px', padding: '40px', marginBottom: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', borderLeft: `5px solid ${ACCENT}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <FaLeaf style={{ color: ACCENT, fontSize: '22px' }} />
            <h2 style={{ color: '#0f172a', fontSize: '1.6rem', fontFamily: 'Playfair Display, serif' }}>Overview</h2>
          </div>
          <p style={{ color: '#475569', lineHeight: '1.9', fontSize: '1.05rem' }}>{service.overview}</p>
        </motion.section>

        {/* How We Help */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ background: '#fff', borderRadius: '24px', padding: '40px', marginBottom: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <FaShieldAlt style={{ color: ACCENT, fontSize: '22px' }} />
            <h2 style={{ color: '#0f172a', fontSize: '1.6rem', fontFamily: 'Playfair Display, serif' }}>How We Help</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {service.howWeHelp.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#f0fdfe', borderRadius: '12px', padding: '16px' }}>
                <FaCheckCircle style={{ color: ACCENT, fontSize: '18px', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Key Herbs */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ background: '#fff', borderRadius: '24px', padding: '40px', marginBottom: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <FaFlask style={{ color: ACCENT, fontSize: '22px' }} />
            <h2 style={{ color: '#0f172a', fontSize: '1.6rem', fontFamily: 'Playfair Display, serif' }}>Key Herbs & Their Benefits</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {service.keyHerbs.map((herb, i) => (
              <div key={i} style={{ border: `1px solid ${ACCENT}33`, borderRadius: '16px', padding: '20px', background: 'linear-gradient(135deg, #f0fdfe, #fff)' }}>
                <h4 style={{ color: ACCENT, fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>{herb.name}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>{herb.benefit}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Treatment Process */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ background: '#fff', borderRadius: '24px', padding: '40px', marginBottom: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <FaUserMd style={{ color: ACCENT, fontSize: '22px' }} />
            <h2 style={{ color: '#0f172a', fontSize: '1.6rem', fontFamily: 'Playfair Display, serif' }}>Your Treatment Journey</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {service.process.map((step, i) => (
              <div key={i} style={{ background: 'linear-gradient(135deg, #f0fdfe, #e0f7fa)', borderRadius: '16px', padding: '24px', position: 'relative', border: `1px solid ${ACCENT}22` }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: ACCENT, opacity: 0.3, marginBottom: '8px' }}>{step.step}</div>
                <h4 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px 24px', marginBottom: '40px' }}>
          <p style={{ color: '#92400e', fontSize: '0.9rem', lineHeight: '1.7' }}>
            ⚠️ <strong>Important:</strong> {service.disclaimer}
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: ACCENT,
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '50px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              boxShadow: `0 8px 24px ${ACCENT}44`,
            }}
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
