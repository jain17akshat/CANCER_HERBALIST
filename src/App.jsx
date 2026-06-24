import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import TreatmentMethods from './pages/TreatmentMethods';
import Doctors from './pages/Doctors';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import StoryDetail from './pages/StoryDetail';
import ServiceDetail from './pages/ServiceDetail';
import PatientEducation from './pages/PatientEducation';
import TCellsVsNKCells from './pages/TCellsVsNKCells';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import NotFound from './pages/NotFound';
import WhatsAppButton from './components/WhatsAppButton';
import StickyMobileBar from './components/StickyMobileBar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { WishlistProvider } from './context/WishlistContext';

/* Scroll to the top whenever the route path changes */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: 'mobile',
    });
  }, []);

  return (
    <WishlistProvider>
      <Router>
        <ScrollToTop />
        <div
          className="App"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            overflowX: 'hidden',
            position: 'relative',
          }}
        >
          <Navbar />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/treatment-methods" element={<TreatmentMethods />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/testimonials/:id" element={<StoryDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/patient-education" element={<PatientEducation />} />
              <Route path="/patient-education/tcells-vs-nk-cells" element={<TCellsVsNKCells />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton />
          <Chatbot />
          <StickyMobileBar />
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;