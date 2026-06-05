import React from 'react';
 

const blogs = [
  {
    id: 1,
    title: 'Understanding Cancer Nutrition: Foods That Fight and Foods to Avoid',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    category: 'Nutrition',
    author: 'Dr. Evelyn Carter',
    readTime: '8 min read',
    date: 'March 15, 2026',
    excerpt:
      'Learn about evidence-based nutrition strategies that support recovery and improve quality of life during treatment.',
  },
  {
    id: 2,
    title: 'Herbal Adaptogens for Stress Relief During Cancer Treatment',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    category: 'Herbal Care',
    author: 'Dr. Marcus Vance',
    readTime: '6 min read',
    date: 'March 10, 2026',
    excerpt:
      'Understand how certain adaptogenic herbs may help manage treatment-related stress under professional supervision.',
  },
  {
    id: 3,
    title: 'Managing Chemotherapy Side Effects Naturally',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    category: 'Treatment Support',
    author: 'Dr. Daniel Sharma',
    readTime: '9 min read',
    date: 'February 28, 2026',
    excerpt:
      'Explore evidence-based supportive approaches that may help improve comfort during chemotherapy.',
  },
 
];

export default function Blog() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      <section
        style={{
          padding: '130px 20px 70px',
          textAlign: 'center',
          background:
            'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '8px 18px',
            borderRadius: '999px',
            background: '#dbeafe',
            color: '#38bed5',
            fontWeight: '600',
            marginBottom: '20px',
          }}
        >
          Latest Articles & Research
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#0f172a',
            marginBottom: '20px',
          }}
        >
          Educational Blog
        </h1>

        <p
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            color: '#64748b',
            lineHeight: '1.8',
            fontSize: '1.1rem',
          }}
        >
          Expert guidance on cancer awareness, nutrition,
          herbal support, wellness, and recovery.
        </p>

        <input
          type="text"
          placeholder="Search articles..."
          style={{
            marginTop: '30px',
            width: '100%',
            maxWidth: '600px',
            padding: '16px 20px',
            borderRadius: '50px',
            border: '1px solid #cbd5e1',
            outline: 'none',
            fontSize: '15px',
          }}
        />
      </section>

      
      {/* Blog Grid */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '80px 20px',
        }}
      >
        <h2
          style={{
            marginBottom: '40px',
            color: '#0f172a',
            fontSize: '2rem',
          }}
        >
          Recent Articles
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
          }}
        >
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              <div style={{ padding: '25px' }}>
                <span
                  style={{
                    color: '#38bed5',
                    fontWeight: '600',
                    fontSize: '14px',
                  }}
                >
                  {blog.category}
                </span>

                <h3
                  style={{
                    marginTop: '12px',
                    color: '#0f172a',
                    lineHeight: '1.4',
                  }}
                >
                  {blog.title}
                </h3>

                <p
                  style={{
                    marginTop: '12px',
                    color: '#64748b',
                    lineHeight: '1.7',
                  }}
                >
                  {blog.excerpt}
                </p>

                <div
                  style={{
                    marginTop: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: '#94a3b8',
                  }}
                >
                  <span>{blog.author}</span>
                  <span>{blog.readTime}</span>
                </div>

                <button
                  style={{
                    marginTop: '20px',
                    background: '#38bed5',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                  }}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section
        style={{
          background: '#38bed5',
          padding: '80px 20px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '2rem' }}>
          Subscribe For Health Updates
        </h2>

        <p
          style={{
            maxWidth: '600px',
            margin: '15px auto 30px',
            opacity: 0.9,
          }}
        >
          Receive the latest educational articles, research insights,
          and wellness guidance.
        </p>

        <input
          type="email"
          placeholder="Enter your email address"
          style={{
            width: '100%',
            maxWidth: '450px',
            padding: '16px',
            borderRadius: '999px',
            border: 'none',
            outline: 'none',
          }}
        />
      </section>
    </div>
  );
}