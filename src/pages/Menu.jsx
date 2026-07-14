import { FeaturedMenu } from '../components/sections/FeaturedMenu';
import { motion } from 'framer-motion';

export function Menu() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-48"
    >
      <div className="bg-navy-dark text-white py-16 text-center">
        <h1 className="text-5xl font-serif font-bold tracking-wider mb-4">OUR MENU</h1>
        <p className="text-white/70 max-w-xl mx-auto">Explore our full selection of authentic Japanese dishes crafted to perfection.</p>
      </div>
      <FeaturedMenu isFullMenu={true} />
    </motion.div>
  );
}
