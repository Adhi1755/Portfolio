'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Magnet from './Magnet/Magnet';

/* ─── Socials ─────────────────────────────────────────────────────────────── */
const socials = [
  {
    href: 'https://github.com/Adhi1755',
    label: 'GitHub',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/adithyanagamuneendran/',
    label: 'LinkedIn',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=adithya1755@gmail.com',
    label: 'Email',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const FOCUS_ITEMS = [
  'Building EmbedMindAI',
  'Studying Generative AI',
  'Open to internships',
];

const PARTICLE_COUNT = 24;

/* ─── Component ──────────────────────────────────────────────────────────── */
const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const focusTextRef = useRef<HTMLParagraphElement>(null);
  const [focusIndex, setFocusIndex] = useState(0);

  /* Deterministic particle field — avoids hydration mismatch from Math.random in render */
  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      left: (i * 41.7) % 100,
      size: 1.5 + (i % 4) * 0.6,
      duration: 8 + (i % 6) * 2,
      delay: (i * 0.7) % 10,
    })), []
  );

  /* ── Intro reveal timeline ── */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ctx = gsap.context(() => {
      const q = (cls: string) => containerRef.current?.querySelectorAll<HTMLElement>(cls) ?? null;

      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(q('.h-eyebrow'), { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' })
        .from(q('.hero-line'), { yPercent: 110, duration: 0.85, ease: 'power4.out', stagger: 0.08 }, '-=0.2')
        .from(q('.h-sub'), { opacity: 0, y: 14, duration: 0.5, ease: 'power2.out', stagger: 0.08 }, '-=0.5')
        .from(q('.h-cta'), { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from(q('.h-hud'), { opacity: 0, y: 24, scale: 0.97, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .from(q('.h-foot'), { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ── Cursor-tracked spotlight glow (desktop only) ── */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = spotlightRef.current;
        const container = containerRef.current;
        if (el && container) {
          const rect = container.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          el.style.background = `radial-gradient(640px circle at ${x}% ${y}%, rgba(164,255,74,0.08), transparent 60%)`;
        }
        raf = 0;
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Rotating "currently" status text ── */
  useEffect(() => {
    const id = setInterval(() => {
      setFocusIndex((i) => (i + 1) % FOCUS_ITEMS.length);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!focusTextRef.current) return;
    gsap.fromTo(
      focusTextRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [focusIndex]);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-dvh flex flex-col bg-(--lab-bg) overflow-hidden"
    >
      {/* ── Background: drifting grid + particles ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-60" />
        <div className="absolute -top-24 -right-24 w-112.5 h-112.5 rounded-full bg-(--lab-accent)/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-87.5 h-87.5 rounded-full bg-(--lab-secondary)/15 blur-[120px]" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-(--lab-accent)/70"
            style={{
              left: `${p.left}%`,
              bottom: '-10px',
              width: p.size,
              height: p.size,
              animation: `rise ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Cursor spotlight ── */}
      <div ref={spotlightRef} className="hidden lg:block pointer-events-none absolute inset-0 z-0 transition-[background] duration-150" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-10 items-center w-full">

          {/* ── Left: copy ── */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="h-eyebrow flex items-center gap-2 text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-(--lab-accent)" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
              System status: online
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
              <span className="block overflow-hidden py-0.5">
                <span className="hero-line inline-block">Building AI Systems That</span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-line inline-block">Learn, Adapt, and Solve</span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-line inline-block text-accent">Real Problems.</span>
              </span>
            </h1>

            <div className="flex flex-col gap-1.5">
              <p className="h-sub text-sm font-mono-lab text-zinc-400">
                <span className="text-accent">›</span> NASA Space Apps Global Nominee · Art &amp; Technology Award 2024
              </p>
              <p className="h-sub text-sm font-mono-lab text-zinc-400">
                <span className="text-accent">›</span> Data Science &amp; Generative AI Engineer
              </p>
            </div>

            <div className="h-cta flex flex-wrap items-center gap-3 pt-2">
              <Magnet padding={50} magnetStrength={4}>
                <button
                  onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }) ?? document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  data-cursor-hover
                  className="px-6 py-3 rounded-full bg-(--lab-accent) text-black font-medium text-sm tracking-wide hover:opacity-85 transition-all duration-200 shadow-lg shadow-(--lab-accent)/20"
                >
                  Explore Research
                </button>
              </Magnet>
              <Magnet padding={50} magnetStrength={4}>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  data-cursor-hover
                  className="px-6 py-3 rounded-full border border-white/15 text-zinc-300 font-light text-sm tracking-wide hover:border-(--lab-accent) hover:text-white transition-all duration-200"
                >
                  View Projects
                </button>
              </Magnet>
            </div>
          </div>

          {/* ── Right: HUD operator card ── */}
          <div className="h-hud relative order-first lg:order-none flex justify-center lg:justify-end">
            <div className="relative w-[230px] sm:w-[300px] lg:w-[340px] glass rounded-3xl p-4 pt-5">
              {/* Corner brackets */}
              <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-(--lab-accent) rounded-tl-xl" />
              <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-(--lab-accent) rounded-tr-xl" />
              <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-(--lab-accent) rounded-bl-xl" />
              <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-(--lab-accent) rounded-br-xl" />

              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-[10px] font-mono-lab tracking-widest uppercase text-zinc-500">Operator file</span>
                <span className="text-[10px] font-mono-lab tracking-widest uppercase text-accent">Active</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black/40 mb-4">
                <Image
                  src="/Profile-cutout.png"
                  alt="Adithya"
                  width={801}
                  height={959}
                  priority
                  className="w-full h-auto select-none pointer-events-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 px-1">
                <p className="text-xs font-mono-lab text-zinc-500">NAME <span className="text-zinc-200">Adithya N.</span></p>
                <p className="text-xs font-mono-lab text-zinc-500">ROLE <span className="text-zinc-200">AI/ML · Full-Stack</span></p>
                <div className="h-px bg-white/10 my-1" />
                <p className="text-[10px] font-mono-lab tracking-widest uppercase text-zinc-500">Currently</p>
                <p ref={focusTextRef} className="text-xs font-mono-lab text-accent blink-cursor">
                  {FOCUS_ITEMS[focusIndex]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer bar: socials + scroll beam ── */}
      <div className="h-foot relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor-hover
              className="p-2 rounded-full border border-white/10 text-zinc-500 hover:border-(--lab-accent) hover:text-accent transition-all duration-200"
            >
              {icon}
            </a>
          ))}
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-[11px] font-mono-lab text-zinc-500 tracking-wide">
            <span className="w-px h-3 bg-white/15" />
            Bengaluru, India
          </span>
        </div>

        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          data-cursor-hover
          className="flex flex-col items-center gap-1.5 text-[11px] font-mono-lab tracking-[0.2em] uppercase text-zinc-500 hover:text-accent transition-colors duration-200"
        >
          Scroll
          <span className="relative w-px h-8 bg-white/10 overflow-hidden">
            <span
              className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--lab-accent)"
              style={{ animation: 'scrollBeam 1.8s ease-in-out infinite' }}
            />
          </span>
        </button>
      </div>

      <style>{`
        @keyframes scrollBeam {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default MainPage;
