'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Node {
  id: string;
  date: string;
  title: string;
  detail: string;
}

/* Only dated, verifiable milestones — pulled from real certs/projects */
const NODES: Node[] = [
  {
    id: 'azure',
    date: '2024',
    title: 'Azure Data Fundamentals',
    detail: 'Certified by Microsoft — Azure Data Factory, Cosmos DB, SQL, Databricks & Data Lake.',
  },
  {
    id: 'nasa24',
    date: 'Oct 2024',
    title: 'NASA Space Apps — Art & Technology Award',
    detail: 'Built the Orrery Web App, a real-time 3D solar-system simulation. Recognised as a Galactic Problem Solver.',
  },
  {
    id: 'powerbi',
    date: 'Oct 2024',
    title: 'Power BI for Business Intelligence',
    detail: 'IEEE · Dayananda Sagar University workshop on dashboards, transformation & reporting.',
  },
  {
    id: 'hackverse',
    date: '2025',
    title: 'Hackverse 2025',
    detail: 'Shipped SkillSpark — an adaptive learning platform using RAG and Google Gemini — in under 24 hours.',
  },
  {
    id: 'nasa25',
    date: 'Oct 2025',
    title: 'NASA Space Apps — Global Nominee',
    detail: 'Recognised globally for a project integrating React Native, ML, Tailwind CSS and MongoDB.',
  },
  {
    id: 'hackerrank',
    date: 'Jan 2026',
    title: 'Python (Basic) — HackerRank',
    detail: 'Validated core Python problem-solving and language fundamentals.',
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !fillRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      gsap.set(fillRef.current, { height: '100%' });
      gsap.set(nodeRefs.current, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      nodeRefs.current.forEach((el) => {
        if (!el) return;
        const dot = el.querySelector('.journey-dot');
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 78%', once: true, invalidateOnRefresh: true },
            onStart: () => {
              if (dot) gsap.to(dot, { backgroundColor: 'var(--lab-accent)', boxShadow: '0 0 16px var(--lab-accent)', duration: 0.4 });
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="journey" ref={containerRef} className="relative bg-(--lab-bg) overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500 mb-4">
            mission log
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-none">
            The Journey So Far
          </h2>
        </div>

        <div className="relative pl-10 sm:pl-14">
          {/* Base + fill lines */}
          <div ref={lineRef} className="absolute left-[7px] sm:left-[11px] top-1 bottom-1 w-px bg-white/10">
            <div ref={fillRef} className="absolute top-0 left-0 w-px bg-(--lab-accent) shadow-[0_0_8px_var(--lab-accent)]" style={{ height: '0%' }} />
          </div>

          <div className="flex flex-col gap-12">
            {NODES.map((node, i) => (
              <div key={node.id} ref={(el) => { nodeRefs.current[i] = el; }} className="relative">
                <span className="journey-dot absolute -left-10 sm:-left-14 top-1 w-3.5 h-3.5 rounded-full bg-zinc-700 transition-[background-color,box-shadow] duration-300" />
                <p className="text-xs font-mono-lab tracking-widest uppercase text-accent mb-1.5">{node.date}</p>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-white mb-1.5">{node.title}</h3>
                <p className="text-sm font-light text-zinc-400 leading-relaxed max-w-lg">{node.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
