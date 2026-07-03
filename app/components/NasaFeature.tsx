'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAR_COUNT = 40;

interface HackEvent {
  id: string;
  org: string;
  title: string;
  result: string;
  date: string;
}

const EVENTS: HackEvent[] = [
  {
    id: 'nasa24',
    org: 'NASA Space Apps Challenge',
    title: 'Art & Technology Award',
    result: 'Built the Orrery Web App — a real-time 3D solar-system simulation.',
    date: 'Oct 2024',
  },
  {
    id: 'nasa25',
    org: 'NASA Space Apps Challenge',
    title: 'Global Nominee',
    result: 'Recognised among global submissions for an ML-driven project.',
    date: 'Oct 2025',
  },
  {
    id: 'hackverse',
    org: 'Hackverse · IEEE DSU',
    title: 'Built SkillSpark',
    result: 'Shipped an adaptive learning platform with RAG + Gemini in 24 hours.',
    date: '2025',
  },
];

export default function NasaFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      top: (i * 17.3) % 100,
      left: (i * 53.7) % 100,
      size: 1 + (i % 3),
      delay: (i * 0.31) % 4,
    })), []
  );

  useEffect(() => {
    if (!containerRef.current || window.matchMedia('(pointer: coarse)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true, invalidateOnRefresh: true },
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }

      if (wallRef.current) {
        gsap.from(wallRef.current.querySelectorAll('.hack-card'), {
          opacity: 0,
          y: 50,
          scale: 0.85,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'all',
          scrollTrigger: { trigger: wallRef.current, start: 'top 88%', once: true, invalidateOnRefresh: true },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="recognition" ref={containerRef} className="relative bg-(--lab-bg) overflow-hidden">
      {/* Starfield + planet glow backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              opacity: 0.5,
              animation: `pulse 3s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        <div
          ref={glowRef}
          className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(164,255,74,0.10) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-10 lg:px-16 py-24 sm:py-32 text-center">
        <div ref={headingRef} className="flex flex-col items-center gap-6 mb-20">
          <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500">
            external validation
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
            NASA Space Apps Challenge
          </h2>
          <p className="text-sm sm:text-base font-light text-zinc-400 max-w-xl leading-relaxed">
            One of the world&apos;s largest hackathons — 150+ countries and thousands of teams each year.
            Recognised twice: <span className="text-accent">Art &amp; Technology Award 2024</span> and{' '}
            <span className="text-accent">Global Nominee 2025</span>.
          </p>
        </div>

        {/* Hackathon wall */}
        <div ref={wallRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {EVENTS.map((ev) => (
            <div key={ev.id} className="hack-card glass rounded-3xl p-6 flex flex-col gap-3 hover:-translate-y-1 hover:border-(--lab-accent)/40 transition-all duration-300">
              <p className="text-[10px] font-mono-lab tracking-widest uppercase text-zinc-500">{ev.date}</p>
              <h3 className="font-display text-lg font-semibold text-white">{ev.title}</h3>
              <p className="text-xs font-mono-lab text-accent">{ev.org}</p>
              <p className="text-xs font-light text-zinc-400 leading-relaxed">{ev.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
