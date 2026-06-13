'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = (cls: string) => containerRef.current?.querySelector<HTMLElement>(cls) ?? null;

      const label  = el('.h-label');
      const pill   = el('.h-pill');
      const name   = el('.h-name');
      const avatar = el('.h-avatar');
      const role   = el('.h-role');
      const desc   = el('.h-desc');
      const cta    = el('.h-cta');
      const social = el('.h-social');

      const items = [label, pill, name, avatar, role, desc, cta, social, scrollRef.current]
        .filter((x): x is HTMLElement => x !== null);

      gsap.set(items, { opacity: 0, y: 28 });
      gsap.set(avatar, { y: 0, scale: 0.93 });

      gsap.timeline({ delay: 0.1 })
        .to(label,  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(pill,   { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2')
        .to(name,   { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.2')
        .to(avatar, { opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' }, '-=0.55')
        .to(role,   { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.4')
        .to(desc,   { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.25')
        .to(cta,    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2')
        .to(social, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2')
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');

      const bounce = gsap.to(scrollRef.current, {
        y: 7, duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.5, paused: true,
      });
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top', end: 'bottom top',
        onEnter: () => bounce.play(),
        onLeave: () => bounce.pause(),
        onEnterBack: () => bounce.play(),
        onLeaveBack: () => bounce.pause(),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-dvh bg-white dark:bg-black overflow-hidden transition-colors duration-300"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-125 h-125 rounded-full bg-gray-100 dark:bg-zinc-900/40 blur-[130px] opacity-60" />
        <div className="absolute -bottom-32 -right-32 w-105 h-105 rounded-full bg-gray-100 dark:bg-zinc-900/30 blur-[110px] opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '38px 38px' }}
        />
      </div>

      {/* Content — single centered column */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 min-h-dvh flex flex-col items-center justify-center text-center py-20">

        {/* Label */}
        <p className="h-label text-xs font-light tracking-[0.25em] uppercase text-gray-400 dark:text-gray-600 mb-4">
          01 — Introduction
        </p>

        {/* Status pill */}
        <div className="h-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-xs font-light text-gray-500 dark:text-gray-400 mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
          Open to opportunities
        </div>

        {/* Name */}
        <h1 className="h-name text-[clamp(3rem,9vw,6.5rem)] font-semibold tracking-tighter leading-none text-black dark:text-white mb-1">
          Adithya
        </h1>

        {/* Avatar */}
        <div className="h-avatar -my-4 sm:-my-5">
          <Image
            src="/Avatar.png"
            alt="Adithya"
            width={320}
            height={320}
            priority
            className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain"
          />
        </div>

        {/* Role typewriter */}
        <div className="h-role text-base sm:text-lg font-light text-gray-500 dark:text-gray-400 min-h-8 mb-4">
          <Typewriter
            options={{
              strings: ['Aspiring AI / ML Engineer', 'Full-Stack Developer', 'Problem Solver'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        {/* Description */}
        <p className="h-desc text-sm sm:text-base font-light leading-relaxed text-gray-500 dark:text-gray-400 max-w-lg mb-6">
  Pre-final year{' '}
  <span className="text-black dark:text-white font-normal">CS (Data Science)</span>
  {' '}student — building intelligent systems with{' '}
  <span className="text-black dark:text-white font-normal">LLMs, PyTorch, and FastAPI</span>
  {' '}and shipping full-stack web apps that actually work.
</p>

        {/* CTAs */}
        <div className="h-cta flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-normal tracking-wide hover:opacity-75 active:scale-95 transition-all duration-200 shadow-lg shadow-black/10"
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
            className="flex items-center gap-2 px-7 py-3 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 text-sm font-light tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white active:scale-95 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            Resume
          </a>
        </div>

        {/* Socials */}
        <div className="h-social flex items-center gap-2.5">
          {[
            {
              href: 'https://github.com/Adhi1755', label: 'GitHub',
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
            },
            {
              href: 'https://www.linkedin.com/in/adithyanagamuneendran/', label: 'LinkedIn',
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
            },
            {
              href: 'https://mail.google.com/mail/?view=cm&fs=1&to=adithya1755@gmail.com', label: 'Email',
              icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-gray-500 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
            >
              {icon}
            </a>
          ))}
          <div className="w-px h-5 bg-gray-200 dark:bg-zinc-800 mx-1" />
          <span className="text-xs font-light text-gray-400 dark:text-zinc-600 tracking-wide">Bengaluru, India</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-300 dark:text-zinc-700 cursor-pointer z-10 select-none"
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
