import { FiInstagram, FiFacebook, FiPhone, FiGlobe, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const foodCategories = [
  { label: 'Starters', id: 'starters' },
  { label: 'Rice Bowls', id: 'rice_bowls' },
  { label: 'Ramen', id: 'ramen' },
  { label: 'Sushi', id: 'sushi' },
  { label: 'Beverages', id: 'beverages' }
];

export function Footer() {
  return <footer className="bg-navy-dark text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Wave Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'><g fill='none' stroke='%23ffffff' stroke-width='1'><circle cx='0' cy='40' r='20'/><circle cx='40' cy='40' r='20'/><circle cx='80' cy='40' r='20'/><circle cx='20' cy='40' r='10'/><circle cx='60' cy='40' r='10'/><circle cx='0' cy='40' r='30'/><circle cx='40' cy='40' r='30'/><circle cx='80' cy='40' r='30'/></g></svg>")`,
      backgroundSize: '80px 40px'
    }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 mb-16">
          <div className="lg:col-span-2">
           <div className="flex flex-col items-start justify-center text-white mb-6">
  <img 
    src="/Soralogowhite.png" 
    alt="Sora Eats" 
    className="w-24 h-24 object-contain mb-2" 
  />
</div>
            <p className="text-white/70 max-w-sm mb-8 font-light leading-relaxed">
              Authentic <strong>Japanese Cuisine</strong>. Crafted to Perfection. Experience the taste of Japan in every bite.
            </p>
            <div className="flex gap-4">
              {[FiInstagram, FaXTwitter, FiFacebook].map((Icon, idx) => <motion.a key={idx} href="#" whileHover={{
              scale: 1.1,
              y: -2
            }} whileTap={{
              scale: 0.95
            }} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon size={18} />
                </motion.a>)}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Our Story', path: '/about' },
                { name: 'Menu', path: '/menu' },
                { name: 'Reservations', path: '/contact' },
                { name: 'Contact', path: '/contact' }
              ].map(link => <li key={link.name}>
                  <Link to={link.path} className="text-white/70 hover:text-white transition-colors relative group inline-block">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Visit Us</h3>
            <p className="text-white/70 mb-4 font-light text-sm">
              Phoenix Mall of Asia,<br />
              Bengaluru
            </p>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919620994949" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-light">
                  <FiPhone size={14} className="shrink-0" />
                  <span>+91 96209 94949, 9986985752</span>
                </a>
              </li>
              <li>
                {/* <a href="https://www.soraeats.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-light">
                  <FiGlobe size={14} className="shrink-0" />
                  <span>www.soraeats.in</span>
                </a> */}
              </li>
              <li>
                <a href="mailto:contact@soraeats.in" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-light">
                  <FiMail size={14} className="shrink-0" />
                  <span>contact@soraeats.in</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Food Categories</h3>
            <ul className="space-y-4">
              {foodCategories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/menu?category=${cat.id}`} className="text-white/70 hover:text-white transition-colors relative group inline-block">
                    {cat.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Newsletter</h3>
            <p className="text-white/70 mb-4 font-light text-sm">
              Subscribe to get special offers and seasonal menu updates.
            </p>
            <form className="flex flex-col gap-3">
              <input type="email" placeholder="Your email address" className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-colors" />
              <button type="button" className="bg-white text-navy-dark font-medium rounded-full px-6 py-3 text-sm hover:bg-white/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50 font-light">
          <p>&copy; {new Date().getFullYear()} Sora Eats. All rights reserved.</p>
          <p>Designed by <a href="https://metromindz.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors font-medium">Metromindz</a></p>
        </div>
      </div>
    </footer>;
}