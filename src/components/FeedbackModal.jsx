import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiCheckCircle, FiX, FiRefreshCw } from 'react-icons/fi';
import { fetchCustomerForm, submitFormData } from '../lib/supabase';

export function FeedbackModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  // CAPTCHA State
  const [captchaNum1, setCaptchaNum1] = useState(4);
  const [captchaNum2, setCaptchaNum2] = useState(2);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer('');
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      fetchCustomerForm('81bf6c28-173b-4c00-95c2-9caa9d467292').then((form) => {
        if (form) setFormConfig(form);
      });
    }
  }, [isOpen]);

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
          { field_key: 'email', field_label: 'Email Address', is_required: false, field_type: 'email' },
          { field_key: 'custom_your_comments_1784619358335', field_label: 'Your Comments', is_required: false, field_type: 'textarea' },
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
      const formId = formConfig?.id || '81bf6c28-173b-4c00-95c2-9caa9d467292';
      await submitFormData(formId, formData);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to submit feedback. Please try again.');
      setStatus('idle');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setFormData({});
    setFieldErrors({});
    setErrorMessage('');
    onClose();
  };

  const enabledFields = formConfig?.form_fields
    ? formConfig.form_fields.filter((f) => f.is_enabled).sort((a, b) => (a.field_order ?? 999) - (b.field_order ?? 999))
    : [];

  const isCaptchaEnabled = formConfig ? formConfig.captcha_enabled !== false : true;

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
              <div className="text-center mb-6 mt-4">
                <h2 className="text-3xl font-serif font-bold text-navy-dark mb-2">
                  {formConfig?.title || "Leave a Comment"}
                </h2>
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
                    <p className="text-navy-dark/70 font-light mb-6 text-sm">
                      {formConfig?.success_message || "Your feedback helps us improve."}
                    </p>
                    <button onClick={handleClose} className="text-navy text-sm font-semibold hover:underline">
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {errorMessage && (
                      <div className="text-red-600 text-xs font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">
                        {errorMessage}
                      </div>
                    )}

                    {enabledFields.length > 0 ? (
                      enabledFields.map((field) => {
                        const key = field.field_key;
                        const label = field.field_label;
                        const isRequired = field.is_required;
                        const fieldType = field.field_type;
                        const hasError = fieldErrors[key];

                        if (fieldType === 'textarea' || key.includes('comments') || key === 'message') {
                          return (
                            <div key={field.id} className="relative pt-2">
                              <textarea
                                id={`modal-${key}`}
                                rows="3"
                                placeholder=" "
                                value={formData[key] || ''}
                                onChange={(e) => handleChange(key, e.target.value)}
                                className={`peer w-full bg-transparent border-b ${hasError ? 'border-red-500' : 'border-navy-dark/20'} px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors resize-none`}
                              ></textarea>
                              <label htmlFor={`modal-${key}`} className="absolute left-0 top-6 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                                {label} {isRequired && <span className="text-red-500">*</span>}
                              </label>
                              {hasError && <p className="text-red-500 text-xs mt-1">{hasError}</p>}
                            </div>
                          );
                        }

                        return (
                          <div key={field.id} className="relative">
                            <input
                              type={fieldType === 'email' ? 'email' : 'text'}
                              id={`modal-${key}`}
                              placeholder=" "
                              value={formData[key] || ''}
                              onChange={(e) => handleChange(key, e.target.value)}
                              className={`peer w-full bg-transparent border-b ${hasError ? 'border-red-500' : 'border-navy-dark/20'} px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors`}
                            />
                            <label htmlFor={`modal-${key}`} className="absolute left-0 top-4 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                              {label} {isRequired && <span className="text-red-500">*</span>}
                            </label>
                            {hasError && <p className="text-red-500 text-xs mt-1">{hasError}</p>}
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="relative">
                          <input
                            type="text"
                            id="modal-name"
                            placeholder=" "
                            value={formData.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="peer w-full bg-transparent border-b border-navy-dark/20 px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors"
                          />
                          <label htmlFor="modal-name" className="absolute left-0 top-4 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                        </div>

                        <div className="relative">
                          <input
                            type="email"
                            id="modal-email"
                            placeholder=" "
                            value={formData.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="peer w-full bg-transparent border-b border-navy-dark/20 px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors"
                          />
                          <label htmlFor="modal-email" className="absolute left-0 top-4 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                            Email Address (Optional)
                          </label>
                          {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                        </div>

                        <div className="relative pt-2">
                          <textarea
                            id="modal-comment"
                            rows="3"
                            placeholder=" "
                            value={formData.comment || ''}
                            onChange={(e) => handleChange('comment', e.target.value)}
                            className="peer w-full bg-transparent border-b border-navy-dark/20 px-0 pt-4 pb-2 text-navy-dark text-sm focus:outline-none focus:border-navy transition-colors resize-none"
                          ></textarea>
                          <label htmlFor="modal-comment" className="absolute left-0 top-6 text-navy-dark/50 text-sm transition-all pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-navy peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                            Your Comments
                          </label>
                        </div>
                      </>
                    )}

                    {/* CAPTCHA Security Field */}
                    {isCaptchaEnabled && (
                      <div className="pt-2 border-t border-navy-dark/10">
                        <label className="block text-navy-dark/70 text-xs font-medium mb-1">
                          Security Check: What is {captchaNum1} + {captchaNum2}? <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            required
                            value={captchaAnswer}
                            onChange={(e) => setCaptchaAnswer(e.target.value)}
                            placeholder="Answer"
                            className="w-24 bg-cream/50 border border-navy-dark/20 rounded-lg px-2.5 py-1.5 text-navy-dark text-xs focus:outline-none focus:border-navy"
                          />
                          <button
                            type="button"
                            onClick={generateCaptcha}
                            className="p-1.5 text-navy-dark/50 hover:text-navy transition-colors"
                            title="Refresh Security Question"
                          >
                            <FiRefreshCw size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full mt-4 bg-navy text-white font-medium py-3 rounded-full hover:bg-navy-dark transition-all shadow-md shadow-navy/20 disabled:opacity-70 flex justify-center items-center gap-2 text-sm tracking-wide"
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
                          {formConfig?.submit_label || "Submit Feedback"}
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