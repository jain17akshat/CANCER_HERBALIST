import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp,
  FaClock, FaCalendarAlt, FaCheckCircle, FaSpinner,
  FaLeaf, FaUserMd, FaChevronRight
} from 'react-icons/fa';


const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const EMAILJS_ADMIN_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;

const EMAILJS_PATIENT_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_PATIENT_TEMPLATE_ID;

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ACCENT = '#38bed5';

// Time slots for each day
const TIME_SLOTS = [
  '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
];

// Available days Mon–Sat — generates next 30 days
function getAvailableDays() {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay(); // 0=Sun,6=Sat
    if (dow !== 0) { // skip Sundays
      days.push({
        date: d,
        label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        full: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      });
    }
  }
  return days;
}

const DAYS = getAvailableDays();

const TREATMENTS = [
  'Free Discovery Consultation',
  'Breast Cancer Support',
  'Lung Cancer Support',
  'Colon Cancer Support',
  'Prostate Cancer Support',
  'Liver Cancer Support',
  'Blood Cancer Support',
  'Herbal Therapy Assessment',
  'Nutrition & Diet Guidance',
  'Chemotherapy Side-Effect Support',
  'Follow-up Appointment',
  'General Inquiry',
];

const CANCER_STAGES = ['Stage I', 'Stage II', 'Stage III', 'Stage IV', 'Remission', 'Not Sure / Other'];

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  marginBottom: '16px',
  border: '1.5px solid #e2e8f0',
  borderRadius: '12px',
  fontSize: '15px',
  outline: 'none',
  background: '#f8fafc',
  color: '#0f172a',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  fontFamily: 'Poppins, sans-serif',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#334155',
  marginBottom: '6px',
};

export default function Contact() {
  const formRef = useRef();

  const [step, setStep] = useState(1); // 1=form, 2=slot, 3=success
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    treatment: '', stage: '', message: '',
    selectedDay: null, selectedSlot: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDaySelect = (day) =>
    setFormData({ ...formData, selectedDay: day, selectedSlot: '' });

  const handleSlotSelect = (slot) =>
    setFormData({ ...formData, selectedSlot: slot });

  // Step 1 → Step 2
  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.treatment) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  // Step 2 → Send emails
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.selectedDay || !formData.selectedSlot) {
      setError('Please select a date and time slot.');
      return;
    }
    setError('');
    setSending(true);

    const templateParams = {
      // Fields used in EmailJS template
      patient_name: formData.name,
      patient_phone: formData.phone,
      patient_email: formData.email,
      treatment_type: formData.treatment,
      cancer_stage: formData.stage || 'Not specified',
      appointment_day: formData.selectedDay.full,
      appointment_slot: formData.selectedSlot,
      patient_message: formData.message || 'No additional message.',
      clinic_email: 'cancerherbalist@gmail.com',
      // reply_to is used so clinic can reply directly to patient
      reply_to: formData.email,
    };

  try {
  // Send email to clinic
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_ADMIN_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );

  // Send confirmation email to patient
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_PATIENT_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );

  setSending(false);
  setStep(3);
} catch (err) {
  setSending(false);
  setError('Failed to send. Please try WhatsApp or call us directly.');
  console.error('EmailJS error:', err);
}
  };

  const reset = () => {
    setStep(1);
    setFormData({ name: '', phone: '', email: '', treatment: '', stage: '', message: '', selectedDay: null, selectedSlot: '' });
    setError('');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '140px 20px 80px', textAlign: 'center', background: 'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)' }}>
        <div style={{ display: 'inline-block', background: '#DBEAFE', color: ACCENT, padding: '8px 18px', borderRadius: '999px', fontWeight: '600', marginBottom: '20px', fontSize: '14px' }}>
          Book a Free Consultation
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem,6vw,4rem)', color: '#0F172A', marginBottom: '20px', fontFamily: 'Playfair Display, serif' }}>
          Start Your <span style={{ color: ACCENT }}>Healing Journey</span>
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: '#64748B', lineHeight: '1.8', fontSize: '1.05rem' }}>
          Book a free discovery consultation with our senior herbal oncology practitioners. Slots are available Mon–Sat, 9 AM – 6 PM.
        </p>
      </section>

      {/* ── Info Cards ── */}
      <section style={{ maxWidth: '1300px', margin: '-40px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '20px' }}>
          {[
            { icon: <FaPhone />, title: 'Call Us', text: '+91 88845 88835', href: 'tel:+918884588835' },
            { icon: <FaEnvelope />, title: 'Email', text: 'cancerherbalist@gmail.com', href: 'mailto:cancerherbalist@gmail.com' },
            { icon: <FaMapMarkerAlt />, title: 'Location', text: 'Kaggalipura, Bangalore 560116', href: '#map' },
            { icon: <FaClock />, title: 'Working Hours', text: 'Mon – Sat | 9 AM – 6 PM', href: null },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '28px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.07)', border: `1px solid ${ACCENT}18` }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#DBEAFE', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '22px' }}>
                {item.icon}
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
              {item.href
                ? <a href={item.href} style={{ color: '#64748b', fontSize: '13.5px', textDecoration: 'none' }}>{item.text}</a>
                : <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>{item.text}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Form + WhatsApp ── */}
      <section style={{ maxWidth: '1300px', margin: '56px auto', padding: '0 20px' }}>
        <div className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: '36px', alignItems: 'start' }}>

          {/* ── Booking Form Card ── */}
          <div style={{ background: '#fff', padding: 'clamp(24px, 4vw, 44px)', borderRadius: '28px', boxShadow: '0 12px 40px rgba(0,0,0,0.09)', border: `1px solid ${ACCENT}22` }}>

            {/* Step Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '32px' }}>
              {['Your Details', 'Choose Slot', 'Confirmed'].map((label, i) => {
                const num = i + 1;
                const active = step === num;
                const done = step > num;
                return (
                  <React.Fragment key={num}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: done || active ? ACCENT : '#e2e8f0', color: done || active ? '#fff' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', transition: 'all 0.3s' }}>
                        {done ? '✓' : num}
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: active ? ACCENT : '#94a3b8', whiteSpace: 'nowrap' }}>{label}</span>
                    </div>
                    {i < 2 && <div style={{ flex: 1, height: '2px', background: step > num ? ACCENT : '#e2e8f0', margin: '0 6px', marginBottom: '20px', transition: 'background 0.3s' }} />}
                  </React.Fragment>
                );
              })}
            </div>

            {/* ── STEP 1: Patient Details ── */}
            {step === 1 && (
              <form onSubmit={handleNextStep}>
                <h2 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', marginBottom: '24px', fontSize: '1.5rem' }}>
                  Book a <span style={{ color: ACCENT }}>Free Consultation</span>
                </h2>

                <label style={labelStyle}>Full Name *</label>
                <input type="text" name="name" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} required style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />

                <label style={labelStyle}>Phone Number *</label>
                <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />

                <label style={labelStyle}>Email Address * (confirmation will be sent here)</label>
                <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />

                <label style={labelStyle}>Type of Consultation *</label>
                <select name="treatment" value={formData.treatment} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">-- Select Treatment Type --</option>
                  {TREATMENTS.map((t) => <option key={t}>{t}</option>)}
                </select>

                <label style={labelStyle}>Cancer Stage (if applicable)</label>
                <select name="stage" value={formData.stage} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">-- Select Stage --</option>
                  {CANCER_STAGES.map((s) => <option key={s}>{s}</option>)}
                </select>

                <label style={labelStyle}>Additional Message</label>
                <textarea rows="3" name="message" placeholder="Tell us about your condition or any questions..." value={formData.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)} onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />

                {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>⚠ {error}</p>}

                <button type="submit" style={{ width: '100%', background: ACCENT, color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Next: Choose Appointment Slot <FaChevronRight />
                </button>
              </form>
            )}

            {/* ── STEP 2: Slot Selection ── */}
            {step === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '22px', padding: 0 }}>←</button>
                  <h2 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', margin: 0 }}>
                    Choose <span style={{ color: ACCENT }}>Date & Time</span>
                  </h2>
                </div>
                <p style={{ color: '#64748b', fontSize: '13.5px', marginBottom: '20px' }}>
                  Available Mon–Sat, 9 AM – 6 PM (Sundays closed)
                </p>

                {/* Day Picker */}
                <label style={labelStyle}>Select Date *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100px, 100%), 1fr))', gap: '8px', marginBottom: '24px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                  {DAYS.slice(0, 18).map((day, i) => {
                    const selected = formData.selectedDay?.label === day.label;
                    return (
                      <button key={i} type="button" onClick={() => handleDaySelect(day)}
                        style={{ padding: '10px 6px', borderRadius: '10px', border: `2px solid ${selected ? ACCENT : '#e2e8f0'}`, background: selected ? `${ACCENT}18` : '#f8fafc', color: selected ? ACCENT : '#475569', fontWeight: selected ? 700 : 500, fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center', lineHeight: '1.4' }}>
                        {day.label}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slot Picker */}
                {formData.selectedDay && (
                  <>
                    <label style={labelStyle}>Select Time Slot for {formData.selectedDay.label} *</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(80px, 100%), 1fr))', gap: '8px', marginBottom: '24px' }}>
                      {TIME_SLOTS.map((slot) => {
                        const selected = formData.selectedSlot === slot;
                        return (
                          <button key={slot} type="button" onClick={() => handleSlotSelect(slot)}
                            style={{ padding: '10px 4px', borderRadius: '10px', border: `2px solid ${selected ? ACCENT : '#e2e8f0'}`, background: selected ? ACCENT : '#f8fafc', color: selected ? '#fff' : '#475569', fontWeight: 600, fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Booking Summary */}
                {formData.selectedDay && formData.selectedSlot && (
                  <div style={{ background: `${ACCENT}12`, border: `1.5px solid ${ACCENT}44`, borderRadius: '14px', padding: '16px 20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <FaCalendarAlt style={{ color: ACCENT }} />
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>Appointment Summary</span>
                    </div>
                    <p style={{ color: '#475569', fontSize: '13.5px', margin: '4px 0' }}>👤 <strong>{formData.name}</strong></p>
                    <p style={{ color: '#475569', fontSize: '13.5px', margin: '4px 0' }}>🩺 {formData.treatment}</p>
                    <p style={{ color: '#475569', fontSize: '13.5px', margin: '4px 0' }}>📅 {formData.selectedDay.full}</p>
                    <p style={{ color: '#475569', fontSize: '13.5px', margin: '4px 0' }}>🕐 {formData.selectedSlot}</p>
                  </div>
                )}

                {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>⚠ {error}</p>}

                <button onClick={handleSubmit} disabled={sending || !formData.selectedDay || !formData.selectedSlot}
                  style={{ width: '100%', background: sending ? '#94a3b8' : ACCENT, color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: 700, cursor: sending ? 'not-allowed' : 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s' }}>
                  {sending ? <><FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Sending...</> : <><FaCheckCircle /> Confirm Appointment</>}
                </button>
              </div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${ACCENT}20`, border: `3px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px', color: ACCENT }}>
                  <FaCheckCircle />
                </div>
                <h2 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', marginBottom: '12px' }}>
                  Appointment Confirmed! 🌿
                </h2>
                <p style={{ color: '#64748b', lineHeight: '1.8', marginBottom: '8px' }}>
                  A confirmation email has been sent to <strong style={{ color: ACCENT }}>{formData.email}</strong>
                </p>
                <p style={{ color: '#64748b', lineHeight: '1.8', marginBottom: '24px' }}>
                  Our team will also contact you at <strong>{formData.phone}</strong> to confirm your slot.
                </p>
                <div style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}33`, borderRadius: '14px', padding: '16px 20px', marginBottom: '28px', textAlign: 'left' }}>
                  <p style={{ margin: '4px 0', color: '#475569', fontSize: '14px' }}>📅 <strong>{formData.selectedDay?.full}</strong></p>
                  <p style={{ margin: '4px 0', color: '#475569', fontSize: '14px' }}>🕐 <strong>{formData.selectedSlot}</strong></p>
                  <p style={{ margin: '4px 0', color: '#475569', fontSize: '14px' }}>🩺 <strong>{formData.treatment}</strong></p>
                </div>
                <button onClick={reset} style={{ background: ACCENT, color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>
                  Book Another Appointment
                </button>
              </div>
            )}
          </div>

          {/* ── Right Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* WhatsApp Card */}
            <div style={{ background: 'linear-gradient(135deg,#0f3460,#1a5276)', color: '#fff', borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FaWhatsapp style={{ fontSize: '60px', color: '#25d366' }} />
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>Quick WhatsApp Consultation</h2>
              <p style={{ opacity: 0.85, lineHeight: '1.8', fontSize: '0.95rem' }}>
                Connect directly with our team for immediate assistance and appointment scheduling. We typically respond within 30 minutes.
              </p>
              <a href="https://wa.me/918884588835" target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#25d366', color: '#fff', padding: '14px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, width: 'fit-content' }}>
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>

            {/* Why Choose Us */}
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 24px rgba(0,0,0,0.07)', border: `1px solid ${ACCENT}18` }}>
              <h3 style={{ color: '#0f172a', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: '20px' }}>
                Why Book With Us?
              </h3>
              {[
                { icon: <FaLeaf />, text: '100% Natural & Evidence-Based Herbal Protocols' },
                { icon: <FaUserMd />, text: 'Experienced Integrative Oncology Practitioners' },
                { icon: <FaCheckCircle />, text: 'Free First Consultation — No Obligation' },
                { icon: <FaClock />, text: 'Flexible Slots Mon–Sat, 9 AM to 6 PM' },
                { icon: <FaEnvelope />, text: 'Instant Email Confirmation After Booking' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${ACCENT}18`, color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: '#475569', fontSize: '13.5px', lineHeight: '1.5' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section id="map" style={{ maxWidth: '1300px', margin: '0 auto 80px', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '28px', fontFamily: 'Playfair Display, serif', color: '#0f172a' }}>
          Find Our <span style={{ color: ACCENT }}>Location</span>
        </h2>
        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <iframe
            title="Cancer Herbalist Location"
            src="https://maps.google.com/maps?q=Kaggalipura+Bangalore&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%" height="420" style={{ border: 0, display: 'block' }} loading="lazy"
          />
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}