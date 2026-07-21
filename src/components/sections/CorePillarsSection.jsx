import { motion } from 'framer-motion';
import { GiBowlOfRice, GiNoodles } from 'react-icons/gi';
import { MdOutlineGrass } from 'react-icons/md';

const pillars = [
  {
    title: 'Craft Broths',
    desc: <>Simmered for over 12 hours using traditional recipes to achieve rich, deep, and heartwarming flavors in every bowl.</>,
    icon: GiNoodles,
  },
  {
    title: 'Artisanal Rice & Noodles',
    desc: 'Freshly prepared daily using premium grade grains and authentic techniques for the perfect texture and taste.',
    icon: GiBowlOfRice,
  },
  {
    title: 'Farm Fresh Ingredients',
    desc: 'Sourced directly from trusted local producers and Japanese culinary suppliers to guarantee peak freshness.',
    icon: MdOutlineGrass,
  }
];

export function CorePillarsSection() {
  return (
    <section className="py-8 md:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <span className="text-navy text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            The Sora Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-dark">
            Why Choose Sora
          </h2>
        </div>
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
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy-dark mb-4">{pillar.title}</h3>
              <p className="text-navy-dark/70 text-base md:text-lg font-light leading-relaxed max-w-sm">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

