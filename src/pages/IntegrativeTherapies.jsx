import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaDna, FaCapsules, FaAppleAlt, FaLeaf, FaShieldAlt,
  FaHandHoldingHeart, FaBolt, FaMoon, FaHeartbeat,
  FaArrowRight, FaCheckCircle, FaExclamationTriangle, FaChevronDown,
  FaFlask, FaMicroscope, FaVials, FaStethoscope
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const PRIMARY = '#1a6e52';
const DARK = '#0a1628';

const expandedTherapies = [
  {
    id: 'gene-centric',
    icon: <FaDna />,
    title: 'Gene Targeted Integrative Therapy',
    short: 'Targeted botanical protocols designed to modulate cell signaling pathways, down-regulate oncogenes, and support genetic stability.',
    clinicalFocus: 'Molecular down-regulation of pro-survival pathways (NF-κB, PI3K/Akt/mTOR) and p53 tumor suppressor reactivation.',
    mechanism: `Standardized high-purity phytochemicals—such as Curcuminoids (95% C3 Complex), Epigallocatechin Gallate (EGCG), and Trans-Resveratrol—cross cellular membranes to bind specific kinase receptors.
    
By suppressing Nuclear Factor kappa B (NF-κB), these targeted botanicals inhibit inflammatory transcription signals that drive tumor cell proliferation and chemo-resistance. Furthermore, they inhibit Vascular Endothelial Growth Factor (VEGF), disrupting tumor neo-angiogenesis (new blood vessel formation) to limit nutrient delivery to malignant clusters.`,
    evidence: `Peer-reviewed preclinical and clinical oncology studies confirm that curcuminoids and EGCG downregulate Cyclin D1 and Bcl-2 proteins, triggering programmed cell death (apoptosis) in malignant cells while preserving healthy somatic tissue integrity.`,
    formulationScience: 'Liposomal encapsulation and piperine co-formulation to enhance oral bio-availability by up to 2000%.',
    benefits: [
      'Suppresses pro-inflammatory transcription factor NF-κB',
      'Inhibits VEGF-mediated tumor angiogenesis and nutrient recruitment',
      'Supports cellular DNA repair mechanisms and p53 expression',
      'Enhances cancer cell sensitivity to standard chemotherapy'
    ]
  },
  {
    id: 'herbal-medicine',
    icon: <FaCapsules />,
    title: 'Phytotherapeutic Herbal Chemotherapy (HCT)',
    short: 'Custom-compounded organic botanical extracts formulated according to individual patient pathology and tumor staging.',
    clinicalFocus: 'Direct tumor microenvironment modulation, stem-cell suppression, and systemic organ protection.',
    mechanism: `Standardized botanical preparations incorporating Withaferins from Ashwagandha, Ocimum sanctum standardized extract, Echinacea, EGCG from Green Tea extract, 6-Gingerol from Ginger extract, Curcumin C3 Complex, and Tinospora cordifolia are formulated based on individual health parameters and nutrition needs.
    
These phytochemical compounds act synergistically across multiple cell checkpoints, supporting cell resilience, cellular defense, and metabolic balance.`,
    evidence: `Scientific studies indicate that standardized Tinospora cordifolia (Giloy) and Withania somnifera (Ashwagandha) extracts significantly support immune resilience, mitigate treatment fatigue, and help preserve healthy cell reserves.`,
    formulationScience: 'Standardized hydro-ethanolic and aqueous extracts tested for heavy metal purity and pesticide residue via ICP-MS.',
    benefits: [
      'Selective cytotoxic activity against malignant cell lines',
      'Mitigates chemotherapy and radiation systemic toxicity',
      'Down-regulates multidrug resistance (MDR) cell pumps',
      'Protects bone marrow reserve during active oncology cycles'
    ]
  },
  {
    id: 'nutritional-therapy',
    icon: <FaAppleAlt />,
    title: 'Clinical Oncology Nutritional Therapy',
    short: 'Targeted, low-glycemic anti-inflammatory metabolic nutrition to exploit the Warburg Effect and reverse cancer cachexia.',
    clinicalFocus: 'Curbing cancer cell glucose utilization, suppressing hyperinsulinemia, and preserving lean muscle mass.',
    mechanism: `Cancer cells preferentially utilize anaerobic glycolysis for energy (the Warburg Effect), relying on high circulating glucose and insulin-like growth factor (IGF-1).
    
Our clinical nutrition protocols construct tailored low-glycemic, polyphenol-dense dietary charts that reduce blood glucose variability. By utilizing healthy medium-chain triglycerides (MCTs) and bioavailable amino acids, healthy somatic tissues receive optimal energy while limiting metabolic substrate availability to malignant cells.`,
    evidence: `Clinical trials published in oncology nutrition journals demonstrate that low-glycemic dietary interventions reduce serum C-reactive protein (CRP), lower circulating IGF-1, and significantly attenuate muscle wasting (cachexia).`,
    formulationScience: 'Individualized macro- and micronutrient meal planning calculated according to basal metabolic rate and renal clearance.',
    benefits: [
      'Exploits Warburg metabolic vulnerability by lowering serum glucose spikes',
      'Reduces circulating Insulin-Like Growth Factor 1 (IGF-1)',
      'Preserves skeletal muscle mass and prevents cachexia',
      'Lowers systemic inflammatory markers (CRP, IL-6)'
    ]
  },
  {
    id: 'detoxification',
    icon: <FaLeaf />,
    title: 'Hepatic & Renal Phase I/II Detoxification Support',
    short: 'Evidence-based enzymatic clearance support to assist liver filtration pathways and protect kidney tubules.',
    clinicalFocus: 'Up-regulation of hepatic Phase I cytochrome P450 and Phase II glutathione conjugation pathways.',
    mechanism: `Chemotherapy metabolites and cellular breakdown debris impose severe filtration stress on hepatic parenchymal cells and renal nephrons.
    
We utilize scientifically validated hepatoprotective agents including N-Acetyl Cysteine (NAC), Silybin (from Milk Thistle), and Sulforaphane (from broccoli sprouts). These active compounds donate thiol groups and boost endogenous glutathione (GSH) synthesis, accelerating the safe neutralization and biliary clearance of metabolic toxins.`,
    evidence: `Randomized trials show Silybin and NAC significantly reduce serum transaminases (ALT, AST) and serum creatinine during high-dose chemotherapy regimens.`,
    limitations: 'CLINICAL SAFETY LIMITATION: We strictly reject unscientific extreme fasts, coffee enemas, or unverified purges that cause electrolyte collapse. All protocols are carefully timed to avoid interfering with active oncology drug pharmacokinetics.',
    benefits: [
      'Boosts endogenous glutathione (GSH) production',
      'Protects hepatocytes from chemotherapy-induced steatosis',
      'Supports renal filtration and prevents acute kidney injury',
      'Accelerates safe clearance of metabolic cell breakdown debris'
    ]
  },
  {
    id: 'immune-support',
    icon: <FaShieldAlt />,
    title: 'Immune Surveillance & NK-Cell Activation',
    short: 'Adaptogenic and polysaccharide-rich immunomodulators designed to restore Natural Killer cell and macrophage activity.',
    clinicalFocus: 'Reversing treatment-induced myelosuppression and enhancing innate tumor immunosurveillance.',
    mechanism: `High-molecular-weight fungal beta-1,3/1,6-glucans (extracted from Reishi, Maitake, and Turkey Tail mushrooms) bind to Dectin-1 and Complement Receptor 3 (CR3) on macrophages and Natural Killer (NK) cells.
    
This binding triggers cellular activation, stimulating the secretion of perforin and granzymes that punch holes in abnormal cell membranes, enhancing immunosurveillance without inducing hyper-inflammatory cytokine storms.`,
    evidence: `Clinical trials in integrative oncology reveal that adjunctive mushroom polysaccharide therapy leads to statistically significant increases in total CD4+ T-cells and NK-cell cytotoxic activity.`,
    formulationScience: 'Hot-water and ethanol dual-extracted fungal fruiting bodies standardized to >30% beta-glucan content.',
    benefits: [
      'Stimulates NK cell and cytotoxic T-cell tumor surveillance',
      'Prevents severe drops in absolute white blood cell counts',
      'Modulates balance between Th1 and Th2 immune pathways',
      'Restores immunological stamina following radiation treatment'
    ]
  },
  {
    id: 'pain-management',
    icon: <FaHandHoldingHeart />,
    title: 'Non-Toxic Pain & Inflammatory Modulation',
    short: 'Botanical anti-inflammatories targeting dual COX-2 and 5-LOX pathways to reduce neuropathic and bone discomfort.',
    clinicalFocus: 'Multi-pathway inflammatory prostaglandin suppression and peripheral nerve soothing.',
    mechanism: `Targeting inflammatory pain pathways using standardized Boswellia serrata (AKBA 30%), Zingiber officinale (gingerols), and Curcumin.
    
These botanical actives selectively inhibit cyclooxygenase-2 (COX-2) and 5-lipoxygenase (5-LOX) enzymes, reducing inflammatory prostaglandin E2 (PGE2) synthesis without causing gastric mucosal ulceration common with NSAIDs.`,
    evidence: `Clinical studies demonstrate that AKBA-rich Boswellia extracts significantly reduce peritumoral tissue edema and nerve compression pain in clinical patient cohorts.`,
    formulationScience: 'Gastric-resistant coated botanical extracts for optimal intestinal absorption.',
    benefits: [
      'Inhibits COX-2 and 5-LOX inflammatory cascades',
      'Reduces peritumoral tissue swelling and nerve compression',
      'Provides effective pain relief without gastrointestinal toxicity',
      'Decreases dependency on heavy opioid analgesics'
    ]
  },
  {
    id: 'fatigue-management',
    icon: <FaBolt />,
    title: 'Mitochondrial Energy & Fatigue Recovery',
    short: 'Vitalizing adaptogens and mitochondrial nutrients to resolve cancer-related fatigue (CRF) and restore ATP cycles.',
    clinicalFocus: 'Mitochondrial oxidative phosphorylation support and HPA-axis neuroendocrine stabilization.',
    mechanism: `Cancer-Related Fatigue (CRF) stems from mitochondrial electron transport chain disruption and elevated inflammatory cytokines (IL-1, IL-6).
    
Using mitochondrial co-factors (CoQ10, L-Carnitine) paired with adaptogens (Rhodiola rosea, Cordyceps sinensis), this therapy enhances mitochondrial ATP production, buffers lactic acid buildup, and regulates the hypothalamic-pituitary-adrenal axis.`,
    evidence: `Double-blind randomized trials evaluating standardized adaptogens reported dramatic reductions in fatigue severity scores (FACIT-F) and marked improvements in physical stamina.`,
    formulationScience: 'Coenzyme Q10 solubilized in d-limonene for maximum cellular membrane transport.',
    benefits: [
      'Restores cellular mitochondrial ATP energy production',
      'Combats cognitive fog ("chemo-brain") and mental exhaustion',
      'Normalizes cortisol rhythm and adrenal stress response',
      'Improves physical stamina and daily functional capacity'
    ]
  },
  {
    id: 'sleep-therapy',
    icon: <FaMoon />,
    title: 'Circadian Rhythm & Neuro-Restorative Sleep Support',
    short: 'Non-habit-forming GABAergic botanicals to restore deep slow-wave sleep and nocturnal melatonin synthesis.',
    clinicalFocus: 'Re-establishing central circadian pacemakers and optimizing night-time cellular repair.',
    mechanism: `Deep slow-wave sleep is essential for nocturnal growth hormone secretion, immune cell regeneration, and brain glymphatic clearance.
    
Utilizing GABA-A receptor modulating botanicals (Passiflora incarnata, Valeriana officinalis, L-Theanine), this therapy calms central nervous system hyperexcitability, lowers evening cortisol spikes, and facilitates natural endogenous melatonin production.`,
    evidence: `Sleep EEG studies indicate L-Theanine and Passiflora extracts shorten sleep onset latency and increase duration of restorative stage 3/4 NREM sleep.`,
    formulationScience: 'Standardized aqueous extracts formulated for rapid evening neurological relaxation.',
    benefits: [
      'Promotes restorative slow-wave NREM sleep stages',
      'Suppresses evening cortisol surges that cause night awakenings',
      'Enhances endogenous nocturnal melatonin secretion',
      'Reduces anxiety without morning cognitive grogginess'
    ]
  },
  {
    id: 'palliative-care',
    icon: <FaHeartbeat />,
    title: 'Palliative Mucosal & Digestive Support',
    short: 'Whole-person compassionate symptom management for chemo-induced mucositis, nausea, and anorexia.',
    clinicalFocus: 'GI mucosal protection, appetite stimulation, and emotional vitality maintenance.',
    mechanism: `Chemotherapy and radiation frequently damage rapid-turnover GI mucosal epithelial cells, causing painful mucositis, nausea, and loss of appetite.
    
Our supportive protocols deploy demulcent botanical mucilages (Althaea officinalis, Ulmus rubra) alongside gingerol carminatives. These botanicals form a soothing protective coating over oral and intestinal mucosa while stimulating gastric motility and digestive enzyme secretion.`,
    evidence: `Oncology trials show demulcent herbal washes reduce chemotherapy mucositis severity from Grade 3/4 down to manageable Grade 1 within 5 days.`,
    formulationScience: 'Soothing oral washes and micronized herbal powders for easy swallowing.',
    benefits: [
      'Coats and heals painful oral and gastrointestinal mucositis',
      'Relieves treatment-induced nausea and vomiting',
      'Stimulates healthy natural appetite and digestive juices',
      'Elevates overall daily comfort, dignity, and quality of life'
    ]
  }
];

export default function IntegrativeTherapies() {
  const [openCard, setOpenCard] = useState('gene-centric');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #0d3b2e 0%, #1a6e52 50%, #0f4c81 100%)',
        padding: '140px 20px 80px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: ACCENT, opacity: 0.1, filter: 'blur(80px)' }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#a7f3d0',
            padding: '8px 24px',
            borderRadius: '50px',
            fontSize: '13.5px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '18px'
          }}>
            🌿 Evidence-Based Clinical Framework
          </span>

          <h1 style={{
            fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Integrative <span style={{ color: ACCENT }}>Therapies</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.8',
            maxWidth: '720px',
            margin: '0 auto'
          }}>
            An expanded suite of 9 complementary clinical protocols designed to target cell signaling pathways, modulate the tumor microenvironment, protect healthy organs, and maximize quality of life during oncology care.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 100px' }}>
        
        {/* INTRO BOX */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
          border: '1px solid #e2e8f0',
          marginBottom: '48px'
        }}>
          <h2 style={{ color: PRIMARY, fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px', fontFamily: 'Playfair Display, serif' }}>
            Pharmacological Precision in Botanical Medicine
          </h2>
          <p style={{ color: '#475569', lineHeight: '1.85', fontSize: '0.98rem', margin: 0 }}>
            At Cancer Herbalist, our Integrative Therapies operate synergistically alongside conventional oncology (chemotherapy, radiation, surgery, and immunotherapy). Each topic below provides a comprehensive breakdown of clinical target focus, molecular mechanism of action, scientific evidence, formulation technology, and primary patient benefits.
            <br /><br />
            Select any therapy below to explore its full detailed clinical profile.
          </p>
        </div>

        {/* EXPANDED ACCORDION / CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {expandedTherapies.map((t, idx) => {
            const isOpen = openCard === t.id;
            return (
              <motion.div
                key={t.id}
                layout
                style={{
                  background: '#fff',
                  borderRadius: '24px',
                  border: isOpen ? `2px solid ${PRIMARY}` : '1.5px solid #e2e8f0',
                  boxShadow: isOpen ? '0 12px 36px rgba(26, 110, 82, 0.09)' : '0 4px 14px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  transition: 'border 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* TRIGGER HEADER */}
                <button
                  onClick={() => setOpenCard(isOpen ? null : t.id)}
                  style={{
                    width: '100%',
                    background: isOpen ? `${PRIMARY}05` : '#fff',
                    border: 'none',
                    padding: '28px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: isOpen ? PRIMARY : `${PRIMARY}14`,
                      color: isOpen ? '#fff' : PRIMARY,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                      transition: 'all 0.25s ease'
                    }}>
                      {t.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', background: ACCENT, padding: '2px 10px', borderRadius: '12px' }}>
                          PROTOCOL 0{idx + 1}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: DARK, fontFamily: 'Playfair Display, serif' }}>
                          {t.title}
                        </h3>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b', lineHeight: 1.5 }}>
                        {t.short}
                      </p>
                    </div>
                  </div>

                  <FaChevronDown style={{
                    color: isOpen ? PRIMARY : '#94a3b8',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0
                  }} />
                </button>

                {/* EXPANDED DETAILED CONTENT */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 32px 36px', borderTop: '1px solid #f1f5f9' }}>
                        
                        {/* 1. CLINICAL FOCUS & MOLECULAR MECHANISM */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginTop: '28px' }}>
                          <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: PRIMARY, fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              <FaMicroscope /> Clinical Target Focus
                            </div>
                            <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                              {t.clinicalFocus}
                            </p>
                          </div>

                          <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: ACCENT, fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              <FaFlask /> Formulation Technology
                            </div>
                            <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                              {t.formulationScience}
                            </p>
                          </div>
                        </div>

                        {/* 2. IN-DEPTH MECHANISM */}
                        <div style={{ marginTop: '24px' }}>
                          <h4 style={{ color: DARK, fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>
                            Biochemical Mechanism of Action:
                          </h4>
                          <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.85', margin: 0, whiteSpace: 'pre-line' }}>
                            {t.mechanism}
                          </p>
                        </div>

                        {/* 3. SCIENTIFIC EVIDENCE */}
                        <div style={{ marginTop: '24px', background: '#f0fdfe', borderLeft: `4px solid ${ACCENT}`, borderRadius: '12px', padding: '18px 22px' }}>
                          <h4 style={{ color: DARK, fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px' }}>
                            🧪 Peer-Reviewed Clinical Evidence:
                          </h4>
                          <p style={{ color: '#334155', fontSize: '0.93rem', lineHeight: '1.7', margin: 0 }}>
                            {t.evidence}
                          </p>
                        </div>

                        {/* LIMITATION NOTICE IF ANY */}
                        {t.limitations && (
                          <div style={{ marginTop: '20px', background: '#fff1f2', borderLeft: '4px solid #e11d48', borderRadius: '12px', padding: '18px 22px' }}>
                            <p style={{ color: '#9f1239', fontSize: '0.92rem', lineHeight: '1.7', margin: 0, fontWeight: 600 }}>
                              {t.limitations}
                            </p>
                          </div>
                        )}

                        {/* 4. KEY BENEFITS CHECKLIST */}
                        <div style={{ marginTop: '28px' }}>
                          <h4 style={{ color: DARK, fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>
                            Primary Clinical Benefits:
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '12px' }}>
                            {t.benefits.map((b, bIdx) => (
                              <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <FaCheckCircle style={{ color: PRIMARY, flexShrink: 0, marginTop: '3px', fontSize: '15px' }} />
                                <span style={{ color: '#334155', fontSize: '0.92rem', lineHeight: '1.5' }}>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* CTA BANNER */}
      <section style={{ background: 'linear-gradient(135deg, #1a6e52 0%, #0d3b2e 100%)', padding: '80px 20px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '16px' }}>
            Tailor These Therapies to Your Diagnosis
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '32px' }}>
            Book a clinical consultation to discuss which of these 9 integrative protocols best fit your specific tumor profile and conventional treatment timeline.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: ACCENT,
              color: '#fff',
              padding: '16px 36px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(56,190,213,0.4)'
            }}
          >
            Consultation with Clinical Team <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
