import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaUser, FaCheckCircle, FaStar, FaLeaf, FaPlay } from 'react-icons/fa';

const ACCENT = '#38bed5';

const storyData = {
  1: {
    name: 'Sarah Jenkins',
    condition: 'Breast Cancer (Stage 3)',
    status: '5 Years Cancer-Free',
    videoUrl: 'https://www.youtube.com/embed/i5VuQjcV30w',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1600&h=900',
    readTime: '10 min read',
    date: 'January 15, 2026',
    content: [
      {
        heading: 'The Beginning of the Journey',
        body: `Sarah Jenkins was diagnosed with Stage 3 Breast Cancer (Infiltrating Ductal Carcinoma, HER2 Positive) in early 2020 at the age of 42. The diagnosis came as a shock—she had no family history of cancer and maintained a healthy, active lifestyle. Initial imaging revealed a 4.2 cm tumor with involvement of three auxiliary lymph nodes.`
      },
      {
        heading: 'The Conventional Treatment Path',
        body: `Sarah's oncology team recommended an aggressive treatment protocol: six cycles of targeted chemotherapy (Taxotere, Carboplatin, and Herceptin), followed by bilateral mastectomy, and then radiation therapy. While the treatment was medically necessary, Sarah experienced severe side effects including extreme fatigue, nausea, neuropathy in her hands and feet, and significant weight loss. Her quality-of-life score dropped to 35 out of 100 during the peak of chemotherapy.`
      },
      {
        heading: 'Discovering Integrative Support',
        body: `During her third chemotherapy cycle, Sarah began exploring complementary approaches to support her body through treatment. After extensive research and consultations, she was introduced to a structured herbal support program designed to work alongside her conventional treatment—not replace it. Her oncology team was consulted and agreed to monitor her progress with the integrative additions.`
      },
      {
        heading: 'The Herbal Support Protocol',
        body: `Sarah's personalized herbal protocol included cellular vitality tinctures made from concentrated turmeric (curcumin), ashwagandha, and medicinal mushroom extracts (reishi, turkey tail). She also followed active green botanical infusions with matcha, moringa, and tulasi (holy basil). A custom low-inflammatory dietary plan was developed, emphasizing omega-3-rich foods, cruciferous vegetables, berries, and fermented foods while eliminating processed sugars and refined carbohydrates.`
      },
      {
        heading: 'Measurable Improvements',
        body: `Within the first three months of integrating the herbal support protocol, Sarah reported notable improvements. Her immune cell count (Natural Killer cells) improved from a deficient 180 to an optimized 420. Her inflammatory markers (hs-CRP) dropped from 8.4 mg/L to 1.2 mg/L. Most importantly to Sarah, her quality-of-life score improved from 35/100 to 88/100. She regained her appetite, her energy stabilized, and the neuropathy symptoms reduced significantly.`
      },
      {
        heading: 'Surgery and Recovery',
        body: `Sarah's post-chemotherapy imaging showed a remarkable response—the primary tumor had shrunk by over 70%. She proceeded with surgery, and pathology confirmed near-complete pathological response. Her surgical recovery was described by her medical team as "exceptionally smooth," with no wound complications and rapid healing. She attributes part of this to the anti-inflammatory and immune-supporting properties of her herbal protocol.`
      },
      {
        heading: 'Life Five Years Later',
        body: `Today, five years after her initial diagnosis, Sarah remains cancer-free. She continues a maintenance herbal protocol and follows the nutritional guidelines that became a permanent part of her lifestyle. She exercises regularly, mentors newly diagnosed breast cancer patients, and advocates for integrative approaches that complement conventional oncology care. Her story is a testament to resilience, informed decision-making, and the power of comprehensive, multi-modal cancer support.`
      },
      {
        heading: 'Key Takeaways',
        body: `Sarah's journey highlights several important lessons: early detection and prompt treatment are crucial; integrative herbal support can complement conventional therapy when properly supervised; nutritional optimization plays a vital role in treatment tolerance and recovery; quality of life matters as much as clinical outcomes; and every patient's journey is unique—what works for one person may differ for another. Always consult with your oncology team before adding any supplements or herbal protocols to your treatment plan.`
      }
    ]
  },
  2: {
    name: 'Robert Chen',
    condition: 'Lung Cancer (Stage 2)',
    status: '3 Years Stable & Healthy',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600&h=900',
    readTime: '9 min read',
    date: 'March 5, 2026',
    content: [
      {
        heading: 'An Unexpected Diagnosis',
        body: `Robert Chen, a 56-year-old retired engineer, never smoked a day in his life. So when a persistent cough led to a CT scan revealing a 3.1 cm mass in his right upper lobe, both he and his family were stunned. A biopsy confirmed Stage 2 non-small cell lung cancer (adenocarcinoma). The diagnosis came during a routine check-up—Robert had no pain, no weight loss, and no shortness of breath at the time.`
      },
      {
        heading: 'Navigating Treatment Options',
        body: `Robert's thoracic oncologist recommended a lobectomy (surgical removal of the affected lobe) followed by four cycles of adjuvant chemotherapy to reduce the risk of recurrence. Robert researched extensively and sought second opinions. He was particularly concerned about maintaining his lung capacity and overall quality of life after surgery, given his active lifestyle that included hiking and swimming.`
      },
      {
        heading: 'Integrating Pulmonary Herbal Support',
        body: `After his surgery was successfully completed, Robert began working with an integrative medicine team alongside his oncologist. His personalized pulmonary herbal protocol included mullein leaf and elecampane root preparations traditionally used to support respiratory function, adaptogenic herbs including rhodiola and astragalus for immune recovery, and medicinal mushroom blends (cordyceps, chaga) known for their lung-supporting properties. A structured breathing exercise program was also integrated into his recovery.`
      },
      {
        heading: 'Recovery and Progress',
        body: `Robert's post-surgical recovery exceeded expectations. His pulmonary function tests showed faster-than-anticipated improvement—he regained 85% of his pre-surgery lung capacity within four months. His chemotherapy tolerance was notably good, with his oncologist commenting on the stability of his blood counts throughout treatment. Robert maintained his weight, continued gentle exercise, and reported manageable fatigue levels compared to typical expectations.`
      },
      {
        heading: 'Three Years of Stability',
        body: `Now three years post-diagnosis, Robert's follow-up scans remain clear. His pulmonary function has stabilized at 90% of pre-surgery capacity, and he has returned to hiking—recently completing a 15-mile trail in the Pacific Northwest. He continues a maintenance herbal protocol and credits the combination of excellent surgical care, chemotherapy, and integrative support for his positive outcome. He remains under regular oncological surveillance with CT scans every six months.`
      },
      {
        heading: 'Robert\'s Advice to Others',
        body: `Robert emphasizes three lessons from his experience: never ignore persistent symptoms even if you don't fit the "typical" risk profile; seek multiple opinions and explore all available support options; and stay active throughout treatment as much as your body allows. He also stresses the importance of transparency with your medical team about any supplements or herbal protocols you incorporate. "Communication between all your care providers is essential," he says.`
      }
    ]
  },
  3: {
    name: 'Helena Silva',
    condition: 'Colon Cancer (Stage 4)',
    status: 'In Full Remission',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600&h=900',
    readTime: '11 min read',
    date: 'April 18, 2026',
    content: [
      {
        heading: 'A Devastating Diagnosis',
        body: `Helena Silva, a 58-year-old mother of three, was diagnosed with Stage 4 colon cancer (adenocarcinoma with secondary hepatic lesions) after months of unexplained digestive issues and fatigue. By the time she sought medical attention, the cancer had spread to her liver with two detectable metastatic lesions. Her initial prognosis was guarded, and her family was told to prepare for a challenging journey ahead.`
      },
      {
        heading: 'Aggressive Conventional Treatment',
        body: `Helena's treatment plan was extensive: FOLFOX chemotherapy (a combination of folinic acid, fluorouracil, and oxaliplatin) for the primary tumor, followed by targeted therapy with bevacizumab for the liver metastases, and eventual surgical evaluation. The treatment was grueling—Helena experienced severe nausea, dramatic weight loss (12 kg in three months), elevated liver enzymes, and profound fatigue that left her unable to perform daily activities.`
      },
      {
        heading: 'The Turning Point',
        body: `During her fourth chemotherapy cycle, Helena's CEA tumor marker was at 45.0 ng/mL and her liver enzyme (ALT) had risen to 110 U/L. Her medical team was considering adjusting her treatment protocol. It was at this point that Helena's daughter researched complementary support options and connected with an integrative medicine team specializing in gut health and hepatoprotective botanical support.`
      },
      {
        heading: 'Gut Restoration and Liver Support Protocol',
        body: `Helena's integrative protocol was designed specifically to support her body during aggressive treatment. It included hepatoprotective botanical extracts (milk thistle standardized to 80% silymarin, schisandra berry, and dandelion root) for liver support, gut mucosa barrier-repair powders containing L-glutamine, slippery elm, and marshmallow root, organic cellular detox syrups with chlorella and spirulina, and a carefully structured anti-inflammatory diet rich in easily digestible proteins, bone broth, and probiotic-rich fermented foods.`
      },
      {
        heading: 'Remarkable Clinical Improvements',
        body: `Over the following 18 months, Helena's clinical progress astonished her medical team. Her CEA tumor marker dropped from 45.0 ng/mL to 1.8 ng/mL—well within normal range. Her liver enzyme (ALT) normalized from 110 U/L to 32 U/L. She regained 8 kg of the weight she had lost. Follow-up CT scans demonstrated a significant reduction in the secondary liver lesions, and her oncologist described her response as "exceptional." She was eventually able to undergo successful surgical resection of the remaining liver lesion.`
      },
      {
        heading: 'Full Remission',
        body: `After completing her full treatment course—chemotherapy, targeted therapy, surgery, and continuous integrative support—Helena's latest comprehensive scan showed no evidence of disease. She has been in full remission for over a year. Her gastroenterologist notes that her gut health markers are now within optimal ranges, and she reports energy levels and quality of life that she hasn't experienced in years.`
      },
      {
        heading: 'Helena\'s Message of Hope',
        body: `Helena's story is one of determination and comprehensive care. She is quick to credit her conventional medical team for the aggressive treatment that targeted her cancer, while also acknowledging the role that integrative support played in helping her body tolerate treatment and recover. "I believe in using every tool available," she says. "My doctors saved my life, and the herbal support helped me maintain the strength to get through it." She now volunteers at a local cancer support group, sharing her experience and encouraging others to explore all available support options in consultation with their medical teams.`
      },
      {
        heading: 'Important Medical Note',
        body: `Helena's case involved Stage 4 cancer with liver metastases—an extremely serious diagnosis. Her positive outcome resulted from a combination of aggressive conventional treatment, surgical intervention, and complementary integrative support. Every patient's cancer is different, and outcomes vary significantly. Herbal support protocols should never replace conventional cancer treatment but may serve as a complementary approach when supervised by qualified healthcare professionals. Always discuss any supplements with your oncology team.`
      }
    ]
  }
};

export default function StoryDetail() {
  const { id } = useParams();
  const story = storyData[parseInt(id)];

  if (!story) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: '#0f172a' }}>Story not found</h2>
        <Link to="/testimonials" style={{ color: ACCENT, textDecoration: 'none', fontWeight: 600 }}>← Back to Success Stories</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero with Video */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '120px 20px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Back + Meta */}
          <Link to="/testimonials" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: 600, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >
            <FaArrowLeft /> Back to Success Stories
          </Link>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span style={{ background: ACCENT, color: '#fff', padding: '5px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: 700 }}>
              {story.condition}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: '#10b981', padding: '5px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaCheckCircle style={{ fontSize: '10px' }} /> {story.status}
            </span>
          </div>

          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontFamily: 'Playfair Display, serif', lineHeight: 1.3, marginBottom: '10px' }}>
            {story.name}'s Healing Journey
          </h1>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '30px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaUser /> {story.name}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaClock /> {story.readTime}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaStar style={{ color: '#FBBF24' }} /> Featured Story
            </span>
          </div>

          {/* YouTube Video Embed */}
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            borderRadius: '20px 20px 0 0',
            overflow: 'hidden',
            boxShadow: '0 -4px 40px rgba(56,190,213,0.2)',
          }}>
            <iframe
              src={story.videoUrl}
              title={`${story.name} - ${story.condition}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Patient Quick Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #f0fdfe, #e0f7fa)',
            borderRadius: '20px',
            padding: '28px 32px',
            marginBottom: '48px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            border: '1px solid rgba(56,190,213,0.15)',
          }}
        >
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '4px' }}>Patient</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{story.name}</div>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '4px' }}>Diagnosis</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>{story.condition}</div>
          </div>
          <div style={{ flex: '1 1 150px' }}>
            <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '4px' }}>Current Status</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaCheckCircle style={{ fontSize: '14px' }} /> {story.status}
            </div>
          </div>
        </motion.div>

        {/* Article Sections */}
        {story.content.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{ marginBottom: '40px' }}
          >
            <h2 style={{
              color: '#0f172a',
              fontSize: '1.4rem',
              fontFamily: 'Playfair Display, serif',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <FaLeaf style={{ color: ACCENT, fontSize: '16px', flexShrink: 0 }} />
              {section.heading}
            </h2>
            <p style={{ color: '#475569', lineHeight: '1.9', fontSize: '1.02rem' }}>{section.body}</p>
          </motion.div>
        ))}

        {/* Disclaimer */}
        <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px 24px', marginBottom: '40px' }}>
          <p style={{ color: '#92400e', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
            ⚠️ <strong>Medical Disclaimer:</strong> This patient story is shared for educational and inspirational purposes only. Individual results vary significantly. Herbal support protocols are complementary and should never replace conventional cancer treatment. Always consult your oncologist and healthcare team before making any changes to your treatment plan.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #f0fdfe, #e0f7fa)', borderRadius: '24px', padding: '40px' }}>
          <h3 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '12px' }}>
            Ready to Start Your Healing Journey?
          </h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Book a free consultation with our herbal medicine specialists today.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: ACCENT,
              color: '#fff',
              padding: '14px 36px',
              borderRadius: '50px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              boxShadow: `0 8px 24px ${ACCENT}44`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${ACCENT}66`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${ACCENT}44`; }}
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
