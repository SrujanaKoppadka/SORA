import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
export function ReservationSection() {
  const [status, setStatus] = useState('idle');
  const handleSubmit = e => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };
  return <section id="reservation" className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-lightblue/30 rounded-l-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <span className="text-navy uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">Contact Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-dark mb-6 leading-tight">
              Get In Touch
            </h2>
            <p className="text-navy-dark/70 text-lg font-light leading-relaxed mb-8">
              Have a question or want to get in touch? Send us a message and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4 text-navy-dark/80 font-light">
              <p><strong>Location:</strong> Phoenix Mall of Asia, Bengaluru</p>
            </div>
          </div>

          {/* Right: Booking Form (Glassmorphism) */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="bg-white p-8 md:p-12 rounded-[24px] shadow-[0_20px_60px_rgba(18,62,138,0.1)] border border-navy-dark/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === 'success' ? <motion.div key="success" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="flex flex-col items-center justify-center text-center h-full min-h-[350px]">
                  <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: "spring",
                delay: 0.2
              }}>
                    <FiCheckCircle className="text-6xl text-navy mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-navy-dark mb-2">Message Sent</h3>
                  <p className="text-navy-dark/70 font-light mb-8">Thank you for reaching out to us. We will get back to you shortly.</p>
                  <button onClick={() => setStatus('idle')} className="text-navy font-semibold hover:underline">
                    Send another message
                  </button>
                </motion.div> : <motion.form key="form" exit={{
              opacity: 0,
              x: -20
            }} onSubmit={handleSubmit} className="space-y-7">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input type="text" required id="name" placeholder=" " className="peer w-full bg-transparent border-b-2 border-navy-dark/15 px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors" />
                      <label htmlFor="name" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Full Name
                      </label>
                    </div>
                    <div className="relative">
                      <input type="tel" required id="phone" placeholder=" " className="peer w-full bg-transparent border-b-2 border-navy-dark/15 px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors" />
                      <label htmlFor="phone" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Phone Number
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <div className="relative">
                      <input type="email" required id="email" placeholder=" " className="peer w-full bg-transparent border-b-2 border-navy-dark/15 px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors" />
                      <label htmlFor="email" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <div className="relative">
                      <textarea required id="message" rows="4" placeholder=" " className="peer w-full bg-transparent border-b-2 border-navy-dark/15 px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors resize-none"></textarea>
                      <label htmlFor="message" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Your Message
                      </label>
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'submitting'} className="w-full mt-8 bg-navy-dark text-white font-medium py-4 rounded-[12px] hover:bg-navy transition-all shadow-lg shadow-navy/20 disabled:opacity-70 flex justify-center items-center">
                    {status === 'submitting' ? <motion.div animate={{
                  rotate: 360
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : "Send Message"}
                  </button>
                </motion.form>}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>;
}