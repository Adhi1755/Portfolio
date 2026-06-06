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
      {/* Moving blue gradient at the bottom */}
      <div className="moving-gradient pointer-events-none absolute bottom-0 left-0 w-full h-[280px] sm:h-[340px] lg:h-[400px] z-[0] opacity-50 dark:opacity-40 rotate-180" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        {/* Section heading */}
        <div ref={headingRef} className="mb-16 sm:mb-20 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">
            Let&apos;s Connect
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-light text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            Feel free to reach out for collaborations, questions, or just a friendly chat!
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

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
          <div ref={contentRef} className="flex flex-col gap-6">
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

      {/* Footer — inside the same gradient container */}
      <footer className="relative z-10 border-t border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p className="text-sm text-black dark:text-white">
                © 2026 Adithya. All rights reserved.
              </p>
              <span className="hidden sm:inline text-black/50 dark:text-white/50">•</span>
              <p className="text-xs text-black/70 dark:text-white/70">
                Designed & Built by Adithya
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/Adhi1755" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="group p-2 rounded-full backdrop-blur-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 hover:bg-black/10 dark:hover:bg-white/10">
                <svg className="w-5 h-5 text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/adithyanagamuneendran/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="group p-2 rounded-full backdrop-blur-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 hover:bg-black/10 dark:hover:bg-white/10">
                <svg className="w-5 h-5 text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=adithya1755@gmail.com" aria-label="Email"
                className="group p-2 rounded-full backdrop-blur-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 hover:bg-black/10 dark:hover:bg-white/10">
                <svg className="w-5 h-5 text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactComponent;