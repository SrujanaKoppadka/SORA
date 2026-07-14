import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { GiNoodles, GiSushis, GiBowlOfRice, GiDumpling, GiMartini, GiCupcake } from 'react-icons/gi';
import { MdOutlineBento } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';
import { useLenis } from 'lenis/react';

import imgAgedashiTofu from '../../assets/c_agedashi-tofu.jpg';
import imgEbiMayo from '../../assets/c_ebi-mayo.jpg';
import imgJapaneeseGyoza from '../../assets/c_japaneese-gyoza.jpg';
import imgMisoSoup from '../../assets/c_miso-soup.jpg';
import imgShioKojiChickenKarage from '../../assets/c_shio-koji-chicken-karage.jpg';
import imgWokFriedEdamame from '../../assets/c_wok-fried-edamame.jpg';
import imgRamenPlaceholder from '../../assets/c_ramen_placeholder.jpg';
import imgSushiPlaceholder from '../../assets/c_sushi_placeholder.jpg';
import imgBeverage from '../../assets/c_beverage_placeholder.jpg';

import imgChahan from '../../assets/c_chahan.jpg';
import imgYakimeshi from '../../assets/c_yakimeshi.jpg';
import imgVegKatsuCurryDon from '../../assets/c_veg-katsu-curry-don.jpg';
import imgOyakodon from '../../assets/c_oyakodon.jpg';
import imgSalmonMazeGohan from '../../assets/c_salmon-maze-gohan.jpg';
import imgChickenKatsuCurryDon from '../../assets/c_chicken-katsu-curry-don.jpg';

import imgMisoRamen from '../../assets/c_miso-ramen.jpg';
import imgKoreanRamen from '../../assets/c_korean-ramen.jpg';
import imgTonkotsuRamen from '../../assets/c_tonkotsu-ramen.jpg';
import imgShoyuRamen from '../../assets/c_shoyu-ramen.jpg';

import imgSalmonAvocado from '../../assets/c_salmon-avocado.jpg';
import imgAsparagusTempura from '../../assets/c_asparagus-tempura.jpg';
import imgCrispyChicken from '../../assets/c_crispy-chicken.jpg';
import imgEbiTempura from '../../assets/c_ebi-tempura.jpg';
import imgVegCalifornia from '../../assets/c_veg-california.jpg';
import imgKimchiFutomaki from '../../assets/c_kimchi-futomaki.jpg';
import imgKaniKuri from '../../assets/c_kani-kuri.jpg';

import imgCoke from '../../assets/c_coke.jpg';
import imgCokeZero from '../../assets/c_coke-zero.jpg';
import imgDietCoke from '../../assets/c_diet-coke.jpg';


const categories = [
  { id: 'starters', label: 'STARTERS', icon: GiDumpling },
  { id: 'rice_bowls', label: 'RICE BOWLS', icon: GiBowlOfRice },
  { id: 'ramen', label: 'RAMEN', icon: GiNoodles },
  { id: 'sushi', label: 'SUSHI', icon: GiSushis },
  { id: 'beverages', label: 'BEVERAGES', icon: GiMartini }
];

const allMenuItems = [
  { category: 'starters', name: "Japanese Gyoza", price: "₹---", tag: "", image: imgJapaneeseGyoza, desc: "Pan-fried dumplings filled with minced chicken/prawn/vegetables served with gyoza sauce", isVeg: false },
  { category: 'starters', name: "Shio Koji Chicken Karage", price: "₹---", tag: "", image: imgShioKojiChickenKarage, desc: "Classic Japanese fried chicken marinated with shio koji (a fermented rice malt paste) and deep fried.", isVeg: false },
  { category: 'starters', name: "Miso Soup", price: "₹---", tag: "", image: imgMisoSoup, desc: "Traditional Japanese soup consisting of miso in a dashi stock.", isVeg: false },
  { category: 'starters', name: "Agedashi Tofu", price: "₹---", tag: "", image: imgAgedashiTofu, desc: "Agedashi tofu is a popular Japanese starter made with cubes of soft tofu crispy outside served in a thick umami-rich sauce", isVeg: true },
  { category: 'starters', name: "Ebi Mayo", price: "₹---", tag: "", image: imgEbiMayo, desc: "Crispy deep-fried shrimp tossed in a sweet, tangy, and creamy mayonnaise-based sauce", isVeg: false },
  { category: 'starters', name: "Wok Fried Edamame", price: "₹---", tag: "", image: imgWokFriedEdamame, desc: "Steamed edamame stir-fried in a delightful garlic and oyster sauce glaze", isVeg: true },
  { category: 'rice_bowls', name: "Chahan", price: "₹---", tag: "", image: imgChahan, desc: "Japanese fried rice dish prepared with rice as a primary ingredient and many optional additional ingredients and seasonings.", isVeg: false },
  { category: 'rice_bowls', name: "Yakimeshi", price: "₹---", tag: "", image: imgYakimeshi, desc: "Delicious Japanese-style fried rice is stir-fried vegetables and flavored with miso paste, giving it a deep umami flavor", isVeg: true },
  { category: 'rice_bowls', name: "Veg Katsu Curry Don", price: "₹---", tag: "", image: imgVegKatsuCurryDon, desc: "Crispy breaded vegetable cutlet served over a bowl of steamed sticky rice, served with Japanese curry sauce.", isVeg: true },
  { category: 'rice_bowls', name: "Oyakodon", price: "₹---", tag: "", image: imgOyakodon, desc: "Bowl of white rice that is topped with chicken, eggs, and chopped scallions.", isVeg: false },
  { category: 'rice_bowls', name: "Salmon Maze Gohan", price: "₹---", tag: "", image: imgSalmonMazeGohan, desc: "Salmon flakes, and umami-packed vegetables flavored with soy sauce and butter.", isVeg: false },
  { category: 'rice_bowls', name: "Chicken Katsu Curry Don", price: "₹---", tag: "", image: imgChickenKatsuCurryDon, desc: "Food featuring a crispy, panko-breaded chicken cutlet (katsu) served over steamed short-grain rice", isVeg: false },
  { category: 'ramen', name: "Miso Ramen", price: "₹---", tag: "", image: imgMisoRamen, desc: "A rich, savory broth flavored with fermented soybean paste", isVeg: false },
  { category: 'ramen', name: "Curry Ramen", price: "₹---", tag: "", image: imgRamenPlaceholder, desc: "Fusion dish combining traditional Japanese ramen noodles with rich, aromatic curry flavors", isVeg: false },
  { category: 'ramen', name: "Korean Ramen", price: "₹---", tag: "", image: imgKoreanRamen, desc: "Spicy and comforting ramen featuring a fiery broth, chewy noodles, and traditional Korean seasonings.", isVeg: false },
  { category: 'ramen', name: "Tonkotsu Ramen", price: "₹---", tag: "", image: imgTonkotsuRamen, desc: "A rich and creamy pork-bone broth simmered for hours, served with tender chashu pork and fresh noodles.", isVeg: false },
  { category: 'ramen', name: "Shoyu Ramen", price: "₹---", tag: "", image: imgShoyuRamen, desc: "Classic Tokyo-style ramen featuring a clear, soy sauce-based broth with a deep, savory umami flavor.", isVeg: false },
  { category: 'sushi', name: "Salmon Avocado", price: "₹---", tag: "", image: imgSalmonAvocado, desc: "Fresh, buttery salmon and creamy avocado rolled perfectly in seasoned sushi rice and seaweed.", isVeg: false },
  { category: 'sushi', name: "Asparagus Tempura", price: "₹---", tag: "", image: imgAsparagusTempura, desc: "Crispy battered asparagus spears rolled in sushi rice, offering a delightful crunch in every bite.", isVeg: true },
  { category: 'sushi', name: "Crispy Chicken", price: "₹---", tag: "", image: imgCrispyChicken, desc: "Tender fried chicken rolled with fresh vegetables and drizzled with a savory Japanese sauce.", isVeg: false },
  { category: 'sushi', name: "Ebi Tempura", price: "₹---", tag: "", image: imgEbiTempura, desc: "Golden, crispy tempura shrimp rolled with cucumber and avocado, topped with a sweet eel sauce.", isVeg: false },
  { category: 'sushi', name: "Veg California", price: "₹---", tag: "", image: imgVegCalifornia, desc: "A refreshing vegetarian take on the classic roll, filled with crisp cucumber, avocado, and carrots.", isVeg: true },
  { category: 'sushi', name: "Kimchi Futomaki", price: "₹---", tag: "", image: imgKimchiFutomaki, desc: "A thick sushi roll packed with spicy, tangy fermented kimchi and fresh vegetables.", isVeg: true },
  { category: 'sushi', name: "Kani Kuri", price: "₹---", tag: "", image: imgKaniKuri, desc: "Delicate crab stick meat paired with creamy avocado and cucumber in a traditional sushi roll.", isVeg: false },
  { category: 'beverages', name: "Coke", price: "₹---", tag: "", image: imgCoke, desc: "Classic, refreshing Coca-Cola served chilled over ice.", isVeg: true },
  { category: 'beverages', name: "Coke Zero", price: "₹---", tag: "", image: imgCokeZero, desc: "The great taste of Coca-Cola with zero sugar and zero calories.", isVeg: true },
  { category: 'beverages', name: "Diet Coke", price: "₹---", tag: "", image: imgDietCoke, desc: "Crisp and refreshing Diet Coke with a light, sparkling finish.", isVeg: true }
];

export function FeaturedMenu({ isFullMenu = false }) {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const validCategoryIds = categories.map(c => c.id);
  const initialTab = isFullMenu && categoryParam && validCategoryIds.includes(categoryParam)
    ? categoryParam
    : (isFullMenu ? 'all' : 'starters');

  const [activeTab, setActiveTab] = useState(initialTab);
  const lenis = useLenis();

  // Keep the active tab in sync if the category changes via URL (e.g. clicking
  // a different food-category link in the footer while already on /menu).
  useEffect(() => {
    if (!isFullMenu) return;
    if (categoryParam && validCategoryIds.includes(categoryParam)) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam, isFullMenu]);

  // Scroll the menu section into view when arriving with a category deep-link.
  useEffect(() => {
    if (!isFullMenu || !categoryParam) return;
    const timer = setTimeout(() => {
      const el = document.getElementById('menu');
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -100 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 650);
    return () => clearTimeout(timer);
  }, [categoryParam, isFullMenu, lenis]);

  // Filter items or fallback to all items if category has none (for demo purposes)
  const filteredItems = activeTab === 'all' ? allMenuItems : allMenuItems.filter(item => item.category === activeTab);
  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : allMenuItems.slice(0, 3);
  return <section id="menu" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Wave Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'><g fill='none' stroke='%23123E8A' stroke-width='2'><circle cx='0' cy='40' r='20'/><circle cx='40' cy='40' r='20'/><circle cx='80' cy='40' r='20'/><circle cx='20' cy='40' r='10'/><circle cx='60' cy='40' r='10'/><circle cx='0' cy='40' r='30'/><circle cx='40' cy='40' r='30'/><circle cx='80' cy='40' r='30'/></g></svg>")`,
        backgroundSize: '80px 40px'
      }} />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-navy uppercase tracking-[0.2em] text-sm font-bold mb-4 block">OUR MENU</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-dark mb-6">
            A Taste of Japan
          </h2>
          <p className="text-navy-dark/70 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Explore our carefully curated selection of authentic Japanese dishes. From comforting bowls of ramen to precisely crafted sushi, every item is prepared with fresh ingredients and an uncompromising dedication to traditional flavor profiles.
          </p>
          {/* Centered short underline */}
          <div className="w-16 h-0.5 bg-navy mx-auto mt-8 mb-12"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center items-end gap-6 md:gap-12 mb-16 overflow-x-auto pb-4 hide-scrollbar">
          {categories.map(cat => {
          const isActive = activeTab === cat.id;
          const Icon = cat.icon;
          return <button key={cat.id} onClick={() => setActiveTab(cat.id)} className="flex flex-col items-center gap-3 min-w-[80px] group transition-all">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-navy-dark text-white shadow-lg' : 'bg-transparent text-navy-dark/60 group-hover:text-navy-dark'}`}>
                  <Icon className={`text-3xl ${!isActive && 'opacity-80'}`} />
                </div>
                
                <span className={`text-xs font-bold tracking-widest uppercase transition-colors relative ${isActive ? 'text-navy-dark' : 'text-navy-dark/50 group-hover:text-navy-dark/80'}`}>
                  {cat.label}
                  
                  {/* Active Underline */}
                  {isActive && <motion.div layoutId="activeTabIndicator" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-navy" />}
                </span>
              </button>;
        })}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {itemsToDisplay.map((item, idx) => <motion.div key={item.name + activeTab} initial={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }} animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }} exit={{
            opacity: 0,
            scale: 0.95,
            y: -20
          }} transition={{
            duration: 0.4,
            delay: idx * 0.1
          }} className="group relative bg-white rounded-[24px] overflow-hidden border border-navy/5 shadow-sm hover:shadow-[0_20px_40px_rgba(18,62,138,0.08)] transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-softgray">
                  <motion.img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-navy-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Tags */}
                  {item.tag && <div className="absolute top-6 left-6 z-10">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md ${item.tag === 'Best Seller' ? 'bg-gold/90 text-navy-dark' : item.tag === 'Chef Choice' ? 'bg-navy/90 text-white' : 'bg-white/90 text-navy-dark'}`}>
                        {item.tag}
                      </span>
                    </div>}
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 shrink-0 border-2 flex items-center justify-center p-[2px] ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-navy-dark group-hover:text-navy transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-xl font-medium text-navy ml-4">{item.price}</span>
                  </div>
                  <p className="text-navy-dark/60 font-light text-sm mb-6 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>)}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-20 text-center">
          {!isFullMenu && (
            <Link to="/menu" className="inline-block px-10 py-4 rounded-full bg-navy-dark text-white font-medium shadow-xl shadow-navy-dark/20 hover:bg-navy transition-colors">
              View Full Menu
            </Link>
          )}
          {isFullMenu && activeTab !== 'all' && (
            <motion.button onClick={() => setActiveTab('all')} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="inline-block px-10 py-4 rounded-full bg-navy-dark text-white font-medium shadow-xl shadow-navy-dark/20 hover:bg-navy transition-colors">
              View All Items
            </motion.button>
          )}
        </div>
      </div>
    </section>;
}