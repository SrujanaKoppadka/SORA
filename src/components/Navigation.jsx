import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiGlobe, FiMail } from 'react-icons/fi';
import { useFeedback } from '../context/FeedbackContext';
const navLinks = [{
  name: 'HOME',
  path: '/'
}, {
  name: 'ABOUT US',
  path: '/about'
}, {
  name: 'MENU',
  path: '/menu'
}, {
  name: 'GALLERY',
  path: '/gallery'
}, {
  name: 'CONTACT',
  path: '/contact'
}];
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openFeedback } = useFeedback();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <>
      <motion.nav initial={{
      y: -100
    }} animate={{
      y: 0
    }} transition={{
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden lg:block ${isScrolled ? 'bg-white shadow-[0_4px_30px_rgba(0,0,0,0.05)]' : 'bg-transparent'}`}>
        <AnimatePresence initial={false}>
          {!isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-navy-dark text-white overflow-hidden"
            >
              <div className="container mx-auto px-6 lg:px-12 py-2 flex justify-center items-center gap-8 text-xs font-medium tracking-wide">
                <a href="tel:+919620994949" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <FiPhone size={13} />
                  <span>+91 96209 94949, 9986985752</span>
                </a>
                <span className="w-px h-3 bg-white/20" />
                {/* <a href="https://www.soraeats.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <FiGlobe size={13} />
                  <span>www.soraeats.in</span>
                </a> */}
                <span className="w-px h-3 bg-white/20" />
                <a href="mailto:contact@soraeats.in" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <FiMail size={13} />
                  <span>contact@soraeats.in</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo Area (Left) */}
          <div className="flex-1 flex justify-start">
           <Link to="/" className="flex flex-col items-center justify-center text-navy-dark transition-transform hover:opacity-80">
  <img src="/Soralogo.png" alt="Sora Eats" className="w-20 h-20 lg:w-28 lg:h-28 object-contain" />
</Link>
          </div>

          {/* Nav Links (Center) */}
          <div className="flex-none flex items-center justify-center gap-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className="group relative text-sm font-bold tracking-wider text-navy-dark hover:text-navy transition-colors">
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-navy transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>)}
          </div>

          {/* CTA (Right) */}
          <div className="flex-1 flex justify-end">
            <button type="button" onClick={openFeedback} className="px-6 py-3 bg-navy-dark text-white text-sm font-bold tracking-wider hover:bg-navy transition-colors shadow-lg shadow-navy/10 rounded-md">
              FEEDBACK
            </button>
          </div>
        </div>
        </div>
      </motion.nav>

      {/* Mobile Top Navigation Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-md border-b border-navy/10 px-6 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/Soralogo.png" alt="Sora Eats" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-navy-dark p-2">
          {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-navy/10 p-6 flex flex-col gap-4">
            {navLinks.map(link => <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className={`text-lg font-bold tracking-wider text-center py-2 border-b border-softgray ${location.pathname === link.path ? 'text-navy' : 'text-navy-dark'}`}>
                {link.name}
              </Link>)}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openFeedback();
              }}
              className="mt-2 text-center px-6 py-3 bg-navy-dark text-white text-sm font-bold tracking-wider rounded-md"
            >
              FEEDBACK
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>;
}