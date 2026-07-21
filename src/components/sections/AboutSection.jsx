import { motion } from 'framer-motion';
import aboutImage from '../../assets/About.jpg';
export function AboutSection() {
  return <section id="about" className="py-8 md:py-12 bg-white relative overflow-hidden">
      {/* Decorative Wave Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-[0.04] z-0" style={{
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'><g fill='none' stroke='%23123E8A' stroke-width='2'><circle cx='0' cy='40' r='20'/><circle cx='40' cy='40' r='20'/><circle cx='80' cy='40' r='20'/><circle cx='20' cy='40' r='10'/><circle cx='60' cy='40' r='10'/><circle cx='0' cy='40' r='30'/><circle cx='40' cy='40' r='30'/><circle cx='80' cy='40' r='30'/></g></svg>")`,
      backgroundSize: '80px 40px',
      maskImage: 'radial-gradient(circle at bottom left, black 0%, transparent 60%)',
      WebkitMaskImage: 'radial-gradient(circle at bottom left, black 0%, transparent 60%)'
    }} />

      {/* Decorative Bamboo (Simplified SVG abstract) - Right */}
      <div className="absolute top-0 right-0 h-full w-[300px] pointer-events-none opacity-[0.03] z-0 hidden lg:block" style={{
      backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 100 400' xmlns='http://www.w3.org/2000/svg'><path d='M40 0 Q45 50 42 100 Q40 150 45 200 Q48 250 44 300 Q42 350 46 400 L54 400 Q50 350 52 300 Q56 250 53 200 Q48 150 50 100 Q53 50 48 0 Z' fill='%23123E8A'/><path d='M42 100 Q70 80 80 120 Q60 110 42 105' fill='%23123E8A'/><path d='M45 200 Q20 170 10 210 Q30 215 45 205' fill='%23123E8A'/><path d='M44 300 Q75 280 90 330 Q65 315 44 305' fill='%23123E8A'/></svg>")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right center',
      backgroundSize: '100% 100%'
    }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Interior Image with Dot Grid */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }} className="relative">
            {/* Mobile-only header tag above image */}
            <div className="flex items-center gap-4 mb-4 lg:hidden">
              <span className="text-navy uppercase tracking-[0.2em] text-sm font-bold">ABOUT SORA EATS</span>
              <div className="w-12 h-[2px] bg-navy/30"></div>
            </div>

            {/* Dot Grid Pattern */}
            <div className="absolute top-6 lg:-top-6 -left-6 w-32 h-32 z-0 opacity-80" style={{
            backgroundImage: 'radial-gradient(circle, #123E8A 3px, transparent 3px)',
            backgroundSize: '20px 20px'
          }} />
           <div className="relative h-[400px] md:h-[500px] rounded-[24px] overflow-hidden z-10 shadow-2xl shadow-navy-dark/10">
  <div className="absolute inset-0 bg-navy-dark/5 hover:bg-transparent transition-colors duration-500 z-10" />
<img src={aboutImage} alt="Sora Eats Interior" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" /></div>
          </motion.div>

          {/* Right: Story Content */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }} className="flex flex-col justify-center max-w-lg">
            <div className="hidden lg:flex items-center gap-4 mb-6">
              <span className="text-navy uppercase tracking-[0.2em] text-sm font-bold">ABOUT SORA EATS</span>
              <div className="w-12 h-[2px] bg-navy/30"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-dark mb-6 leading-tight">
              A Taste of Japan in Minutes.
            </h2>
            
            <p className="text-navy-dark/70 text-base md:text-lg font-light leading-relaxed mb-6">
              Welcome to SORA, a Japanese Quick Service Restaurant (QSR) designed for the modern diner. We offer authentic and affordable <strong>Japanese cuisine</strong> to capture the growing demand for international food, perfectly bridging the gap between premium culinary experiences and fast-paced mall dining.
            </p>
            
            <p className="text-navy-dark/70 text-base md:text-lg font-light leading-relaxed mb-10">
              Our open kitchen acts as visual theater, where you can watch us prepare comforting ramen, precise sushi, and hearty donburi bowls. With warm wooden finishes contrasting deep indigo counters, and traditional Japanese lanterns paired with neon signage, we deliver a vibrant, youthful, and uncompromisingly authentic dining experience. Perfect for students, young IT professionals, families, and tourists seeking global cuisine experiences. Whether you are a Japanese culture enthusiast or a health-conscious eater, SORA is your destination.
            </p>

            <div>
              <a href="/menu" className="inline-block px-8 py-3.5 bg-navy-dark text-white text-sm font-bold tracking-wider rounded-md hover:bg-navy transition-colors shadow-lg shadow-navy-dark/10">
                VIEW OUR MENU
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>;
}