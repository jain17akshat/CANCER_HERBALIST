import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'Can I take herbal treatments alongside chemotherapy or radiation?',
    answer: 'Yes, our herbal support protocols are designed to complement conventional cancer treatments. We screen all selected botanical ingredients against your current oncological prescription to ensure there are no compound interactions or negative compromises.',
  },
  {
    question: 'Are there any side effects to the herbal formulas?',
    answer: 'Our formulations consist of premium, certified natural organic herbs with an established safety profile. Since they are personalized to your organ filtration capacity (liver & kidneys), adverse side effects are extremely rare. Any mild reactions (e.g., digestive adjustments) are managed during weekly check-ins.',
  },
  {
    question: 'How do you determine which herbs I need?',
    answer: 'The process starts with our clinical evaluation. We review your biopsy reports, genomic profiles (if available), blood count summaries, and diagnostic scans. Based on this, Dr. Carter\'s team selects specific phytotherapeutic compounds to address tumor pathway support.',
  },
  {
    question: 'Do you ship treatments internationally?',
    answer: 'Yes. We deliver our customized clinical-grade herbal formulations to patients in over 45 countries worldwide. All formulations are packaged in compliance with international custom medical regulations, accompanied by step-by-step prescription logs.',
  },
  {
    question: 'How long does a typical support protocol last?',
    answer: 'A standard supportive cycle runs between 3 to 6 months, after which we request updated blood panels and scans to re-evaluate and modify the formulas. Some patients choose long-term wellness protocols spanning 12 to 24 months for recurrence prevention.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: 'var(--white)' }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-badge">
            <FaQuestionCircle /> Patient Support Q&A
          </span>
          <h2 className="section-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Get clarity on treatment compatibility, clinical screening, shipment, and our personalized herbal consultation processes.
          </p>
        </div>

        {/* FAQ Accordion list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                style={{
                  background: 'var(--gray-1)',
                  borderRadius: '16px',
                  border: isOpen ? '1px solid var(--primary)' : '1px solid var(--gray-2)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(i)}
                  style={{
                    width: '100%',
                    padding: 'var(--faq-padding, 22px 28px)',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    outline: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '15.5px',
                      fontWeight: '700',
                      color: isOpen ? 'var(--primary-dark)' : 'var(--dark-2)',
                      fontFamily: 'Poppins, sans-serif',
                      transition: 'color 0.3s',
                    }}
                  >
                    {faq.question}
                  </span>
                  <span style={{ color: isOpen ? 'var(--primary)' : 'var(--gray-3)' }}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div
                        style={{
                          padding: 'var(--faq-content-padding, 0 28px 24px)',
                          fontSize: '14px',
                          color: 'var(--gray-3)',
                          lineHeight: '1.7',
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
