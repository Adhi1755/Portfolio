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

    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, leftRef.current, rightRef.current], { y: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(headingRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
          gsap.to(leftRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15 });
          gsap.to(rightRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.28 });
        },
        once: true,
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
      className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '38px 38px' }}
        />
      </div>

      {/* subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-gray-200 dark:via-zinc-800 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-20">
          <p className="text-xs font-light tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-4">
            05 — Contact
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter text-black dark:text-white leading-[1.0]">
            Let&apos;s work<br />
            <span className="text-gray-300 dark:text-zinc-700">together.</span>
          </h2>
        </div>

        {/* ── Body: form + sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">

          {/* ── Form ── */}
          <div ref={leftRef}>
            {submitStatus === 'success' ? (
              <div className="py-16 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl font-semibold text-black dark:text-white tracking-tight">Message sent.</p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">{submitMessage}</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 self-start text-sm font-light text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* error banner */}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
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
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-normal tracking-wide hover:opacity-80 active:scale-95 transition-all duration-200 shadow-lg shadow-black/10 disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <p className="text-xs font-light text-gray-400 dark:text-zinc-600">
                    Replies within 24 h
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div ref={rightRef} className="flex flex-col gap-10 lg:pt-1">

            {/* direct email */}
            <div>
              <p className="text-[11px] font-light tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-3">Email</p>
              <a
                href="mailto:adithya1755@gmail.com"
                className="text-sm font-light text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors break-all"
              >
                adithya1755@gmail.com
              </a>
            </div>

            {/* location */}
            <div>
              <p className="text-[11px] font-light tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-3">Based in</p>
              <p className="text-sm font-light text-black dark:text-white">Bengaluru, India</p>
            </div>

            {/* divider */}
            <div className="h-px bg-gray-100 dark:bg-zinc-900" />

            {/* socials */}
            <div>
              <p className="text-[11px] font-light tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-4">Elsewhere</p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm font-light text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                    {s.label}
                    <svg
                      className="w-3 h-3 opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 mt-8 border-t border-gray-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-light text-gray-400 dark:text-zinc-600 tracking-wide">
          © 2026 Adithya Nagamuneendran
        </p>
        <p className="text-xs font-light text-gray-400 dark:text-zinc-600 tracking-wide">
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
    'w-full bg-transparent pt-5 pb-2.5 text-sm text-black dark:text-white outline-none border-b border-gray-200 dark:border-zinc-800 focus:border-black dark:focus:border-white transition-colors duration-200 disabled:opacity-40 resize-none';

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          floated
            ? 'top-0 text-[10px] font-medium tracking-widest uppercase text-gray-400 dark:text-zinc-600'
            : 'top-5 text-sm font-light text-gray-400 dark:text-zinc-600'
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
    </div>
  );
}

export default ContactComponent;
