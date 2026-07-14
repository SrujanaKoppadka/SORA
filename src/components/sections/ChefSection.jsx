// import { motion } from 'framer-motion';

// export function ChefSection() {
//   return (
//     <section className="py-24 md:py-32 bg-white relative overflow-hidden">
//       <div className="container mx-auto px-6 md:px-12 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

//           {/* Left: Chef Portrait */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 1, ease: 'easeOut' }}
//             className="relative"
//           >
//             <div className="relative h-[600px] w-full md:w-[85%] mx-auto lg:mx-0 rounded-t-full rounded-b-[24px] overflow-hidden border-[12px] border-cream shadow-2xl">
//               <img 
//                 src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2677&auto=format&fit=crop" 
//                 alt="Chef Kenji" 
//                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
//               />
//               <div className="absolute inset-0 bg-navy-dark/10" />
//             </div>

//             {/* Floating Elements */}
//             <motion.div
//               animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute -right-4 top-1/4 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-4xl"
//             >
//               🍣
//             </motion.div>
//             <motion.div
//               animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
//               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//               className="absolute -left-8 bottom-1/4 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center text-3xl"
//             >
//               🌿
//             </motion.div>
//           </motion.div>

//           {/* Right: Content & Timeline */}
//           <div className="flex flex-col">
//             <span className="text-navy uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">Meet the Master</span>
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-dark mb-6 leading-tight">
//               Chef Kenji Tanaka
//             </h2>
//             <p className="text-navy-dark/70 text-lg font-light leading-relaxed mb-8">
//               "Cooking is not just about combining ingredients; it is about bringing out the soul of each element."
//             </p>

//             {/* Animated Signature */}
//             <motion.div 
//               initial={{ opacity: 0, pathLength: 0 }}
//               whileInView={{ opacity: 1, pathLength: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 2, ease: "easeInOut" }}
//               className="mb-12 h-16 opacity-80"
//             >
//               {/* SVG Signature Placeholder */}
//               <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <motion.path 
//                   initial={{ pathLength: 0 }}
//                   whileInView={{ pathLength: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 2, ease: "easeInOut" }}
//                   d="M10 40C20 30 30 20 40 40C50 60 60 10 70 30C80 50 90 20 100 40C110 60 120 10 130 30C140 50 150 20 160 40C170 60 180 30 190 40" 
//                   stroke="#123E8A" 
//                   strokeWidth="2" 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </motion.div>

//             {/* Timeline */}
//             <div className="space-y-6">
//               {[
//                 { year: "2010", text: "Head Chef at Kyoto's acclaimed 'Sakura'." },
//                 { year: "2015", text: "Awarded first Michelin Star in Japan." },
//                 { year: "2020", text: "Founded Sora Eats to bring authentic flavors globally." }
//               ].map((item, idx) => (
//                 <motion.div 
//                   key={idx}
//                   initial={{ opacity: 0, x: 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0.5 + (idx * 0.2) }}
//                   className="flex gap-6 items-start"
//                 >
//                   <div className="flex flex-col items-center">
//                     <span className="text-gold font-serif font-bold text-lg">{item.year}</span>
//                     {idx !== 2 && <div className="w-[1px] h-8 bg-navy/20 mt-2" />}
//                   </div>
//                   <p className="text-navy-dark/70 font-light mt-1">{item.text}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }