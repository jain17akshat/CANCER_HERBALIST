import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <>
      <motion.a
        href="https://wa.me/918884588835?text=Hi!%20I%20would%20like%20to%20inquire%20about%20herbal%20treatment%20support."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '32px',
          zIndex: 998,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
        className="whatsapp-btn"
      >
        <FaWhatsapp />
        {/* Floating tooltip */}
        <span
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
          className="whatsapp-tooltip"
        >
          Chat with an Expert
        </span>
      </motion.a>

      <style>{`
        .whatsapp-tooltip {
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
        }
        .whatsapp-btn:hover .whatsapp-tooltip {
          opacity: 1;
          transform: translateX(0px);
        }
        @media (max-width: 768px) {
          .whatsapp-btn {
            bottom: 90px !important; /* Move up on mobile to avoid overlapping with StickyMobileBar */
            right: 20px !important;
            width: 50px !important;
            height: 50px !important;
            fontSize: 26px !important;
          }
          .whatsapp-tooltip { display: none !important; }
        }
      `}</style>
    </>
  );
}
