import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import donburiImg from "../../assets/Donburi (2).jpg";
import ramenImg from "../../assets/ramen (1).jpg";
import sushiImg from "../../assets/sushii (1).jpg";
import { Link } from 'react-router-dom';
import { useFeedback } from '../../context/FeedbackContext';
const dishes = [{
  id: 1,
  name: "Tonkotsu Ramen",
  headline: "Experience Authentic Japanese Flavors",
  description: "Rich pork bone broth, tender chashu, soft boiled egg, wood ear mushrooms, and scallions with a kick of signature spice.",
  price: "₹360",
  // rating: "4.9",
  // reviews: "2.4k",
  category: "RAMEN",
  image: ramenImg,
  accentColor: "text-navy",
  elements: ["🍜", "🥢", "🌿", "🥚"]
}, {
  id: 2,
  name: "Premium Sushi Rolls",
  headline: "The Art of Perfection",
  description: "Expertly crafted sushi rolls featuring the freshest catch of the day, wrapped in perfectly seasoned rice and crisp nori.",
  price: "₹330",
  // rating: "5.0",
  // reviews: "1.8k",
  category: "SUSHI ROLLS",
  image: sushiImg,
  accentColor: "text-gold",
  elements: ["🍣", "🥢", "🌿", "🐟"]
}, {
  id: 3,
  name: "Signature Donburi Bowl",
  headline: "Melt-in-Your-Mouth Quality",
  description: "A comforting traditional Japanese rice bowl topped with premium ingredients, simmered to perfection in our savory house sauce.",
  price: "₹410",
  // rating: "4.8",
  // reviews: "950",
  category: "DONBURI BOWLS",
  image: donburiImg,
  accentColor: "text-navy-dark",
  elements: ["🥩", "🍚", "🥢", "🍳"]
}];
export function HeroSection() {
  const { openFeedback } = useFeedback();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef(null);
  const nextDish = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % dishes.length);
  };
  const prevDish = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + dishes.length) % dishes.length);
  };
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextDish();
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);
  const handleManualNav = action => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    action();
    autoPlayRef.current = setInterval(() => {
      nextDish();
    }, 5000);
  };
  const currentDish = dishes[currentIndex];
  const plateVariants = {
    initial: direction => ({
      rotate: direction > 0 ? 90 : -90,
      scale: 0.8,
      opacity: 0
    }),
    animate: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.2
      }
    },
    exit: direction => ({
      rotate: direction > 0 ? -90 : 90,
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.6
      }
    })
  };
  const textVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };
  return <section className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] pt-28 sm:pt-32 lg:pt-24 pb-6 md:pb-8 flex flex-col justify-center">
      {/* Decorative Wave Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'><g fill='none' stroke='%23123E8A' stroke-width='2'><circle cx='0' cy='40' r='20'/><circle cx='40' cy='40' r='20'/><circle cx='80' cy='40' r='20'/><circle cx='20' cy='40' r='10'/><circle cx='60' cy='40' r='10'/><circle cx='0' cy='40' r='30'/><circle cx='40' cy='40' r='30'/><circle cx='80' cy='40' r='30'/></g></svg>")`,
        backgroundSize: '80px 40px'
      }} />

      {/* Main Circle Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-white rounded-full shadow-[0_0_80px_rgba(18,62,138,0.05)] z-0 hidden lg:block" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[600px]">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            
            {/* Top Indicator removed per user request */}

            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial="initial" animate="animate" exit="exit" variants={textVariants}>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy-dark leading-[1.1] tracking-tight mb-4">
                  {currentDish.headline.split(' ').map((word, i) => <span key={i} className={word === 'Authentic' || word === 'Perfection' || word === 'Luxury' ? currentDish.accentColor : ''}>
                      {word}{' '}
                    </span>)}
                </h1>
                
                <h2 className="text-2xl font-bold tracking-wider uppercase mb-4 text-navy-dark/90 flex items-center gap-3">
                  {currentDish.name}
                  <span className="text-gold flex items-center gap-1 text-sm bg-gold/10 px-2 py-1 rounded-full">
                    <FiStar className="fill-current" /> {currentDish.rating}
                  </span>
                </h2>

                <p className="text-navy-dark/60 text-lg font-light leading-relaxed mb-8 max-w-lg">
                  {currentDish.description}
                </p>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={openFeedback} className="px-8 py-3.5 bg-navy text-white rounded-full font-bold tracking-wider text-sm hover:bg-navy-dark transition-colors shadow-lg shadow-navy/20 flex items-center justify-center">
                      Feedback
                    </button>
                    <Link to="/menu" className="px-8 py-3.5 bg-white border border-navy-dark/20 text-navy-dark rounded-full font-bold tracking-wider text-sm hover:bg-softgray transition-colors flex items-center justify-center">
                      Explore Menu
                    </Link>
                  </div>
                </div>

                {/* Thumbnail Previews inside Left Column */}
                <div className="flex gap-3 sm:gap-4 items-center justify-start pt-2">
                  {dishes.map((dish, idx) => (
                    <button 
                      key={dish.id} 
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }} 
                      className={`relative px-4 py-3 rounded-[16px] bg-white transition-all duration-300 flex flex-col items-center gap-2 min-w-[96px] ${idx === currentIndex ? 'shadow-[0_10px_30px_rgba(18,62,138,0.12)] border border-navy/10 scale-105' : 'shadow-sm border border-black/5 opacity-60 hover:opacity-100 scale-95'}`}
                    >
                      <img src={dish.image} alt={dish.name} className="w-14 h-14 lg:w-16 lg:h-16 rounded-full object-cover shadow-inner mix-blend-multiply" />
                      <span className="text-[10px] font-bold text-navy-dark uppercase tracking-wider whitespace-nowrap">{dish.category}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Image Container */}
          <div className="w-full lg:w-[55%] relative h-[360px] sm:h-[450px] lg:h-[700px] flex items-center justify-center">
            
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div key={currentIndex} custom={direction} variants={plateVariants} initial="initial" animate="animate" exit="exit" className="absolute w-[350px] sm:w-[450px] lg:w-full max-w-[500px] lg:max-w-[700px] aspect-square rounded-full border-[12px] sm:border-[16px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden z-10">
                <img src={currentDish.image} alt={currentDish.name} className="w-full h-full object-cover scale-110 mix-blend-multiply bg-white" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Elements (Parallax) */}
            <AnimatePresence mode="wait">
              {currentDish.elements.map((emoji, i) => <motion.div key={`${currentIndex}-${i}`} initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0
            }} animate={{
              opacity: 1,
              scale: 1,
              x: Math.sin(i * Math.PI / 2) * 140,
              y: Math.cos(i * Math.PI / 2) * 140
            }} exit={{
              opacity: 0,
              scale: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2 + i * 0.1,
              type: "spring"
            }} className="absolute z-20 text-3xl sm:text-4xl drop-shadow-xl" style={{
              left: '50%',
              top: '50%',
              marginLeft: '-20px',
              marginTop: '-20px'
            }}>
                  <motion.div animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0]
              }} transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
                    {emoji}
                  </motion.div>
                </motion.div>)}
            </AnimatePresence>
            
            {/* Navigation Arrows */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:-right-10 lg:translate-x-0 flex gap-4 z-30">
              <button onClick={() => handleManualNav(prevDish)} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors">
                <FiChevronLeft size={24} />
              </button>
              <button onClick={() => handleManualNav(nextDish)} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-navy text-white shadow-xl shadow-navy/30 flex items-center justify-center hover:bg-navy-dark transition-colors">
                <FiChevronRight size={24} />
              </button>
            </div>
            
          </div>

        </div>
      </div>
    </section>;
}