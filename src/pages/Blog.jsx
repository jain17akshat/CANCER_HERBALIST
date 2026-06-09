import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaClock, FaUser } from 'react-icons/fa';

const ACCENT = '#38bed5';

const blogs = [
  {
    id: 1,
    title: 'A Remarkable Prostate Cancer Journey: When Symptoms Were Not Obvious',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    category: 'Nutrition',
    author: 'By Prof. Ramesh  ',
    readTime: '8 min read',
    date: 'February 21, 2026',
    excerpt: 'A 74-year-old man\'s prostate cancer diagnosis was delayed due to atypical symptoms. Learn how elevated PSA levels led to diagnosis and explore the role of supportive nutrition in his cancer care journey.',
  },
  {
    id: 2,
    title: 'Herbal Adaptogens for Stress Relief During Cancer Treatment',
    author: 'By Prof. Ramesh  ',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
   category: "Cancer Research",
title: "The Rise of Precision Oncology: How Personalized Cancer Treatment Is Changing Lives",
excerpt: "Discover how genetic testing, artificial intelligence, targeted therapies, and immunotherapy are transforming cancer treatment through personalized care and improved patient outcomes.",

  },
  {
    id: 3,
    title: 'Managing Chemotherapy Side Effects Naturally',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
   author: 'By Prof. Ramesh  ',
    readTime: '8 min read',
    category: "Cancer Awareness",
title: "10 Early Warning Signs of Cancer That Should Never Be Ignored",
excerpt: "Many cancers can be treated more effectively when detected early. Learn about common warning signs, when to seek medical attention, and why early diagnosis can make a critical difference.",
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