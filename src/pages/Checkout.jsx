import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLeaf, FaShieldAlt, FaTruck, FaCheckCircle,
  FaExclamationTriangle, FaSpinner, FaArrowLeft,
  FaWhatsapp, FaLock, FaBox,
} from 'react-icons/fa';
import { useOrderSubmit } from '../hooks/useOrderSubmit';

const ACCENT  = '#38bed5';
const PRIMARY = '#1a6e52';

/* ── helpers ─────────────────────────────────────────────────────────── */
const inBase = {
  width: '100%', boxSizing: 'border-box',
  padding: '12px 16px',
  border: '1.5px solid #e2e8f0', borderRadius: '10px',
  fontSize: '14px', outline: 'none',
  background: '#f8fafc', color: '#0f172a',
  fontFamily: 'Poppins, sans-serif', transition: 'border-color 0.2s',
};
const focusBorder  = (e) => (e.target.style.borderColor = ACCENT);
const blurBorder   = (e) => (e.target.style.borderColor = '#e2e8f0');

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block', fontSize: '11.5px', fontWeight: 700,
        color: '#334155', marginBottom: '6px',
        textTransform: 'uppercase', letterSpacing: '0.5px',
      }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

/* ── main component ───────────────────────────────────────────────────── */
export default function Checkout() {
  const { state }  = useLocation();   // { product, qty } passed from ProductDetail
  const navigate   = useNavigate();
  const { submitOrder, status, error, reset } = useOrderSubmit();

  /* redirect if no product context */
  useEffect(() => {
    if (!state?.product) navigate('/store', { replace: true });
  }, [state, navigate]);

  const product = state?.product || {};
  const [qty, setQty] = useState(state?.qty || 1);

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [formError, setFormError] = useState('');
  const [orderId, setOrderId] = useState('');

  const total = (product.price || 0) * qty;

  /* ── field change ────────────────────────────────────────────────── */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /* ── validation ─────────────────────────────────────────────────── */
  const validate = () => {
    if (!form.customerName.trim()) return 'Please enter your full name.';
    if (!/^\d{10}$/.test(form.phone.trim())) return 'Enter a valid 10-digit phone number.';
    if (!/\S+@\S+\.\S+/.test(form.email.trim())) return 'Enter a valid email address.';
    if (!form.address.trim()) return 'Please enter your shipping address.';
    if (!form.city.trim()) return 'Please enter your city.';
    if (!form.state.trim()) return 'Please enter your state.';
    if (!/^\d{6}$/.test(form.pincode.trim())) return 'Enter a valid 6-digit pincode.';
    return null;
  };

  /* ── submit ──────────────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setFormError(err); return; }
    setFormError('');

    try {
      const result = await submitOrder({
        customerName:   form.customerName.trim(),
        phone:          form.phone.trim(),
        email:          form.email.trim(),
        address:        form.address.trim(),
        city:           form.city.trim(),
        state:          form.state.trim(),
        pincode:        form.pincode.trim(),
        productName:    product.name,
        quantity:       qty,
        unitPrice:      product.price,
        orderAmount:    total,
        productId:      product.id,
      });
      setOrderId(result?.orderId || '');
    } catch (_) {
      // error state handled by hook
    }
  };

  /* ── WhatsApp fallback ───────────────────────────────────────────── */
  const waText = encodeURIComponent(
    `🌿 *New Order — Cancer Herbalist*\n\n` +
    `Product: ${product.name}\nQty: ${qty}\nAmount: ₹${total.toLocaleString('en-IN')}\n\n` +
    `Name: ${form.customerName || '—'}\nPhone: ${form.phone || '—'}\n` +
    `Email: ${form.email || '—'}\n` +
    `Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`
  );

  /* ─────────────────────────────────────────────────────────────────── */
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* ── Hero strip ── */}
      <section style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
        padding: '120px 20px 50px', textAlign: 'center', color: '#fff',
      }}>
        <span style={{
          background: `${ACCENT}33`, border: `1px solid ${ACCENT}66`,
          color: ACCENT, padding: '5px 16px', borderRadius: '50px',
          fontSize: '12px', fontWeight: 600,
        }}>
          🔒 Secure Checkout
        </span>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          margin: '16px 0 10px',
        }}>
          Complete Your <span style={{ color: ACCENT }}>Order</span>
        </h1>
        <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
          Fill in your shipping details and we'll dispatch within 24 hours.
        </p>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 16px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 340px',
          gap: '28px',
          alignItems: 'start',
        }}
          className="checkout-grid"
        >

          {/* ── LEFT: Form ── */}
          <div>
            {/* Back link */}
            <Link
              to={`/store/${product.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: PRIMARY, fontWeight: 600, fontSize: '13px',
                textDecoration: 'none', marginBottom: '24px',
              }}
            >
              <FaArrowLeft fontSize="11px" /> Back to product
            </Link>

            {/* ── SUCCESS state ── */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: '#fff', borderRadius: '20px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    padding: '48px 32px', textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: `${ACCENT}18`, border: `3px solid ${ACCENT}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px', fontSize: '36px', color: ACCENT,
                  }}>
                    <FaCheckCircle />
                  </div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0f172a', marginBottom: '12px' }}>
                    Order Placed Successfully! 🎉
                  </h2>
                  <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '8px' }}>
                    Your order <strong style={{ color: PRIMARY }}>{orderId}</strong> has been recorded.
                  </p>
                  <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
                    A confirmation will be sent to <strong>{form.email}</strong>.<br />
                    Our team will contact you at <strong>{form.phone}</strong> within 24 hours.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href={`https://wa.me/918884588835?text=${waText}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: '#25d366', color: '#fff',
                        padding: '12px 24px', borderRadius: '12px',
                        textDecoration: 'none', fontWeight: 700, fontSize: '14px',
                      }}
                    >
                      <FaWhatsapp /> WhatsApp Us
                    </a>
                    <button
                      onClick={() => navigate('/store')}
                      style={{
                        padding: '12px 24px', borderRadius: '12px',
                        border: `2px solid ${PRIMARY}`, background: 'transparent',
                        color: PRIMARY, fontWeight: 700, fontSize: '14px',
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FORM ── */}
            {status !== 'success' && (
              <form onSubmit={handleSubmit} className="checkout-form"
                style={{
                  background: '#fff', borderRadius: '20px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                  padding: '32px',
                }}
              >
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0f172a', marginTop: 0, marginBottom: '24px', fontSize: '1.3rem' }}>
                  Shipping Details
                </h2>

                <Field label="Full Name" required>
                  <input
                    type="text" name="customerName" id="customerName"
                    placeholder="e.g. Rahul Sharma"
                    value={form.customerName} onChange={handleChange}
                    style={inBase} onFocus={focusBorder} onBlur={blurBorder}
                  />
                </Field>

                <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Field label="Phone Number" required>
                    <input
                      type="tel" name="phone" id="phone"
                      placeholder="10-digit mobile"
                      value={form.phone} onChange={handleChange}
                      style={inBase} onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </Field>
                  <Field label="Email Address" required>
                    <input
                      type="email" name="email" id="email"
                      placeholder="you@example.com"
                      value={form.email} onChange={handleChange}
                      style={inBase} onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </Field>
                </div>

                <Field label="Street Address / Flat / Building" required>
                  <textarea
                    name="address" id="address"
                    placeholder="House no., street, locality…"
                    value={form.address} onChange={handleChange}
                    rows={3}
                    style={{ ...inBase, resize: 'vertical' }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  />
                </Field>

                <div className="form-row-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '12px' }}>
                  <Field label="City" required>
                    <input
                      type="text" name="city" id="city"
                      placeholder="e.g. Bengaluru"
                      value={form.city} onChange={handleChange}
                      style={inBase} onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </Field>
                  <Field label="State" required>
                    <input
                      type="text" name="state" id="state"
                      placeholder="e.g. Karnataka"
                      value={form.state} onChange={handleChange}
                      style={inBase} onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </Field>
                  <Field label="Pincode" required>
                    <input
                      type="text" name="pincode" id="pincode"
                      placeholder="560001"
                      maxLength={6}
                      value={form.pincode} onChange={handleChange}
                      style={inBase} onFocus={focusBorder} onBlur={blurBorder}
                    />
                  </Field>
                </div>

                {/* Error banner */}
                {(formError || (status === 'error' && error)) && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: '#fef2f2', border: '1px solid #fecaca',
                      borderRadius: '10px', padding: '12px 16px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      color: '#b91c1c', fontSize: '13.5px', marginBottom: '16px',
                    }}
                  >
                    <FaExclamationTriangle />
                    <span>{formError || error}</span>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  id="placeOrderBtn"
                  disabled={status === 'submitting'}
                  style={{
                    width: '100%', padding: '15px',
                    background: status === 'submitting' ? '#94a3b8' : PRIMARY,
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontWeight: 700, fontSize: '15px', cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    fontFamily: 'inherit', transition: 'background 0.2s, box-shadow 0.2s',
                    boxShadow: status === 'submitting' ? 'none' : `0 4px 14px ${PRIMARY}40`,
                  }}
                  onMouseEnter={(e) => { if (status !== 'submitting') e.currentTarget.style.background = '#14533d'; }}
                  onMouseLeave={(e) => { if (status !== 'submitting') e.currentTarget.style.background = PRIMARY; }}
                >
                  {status === 'submitting'
                    ? <><FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Placing Order…</>
                    : <><FaLock style={{ fontSize: '13px' }} /> Place Order — ₹{total.toLocaleString('en-IN')}</>
                  }
                </button>

                <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginTop: '12px' }}>
                  <FaShieldAlt style={{ marginRight: '4px' }} />
                  Your data is secure. No payment is collected online — COD / bank transfer on confirmation.
                </p>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div>
            <div style={{
              background: '#fff', borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              padding: '28px', position: 'sticky', top: '90px',
            }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#0f172a', marginTop: 0, marginBottom: '20px', fontSize: '1.1rem' }}>
                Order Summary
              </h3>

              {/* Product card */}
              <div style={{
                display: 'flex', gap: '14px', alignItems: 'center',
                background: '#f8fafc', borderRadius: '12px', padding: '14px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '10px',
                  overflow: 'hidden', flexShrink: 0, border: '1px solid #e2e8f0',
                }}>
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                  </p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{product.size}</p>
                </div>
              </div>

              {/* Qty stepper */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Quantity</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      border: '1.5px solid #e2e8f0', background: '#f8fafc',
                      cursor: 'pointer', fontWeight: 700, fontSize: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >−</button>
                  <span style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(q => q + 1)}
                    style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      border: '1.5px solid #e2e8f0', background: '#f8fafc',
                      cursor: 'pointer', fontWeight: 700, fontSize: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >+</button>
                </div>
              </div>

              {/* Price breakdown */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                {[
                  { label: `Unit Price`, value: `₹${product.price?.toLocaleString('en-IN')}` },
                  { label: `Quantity`, value: `× ${qty}` },
                  { label: `Shipping`, value: `FREE` },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>{row.label}</span>
                    <span style={{ fontWeight: 600, color: '#334155', fontSize: '13px' }}>{row.value}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  borderTop: '2px solid #e2e8f0', paddingTop: '12px', marginTop: '4px',
                }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>Total</span>
                  <span style={{ fontWeight: 800, color: PRIMARY, fontSize: '17px' }}>
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: <FaTruck />,      text: 'Free shipping Pan-India' },
                  { icon: <FaBox />,        text: 'Dispatched within 24 hrs' },
                  { icon: <FaLeaf />,       text: '100% authentic, FSSAI certified' },
                  { icon: <FaShieldAlt />,  text: 'COD & bank transfer accepted' },
                ].map(b => (
                  <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
                    <span style={{ color: ACCENT }}>{b.icon}</span> {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row-2,
          .form-row-3 {
            grid-template-columns: 1fr !important;
          }
          .checkout-form {
            padding: 20px 16px !important;
            border-radius: 16px !important;
          }
        }
        @media (max-width: 400px) {
          .checkout-form {
            padding: 16px 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
