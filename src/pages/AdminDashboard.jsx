import React, { useState, useEffect, useCallback } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaLeaf, FaLock, FaSync, FaWhatsapp } from 'react-icons/fa';

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'https://cancer-herbalist-rhgj.vercel.app').replace(/\/+$/, '');
const PRIMARY = '#1a6e52';
const ACCENT  = '#38bed5';

const TIME_SLOTS = [
  '09:00 AM','09:30 AM','10:00 AM','10:30 AM',
  '11:00 AM','11:30 AM','12:00 PM','12:30 PM',
  '02:00 PM','02:30 PM','03:00 PM','03:30 PM',
  '04:00 PM','04:30 PM','05:00 PM','05:30 PM',
];

function todayLabel() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function AdminDashboard() {
  const [secret, setSecret]         = useState(
    () => localStorage.getItem('ch_admin_secret') || ''
  );
  const [authed, setAuthed]         = useState(
    () => localStorage.getItem('ch_admin_authed') === 'true'
  );
  const [authError, setAuthError]   = useState('');
  const [appointments, setAppts]    = useState([]);
  const [loading, setLoading]       = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [filterDate, setFilterDate] = useState('today');
  const [selectedAppt, setSelected] = useState(null);
  const [slotViewDate, setSlotViewDate] = useState(null); // date string for the slot grid

  // ── Website Content Management State ──
  const [activeDashboardTab, setActiveDashboardTab] = useState('appointments'); // 'appointments' | 'content'
  const [contentTab, setContentTab] = useState('products'); // 'products' | 'blogs' | 'testimonials'
  const [dynProducts, setDynProducts] = useState([]);
  const [dynBlogs, setDynBlogs] = useState([]);
  const [dynTestimonials, setDynTestimonials] = useState([]);

  // Form states
  const [productForm, setProductForm] = useState({
    name: '', category: 'Immunity', price: '', originalPrice: '',
    description: '', benefits: '', ingredients: '', dosage: '',
    size: '', badge: '', icon: '🌿', color: '#1a6e52'
  });
  const [blogForm, setBlogForm] = useState({
    title: '', category: 'Nutrition', author: 'By Prof. Ramesh',
    readTime: '5 min read', excerpt: '', content: '', image: ''
  });
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', location: 'India', rating: 5, text: '', date: 'Recent'
  });

  const [formStatus, setFormStatus] = useState(''); // 'sending' | 'success' | 'error'
  const [formError, setFormError] = useState('');

  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 700,
    color: '#475569', marginBottom: '6px', textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '1.5px solid #e2e8f0', fontSize: '13.5px', outline: 'none',
    background: '#fff', color: '#0f172a', boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.2s',
  };

  const submitBtnStyle = {
    width: '100%', padding: '14px',
    background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
    color: '#fff', border: 'none', borderRadius: '12px',
    fontWeight: 700, fontSize: '14px', cursor: 'pointer',
    fontFamily: 'inherit', boxShadow: `0 6px 20px ${ACCENT}22`, marginTop: '10px',
  };

  const today = todayLabel();

  // Load dynamic content list from API
  const loadDynamicContent = useCallback(async () => {
    try {
      const pRes = await fetch(`${BACKEND_URL}/api/dynamic-products`);
      const pData = await pRes.json();
      if (pData.success) setDynProducts(pData.products || []);

      const bRes = await fetch(`${BACKEND_URL}/api/dynamic-blogs`);
      const bData = await bRes.json();
      if (bData.success) setDynBlogs(bData.blogs || []);

      const tRes = await fetch(`${BACKEND_URL}/api/dynamic-testimonials`);
      const tData = await tRes.json();
      if (tData.success) setDynTestimonials(tData.testimonials || []);
    } catch (e) {
      console.warn('Failed to load dynamic content:', e);
    }
  }, []);


  /* ── Fetch appointments ──────────────────────────────────────── */
  const fetchAppts = useCallback(async (key, dateFilter) => {
    setLoading(true);
    setFetchError('');
    try {
      const params = new URLSearchParams({ key });
      if (dateFilter && dateFilter !== 'all') {
        params.append('date', dateFilter === 'today' ? today : dateFilter);
      }
      const res  = await fetch(`${BACKEND_URL}/api/appointments?${params}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to fetch.');
      setAppts(data.appointments || []);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  }, [today]);

  /* ── Login ────────────────────────────────────────── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    try {
      const res  = await fetch(`${BACKEND_URL}/api/appointments?key=${secret}`);
      const data = await res.json();
      if (res.status === 401 || !data.success) { setAuthError('Wrong password. Try again.'); setLoading(false); return; }
      // Save session to localStorage so Navbar can show admin link
      localStorage.setItem('ch_admin_authed', 'true');
      localStorage.setItem('ch_admin_secret', secret);
      setAuthed(true);
      setAppts(data.appointments || []);
    } catch {
      setAuthError('Cannot reach server. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Logout ────────────────────────────────────────── */
  const handleLogout = () => {
    localStorage.removeItem('ch_admin_authed');
    localStorage.removeItem('ch_admin_secret');
    setAuthed(false);
    setSecret('');
    setAppts([]);
  };


  /* ── Auto-refresh every 60s ──────────────────────────────────── */
  useEffect(() => {
    if (!authed) return;
    fetchAppts(secret, filterDate);
    loadDynamicContent();
    const id = setInterval(() => {
      fetchAppts(secret, filterDate);
      loadDynamicContent();
    }, 60_000);
    return () => clearInterval(id);
  }, [authed, filterDate, secret, fetchAppts, loadDynamicContent]);

  /* ── Content Submission Handlers ─────────────────────────────── */
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-products?key=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          benefits: productForm.benefits ? productForm.benefits.split(',').map(b => b.trim()) : []
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to add product.');
      
      setFormStatus('success');
      setProductForm({
        name: '', category: 'Immunity', price: '', originalPrice: '',
        description: '', benefits: '', ingredients: '', dosage: '',
        size: '', badge: '', icon: '🌿', color: '#1a6e52'
      });
      loadDynamicContent();
      setTimeout(() => setFormStatus(''), 3000);
    } catch (err) {
      setFormStatus('error');
      setFormError(err.message);
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-blogs?key=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to add blog.');
      
      setFormStatus('success');
      setBlogForm({
        title: '', category: 'Nutrition', author: 'By Prof. Ramesh',
        readTime: '5 min read', excerpt: '', content: '', image: ''
      });
      loadDynamicContent();
      setTimeout(() => setFormStatus(''), 3000);
    } catch (err) {
      setFormStatus('error');
      setFormError(err.message);
    }
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-testimonials?key=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to add testimonial.');
      
      setFormStatus('success');
      setTestimonialForm({
        name: '', location: 'India', rating: 5, text: '', date: 'Recent'
      });
      loadDynamicContent();
      setTimeout(() => setFormStatus(''), 3000);
    } catch (err) {
      setFormStatus('error');
      setFormError(err.message);
    }
  };

  /* ── Slot grid helpers ──────────────────────────────── */
  const todayAppts       = appointments.filter(a =>
    a.appointmentDay.toLowerCase().includes(today.toLowerCase())
  );
  const todayBookedSlots = new Set(todayAppts.map(a => a.appointmentSlot));

  // Slot grid shows: selected appointment's date > today > first appointment's date
  const slotGridDate = slotViewDate
    || (todayAppts.length > 0 ? today : appointments[0]?.appointmentDay || today);
  const slotGridAppts   = appointments.filter(a => a.appointmentDay === slotGridDate);
  const slotGridBooked  = new Set(slotGridAppts.map(a => a.appointmentSlot));

  /* ═══════════════════════════════════════════════════════════════
     LOGIN SCREEN
  ═══════════════════════════════════════════════════════════════ */
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
        fontFamily: 'Poppins, sans-serif',
      }}>
        <div style={{
          background: '#fff', borderRadius: '24px', padding: '48px 40px',
          width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌿</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#0f172a', fontSize: '1.6rem', margin: '0 0 6px' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '32px' }}>
            Cancer Herbalist — Appointment Manager
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <FaLock style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                color: '#94a3b8', fontSize: '14px',
              }} />
              <input
                type="password"
                placeholder="Enter admin password"
                value={secret}
                onChange={e => setSecret(e.target.value)}
                required
                style={{
                  width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px',
                  border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none',
                  background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            {authError && (
              <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>⚠ {authError}</p>
            )}
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px',
              background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
              color: '#fff', border: 'none', borderRadius: '12px',
              fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}>
              {loading ? 'Checking…' : 'Login →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     DASHBOARD
  ═══════════════════════════════════════════════════════════════ */
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
        padding: '24px 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '32px' }}>🛡️</span>
          <div>
            <h1 style={{ margin: 0, color: '#fff', fontSize: '1.3rem', fontFamily: 'Playfair Display, serif' }}>
              Cancer Herbalist Admin Panel
            </h1>
            <p style={{ margin: 0, color: '#a7f3d0', fontSize: '12px' }}>{today}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => { fetchAppts(secret, filterDate); loadDynamicContent(); }} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', padding: '10px 18px', borderRadius: '10px',
            cursor: 'pointer', fontWeight: 600, fontSize: '13px', fontFamily: 'inherit',
          }}>
            <FaSync /> Refresh
          </button>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)',
            color: '#fca5a5', padding: '10px 18px', borderRadius: '10px',
            cursor: 'pointer', fontWeight: 600, fontSize: '13px', fontFamily: 'inherit',
          }}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '0 32px', display: 'flex', gap: '24px'
      }}>
        {[
          { id: 'appointments', label: '📅 Bookings & Slots' },
          { id: 'content', label: '🛠️ Manage Content' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveDashboardTab(tab.id); setFormError(''); setFormStatus(''); }}
            style={{
              padding: '16px 8px', background: 'none', border: 'none',
              color: activeDashboardTab === tab.id ? PRIMARY : '#64748b',
              fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              borderBottom: `3px solid ${activeDashboardTab === tab.id ? PRIMARY : 'transparent'}`,
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        {activeDashboardTab === 'appointments' ? (
          <>
            {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: "Today's Appointments",  value: todayAppts.length,      icon: '📅', color: PRIMARY },
            { label: 'Slots Booked Today',     value: todayBookedSlots.size,  icon: '🔴', color: '#ef4444' },
            { label: 'Slots Free Today',       value: TIME_SLOTS.length - todayBookedSlots.size, icon: '🟢', color: '#22c55e' },
            { label: 'Total Appointments',     value: appointments.length,    icon: '📋', color: ACCENT },
          ].map(s => (
            <div key={s.label} style={{
              background: '#fff', borderRadius: '16px', padding: '20px 24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: `1px solid ${s.color}20`,
            }}>
              <span style={{ fontSize: '28px' }}>{s.icon}</span>
              <p style={{ margin: '8px 0 2px', fontSize: '28px', fontWeight: 800, color: s.color }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Show:</span>
          {['today', 'all'].map(f => (
            <button key={f} onClick={() => setFilterDate(f)} style={{
              padding: '8px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '13px',
              border: `2px solid ${filterDate === f ? PRIMARY : '#e2e8f0'}`,
              background: filterDate === f ? `${PRIMARY}12` : '#fff',
              color: filterDate === f ? PRIMARY : '#64748b',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {f === 'today' ? "📅 Today" : "📋 All"}
            </button>
          ))}
          {loading && <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '8px' }}>Loading…</span>}
          {fetchError && <span style={{ fontSize: '12px', color: '#ef4444' }}>⚠ {fetchError}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

          {/* Appointment list */}
          <div>
            {appointments.length === 0 && !loading ? (
              <div style={{
                background: '#fff', borderRadius: '16px', padding: '48px',
                textAlign: 'center', color: '#94a3b8',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <FaCalendarAlt style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.4 }} />
                <p style={{ margin: 0, fontSize: '15px' }}>No appointments found.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {appointments.map(a => (
                  <div
                    key={a.apptId}
                    onClick={() => { setSelected(a); setSlotViewDate(a.appointmentDay); }}
                    style={{
                      background: '#fff', borderRadius: '14px', padding: '18px 22px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: `1.5px solid ${selectedAppt?.apptId === a.apptId ? PRIMARY : '#e2e8f0'}`,
                      cursor: 'pointer', transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', gap: '16px',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = PRIMARY}
                    onMouseLeave={e => e.currentTarget.style.borderColor = selectedAppt?.apptId === a.apptId ? PRIMARY : '#e2e8f0'}
                  >
                    {/* Time badge */}
                    <div style={{
                      background: `${PRIMARY}12`, border: `1.5px solid ${PRIMARY}30`,
                      borderRadius: '10px', padding: '10px 14px', textAlign: 'center',
                      flexShrink: 0, minWidth: '72px',
                    }}>
                      <FaClock style={{ color: PRIMARY, fontSize: '12px' }} />
                      <p style={{ margin: '4px 0 0', fontSize: '12px', fontWeight: 700, color: PRIMARY, whiteSpace: 'nowrap' }}>
                        {a.appointmentSlot}
                      </p>
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <FaUser style={{ color: '#64748b', fontSize: '11px' }} />
                        <strong style={{ fontSize: '14px', color: '#0f172a' }}>{a.name}</strong>
                        <span style={{
                          background: `${ACCENT}18`, color: ACCENT,
                          fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
                        }}>{a.treatment}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FaPhone style={{ fontSize: '10px' }} /> {a.phone}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FaCalendarAlt style={{ fontSize: '10px' }} /> {a.appointmentDay}
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp quick action */}
                    <a
                      href={`https://wa.me/91${String(a.phone).replace(/\D/g,'')}`}
                      target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        background: '#25d366', color: '#fff', borderRadius: '10px',
                        padding: '10px 14px', textDecoration: 'none', flexShrink: 0,
                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700,
                      }}
                    >
                      <FaWhatsapp /> Chat
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Slot grid + detail panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Today's slot availability */}
            <div style={{
              background: '#fff', borderRadius: '16px', padding: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaClock style={{ color: PRIMARY }} /> Slot Status
              </h3>
              <p style={{ margin: '0 0 14px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                {slotGridDate === today ? "Today" : slotGridDate}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {TIME_SLOTS.map(slot => {
                  // Slot grid always shows today's bookings
                  const booked = slotGridBooked.has(slot);
                  const appt   = slotGridAppts.find(a => a.appointmentSlot === slot);
                  return (
                    <div
                      key={slot}
                      title={booked ? `${appt?.name} — ${appt?.treatment}` : 'Available'}
                      onClick={() => booked && setSelected(appt)}
                      style={{
                        padding: '8px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
                        textAlign: 'center', cursor: booked ? 'pointer' : 'default',
                        background: booked ? '#fee2e2' : '#f0fdf4',
                        color:      booked ? '#b91c1c' : '#15803d',
                        border:     `1.5px solid ${booked ? '#fca5a5' : '#86efac'}`,
                        transition: 'all 0.15s',
                      }}
                    >
                      {slot}<br />
                      <span style={{ fontSize: '9px', opacity: 0.8 }}>
                        {booked ? `🔴 ${appt?.name?.split(' ')[0]}` : '🟢 Free'}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', fontSize: '11px', color: '#64748b', flexWrap: 'wrap' }}>
                <span>🟢 Free</span>
                <span>🔴 Booked</span>
                {slotViewDate && slotViewDate !== today && (
                  <button
                    onClick={() => setSlotViewDate(null)}
                    style={{ background: 'none', border: 'none', color: ACCENT, cursor: 'pointer', fontSize: '11px', fontWeight: 600, padding: 0 }}
                  >
                    ↩ Back to today
                  </button>
                )}
              </div>
            </div>

            {/* Detail panel */}
            {selectedAppt && (
              <div style={{
                background: '#fff', borderRadius: '16px', padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: `1.5px solid ${PRIMARY}30`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Appointment Detail</h3>
                  <button onClick={() => setSelected(null)} style={{
                    background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94a3b8',
                  }}>×</button>
                </div>
                {[
                  { label: 'ID',          val: selectedAppt.apptId,          icon: '🆔' },
                  { label: 'Patient',     val: selectedAppt.name,            icon: '👤' },
                  { label: 'Phone',       val: selectedAppt.phone,           icon: '📱' },
                  { label: 'Email',       val: selectedAppt.email,           icon: '📧' },
                  { label: 'Consultation',val: selectedAppt.treatment,       icon: '🩺' },
                  { label: 'Stage',       val: selectedAppt.stage || '—',    icon: '📊' },
                  { label: 'Date',        val: selectedAppt.appointmentDay,  icon: '📅' },
                  { label: 'Time',        val: selectedAppt.appointmentSlot, icon: '🕐' },
                  { label: 'Booked At',  val: selectedAppt.bookedAt,        icon: '⏰' },
                  { label: 'Message',    val: selectedAppt.message || '—',  icon: '💬' },
                ].map(row => (
                  <div key={row.label} style={{
                    display: 'flex', gap: '10px', padding: '7px 0',
                    borderBottom: '1px solid #f1f5f9', fontSize: '12.5px',
                  }}>
                    <span style={{ minWidth: '90px', color: '#94a3b8', fontWeight: 600 }}>{row.icon} {row.label}</span>
                    <span style={{ color: '#334155', wordBreak: 'break-all' }}>{row.val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <a href={`https://wa.me/91${String(selectedAppt.phone).replace(/\D/g,'')}`}
                    target="_blank" rel="noreferrer"
                    style={{
                      flex: 1, background: '#25d366', color: '#fff', padding: '10px',
                      borderRadius: '10px', textDecoration: 'none', fontWeight: 700,
                      fontSize: '12px', textAlign: 'center',
                    }}>
                    <FaWhatsapp /> WhatsApp
                  </a>
                  <a href={`tel:${selectedAppt.phone}`}
                    style={{
                      flex: 1, background: PRIMARY, color: '#fff', padding: '10px',
                      borderRadius: '10px', textDecoration: 'none', fontWeight: 700,
                      fontSize: '12px', textAlign: 'center',
                    }}>
                    📞 Call
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
          </>
        ) : (
          <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', color: '#0f172a', fontSize: '1.6rem' }}>
                  Website Content Manager
                </h2>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
                  Add new products, blog posts, and patient testimonials dynamically to the website.
                </p>
              </div>
            </div>

            {/* Sub tabs for content types */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', flexWrap: 'wrap' }}>
              {[
                { id: 'products', label: '🌿 Products', count: dynProducts.length },
                { id: 'blogs', label: '📝 Blog Articles', count: dynBlogs.length },
                { id: 'testimonials', label: '💬 Testimonials', count: dynTestimonials.length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setContentTab(tab.id); setFormError(''); setFormStatus(''); }}
                  style={{
                    padding: '10px 20px', borderRadius: '10px', fontWeight: 600, fontSize: '13.5px',
                    border: 'none',
                    background: contentTab === tab.id ? `${PRIMARY}12` : 'transparent',
                    color: contentTab === tab.id ? PRIMARY : '#64748b',
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
                  }}
                >
                  {tab.label} <span style={{ marginLeft: '6px', padding: '2px 8px', borderRadius: '20px', background: contentTab === tab.id ? PRIMARY : '#e2e8f0', color: contentTab === tab.id ? '#fff' : '#64748b', fontSize: '11px' }}>{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Success / Error Messages */}
            {formStatus === 'success' && (
              <div style={{ background: '#d1fae5', color: '#065f46', padding: '16px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>
                ✓ Content added successfully! It is now live on the respective pages.
              </div>
            )}
            {formStatus === 'error' && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: '16px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>
                ⚠ Error: {formError}
              </div>
            )}

            {/* Tab content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
              
              {/* LEFT COLUMN: The Creation Form */}
              <div style={{ background: '#f8fafc', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                  Create New {contentTab === 'products' ? 'Product' : contentTab === 'blogs' ? 'Blog Post' : 'Testimonial'}
                </h3>

                {contentTab === 'products' && (
                  <form onSubmit={handleAddProduct}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Product Name *</label>
                        <input type="text" placeholder="e.g. Cap CH95 (30Cap)" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Category *</label>
                        <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} style={inputStyle}>
                          {['Immunity', 'Anti-Tumor', 'Detox', 'Stress & Recovery', 'Nutrition', 'Essential Oils', 'Alkaline Therapy'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Price (₹) *</label>
                        <input type="number" placeholder="599" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Original Price (₹)</label>
                        <input type="number" placeholder="799" value={productForm.originalPrice} onChange={e => setProductForm({...productForm, originalPrice: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Badge (e.g. Best Seller)</label>
                        <input type="text" placeholder="Best Seller" value={productForm.badge} onChange={e => setProductForm({...productForm, badge: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Size / Pack *</label>
                        <input type="text" placeholder="30 Capsules / 500mg" required value={productForm.size} onChange={e => setProductForm({...productForm, size: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Icon Emoji</label>
                        <input type="text" placeholder="🌿" value={productForm.icon} onChange={e => setProductForm({...productForm, icon: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Color Hex</label>
                        <input type="color" value={productForm.color} onChange={e => setProductForm({...productForm, color: e.target.value})} style={{...inputStyle, padding: '4px', height: '42px'}} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={labelStyle}>Description *</label>
                      <textarea rows={3} placeholder="Describe the product and its therapeutic action..." required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} style={inputStyle} />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={labelStyle}>Benefits (Comma separated list)</label>
                      <input type="text" placeholder="Supports immunity, Reduces inflammation, Cellular repair" value={productForm.benefits} onChange={e => setProductForm({...productForm, benefits: e.target.value})} style={inputStyle} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                      <div>
                        <label style={labelStyle}>Key Ingredients</label>
                        <input type="text" placeholder="Curcumin 95%, Piperine" value={productForm.ingredients} onChange={e => setProductForm({...productForm, ingredients: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Dosage Instructions</label>
                        <input type="text" placeholder="1 capsule twice daily" value={productForm.dosage} onChange={e => setProductForm({...productForm, dosage: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <button type="submit" disabled={formStatus === 'sending'} style={submitBtnStyle}>
                      {formStatus === 'sending' ? 'Adding Product...' : '🌿 Add Product to Store'}
                    </button>
                  </form>
                )}

                {contentTab === 'blogs' && (
                  <form onSubmit={handleAddBlog}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={labelStyle}>Blog Title *</label>
                      <input type="text" placeholder="e.g. 10 Early Warning Signs of Cancer" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} style={inputStyle} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Category *</label>
                        <input type="text" placeholder="Nutrition" required value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Author Name *</label>
                        <input type="text" placeholder="By Prof. Ramesh" required value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Read Time (e.g. 5 min read)</label>
                        <input type="text" placeholder="5 min read" value={blogForm.readTime} onChange={e => setBlogForm({...blogForm, readTime: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Feature Image URL</label>
                        <input type="url" placeholder="https://images.unsplash.com/..." value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={labelStyle}>Excerpt / Summary *</label>
                      <textarea rows={2} placeholder="A short 2-3 sentence overview of the article..." required value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} style={inputStyle} />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={labelStyle}>Article Body Content *</label>
                      <textarea rows={8} placeholder="Write the full content of the blog post..." required value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} style={inputStyle} />
                    </div>

                    <button type="submit" disabled={formStatus === 'sending'} style={submitBtnStyle}>
                      {formStatus === 'sending' ? 'Publishing Blog...' : '📝 Publish Blog Post'}
                    </button>
                  </form>
                )}

                {contentTab === 'testimonials' && (
                  <form onSubmit={handleAddTestimonial}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Patient Name / Initials *</label>
                        <input type="text" placeholder="e.g. Amit K." required value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Location</label>
                        <input type="text" placeholder="e.g. Delhi, India" value={testimonialForm.location} onChange={e => setTestimonialForm({...testimonialForm, location: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={labelStyle}>Rating (1-5 Stars)</label>
                        <select value={testimonialForm.rating} onChange={e => setTestimonialForm({...testimonialForm, rating: Number(e.target.value)})} style={inputStyle}>
                          {[5, 4, 3, 2, 1].map(num => (
                            <option key={num} value={num}>{num} Stars</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Date Indicator</label>
                        <input type="text" placeholder="e.g. Recent, 1 month ago" value={testimonialForm.date} onChange={e => setTestimonialForm({...testimonialForm, date: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={labelStyle}>Testimonial Message *</label>
                      <textarea rows={4} placeholder="Write the patient's feedback or healing journey summary..." required value={testimonialForm.text} onChange={e => setTestimonialForm({...testimonialForm, text: e.target.value})} style={inputStyle} />
                    </div>

                    <button type="submit" disabled={formStatus === 'sending'} style={submitBtnStyle}>
                      {formStatus === 'sending' ? 'Saving Testimonial...' : '💬 Add Testimonial'}
                    </button>
                  </form>
                )}
              </div>

              {/* RIGHT COLUMN: Already Dynamically Added Items */}
              <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', minHeight: '300px' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                  Dynamically Added {contentTab === 'products' ? 'Products' : contentTab === 'blogs' ? 'Articles' : 'Testimonials'} ({contentTab === 'products' ? dynProducts.length : contentTab === 'blogs' ? dynBlogs.length : dynTestimonials.length})
                </h3>

                {contentTab === 'products' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {dynProducts.length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', margin: '40px 0' }}>No dynamic products added yet.</p>
                    ) : (
                      dynProducts.map(p => (
                        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <div>
                            <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{p.name}</strong>
                            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Category: {p.category} • Price: ₹{p.price}</span>
                          </div>
                          <span style={{ fontSize: '18px' }}>{p.icon}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {contentTab === 'blogs' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {dynBlogs.length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', margin: '40px 0' }}>No dynamic blogs added yet.</p>
                    ) : (
                      dynBlogs.map(b => (
                        <div key={b.id} style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <strong style={{ fontSize: '13.5px', color: '#0f172a', display: 'block' }}>{b.title}</strong>
                          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>{b.author} • {b.date} • {b.readTime}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {contentTab === 'testimonials' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {dynTestimonials.length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', margin: '40px 0' }}>No dynamic testimonials added yet.</p>
                    ) : (
                      dynTestimonials.map((t, idx) => (
                        <div key={idx} style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{t.name} ({t.location})</strong>
                            <span style={{ color: '#fbbf24', fontSize: '12px' }}>{'★'.repeat(t.rating)}</span>
                          </div>
                          <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#475569', fontStyle: 'italic' }}>"{t.text}"</p>
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
