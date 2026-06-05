// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import About from './pages/About';
// import Services from './pages/Services';
// import TreatmentMethods from './pages/TreatmentMethods';
// import Doctors from './pages/Doctors';
// import Testimonials from './pages/Testimonials';


// import WhatsAppButton from './components/WhatsAppButton';
// import StickyMobileBar from './components/StickyMobileBar';
// import Footer from './components/Footer';


// function App() {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: 'ease-out-cubic',
//       once: true,
//       offset: 60,
//     });
//   }, []);

//   return (
//     <Router>
//       <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//         <Navbar />
//         <main style={{ flex: 1 }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/treatment-methods" element={<TreatmentMethods />} />
//             <Route path="/doctors" element={<Doctors />} />
//             <Route path="/testimonials" element={<Testimonials />} />
            
            
//           </Routes>
//         </main>
//         <Footer />
//         <WhatsAppButton />
//         <StickyMobileBar />
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Contact from './pages/Contact';
import ExpertProfiles from './components/ExpertProfiles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import TreatmentMethods from './pages/TreatmentMethods';
import Doctors from './pages/Doctors';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import WhatsAppButton from './components/WhatsAppButton';
import StickyMobileBar from './components/StickyMobileBar';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <Router>
      <div
        className="App"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/treatment-methods"
              element={<TreatmentMethods />}
            />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
        <StickyMobileBar />
      </div>
    </Router>
  );
}

export default App;