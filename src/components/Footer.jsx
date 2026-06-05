// import React from 'react';
// import { FaLeaf, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

// export default function Footer() {
//   return (
//     <footer
//       style={{
//         background: 'var(--dark-2)',
//         color: 'rgba(255,255,255,0.7)',
//         padding: 'var(--footer-padding, 80px 0 30px)',
//         borderTop: '3px solid var(--secondary)',
//         fontSize: '14px',
//       }}
//     >
//       <div className="container">
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//             gap: '40px',
//             marginBottom: '60px',
//           }}
//         >
//           {/* Logo & Tagline */}
//           <div>
//             <a
//               href="#home"
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 textDecoration: 'none',
//                 marginBottom: '20px',
//               }}
//             >
//               <div
//                 style={{
//                   width: '36px',
//                   height: '36px',
//                   borderRadius: '10px',
//                   background: 'var(--gradient-green)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <FaLeaf style={{ color: 'white', fontSize: '16px' }} />
//               </div>
//               <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '800', color: 'white' }}>
//                 Cancer <span style={{ color: 'var(--primary)' }}>Herbalist</span>
//               </div>
//             </a>
//             <p style={{ lineHeight: '1.7', marginBottom: '24px', fontSize: '13px' }}>
//               Integrating evidence-based phytotherapeutic treatments and dietary nutrition to assist your body\'s natural recovery cycles.
//             </p>
//             {/* Social Icons */}
//             <div style={{ display: 'flex', gap: '14px' }}>
//               {[
//                 { icon: <FaFacebook />, url: '#' },
//                 { icon: <FaTwitter />, url: '#' },
//                 { icon: <FaYoutube />, url: '#' },
//                 { icon: <FaInstagram />, url: '#' },
//               ].map((social, i) => (
//                 <a
//                   key={i}
//                   href={social.url}
//                   style={{
//                     width: '36px',
//                     height: '36px',
//                     borderRadius: '50%',
//                     background: 'rgba(255,255,255,0.08)',
//                     color: 'white',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: '16px',
//                     textDecoration: 'none',
//                     transition: 'all 0.3s ease',
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = 'var(--primary)';
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
//                     e.currentTarget.style.transform = 'translateY(0px)';
//                   }}
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
//               Quick Navigation
//             </h4>
//             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//               {[
//                 { label: 'Home', href: '#home' },
//                 { label: 'Services', href: '#services' },
//                 { label: 'Treatment Process', href: '#treatment' },
//                 { label: 'Expert Team', href: '#experts' },
//                 { label: 'Testimonials', href: '#testimonials' },
//                 { label: 'FAQ', href: '#faq' },
//               ].map((link) => (
//                 <li key={link.label}>
//                   <a
//                     href={link.href}
//                     style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }}
//                     onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
//                     onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.6)')}
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Educational Resources */}
//           <div>
//             <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
//               Educational Resources
//             </h4>
//             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//               {[
//                 'Cancer Nutrition Guide',
//                 'Lifestyle Guidance & Detox',
//                 'Phytochemical Research Database',
//                 'Chemotherapy Support Tips',
//                 'Patient Recovery Journals',
//               ].map((res) => (
//                 <li key={res}>
//                   <a
//                     href="#consultation"
//                     style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s', fontSize: '13px' }}
//                     onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
//                     onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.6)')}
//                   >
//                     {res}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Details */}
//           <div>
//             <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
//               Contact Office
//             </h4>
//             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
//               <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <FaPhoneAlt style={{ color: 'var(--primary)', flexShrink: 0 }} />
//                 <a href="tel:+1234567890" style={{ color: 'inherit', textDecoration: 'none' }}>+1 234 567 890</a>
//               </li>
//               <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <FaEnvelope style={{ color: 'var(--primary)', flexShrink: 0 }} />
//                 <a href="mailto:info@cancerherbalist.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@cancerherbalist.com</a>
//               </li>
//               <li style={{ display: 'flex', gap: '10px', lineHeight: '1.5' }}>
//                 <FaMapMarkerAlt style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />
//                 <span>100 Botanical Gardens, Suite 400, London, UK</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Legal Medical Disclaimer */}
//         <div
//           style={{
//             background: 'rgba(0,0,0,0.2)',
//             padding: 'var(--card-padding-sm, 24px 30px)',
//             borderRadius: '16px',
//             fontSize: '12px',
//             lineHeight: '1.6',
//             marginBottom: '40px',
//             border: '1px solid rgba(255,255,255,0.05)',
//             textAlign: 'justify',
//           }}
//         >
//           <strong>Medical Disclaimer:</strong> The information and services offered on this website are for educational and cellular-supportive purposes only. They are not intended to diagnose, cure, mitigate, or treat cancer, nor are they a replacement for professional oncological care, surgeries, chemotherapy, or radiotherapy. Always consult your oncology supervisor or qualified medical team before starting any new herbal, dietary, or nutritional protocols.
//         </div>

//         {/* Bottom Copyright */}
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             gap: '16px',
//             borderTop: '1px solid rgba(255,255,255,0.08)',
//             paddingTop: '30px',
//             fontSize: '12px',
//           }}
//         >
//           <span>&copy; {new Date().getFullYear()} Cancer Herbalist. All rights reserved.</span>
//           <div style={{ display: 'flex', gap: '20px' }}>
//             <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
//             <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


// // Social media links and website
// https://www.facebook.com/CancerHerbalist
// 
// 
// 
// https://x.com/HerbalistCancer
// https://cancerherbalist.quora.com/
// https://cancerherbalist.com
// https://whatsapp.com/channel/0029VaUmEyA9sBI5MreM5j19

import React from 'react';
import {
  FaLeaf,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#38bed5',
        color: 'rgba(255,255,255,0.7)',
        padding: 'var(--footer-padding, 80px 0 30px)',
        borderTop: '3px solid var(--secondary)',
        fontSize: '14px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Logo & Tagline */}
         {/* Logo & Tagline */}
<div>
  <a
    href="/"
    style={{
      display: 'inline-block',
      marginBottom: '20px',
    }}
  >
    <img
      src="/logo2.png"
      alt="Cancer Herbalist"
      style={{
        width: '220px',
        height: 'auto',
        display: 'block',
      }}
    />
  </a>

  <p
    style={{
      lineHeight: '1.7',
      marginBottom: '24px',
      fontSize: '17px',
    }}
  >
    Integrating evidence-based phytotherapeutic treatments and dietary
    nutrition to assist your body's natural recovery cycles.
  </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '14px' }}>
              {[
                {
                  icon: <FaFacebook />,
                  url: 'https://www.facebook.com/CancerHerbalist',
                },
                {
                  icon: <FaInstagram />,
                  url: 'https://www.instagram.com/cancerherbalist/',
                },
                {
                  icon: <FaYoutube />,
                  url: 'https://www.youtube.com/@Cancerherbalist',
                },
                {
                  icon: <FaLinkedin />,
                  url: 'https://www.linkedin.com/company/cancer-herbalist/',
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Quick Navigation
            </h4>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {[
                { label: 'Home', href: '#home' },
                { label: 'Services', href: '#services' },
                { label: 'Treatment Process', href: '#treatment' },
                { label: 'Expert Team', href: '#experts' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = 'var(--primary)')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = 'rgba(255,255,255,0.6)')
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Educational Resources */}
          <div>
            <h4
              style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Educational Resources
            </h4>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {[
                'Cancer Nutrition Guide',
                'Lifestyle Guidance & Detox',
                'Phytochemical Research Database',
                'Chemotherapy Support Tips',
                'Patient Recovery Journals',
              ].map((res) => (
                <li key={res}>
                  <a
                    href="#consultation"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      fontSize: '13px',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = 'var(--primary)')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = 'rgba(255,255,255,0.6)')
                    }
                  >
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Contact Office
            </h4>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <FaPhoneAlt
                  style={{ color: 'var(--primary)', flexShrink: 0 }}
                />
                <a
                  href="tel:+1234567890"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  88845 88835
                </a>
              </li>

              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <FaEnvelope
                  style={{ color: 'var(--primary)', flexShrink: 0 }}
                />
                <a
                  href="mailto:cancerherbalist@gmail.com"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  cancerherbalist@gmail.com
                </a>
              </li>

              <li
                style={{
                  display: 'flex',
                  gap: '10px',
                  lineHeight: '1.5',
                }}
              >
                <FaMapMarkerAlt
                  style={{
                    color: 'var(--primary)',
                    flexShrink: 0,
                    marginTop: '4px',
                  }}
                />
                <span>
                Address: Agara Main Road, Near Dinnepalya Bus stand, Kaggalipura Post, Near Fireflies Center, Off Kanakapura Road, Bangalore 560116.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div
          style={{
            background: 'rgba(0,0,0,0.2)',
            padding: 'var(--card-padding-sm, 24px 30px)',
            borderRadius: '16px',
            fontSize: '12px',
            lineHeight: '1.6',
            marginBottom: '40px',
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'justify',
          }}
        >
          <strong>Medical Disclaimer:</strong> The information and services
          offered on this website are for educational and cellular-supportive
          purposes only. They are not intended to diagnose, cure, mitigate, or
          treat cancer, nor are they a replacement for professional oncological
          care, surgeries, chemotherapy, or radiotherapy. Always consult your
          oncology supervisor or qualified medical team before starting any new
          herbal, dietary, or nutritional protocols.
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '30px',
            fontSize: '12px',
          }}
        >
          <span>
            &copy; {new Date().getFullYear()} Cancer Herbalist. All rights
            reserved.
          </span>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a
              href="#home"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Privacy Policy
            </a>

            <a
              href="#home"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}