import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaClock, FaUser } from 'react-icons/fa';

const ACCENT = '#38bed5';

const blogs = [
  {
    id: 1,
    title: 'Understanding Cancer Nutrition: Foods That Fight and Foods to Avoid',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    category: 'Nutrition',
    author: 'Dr. Evelyn Carter',
    readTime: '8 min read',
    date: 'March 15, 2026',
    excerpt: 'Learn about evidence-based nutrition strategies that support recovery and improve quality of life during treatment.',
  },
  {
    id: 2,
    title: 'Herbal Adaptogens for Stress Relief During Cancer Treatment',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    category: 'Herbal Care',
    author: 'Dr. Marcus Vance',
    readTime: '6 min read',
    date: 'March 10, 2026',
    excerpt: 'Understand how certain adaptogenic herbs may help manage treatment-related stress under professional supervision.',
  },
  {
    id: 3,
    title: 'Managing Chemotherapy Side Effects Naturally',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    category: 'Treatment Support',
    author: 'Dr. Daniel Sharma',
    readTime: '9 min read',
    date: 'February 28, 2026',
    excerpt: 'Explore evidence-based supportive approaches that may help improve comfort during chemotherapy.',
  },
];

export default function Blog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '130px 20px 70px', textAlign: 'center', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' }}>
        <div style={{ display: 'inline-block', padding: '8px 18px', borderRadius: '999px', background: '#dbeafe', color: ACCENT, fontWeight: '600', marginBottom: '20px' }}>
          Latest Articles &amp; Research
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#0f172a', marginBottom: '20px', fontFamily: 'Playfair Display, serif' }}>
          Educational Blog
        </h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: '#64748b', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Expert guidance on cancer awareness, nutrition, herbal support, wellness, and recovery.
        </p>
        <div style={{ position: 'relative', marginTop: '30px', maxWidth: '600px', margin: '30px auto 0' }}>
          <FaSearch style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '16px 20px 16px 48px', borderRadius: '50px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
        <h2 style={{ marginBottom: '40px', color: '#0f172a', fontSize: '2rem', fontFamily: 'Playfair Display, serif' }}>
          {search ? `Results for "${search}"` : 'Recent Articles'}
        </h2>

        {filtered.length === 0 && (
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No articles found. Try a different search term.</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {filtered.map((blog) => (
            <div
              key={blog.id}
              style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transition: 'transform 0.3s', cursor: 'pointer' }}
              onClick={() => navigate(`/blog/${blog.id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                />
                <span style={{ position: 'absolute', top: '16px', left: '16px', background: ACCENT, color: '#fff', padding: '4px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 700 }}>
                  {blog.category}
                </span>
              </div>

              <div style={{ padding: '28px' }}>
                <h3 style={{ marginTop: '0', color: '#0f172a', lineHeight: '1.4', fontSize: '1.1rem', fontFamily: 'Playfair Display, serif' }}>{blog.title}</h3>
                <p style={{ marginTop: '12px', color: '#64748b', lineHeight: '1.7', fontSize: '0.95rem' }}>{blog.excerpt}</p>

                <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaUser />{blog.author}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaClock />{blog.readTime}</span>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/blog/${blog.id}`); }}
                  style={{ marginTop: '20px', background: ACCENT, color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '999px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: ACCENT, padding: '80px 20px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif' }}>Subscribe For Health Updates</h2>
        <p style={{ maxWidth: '600px', margin: '15px auto 30px', opacity: 0.9 }}>
          Receive the latest educational articles, research insights, and wellness guidance.
        </p>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="email"
            placeholder="Enter your email address"
            style={{ flex: 1, minWidth: '240px', padding: '16px', borderRadius: '999px', border: 'none', outline: 'none', fontSize: '15px' }}
          />
          <button style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '16px 28px', borderRadius: '999px', fontWeight: 700, cursor: 'pointer' }}>
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}