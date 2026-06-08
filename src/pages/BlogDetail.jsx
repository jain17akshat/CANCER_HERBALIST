import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaUser, FaCalendarAlt, FaLeaf } from 'react-icons/fa';

const ACCENT = '#38bed5';

const blogData = {
  1: {
    title: 'Understanding Cancer Nutrition: Foods That Fight and Foods to Avoid',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80',
    category: 'Nutrition',
    author: 'Dr. Evelyn Carter',
    readTime: '8 min read',
    date: 'March 15, 2026',
    content: [
      {
        heading: 'Introduction',
        body: `Nutrition plays a pivotal role in cancer prevention, treatment support, and recovery. What you eat can influence how your body responds to cancer therapies, your energy levels, immune resilience, and overall quality of life. While no single food cures cancer, a well-designed dietary strategy can significantly improve outcomes and reduce the risk of recurrence.`
      },
      {
        heading: 'Foods That Support Cancer Recovery',
        body: `Cruciferous vegetables such as broccoli, cauliflower, Brussels sprouts, and kale contain sulforaphane and indole-3-carbinol—compounds with documented anti-cancer properties. Berries, especially blueberries, raspberries, and blackberries, are rich in anthocyanins and ellagic acid, powerful antioxidants that neutralize free radicals and reduce tumor-promoting inflammation. Fatty fish like salmon and mackerel provide omega-3 fatty acids that reduce systemic inflammation. Turmeric (curcumin) is one of the most researched anti-cancer spices and should be a staple in any cancer-supportive diet. Green tea provides EGCG, a catechin that has been shown to inhibit cancer cell proliferation and induce apoptosis in multiple cancer cell lines.`
      },
      {
        heading: 'Foods to Limit or Avoid',
        body: `Processed meats (bacon, sausage, deli meats) are classified as Group 1 carcinogens by the World Health Organization. Refined sugars and high-glycemic carbohydrates spike blood insulin levels, which can promote inflammatory pathways linked to cancer growth. Alcohol is linked to increased risk of at least seven types of cancer. Red meat, when consumed in excess and especially when charred or processed, has been associated with colorectal cancer. Trans fats found in fried and ultra-processed foods promote systemic inflammation, an environment that cancer cells exploit.`
      },
      {
        heading: 'Building a Cancer-Protective Plate',
        body: `Aim to fill at least two-thirds of your plate with plant-based foods—vegetables, fruits, whole grains, and legumes. Include high-quality protein sources in the remaining third, prioritizing fish, poultry, and plant proteins over red meat. Stay hydrated with water and herbal teas. Minimize processed foods, alcohol, and added sugars. Consider working with an integrative nutritionist or our clinical team to build a personalized cancer nutrition plan that accounts for your specific cancer type, current treatment, and nutritional status.`
      },
      {
        heading: 'Key Micronutrients for Cancer Patients',
        body: `Vitamin D deficiency is associated with poorer cancer outcomes. Safe sun exposure and supplementation under clinical guidance can help maintain optimal levels. Selenium, found in Brazil nuts and seafood, is an essential antioxidant mineral that supports detoxification enzymes. Zinc is critical for immune function and wound healing, especially important post-surgery. Folate from leafy greens supports DNA repair mechanisms. Always discuss supplementation with your oncologist, as some nutrients can interact with chemotherapy.`
      },
      {
        heading: 'Conclusion',
        body: `A mindful, plant-rich dietary approach tailored to your specific needs can be a powerful complement to your conventional cancer treatment. At Cancer Herbalist, our clinical nutritionists work in concert with our herbal practitioners to design personalized nutrition plans. Remember, food is medicine—and with the right guidance, it can become one of your most powerful allies in your healing journey.`
      }
    ]
  },
  2: {
    title: 'Herbal Adaptogens for Stress Relief During Cancer Treatment',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80',
    category: 'Herbal Care',
    author: 'Dr. Marcus Vance',
    readTime: '6 min read',
    date: 'March 10, 2026',
    content: [
      {
        heading: 'Introduction',
        body: `Cancer treatment is physically and emotionally grueling. Stress hormones like cortisol, when chronically elevated, can suppress immune function, impair sleep, and create an internal environment that may promote tumor progression. Adaptogenic herbs—a class of botanicals that help the body adapt to stress—offer a compelling, evidence-informed approach to managing treatment-related psychological burden.`
      },
      {
        heading: 'What Are Adaptogens?',
        body: `Adaptogens are non-toxic herbs that modulate the hypothalamic-pituitary-adrenal (HPA) axis—the body's central stress-response system. Unlike sedatives or stimulants, adaptogens work bidirectionally: calming an overactivated stress response while boosting energy and resilience when the body is depleted. They have been used for centuries in Ayurvedic, Traditional Chinese, and Siberian herbal medicine traditions.`
      },
      {
        heading: 'Key Adaptogens for Cancer Patients',
        body: `Ashwagandha (Withania somnifera) has extensive clinical research supporting its ability to reduce cortisol levels, improve sleep quality, and reduce chemotherapy-related fatigue. A 2021 clinical trial found significant improvements in quality of life scores among breast cancer patients using ashwagandha extract. Rhodiola Rosea enhances mental performance under stress and reduces fatigue, particularly useful during radiation treatment periods. Holy Basil (Tulsi) calms the nervous system and has documented adaptogenic and mild anxiolytic properties. Eleuthero (Siberian Ginseng) improves stamina and resilience without the stimulant effects of true Panax ginseng.`
      },
      {
        heading: 'Safety Considerations',
        body: `While adaptogens are generally well-tolerated, cancer patients must exercise caution. Some adaptogens may interact with chemotherapy drugs—for example, ashwagandha may enhance the effects of immunosuppressive medications. Always consult your oncologist and an experienced herbalist before starting any adaptogen protocol. Timing relative to chemotherapy sessions, dosage, and individual patient factors all influence safety and efficacy.`
      },
      {
        heading: 'Integrating Adaptogens Into Your Routine',
        body: `Adaptogens are typically taken as tinctures, capsules, or teas consistently over a period of 4–12 weeks for best results. They are not quick fixes but rather long-term support tools. At Cancer Herbalist, we prescribe adaptogens as part of individualized herbal protocols, always considering your full clinical picture, current medications, and treatment phase. Our goal is to help your nervous system find balance amid the storm of cancer treatment.`
      }
    ]
  },
  3: {
    title: 'Managing Chemotherapy Side Effects Naturally',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    category: 'Treatment Support',
    author: 'Dr. Daniel Sharma',
    readTime: '9 min read',
    date: 'February 28, 2026',
    content: [
      {
        heading: 'Introduction',
        body: `Chemotherapy remains one of the most effective tools in oncology, but its side effects—nausea, fatigue, neuropathy, hair loss, mucositis, and immune suppression—can be devastating. Complementary herbal and natural approaches, when used responsibly alongside conventional care, can meaningfully reduce the burden of these side effects and help patients complete their treatment courses more comfortably.`
      },
      {
        heading: 'Nausea & Vomiting',
        body: `Ginger (Zingiber officinale) is the best-studied natural anti-nausea remedy. Multiple randomized controlled trials have demonstrated that ginger supplementation significantly reduces chemotherapy-induced nausea and vomiting (CINV) compared to placebo. Acupressure at the P6 (Neiguan) point is also supported by Cochrane review evidence. Peppermint aromatherapy provides rapid, accessible relief. Our clinical team recommends specific ginger dosing protocols tailored to your chemotherapy regimen.`
      },
      {
        heading: 'Fatigue & Energy Depletion',
        body: `Cancer-related fatigue (CRF) is the most prevalent and distressing side effect reported by patients. Panax ginseng has the strongest evidence base among herbs for CRF, with a notable Mayo Clinic study showing significant improvement in fatigue scores. Coenzyme Q10 supports mitochondrial energy production, which is often impaired by chemotherapy. American Ginseng (Panax quinquefolius) showed impressive results in reducing fatigue in a multi-center trial of 364 cancer patients. Gentle aerobic exercise—counterintuitive as it sounds—is the single most evidence-based intervention for CRF.`
      },
      {
        heading: 'Peripheral Neuropathy',
        body: `Chemotherapy-induced peripheral neuropathy (CIPN) affects up to 40% of patients receiving neurotoxic agents like paclitaxel and oxaliplatin. Alpha-lipoic acid has shown neuroprotective properties in several clinical trials. Glutamine supplementation may reduce severity of neuropathy from paclitaxel. Acupuncture has emerging evidence for improving CIPN symptoms. Topical capsaicin (from cayenne) may provide localized pain relief. Vitamin B6 and B12 support neurological health and myelin integrity.`
      },
      {
        heading: 'Mouth Sores (Mucositis)',
        body: `Oral mucositis is painful and can impair nutrition. Manuka honey has evidence for reducing severity and duration of oral mucositis. Aloe vera gel mouthwash provides soothing relief and promotes healing. Glutamine oral rinse is supported by several clinical trials. Zinc supplementation may reduce the incidence of mucositis. Cold cryotherapy (ice chips during infusion) is a simple, effective, and low-cost preventive strategy.`
      },
      {
        heading: 'Immune Support',
        body: `Chemotherapy suppresses bone marrow and immune function, increasing infection risk. Medicinal mushrooms (Reishi, Shiitake, Maitake, Turkey Tail) contain beta-glucans that modulate immune function without overstimulating it. Astragalus has been used in Chinese integrative oncology for decades to support WBC counts. Probiotics help maintain gut microbiome health, which is closely linked to immune function. Important: avoid strong immune stimulants (high-dose echinacea, megadose vitamin C) during active chemotherapy without expert guidance.`
      },
      {
        heading: 'Working With Your Medical Team',
        body: `The most important principle of natural side effect management is coordination with your oncology team. Never stop or delay conventional treatment to pursue herbal alternatives. The goal is integration—using the best of both worlds to give your body every advantage. At Cancer Herbalist, we communicate directly with your oncologists when possible and maintain detailed documentation of all herbal protocols for safety and transparency.`
      }
    ]
  }
};

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogData[parseInt(id)];

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: '#0f172a' }}>Article not found</h2>
        <Link to="/blog" style={{ color: ACCENT, textDecoration: 'none', fontWeight: 600 }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,30,60,0.85) 0%, rgba(10,30,60,0.45) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5%', maxWidth: '860px' }}>
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
            <FaArrowLeft /> Back to Blog
          </Link>
          <span style={{ background: ACCENT, color: '#fff', padding: '4px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, width: 'fit-content', marginBottom: '16px' }}>{blog.category}</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem,3.5vw,2.4rem)', fontFamily: 'Playfair Display, serif', lineHeight: 1.3 }}>{blog.title}</h1>
          <div style={{ display: 'flex', gap: '24px', marginTop: '18px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaUser />{blog.author}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaCalendarAlt />{blog.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaClock />{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '60px 20px' }}>
        {blog.content.map((section, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0f172a', fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaLeaf style={{ color: ACCENT, fontSize: '16px', flexShrink: 0 }} />{section.heading}
            </h2>
            <p style={{ color: '#475569', lineHeight: '1.9', fontSize: '1.02rem' }}>{section.body}</p>
          </motion.div>
        ))}

        {/* Disclaimer */}
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px 24px', marginBottom: '40px' }}>
          <p style={{ color: '#92400e', fontSize: '0.9rem', lineHeight: '1.7' }}>
            ⚠️ <strong>Medical Disclaimer:</strong> This article is for educational purposes only and does not constitute medical advice. Always consult your oncologist and healthcare team before making any changes to your treatment or supplement regimen.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #f0fdfe, #e0f7fa)', borderRadius: '24px', padding: '40px' }}>
          <h3 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '12px' }}>Ready to Start Your Healing Journey?</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Book a free consultation with our herbal medicine specialists today.</p>
          <Link to="/contact" style={{ background: ACCENT, color: '#fff', padding: '14px 36px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', boxShadow: `0 8px 24px ${ACCENT}44` }}>
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
