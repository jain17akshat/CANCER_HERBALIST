import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaGraduationCap, FaBriefcase, FaRegEnvelope } from 'react-icons/fa';
const experts = [
  {
    name: 'Dr. Evelyn Carter',
    role: 'MD, PhD - Integrative Oncologist',
    experience: '22 Years Experience',
    specialty: 'Clinical Oncology & Herbal Medicine Integration',
    bio: 'Dr. Carter is a certified oncologist with over two decades of experience bridging mainstream cancer treatments with natural herbal support protocols.',
    edu: 'Harvard Medical School (MD), Stanford (PhD in Herbology)',
    image: 'https://drive.google.com/uc?export=view&id=1HAnp9RhEH6-IZXF7wM3UPqZTlvJ6GZcL',
  },
  {
    name: 'Dr. Marcus Vance',
    role: 'ND - Naturopathic Physician',
    specialty: 'Cancer Nutrition & Immunotherapy Botanicals',
    bio: 'Dr. Vance specializes in developing metabolic diets and botanical support formulations that optimize patient cellular defense during treatment.',
    edu: 'Bastyr University (ND - Doctor of Naturopathic Medicine)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500',
  },
  {
    name: 'Prof. Aisha Rahman',
    role: 'PhD - Botanical Pharmacology Scientist',
    experience: '25 Years Experience',
    specialty: 'Phytochemical Screening & Cancer Cell Research',
    bio: 'Professor Rahman leads our research team, analyzing bioactive compounds in rare plants to validate their efficacy against abnormal cell lines.',
    edu: 'Oxford University (PhD in Pharmacy & Organic Chemistry)',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=500',
  },
];

export default function ExpertProfiles() {
  return (
    <section
      id="experts"
      className="section-padding"
      style={{ background: 'var(--gray-1)' }}
    >
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-badge">
            <FaUserMd /> Clinical & Research Team
          </span>
          <h2 className="section-title">
            Our Certified <span>Experts</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Meet our multidisciplinary team of medical doctors, naturopaths, and botanical researchers dedicated to your recovery.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
          }}
        >
          {experts.map((expert, i) => (
            <motion.div
              key={expert.name}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              whileHover={{ y: -8 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              {/* Image Frame */}
              <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={expert.image}
                  alt={expert.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: 'var(--card-padding-sm, 28px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: 'var(--dark-2)',
                    marginBottom: '4px',
                  }}
                >
                  {expert.name}
                </h3>
                <div
                  style={{
                    color: 'var(--primary-dark)',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '16px',
                  }}
                >
                  {expert.role}
                </div>

                <p
                  style={{
                    fontSize: '13.5px',
                    color: 'var(--gray-3)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  {expert.bio}
                </p>

                {/* Details Footer */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--gray-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'var(--dark-3)',
                    }}
                  >
                    <FaGraduationCap style={{ color: 'var(--primary)', fontSize: '15px', flexShrink: 0 }} />
                    <span style={{ fontWeight: '500' }}>{expert.edu}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'var(--dark-3)',
                    }}
                  >
                    <FaBriefcase style={{ color: 'var(--secondary)', fontSize: '14px', flexShrink: 0 }} />
                    <span style={{ fontWeight: '500' }}>{expert.specialty}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
