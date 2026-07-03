'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MetricCard {
  id: string;
  label: string;
  target?: number;
  decimals?: number;
  suffix?: string;
  staticValue?: string;
  caption: string;
}

const METRICS: MetricCard[] = [
  { id: 'cgpa', label: 'GPA.metric', target: 8.74, decimals: 2, caption: 'CGPA · DSU Bengaluru' },
  { id: 'projects', label: 'projects.count', target: 14, decimals: 0, suffix: '+', caption: 'Projects shipped' },
  { id: 'certs', label: 'certs.count', target: 7, decimals: 0, suffix: '', caption: 'Certifications earned' },
  { id: 'nasa24', label: 'award.2024', staticValue: "NASA '24", caption: 'Art & Technology Award' },
  { id: 'nasa25', label: 'award.2025', staticValue: "NASA '25", caption: 'Space Apps Global Nominee' },
  { id: 'year', label: 'status.academic', staticValue: 'Pre-Final Yr', caption: 'B.Tech CSE · Data Science' },
];

function MetricCounter({ target, decimals = 0, suffix = '' }: { target: number; decimals?: number; suffix?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!wrapRef.current || !valueRef.current) return;
    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (valueRef.current) valueRef.current.textContent = obj.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [target, decimals, suffix]);

  return (
    <div ref={wrapRef}>
      <p ref={valueRef} className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-white tabular-nums">
        0{suffix}
      </p>
    </div>
  );
}

function MetricCardEl({ metric }: { metric: MetricCard }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, { x: px * 8, y: py * 8, duration: 0.4, ease: 'power2.out' });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="metric-card group relative glass rounded-3xl p-6 flex flex-col justify-between gap-4 min-h-[160px] hover:border-(--lab-accent)/50 hover:shadow-[0_0_30px_rgba(164,255,74,0.12)] transition-[box-shadow,border-color] duration-300"
    >
      <p className="text-[10px] font-mono-lab tracking-widest uppercase text-zinc-500 group-hover:text-accent transition-colors">
        {metric.label}
      </p>
      {metric.staticValue ? (
        <p className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white">{metric.staticValue}</p>
      ) : (
        <MetricCounter target={metric.target!} decimals={metric.decimals} suffix={metric.suffix} />
      )}
      <p className="text-xs font-mono-lab text-zinc-500">{metric.caption}</p>
    </div>
  );
}

export default function StatsDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: containerRef.current, start: 'top 88%', once: true, invalidateOnRefresh: true },
      });

      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll('.metric-card'), {
          opacity: 0,
          y: 30,
          scale: 0.97,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: { trigger: gridRef.current, start: 'top 90%', once: true, invalidateOnRefresh: true },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" ref={containerRef} className="relative bg-(--lab-bg) overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-30" />
        <div className="absolute top-0 right-0 w-112.5 h-112.5 rounded-full bg-(--lab-secondary)/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div ref={headingRef} className="max-w-2xl mb-14">
          <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500 mb-4">
            dataset — adithya.profile
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-none mb-6">
            Live System Metrics
          </h2>
          <p className="text-sm sm:text-base font-light leading-relaxed text-zinc-400">
            Pre-final year B.Tech student in Computer Science Engineering (Data Science) at Dayananda Sagar University, Bengaluru —
            building intelligent systems at the intersection of AI/ML and full-stack engineering.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {METRICS.map((m) => (
            <MetricCardEl key={m.id} metric={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
