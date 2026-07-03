'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FieldName = 'name' | 'email' | 'message';

const QUICK_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Adhi1755',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adithyanagamuneendran/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:adithya1755@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    href: '/resume.pdf',
    download: true,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    ),
  },
];

const STAR_COUNT = 30;

const ContactComponent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<Record<FieldName, string>>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [time, setTime] = useState('');

  /* Deterministic constellation points + edges */
  const stars = useMemo(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      x: (i * 37.3) % 100,
      y: (i * 61.1) % 100,
      delay: (i * 0.27) % 4,
    })), []
  );
  const edges = useMemo(() => {
    const e: [number, number][] = [];
    for (let i = 0; i < stars.length; i++) {
      const next = (i + 5) % stars.length;
      if (Math.abs(stars[i].x - stars[next].x) < 35 && Math.abs(stars[i].y - stars[next].y) < 35) {
        e.push([i, next]);
      }
    }
    return e;
  }, [stars]);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (submitStatus === 'success' && checkRef.current) {
      gsap.fromTo(checkRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.2)' });
    }
  }, [submitStatus]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, leftRef.current, rightRef.current], {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.13,
        clearProps: 'all',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true, invalidateOnRefresh: true },
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
    <div id="contact" ref={sectionRef} className="relative bg-(--lab-bg) overflow-hidden">
      {/* Constellation network background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-15" />
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={`${stars[a].x}%`} y1={`${stars[a].y}%`}
              x2={`${stars[b].x}%`} y2={`${stars[b].y}%`}
              stroke="rgba(164,255,74,0.12)"
              strokeWidth={1}
            />
          ))}
        </svg>
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-(--lab-accent)"
            style={{ top: `${s.y}%`, left: `${s.x}%`, width: 2, height: 2, opacity: 0.6, animation: `pulse 3s ease-in-out ${s.delay}s infinite` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-14">
          <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500 mb-4">
            mission control
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            Ready To Build<br />
            Something <span className="text-accent">Meaningful?</span>
          </h2>
        </div>

        {/* ── Quick links ── */}
        <div className="flex flex-wrap gap-3 mb-14">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              download={link.download}
              data-cursor-hover
              className="glass flex items-center gap-2 px-5 py-2.5 rounded-full font-mono-lab text-sm text-zinc-300 hover:text-accent hover:border-(--lab-accent)/40 transition-all duration-200"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Body: form + sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">

          {/* ── Form ── */}
          <div ref={leftRef} className="glass rounded-3xl p-8 lg:p-10">
            {submitStatus === 'success' ? (
              <div className="py-16 flex flex-col gap-4">
                <div ref={checkRef} className="w-10 h-10 rounded-full bg-(--lab-accent)/15 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-display text-2xl font-semibold text-white tracking-tight">Message sent.</p>
                <p className="text-sm font-light text-zinc-400">{submitMessage}</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 self-start text-sm font-light text-zinc-500 hover:text-accent transition-colors underline underline-offset-4"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-950/30 border border-red-900/50 text-sm text-red-400">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      <path strokeLinecap="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                    </svg>
                    {submitMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <Field id="name" label="Your name" type="text" value={formData.name} disabled={isSubmitting} onChange={(v) => setFormData((p) => ({ ...p, name: v }))} />
                  <Field id="email" label="Email address" type="email" value={formData.email} disabled={isSubmitting} onChange={(v) => setFormData((p) => ({ ...p, email: v }))} />
                </div>

                <Field id="message" label="What's on your mind?" type="textarea" value={formData.message} disabled={isSubmitting} onChange={(v) => setFormData((p) => ({ ...p, message: v }))} />

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor-hover
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-(--lab-accent) text-black text-sm font-medium tracking-wide hover:opacity-85 active:scale-95 transition-all duration-200 shadow-lg shadow-(--lab-accent)/20 disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <p className="text-xs font-mono-lab text-zinc-600">Replies within 24h</p>
                </div>
              </form>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div ref={rightRef} className="glass rounded-3xl p-8 flex flex-col gap-10">
            <div>
              <p className="text-[11px] font-mono-lab tracking-[0.2em] uppercase text-zinc-600 mb-3">Email</p>
              <a href="mailto:adithya1755@gmail.com" className="text-sm font-light text-white hover:text-accent transition-colors break-all">
                adithya1755@gmail.com
              </a>
            </div>

            <div>
              <p className="text-[11px] font-mono-lab tracking-[0.2em] uppercase text-zinc-600 mb-3">Based in</p>
              <p className="text-sm font-light text-white">Bengaluru, India</p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <p className="text-[11px] font-mono-lab tracking-[0.2em] uppercase text-zinc-600 mb-4">Status</p>
              <p className="flex items-center gap-2 text-sm font-light text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-(--lab-accent)" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
                Open to internships
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-mono-lab text-zinc-600 tracking-wide">
          © 2026 Adithya Nagamuneendran
        </p>
        <p className="text-xs font-mono-lab text-zinc-600 tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-(--lab-accent)" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
          Bengaluru, IST{time && ` · ${time}`}
        </p>
        <p className="text-xs font-mono-lab text-zinc-600 tracking-wide">
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
    'w-full bg-transparent pt-5 pb-2.5 text-sm text-white outline-none border-b border-white/15 focus:border-(--lab-accent) transition-colors duration-200 disabled:opacity-40 resize-none';

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 pointer-events-none transition-all duration-200 font-mono-lab ${
          floated ? 'top-0 text-[10px] tracking-widest uppercase text-zinc-500' : 'top-5 text-sm text-zinc-500'
        }`}
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea id={id} rows={4} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className={shared} />
      ) : (
        <input id={id} type={type} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className={shared} />
      )}
    </div>
  );
}

export default ContactComponent;
