import { FiInstagram, FiFacebook, FiPhone, FiMail } from 'react-icons/fi';
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
  return (
    <footer className="bg-navy-dark text-white pt-8 md:pt-12 pb-8 overflow-hidden relative">
      {/* Decorative Wave Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'><g fill='none' stroke='%23ffffff' stroke-width='1'><circle cx='0' cy='40' r='20'/><circle cx='40' cy='40' r='20'/><circle cx='80' cy='40' r='20'/><circle cx='20' cy='40' r='10'/><circle cx='60' cy='40' r='10'/><circle cx='0' cy='40' r='30'/><circle cx='40' cy='40' r='30'/><circle cx='80' cy='40' r='30'/></g></svg>")`,
          backgroundSize: '80px 40px'
        }} 
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 lg:gap-14 mb-8 items-start">
          
          {/* 1. Logo & Intro Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:pr-4 lg:pr-8">
            <div className="flex flex-col items-center md:items-start text-white mb-4">
              <img 
                src="/Soralogowhite.png" 
                alt="Sora Eats" 
                className="w-28 h-auto object-contain mb-2" 
              />
            </div>
            <p className="text-white/80 max-w-xs md:max-w-[240px] lg:max-w-[280px] mb-6 font-light leading-relaxed text-base">
              Authentic <strong>Japanese Cuisine</strong>. Crafted to Perfection. Experience the taste of Japan in every bite.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiInstagram, href: '#' },
                { Icon: FaXTwitter, href: '#' },
                { Icon: FiFacebook, href: '#' }
              ].map(({ Icon, href }, idx) => (
                <motion.a 
                  key={idx} 
                  href={href} 
                  whileHover={{ scale: 1.1, y: -2 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2 & 3. Quick Links & Food Categories (1 Row in Mobile View) */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg md:text-xl font-serif font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3 text-base">
                {[
                  { name: 'Our Story', path: '/about' },
                  { name: 'Menu', path: '/menu' },
                  { name: 'Reservations', path: '/contact' },
                  { name: 'Contact', path: '/contact' }
                ].map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-white/80 hover:text-white transition-colors relative group inline-block font-light">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Food Categories */}
            <div>
              <h3 className="text-lg md:text-xl font-serif font-semibold mb-4 text-white">Food Categories</h3>
              <ul className="space-y-3 text-base">
                {foodCategories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/menu?category=${cat.id}`} className="text-white/80 hover:text-white transition-colors relative group inline-block font-light">
                      {cat.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Visit Us Column (Below & Centered on Mobile) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-2 md:mt-0">
            <h3 className="text-lg md:text-xl font-serif font-semibold mb-4 text-white">Visit Us</h3>
            <p className="text-white/80 font-light text-base mb-4 leading-relaxed">
              Phoenix Mall of Asia,<br />
              Bengaluru
            </p>
            <div className="flex flex-col items-center md:items-start gap-3 text-base">
              <a href="tel:+919620994949" className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors font-light">
                <FiPhone size={17} className="shrink-0 text-white/90" />
                <span>+91 96209 94949, 9986985752</span>
              </a>
              <a href="mailto:contact@soraeats.in" className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors font-light">
                <FiMail size={17} className="shrink-0 text-white/90" />
                <span>contact@soraeats.in</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base text-white/60 font-light text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Sora Eats. All rights reserved.</p>
          <p>Designed by <a href="https://metromindz.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors font-medium">Metromindz</a></p>
        </div>
      </div>
    </footer>
  );
}