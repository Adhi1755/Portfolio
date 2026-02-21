'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect';
import Magnet from './Magnet/Magnet';
import Image from 'next/image';

// Tiny inline SVG badges — no emoji
const AiIcon = () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" /></svg>;
const NextBadgeIcon = () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /><circle cx="12" cy="12" r="3" /></svg>;
const AwardIcon = () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
const GradIcon = () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>;

const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftColRef.current, { opacity: 0, x: -30 });
      gsap.set(rightColRef.current, { opacity: 0, x: 30 });
      gsap.set(socialRef.current, { opacity: 0, y: 12 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(leftColRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .to(rightColRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55')
        .to(socialRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');

      // Floating badges
      gsap.to('.float-badge', {
        y: -7,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Scroll indicator pulse
      gsap.to(scrollIndicatorRef.current, {
        y: 6,
        duration: 1.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300"
    >
      {/* Subtle background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-violet-100 dark:bg-violet-950/25 blur-[120px] opacity-50" />
        <div className="absolute -bottom-32 -right-32 w-[440px] h-[440px] rounded-full bg-indigo-100 dark:bg-indigo-950/25 blur-[110px] opacity-45" />
      </div>

      {/* Main layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center py-28 lg:py-0">

          {/* ── LEFT COLUMN — Text ── */}
          <div ref={leftColRef} className="flex flex-col gap-7 order-2 lg:order-1">

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm text-sm font-light text-gray-500 dark:text-gray-400 select-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </div>

            {/* Name + greeting */}
            <div className="space-y-1">
              <p className="text-base font-light text-gray-400 dark:text-gray-500 tracking-widest uppercase text-sm">
                Hey, I&apos;m
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-semibold tracking-tight leading-[0.95] text-black dark:text-white">
                Adithya
              </h1>
            </div>

            {/* Typewriter */}
            <div className="text-xl sm:text-2xl font-light text-gray-500 dark:text-gray-400 min-h-[2rem] leading-snug">
              <Typewriter
                options={{
                  strings: ['Aspiring AI/ML Engineer', 'Full-Stack Developer', 'Problem Solver'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            {/* Description */}
            <p className="text-base sm:text-[1.05rem] font-light leading-relaxed text-gray-600 dark:text-gray-400 max-w-md">
              Passionate about{' '}
              <span className="text-black dark:text-white font-normal">AI & Machine Learning</span>
              {' '}— building smart, full-stack solutions that blend Generative AI with modern web development.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-normal text-sm tracking-wide hover:opacity-80 active:scale-95 transition-all duration-200 shadow-lg shadow-black/10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Contact Me
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 font-light text-sm tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white active:scale-95 transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                Resume
              </a>
            </div>

            {/* Social row */}
            <div ref={socialRef} className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/Adhi1755"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/adithyanagamuneendran/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=adithya1755@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <div className="h-px w-6 bg-gray-300 dark:bg-zinc-700" />
              <span className="text-xs font-light text-gray-400 dark:text-gray-500 tracking-wide">Bengaluru, India</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Avatar ── */}
          <div ref={rightColRef} className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div ref={badgesRef} className="relative">

              {/* Avatar card */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-[2rem] overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 shadow-2xl shadow-black/10 dark:shadow-black/50 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 dark:from-violet-900/15 via-transparent to-indigo-50/30 dark:to-indigo-900/5 pointer-events-none z-10" />
                <Magnet padding={80} disabled={false} magnetStrength={60}>
                  <Image
                    src="/Avatar.png"
                    alt="Adithya — Profile picture"
                    width={420}
                    height={420}
                    className="w-106 h-106 sm:w-106 sm:h-106 object-contain relative hover:scale-[1.03] transition-transform duration-500"
                    priority
                  />
                </Magnet>
              </div>

              {/* Top-left badge */}
              <div className="float-badge absolute -top-4 -left-8 z-20 flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-3.5 py-2 shadow-md shadow-black/5">
                <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center text-violet-500"><AiIcon /></div>
                <div>
                  <p className="text-[11px] font-semibold text-black dark:text-white leading-tight">AI / ML</p>
                  <p className="text-[9px] text-gray-400 leading-tight">Generative AI</p>
                </div>
              </div>

              {/* Top-right badge */}
              <div className="float-badge absolute -top-4 -right-8 z-20 flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-3.5 py-2 shadow-md shadow-black/5">
                <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-500"><NextBadgeIcon /></div>
                <div>
                  <p className="text-[11px] font-semibold text-black dark:text-white leading-tight">Next.js</p>
                  <p className="text-[9px] text-gray-400 leading-tight">Full-stack</p>
                </div>
              </div>

              {/* Bottom-left badge */}
              <div className="float-badge absolute -bottom-4 -left-8 z-20 flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-3.5 py-2 shadow-md shadow-black/5">
                <div className="w-7 h-7 rounded-lg bg-yellow-50 dark:bg-yellow-950/40 flex items-center justify-center text-yellow-500"><AwardIcon /></div>
                <div>
                  <p className="text-[11px] font-semibold text-black dark:text-white leading-tight">NASA Award</p>
                  <p className="text-[9px] text-gray-400 leading-tight">Space Apps 2024</p>
                </div>
              </div>

              {/* Bottom-right badge */}
              <div className="float-badge absolute -bottom-4 -right-8 z-20 flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-3.5 py-2 shadow-md shadow-black/5">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-500"><GradIcon /></div>
                <div>
                  <p className="text-[11px] font-semibold text-black dark:text-white leading-tight">CGPA 8.56</p>
                  <p className="text-[9px] text-gray-400 leading-tight">DSU Bengaluru</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-zinc-600 cursor-pointer z-10 select-none"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-light tracking-[0.2em] uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default MainPage;