import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackProvider, useFeedback } from './context/FeedbackContext';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { useLocation } from 'react-router-dom';

import { useLenis } from 'lenis/react';

import { ScrollToTopButton } from './components/ScrollToTopButton';

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Wait for the exit animation (0.5s) to finish before scrolling to top
    // so the new page starts at the top.
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
    
      }
    }, 550);
    
    return () => clearTimeout(timer);
  }, [pathname, lenis]);
  
  return null;
}

function Loader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-navy-dark flex flex-col items-center justify-center overflow-hidden"
    >
    <motion.img
  src="/Soralogowhite.png"
  alt="Sora Eats"
  initial={{ opacity: 0, scale: 0.7 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="w-40 h-40 md:w-56 md:h-56 object-contain mb-6"
/>

      {/* <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-white font-serif text-4xl md:text-6xl font-bold tracking-widest relative"
      >
        SORA EATS
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "circInOut", delay: 0.3 }}
          className="h-1 bg-gold absolute -bottom-4 left-0"
        />
      </motion.div> */}
    </motion.div>
  );
}
function AppContent() {
  const [loading, setLoading] = useState(true);
  const { isFeedbackOpen, closeFeedback } = useFeedback();

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <SmoothScroll>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-cream min-h-screen text-navy-dark font-sans selection:bg-navy selection:text-white"
          >
            <Navigation />
            <main>
              <ScrollToTop />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <ScrollToTopButton />
            <FeedbackModal isOpen={isFeedbackOpen} onClose={closeFeedback} />
          </motion.div>
        </SmoothScroll>
      )}
    </>
  );
}

export default function App() {
  return (
    <FeedbackProvider>
      <AppContent />
    </FeedbackProvider>
  );
}