import { AboutSection } from '../components/sections/AboutSection';
import { CorePillarsSection } from '../components/sections/CorePillarsSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { motion } from 'framer-motion';

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 md:pt-36 lg:pt-44"
    >
      <AboutSection />
      <CorePillarsSection />
      <ExperienceSection />
    </motion.div>
  );
}
