import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown, FaTruck, FaUndo, FaCreditCard, FaQuestionCircle, FaLeaf } from 'react-icons/fa';

const PRIMARY = '#1a6e52';
const ACCENT  = '#38bed5';

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All FAQs', icon: <FaQuestionCircle /> },
  { id: 'tracking', label: 'Shipping & Tracking', icon: <FaTruck /> },
  { id: 'returns', label: 'Returns & Cancellations', icon: <FaUndo /> },
  { id: 'payments', label: 'Payments & Refunds', icon: <FaCreditCard /> },
];

const FAQ_ITEMS = [
  {
    category: 'tracking',
    question: 'How do I track my order status?',
    answer: 'Once your order is confirmed, you can track its progress in real-time by visiting our "Track Order" page. Simply enter your unique Order ID and the phone number or email address associated with the order. You will see a step-by-step shipment timeline from placement to delivery.'
  },
  {
    category: 'tracking',
    question: 'What happens if a delivery attempt fails?',
    answer: 'Our courier partners make up to three attempts to deliver your package. If you are unavailable or the address is unreachable, our executive will contact you. If all three attempts fail, the package is flagged as "Delivery Failed" and returned to our warehouse (RTO). Please contact support immediately if you miss a delivery.'
  },
  {
    category: 'tracking',
    question: 'Do you ship to my pincode?',
    answer: 'We deliver to over 26,000+ pincodes across India via Shiprocket. You can verify serviceability on the Checkout page by entering your 6-digit pin code. Most shipments reach major cities within 3-5 business days and other regions in 5-7 business days.'
  },
  {
    category: 'returns',
    question: 'Can I cancel my order after it has been placed?',
    answer: 'Yes, you can request order cancellation directly from the "Order Details" page as long as the order status is "Order Placed" or "Order Confirmed". Once the package has been handed over to the courier ("Shipped"), it can no longer be cancelled.'
  },
  {
    category: 'returns',
    question: 'How do I request a return or exchange?',
    answer: 'If you receive a damaged, expired, or incorrect product, you can request a return from your "Order Details" page within 7 days of delivery. You will need to select a reason, describe the issue, and optionally upload evidence/photos of the product. Our team will review the request and schedule a reverse pickup if approved.'
  },
  {
    category: 'returns',
    question: 'Is physical return always required?',
    answer: 'Not always. Depending on the issue (e.g. expired or completely broken bottle), our administrative team may approve a direct refund without requiring you to ship the physical product back. This decision is made on a case-by-case basis during request review.'
  },
  {
    category: 'payments',
    question: 'How long does a refund take to reflect in my account?',
    answer: 'For prepaid orders processed via Razorpay, gateway refunds are initiated automatically upon approval. The refund typically takes 5 to 7 business days to reflect in your original payment method. For Cash-on-Delivery (COD) orders, our team will process the refund manually via bank transfer or UPI within 24-48 hours once you provide your payment details.'
  },
  {
    category: 'payments',
    question: 'My payment failed but money was debited. What should I do?',
    answer: 'Do not worry. If your account is debited but the payment fails on our system, the payment gateway (Razorpay) will automatically refund the amount to your account within 24-48 hours. If the status remains unresolved, please contact us on WhatsApp with the transaction reference, and we will verify the status immediately.'
  },
  {
    category: 'payments',
    question: 'Can I retry payment if my online transaction fails?',
    answer: 'Yes! If your payment fails during checkout, the order is saved as "Payment Pending". You can locate the order in your "My Orders" dashboard or "Track Order" page and click the "Retry Payment" button to safely complete the online transaction without rebuilding your cart.'
  }
];

export default function OrderFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs based on search and category
  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      
      {/* Hero Strip */}
      <section style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
        padding: '80px 20px 60px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: `${ACCENT}22`,
          border: `1px solid ${ACCENT}44`,
          color: ACCENT,
          padding: '6px 16px',
          borderRadius: '50px',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '16px'
        }}>
          <FaLeaf /> Support Center
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          margin: '0 0 16px',
        }}>
          Frequently Asked <span style={{ color: ACCENT }}>Questions</span>
        </h1>
        <p style={{ opacity: 0.85, fontSize: '1rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Find instant answers to order placements, secure tracking, cancellations, return policies, and refund processing.
        </p>

        {/* Search Bar */}
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px 16px 48px',
              borderRadius: '50px',
              border: 'none',
              background: '#fff',
              color: '#0f172a',
              fontSize: '15px',
              outline: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
          <FaSearch style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8',
            fontSize: '18px'
          }} />
        </div>
      </section>

      {/* Main content grid */}
      <div style={{ maxWidth: '900px', margin: '40px auto 0', padding: '0 16px' }}>
        
        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '32px',
          justifyContent: 'center',
          scrollbarWidth: 'none'
        }}>
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: isActive ? PRIMARY : '#fff',
                  color: isActive ? '#fff' : '#475569',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <AnimatePresence>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      style={{
                        width: '100%',
                        padding: '24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '16px',
                        gap: '16px',
                        fontFamily: 'inherit'
                      }}
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: PRIMARY,
                        flexShrink: 0
                      }} />
                    </button>

                    {/* Expandable Panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div style={{
                            padding: '0 24px 24px',
                            color: '#475569',
                            fontSize: '14.5px',
                            lineHeight: 1.7,
                            borderTop: '1px solid #f1f5f9'
                          }}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '48px',
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                color: '#64748b'
              }}>
                <p style={{ fontSize: '16px', margin: '0 0 8px', fontWeight: 600 }}>No FAQs found</p>
                <p style={{ fontSize: '13.5px', margin: 0 }}>Try clearing search filter or typing a different keyword.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Support Section */}
        <div style={{
          marginTop: '56px',
          background: `linear-gradient(135deg, ${PRIMARY}dd, #0f3460dd)`,
          padding: '36px',
          borderRadius: '24px',
          textAlign: 'center',
          color: '#fff',
          boxShadow: '0 10px 30px rgba(26, 110, 82, 0.15)'
        }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', margin: '0 0 8px' }}>
            Still have questions?
          </h3>
          <p style={{ opacity: 0.9, fontSize: '13.5px', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Our patient relationship executives are available on WhatsApp and Phone to resolve order tracking or cancellation issues.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/918884588835"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#25d366',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              💬 WhatsApp Support
            </a>
            <a
              href="tel:+918884588835"
              style={{
                border: '2px solid #fff',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📞 Call +91 88845 88835
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
