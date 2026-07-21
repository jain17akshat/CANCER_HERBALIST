import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const PRIMARY = '#1a6e52';

export default function StoreFloatingActions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();

  const isStoreOpen = location.pathname.startsWith('/store') || 
                      location.pathname === '/wishlist' || 
                      location.pathname === '/checkout' ||
                      location.pathname === '/my-orders' ||
                      location.pathname === '/track-order';

  return (
    <AnimatePresence>
      {isStoreOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center'
          }}
        >
          {/* Wishlist Floating Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate('/wishlist')}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#fff',
              border: '1.5px solid #ef4444',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(239, 68, 68, 0.15)',
              fontSize: '18px',
              outline: 'none'
            }}
            title="My Wishlist"
          >
            <FaHeart />
          </motion.button>

          {/* Cart Floating Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsCartOpen(true)}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: PRIMARY,
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(26, 110, 82, 0.3)',
              fontSize: '22px',
              position: 'relative',
              outline: 'none'
            }}
            title="Your Cart"
          >
            <FaShoppingBag />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}>
                {cartCount}
              </span>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
