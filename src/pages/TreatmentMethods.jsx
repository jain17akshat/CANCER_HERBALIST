import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLeaf, FaFlask, FaUserMd, FaHeart, FaShieldAlt, FaSeedling,
  FaCalendarAlt, FaFileMedical, FaFileSignature, FaCapsules, FaUserShield,
  FaCheckCircle, FaArrowRight
} from 'react-icons/fa';

const ACCENT = '#38bed5';

const pillars = [
  {
    icon: <FaLeaf />,
    title: 'Herbal Medicine',
    desc: 'We use over 200 clinically validated medicinal plants, sourced sustainably and prepared to pharmaceutical-grade standards. Each formula is designed for bioavailability and synergy.',
  },
  {
    icon: <FaFlask />,
    title: 'Evidence-Based Protocols',
    desc: 'Every herb in our protocols has peer-reviewed research supporting its use. We regularly review updated clinical literature to ensure our formulas reflect the latest science.',
  },
  {
    icon: <FaUserMd />,
    title: 'Integrative Oncology',
    desc: 'We work alongside your oncology team—not against them. Our practitioners are trained in herb-drug interactions and communicate transparently with your medical providers.',
  },
  {
    icon: <FaHeart />,
    title: 'Holistic Wellbeing',
    desc: 'Cancer treatment affects the mind, body, and spirit. We address all three through herbal medicine, nutrition coaching, mindfulness guidance, and emotional support.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Safety First',
    desc: 'All protocols are reviewed for drug-herb interactions, contraindications, and patient-specific risk factors. Patient safety is our highest priority at every stage.',
  },
  {
    icon: <FaSeedling />,
    title: 'Personalized Care',
    desc: 'No two patients are alike. We create entirely individualized treatment plans based on cancer type, staging, conventional treatment, and personal health history.',
  },
];

const steps = [
  {
    num: '01',
    icon: <FaCalendarAlt />,
    title: 'Free Discovery Consultation',
    desc: 'Your journey begins with a no-obligation discovery call with one of our senior practitioners. We listen to your story, understand your diagnosis, discuss your goals, and explain how our programs work.',
    detail: 'Duration: 30–45 minutes | Format: Phone, video, or in-person | Cost: Free',
  },
  {
    num: '02',
    icon: <FaFileMedical />,
    title: 'Comprehensive Clinical Evaluation',
    desc: 'A detailed review of all your medical records, diagnostic reports, imaging, lab values, and current medication list. We assess your overall health, nutritional status, and treatment-related symptoms.',
    detail: 'Includes: Medical history form, symptom questionnaire, diet diary review',
  },
  {
    num: '03',
    icon: <FaFileSignature />,
    title: 'Personalized Treatment Plan',
    desc: 'We design a multi-modal herbal protocol specific to your cancer type, current treatment phase, and personal health goals. This includes a custom herbal formula, nutritional recommendations, and lifestyle guidance.',
    detail: 'Delivered within 48–72 hours of evaluation | Written protocol + video explanation',
  },
  {
    num: '04',
    icon: <FaCapsules />,
    title: 'Treatment Initiation',
    desc: 'Your pharmaceutical-grade herbal formulations are prepared and delivered to your door with clear dosing instructions, storage guidelines, and a schedule that integrates with your existing treatment.',
    detail: 'Includes: Detailed dosing guide, symptom tracking journal, emergency contact',
  },
  {
    num: '05',
    icon: <FaUserShield />,
    title: 'Ongoing Monitoring & Adjustment',
    desc: 'Regular monthly check-ins with your practitioner to review progress, assess response, update your formula as needed, and address any new symptoms or concerns that arise during treatment.',
    detail: 'Monthly video calls + unlimited WhatsApp support between sessions',
  },
];

const whatWeTreat = [
  'Breast Cancer', 'Lung Cancer', 'Colon & Colorectal Cancer', 'Prostate Cancer',
  'Liver Cancer', 'Blood Cancers (Leukemia, Lymphoma, Myeloma)', 'Cervical Cancer',
  'Ovarian Cancer', 'Pancreatic Cancer', 'Kidney Cancer', 'Bladder Cancer', 'Skin Cancer',
];

const sideEffectsWeAddress = [
  'Nausea & Vomiting', 'Extreme Fatigue', 'Hair Loss Support', 'Peripheral Neuropathy',
  'Mouth Sores', 'Appetite Loss', 'Immune Suppression', 'Anxiety & Depression',
  'Sleep Disturbances', 'Pain Management', 'Hormone Imbalances', 'Weight Changes',
];

export default function TreatmentMethods() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f3460 0%, #1a5276 50%, #0e6655 100%)', padding: '130px 20px 80px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: ACCENT, opacity: 0.08, filter: 'blur(60px)' }} />
        <span style={{ background: `${ACCENT}33`, border: `1px solid ${ACCENT}66`, color: ACCENT, padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: 600 }}>
          Our Approach to Healing
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'Playfair Display, serif', marginTop: '20px', marginBottom: '20px' }}>
          How We Treat Cancer <span style={{ color: ACCENT }}>Naturally</span>
        </h1>
        <p style={{ maxWidth: '700px', margin: '0 auto 36px', opacity: 0.88, lineHeight: '1.8', fontSize: '1.1rem' }}>
          Our integrative herbal oncology approach combines ancient botanical wisdom with modern clinical evidence to support your body through every phase of the cancer journey.
        </p>
        <Link to="/contact" style={{ background: ACCENT, color: '#fff', padding: '16px 40px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', boxShadow: `0 8px 32px ${ACCENT}55` }}>
          Start Your Journey <FaArrowRight style={{ marginLeft: '8px' }} />
        </Link>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>

        {/* Philosophy */}
        <section style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>
              Our Treatment <span style={{ color: ACCENT }}>Philosophy</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '680px', margin: '0 auto', lineHeight: '1.8' }}>
              We believe healing is multidimensional. Our six core pillars guide every decision we make for every patient we serve.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {pillars.map((p, i) => (
              <motion.div key={i} data-aos="fade-up" data-aos-delay={i * 80}
                whileHover={{ y: -6 }}
                style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid ${ACCENT}22`, transition: 'all 0.3s' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${ACCENT}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: ACCENT, marginBottom: '18px' }}>
                  {p.icon}
                </div>
                <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '10px', fontSize: '1.05rem' }}>{p.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.7' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>
              Your Step-by-Step <span style={{ color: ACCENT }}>Treatment Journey</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: '640px', margin: '0 auto', lineHeight: '1.8' }}>
              A structured, professional five-step methodology to ensure personalized, safe, and effective herbal cancer support.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {steps.map((step, i) => (
              <motion.div key={i} data-aos="fade-up" data-aos-delay={i * 80}
                style={{ background: '#fff', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', gap: '24px', alignItems: 'flex-start', border: `1px solid ${ACCENT}22` }}>
                <div style={{ minWidth: '64px', height: '64px', borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#fff', boxShadow: `0 6px 20px ${ACCENT}44` }}>
                  {step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: ACCENT, background: `${ACCENT}18`, padding: '2px 10px', borderRadius: '50px' }}>Step {step.num}</span>
                    <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem' }}>{step.title}</h3>
                  </div>
                  <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '12px' }}>{step.desc}</p>
                  <p style={{ color: ACCENT, fontSize: '0.88rem', fontWeight: 600, background: `${ACCENT}10`, padding: '8px 14px', borderRadius: '8px', display: 'inline-block' }}>{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What We Treat + Side Effects Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '70px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid ${ACCENT}22` }}>
            <h2 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '24px', fontSize: '1.4rem' }}>Cancer Types We Support</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {whatWeTreat.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.95rem' }}>
                  <FaCheckCircle style={{ color: ACCENT, flexShrink: 0 }} />{item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid ${ACCENT}22` }}>
            <h2 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '24px', fontSize: '1.4rem' }}>Side Effects We Address</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sideEffectsWeAddress.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.95rem' }}>
                  <FaCheckCircle style={{ color: ACCENT, flexShrink: 0 }} />{item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px 24px', marginBottom: '50px' }}>
          <p style={{ color: '#92400e', fontSize: '0.9rem', lineHeight: '1.7' }}>
            ⚠️ <strong>Important Disclaimer:</strong> Our herbal support programs are complementary therapies designed to work alongside, not replace, conventional oncology treatment. All herbal protocols are reviewed for safety and drug-herb interactions. Always consult your oncologist before starting any complementary treatment program.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #0f3460, #1a5276)', borderRadius: '28px', padding: '56px 40px', color: '#fff' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>
            Ready to Begin Your <span style={{ color: ACCENT }}>Healing Journey?</span>
          </h2>
          <p style={{ opacity: 0.85, marginBottom: '32px', maxWidth: '540px', margin: '0 auto 32px', lineHeight: '1.8' }}>
            Book a free 30-minute discovery consultation with one of our senior herbal practitioners today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ background: ACCENT, color: '#fff', padding: '16px 36px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', boxShadow: `0 8px 24px ${ACCENT}55` }}>
              Book Free Consultation
            </Link>
            <Link to="/services" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '16px 36px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.25)' }}>
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}