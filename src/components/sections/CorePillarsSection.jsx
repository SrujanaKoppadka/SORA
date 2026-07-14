import { motion } from 'framer-motion';
import { GiNoodles, GiTargetArrows } from 'react-icons/gi';
import { MdOutlineBusinessCenter } from 'react-icons/md';

const pillars = [
  {
    title: 'Concept',
    desc: <>Launching SORA, a Japanese Quick Service Restaurant (QSR) offering authentic and affordable <strong>Japanese cuisine</strong> to capture the growing demand for international food.</>,
    icon: GiNoodles,
  },
  {
    title: 'Objective',
    desc: 'Serve high-quality Japanese dishes quickly, bridging the gap between premium culinary experiences and fast-paced mall dining.',
    icon: GiTargetArrows,
  },
  {
    title: 'Business Model',
    desc: 'Optimized for high volume through food court common seating, dedicated takeaway counters, rapid food delivery integration, and a focused ramen/rice bowl menu.',
    icon: MdOutlineBusinessCenter,
  }
];

export function CorePillarsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-navy/10">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center px-6 py-8 md:py-4 lg:py-8"
            >
              <div className="w-24 h-24 rounded-full bg-navy/5 flex items-center justify-center mb-8">
                <pillar.icon className="text-5xl text-navy" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-navy-dark mb-4">{pillar.title}</h3>
              <p className="text-navy-dark/70 text-lg font-light leading-relaxed max-w-sm">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
