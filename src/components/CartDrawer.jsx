import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const PRIMARY = '#1a6e52';
const ACCENT = '#38bed5';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQty, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 99998,
            }}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '420px',
              background: '#fff',
              zIndex: 99999,
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaShoppingBag style={{ color: PRIMARY }} /> Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'none', border: 'none', fontSize: '20px',
                  color: '#64748b', cursor: 'pointer', display: 'flex',
                  padding: '4px'
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '60px' }}>
                  <FaShoppingBag style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                  <p style={{ fontSize: '1.1rem', margin: '0 0 16px' }}>Your cart is empty.</p>
                  <button
                    onClick={() => { setIsCartOpen(false); navigate('/store'); }}
                    style={{
                      background: PRIMARY, color: '#fff', border: 'none',
                      padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                      fontWeight: 600, fontFamily: 'inherit'
                    }}
                  >
                    Browse Store
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {cart.map(item => (
                    <div key={item.product.id} style={{
                      display: 'flex', gap: '16px', background: '#fff',
                      border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px'
                    }}>
                      {/* Image */}
                      <div style={{
                        width: '80px', height: '80px', borderRadius: '8px',
                        background: '#f8fafc', overflow: 'hidden', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {item.product.images?.[0] ? (
                          <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '32px' }}>{item.product.icon}</span>
                        )}
                      </div>
                      
                      {/* Details */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#0f172a' }}>{item.product.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                          >
                            <FaTrash fontSize="13px" />
                          </button>
                        </div>
                        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#64748b' }}>₹{item.product.price.toLocaleString('en-IN')}</p>
                        
                        {/* Qty Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                          <div style={{
                            display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0',
                            borderRadius: '6px', overflow: 'hidden'
                          }}>
                            <button
                              onClick={() => updateQty(item.product.id, item.qty - 1)}
                              style={{ background: '#f8fafc', border: 'none', padding: '4px 10px', cursor: 'pointer' }}
                            >−</button>
                            <span style={{ padding: '0 10px', fontSize: '13px', fontWeight: 600 }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.product.id, item.qty + 1)}
                              style={{ background: '#f8fafc', border: 'none', padding: '4px 10px', cursor: 'pointer' }}
                            >+</button>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '14px', color: PRIMARY, marginLeft: 'auto' }}>
                            ₹{(item.product.price * item.qty).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{
                padding: '24px', borderTop: '1px solid #e2e8f0',
                background: '#f8fafc', marginTop: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Subtotal</span>
                  <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '18px' }}>
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '20px', textAlign: 'center' }}>
                  Shipping & taxes calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  style={{
                    width: '100%', padding: '16px',
                    background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontWeight: 700, fontSize: '16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: `0 8px 20px ${ACCENT}40`, fontFamily: 'inherit'
                  }}
                >
                  Checkout Now <FaArrowRight fontSize="13px" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
