'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
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
    issuer: 'IEEE · Dayananda Sagar University',
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
    issuer: 'IEEE · Dayananda Sagar University',
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
const STEP_VH = 80;

/* ── Desktop: scroll-pinned interactive layout ── */
function DesktopCertifications() {
  const sectionRef  = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const animateProgress = useCallback((index: number, fill: number) => {
    const bar = progressRefs.current[index];
    if (bar) {
      bar.style.transform = `scaleX(${fill})`;
      bar.style.opacity = fill >= 1 ? '0.25' : '1';
    }
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    if (!section || !sticky) return;

    imgRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: sticky,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const raw = self.progress * N;
        const newIndex = Math.min(N - 1, Math.floor(raw));
        const stepFrac = raw - Math.floor(raw);

        if (newIndex !== activeIndexRef.current) {
          const prevIndex = activeIndexRef.current;
          const goingForward = newIndex > prevIndex;

          animateProgress(prevIndex, goingForward ? 1 : 0);
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);

          const outImg = imgRefs.current[prevIndex];
          const inImg  = imgRefs.current[newIndex];
          if (outImg) { gsap.killTweensOf(outImg); gsap.to(outImg, { opacity: 0, duration: 0.3, ease: 'power2.in' }); }
          if (inImg)  { gsap.killTweensOf(inImg);  gsap.fromTo(inImg, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.05 }); }
        }

        animateProgress(newIndex, stepFrac);
      },
      onLeave() { animateProgress(N - 1, 1); },
      onLeaveBack() {
        imgRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.killTweensOf(el);
          gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: 1 });
        });
        progressRefs.current.forEach((bar) => {
          if (bar) { bar.style.transform = 'scaleX(0)'; bar.style.opacity = '1'; }
        });
        activeIndexRef.current = 0;
        setActiveIndex(0);
      },
    });

    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative hidden lg:block bg-white dark:bg-black transition-colors duration-300"
      style={{ height: `calc(100vh + ${N * STEP_VH}vh)` }}
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '38px 38px' }}
        />
      </div>

      <div ref={stickyRef} className="relative z-10 h-screen w-full flex flex-col">

        {/* Header */}
        <div className="max-w-7xl mx-auto w-full px-10 lg:px-16 pt-24 lg:pt-28 pb-6 shrink-0">
          <p className="text-xs font-light tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500">
            04 — Credentials
          </p>
          <h2 className="mt-3 text-6xl lg:text-7xl font-semibold tracking-tighter text-black dark:text-white leading-none">
            Certifications
          </h2>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 max-w-7xl mx-auto w-full px-10 lg:px-16 pb-10 grid grid-cols-[1fr_1.1fr] gap-14">

          {/* Left: list */}
          <div className="flex flex-col justify-center overflow-y-auto pr-1">
            {certifications.map((c, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={c.id} className="relative border-b border-gray-100 dark:border-zinc-900 last:border-b-0">
                  <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                    <div
                      ref={(el) => { progressRefs.current[index] = el; }}
                      className="h-full w-full origin-left bg-black dark:bg-white"
                      style={{ transform: 'scaleX(0)', transition: 'opacity 0.4s ease' }}
                    />
                  </div>
                  <button
                    className="w-full text-left py-5 transition-all duration-300"
                    onClick={() => {
                      const section = sectionRef.current;
                      if (!section) return;
                      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
                      const stepHeight = (section.offsetHeight - window.innerHeight) / N;
                      window.scrollTo({ top: sectionTop + index * stepHeight, behavior: 'smooth' });
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`mt-1 text-sm font-mono tabular-nums shrink-0 transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-gray-300 dark:text-zinc-700'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`leading-snug transition-all duration-300 ${isActive ? 'text-xl font-semibold text-black dark:text-white' : 'text-lg font-light text-gray-400 dark:text-zinc-600'}`}>
                          {c.title}
                        </p>
                        <p className={`text-sm font-light tracking-wide transition-all duration-300 overflow-hidden ${isActive ? 'text-gray-400 dark:text-zinc-500 opacity-100 max-h-7 mt-1' : 'opacity-0 max-h-0 mt-0'}`}>
                          {c.issuer} · {c.date}
                        </p>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                          <p className="text-base font-light leading-relaxed text-gray-500 dark:text-gray-400">
                            {c.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: image */}
          <div className="flex flex-col justify-center items-center relative">
            <div className="relative w-full h-full flex items-center justify-center">
              {certifications.map((c, index) => (
                <div
                  key={c.id}
                  ref={(el) => { imgRefs.current[index] = el; }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{ opacity: 0 }}
                >
                  <Image
                    src={c.imageSrc}
                    alt={c.imageAlt}
                    width={900}
                    height={640}
                    className="w-full h-auto max-h-[55vh] object-contain rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50"
                    sizes="50vw"
                    priority={index === 0}
                  />
                  <div className="text-center">
                    <p className="text-sm font-light tracking-[0.2em] uppercase text-gray-400 dark:text-zinc-500">{c.issuer}</p>
                    <p className="mt-1 text-sm font-mono tabular-nums text-gray-300 dark:text-zinc-700">
                      {c.date} · {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile: plain scrollable cards ── */
function MobileCertifications() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No scroll reveal on mobile — cards render visibly by default
    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="certifications"
      className="lg:hidden relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '38px 38px' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8 pt-20 pb-20">

        {/* Header */}
        <p className="text-xs font-light tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-3">
          04 — Credentials
        </p>
        <h2 className="text-5xl sm:text-6xl font-semibold tracking-tighter text-black dark:text-white leading-none mb-12">
          Certifications
        </h2>

        {/* Cards */}
        <div className="flex flex-col gap-10">
          {certifications.map((c, i) => (
            <div key={c.id} className="cert-card flex flex-col gap-4">
              {/* Index */}
              <span className="text-xs font-mono tabular-nums text-gray-300 dark:text-zinc-700">
                {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
              </span>

              {/* Image */}
              <div className="w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 p-4">
                <Image
                  src={c.imageSrc}
                  alt={c.imageAlt}
                  width={900}
                  height={640}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 640px) 90vw, 600px"
                  priority={i === 0}
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-xs font-light tracking-widest uppercase text-gray-400 dark:text-zinc-500 mb-1">
                  {c.issuer} · {c.date}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-black dark:text-white leading-snug mb-2">
                  {c.title}
                </h3>
                <p className="text-base font-light leading-relaxed text-gray-500 dark:text-gray-400">
                  {c.description}
                </p>
              </div>

              {/* Divider */}
              {i < N - 1 && <div className="h-px bg-gray-100 dark:bg-zinc-900 mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <>
      <DesktopCertifications />
      <MobileCertifications />
    </>
  );
}
