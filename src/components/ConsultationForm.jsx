// // import React, { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { FaPhoneAlt, FaEnvelope, FaCalendarCheck, FaHeart, FaChevronRight, FaTimes } from 'react-icons/fa';

// // export default function ConsultationForm() {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     cancerType: '',
// //     stage: '',
// //     message: '',
// //   });

// //   const [submitted, setSubmitted] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Simulate API Submission
// //     setTimeout(() => {
// //       setSubmitted(true);
// //     }, 800);
// //   };

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <section
// //       id="consultation"
// //       className="section-padding"
// //       style={{
// //         background: 'linear-gradient(135deg, #EBF5F0 0%, #F4FAF7 100%)',
// //         color: 'var(--dark-2)',
// //         position: 'relative',
// //         overflow: 'hidden',
// //       }}
// //     >
// //       {/* Background decoration */}
// //       <div
// //         style={{
// //           position: 'absolute',
// //           top: '-10%',
// //           right: '-10%',
// //           width: '500px',
// //           height: '500px',
// //           borderRadius: '50%',
// //           background: 'radial-gradient(circle, rgba(46,125,50,0.06) 0%, transparent 60%)',
// //           pointerEvents: 'none',
// //         }}
// //       />

// //       <div className="container" style={{ position: 'relative', zIndex: 1 }}>
// //         <div
// //           style={{
// //             display: 'grid',
// //             gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
// //             gap: '60px',
// //             alignItems: 'center',
// //           }}
// //         >
// //           {/* Left Column: Value Proposition */}
// //           <div data-aos="fade-right">
// //             <span
// //               className="section-badge"
// //               style={{
// //                 background: 'var(--primary-light)',
// //                 border: '1px solid rgba(46,125,50,0.2)',
// //                 color: 'var(--primary-dark)',
// //               }}
// //             >
// //               <FaCalendarCheck /> Book Discovery Call
// //             </span>
// //             <h2 className="section-title" style={{ color: 'var(--dark-2)', marginBottom: '24px' }}>
// //               Schedule Your Free <span>Assessment</span>
// //             </h2>
// //             <p
// //               style={{
// //                 color: 'var(--gray-3)',
// //                 fontSize: '15px',
// //                 lineHeight: '1.8',
// //                 marginBottom: '32px',
// //               }}
// //             >
// //               Get answers to your critical treatment questions. Speak with our experts to review your reports and map out an integrative natural support protocol tailored to your case.
// //             </p>

// //             {/* Quick Benefits */}
// //             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
// //               {[
// //                 { title: '100% Confidential Discovery Call', desc: 'No-obligation discussion regarding medical history and symptoms.' },
// //                 { title: 'Comprehensive Report Review', desc: 'Detailed assessment of biopsy files, scans, and blood counts.' },
// //                 { title: 'Personalized Herbal Strategy', desc: 'Initial outline of recommended botanical compounds.' },
// //               ].map((benefit, i) => (
// //                 <div key={i} style={{ display: 'flex', gap: '16px' }}>
// //                   <div
// //                     style={{
// //                       width: '24px',
// //                       height: '24px',
// //                       borderRadius: '50%',
// //                       background: 'var(--primary-light)',
// //                       color: 'var(--primary)',
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       justifyContent: 'center',
// //                       fontSize: '12px',
// //                       flexShrink: 0,
// //                       marginTop: '4px',
// //                     }}
// //                   >
// //                     <FaHeart />
// //                   </div>
// //                   <div>
// //                     <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '4px' }}>
// //                       {benefit.title}
// //                     </h4>
// //                     <p style={{ fontSize: '13px', color: 'var(--gray-3)', lineHeight: '1.5' }}>
// //                       {benefit.desc}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Right Column: Form Card */}
// //           <div data-aos="fade-left">
// //             <div
// //               style={{
// //                 background: 'white',
// //                 borderRadius: '24px',
// //                 padding: 'var(--card-padding-lg, 40px)',
// //                 boxShadow: 'var(--shadow-lg)',
// //                 color: 'var(--dark-2)',
// //               }}
// //             >
// //               {!submitted ? (
// //                 <form onSubmit={handleSubmit}>
// //                   <div style={{ marginBottom: '24px' }}>
// //                     <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
// //                       Request Consultation
// //                     </h3>
// //                     <p style={{ fontSize: '13px', color: 'var(--gray-3)' }}>
// //                       Fill out the form below. Our response time is typically within 4 hours.
// //                     </p>
// //                   </div>

// //                   {/* Name */}
// //                   <div style={{ marginBottom: '16px' }}>
// //                     <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
// //                       Your Full Name
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="name"
// //                       required
// //                       placeholder="John Doe"
// //                       className="form-input"
// //                       value={formData.name}
// //                       onChange={handleChange}
// //                     />
// //                   </div>

// //                   {/* Contact row */}
// //                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
// //                     <div>
// //                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
// //                         Phone Number
// //                       </label>
// //                       <input
// //                         type="tel"
// //                         name="phone"
// //                         required
// //                         placeholder="+1 234 567 890"
// //                         className="form-input"
// //                         value={formData.phone}
// //                         onChange={handleChange}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
// //                         Email Address
// //                       </label>
// //                       <input
// //                         type="email"
// //                         name="email"
// //                         required
// //                         placeholder="john@example.com"
// //                         className="form-input"
// //                         value={formData.email}
// //                         onChange={handleChange}
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Cancer details row */}
// //                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
// //                     <div>
// //                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
// //                         Cancer Type
// //                       </label>
// //                       <select
// //                         name="cancerType"
// //                         required
// //                         className="form-select"
// //                         value={formData.cancerType}
// //                         onChange={handleChange}
// //                       >
// //                         <option value="">Select Cancer Type</option>
// //                         <option value="Breast">Breast Cancer</option>
// //                         <option value="Lung">Lung Cancer</option>
// //                         <option value="Colon">Colon Cancer</option>
// //                         <option value="Prostate">Prostate Cancer</option>
// //                         <option value="Liver">Liver Cancer</option>
// //                         <option value="Blood">Blood Cancer</option>
// //                         <option value="Other">Other Type</option>
// //                       </select>
// //                     </div>
// //                     <div>
// //                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
// //                         Current Stage
// //                       </label>
// //                       <select
// //                         name="stage"
// //                         required
// //                         className="form-select"
// //                         value={formData.stage}
// //                         onChange={handleChange}
// //                       >
// //                         <option value="">Select Stage</option>
// //                         <option value="Stage 1">Stage 1</option>
// //                         <option value="Stage 2">Stage 2</option>
// //                         <option value="Stage 3">Stage 3</option>
// //                         <option value="Stage 4">Stage 4 (Metastatic)</option>
// //                         <option value="Not Sure">Not Sure / Undiagnosed</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   {/* Message */}
// //                   <div style={{ marginBottom: '24px' }}>
// //                     <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
// //                       Additional Symptoms / Questions
// //                     </label>
// //                     <textarea
// //                       name="message"
// //                       rows="3"
// //                       placeholder="Briefly describe your symptoms or treatments received..."
// //                       className="form-textarea"
// //                       value={formData.message}
// //                       onChange={handleChange}
// //                     />
// //                   </div>

// //                   {/* Submit */}
// //                   <button type="submit" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
// //                     Book Discovery Call <FaChevronRight />
// //                   </button>
// //                 </form>
// //               ) : (
// //                 <motion.div
// //                   initial={{ opacity: 0, scale: 0.95 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   style={{ textAlign: 'center', padding: '40px 0' }}
// //                 >
// //                   <div
// //                     style={{
// //                       width: '72px',
// //                       height: '72px',
// //                       borderRadius: '50%',
// //                       background: 'rgba(0, 200, 83, 0.1)',
// //                       color: 'var(--primary)',
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       justifyContent: 'center',
// //                       fontSize: '32px',
// //                       margin: '0 auto 24px',
// //                     }}
// //                   >
// //                     ✓
// //                   </div>
// //                   <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '12px' }}>
// //                     Thank You, {formData.name}!
// //                   </h3>
// //                   <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.6', marginBottom: '24px' }}>
// //                     Your assessment request has been recorded. Our medical supervisor will contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> shortly.
// //                   </p>
// //                   <button
// //                     onClick={() => {
// //                       setSubmitted(false);
// //                       setFormData({ name: '', phone: '', email: '', cancerType: '', stage: '', message: '' });
// //                     }}
// //                     style={{
// //                       background: 'none',
// //                       border: 'none',
// //                       color: 'var(--primary-dark)',
// //                       fontWeight: '600',
// //                       cursor: 'pointer',
// //                       fontSize: '13px',
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: '4px',
// //                       margin: '0 auto',
// //                     }}
// //                   >
// //                     Submit Another Request
// //                   </button>
// //                 </motion.div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaPhoneAlt, FaEnvelope, FaCalendarCheck, FaHeart, FaChevronRight, FaTimes } from 'react-icons/fa';

// const ACCENT = '#38bed5';
// const ACCENT_LIGHT = '#38bed515';
// const ACCENT_MID = '#38bed533';

// export default function ConsultationForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     cancerType: '',
//     stage: '',
//     message: '',
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTimeout(() => {
//       setSubmitted(true);
//     }, 800);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <section
//       id="consultation"
//       className="section-padding"
//       style={{
//         background: `linear-gradient(135deg, ${ACCENT_LIGHT} 0%, #f4fcfd 100%)`,
//         color: 'var(--dark-2)',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Background decoration */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '-10%',
//           right: '-10%',
//           width: '500px',
//           height: '500px',
//           borderRadius: '50%',
//           background: `radial-gradient(circle, ${ACCENT_LIGHT} 0%, transparent 60%)`,
//           pointerEvents: 'none',
//         }}
//       />

//       <div className="container" style={{ position: 'relative', zIndex: 1 }}>
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//             gap: '60px',
//             alignItems: 'center',
//           }}
//         >
//           {/* Left Column: Value Proposition */}
//           <div data-aos="fade-right">
//             <span
//               className="section-badge"
//               style={{
//                 background: ACCENT_LIGHT,
//                 border: `1px solid ${ACCENT_MID}`,
//                 color: ACCENT,
//               }}
//             >
//               <FaCalendarCheck /> Book Discovery Call
//             </span>
//             <h2 className="section-title" style={{ color: 'var(--dark-2)', marginBottom: '24px' }}>
//               Schedule Your Free <span style={{ color: ACCENT }}>Assessment</span>
//             </h2>
//             <p
//               style={{
//                 color: 'var(--gray-3)',
//                 fontSize: '15px',
//                 lineHeight: '1.8',
//                 marginBottom: '32px',
//               }}
//             >
//               Get answers to your critical treatment questions. Speak with our experts to review
//               your reports and map out an integrative natural support protocol tailored to your case.
//             </p>

//             {/* Quick Benefits */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//               {[
//                 { title: '100% Confidential Discovery Call', desc: 'No-obligation discussion regarding medical history and symptoms.' },
//                 { title: 'Comprehensive Report Review', desc: 'Detailed assessment of biopsy files, scans, and blood counts.' },
//                 { title: 'Personalized Herbal Strategy', desc: 'Initial outline of recommended botanical compounds.' },
//               ].map((benefit, i) => (
//                 <div key={i} style={{ display: 'flex', gap: '16px' }}>
//                   <div
//                     style={{
//                       width: '24px',
//                       height: '24px',
//                       borderRadius: '50%',
//                       background: ACCENT_LIGHT,
//                       color: ACCENT,
//                       border: `1px solid ${ACCENT_MID}`,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '12px',
//                       flexShrink: 0,
//                       marginTop: '4px',
//                     }}
//                   >
//                     <FaHeart />
//                   </div>
//                   <div>
//                     <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '4px' }}>
//                       {benefit.title}
//                     </h4>
//                     <p style={{ fontSize: '13px', color: 'var(--gray-3)', lineHeight: '1.5' }}>
//                       {benefit.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Form Card */}
//           <div data-aos="fade-left">
//             <div
//               style={{
//                 background: 'white',
//                 borderRadius: '24px',
//                 padding: 'var(--card-padding-lg, 40px)',
//                 boxShadow: `0 20px 60px ${ACCENT_LIGHT}`,
//                 border: `1px solid ${ACCENT_MID}`,
//                 color: 'var(--dark-2)',
//               }}
//             >
//               {!submitted ? (
//                 <form onSubmit={handleSubmit}>
//                   <div style={{ marginBottom: '24px' }}>
//                     <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
//                       Request Consultation
//                     </h3>
//                     <p style={{ fontSize: '13px', color: 'var(--gray-3)' }}>
//                       Fill out the form below. Our response time is typically within 4 hours.
//                     </p>
//                   </div>

//                   {/* Name */}
//                   <div style={{ marginBottom: '16px' }}>
//                     <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
//                       Your Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       placeholder="John Doe"
//                       className="form-input"
//                       value={formData.name}
//                       onChange={handleChange}
//                       style={{ '--input-focus': ACCENT }}
//                     />
//                   </div>

//                   {/* Contact row */}
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
//                     <div>
//                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         required
//                         placeholder="+1 234 567 890"
//                         className="form-input"
//                         value={formData.phone}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div>
//                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         required
//                         placeholder="john@example.com"
//                         className="form-input"
//                         value={formData.email}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   {/* Cancer details row */}
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
//                     <div>
//                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
//                         Cancer Type
//                       </label>
//                       <select
//                         name="cancerType"
//                         required
//                         className="form-select"
//                         value={formData.cancerType}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Cancer Type</option>
//                         <option value="Breast">Breast Cancer</option>
//                         <option value="Lung">Lung Cancer</option>
//                         <option value="Colon">Colon Cancer</option>
//                         <option value="Prostate">Prostate Cancer</option>
//                         <option value="Liver">Liver Cancer</option>
//                         <option value="Blood">Blood Cancer</option>
//                         <option value="Other">Other Type</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
//                         Current Stage
//                       </label>
//                       <select
//                         name="stage"
//                         required
//                         className="form-select"
//                         value={formData.stage}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Stage</option>
//                         <option value="Stage 1">Stage 1</option>
//                         <option value="Stage 2">Stage 2</option>
//                         <option value="Stage 3">Stage 3</option>
//                         <option value="Stage 4">Stage 4 (Metastatic)</option>
//                         <option value="Not Sure">Not Sure / Undiagnosed</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Message */}
//                   <div style={{ marginBottom: '24px' }}>
//                     <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--dark-3)', marginBottom: '6px' }}>
//                       Additional Symptoms / Questions
//                     </label>
//                     <textarea
//                       name="message"
//                       rows="3"
//                       placeholder="Briefly describe your symptoms or treatments received..."
//                       className="form-textarea"
//                       value={formData.message}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     style={{
//                       width: '100%',
//                       justifyContent: 'center',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       background: ACCENT,
//                       color: 'white',
//                       padding: '14px 32px',
//                       borderRadius: '50px',
//                       fontWeight: '600',
//                       fontSize: '15px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       boxShadow: `0 8px 24px ${ACCENT_MID}`,
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     Book Discovery Call <FaChevronRight />
//                   </button>
//                 </form>
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   style={{ textAlign: 'center', padding: '40px 0' }}
//                 >
//                   <div
//                     style={{
//                       width: '72px',
//                       height: '72px',
//                       borderRadius: '50%',
//                       background: ACCENT_LIGHT,
//                       border: `2px solid ${ACCENT_MID}`,
//                       color: ACCENT,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '32px',
//                       margin: '0 auto 24px',
//                     }}
//                   >
//                     ✓
//                   </div>
//                   <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '12px' }}>
//                     Thank You, {formData.name}!
//                   </h3>
//                   <p style={{ fontSize: '14px', color: 'var(--gray-3)', lineHeight: '1.6', marginBottom: '24px' }}>
//                     Your assessment request has been recorded. Our medical supervisor will contact
//                     you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> shortly.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setSubmitted(false);
//                       setFormData({ name: '', phone: '', email: '', cancerType: '', stage: '', message: '' });
//                     }}
//                     style={{
//                       background: 'none',
//                       border: 'none',
//                       color: ACCENT,
//                       fontWeight: '600',
//                       cursor: 'pointer',
//                       fontSize: '13px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px',
//                       margin: '0 auto',
//                     }}
//                   >
//                     Submit Another Request
//                   </button>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }