import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiPhone, FiMail, FiMapPin, FiRefreshCw } from 'react-icons/fi';
import { fetchCustomerForm, submitFormData } from '../../lib/supabase';

export function ReservationSection() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  // CAPTCHA State
  const [captchaNum1, setCaptchaNum1] = useState(3);
  const [captchaNum2, setCaptchaNum2] = useState(5);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer('');
  };

  useEffect(() => {
    generateCaptcha();
    // Fetch Contact Us form for Customer 189
    fetchCustomerForm('f3f037e0-9823-40ec-b449-0f32aa80c8d2').then((form) => {
      if (form) {
        setFormConfig(form);
      }
    });
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const validateFields = (fieldsToValidate) => {
    const errors = {};
    for (const field of fieldsToValidate) {
      const val = (formData[field.field_key] || '').toString().trim();
      const label = field.field_label;

      if (field.is_required && !val) {
        errors[field.field_key] = `${label} is required.`;
        continue;
      }

      if (val) {
        if (field.field_type === 'email' || field.field_key === 'email') {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            errors[field.field_key] = 'Please enter a valid email address.';
          }
        } else if (field.field_type === 'tel' || field.field_key === 'phone') {
          if (!/^[0-9+\s-]{7,15}$/.test(val)) {
            errors[field.field_key] = 'Please enter a valid phone number.';
          }
        } else if (field.field_type === 'url') {
          if (!/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i.test(val)) {
            errors[field.field_key] = 'Please enter a valid URL.';
          }
        } else if (field.field_type === 'number') {
          if (isNaN(val)) {
            errors[field.field_key] = 'Please enter numeric values only.';
          }
        }
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    const enabledFieldsList = formConfig?.form_fields
      ? formConfig.form_fields.filter((f) => f.is_enabled)
      : [
          { field_key: 'name', field_label: 'Full Name', is_required: true, field_type: 'text' },
          { field_key: 'phone', field_label: 'Phone Number', is_required: true, field_type: 'tel' },
          { field_key: 'email', field_label: 'Email Address', is_required: false, field_type: 'email' },
          { field_key: 'message', field_label: 'Message', is_required: false, field_type: 'textarea' },
        ];

    // Field Validation
    const validationErrors = validateFields(enabledFieldsList);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    // CAPTCHA Validation if enabled
    const isCaptchaEnabled = formConfig ? formConfig.captcha_enabled !== false : true;
    if (isCaptchaEnabled) {
      if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
        setErrorMessage('Incorrect CAPTCHA answer. Please try again.');
        generateCaptcha();
        return;
      }
    }

    setStatus('submitting');

    try {
      const formId = formConfig?.id || 'f3f037e0-9823-40ec-b449-0f32aa80c8d2';
      await submitFormData(formId, formData);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to submit message. Please try again.');
      setStatus('idle');
    }
  };

  // Get enabled custom fields sorted by exact field_order
  const enabledFields = formConfig?.form_fields
    ? formConfig.form_fields.filter((f) => f.is_enabled).sort((a, b) => (a.field_order ?? 999) - (b.field_order ?? 999))
    : [];

  const isCaptchaEnabled = formConfig ? formConfig.captcha_enabled !== false : true;

  return (
    <section id="reservation" className="relative pt-6 pb-16 md:py-20 bg-cream overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-lightblue/30 rounded-l-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <span className="text-navy uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">Contact Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-dark mb-6 leading-tight">
              Get in Touch
            </h2>
            <p className="text-navy-dark/70 text-lg font-light leading-relaxed mb-8">
              Have a question or want to get in touch? Send us a message and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4 text-navy-dark/80 font-light">
              <p className="flex items-start gap-3">
                <FiMapPin size={18} className="shrink-0 mt-0.5 text-navy" />
                <span>Phoenix Mall of Asia, Bengaluru</span>
              </p>
              <a href="tel:+919620994949" className="flex items-center gap-3 hover:text-navy transition-colors">
                <FiPhone size={18} className="shrink-0 text-navy" />
                <span>+91 96209 94949, 9986985752</span>
              </a>
              <a href="mailto:contact@soraeats.in" className="flex items-center gap-3 hover:text-navy transition-colors">
                <FiMail size={18} className="shrink-0 text-navy" />
                <span>contact@soraeats.in</span>
              </a>
            </div>
          </div>

          {/* Right: Booking Form (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-[24px] shadow-[0_20px_60px_rgba(18,62,138,0.1)] border border-navy-dark/5 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[350px]"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <FiCheckCircle className="text-6xl text-navy mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-navy-dark mb-2">
                    {formConfig?.success_message || "Message Sent"}
                  </h3>
                  <p className="text-navy-dark/70 font-light mb-8">Thank you for reaching out to us. We will get back to you shortly.</p>
                  <button onClick={() => { setStatus('idle'); setFormData({}); setFieldErrors({}); generateCaptcha(); }} className="text-navy font-semibold hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* Exact Original UI Layout with Dynamic State Binding */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        placeholder=" "
                        value={formData.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`peer w-full bg-transparent border-b-2 ${fieldErrors.name ? 'border-red-500' : 'border-navy-dark/15'} px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors`}
                      />
                      <label htmlFor="name" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Full Name
                      </label>
                      {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        placeholder=" "
                        value={formData.phone || ''}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`peer w-full bg-transparent border-b-2 ${fieldErrors.phone ? 'border-red-500' : 'border-navy-dark/15'} px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors`}
                      />
                      <label htmlFor="phone" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Phone Number
                      </label>
                      {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        placeholder=" "
                        value={formData.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`peer w-full bg-transparent border-b-2 ${fieldErrors.email ? 'border-red-500' : 'border-navy-dark/15'} px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors`}
                      />
                      <label htmlFor="email" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Email Address
                      </label>
                      {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <div className="relative">
                      <textarea
                        id="message"
                        rows="4"
                        placeholder=" "
                        value={formData.message || ''}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="peer w-full bg-transparent border-b-2 border-navy-dark/15 px-0 pt-5 pb-2 text-navy-dark text-base focus:outline-none focus:border-navy transition-colors resize-none"
                      ></textarea>
                      <label htmlFor="message" className="absolute left-0 top-5 text-navy-dark/50 text-base transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Your Message
                      </label>
                    </div>
                  </div>

                  {/* Security CAPTCHA Field */}
                  {isCaptchaEnabled && (
                    <div className="pt-2 border-t border-navy-dark/10">
                      <label className="block text-navy-dark/70 text-xs font-medium mb-2">
                        Security Verification: What is {captchaNum1} + {captchaNum2}? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          required
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          placeholder="Answer"
                          className="w-28 bg-cream/50 border border-navy-dark/20 rounded-lg px-3 py-2 text-navy-dark text-sm focus:outline-none focus:border-navy"
                        />
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="p-2 text-navy-dark/50 hover:text-navy transition-colors"
                          title="Refresh Captcha"
                        >
                          <FiRefreshCw size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full mt-6 bg-navy-dark text-white font-medium py-4 rounded-[12px] hover:bg-navy transition-all shadow-lg shadow-navy/20 disabled:opacity-70 flex justify-center items-center"
                  >
                    {status === 'submitting' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      formConfig?.submit_label || "Send Message"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}