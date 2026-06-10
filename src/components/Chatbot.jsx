import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    q: 'Can I take herbal treatments alongside chemotherapy?',
    a: 'Yes, our herbal support protocols are designed to complement conventional cancer treatments. We screen all ingredients against your current prescription to avoid interactions.',
  },
  {
    q: 'Are there any side effects?',
    a: 'Our formulations consist of premium, certified natural organic herbs. Adverse side effects are extremely rare. Any mild reactions are managed during weekly check-ins.',
  },
  {
    q: 'How do you determine which herbs I need?',
    a: 'We review your biopsy reports, genomic profiles, and diagnostic scans. Based on this, Dr. Carter\'s team selects specific compounds to address tumor pathway support.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We deliver our customized formulations to patients in over 45 countries worldwide.',
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your virtual assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([
    { id: 'faq', label: 'Frequently Asked Questions' },
    { id: 'about', label: 'Understand Cancer Herbalist' },
    { id: 'appointment', label: 'Book an Appointment' }
  ]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, options]);

  const handleOptionClick = (optionId) => {
    let botResponse = '';
    let newOptions = [];

    if (optionId === 'faq') {
      botResponse = 'Here are some of our most frequently asked questions. Please select one:';
      newOptions = faqs.map((faq, index) => ({ id: `faq_${index}`, label: faq.q }));
    } else if (optionId === 'about') {
      botResponse = 'Cancer Herbalist is a specialized clinic offering personalized, evidence-based phytotherapy protocols designed to support cancer patients. Our formulations are tailored to your specific pathology and work alongside conventional treatments to improve outcomes and quality of life.';
      newOptions = [
        { id: 'appointment', label: 'Book an Appointment' },
        { id: 'start', label: 'Back to main menu' }
      ];
    } else if (optionId === 'appointment') {
      botResponse = 'We would be honored to assist you. You can book an appointment by visiting our Contact page and filling out the consultation form.';
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: botResponse, sender: 'bot' },
        { id: Date.now() + 2, type: 'action', text: 'Go to Contact Page', action: () => { navigate('/contact'); setIsOpen(false); }, sender: 'bot' }
      ]);
      setOptions([{ id: 'start', label: 'Back to main menu' }]);
      return;
    } else if (optionId.startsWith('faq_')) {
      const index = parseInt(optionId.split('_')[1]);
      botResponse = faqs[index].a;
      newOptions = [
        { id: 'faq', label: 'More Questions' },
        { id: 'start', label: 'Back to main menu' }
      ];
    } else if (optionId === 'start') {
      botResponse = 'How else can I assist you?';
      newOptions = [
        { id: 'faq', label: 'Frequently Asked Questions' },
        { id: 'about', label: 'Understand Cancer Herbalist' },
        { id: 'appointment', label: 'Book an Appointment' }
      ];
    }

    setMessages(prev => [...prev, { id: Date.now(), text: botResponse, sender: 'bot' }]);
    setOptions(newOptions);
  };

  const handleUserMessage = (text) => {
    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Basic keyword matching for known intents
    const lowerText = text.toLowerCase();
    if (lowerText.includes('faq') || lowerText.includes('question')) {
      // Show FAQ list
      setTimeout(() => handleOptionClick('faq'), 600);
      return;
    }
    if (lowerText.includes('about') || lowerText.includes('who are you') || lowerText.includes('understand')) {
      setTimeout(() => handleOptionClick('about'), 600);
      return;
    }
    if (lowerText.includes('book') || lowerText.includes('appointment') || lowerText.includes('consultation')) {
      setTimeout(() => handleOptionClick('appointment'), 600);
      return;
    }

    // Fallback when we don't understand the query
    const botTypingId = Date.now() + 1;
    setMessages(prev => [...prev, { id: botTypingId, text: 'Thinking...', sender: 'bot' }]);
    setTimeout(() => {
      const fallback = "I’m sorry, I didn’t understand that. Please choose an option below or ask another question.";
      setMessages(prev => prev.map(m => m.id === botTypingId ? { id: Date.now() + 2, text: fallback, sender: 'bot' } : m));
      setOptions([
        { id: 'faq', label: 'Frequently Asked Questions' },
        { id: 'about', label: 'Understand Cancer Herbalist' },
        { id: 'appointment', label: 'Book an Appointment' }
      ]);
    }, 600);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const text = inputValue;
    setInputValue('');
    setOptions([]); // Hide options while responding
    handleUserMessage(text);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="chatbot-btn"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          boxShadow: 'var(--shadow-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '28px',
          zIndex: 999,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
        
        {/* Tooltip */}
        {!isOpen && (
          <span
            className="chatbot-tooltip"
            style={{
              position: 'absolute',
              right: '72px',
              background: 'white',
              color: 'var(--dark-2)',
              fontSize: '12px',
              fontWeight: '600',
              padding: '6px 14px',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-md)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            Virtual Assistant
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '180px',
              right: '30px',
              width: '350px',
              height: '500px',
              maxHeight: 'calc(100vh - 200px)',
              background: 'white',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid var(--gray-2)'
            }}
            className="chatbot-window"
          >
            {/* Header */}
            <div style={{
              background: 'var(--gradient-primary)',
              padding: '16px 20px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  <FaRobot />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>Support Assistant</h3>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              background: 'var(--gray-1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '4px'
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: msg.sender === 'user' ? 'var(--primary)' : 'white',
                    color: msg.sender === 'user' ? 'white' : 'var(--dark-2)',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: msg.sender === 'bot' ? 'var(--shadow-sm)' : 'none',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                  }}>
                    {msg.text}
                    {msg.type === 'action' && (
                      <button
                        onClick={msg.action}
                        style={{
                          display: 'block', width: '100%', marginTop: '10px',
                          padding: '8px 0', background: 'var(--primary-light)',
                          color: 'var(--primary-dark)', border: 'none', borderRadius: '8px',
                          fontWeight: '600', cursor: 'pointer', fontSize: '13px'
                        }}
                      >
                        {msg.text}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Options */}
              {options.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setMessages(prev => [...prev, { id: Date.now(), text: opt.label, sender: 'user' }]);
                        setOptions([]);
                        setTimeout(() => handleOptionClick(opt.id), 400);
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--primary)',
                        color: 'var(--primary)',
                        padding: '10px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
                    >
                      {opt.label}
                      <FaChevronRight size={10} />
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} style={{
              padding: '16px',
              background: 'white',
              borderTop: '1px solid var(--gray-2)',
              display: 'flex',
              gap: '10px'
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '24px',
                  border: '1px solid var(--gray-2)',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: inputValue.trim() ? 'var(--primary)' : 'var(--gray-2)',
                  color: 'white', border: 'none', cursor: inputValue.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.3s'
                }}
              >
                <FaPaperPlane size={14} style={{ marginLeft: '-2px' }} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .chatbot-tooltip {
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
        }
        .chatbot-btn:hover .chatbot-tooltip {
          opacity: 1;
          transform: translateX(0px);
        }
        @media (max-width: 768px) {
          .chatbot-btn {
            bottom: 150px !important; /* Move up on mobile to avoid overlapping with StickyMobileBar and WhatsApp */
            right: 20px !important;
            width: 50px !important;
            height: 50px !important;
            font-size: 24px !important;
          }
          .chatbot-tooltip { display: none !important; }
          .chatbot-window {
            bottom: 80px !important;
            right: 10px !important;
            left: 10px !important;
            width: auto !important;
            height: 60vh !important;
          }
        }
      `}</style>
    </>
  );
}
