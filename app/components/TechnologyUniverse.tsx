'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Ring {
  id: string;
  category: string;
  radius: number;
  duration: number;
  reverse?: boolean;
  items: string[];
}

const RINGS: Ring[] = [
  { id: 'ai', category: 'AI & ML', radius: 70, duration: 38, items: ['Machine Learning', 'Generative AI', 'scikit-learn'] },
  { id: 'frontend', category: 'Frontend', radius: 120, duration: 52, reverse: true, items: ['React.js', 'Next.js', 'TypeScript', 'GSAP'] },
  { id: 'backend', category: 'Backend', radius: 170, duration: 64, items: ['FastAPI', 'Flask', 'Node.js'] },
  { id: 'data', category: 'Data', radius: 220, duration: 76, reverse: true, items: ['MySQL', 'MongoDB', 'Python', 'Java'] },
  { id: 'cloud', category: 'Cloud & Tools', radius: 270, duration: 90, items: ['Git / GitHub', 'Azure Cloud', 'PowerBI', 'Figma'] },
];

function OrbitRing({ ring }: { ring: Ring }) {
  const [paused, setPaused] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <>
      {/* visible ring outline */}
      <div
        className="absolute rounded-full border border-white/8"
        style={{
          width: ring.radius * 2,
          height: ring.radius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* spinner — carries the orbiting items */}
      <div
        className="absolute inset-0"
        style={{
          animation: `orbit-spin ${ring.duration}s linear infinite ${ring.reverse ? 'reverse' : 'normal'}`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {ring.items.map((item, i) => {
          const angle = (2 * Math.PI * i) / ring.items.length + (ring.reverse ? 0.4 : 0);
          const x = Math.round(Math.cos(angle) * ring.radius * 100) / 100;
          const y = Math.round(Math.sin(angle) * ring.radius * 100) / 100;
          const isActive = activeItem === item;
          return (
            <div
              key={item}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <div
                style={{
                  animation: `orbit-spin ${ring.duration}s linear infinite ${ring.reverse ? 'normal' : 'reverse'}`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                <span
                  onMouseEnter={() => { setPaused(true); setActiveItem(item); }}
                  onMouseLeave={() => { setPaused(false); setActiveItem(null); }}
                  data-cursor-hover
                  className={`-translate-x-1/2 -translate-y-1/2 absolute inline-flex whitespace-nowrap px-3 py-1.5 rounded-full font-mono-lab text-[11px] tracking-wide border transition-all duration-200 cursor-default select-none ${
                    isActive
                      ? 'bg-(--lab-accent) text-black border-(--lab-accent) scale-110 z-20'
                      : 'bg-black/60 text-zinc-300 border-white/10 hover:border-(--lab-accent) hover:text-accent'
                  }`}
                >
                  {item}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function TechnologyUniverse() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: containerRef.current, start: 'top 88%', once: true, invalidateOnRefresh: true },
      });
      gsap.from('.orbit-system', {
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true, invalidateOnRefresh: true },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="technology" ref={containerRef} className="relative bg-(--lab-bg) overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div ref={headingRef} className="max-w-2xl mb-14 text-center mx-auto">
          <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500 mb-4">
            system architecture
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-none">
            Technology Universe
          </h2>
        </div>

        {/* Desktop: orbital system */}
        <div className="orbit-system hidden lg:flex justify-center">
          <div className="relative" style={{ width: 560, height: 560 }}>
            {RINGS.map((ring) => <OrbitRing key={ring.id} ring={ring} />)}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full glass flex items-center justify-center">
              <span className="font-display text-sm font-semibold text-white tracking-tight">ADITHYA</span>
            </div>
          </div>
        </div>

        {/* Mobile / tablet fallback: simple grouped list */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RINGS.map((ring) => (
            <div key={ring.id} className="glass rounded-3xl p-6 flex flex-col gap-4">
              <h3 className="font-mono-lab text-xs tracking-widest uppercase text-accent">{ring.category}</h3>
              <div className="flex flex-wrap gap-2">
                {ring.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-full border border-white/10 font-mono-lab text-xs text-zinc-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
