import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiCheckCircle, FiX } from 'react-icons/fi';

export function FeedbackModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleClose = () => {
    setStatus('idle');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden"
          >
            {/* Decorative Header */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-cream/30 opacity-10 pointer-events-none z-0" style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'><g fill='none' stroke='%23123E8A' stroke-width='2'><circle cx='0' cy='40' r='20'/><circle cx='40' cy='40' r='20'/><circle cx='80' cy='40' r='20'/><circle cx='20' cy='40' r='10'/><circle cx='60' cy='40' r='10'/><circle cx='0' cy='40' r='30'/><circle cx='40' cy='40' r='30'/><circle cx='80' cy='40' r='30'/></g></svg>")`,
              backgroundSize: '80px 40px'
            }} />

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-6 right-6 z-30 w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy-dark hover:bg-softgray transition-colors shadow-sm cursor-pointer"
            >
              <FiX size={20} />
            </button>

            <div className="relative p-8 md:p-10 z-10">
              <div className="text-center mb-8 mt-4">
                <h2 className="text-3xl font-serif font-bold text-navy-dark mb-2">Leave a Comment</h2>
                <p className="text-navy-dark/70 text-sm font-light">
                  We value your opinion and would love to hear from you.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <FiCheckCircle className="text-5xl text-green-600 mb-4" />
                    <h3 className="text-xl font-serif font-bold text-navy-dark mb-2">Thank You!</h3>
                    <p className="text-navy-dark/70 font-light mb-6 text-sm">Your feedback helps us improve.</p>
                    <button onClick={handleClose} className="text-navy text-sm font-semibold hover:underline">
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="relative">
                      <input type="text" required id="modal-name" placeholder=" " className="peer w-full bg-transparent border-b border-navy-dark/20 px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors" />
                      <label htmlFor="modal-name" className="absolute left-0 top-4 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Your Name
                      </label>
                    </div>

                    <div className="relative">
                      <input type="email" id="modal-email" placeholder=" " className="peer w-full bg-transparent border-b border-navy-dark/20 px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors" />
                      <label htmlFor="modal-email" className="absolute left-0 top-4 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Email Address (Optional)
                      </label>
                    </div>

                    <div className="relative pt-2">
                      <textarea required id="modal-comment" rows="4" placeholder=" " className="peer w-full bg-transparent border-b border-navy-dark/20 px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors resize-none"></textarea>
                      <label htmlFor="modal-comment" className="absolute left-0 top-6 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                        Your Comments
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full mt-6 bg-navy text-white font-medium py-3 rounded-full hover:bg-navy-dark transition-all shadow-md shadow-navy/20 disabled:opacity-70 flex justify-center items-center gap-2 text-sm tracking-wide"
                    >
                      {status === 'submitting' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <FiMessageSquare size={16} />
                          Submit Feedback
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}