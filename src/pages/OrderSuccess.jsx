import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

const ACCENT  = '#38bed5';
const PRIMARY = '#1a6e52';

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  // If someone lands here directly with no state, send them to store
  useEffect(() => {
    if (!state?.orderId) {
      navigate('/store', { replace: true });
    }
  }, [state, navigate]);

  // state is passed from Checkout via navigate('/order-success', { state: { ... } })
  const {
    orderId       = '',
    paymentMethod = 'cod',
    total         = 0,
    email         = '',
    phone         = '',
    customerName  = '',
    waText        = '',
  } = state || {};

  // Don't render anything while redirecting
  if (!state?.orderId) return null;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero strip */}
      <section style={{
        background: `linear-gradient(135deg, ${PRIMARY} 0%, #0f3460 100%)`,
        padding: '120px 20px 50px', textAlign: 'center', color: '#fff',
      }}>
        <span style={{
          background: `${ACCENT}33`, border: `1px solid ${ACCENT}66`,
          color: ACCENT, padding: '5px 16px', borderRadius: '50px',
          fontSize: '12px', fontWeight: 600,
        }}>
          🎉 Order Confirmed
        </span>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          margin: '16px 0 10px',
        }}>
          Thank You for Your <span style={{ color: ACCENT }}>Order!</span>
        </h1>
        <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
          Your order has been successfully recorded.
        </p>
      </section>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 16px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{
            background: '#fff', borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '48px 32px', textAlign: 'center',
          }}>
            {/* Check icon */}
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

            {paymentMethod === 'online' ? (
              <div style={{
                background: '#f0fdf4', borderRadius: '16px',
                padding: '24px', margin: '20px auto 28px', maxWidth: '420px',
                border: '1.5px solid #bbf7d0', textAlign: 'center',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#166534', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span>🎉</span> Payment Successful!
                </h3>
                <p style={{ fontSize: '13.5px', color: '#1e293b', marginBottom: '8px', lineHeight: 1.6 }}>
                  Your online payment of <strong style={{ color: PRIMARY }}>₹{Number(total).toLocaleString('en-IN')}</strong> has been received and verified.
                </p>
                <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                  A confirmation has been sent to <strong>{email}</strong>. Our team will start processing your order immediately!
                </p>
              </div>
            ) : (
              <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '28px' }}>
                A confirmation will be sent to <strong>{email}</strong>.<br />
                Our team will contact you at <strong>{phone}</strong> within 24 hours
                to confirm COD/bank transfer.
              </p>
            )}

            {/* Action buttons */}
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
                <FaWhatsapp />
                {paymentMethod === 'online' ? 'Chat on WhatsApp' : 'WhatsApp Us'}
              </a>
              <button
                onClick={() => navigate(`/track-order?orderId=${orderId}`)}
                style={{
                  padding: '12px 24px', borderRadius: '12px',
                  border: 'none', background: PRIMARY,
                  color: '#fff', fontWeight: 700, fontSize: '14px',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: `0 4px 10px ${PRIMARY}22`
                }}
              >
                Track Order Status
              </button>
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
