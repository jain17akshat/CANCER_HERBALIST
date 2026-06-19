import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaGraduationCap, FaBriefcase, FaRegEnvelope } from 'react-icons/fa';

const doctors = [
  {
    id: 1,
    name: 'Prof. Ramesh Babu',
    role: 'Pharmacologist,M.Pharm (PhD)',
    experience: '22 Years Experience',
    specialty: 'Clinical Oncology & Herbal Medicine Integration',
    bio: 'Prof. Ramesh is a highly accomplished Pharmacologist with a strong academic background and extensive experience in the field of herbal medicine. He holds a Master of Pharmacy (M.Pharm) and a PhD, demonstrating his deep expertise in pharmaceutical sciences and natural products. With over two decades of dedicated practice, he has made significant contributions to the understanding and application of herbal remedies for various health conditions.',
    edu: 'Harvard Medical School (MD), Stanford University (PhD in Pharmacognosy)',
    certifications: [
      
    ],
    image: '/images/doctor1.png',
  },
  {
    id: 2,
    name: 'TEAM',
    experience: '22 Years Experience',
    specialty: 'Clinical Oncology & Herbal Medicine Integration',
    bio: 'Comprised of dedicated professionals from diverse medical, research, and healthcare backgrounds, our team works collaboratively to deliver comprehensive care and personalized support to every patient. By combining clinical expertise, evidence-based practices, and a patient-centered approach, we strive to address each individuals unique needs throughout their treatment journey.',
    
    certifications: [
      
    ],
    image: '/images/doctor33.png',
  },
  

];

export default function Doctors() {
  return (
    <section className="section-padding" style={{ background: 'var(--gray-1)' }}>
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-badge">
            <FaUserMd /> OUR NUTRACEUTICAL TEAM
          </span>
          <h2 className="section-title">
            Meet Our Expert Team <span>Doctors</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Our multidisciplinary team of medical doctors, naturopaths, and botanical researchers is dedicated to providing comprehensive, personalized care for cancer patients.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '30px',
          }}
        >
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              data-aos="fade-up"
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
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
                />
                {/* Floating Experience Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: '600',
                    boxShadow: 'var(--shadow-primary)',
                  }}
                >
                  {doctor.experience}
                </div>
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
                  {doctor.name}
                </h3>
                <div
                  style={{
                    color: 'var(--primary-dark)',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '16px',
                  }}
                >
                  {doctor.role}
                </div>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--gray-3)',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                  }}
                >
                  {doctor.bio}
                </p>

                {/* Certifications */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--gray-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {doctor.certifications.map((cert, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: 'var(--dark-3)',
                      }}
                    >
                      <FaRegEnvelope style={{ color: 'var(--primary)', fontSize: '14px', flexShrink: 0 }} />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}