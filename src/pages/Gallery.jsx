import { GallerySection } from '../components/sections/GallerySection';
import { motion } from 'framer-motion';

export function Gallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 md:pt-36 lg:pt-44 bg-white"
    >
      <GallerySection />
    </motion.div>
  );
}
