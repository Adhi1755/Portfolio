'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CertData {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const certifications: CertData[] = [
  {
    id: 1,
    title: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft',
    date: '2024',
    description:
      'Earned Microsoft Azure Data Fundamentals certification demonstrating foundational knowledge of Azure data services including Azure Data Factory, Azure Cosmos DB, Azure SQL, Azure Databricks, and Azure Data Lake.',
    imageSrc: '/Certificates/Azure.png',
    imageAlt: 'Microsoft Azure Data Fundamentals Certificate',
  },
  {
    id: 2,
    title: 'Galactic Problem Solver',
    issuer: 'NASA International Space Apps Challenge',
    date: 'Oct 2024',
    description:
      'Participated in the NASA International Space Apps Challenge 2024 as a Galactic Problem Solver, contributing to innovative space-tech solutions and collaborative project development.',
    imageSrc: '/Certificates/Problemslover.png',
    imageAlt: 'NASA Space Apps Galactic Problem Solver Certificate',
  },
  {
    id: 3,
    title: 'Art & Technology Award',
    issuer: 'NASA International Space Apps Challenge',
    date: 'Oct 2024',
    description:
      'Awarded the Art & Technology Award for developing a creative and technically impactful solution during NASA Space Apps Challenge 2024.',
    imageSrc: '/Certificates/ArtandTech.png',
    imageAlt: 'NASA Space Apps Art and Technology Award Certificate',
  },
  {
    id: 4,
    title: 'Power BI for Business Intelligence',
    issuer: 'IEEE Information Theory Society, Dayananda Sagar University',
    date: 'Oct 2024',
    description:
      'Completed a workshop on Microsoft Power BI covering data import, transformation, dashboard creation, visualizations, maps, slicers, and business intelligence reporting.',
    imageSrc: '/Certificates/PowerBi.png',
    imageAlt: 'Power BI for Business Intelligence Certificate',
  },
  {
    id: 5,
    title: 'Python (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    description:
      'Validated foundational Python programming skills including problem-solving, syntax understanding, and core programming concepts.',
    imageSrc: '/Certificates/Hakerrank.png',
    imageAlt: 'HackerRank Python Basic Certificate',
  },
  {
    id: 6,
    title: 'Hackverse 2025',
    issuer: 'IEEE Information Theory Society, Dayananda Sagar University',
    date: '2025',
    description:
      'Participated in Hackverse 2025, applying skills in React Native, Retrieval-Augmented Generation (RAG), Google Gemini, Node.js, Tailwind CSS, and effective pitching and communication.',
    imageSrc: '/Certificates/Hackverse.png',
    imageAlt: 'Hackverse 2025 Participation Certificate',
  },
  {
    id: 7,
    title: 'Global Nominee 2025',
    issuer: 'NASA International Space Apps Challenge',
    date: 'Oct 2025',
    description:
      'Recognized as a Global Nominee in NASA International Space Apps Challenge 2025 for an innovative project integrating React Native, Machine Learning, Tailwind CSS, and MongoDB.',
    imageSrc: '/Certificates/GlobalNominee.png',
    imageAlt: 'NASA Space Apps Global Nominee 2025 Certificate',
  },
];

const N = certifications.length;

// Each cert occupies 1 scroll "step". Total pinned scroll = N steps.
// We give the section extra scroll height: 100vh (initial view) + N * 80vh (one step per cert).
const STEP_VH = 80;

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Animate the progress bar for the active tab
  const animateProgress = useCallback((index: number, fill: number) => {
    const bar = progressRefs.current[index];
    if (bar) {
      bar.style.transform = `scaleX(${fill})`;
    }
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) return;

      // Pin the sticky panel for the full scrollable height of the section
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: sticky,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          // progress goes 0 → 1 over the entire pinned scroll distance
          const raw = self.progress * N; // 0 → N
          const newIndex = Math.min(N - 1, Math.floor(raw));
          // how far through this current step (0→1)
          const stepFrac = raw - Math.floor(raw);

          if (newIndex !== activeIndexRef.current) {
            const prevIndex = activeIndexRef.current;
            const goingForward = newIndex > prevIndex;

            // Zero out old progress bar
            animateProgress(prevIndex, goingForward ? 1 : 0);
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);

            // Kill any in-flight tweens on both panels so they don't fight
            const outPanel = panelRefs.current[prevIndex];
            const inPanel = panelRefs.current[newIndex];

            if (outPanel) {
              gsap.killTweensOf(outPanel);
              gsap.to(outPanel, {
                opacity: 0,
                y: goingForward ? -24 : 24,
                duration: 0.35,
                ease: 'power2.in',
              });
            }
            if (inPanel) {
              gsap.killTweensOf(inPanel);
              gsap.fromTo(
                inPanel,
                { opacity: 0, y: goingForward ? 36 : -36 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.04 }
              );
            }
          }

          // Fill progress bar for active step
          animateProgress(newIndex, stepFrac);
        },
        onLeave() {
          animateProgress(N - 1, 1);
        },
        onLeaveBack() {
          // Reset every panel: hide all except index 0 which gets re-animated in
          panelRefs.current.forEach((panel, i) => {
            if (!panel) return;
            gsap.killTweensOf(panel);
            if (i === 0) {
              gsap.fromTo(panel, { opacity: 0, y: -36 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
            } else {
              gsap.set(panel, { opacity: 0, y: 36 });
            }
          });
          progressRefs.current.forEach((bar) => {
            if (bar) bar.style.transform = 'scaleX(0)';
          });
          activeIndexRef.current = 0;
          setActiveIndex(0);
        },
      });

      // Animate first panel in on mount
      const firstPanel = panelRefs.current[0];
      if (firstPanel) {
        gsap.fromTo(firstPanel, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative bg-white dark:bg-black"
      // Total height: 100vh for the initial view + STEP_VH*N for each cert step
      style={{ height: `calc(100vh + ${N * STEP_VH}vh)` }}
    >
      {/* Sticky container — fills the viewport, pinned by GSAP */}
      <div
        ref={stickyRef}
        className="h-screen w-full flex flex-col"
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-6 shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/60 text-sm font-light text-gray-500 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
            Credentials
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">
            Certifications
          </h2>
        </div>

        {/* Two-column body */}
        <div className="flex-1 min-h-0 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-16 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* LEFT — tab list */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-0 overflow-y-auto">
            {certifications.map((cert, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={cert.id}
                  className="relative group border-b border-gray-100 dark:border-zinc-800/70 last:border-b-0"
                >
                  {/* Thin progress bar underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent overflow-hidden">
                    <div
                      ref={(el) => { progressRefs.current[index] = el; }}
                      className="h-full w-full origin-left bg-black dark:bg-white"
                      style={{ transform: 'scaleX(0)', transition: 'none' }}
                    />
                  </div>

                  <button
                    className={[
                      'w-full text-left py-4 lg:py-5 pr-4 transition-all duration-500 ease-out',
                      isActive ? 'opacity-100' : 'opacity-40 hover:opacity-65',
                    ].join(' ')}
                    onClick={() => {
                      // Scroll to the corresponding step
                      const section = sectionRef.current;
                      if (!section) return;
                      const rect = section.getBoundingClientRect();
                      const sectionTop = window.scrollY + rect.top;
                      const stepHeight = (section.offsetHeight - window.innerHeight) / N;
                      window.scrollTo({ top: sectionTop + index * stepHeight, behavior: 'smooth' });
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={[
                          'mt-0.5 text-xs font-mono tabular-nums shrink-0 transition-colors duration-300',
                          isActive ? 'text-black dark:text-white' : 'text-gray-400 dark:text-zinc-600',
                        ].join(' ')}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={[
                            'font-medium leading-snug transition-all duration-500',
                            isActive
                              ? 'text-sm sm:text-base text-black dark:text-white'
                              : 'text-sm text-gray-500 dark:text-zinc-500',
                          ].join(' ')}
                        >
                          {cert.title}
                        </p>
                        <p
                          className={[
                            'text-xs mt-0.5 transition-all duration-500',
                            isActive
                              ? 'text-gray-500 dark:text-zinc-400 opacity-100 max-h-8'
                              : 'opacity-0 max-h-0',
                          ].join(' ')}
                        >
                          {cert.issuer} · {cert.date}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT — detail panel */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center relative">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                ref={(el) => { panelRefs.current[index] = el; }}
                className="absolute inset-0 flex flex-col justify-center gap-6"
                style={{
                  opacity: index === 0 ? 0 : 0,
                  // Initial state set; GSAP will animate to final
                  pointerEvents: index === activeIndex ? 'auto' : 'none',
                }}
              >
                {/* Certificate image */}
                <div className="relative w-full aspect-[4/3] max-h-[52vh] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/60 dark:from-zinc-900/70 dark:to-zinc-800/40 border border-gray-200/60 dark:border-zinc-700/40 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_64px_-20px_rgba(0,0,0,0.5)]">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.imageAlt}
                    fill
                    className="object-contain p-6"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    priority={index === 0}
                  />
                </div>

                {/* Text details */}
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-zinc-500 font-medium">
                    {cert.issuer} · {cert.date}
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-black dark:text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base font-light leading-relaxed text-gray-600 dark:text-gray-400 max-w-lg">
                    {cert.description}
                  </p>
                </div>

                {/* Counter */}
                <p className="text-xs font-mono text-gray-300 dark:text-zinc-700 tabular-nums">
                  {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile — stacked image */}
          <div className="lg:hidden col-span-1">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-900/40 border border-gray-200/60 dark:border-zinc-700/40">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: index === activeIndex ? 1 : 0, zIndex: index === activeIndex ? 2 : 1 }}
                >
                  <Image src={cert.imageSrc} alt={cert.imageAlt} fill className="object-contain p-4" sizes="92vw" />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-zinc-500">
                {certifications[activeIndex].issuer} · {certifications[activeIndex].date}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {certifications[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
