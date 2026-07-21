import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedMenu } from '../components/sections/FeaturedMenu';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import aboutImage from  '../assets/aboutImage.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      {/* Home About Preview */}
      <section className="py-16 md:py-20 bg-secondary/40 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <span className="text-navy uppercase tracking-[0.2em] text-sm font-bold block mb-4">THE SORA EXPERIENCE</span>
              <h2 className="text-4xl font-serif font-bold text-navy-dark mb-6">A Taste of Japan in Minutes</h2>
              <p className="text-navy-dark/70 text-lg mb-8 leading-relaxed">
                Experience authentic, high-quality <strong>Japanese cuisine</strong> designed for the modern, fast-paced lifestyle. We deliver fast service, affordable pricing, and consistent quality engineered for high turnover. From our vibrant open kitchens to our meticulously crafted bowls, we bring the streets of Japan to you.
              </p>
              <Link to="/about" className="inline-block px-8 py-3 bg-navy-dark text-white text-sm font-bold tracking-wider rounded-md hover:bg-navy transition-colors">
                READ OUR STORY
              </Link>
            </div>
          <div className="md:w-1/2 relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-navy/10">
  <img src={aboutImage} alt="Sora Eats Ambiance" className="w-full h-full object-cover" />
</div>
          </div>
        </div>
      </section>

      <FeaturedMenu />

      <TestimonialsSection />
    </motion.div>
  );
}
