import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: "James Wilson",
    role: "Food Critic",
    initial: "J",
    text: "Sora Eats delivers an authentic experience that rivals some of the best spots in Japan. The attention to detail in their broth is outstanding."
  },
  {
    name: "Sarah Chen",
    role: "Local Guide",
    initial: "S",
    text: "The omakase set is a masterclass in balance and flavor. Every piece of nigiri is crafted with such precision. Highly recommended!"
  },
  {
    name: "Michael Park",
    role: "Regular Customer",
    initial: "M",
    text: "Finally, a place that doesn't compromise on quality while maintaining a fast-casual vibe. The Wagyu donburi is my weekly indulgence."
  },
  {
    name: "Elena Rodriguez",
    role: "Chef",
    initial: "E",
    text: "You can taste the dedication in the ingredients. The A5 Wagyu melts in your mouth and the rice is seasoned to absolute perfection."
  },
  {
    name: "David Kim",
    role: "Travel Writer",
    initial: "D",
    text: "Every course arrives like it was plated for a much finer bill. The sea bream course alone justified the trip across town."
  }
];

function Ticket({ t }) {
  return (
    <div className="relative w-[340px] md:w-[380px] shrink-0 bg-card border border-border rounded-[20px] shadow-[0_16px_40px_-18px_rgba(10,36,88,0.25)] pt-7 pb-8 px-7">
      {/* Perforation notches */}
      <span className="absolute -left-[10px] top-[76px] w-5 h-5 rounded-full bg-cream border border-border" />
      <span className="absolute -right-[10px] top-[76px] w-5 h-5 rounded-full bg-cream border border-border" />
      <div className="absolute left-6 right-6 top-[76px] border-t border-dashed border-navy/25" />

      {/* Stub: seal + name */}
      <div className="flex items-center gap-3 pb-6">
        <div className="w-11 h-11 rounded-full bg-navy text-cream flex items-center justify-center font-serif text-lg font-semibold shrink-0">
          {t.initial}
        </div>
        <div className="min-w-0">
          <h4 className="text-navy-dark font-serif text-base font-semibold truncate">{t.name}</h4>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">{t.role}</p>
        </div>
        <div className="ml-auto flex gap-0.5 text-navy shrink-0">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={12} className="fill-current" />
          ))}
        </div>
      </div>

      {/* Quote body */}
      <p className="pt-6 font-serif text-[1.35rem] leading-snug text-navy-dark">
        <span className="float-left text-5xl font-bold leading-[0.75] pr-2 pt-1 text-navy">
          {t.text.charAt(0)}
        </span>
        {t.text.slice(1)}
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-secondary/40 overflow-hidden">
      <div className="seigaiha absolute inset-0 opacity-[0.15]" />

      <div className="relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="kicker-line text-navy/60 uppercase tracking-[0.25em] text-xs font-semibold">
              Guest Book
            </span>
            <h2 className="mt-5 text-4xl md:text-5xl font-serif font-bold text-navy-dark leading-tight">
              Notes Left at Our Table
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground font-light">
              A running ledger of what guests have said after their visit &mdash; unedited, one seat at a time.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView="auto"
            spaceBetween={28}
            loop
            freeMode={{ enabled: true, momentum: false }}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            allowTouchMove={true}
            className="!px-6 md:!px-12 !overflow-visible"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx} className="!w-auto">
                <Ticket t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}