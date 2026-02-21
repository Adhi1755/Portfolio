'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';

const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const avatar = containerRef.current?.querySelector('.anim-avatar');
      const name = containerRef.current?.querySelector('.anim-name');
      const subtitle = containerRef.current?.querySelector('.anim-subtitle');
      const desc = containerRef.current?.querySelector('.anim-desc');
      const cta = containerRef.current?.querySelector('.anim-cta');
      const social = containerRef.current?.querySelector('.anim-social');

      if (avatar) gsap.set(avatar, { opacity: 0, scale: 0.8, y: 30 });
      if (name) gsap.set(name, { opacity: 0, y: 50 });
      if (subtitle) gsap.set(subtitle, { opacity: 0, y: 20 });
      if (desc) gsap.set(desc, { opacity: 0, y: 20 });
      if (cta) gsap.set(cta, { opacity: 0, y: 20 });
      if (social) gsap.set(social, { opacity: 0, y: 15 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      if (avatar) tl.to(avatar, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      if (name) tl.to(name, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
      if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      if (social) tl.to(social, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
      tl.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1');

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 6,
        duration: 1.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
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
      {/* ── Moving gradient at the top ── */}
      <div className="moving-gradient pointer-events-none absolute top-0 left-0 w-full h-[280px] sm:h-[340px] lg:h-[400px] z-[1] opacity-50 dark:opacity-40" />

      {/* ── Animated background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-gray-100 dark:bg-zinc-900/40 blur-[120px] opacity-50" />
        <div className="absolute -bottom-32 -right-32 w-[440px] h-[440px] rounded-full bg-gray-200 dark:bg-zinc-800/30 blur-[110px] opacity-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gray-100 dark:bg-zinc-800/20 blur-[200px] opacity-40 animate-[pulse_6s_ease-in-out_infinite]" />

        {/* Floating particles */}
        {[
          { size: 3, top: '12%', left: '8%', dur: '18s', delay: '0s' },
          { size: 2, top: '25%', left: '85%', dur: '22s', delay: '2s' },
          { size: 4, top: '60%', left: '12%', dur: '20s', delay: '4s' },
          { size: 2.5, top: '78%', left: '90%', dur: '16s', delay: '1s' },
          { size: 3, top: '35%', left: '65%', dur: '24s', delay: '3s' },
          { size: 2, top: '88%', left: '45%', dur: '19s', delay: '5s' },
          { size: 3.5, top: '15%', left: '50%', dur: '21s', delay: '2s' },
          { size: 2, top: '50%', left: '30%', dur: '17s', delay: '6s' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gray-300 dark:bg-zinc-600 opacity-30 dark:opacity-20"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: p.top,
              left: p.left,
              animation: `floatParticle ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Center-focused hero layout ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 min-h-screen flex flex-col items-center justify-center text-center py-24 lg:py-16">

        {/* Status pill */}
        <div className="anim-avatar inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm text-sm font-light text-gray-500 dark:text-gray-400 select-none mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to opportunities
        </div>

        {/* Name — massive, center */}
        <div className="anim-name mb-0">
          <p className="text-sm sm:text-base font-light text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-1.5">
            Hey, I&apos;m
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.9] text-black dark:text-white">
            Adithya
          </h1>
        </div>

        {/* Avatar — large, no container */}
        <div className="anim-avatar -my-10">
          <Image
            src="/Avatar.png"
            alt="Adithya — Profile picture"
            width={480}
            height={480}
            className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] lg:w-[350px] lg:h-[350px] object-contain hover:scale-[1.03] transition-transform duration-500"
            priority
          />
        </div>

        {/* Typewriter — role subtitle */}
        <div className="anim-subtitle text-base sm:text-lg md:text-xl font-light text-gray-500 dark:text-gray-400 min-h-[2rem] leading-snug mb-4">
          <Typewriter
            options={{
              strings: ['Aspiring AI/ML Engineer', 'Full-Stack Developer', 'Problem Solver'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        {/* Description — short, centered */}
        <p className="anim-desc text-sm sm:text-base font-light leading-relaxed text-gray-600 dark:text-gray-400 max-w-lg mb-6">
          Passionate about{' '}
          <span className="text-black dark:text-white font-normal">AI & Machine Learning</span>
          {' '}— building smart, full-stack solutions that blend Generative AI with modern web development.
        </p>

        {/* CTA buttons */}
        <div className="anim-cta flex flex-wrap justify-center items-center gap-3 mb-5">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-normal text-sm tracking-wide hover:opacity-80 active:scale-95 transition-all duration-200 shadow-lg shadow-black/10"
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
            className="flex items-center gap-2 px-7 py-3 rounded-full border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 font-light text-sm tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white active:scale-95 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            Resume
          </a>
        </div>

        {/* Social links — horizontal */}
        <div className="anim-social flex items-center gap-3">
          <a href="https://github.com/Adhi1755" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/adithyanagamuneendran/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=adithya1755@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"
            className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </a>
          <div className="h-px w-6 bg-gray-300 dark:bg-zinc-700" />
          <span className="text-xs font-light text-gray-400 dark:text-gray-500 tracking-wide">Bengaluru, India</span>
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