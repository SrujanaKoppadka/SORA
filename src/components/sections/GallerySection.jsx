import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
const imagesRow1 = ["https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1478144592103-25e218a04891?q=80&w=800&auto=format&fit=crop"];
const imagesRow2 = ["https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop"];
export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Duplicate arrays to create seamless loop (4 copies for ultra-wide screens)
  const scrollRow1 = [...imagesRow1, ...imagesRow1, ...imagesRow1, ...imagesRow1];
  const scrollRow2 = [...imagesRow2, ...imagesRow2, ...imagesRow2, ...imagesRow2];
  return <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      
      {/* Inline styles for infinite marquee animation */}
      <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: scrollLeft 40s linear infinite;
        }
        .animate-marquee-right {
          animation: scrollRight 40s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `
    }} />

      <div className="container mx-auto px-6 lg:px-12 mb-16 text-center">
        <span className="text-navy uppercase tracking-[0.2em] text-sm font-bold block mb-4">GALLERY</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-dark mb-6">
          A Glimpse Inside Sora
        </h2>
      </div>

      <div className="w-full flex flex-col gap-6">
        
        {/* Row 1 - Scrolling Left */}
        <div className="w-full overflow-hidden whitespace-nowrap flex relative">
          <div className="flex gap-6 animate-marquee-left w-max pr-6">
            {scrollRow1.map((src, index) => <div key={`r1-${index}`} className="w-[300px] h-[350px] md:w-[400px] md:h-[450px] shrink-0 rounded-2xl overflow-hidden cursor-pointer relative group" onClick={() => setSelectedImage(src)}>
                <img src={src} alt="Gallery Item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>)}
          </div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="w-full overflow-hidden whitespace-nowrap flex relative">
          <div className="flex gap-6 animate-marquee-right w-max pr-6">
            {scrollRow2.map((src, index) => <div key={`r2-${index}`} className="w-[300px] h-[350px] md:w-[400px] md:h-[450px] shrink-0 rounded-2xl overflow-hidden cursor-pointer relative group" onClick={() => setSelectedImage(src)}>
                <img src={src} alt="Gallery Item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>)}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/95 backdrop-blur-md p-4" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-8 right-8 text-white hover:text-white/70 transition-colors bg-white/10 p-3 rounded-full" onClick={() => setSelectedImage(null)}>
              <FiX size={24} />
            </button>
            <motion.img initial={{
          scale: 0.9,
          y: 20
        }} animate={{
          scale: 1,
          y: 0
        }} exit={{
          scale: 0.9,
          y: 20
        }} src={selectedImage} className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain" alt="Enlarged Gallery Item" />
          </motion.div>}
      </AnimatePresence>

    </section>;
}