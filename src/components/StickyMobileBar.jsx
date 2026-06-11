import React from 'react';
import { FaPhone, FaWhatsapp, FaCalendarCheck } from 'react-icons/fa';

export default function StickyMobileBar() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--gray-2)',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.08)',
          zIndex: 997,
          display: 'none',
          gridTemplateColumns: 'repeat(3, 1fr)',
          height: '68px',
        }}
        className="sticky-mobile-bar"
      >
        {/* Call Now */}
        <a
          href="tel:+8884588835"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--dark-2)',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: '600',
            borderRight: '1px solid var(--gray-2)',
          }}
        >
          <FaPhone style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '4px' }} />
          Call Now
        </a>

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/8884588835?text=Hi!%20I%20would%20like%20to%20inquire%20about%20herbal%20treatment%20support."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--dark-2)',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: '600',
            borderRight: '1px solid var(--gray-2)',
          }}
        >
          <FaWhatsapp style={{ fontSize: '20px', color: '#25D366', marginBottom: '4px' }} />
          WhatsApp
        </a>

        {/* Book Assessment */}
        <a
          href="#consultation"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            background: 'var(--gradient-green)',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: '700',
          }}
        >
          <FaCalendarCheck style={{ fontSize: '18px', color: 'white', marginBottom: '4px' }} />
          Book Assessment
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sticky-mobile-bar {
            display: grid !important;
          }
          body {
            padding-bottom: 68px !important; /* Add spacing at the bottom of the body so content isn't cut off by the sticky bar */
          }
        }
      `}</style>
    </>
  );
}
