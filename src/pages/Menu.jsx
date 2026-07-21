import { FeaturedMenu } from '../components/sections/FeaturedMenu';
import { motion } from 'framer-motion';

export function Menu() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 md:pt-36 lg:pt-44 bg-white"
    >
      <div className="bg-navy-dark text-white py-12 md:py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider mb-4">OUR MENU</h1>
        <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base font-light px-6 leading-relaxed">
          Explore our full selection of authentic Japanese dishes crafted to perfection.
        </p>
      </div>
      <FeaturedMenu isFullMenu={true} />
    </motion.div>
  );
}
