'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Issuer SVG icons ───────────────────────────────────────────────────── */

const CourseraIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.7 16.64c-.07-.07-.18-.07-.25 0l-2.72 2.72c-.07.07-.02.18.07.18h5.4c.1 0 .14-.11.07-.18l-2.57-2.72zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 13.5c-.42.73-1.15 1.3-2.18 1.7-.18.07-.37-.08-.33-.27l.27-1.44c.02-.1.1-.18.2-.22.6-.27 1-.65 1.23-1.12.53-.93.36-2.16-.4-3.03-.7-.8-1.78-1.24-2.87-1.17-1.63.1-3 1.3-3.3 2.9-.23 1.17.14 2.3.92 3.1.1.1.1.27 0 .38l-1.03 1.03c-.1.1-.27.1-.37 0-1.2-1.23-1.8-2.93-1.5-4.77.43-2.53 2.6-4.55 5.15-4.8 1.73-.17 3.35.46 4.54 1.57 1.2 1.12 1.88 2.68 1.88 4.32 0 1.26-.42 2.48-1.2 3.5-.02.1-.02.22.01.32z" />
  </svg>
);

const MicrosoftIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 2h9.5v9.5H2V2zm10.5 0H22v9.5h-9.5V2zM2 12.5h9.5V22H2v-9.5zm10.5 0H22V22h-9.5v-9.5z" />
  </svg>
);

const FreeCodeCampIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.8 2.7c.3-.3.8-.2 1 .1.2.3.1.7-.1.9C3.3 5.8 2 9 2 12s1.3 6.2 3.7 8.3c.3.2.3.6.1.9-.2.3-.7.4-1 .1C2.1 19 .5 15.7.5 12S2.1 5 4.8 2.7zm14.4 0c-.3-.3-.8-.2-1 .1-.2.3-.1.7.1.9C20.7 5.8 22 9 22 12s-1.3 6.2-3.7 8.3c-.3.2-.3.6-.1.9.2.3.7.4 1 .1C21.9 19 23.5 15.7 23.5 12S21.9 5 19.2 2.7zM12 6.4c-.6 0-1 .4-1.2.8L8.3 13l-.1.3c0 .9.7 1.6 1.6 1.6.6 0 1.1-.3 1.4-.8l.8-1.5.8 1.5c.3.5.8.8 1.4.8.9 0 1.6-.7 1.6-1.6 0-.1 0-.2-.1-.3l-2.5-5.8c-.2-.4-.7-.8-1.2-.8z" />
  </svg>
);

const VerifiedBadge = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

/* ─── Certification Data ─────────────────────────────────────────────────── */

type Cert = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  description: string;
  skills: string[];
  color: string;     // accent color
  IssuerIcon: React.FC<{ className?: string }>;
};

const certifications: Cert[] = [
  {
    id: 1,
    title: 'Machine Learning A-Z',
    issuer: 'Coursera',
    date: 'Apr 2024',
    link: '#',
    description: 'Comprehensive machine learning course covering supervised & unsupervised learning, deep learning, and real-world model deployment strategies.',
    skills: ['Regression', 'Classification', 'Neural Networks', 'Clustering'],
    color: '#a78bfa',
    IssuerIcon: CourseraIcon,
  },
  {
    id: 2,
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft Learn',
    date: 'Jan 2024',
    link: '#',
    description: 'Foundational cloud concepts, Azure services, security, privacy, compliance, and Azure pricing & support models.',
    skills: ['Cloud Computing', 'Azure Services', 'Security', 'Networking'],
    color: '#60a5fa',
    IssuerIcon: MicrosoftIcon,
  },
  {
    id: 3,
    title: 'Full-Stack Web Development',
    issuer: 'freeCodeCamp',
    date: 'Dec 2023',
    link: '#',
    description: 'End-to-end web development covering responsive design, JavaScript algorithms, front-end libraries, and API development.',
    skills: ['React', 'Node.js', 'REST APIs', 'Responsive Design'],
    color: '#34d399',
    IssuerIcon: FreeCodeCampIcon,
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: number]: { x: number; y: number } }>({});

  /* ─ Handle card mouse-move for spotlight effect ─ */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos(prev => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  /* ─ GSAP animations ─ */
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const headingEl = headingRef.current;
      const timelineEl = timelineRef.current;
      const cardEls = Array.from(cardsContainerRef.current?.querySelectorAll('.cert-card') || []);
      const connectorEls = Array.from(containerRef.current?.querySelectorAll('.timeline-connector') || []);
      const dotEls = Array.from(containerRef.current?.querySelectorAll('.timeline-dot') || []);

      /* Initial states */
      if (headingEl) gsap.set(headingEl, { y: 60, opacity: 0 });
      if (timelineEl) gsap.set(timelineEl, { scaleX: 0 });
      gsap.set(cardEls, { y: 60, opacity: 0, scale: 0.92 });
      gsap.set(connectorEls, { scaleY: 0 });
      gsap.set(dotEls, { scale: 0 });

      /* Main timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      });

      if (headingEl) {
        tl.to(headingEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }

      /* Horizontal timeline line */
      if (timelineEl) {
        tl.to(timelineEl, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3');
      }

      /* Dots pop in */
      if (dotEls.length) {
        tl.to(dotEls, { scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.12 }, '-=0.8');
      }

      /* Vertical connectors extend */
      if (connectorEls.length) {
        tl.to(connectorEls, { scaleY: 1, duration: 0.5, ease: 'power2.out', stagger: 0.12 }, '-=0.5');
      }

      /* Cards reveal */
      tl.to(cardEls, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: { each: 0.15, from: 'start' },
      }, '-=0.4');

      /* Card hover float effect */
      cardEls.forEach((el) => {
        el.addEventListener('mouseenter', () =>
          gsap.to(el, { y: -8, duration: 0.3, ease: 'power2.out' })
        );
        el.addEventListener('mouseleave', () =>
          gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' })
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-50 dark:bg-violet-950/15 blur-[140px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-50 dark:bg-emerald-950/15 blur-[120px] opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-50 dark:bg-sky-950/10 blur-[160px] opacity-25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-20 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Credentials
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">
            Certifications
          </h2>
          <p className="text-base sm:text-lg font-light text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            Validated milestones in my learning journey — each one a step toward mastery.
          </p>
        </div>

        {/* ── Timeline + Cards Layout ── */}
        <div className="relative">

          {/* Horizontal timeline bar (hidden on mobile) */}
          <div
            ref={timelineRef}
            className="hidden lg:block absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-400/60 via-sky-400/60 to-emerald-400/60 dark:from-violet-500/40 dark:via-sky-500/40 dark:to-emerald-500/40 origin-left"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Cards grid */}
          <div ref={cardsContainerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {certifications.map((cert, idx) => (
              <div key={cert.id} className="relative flex flex-col items-center">

                {/* Timeline dot + connector (desktop only) */}
                <div className="hidden lg:flex flex-col items-center mb-6">
                  {/* Dot */}
                  <div
                    className="timeline-dot relative w-4 h-4 rounded-full border-2 border-white dark:border-black z-10"
                    style={{
                      backgroundColor: cert.color,
                      boxShadow: `0 0 12px ${cert.color}50, 0 0 24px ${cert.color}25`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: cert.color }}
                    />
                  </div>
                  {/* Connector line */}
                  <div
                    className="timeline-connector w-[2px] h-6 origin-top"
                    style={{
                      background: `linear-gradient(to bottom, ${cert.color}80, ${cert.color}20)`,
                    }}
                  />
                </div>

                {/* ── Card ── */}
                <article
                  className="cert-card group relative w-full cursor-pointer rounded-3xl border border-gray-200/80 dark:border-zinc-800/80 overflow-hidden transition-all duration-500"
                  style={{
                    background: activeCard === cert.id
                      ? undefined
                      : undefined,
                  }}
                  onClick={() => {
                    if (activeCard === cert.id) {
                      if (cert.link) window.open(cert.link, '_blank');
                    } else {
                      setActiveCard(cert.id);
                    }
                  }}
                  onMouseMove={(e) => handleMouseMove(e, cert.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Spotlight radial gradient on hover */}
                  {mousePos[cert.id] && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                      style={{
                        background: `radial-gradient(400px circle at ${mousePos[cert.id].x}px ${mousePos[cert.id].y}px, ${cert.color}12, transparent 60%)`,
                      }}
                    />
                  )}

                  {/* Card inner bg */}
                  <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl z-0" />

                  {/* Top accent strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] z-10"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
                    }}
                  />

                  <div className="relative z-10 p-7">
                    {/* Header row: icon + verified badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${cert.color}15, ${cert.color}08)`,
                          border: `1px solid ${cert.color}30`,
                        }}
                      >
                        <cert.IssuerIcon className="w-7 h-7" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: `${cert.color}12`, border: `1px solid ${cert.color}25` }}>
                        <VerifiedBadge className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium tracking-wide uppercase" style={{ color: cert.color }}>
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Issuer label */}
                    <p className="text-xs font-medium tracking-widest uppercase mb-1.5" style={{ color: cert.color }}>
                      {cert.issuer}
                    </p>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-black dark:text-white leading-snug mb-3">
                      {cert.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
                      {cert.description}
                    </p>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-colors duration-200"
                          style={{
                            backgroundColor: `${cert.color}10`,
                            color: cert.color,
                            border: `1px solid ${cert.color}20`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Footer: date + action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/60 dark:border-zinc-800/60">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-light">{cert.date}</span>
                      </div>

                      {cert.link && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(cert.link, '_blank');
                          }}
                          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 group-hover:gap-3"
                          style={{
                            backgroundColor: `${cert.color}12`,
                            color: cert.color,
                            border: `1px solid ${cert.color}25`,
                          }}
                        >
                          View Credential
                          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom stats row ── */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { label: 'Certifications', value: '3+', icon: '🏅' },
            { label: 'Platforms', value: '3', icon: '🌐' },
            { label: 'Skills Covered', value: '12+', icon: '⚡' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800/80 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-semibold text-black dark:text-white">{stat.value}</p>
                <p className="text-xs font-light text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
