import { motion } from 'framer-motion';
import { FiStar, FiClock, FiHeart, FiAward } from 'react-icons/fi';
const features = [{
  title: "Modern",
  desc: "Clean aesthetics suited for premium retail spaces, offering a visually stunning environment.",
  icon: FiStar
}, {
  title: "Authentic",
  desc: "Uncompromising on traditional flavor profiles to deliver a genuine Japanese culinary experience.",
  icon: FiAward
}, {
  title: "Youthful Appeal",
  desc: "Capturing the younger demographic with a vibrant atmosphere and contemporary dining concepts.",
  icon: FiHeart
}, {
  title: "Vibe",
  desc: "High social-media presence and an engaging experience that resonates with modern food enthusiasts.",
  icon: FiClock
}];
export function ExperienceSection() {
  return <section id="experience" className="py-24 md:py-32 bg-secondary/40 relative overflow-hidden">
      {/* Decorative Wave Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5" style={{
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'><g fill='none' stroke='%23123E8A' stroke-width='1'><circle cx='0' cy='40' r='20'/><circle cx='40' cy='40' r='20'/><circle cx='80' cy='40' r='20'/><circle cx='20' cy='40' r='10'/><circle cx='60' cy='40' r='10'/><circle cx='0' cy='40' r='30'/><circle cx='40' cy='40' r='30'/><circle cx='80' cy='40' r='30'/></g></svg>")`,
      backgroundSize: '80px 40px'
    }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-navy uppercase tracking-[0.2em] text-sm font-bold mb-4 block">Why Sora Eats</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-dark mb-6 leading-tight">
            The Sora Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => <motion.div key={idx} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.8,
          delay: idx * 0.15,
          ease: "easeOut"
        }} className="bg-white backdrop-blur-lg border border-navy/10 rounded-[24px] p-8 hover:shadow-[0_20px_40px_rgba(18,62,138,0.08)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mb-6 overflow-hidden">
                <motion.div initial={{
              rotate: -180,
              scale: 0
            }} whileInView={{
              rotate: 0,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: idx * 0.15 + 0.3
            }}>
                  <feature.icon className="text-navy-dark text-2xl group-hover:scale-110 transition-transform" />
                </motion.div>
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-dark mb-3">{feature.title}</h3>
              <p className="text-navy-dark/60 font-light text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}