import { ReservationSection } from '../components/sections/ReservationSection';
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-cream"
    >
      <ReservationSection />
    </motion.div>
  );
}
