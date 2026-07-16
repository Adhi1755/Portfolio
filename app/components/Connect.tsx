'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FieldName = 'name' | 'email' | 'message';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Adhi1755',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adithyanagamuneendran/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/adithya._.77',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

const ContactComponent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<Record<FieldName, string>>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip reveal on touch devices

    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, leftRef.current, rightRef.current], {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.13,
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Heading lines slide up through their masks
      gsap.from('.contact-line', {
        yPercent: 110,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.12,
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus('success');
        setSubmitMessage("Message sent! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="relative bg-[#131110] overflow-hidden"
    >
      {/* ── Marquee opener ── */}
      <div className="border-b border-white/[0.08] overflow-hidden py-3 select-none">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1} className="flex items-center">
              {['Open to Opportunities', 'Software Engineering', 'Machine Learning', 'Data Science', 'Class of 2026', 'Bengaluru, India'].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center text-[10px] font-light uppercase tracking-[0.3em] text-gray-500"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-[8px] opacity-60">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 pb-16">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-16 sm:mb-20">
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-[10px] sm:text-[11px] font-light tracking-[0.3em] uppercase text-gray-500">
            </p>
            <p className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-light tracking-[0.3em] uppercase text-gray-500">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                style={{ animation: 'pulse 3s ease-in-out infinite' }}
              />
              Replies within 24 h
            </p>
          </div>
          <h2 className="text-[clamp(2.8rem,9vw,8.5rem)] font-semibold uppercase tracking-tight text-[#F2EFE9] leading-[0.98]">
            <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <span className="contact-line inline-block will-change-transform">Got a project?</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <span
                className="contact-line inline-block will-change-transform"
                style={{ WebkitTextStroke: '2px #F2EFE9', WebkitTextFillColor: 'transparent' }}
              >
                Let&apos;s talk.
              </span>
            </span>
          </h2>
        </div>

        {/* ── Body: big links + form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: the big links ── */}
          <div ref={leftRef}>
            <a
              href="mailto:adithya1755@gmail.com"
              className="group block border-y border-white/10 py-6 sm:py-8 px-3 -mx-3 transition-colors duration-300 hover:bg-[#F2EFE9]"
            >
              <span className="block text-[10px] font-light uppercase tracking-[0.3em] text-gray-500 mb-3">
                Email me
              </span>
              <span className="flex items-baseline justify-between gap-4 text-[clamp(1.3rem,2.6vw,2.5rem)] font-semibold tracking-tight text-[#F2EFE9] group-hover:text-black transition-colors duration-300 break-all">
                adithya1755@gmail.com
                <span className="shrink-0 text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </span>
            </a>

            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/10 py-5 px-3 -mx-3 transition-colors duration-300 hover:bg-[#F2EFE9]"
              >
                <span className="flex items-center gap-3 text-sm sm:text-base font-medium uppercase tracking-[0.15em] text-gray-400 group-hover:text-black transition-colors duration-300">
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                  {s.label}
                </span>
                <span className="text-gray-600 group-hover:text-black transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            ))}

            <p className="mt-8 text-[10px] font-light uppercase tracking-[0.3em] text-gray-500">
              Based in Bengaluru
            </p>
          </div>

          {/* ── Right: the form ── */}
          <div ref={rightRef}>
            <p className="mb-8 text-[10px] font-light uppercase tracking-[0.3em] text-gray-500">
              Or send a note
            </p>
            {submitStatus === 'success' ? (
              <div className="py-16 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl font-semibold text-[#F2EFE9] tracking-tight">Message sent.</p>
                <p className="text-sm font-light text-gray-400">{submitMessage}</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 self-start text-sm font-light text-gray-500 hover:text-[#F2EFE9] transition-colors underline underline-offset-4"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* error banner */}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-red-50 border border-red-200 text-sm text-red-600">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      <path strokeLinecap="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                    </svg>
                    {submitMessage}
                  </div>
                )}

                {/* Name + Email side by side on md+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <Field
                    id="name"
                    label="Your name"
                    type="text"
                    value={formData.name}
                    disabled={isSubmitting}
                    onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                  />
                  <Field
                    id="email"
                    label="Email address"
                    type="email"
                    value={formData.email}
                    disabled={isSubmitting}
                    onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                  />
                </div>

                <Field
                  id="message"
                  label="What's on your mind?"
                  type="textarea"
                  value={formData.message}
                  disabled={isSubmitting}
                  onChange={(v) => setFormData((p) => ({ ...p, message: v }))}
                />

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shine group inline-flex items-center gap-2.5 bg-[#F2EFE9] text-black px-9 py-4 rounded-sm text-xs font-semibold tracking-[0.18em] uppercase hover:opacity-80 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
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
                        Send message
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-xs font-light uppercase tracking-[0.15em] text-gray-500">
                    Replies within 24 h
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <div className="max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 py-8 mt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] font-light uppercase tracking-[0.3em] text-gray-500">
          © 2026 Adithya Nagamuneendran
        </p>
        <p className="text-[10px] font-light uppercase tracking-[0.3em] text-gray-500">
          Designed &amp; built by Adithya
        </p>
      </div>
    </div>
  );
};

/* ── Reusable underline field ── */
type FieldProps = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  value: string;
  disabled: boolean;
  onChange: (v: string) => void;
};

function Field({ id, label, type, value, disabled, onChange }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const shared =
    'block w-full bg-transparent pt-5 pb-2.5 text-sm text-[#F2EFE9] outline-none border-b border-white/15 transition-colors duration-200 disabled:opacity-40 resize-none';

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          floated
            ? 'top-0 text-[10px] font-medium tracking-widest uppercase text-gray-500'
            : 'top-5 text-sm font-light text-gray-500'
        }`}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={shared}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={shared}
        />
      )}
      {/* animated focus underline — grows from the left over the static border */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left bg-[#F2EFE9] transition-transform duration-300 ease-out ${
          focused ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </div>
  );
}

export default ContactComponent;
