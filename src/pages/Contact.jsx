import React, { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      'Appointment request submitted successfully!'
    );

    setFormData({
      name: '',
      phone: '',
      email: '',
      treatment: '',
      message: '',
    });
  };

  return (
    <div
      style={{
        background: '#F8FAFC',
        minHeight: '100vh',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          padding: '140px 20px 80px',
          textAlign: 'center',
          background:
            'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: '#DBEAFE',
            color: '#38bed5',
            padding: '8px 18px',
            borderRadius: '999px',
            fontWeight: '600',
            marginBottom: '20px',
          }}
        >
          Contact Our Team
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem,6vw,4rem)',
            color: '#0F172A',
            marginBottom: '20px',
          }}
        >
          Get In Touch
        </h1>

        <p
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            color: '#64748B',
            lineHeight: '1.8',
            fontSize: '1.1rem',
          }}
        >
          Schedule a consultation, ask questions,
          or learn more about our treatment programs.
        </p>
      </section>

      {/* Contact Cards */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '-40px auto 0',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              icon: <FaPhone />,
              title: 'Call Us',
              text: '+91 88845 88835',
            },
            {
              icon: <FaEnvelope />,
              title: 'Email',
              text: 'info@cancerherbalist.com',
            },
            {
              icon: <FaMapMarkerAlt />,
              title: 'Location',
              text: 'Banglore, India',
            },
            {
              icon: <FaClock />,
              title: 'Working Hours',
              text: 'Mon - Sat | 9 AM - 6 PM',
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#DBEAFE',
                  color: '#38bed5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '24px',
                }}
              >
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p
                style={{
                  color: '#64748B',
                  marginTop: '10px',
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '60px auto',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(400px,1fr))',
            gap: '40px',
          }}
        >
          {/* Form */}
          <div
            style={{
              background: '#fff',
              padding: '40px',
              borderRadius: '24px',
              boxShadow:
                '0 10px 30px rgba(0,0,0,0.08)',
            }}
          >
            <h2
              style={{
                marginBottom: '25px',
                color: '#0F172A',
              }}
            >
              Book Consultation
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />

              <select
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">
                  Select Treatment
                </option>
                <option>Cancer Consultation</option>
                <option>Herbal Therapy</option>
                <option>Nutrition Guidance</option>
                <option>Follow-up Appointment</option>
              </select>

              <textarea
                rows="5"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                }}
              />

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#38bed5',
                  color: '#fff',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* WhatsApp */}
          <div
            style={{
              background:
                'linear-gradient(135deg,#38bed5,#3B82F6)',
              color: '#fff',
              borderRadius: '24px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <FaWhatsapp
              style={{
                fontSize: '70px',
                marginBottom: '20px',
              }}
            />

            <h2>Quick WhatsApp Consultation</h2>

            <p
              style={{
                marginTop: '15px',
                lineHeight: '1.8',
              }}
            >
              Connect directly with our team for
              immediate assistance and appointment
              scheduling.
            </p>

            <a
              href="https://wa.me/918884588835"
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: '30px',
                background: '#fff',
                color: '#38bed5',
                padding: '14px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                width: 'fit-content',
              }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto 80px',
          padding: '0 20px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '25px',
          }}
        >
          Find Our Location
        </h2>

        <div
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow:
              '0 10px 30px rgba(0,0,0,0.08)',
          }}
        >
          <iframe
            title="Google Map"
            src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '18px',
  border: '1px solid #CBD5E1',
  borderRadius: '12px',
  fontSize: '15px',
  outline: 'none',
};