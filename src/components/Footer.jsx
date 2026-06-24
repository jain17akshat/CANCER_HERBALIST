import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaFacebook, FaYoutube, FaInstagram, FaLinkedin,
  FaArrowRight, FaHeart, FaShieldAlt, FaUserMd, FaStar,
  FaWhatsapp, FaChevronRight
} from 'react-icons/fa';

const ACCENT = '#38bed5';
const DARK = '#0a1628';
const WHITE60 = 'rgba(255,255,255,0.60)';
const WHITE80 = 'rgba(255,255,255,0.85)';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Services', to: '/services' },
  { label: 'Treatment Methods', to: '/treatment-methods' },
  { label: 'Our Team', to: '/doctors' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Blog & Articles', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

const services = [
  { label: 'Breast Cancer Support', to: '/services/breast-cancer' },
  { label: 'Lung Cancer Support', to: '/services/lung-cancer' },
  { label: 'Colon Cancer Support', to: '/services/colon-cancer' },
  { label: 'Prostate Cancer Support', to: '/services/prostate-cancer' },
  { label: 'Liver Cancer Support', to: '/services/liver-cancer' },
  { label: 'Blood Cancer Support', to: '/services/blood-cancer' },
];

const socials = [
  { icon: <FaFacebook />, url: 'https://www.facebook.com/CancerHerbalist', label: 'Facebook' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/cancerherbalist/', label: 'Instagram' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/@Cancerherbalist', label: 'YouTube' },
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/cancer-herbalist/', label: 'LinkedIn' },
  { icon: <FaWhatsapp />, url: 'https://whatsapp.com/channel/0029VaUmEyA9sBI5MreM5j19', label: 'WhatsApp' },
];



export default function Footer() {

  return (
    <footer style={{ background: DARK, color: WHITE60, fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>



      {/* ── Main Footer Grid ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '70px 20px 40px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px,1.6fr) repeat(3, minmax(160px,1fr))', gap: '48px', marginBottom: '56px' }}>

          {/* Column 1 — Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none' }}>
              <img src="/logo2.png" alt="Cancer Herbalist" style={{ width: '200px', height: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p style={{ lineHeight: '1.8', fontSize: '0.9rem', color: WHITE60, marginBottom: '28px' }}>
              Integrating evidence-based phytotherapeutic treatments and dietary nutrition to assist your body's natural recovery cycles. Trusted by patients across India and worldwide.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: WHITE60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', textDecoration: 'none', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = WHITE60; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact Snippet */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="tel:8884588835" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: WHITE60, textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = WHITE60)}>
                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, flexShrink: 0 }}><FaPhoneAlt /></span>
                88845 88835
              </a>
              <a href="mailto:cancerherbalist@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: WHITE60, textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = WHITE60)}>
                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, flexShrink: 0 }}><FaEnvelope /></span>
                cancerherbalist@gmail.com
              </a>
             <a
  href="mailto:drherbalistindia@gmail.com"
  style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    color: WHITE60,
    textDecoration: 'none',
    fontSize: '13px',
    transition: 'color 0.2s'
  }}
  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
  onMouseLeave={(e) => (e.currentTarget.style.color = WHITE60)}
>
  <span
    style={{
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: `${ACCENT}22`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: ACCENT,
      flexShrink: 0
    }}
  >
    <FaEnvelope />
  </span>

  <div>
    <div>drherbalistindia@gmail.com</div>
    <div
      style={{
        fontSize: '11px',
        opacity: 0.7,
        marginTop: '2px'
      }}
    >
      For Appointment Bookings & Patient Enquiries
    </div>
  </div>
</a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: WHITE60, fontSize: '13px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${ACCENT}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, flexShrink: 0, marginTop: '1px' }}><FaMapMarkerAlt /></span>
                <span style={{ lineHeight: '1.7' }}>Agara Main Road, Near Dinnepalya Bus Stand, Kaggalipura Post, Off Kanakapura Road, Bangalore 560116</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '24px', paddingBottom: '12px', borderBottom: `2px solid ${ACCENT}`, display: 'inline-block' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    style={{ color: WHITE60, textDecoration: 'none', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = WHITE60; e.currentTarget.style.paddingLeft = '0'; }}
                  >
                    <FaChevronRight style={{ fontSize: '9px', flexShrink: 0 }} />{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Our Services */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '24px', paddingBottom: '12px', borderBottom: `2px solid ${ACCENT}`, display: 'inline-block' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    style={{ color: WHITE60, textDecoration: 'none', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = WHITE60; e.currentTarget.style.paddingLeft = '0'; }}
                  >
                    <FaChevronRight style={{ fontSize: '9px', flexShrink: 0 }} />{s.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust Badge */}
            <div style={{ marginTop: '28px', background: `${ACCENT}15`, border: `1px solid ${ACCENT}33`, borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <FaLeaf style={{ color: ACCENT }} />
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>100% Natural  </span>
              </div>
              <p style={{ color: WHITE60, fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
                All our herbal formulas are reviewed for safety, purity, and drug-herb interactions.
              </p>
            </div>
          </div>

          {/* Column 4 — Working Hours & CTA */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '24px', paddingBottom: '12px', borderBottom: `2px solid ${ACCENT}`, display: 'inline-block' }}>
              Clinic Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {[
                { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                { day: 'Saturday', time: '9:00 AM – 4:00 PM' },
              
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: WHITE60, fontSize: '12.5px' }}>{h.day}</span>
                  <span style={{ color: ACCENT, fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap' }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: ACCENT, color: '#fff', padding: '14px 20px', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', transition: 'opacity 0.2s', marginBottom: '12px' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Book Free Consultation <FaArrowRight />
            </Link>
            <a
              href="https://whatsapp.com/channel/0029VaUmEyA9sBI5MreM5j19"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25d366', color: '#fff', padding: '14px 20px', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <FaWhatsapp style={{ fontSize: '18px' }} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div style={{ background: 'rgba(56,190,213,0.07)', border: '1px solid rgba(56,190,213,0.18)', borderRadius: '14px', padding: '20px 24px', marginBottom: '36px' }}>
          <p style={{ color: WHITE60, fontSize: '12px', lineHeight: '1.8', margin: 0 }}>
            <span style={{ color: ACCENT, fontWeight: 700 }}>⚕ Medical Disclaimer: </span>
            The information and services offered on this website are for educational and cellular-supportive purposes only. They are not intended to diagnose, cure, mitigate, or treat cancer, nor are they a replacement for professional oncological care, surgeries, chemotherapy, or radiotherapy. Always consult your oncology supervisor or qualified medical team before starting any new herbal, dietary, or nutritional protocols.
          </p>
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: WHITE60, fontSize: '13px' }}>
            <FaLeaf style={{ color: ACCENT }} />
            <span>© {new Date().getFullYear()} <span style={{ color: WHITE80, fontWeight: 600 }}>Cancer Herbalist</span>. All rights reserved.</span>
          </div>

          {/* ── FSSAI Badge ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '8px 16px' }}>
            <img
              src="/images/fssai logo.png"
              alt="FSSAI Certified"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '12px' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>FSSAI Licence No.</div>
              <div style={{ color: WHITE80, fontWeight: 700, fontSize: '13px', letterSpacing: '0.5px' }}>11226998000043</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy', to: '/privacy-policy' },
              { label: 'Terms of Service', to: '/terms-of-service' },
              { label: 'Refund Policy', to: '/refund-policy' },
            ].map((item) => (
              <Link key={item.label} to={item.to} style={{ color: WHITE60, textDecoration: 'none', fontSize: '12.5px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = WHITE60)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div style={{ color: WHITE60, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Made with <FaHeart style={{ color: '#ef4444', fontSize: '11px', margin: '0 2px' }} /> for healing
          </div>
        </div>
      </div>

      {/* Responsive Grid Fix */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}