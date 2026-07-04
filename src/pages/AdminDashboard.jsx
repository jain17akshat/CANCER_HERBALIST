import React, { useState, useEffect, useCallback } from 'react';
import {
  FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaLeaf, FaLock,
  FaSync, FaWhatsapp, FaInfoCircle, FaArrowUp, FaArrowDown, FaTrash, FaPlus
} from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

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
  const { content: globalContent, updateContent: saveGlobalContent, refreshContent } = useContent();
  const [generalForm, setGeneralForm] = useState(null);
  const [generalSubTab, setGeneralSubTab] = useState('contact'); // 'contact' | 'stats' | 'whyChooseUs' | 'healingPillars' | 'heroSlides'
  const [activeHeroSlideIdx, setActiveHeroSlideIdx] = useState(0);
  const [activeDashboardTab, setActiveDashboardTab] = useState('appointments'); // 'appointments' | 'content'
  const [contentTab, setContentTab] = useState('products'); // 'products' | 'blogs' | 'testimonials' | 'general'
  const [dynProducts, setDynProducts] = useState([]);
  const [dynBlogs, setDynBlogs] = useState([]);
  const [dynTestimonials, setDynTestimonials] = useState([]);

  useEffect(() => {
    if (globalContent) {
      setGeneralForm(JSON.parse(JSON.stringify(globalContent)));
    }
  }, [globalContent]);

  // Editing states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

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
    name: '', location: 'India', rating: 5, text: '', date: 'Recent', videoUrl: '', thumbnailUrl: ''
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

  const handleUpdateGeneralContent = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');
    try {
      const res = await saveGlobalContent(generalForm, secret);
      if (res.success) {
        setFormStatus('success');
        refreshContent();
        setTimeout(() => setFormStatus(''), 4000);
      } else {
        setFormStatus('error');
        setFormError(res.error || 'Failed to update website copy.');
      }
    } catch (err) {
      setFormStatus('error');
      setFormError(err.message || 'An error occurred while saving.');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setFormStatus('sending');
    setFormError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-products/${editingProduct.id}?key=${secret}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          benefits: productForm.benefits ? productForm.benefits.split(',').map(b => b.trim()) : []
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update product.');
      
      setFormStatus('success');
      setEditingProduct(null);
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

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-products/${id}?key=${secret}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete product.');
      if (editingProduct && editingProduct.id === id) {
        setEditingProduct(null);
        setProductForm({
          name: '', category: 'Immunity', price: '', originalPrice: '',
          description: '', benefits: '', ingredients: '', dosage: '',
          size: '', badge: '', icon: '🌿', color: '#1a6e52'
        });
      }
      loadDynamicContent();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const parseBlogContent = (text) => {
    if (!text || !text.includes('### ')) {
      return text;
    }
    const sections = [];
    const parts = text.split(/(?=### )/);
    parts.forEach(part => {
      const match = part.match(/^### (.*?)\n([\s\S]*)/);
      if (match) {
        sections.push({
          heading: match[1].trim(),
          body: match[2].trim()
        });
      } else if (part.trim()) {
        sections.push({
          heading: 'Content',
          body: part.trim()
        });
      }
    });
    return sections;
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');
    try {
      const parsedContent = parseBlogContent(blogForm.content);
      const res = await fetch(`${BACKEND_URL}/api/dynamic-blogs?key=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogForm,
          content: parsedContent
        }),
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

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;
    setFormStatus('sending');
    setFormError('');
    try {
      const parsedContent = parseBlogContent(blogForm.content);
      const res = await fetch(`${BACKEND_URL}/api/dynamic-blogs/${editingBlog.id}?key=${secret}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogForm,
          content: parsedContent
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update blog.');
      
      setFormStatus('success');
      setEditingBlog(null);
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

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-blogs/${id}?key=${secret}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete blog.');
      if (editingBlog && editingBlog.id === id) {
        setEditingBlog(null);
        setBlogForm({
          title: '', category: 'Nutrition', author: 'By Prof. Ramesh',
          readTime: '5 min read', excerpt: '', content: '', image: ''
        });
      }
      loadDynamicContent();
    } catch (err) {
      alert(`Error: ${err.message}`);
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
        name: '', location: 'India', rating: 5, text: '', date: 'Recent', videoUrl: '', thumbnailUrl: ''
      });
      loadDynamicContent();
      setTimeout(() => setFormStatus(''), 3000);
    } catch (err) {
      setFormStatus('error');
      setFormError(err.message);
    }
  };

  const handleUpdateTestimonial = async (e) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    setFormStatus('sending');
    setFormError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-testimonials/${editingTestimonial.id}?key=${secret}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update testimonial.');
      
      setFormStatus('success');
      setEditingTestimonial(null);
      setTestimonialForm({
        name: '', location: 'India', rating: 5, text: '', date: 'Recent', videoUrl: '', thumbnailUrl: ''
      });
      loadDynamicContent();
      setTimeout(() => setFormStatus(''), 3000);
    } catch (err) {
      setFormStatus('error');
      setFormError(err.message);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/dynamic-testimonials/${id}?key=${secret}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete testimonial.');
      if (editingTestimonial && editingTestimonial.id === id) {
        setEditingTestimonial(null);
        setTestimonialForm({
          name: '', location: 'India', rating: 5, text: '', date: 'Recent', videoUrl: '', thumbnailUrl: ''
        });
      }
      loadDynamicContent();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const renderListEditor = (title, path, fields, newItemTemplate) => {
    const parts = path.split('.');
    let arr = generalForm;
    for (const part of parts) {
      arr = arr ? arr[part] : undefined;
    }
    if (!Array.isArray(arr)) arr = [];

    const handleFieldChange = (idx, key, val) => {
      const updated = { ...generalForm };
      let cur = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]][idx][key] = val;
      setGeneralForm(updated);
    };

    const handleAdd = () => {
      const updated = { ...generalForm };
      let cur = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]];
      }
      if (!cur[parts[parts.length - 1]]) cur[parts[parts.length - 1]] = [];
      cur[parts[parts.length - 1]].push({ ...newItemTemplate });
      setGeneralForm(updated);
    };

    const handleDelete = (idx) => {
      if (!window.confirm('Are you sure you want to delete this item?')) return;
      const updated = { ...generalForm };
      let cur = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]].splice(idx, 1);
      setGeneralForm(updated);
    };

    const handleMove = (idx, dir) => {
      const updated = { ...generalForm };
      let cur = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]];
      }
      const targetArr = cur[parts[parts.length - 1]];
      const nextIdx = idx + dir;
      if (nextIdx < 0 || nextIdx >= targetArr.length) return;
      const temp = targetArr[idx];
      targetArr[idx] = targetArr[nextIdx];
      targetArr[nextIdx] = temp;
      setGeneralForm(updated);
    };

    return (
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
          <h4 style={{ margin: 0, fontSize: '13.5px', color: PRIMARY, fontWeight: 700 }}>{title}</h4>
          <button
            type="button"
            onClick={handleAdd}
            style={{
              background: PRIMARY, color: '#fff', border: 'none', borderRadius: '6px',
              padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px'
            }}
          >
            <FaPlus /> Add Item
          </button>
        </div>

        {arr.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '12.5px', margin: '10px 0', textAlign: 'center' }}>No items yet. Click "Add Item" above.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {arr.map((item, idx) => (
              <div key={idx} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Item #{idx + 1}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, -1)}
                      style={{ background: '#f1f5f9', border: 'none', borderRadius: '4px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', cursor: idx === 0 ? 'not-allowed' : 'pointer', fontSize: '11px' }}
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      type="button"
                      disabled={idx === arr.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      style={{ background: '#f1f5f9', border: 'none', borderRadius: '4px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer', fontSize: '11px' }}
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      style={{ background: '#fee2e2', border: 'none', borderRadius: '4px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer', fontSize: '11px' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {fields.map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>{f.label}</label>
                      {f.type === 'textarea' ? (
                        <textarea
                          rows={2}
                          value={item[f.key] || ''}
                          onChange={e => handleFieldChange(idx, f.key, e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13.5px', fontFamily: 'inherit', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
                        />
                      ) : f.type === 'color' ? (
                        <input
                          type="color"
                          value={item[f.key] || '#1a6e52'}
                          onChange={e => handleFieldChange(idx, f.key, e.target.value)}
                          style={{ width: '100%', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13.5px', fontFamily: 'inherit', color: '#1e293b', outline: 'none', boxSizing: 'border-box', height: '40px' }}
                        />
                      ) : f.type === 'image' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  handleFieldChange(idx, f.key, reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            style={{ fontSize: '12px' }}
                          />
                          <input
                            type="text"
                            placeholder="Or paste image URL"
                            value={item[f.key] || ''}
                            onChange={e => handleFieldChange(idx, f.key, e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13.5px', fontFamily: 'inherit', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
                          />
                          {item[f.key] && (
                            <img
                              src={item[f.key]}
                              alt="Preview"
                              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                            />
                          )}
                        </div>
                      ) : (
                        <input
                          type={f.type || 'text'}
                          value={item[f.key] || ''}
                          onChange={e => handleFieldChange(idx, f.key, e.target.value)}
                          style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13.5px', fontFamily: 'inherit', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
      <style>{`
        /* Responsive styles for Admin Dashboard */
        .admin-dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 20px;
        }
        .admin-main-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
        }
        .admin-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .form-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .slot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 8px;
        }
        .admin-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }
        .admin-item-row-actions {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }
        .admin-header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 24px 32px;
        }
        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .admin-tab-nav {
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 32px;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .appointment-item {
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .appointment-time-badge {
          border-radius: 10px;
          padding: 10px 14px;
          text-align: center;
          flex-shrink: 0;
          min-width: 72px;
        }
        .appointment-action-btn {
          color: #fff;
          border-radius: 10px;
          padding: 10px 14px;
          text-decoration: none;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
        }
        @media (max-width: 991px) {
          .admin-main-grid {
            grid-template-columns: 1fr;
          }
          .admin-content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 600px) {
          .admin-dashboard-container {
            padding: 16px 12px;
          }
          .admin-header-flex {
            padding: 16px !important;
            flex-direction: column;
            align-items: stretch !important;
            text-align: center;
            gap: 16px !important;
          }
          .admin-header-flex > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .admin-header-actions {
            justify-content: center;
          }
          .admin-tab-nav {
            padding: 0 16px !important;
            justify-content: center;
          }
          .appointment-item {
            flex-direction: column;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .appointment-time-badge {
            align-self: flex-start;
            width: 100%;
            box-sizing: border-box;
          }
          .appointment-action-btn {
            width: 100%;
            justify-content: center;
          }
          .form-grid-2col {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .admin-card {
            padding: 16px !important;
            border-radius: 16px !important;
          }
          .admin-form-container {
            padding: 16px !important;
            border-radius: 16px !important;
          }
          .admin-list-container {
            padding: 16px !important;
            border-radius: 16px !important;
          }
        }
        @media (max-width: 480px) {
          .admin-item-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .admin-item-row-actions {
            justify-content: flex-end;
          }
        }
      `}</style>

      {/* Header */}
      <div className="admin-header-flex" style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
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
        <div className="admin-header-actions">
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
      <div className="admin-tab-nav">
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

      <div className="admin-dashboard-container">
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

        <div className="admin-main-grid">

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
                    className="appointment-item"
                    style={{
                      background: '#fff', borderRadius: '14px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: `1.5px solid ${selectedAppt?.apptId === a.apptId ? PRIMARY : '#e2e8f0'}`,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = PRIMARY}
                    onMouseLeave={e => e.currentTarget.style.borderColor = selectedAppt?.apptId === a.apptId ? PRIMARY : '#e2e8f0'}
                  >
                    {/* Time badge */}
                    <div className="appointment-time-badge" style={{
                      background: `${PRIMARY}12`, border: `1.5px solid ${PRIMARY}30`,
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
                      className="appointment-action-btn"
                      style={{ background: '#25d366' }}
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
              <div className="slot-grid">
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
          <div className="admin-card" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
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
                { id: 'general', label: '⚙️ General Copy', count: 'Edit' },
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
                ✓ {contentTab === 'general' ? 'General website copy updated successfully! All pages will show the new content immediately.' : 'Content added successfully! It is now live on the respective pages.'}
              </div>
            )}
            {formStatus === 'error' && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: '16px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>
                ⚠ Error: {formError}
              </div>
            )}

            {/* Tab content */}
            <div className="admin-content-grid">
              
              {/* LEFT COLUMN: The Creation/Edit Form */}
              <div className="admin-form-container">
                <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                  {contentTab === 'products' 
                    ? (editingProduct ? `✏️ Edit Product: ${editingProduct.name}` : '🌿 Create New Product')
                    : contentTab === 'blogs'
                    ? (editingBlog ? `✏️ Edit Blog Post: ${editingBlog.title}` : '📝 Create New Blog Post')
                    : contentTab === 'testimonials'
                    ? (editingTestimonial ? `✏️ Edit Testimonial: ${editingTestimonial.name}` : '💬 Add New Testimonial')
                    : '⚙️ Edit General Website Copy'}
                </h3>

                {contentTab === 'general' && generalForm && (
                  <div style={{ marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap', background: '#f1f5f9', padding: '6px', borderRadius: '10px' }}>
                    {[
                      { id: 'contact', label: '📞 Contact & Stats' },
                      { id: 'home', label: '🏠 Home Page' },
                      { id: 'about', label: '📖 About Page' },
                      { id: 'programs', label: '🩺 Care Programs' },
                      { id: 'methods', label: '🧪 Treatment Methods' },
                      { id: 'team', label: '👥 Our Team' },
                      { id: 'education', label: '🧬 Patient Education' },
                    ].map(sub => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => { setGeneralSubTab(sub.id); setFormError(''); setFormStatus(''); }}
                        style={{
                          padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600,
                          border: 'none',
                          background: generalSubTab === sub.id ? '#fff' : 'transparent',
                          color: generalSubTab === sub.id ? PRIMARY : '#64748b',
                          boxShadow: generalSubTab === sub.id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                          cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit'
                        }}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}

                {contentTab === 'products' && (
                  <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                    <div className="form-grid-2col">
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

                    <div className="form-grid-2col">
                      <div>
                        <label style={labelStyle}>Price (₹) *</label>
                        <input type="number" placeholder="599" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Original Price (₹)</label>
                        <input type="number" placeholder="799" value={productForm.originalPrice} onChange={e => setProductForm({...productForm, originalPrice: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div className="form-grid-2col">
                      <div>
                        <label style={labelStyle}>Badge (e.g. Best Seller)</label>
                        <input type="text" placeholder="Best Seller" value={productForm.badge} onChange={e => setProductForm({...productForm, badge: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Size / Pack *</label>
                        <input type="text" placeholder="30 Capsules / 500mg" required value={productForm.size} onChange={e => setProductForm({...productForm, size: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div className="form-grid-2col">
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

                    <div className="form-grid-2col" style={{ marginBottom: '24px' }}>
                      <div>
                        <label style={labelStyle}>Key Ingredients</label>
                        <input type="text" placeholder="Curcumin 95%, Piperine" value={productForm.ingredients} onChange={e => setProductForm({...productForm, ingredients: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Dosage Instructions</label>
                        <input type="text" placeholder="1 capsule twice daily" value={productForm.dosage} onChange={e => setProductForm({...productForm, dosage: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="submit" disabled={formStatus === 'sending'} style={submitBtnStyle}>
                        {formStatus === 'sending' ? 'Saving...' : (editingProduct ? 'Save Product Changes' : '🌿 Add Product to Store')}
                      </button>
                      {editingProduct && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(null);
                            setProductForm({
                              name: '', category: 'Immunity', price: '', originalPrice: '',
                              description: '', benefits: '', ingredients: '', dosage: '',
                              size: '', badge: '', icon: '🌿', color: '#1a6e52'
                            });
                          }}
                          style={{ ...submitBtnStyle, background: '#cbd5e1', color: '#1e293b', boxShadow: 'none' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {contentTab === 'blogs' && (
                  <form onSubmit={editingBlog ? handleUpdateBlog : handleAddBlog}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={labelStyle}>Blog Title *</label>
                      <input type="text" placeholder="e.g. 10 Early Warning Signs of Cancer" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} style={inputStyle} />
                    </div>

                    <div className="form-grid-2col">
                      <div>
                        <label style={labelStyle}>Category *</label>
                        <input type="text" placeholder="Nutrition" required value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Author Name *</label>
                        <input type="text" placeholder="By Prof. Ramesh" required value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div className="form-grid-2col">
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
                      <textarea rows={8} placeholder="Write the full content of the blog post. Use ### Heading at the start of lines to create leaf-themed sections." required value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} style={inputStyle} />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="submit" disabled={formStatus === 'sending'} style={submitBtnStyle}>
                        {formStatus === 'sending' ? 'Saving...' : (editingBlog ? 'Save Blog Changes' : '📝 Publish Blog Post')}
                      </button>
                      {editingBlog && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBlog(null);
                            setBlogForm({
                              title: '', category: 'Nutrition', author: 'By Prof. Ramesh',
                              readTime: '5 min read', excerpt: '', content: '', image: ''
                            });
                          }}
                          style={{ ...submitBtnStyle, background: '#cbd5e1', color: '#1e293b', boxShadow: 'none' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {contentTab === 'testimonials' && (
                  <form onSubmit={editingTestimonial ? handleUpdateTestimonial : handleAddTestimonial}>
                    <div className="form-grid-2col">
                      <div>
                        <label style={labelStyle}>Patient Name / Initials *</label>
                        <input type="text" placeholder="e.g. Amit K." required value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Location</label>
                        <input type="text" placeholder="e.g. Delhi, India" value={testimonialForm.location} onChange={e => setTestimonialForm({...testimonialForm, location: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div className="form-grid-2col">
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

                    <div className="form-grid-2col">
                      <div>
                        <label style={labelStyle}>Thumbnail Image URL</label>
                        <input type="url" placeholder="https://images.unsplash.com/..." value={testimonialForm.thumbnailUrl} onChange={e => setTestimonialForm({...testimonialForm, thumbnailUrl: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Video Link (e.g. YouTube)</label>
                        <input type="url" placeholder="https://youtube.com/watch?v=..." value={testimonialForm.videoUrl} onChange={e => setTestimonialForm({...testimonialForm, videoUrl: e.target.value})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={labelStyle}>Testimonial Message *</label>
                      <textarea rows={4} placeholder="Write the patient's feedback or healing journey summary..." required value={testimonialForm.text} onChange={e => setTestimonialForm({...testimonialForm, text: e.target.value})} style={inputStyle} />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button type="submit" disabled={formStatus === 'sending'} style={submitBtnStyle}>
                        {formStatus === 'sending' ? 'Saving...' : (editingTestimonial ? 'Save Testimonial Changes' : '💬 Add Testimonial')}
                      </button>
                      {editingTestimonial && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTestimonial(null);
                            setTestimonialForm({
                              name: '', location: 'India', rating: 5, text: '', date: 'Recent', videoUrl: '', thumbnailUrl: ''
                            });
                          }}
                          style={{ ...submitBtnStyle, background: '#cbd5e1', color: '#1e293b', boxShadow: 'none' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {contentTab === 'general' && generalForm && (
                  <form onSubmit={handleUpdateGeneralContent}>
                    
                    {/* PAGE 1: Contact & Stats */}
                    {generalSubTab === 'contact' && (
                      <div>
                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            📞 Contact Details
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Phone Number *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.contact?.phone || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    contact: { ...(generalForm.contact || {}), phone: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input
                                  type="email"
                                  required
                                  value={generalForm.contact?.email || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    contact: { ...(generalForm.contact || {}), email: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>WhatsApp (Digits only with Country Code, e.g. 918884588835) *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.contact?.whatsapp || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    contact: { ...(generalForm.contact || {}), whatsapp: e.target.value.replace(/\D/g, '') }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Consultation Timings *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.contact?.timings || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    contact: { ...(generalForm.contact || {}), timings: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Location / Physical Address *</label>
                              <input
                                type="text"
                                required
                                value={generalForm.contact?.address || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    contact: { ...(generalForm.contact || {}), address: e.target.value }
                                  })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('📊 Statistics List', 'stats', [
                          { key: 'value', label: 'Numeric Value *', type: 'number' },
                          { key: 'suffix', label: 'Suffix (e.g. +, %)' },
                          { key: 'label', label: 'Label *' },
                          { key: 'sublabel', label: 'Sublabel *' }
                        ], { value: 0, suffix: '', label: '', sublabel: '' })}
                      </div>
                    )}

                    {/* PAGE 2: Home Page */}
                    {generalSubTab === 'home' && (
                      <div>
                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🌟 Why Patients Trust Us (General Copy)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div style={{ marginBottom: '12px' }}>
                              <label style={labelStyle}>Section Title *</label>
                              <input
                                type="text"
                                required
                                value={generalForm.whyChooseUs?.title || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  whyChooseUs: { ...(generalForm.whyChooseUs || {}), title: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Section Subtitle *</label>
                              <textarea
                                rows={2}
                                required
                                value={generalForm.whyChooseUs?.subtitle || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  whyChooseUs: { ...(generalForm.whyChooseUs || {}), subtitle: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('🌟 Why Choose Us - Cards', 'whyChooseUs.items', [
                          { key: 'title', label: 'Card Title *' },
                          { key: 'desc', label: 'Card Description *', type: 'textarea' }
                        ], { title: '', desc: '' })}

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🛡️ Recovery Pillars (General Copy)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div style={{ marginBottom: '12px' }}>
                              <label style={labelStyle}>Section Title *</label>
                              <input
                                type="text"
                                required
                                value={generalForm.healingPillars?.title || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  healingPillars: { ...(generalForm.healingPillars || {}), title: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Section Subtitle *</label>
                              <textarea
                                rows={2}
                                required
                                value={generalForm.healingPillars?.subtitle || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  healingPillars: { ...(generalForm.healingPillars || {}), subtitle: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('🛡️ Recovery Pillars - Cards', 'healingPillars.items', [
                          { key: 'title', label: 'Pillar Title *' },
                          { key: 'stat', label: 'Pillar Stat Value (e.g. 20+) *' },
                          { key: 'statLabel', label: 'Pillar Stat Label (e.g. Custom Blends) *' },
                          { key: 'desc', label: 'Pillar Description *', type: 'textarea' }
                        ], { title: '', stat: '', statLabel: '', desc: '' })}

                        {renderListEditor('🖼️ Hero Slider - Carousel Slides', 'heroSlides', [
                          { key: 'badge', label: 'Slide Badge Text *' },
                          { key: 'headline', label: 'Headline Title *' },
                          { key: 'headlineAccent', label: 'Headline Accent (Green Highlighted Word) *' },
                          { key: 'subline', label: 'Subheading Subline *', type: 'textarea' },
                          { key: 'statValue', label: 'Stat Value (e.g. 4000+) *' },
                          { key: 'statLabel', label: 'Stat Description Label *' },
                          { key: 'ctaLabel', label: 'Primary Button Label *' },
                          { key: 'ctaHref', label: 'Primary Button Link *' },
                          { key: 'secondaryCtaLabel', label: 'Secondary Button Label *' },
                          { key: 'secondaryCtaHref', label: 'Secondary Button Link *' }
                        ], { badge: '', headline: '', headlineAccent: '', subline: '', statValue: '', statLabel: '', ctaLabel: '/contact', ctaHref: '', secondaryCtaLabel: '', secondaryCtaHref: '' })}
                      </div>
                    )}

                    {/* PAGE 3: About Page */}
                    {generalSubTab === 'about' && (
                      <div>
                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🖼️ Hero Section (About Page)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Badge *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutHero?.badge || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutHero: { ...(generalForm.aboutHero || {}), badge: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Headline Accent Word *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutHero?.headlineAccent || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutHero: { ...(generalForm.aboutHero || {}), headlineAccent: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              <label style={labelStyle}>Headline *</label>
                              <input
                                type="text"
                                required
                                value={generalForm.aboutHero?.headline || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  aboutHero: { ...(generalForm.aboutHero || {}), headline: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              <label style={labelStyle}>Subline *</label>
                              <textarea
                                rows={2}
                                required
                                value={generalForm.aboutHero?.subline || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  aboutHero: { ...(generalForm.aboutHero || {}), subline: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                            <div className="form-grid-2col" style={{ marginBottom: 0 }}>
                              <div>
                                <label style={labelStyle}>Primary CTA Button Label</label>
                                <input
                                  type="text"
                                  value={generalForm.aboutHero?.cta1Label || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutHero: { ...(generalForm.aboutHero || {}), cta1Label: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Primary CTA Button Link</label>
                                <input
                                  type="text"
                                  value={generalForm.aboutHero?.cta1Link || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutHero: { ...(generalForm.aboutHero || {}), cta1Link: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                          </div>
                        </details>

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            📖 Our Story Section
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Badge *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutStory?.badge || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutStory: { ...(generalForm.aboutStory || {}), badge: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutStory?.title || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutStory: { ...(generalForm.aboutStory || {}), title: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                              <label style={labelStyle}>Story Paragraphs (Separated by two newlines / blank lines) *</label>
                              <textarea
                                rows={6}
                                required
                                value={Array.isArray(generalForm.aboutStory?.paragraphs) ? generalForm.aboutStory.paragraphs.join('\n\n') : ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  aboutStory: { ...(generalForm.aboutStory || {}), paragraphs: e.target.value.split('\n\n').map(p => p.trim()).filter(Boolean) }
                                })}
                                style={inputStyle}
                              />
                            </div>

                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Founder Quote *</label>
                                <textarea
                                  rows={3}
                                  required
                                  value={generalForm.aboutStory?.founderQuote || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutStory: { ...(generalForm.aboutStory || {}), founderQuote: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Founder Quote Author *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutStory?.founderQuoteAuthor || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutStory: { ...(generalForm.aboutStory || {}), founderQuoteAuthor: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div className="form-grid-2col" style={{ marginBottom: 0 }}>
                              <div>
                                <label style={labelStyle}>Founder Image *</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setGeneralForm({
                                          ...generalForm,
                                          aboutStory: { ...(generalForm.aboutStory || {}), founderImage: reader.result }
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  style={{ marginBottom: '10px' }}
                                />
                                {generalForm.aboutStory?.founderImage && (
                                  <img
                                    src={generalForm.aboutStory.founderImage}
                                    alt="Founder Preview"
                                    style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                                  />
                                )}
                              </div>
                              <div>
                                <label style={labelStyle}>Story Highlights (Comma-separated) *</label>
                                <input
                                  type="text"
                                  required
                                  value={Array.isArray(generalForm.aboutStory?.highlights) ? generalForm.aboutStory.highlights.join(', ') : ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutStory: { ...(generalForm.aboutStory || {}), highlights: e.target.value.split(',').map(h => h.trim()).filter(Boolean) }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                          </div>
                        </details>

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🎯 Mission & Vision Section
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Section Main Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutMission?.title || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutMission: { ...(generalForm.aboutMission || {}), title: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Section Subtitle *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutMission?.subtitle || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutMission: { ...(generalForm.aboutMission || {}), subtitle: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Mission Card Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutMission?.missionTitle || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutMission: { ...(generalForm.aboutMission || {}), missionTitle: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Mission Card Text *</label>
                                <textarea
                                  rows={3}
                                  required
                                  value={generalForm.aboutMission?.missionText || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutMission: { ...(generalForm.aboutMission || {}), missionText: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div className="form-grid-2col" style={{ marginBottom: 0 }}>
                              <div>
                                <label style={labelStyle}>Vision Card Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutMission?.visionTitle || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutMission: { ...(generalForm.aboutMission || {}), visionTitle: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Vision Card Text *</label>
                                <textarea
                                  rows={3}
                                  required
                                  value={generalForm.aboutMission?.visionText || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutMission: { ...(generalForm.aboutMission || {}), visionText: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                          </div>
                        </details>

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            💎 Core Values (General Copy)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Section Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutValues?.title || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutValues: { ...(generalForm.aboutValues || {}), title: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Section Subtitle *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutValues?.subtitle || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutValues: { ...(generalForm.aboutValues || {}), subtitle: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                          </div>
                        </details>

                        {renderListEditor('💎 Core Values - Cards', 'aboutValues.items', [
                          { key: 'title', label: 'Card Title *' },
                          { key: 'desc', label: 'Card Description *', type: 'textarea' },
                          { key: 'color', label: 'Theme Accent Color *', type: 'color' }
                        ], { title: '', desc: '', color: '#1a6e52' })}

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            📅 Our Journey Timeline (General Copy)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Section Title *</label>
                              <input
                                type="text"
                                required
                                value={generalForm.aboutMilestones?.title || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  aboutMilestones: { ...(generalForm.aboutMilestones || {}), title: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('📅 Journey Milestones - Timeline', 'aboutMilestones.items', [
                          { key: 'year', label: 'Year (e.g. 1989) *' },
                          { key: 'title', label: 'Milestone Title *' },
                          { key: 'desc', label: 'Milestone Description *', type: 'textarea' }
                        ], { year: '', title: '', desc: '' })}

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🚶 Our Care Approach (General Copy)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Section Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutApproach?.title || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutApproach: { ...(generalForm.aboutApproach || {}), title: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Section Subtitle *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutApproach?.subtitle || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutApproach: { ...(generalForm.aboutApproach || {}), subtitle: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                          </div>
                        </details>

                        {renderListEditor('🚶 Care Approach Steps', 'aboutApproach.items', [
                          { key: 'step', label: 'Step Label (e.g. Step 1) *' },
                          { key: 'title', label: 'Step Title *' },
                          { key: 'desc', label: 'Step Description *', type: 'textarea' }
                        ], { step: '', title: '', desc: '' })}

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🧑 Meet The Founder Section
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Section Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutFounderProfile?.title || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), title: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Section Subtitle *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutFounderProfile?.subtitle || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), subtitle: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Founder Name *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutFounderProfile?.name || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), name: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Founder Role / Designation *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutFounderProfile?.role || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), role: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                              <label style={labelStyle}>Profile Paragraphs (Separated by two newlines / blank lines) *</label>
                              <textarea
                                rows={6}
                                required
                                value={Array.isArray(generalForm.aboutFounderProfile?.paragraphs) ? generalForm.aboutFounderProfile.paragraphs.join('\n\n') : ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), paragraphs: e.target.value.split('\n\n').map(p => p.trim()).filter(Boolean) }
                                })}
                                style={inputStyle}
                              />
                            </div>

                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Founder Quote *</label>
                                <textarea
                                  rows={3}
                                  required
                                  value={generalForm.aboutFounderProfile?.quote || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), quote: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Founder Quote Author *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.aboutFounderProfile?.quoteAuthor || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), quoteAuthor: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>

                            <div className="form-grid-2col" style={{ marginBottom: 0 }}>
                              <div>
                                <label style={labelStyle}>Founder Profile Image *</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setGeneralForm({
                                          ...generalForm,
                                          aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), image: reader.result }
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  style={{ marginBottom: '10px' }}
                                />
                                {generalForm.aboutFounderProfile?.image && (
                                  <img
                                    src={generalForm.aboutFounderProfile.image}
                                    alt="Founder Profile Preview"
                                    style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                                  />
                                )}
                              </div>
                              <div>
                                <label style={labelStyle}>Founder Credentials (Comma-separated list) *</label>
                                <input
                                  type="text"
                                  required
                                  value={Array.isArray(generalForm.aboutFounderProfile?.credentials) ? generalForm.aboutFounderProfile.credentials.join(', ') : ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    aboutFounderProfile: { ...(generalForm.aboutFounderProfile || {}), credentials: e.target.value.split(',').map(c => c.trim()).filter(Boolean) }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                          </div>
                        </details>
                      </div>
                    )}

                    {/* PAGE 4: Care Programs Page */}
                    {generalSubTab === 'programs' && (
                      <div>
                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🖼️ Hero Section (Care Programs Page)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Badge *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.careProgramsHero?.badge || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    careProgramsHero: { ...(generalForm.careProgramsHero || {}), badge: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Headline Accent Word *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.careProgramsHero?.titleAccent || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    careProgramsHero: { ...(generalForm.careProgramsHero || {}), titleAccent: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              <label style={labelStyle}>Headline Title *</label>
                              <input
                                type="text"
                                required
                                value={generalForm.careProgramsHero?.title || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  careProgramsHero: { ...(generalForm.careProgramsHero || {}), title: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Subline *</label>
                              <textarea
                                rows={2}
                                required
                                value={generalForm.careProgramsHero?.subline || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  careProgramsHero: { ...(generalForm.careProgramsHero || {}), subline: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('🩺 Featured Care Programs List', 'careProgramsList', [
                          { key: 'title', label: 'Program Name *' },
                          { key: 'slug', label: 'URL Slug *' },
                          { key: 'desc', label: 'Program Description *', type: 'textarea' }
                        ], { title: '', slug: '', desc: '' })}

                        {renderListEditor('🚶 5-Step Journey Steps', 'careProgramsSteps', [
                          { key: 'num', label: 'Step Number (e.g. 01) *' },
                          { key: 'title', label: 'Step Title *' },
                          { key: 'desc', label: 'Step Description *', type: 'textarea' }
                        ], { num: '', title: '', desc: '' })}
                      </div>
                    )}

                    {/* PAGE 5: Treatment Methods Page */}
                    {generalSubTab === 'methods' && (
                      <div>
                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🖼️ Hero Section (Treatment Methods Page)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Badge *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.treatmentMethodsHero?.badge || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    treatmentMethodsHero: { ...(generalForm.treatmentMethodsHero || {}), badge: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Headline Accent Word *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.treatmentMethodsHero?.titleAccent || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    treatmentMethodsHero: { ...(generalForm.treatmentMethodsHero || {}), titleAccent: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                            <div style={{ marginBottom: '12px' }}>
                              <label style={labelStyle}>Headline Title *</label>
                              <input
                                type="text"
                                required
                                value={generalForm.treatmentMethodsHero?.title || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  treatmentMethodsHero: { ...(generalForm.treatmentMethodsHero || {}), title: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Subline *</label>
                              <textarea
                                rows={2}
                                required
                                value={generalForm.treatmentMethodsHero?.subline || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  treatmentMethodsHero: { ...(generalForm.treatmentMethodsHero || {}), subline: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('🛡️ Philosophy Pillars', 'treatmentMethodsPhilosophy', [
                          { key: 'title', label: 'Pillar Title *' },
                          { key: 'desc', label: 'Pillar Description *', type: 'textarea' }
                        ], { title: '', desc: '' })}

                        {renderListEditor('🚶 Treatment Journey Steps', 'treatmentMethodsJourney', [
                          { key: 'num', label: 'Step Number (e.g. 01) *' },
                          { key: 'title', label: 'Step Title *' },
                          { key: 'desc', label: 'Step Short Description *', type: 'textarea' },
                          { key: 'detail', label: 'Step Detail / Modal Description *', type: 'textarea' }
                        ], { num: '', title: '', desc: '', detail: '' })}

                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            🎗️ Cancer Types & Side Effects Lists
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div style={{ marginBottom: '16px' }}>
                              <label style={labelStyle}>Supported Cancer Types (One type per line) *</label>
                              <textarea
                                rows={6}
                                required
                                value={Array.isArray(generalForm.treatmentMethodsCancers) ? generalForm.treatmentMethodsCancers.join('\n') : ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  treatmentMethodsCancers: e.target.value.split('\n').map(c => c.trim()).filter(Boolean)
                                })}
                                style={inputStyle}
                              />
                            </div>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Side Effects Addressed (One side effect per line) *</label>
                              <textarea
                                rows={6}
                                required
                                value={Array.isArray(generalForm.treatmentMethodsSideEffects) ? generalForm.treatmentMethodsSideEffects.join('\n') : ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  treatmentMethodsSideEffects: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>
                      </div>
                    )}

                    {/* PAGE 6: Our Team */}
                    {generalSubTab === 'team' && (
                      <div>
                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            👥 Hero Section (Our Team Page)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Badge *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.doctorsHero?.badge || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    doctorsHero: { ...(generalForm.doctorsHero || {}), badge: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Headline Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.doctorsHero?.title || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    doctorsHero: { ...(generalForm.doctorsHero || {}), title: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Subtitle *</label>
                              <textarea
                                rows={3}
                                required
                                value={generalForm.doctorsHero?.subtitle || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  doctorsHero: { ...(generalForm.doctorsHero || {}), subtitle: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('👥 Team Member Profiles', 'doctorsList', [
                          { key: 'name', label: 'Member Name *' },
                          { key: 'role', label: 'Role / Designation (e.g. Pharmacologist — M.Pharm, PhD) *' },
                          { key: 'experience', label: 'Experience Label (e.g. 22 Years Experience)' },
                          { key: 'specialty', label: 'Specialty *' },
                          { key: 'bio', label: 'Biography Description *', type: 'textarea' },
                          { key: 'image', label: 'Profile Photo *', type: 'image' }
                        ], { id: Date.now(), name: '', role: '', experience: '', specialty: '', bio: '', image: '/images/doctor-placeholder.png' })}
                      </div>
                    )}

                    {/* PAGE 7: Patient Education */}
                    {generalSubTab === 'education' && (
                      <div>
                        <details open style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                          <summary style={{ padding: '14px 20px', background: '#f8fafc', fontWeight: 600, fontSize: '14px', color: '#1e293b', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', userSelect: 'none' }}>
                            📖 Hero Section (Patient Education Page)
                          </summary>
                          <div style={{ padding: '20px' }}>
                            <div className="form-grid-2col">
                              <div>
                                <label style={labelStyle}>Badge *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.patientEducationHero?.badge || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    patientEducationHero: { ...(generalForm.patientEducationHero || {}), badge: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                              <div>
                                <label style={labelStyle}>Headline Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={generalForm.patientEducationHero?.title || ''}
                                  onChange={e => setGeneralForm({
                                    ...generalForm,
                                    patientEducationHero: { ...(generalForm.patientEducationHero || {}), title: e.target.value }
                                  })}
                                  style={inputStyle}
                                />
                              </div>
                            </div>
                            <div style={{ marginBottom: 0 }}>
                              <label style={labelStyle}>Subtitle *</label>
                              <textarea
                                rows={3}
                                required
                                value={generalForm.patientEducationHero?.subtitle || ''}
                                onChange={e => setGeneralForm({
                                  ...generalForm,
                                  patientEducationHero: { ...(generalForm.patientEducationHero || {}), subtitle: e.target.value }
                                })}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        </details>

                        {renderListEditor('📊 Immune System Stats', 'patientEducationStats', [
                          { key: 'value', label: 'Stat Value (e.g. 2 Billion+) *' },
                          { key: 'label', label: 'Stat Description Label *' },
                          { key: 'icon', label: 'Stat Emoji Icon *' }
                        ], { value: '', label: '', icon: '🧬' })}

                        {renderListEditor('📖 Educational Guides / Articles', 'patientEducationArticles', [
                          { key: 'id', label: 'Article Route ID (e.g. tcells-vs-nk-cells) *' },
                          { key: 'title', label: 'Article Title *' },
                          { key: 'category', label: 'Category (e.g. Immunology) *' },
                          { key: 'badge', label: 'Badge (e.g. 🧬 Immune Defence) *' },
                          { key: 'icon', label: 'Emoji Icon *' },
                          { key: 'excerpt', label: 'Excerpt / Summary Description *', type: 'textarea' },
                          { key: 'readTime', label: 'Read Time (e.g. 10 min read, or Coming Soon) *' },
                          { key: 'gradient', label: 'Card Gradient Style (CSS linear-gradient) *' }
                        ], { id: '', title: '', category: '', badge: '', icon: '🛡️', excerpt: '', readTime: '5 min read', gradient: 'linear-gradient(135deg, #0b5b67 0%, #38bed5 100%)', disabled: false })}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <button type="submit" disabled={formStatus === 'sending'} style={submitBtnStyle}>
                        {formStatus === 'sending' ? 'Saving Copy...' : '⚙️ Save Website Copy'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* RIGHT COLUMN: Already Added Items List */}
              <div className="admin-list-container">
                <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                  {contentTab === 'products' ? 'All Products' : contentTab === 'blogs' ? 'All Blog Articles' : contentTab === 'testimonials' ? 'All Testimonials' : 'ℹ️ Editorial Guidelines'} 
                  {contentTab !== 'general' && ` (${contentTab === 'products' ? dynProducts.length : contentTab === 'blogs' ? dynBlogs.length : dynTestimonials.length})`}
                </h3>

                <div style={{ maxHeight: '650px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
                  {contentTab === 'general' && (
                    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaInfoCircle style={{ color: PRIMARY }} /> Guidelines for Copy Updates
                      </h3>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '13px', lineHeight: '1.8' }}>
                        <li><strong>Instant Sync:</strong> Changes are written to the database and will update globally on the site immediately upon clicking "Save Website Copy".</li>
                        <li><strong>Safe Defaults:</strong> If you clear a field, the site will automatically fallback to default values to prevent layout breaks.</li>
                        <li><strong>SEO Compliance:</strong> Avoid changing titles to very long texts as it may affect metadata responsiveness.</li>
                        <li><strong>WhatsApp:</strong> Ensure the WhatsApp number is written with country code and digits only (e.g. <code>918884588835</code>) so the click-to-chat links work correctly.</li>
                      </ul>
                      <div style={{ marginTop: '24px', padding: '12px', background: `${PRIMARY}08`, borderRadius: '10px', borderLeft: `4px solid ${PRIMARY}` }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: PRIMARY, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Active Config File</span>
                        <code style={{ fontSize: '11.5px', color: '#334155' }}>backend/data/websiteContent.json</code>
                      </div>
                    </div>
                  )}

                  {contentTab === 'products' && (
                    dynProducts.length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', margin: '40px 0' }}>No products found.</p>
                    ) : (
                      dynProducts.map(p => (
                        <div key={p.id} className="admin-item-row">
                          <div style={{ flex: 1, minWidth: 0, marginRight: '8px' }}>
                            <strong style={{ fontSize: '13.5px', color: '#0f172a', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.name}</strong>
                            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Category: {p.category} • Price: ₹{p.price}</span>
                          </div>
                          <div className="admin-item-row-actions">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setProductForm({
                                  name: p.name,
                                  category: p.category,
                                  price: p.price,
                                  originalPrice: p.originalPrice || '',
                                  description: p.description || '',
                                  benefits: Array.isArray(p.benefits) ? p.benefits.join(', ') : '',
                                  ingredients: p.ingredients || '',
                                  dosage: p.dosage || '',
                                  size: p.size || '',
                                  badge: p.badge || '',
                                  icon: p.icon || '🌿',
                                  color: p.color || '#1a6e52'
                                });
                                setFormError('');
                                setFormStatus('');
                              }}
                              style={{
                                background: '#eff6ff', border: 'none', color: '#2563eb',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '12px', fontWeight: 600, fontFamily: 'inherit'
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              style={{
                                background: '#fef2f2', border: 'none', color: '#dc2626',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '12px', fontWeight: 600, fontFamily: 'inherit'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )
                  )}

                  {contentTab === 'blogs' && (
                    dynBlogs.length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', margin: '40px 0' }}>No blogs found.</p>
                    ) : (
                      dynBlogs.map(b => (
                        <div key={b.id} className="admin-item-row">
                          <div style={{ flex: 1, minWidth: 0, marginRight: '8px' }}>
                            <strong style={{ fontSize: '13.5px', color: '#0f172a', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{b.title}</strong>
                            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>{b.author} • {b.date}</span>
                          </div>
                          <div className="admin-item-row-actions">
                            <button
                              onClick={() => {
                                setEditingBlog(b);
                                setBlogForm({
                                  title: b.title,
                                  category: b.category,
                                  author: b.author,
                                  readTime: b.readTime || '5 min read',
                                  excerpt: b.excerpt || '',
                                  content: typeof b.content === 'string' ? b.content : (Array.isArray(b.content) ? b.content.map(s => `### ${s.heading}\n${s.body}`).join('\n\n') : ''),
                                  image: b.image || ''
                                });
                                setFormError('');
                                setFormStatus('');
                              }}
                              style={{
                                background: '#eff6ff', border: 'none', color: '#2563eb',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '12px', fontWeight: 600, fontFamily: 'inherit'
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              style={{
                                background: '#fef2f2', border: 'none', color: '#dc2626',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '12px', fontWeight: 600, fontFamily: 'inherit'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )
                  )}

                  {contentTab === 'testimonials' && (
                    dynTestimonials.length === 0 ? (
                      <p style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', margin: '40px 0' }}>No testimonials found.</p>
                    ) : (
                      dynTestimonials.map((t, idx) => (
                        <div key={t.id || idx} className="admin-item-row" style={{ alignItems: 'flex-start' }}>
                          <div style={{ flex: 1, minWidth: 0, marginRight: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{t.name} ({t.location})</strong>
                              <span style={{ color: '#fbbf24', fontSize: '12px' }}>{'★'.repeat(t.rating)}</span>
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#475569', fontStyle: 'italic', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>"{t.text}"</p>
                            {(t.videoUrl || t.thumbnailUrl) && (
                              <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '11px', color: '#047857', fontWeight: 600 }}>
                                {t.thumbnailUrl && <span>🖼️ Thumbnail</span>}
                                {t.videoUrl && <span>🎥 Video</span>}
                              </div>
                            )}
                          </div>
                          <div className="admin-item-row-actions">
                            <button
                              onClick={() => {
                                setEditingTestimonial(t);
                                setTestimonialForm({
                                  name: t.name,
                                  location: t.location || 'India',
                                  rating: t.rating || 5,
                                  text: t.text || '',
                                  date: t.date || 'Recent',
                                  videoUrl: t.videoUrl || '',
                                  thumbnailUrl: t.thumbnailUrl || ''
                                });
                                setFormError('');
                                setFormStatus('');
                              }}
                              style={{
                                background: '#eff6ff', border: 'none', color: '#2563eb',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '12px', fontWeight: 600, fontFamily: 'inherit'
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(t.id)}
                              style={{
                                background: '#fef2f2', border: 'none', color: '#dc2626',
                                padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '12px', fontWeight: 600, fontFamily: 'inherit'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
