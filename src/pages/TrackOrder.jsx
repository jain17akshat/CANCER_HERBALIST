import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaTruck, FaClock, FaCheckCircle, FaExclamationTriangle, 
  FaBoxOpen, FaClipboardList, FaExternalLinkAlt, FaQuestionCircle 
} from 'react-icons/fa';

const PRIMARY = '#1a6e52';
const ACCENT  = '#38bed5';
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'https://cancer-herbalist-rhgj.vercel.app').replace(/\/+$/, '');

export default function TrackOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);

  // If orderId is in query params and they have local storage, try to auto-prefill contact
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    const matchingSaved = savedOrders.find(id => id === orderId);
    if (matchingSaved) {
      // If we find it in their local orders, we can let them track directly if we query matching contacts
      // But for security, it is best to still let them enter their email or phone. Let's prefill contact if they saved one
      const lastContact = localStorage.getItem('last_verified_contact') || '';
      if (lastContact) setContact(lastContact);
    }
  }, [orderId]);

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim() || !contact.trim()) {
      setError('Please enter both Order ID and Phone Number / Email.');
      return;
    }

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/track`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ orderId: orderId.trim(), contact: contact.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch tracking info. Please check details.');
      }

      setOrderData(data);
      // Save contact to make future lookups easier
      localStorage.setItem('last_verified_contact', contact.trim());
      
      // Save order ID to localStorage "my_orders" so it displays on their dashboard
      const savedOrders = new Set(JSON.parse(localStorage.getItem('my_orders') || '[]'));
      savedOrders.add(orderId.trim());
      localStorage.setItem('my_orders', JSON.stringify(Array.from(savedOrders)));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Status mapping for timeline visual highlights
  const getTimelineStep = (status) => {
    const steps = ['ORDER_PLACED', 'ORDER_CONFIRMED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    if (status === 'CANCELLATION_REQUESTED' || status === 'CANCELLED') return -1;
    return steps.indexOf(status);
  };

  const timelineStep = orderData ? getTimelineStep(orderData.order.orderStatus) : 0;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '110px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
        
        {/* Page title */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#0f172a', marginBottom: '10px' }}>
            Track Your <span style={{ color: PRIMARY }}>Order Status</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>
            Enter your details below to check live shipping status and retrieve tracking URLs.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0',
          marginBottom: '32px'
        }}>
          <form onSubmit={handleTrackSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                Order ID *
              </label>
              <input
                type="text"
                placeholder="e.g. CH-1719890123-ABCD"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14.5px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                Phone Number or Email *
              </label>
              <input
                type="text"
                placeholder="e.g. 9876543210 or user@email.com"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14.5px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: PRIMARY,
                  color: '#fff',
                  padding: '14px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: `0 4px 12px ${PRIMARY}33`,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 0.9}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
              >
                {loading ? 'Tracking...' : <><FaSearch /> Track Shipment</>}
              </button>
            </div>
          </form>

          {error && (
            <div style={{
              marginTop: '20px',
              padding: '14px 20px',
              borderRadius: '10px',
              background: '#fef2f2',
              color: '#991b1b',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500
            }}>
              <FaExclamationTriangle />
              {error}
            </div>
          )}
        </div>

        {/* Tracking Results Card */}
        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              marginBottom: '32px'
            }}>
              
              {/* Order Header Summary */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: '1px solid #f1f5f9',
                paddingBottom: '20px',
                marginBottom: '28px'
              }}>
                <div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: ACCENT,
                    letterSpacing: '0.5px'
                  }}>
                    Order Information
                  </span>
                  <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '4px 0 6px', fontWeight: 800 }}>
                    {orderData.order.orderId}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
                    Placed on: {orderData.order.orderDate}
                  </p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    background: timelineStep === -1 ? '#fee2e2' : '#ecfdf5',
                    color: timelineStep === -1 ? '#ef4444' : PRIMARY,
                    padding: '6px 14px',
                    borderRadius: '50px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    display: 'inline-block'
                  }}>
                    {orderData.order.orderStatus.replace(/_/g, ' ')}
                  </span>
                  <p style={{ color: PRIMARY, fontSize: '16px', fontWeight: 800, margin: '8px 0 0' }}>
                    ₹{Number(orderData.order.orderAmount).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Timeline Status Tracker */}
              {timelineStep !== -1 ? (
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '14.5px', color: '#334155', fontWeight: 700, marginBottom: '24px' }}>
                    Shipping Progress
                  </h3>
                  
                  {/* Timeline bar */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative',
                    padding: '0 10px'
                  }}>
                    
                    {/* Connecting background line */}
                    <div style={{
                      position: 'absolute',
                      left: '24px',
                      right: '24px',
                      top: '16px',
                      height: '4px',
                      background: '#e2e8f0',
                      zIndex: 1
                    }} />

                    {/* Connecting progress line */}
                    <div style={{
                      position: 'absolute',
                      left: '24px',
                      top: '16px',
                      height: '4px',
                      background: PRIMARY,
                      zIndex: 1,
                      width: `${(timelineStep / 4) * 100}%`,
                      transition: 'width 0.5s ease'
                    }} />

                    {/* Timeline nodes */}
                    {[
                      { icon: <FaClipboardList />, label: 'Placed', stepVal: 0 },
                      { icon: <FaCheckCircle />, label: 'Confirmed', stepVal: 1 },
                      { icon: <FaTruck />, label: 'Shipped', stepVal: 2 },
                      { icon: <FaClock />, label: 'Out for Delivery', stepVal: 3 },
                      { icon: <FaBoxOpen />, label: 'Delivered', stepVal: 4 }
                    ].map((node, i) => {
                      const isCompleted = timelineStep >= node.stepVal;
                      const isCurrent = timelineStep === node.stepVal;
                      
                      return (
                        <div key={i} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          zIndex: 2,
                          position: 'relative',
                          width: '60px'
                        }}>
                          <div style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            background: isCompleted ? PRIMARY : '#fff',
                            border: `3px solid ${isCompleted ? PRIMARY : '#cbd5e1'}`,
                            color: isCompleted ? '#fff' : '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            boxShadow: isCurrent ? `0 0 0 4px ${PRIMARY}33` : 'none',
                            transition: 'all 0.3s ease'
                          }}>
                            {node.icon}
                          </div>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: isCurrent ? 800 : 600,
                            color: isCurrent ? PRIMARY : '#64748b',
                            textAlign: 'center',
                            marginTop: '8px',
                            whiteSpace: 'nowrap'
                          }}>
                            {node.label}
                          </span>
                        </div>
                      );
                    })}

                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: '#fef2f2',
                  border: '1px solid #fee2e2',
                  color: '#b91c1c',
                  textAlign: 'center',
                  marginBottom: '32px'
                }}>
                  <FaExclamationTriangle style={{ fontSize: '24px', marginBottom: '8px' }} />
                  <h4 style={{ margin: '0 0 4px', fontWeight: 700 }}>Order Request Cancelled</h4>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                    This order was cancelled by patient request or administrative verification.
                  </p>
                </div>
              )}

              {/* Delivery Details Card (Courier / AWB) */}
              {orderData.order.awb && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  marginBottom: '28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '13.5px', color: '#64748b', fontWeight: 600 }}>
                      Courier Partner
                    </h4>
                    <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '14.5px' }}>
                      {orderData.order.courierName || 'Shiprocket Partner'}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#475569' }}>
                      AWB Code: <strong style={{ color: '#0f172a' }}>{orderData.order.awb}</strong>
                    </p>
                  </div>
                  
                  {orderData.order.trackingUrl && (
                    <a
                      href={orderData.order.trackingUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#fff',
                        border: '1.5px solid #cbd5e1',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '13px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}
                    >
                      Live tracking <FaExternalLinkAlt style={{ fontSize: '11px' }} />
                    </a>
                  )}
                </div>
              )}

              {/* Activity History Logs */}
              <div>
                <h3 style={{ fontSize: '14px', color: '#334155', fontWeight: 700, marginBottom: '16px' }}>
                  Activity History
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {orderData.events.slice().reverse().map((evt, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: '16px',
                      position: 'relative',
                    }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: idx === 0 ? PRIMARY : '#cbd5e1',
                        marginTop: '5px',
                        flexShrink: 0
                      }} />
                      <div>
                        <p style={{ margin: '0 0 4px', fontSize: '13.5px', color: '#0f172a', fontWeight: idx === 0 ? 700 : 500 }}>
                          {evt.customerMessage}
                        </p>
                        <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                          {new Date(evt.createdAt).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Link to Order Details */}
              <div style={{
                marginTop: '36px',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '24px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => navigate(`/order-details/${orderData.order.orderId}`, {
                    state: { verifiedContact: contact }
                  })}
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    boxShadow: `0 4px 14px ${PRIMARY}40`
                  }}
                >
                  Manage Order & Returns →
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* FAQs accordion Link Strip */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaQuestionCircle style={{ fontSize: '24px', color: ACCENT }} />
            <div>
              <h4 style={{ margin: '0 0 2px', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>
                Have questions about your delivery?
              </h4>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#64748b' }}>
                Read our detailed guides on cancellation windows, return reverse pickups, and refund durations.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/faqs')}
            style={{
              background: '#f1f5f9',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              color: '#475569',
              fontWeight: 700,
              fontSize: '12.5px',
              cursor: 'pointer'
            }}
          >
            Browse FAQs
          </button>
        </div>

      </div>
    </div>
  );
}
