'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Clock, Mail, Phone, Github, Linkedin, Instagram, CheckCircle, AlertCircle } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FieldName = 'name' | 'reason' | 'message';

const ContactComponent = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const successRef = useRef(null);

  const [formData, setFormData] = useState<Record<FieldName, string>>({ name: '', reason: '', message: '' });
  const [focusedFields, setFocusedFields] = useState<Record<FieldName, boolean>>({ name: false, reason: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, formRef.current, contentRef.current], { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.8,
        }
      });

      tl.to(headingRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
        .to(formRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(contentRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (submitStatus === 'success' && successRef.current) {
      gsap.fromTo(successRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [submitStatus]);

  const handleInputChange = (field: FieldName, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleFocus = (field: FieldName) => setFocusedFields(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: FieldName) => {
    if (!formData[field]) setFocusedFields(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitMessage('');

    if (!formData.name.trim() || !formData.reason.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.reason)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name.trim(), email: formData.reason.trim(), message: formData.message.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage("Your message has been sent! I'll get back to you soon.");
        setFormData({ name: '', reason: '', message: '' });
        setFocusedFields({ name: false, reason: false, message: false });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => { setSubmitStatus(null); setSubmitMessage(''); };

  return (
    <div
      id="contact"
      ref={containerRef}
      className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-24 w-[400px] h-[400px] rounded-full bg-rose-50 dark:bg-rose-950/15 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full bg-amber-50 dark:bg-amber-950/15 blur-[90px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">

        {/* Section heading */}
        <div ref={headingRef} className="mb-16 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Get In Touch
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">
            Let&apos;s Connect
          </h2>
          <p className="text-base sm:text-lg font-light text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            Feel free to reach out for collaborations, questions, or just a friendly chat!
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — contact form */}
          <div ref={formRef}>
            {/* Success state */}
            {submitStatus === 'success' && (
              <div
                ref={successRef}
                className="p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur mb-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-base font-medium text-black dark:text-white">Message Sent!</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{submitMessage}</p>
                <button onClick={resetForm} className="text-sm font-light text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors underline underline-offset-2">
                  Send another message
                </button>
              </div>
            )}

            {/* Error state */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 mb-6">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-400">{submitMessage}</p>
              </div>
            )}

            {submitStatus !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="relative pb-1">
                  <label
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedFields.name || formData.name
                        ? 'text-xs font-medium text-black dark:text-white -top-5'
                        : 'text-base text-gray-400 dark:text-gray-500 top-3'
                      }`}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-white outline-none py-3 text-base text-black dark:text-white transition-colors duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="relative pb-1">
                  <label
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedFields.reason || formData.reason
                        ? 'text-xs font-medium text-black dark:text-white -top-5'
                        : 'text-base text-gray-400 dark:text-gray-500 top-3'
                      }`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    onFocus={() => handleFocus('reason')}
                    onBlur={() => handleBlur('reason')}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-white outline-none py-3 text-base text-black dark:text-white transition-colors duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Message */}
                <div className="relative pb-1">
                  <label
                    htmlFor="message"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedFields.message || formData.message
                        ? 'text-xs font-medium text-black dark:text-white -top-5'
                        : 'text-base text-gray-400 dark:text-gray-500 top-3'
                      }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    disabled={isSubmitting}
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-white outline-none py-3 text-base text-black dark:text-white transition-colors duration-300 resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-normal text-sm tracking-wide hover:opacity-85 transition-all duration-200 shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right — info panel */}
          <div ref={contentRef} className="flex flex-col gap-8">
            {/* Info card */}
            <div className="p-7 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur space-y-6">
              <h3 className="text-lg font-medium text-black dark:text-white">Contact Details</h3>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
                  <Clock className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white mb-0.5">Response Time</p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">Typically within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
                  <Mail className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white mb-0.5">Email</p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 break-all">adithya1755@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
                  <Phone className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white mb-0.5">Phone</p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">+91 63741-39422</p>
                </div>
              </div>
            </div>

            {/* Social card */}
            <div className="p-7 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur">
              <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">Find me on</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/adithyanagamuneendran/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 flex-1 p-3 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
                  <span className="text-sm font-light text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Adhi1755"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 flex-1 p-3 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white transition-all duration-200"
                >
                  <Github className="w-5 h-5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
                  <span className="text-sm font-light text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors">GitHub</span>
                </a>
                <a
                  href="https://instagram.com/adithya._.77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 flex-1 p-3 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white transition-all duration-200"
                >
                  <Instagram className="w-5 h-5 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
                  <span className="text-sm font-light text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;