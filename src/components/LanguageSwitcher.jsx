import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const PRIMARY = '#1a6e52';
const ACCENT  = '#38bed5';

export default function LanguageSwitcher({ mobile = false }) {
  const { currentLang, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (code) => {
    setOpen(false);
    setLanguage(code);
  };

  if (mobile) {
    return (
      <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: '4px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          🌐 Language / भाषा
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                border: currentLang === lang.code ? `1.5px solid ${PRIMARY}` : '1.5px solid rgba(0,0,0,0.12)',
                background: currentLang === lang.code ? `${PRIMARY}12` : 'transparent',
                color: currentLang === lang.code ? PRIMARY : '#374151',
                fontSize: '12.5px',
                fontWeight: currentLang === lang.code ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.18s',
              }}
            >
              {lang.native}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger Button — icon only to keep navbar compact */}
      <button
        onClick={() => setOpen((p) => !p)}
        title={`Language: ${current.name}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          padding: '7px 10px',
          borderRadius: '50px',
          border: `1.5px solid ${open ? PRIMARY : 'rgba(0,0,0,0.14)'}`,
          background: open ? `${PRIMARY}10` : 'transparent',
          color: open ? PRIMARY : '#374151',
          fontSize: '16px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = PRIMARY;
          e.currentTarget.style.color = PRIMARY;
          e.currentTarget.style.background = `${PRIMARY}08`;
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.14)';
            e.currentTarget.style.color = '#374151';
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        <span>🌐</span>
        <span style={{
          fontSize: '9px',
          opacity: 0.5,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.09)',
          borderRadius: '16px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
          padding: '10px',
          zIndex: 9999,
          minWidth: '220px',
          maxHeight: '380px',
          overflowY: 'auto',
        }}>
          <p style={{
            fontSize: '10.5px',
            fontWeight: 700,
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '4px 10px 8px',
          }}>
            Select Language
          </p>

          {languages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? `${PRIMARY}12` : 'transparent',
                  color: isActive ? PRIMARY : '#374151',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                  marginBottom: '2px',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = `${PRIMARY}0a`; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span>{lang.native}</span>
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 400, marginLeft: '8px' }}>
                  {lang.name}
                </span>
                {isActive && (
                  <span style={{ color: PRIMARY, fontSize: '12px', marginLeft: '6px', flexShrink: 0 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
