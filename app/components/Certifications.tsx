'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@react-hook/media-query';
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
      'Microsoft certification covering core Azure data services — Data Factory, Cosmos DB, Azure SQL, Databricks, and Data Lake — validating the cloud-data foundations behind my analytics and ML work.',
    imageSrc: '/Certificates/Azure.png',
    imageAlt: 'Microsoft Azure Data Fundamentals Certificate',
  },
  {
    id: 2,
    title: 'Galactic Problem Solver',
    issuer: 'NASA International Space Apps Challenge',
    date: 'Oct 2024',
    description:
      'Recognition for competing in the NASA International Space Apps Challenge 2024 — building a space-tech solution with my team over one intense weekend, alongside a global community of participants.',
    imageSrc: '/Certificates/Problemslover.png',
    imageAlt: 'NASA Space Apps Galactic Problem Solver Certificate',
  },
  {
    id: 3,
    title: 'Art & Technology Award',
    issuer: 'NASA International Space Apps Challenge',
    date: 'Oct 2024',
    description:
      'Winner at NASA Space Apps Challenge 2024 — awarded for the Orrery Web App, our interactive 3D solar system, judged on combining technical execution with creative presentation.',
    imageSrc: '/Certificates/ArtandTech.png',
    imageAlt: 'NASA Space Apps Art and Technology Award Certificate',
  },
  {
    id: 4,
    title: 'Power BI for Business Intelligence',
    issuer: 'IEEE · Dayananda Sagar University',
    date: 'Oct 2024',
    description:
      'IEEE workshop certification covering the full Power BI workflow — data import, transformation, dashboards, maps, and slicers — the foundation of my business-intelligence and data-visualization work.',
    imageSrc: '/Certificates/PowerBi.png',
    imageAlt: 'Power BI for Business Intelligence Certificate',
  },
  {
    id: 5,
    title: 'Python (Basic)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    description:
      'HackerRank skills verification of core Python — problem solving, syntax, and standard programming constructs — part of my ongoing fundamentals practice for placements.',
    imageSrc: '/Certificates/Hakerrank.png',
    imageAlt: 'HackerRank Python Basic Certificate',
  },
  {
    id: 6,
    title: 'HackVerse 2025 — 3rd Prize',
    issuer: 'IEEE · Dayananda Sagar University',
    date: '2025',
    description:
      'Won 3rd prize at HackVerse for SkillSpark, an adaptive learning platform my team built with React Native, RAG, Google Gemini, and Node.js — then pitched live to the judging panel.',
    imageSrc: '/Certificates/Hackverse.png',
    imageAlt: 'Hackverse 2025 Participation Certificate',
  },
  {
    id: 7,
    title: 'Global Nominee 2025',
    issuer: 'NASA International Space Apps Challenge',
    date: 'Oct 2025',
    description:
      'Selected as a Global Nominee at NASA Space Apps Challenge 2025 for a project combining React Native, machine learning, and MongoDB — our team’s second consecutive year reaching the global judging round.',
    imageSrc: '/Certificates/GlobalNominee.png',
    imageAlt: 'NASA Space Apps Global Nominee 2025 Certificate',
  },
];

/* ── Floating certificate preview that follows the cursor (desktop) ── */
function FloatingPreview({ cert, isDesktop }: { cert: CertData | null; isDesktop: boolean }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  const hasPositionRef = useRef(false);

  useEffect(() => {
    if (!isDesktop || !cert) return;

    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        if (!hasPositionRef.current) {
          prevCursorPosition.current = { x: clientX, y: clientY };
          hasPositionRef.current = true;
          setCursorPosition({ x: clientX, y: clientY });
          requestRef.current = null;
          return;
        }

        const dx = clientX - prevCursorPosition.current.x;
        const dy = clientY - prevCursorPosition.current.y;
        const easeAmount = 0.2;
        const newX = prevCursorPosition.current.x + dx * easeAmount;
        const newY = prevCursorPosition.current.y + dy * easeAmount;

        setCursorPosition({ x: newX, y: newY });
        prevCursorPosition.current = { x: newX, y: newY };
        requestRef.current = null;
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      hasPositionRef.current = false;
    };
  }, [isDesktop, cert]);

  if (!isDesktop || !cert) return null;

  // Clamp position to keep the preview within the viewport
  const previewW = 440;
  const previewH = 320;
  const halfW = previewW / 2;
  const halfH = previewH / 2;
  const clampedX = Math.max(halfW + 8, Math.min(cursorPosition.x, (typeof window !== 'undefined' ? window.innerWidth : 1920) - halfW - 8));
  const clampedY = Math.max(halfH + 8, Math.min(cursorPosition.y, (typeof window !== 'undefined' ? window.innerHeight : 1080) - halfH - 8));

  return (
    <div
      className="fixed pointer-events-none z-50 w-[440px]"
      style={{
        left: `${clampedX}px`,
        top: `${clampedY}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Certificate rendered as a document: white mat, hairline border */}
      <div className="bg-white border border-black/10 rounded-sm p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]">
        <Image
          src={cert.imageSrc}
          alt={cert.imageAlt}
          width={900}
          height={640}
          className="w-full h-auto max-h-[300px] object-contain rounded-sm"
        />
      </div>
    </div>
  );
}

/* ── Section ── */
export default function Certifications() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeCert, setActiveCert] = useState<CertData | null>(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 5;
  const visibleCerts = showAll ? certifications : certifications.slice(0, INITIAL_COUNT);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const certItemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useGSAP(() => {
    if (!isClient || !containerRef.current) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const ctx = gsap.context(() => {
      const headerEl = headerRef.current;
      const certItems = certItemsRef.current.filter((item): item is HTMLDivElement => Boolean(item));
      if (!headerEl || certItems.length === 0) return;

      if (isTouch) {
        // Ensure items are visible on touch devices — no scroll animations.
        gsap.set([headerEl, ...certItems], { opacity: 1, y: 0, clearProps: 'all' });
        return;
      }

      gsap.fromTo(
        headerEl,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Heading slides up through its mask as the header fades in
      gsap.from('.cert-heading-line', {
        yPercent: 110,
        duration: 0.9,
        ease: 'power4.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(certItems, { opacity: 0, y: 20 });

      ScrollTrigger.batch(certItems, {
        start: 'top 95%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [isClient, showAll]);

  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      id="certifications"
      className="relative bg-[#F2EFE9] border-t border-black/[0.08] overflow-hidden"
    >
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16 flex flex-col gap-4">
         
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold uppercase tracking-tight text-black leading-none overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span className="cert-heading-line inline-block will-change-transform">Recognition</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-light text-gray-600 max-w-xl leading-relaxed">
            Certifications and awards, earned along the way.
          </p>
        </div>

        {/* Certifications list */}
        <div className="relative" onMouseLeave={() => setActiveCert(null)}>
          {visibleCerts.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => { certItemsRef.current[index] = el; }}
              className={`group relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-6 border-b border-black/10 transition-all duration-300 md:hover:px-2 ${activeCert?.id === cert.id ? 'bg-black/[0.03]' : ''
                }`}
              onMouseEnter={() => setActiveCert(cert)}
            >
              {/* Mobile certificate image — always visible on mobile */}
              {!isDesktop && (
                <div className="w-full rounded-sm border border-black/10 bg-white p-3">
                  <Image
                    src={cert.imageSrc}
                    className="w-full h-auto object-contain rounded-sm"
                    alt={cert.imageAlt}
                    width={900}
                    height={640}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3
                  className={`text-xl sm:text-2xl lg:text-4xl font-medium uppercase tracking-tight mb-1 sm:mb-2 transition-colors duration-200 ${activeCert?.id === cert.id ? 'text-black' : 'text-gray-700'
                    }`}
                >
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base font-light text-gray-500 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                  {cert.description}
                </p>
              </div>

              {/* Issuer · date meta */}
              <p className="self-start md:self-center shrink-0 text-[10px] sm:text-[11px] font-light uppercase tracking-[0.22em] text-gray-400 md:text-right">
                {cert.issuer}
                <span className="block mt-1 text-gray-300">{cert.date}</span>
              </p>

              {/* Hover underline indicator */}
              <div
                className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300 ease-out ${activeCert?.id === cert.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
              />
            </div>
          ))}

          {/* Show More / Show Less */}
          {certifications.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  setShowAll((prev) => !prev);
                  setTimeout(() => ScrollTrigger.refresh(), 100);
                }}
                className="group inline-flex items-baseline gap-1.5 text-xs font-normal uppercase tracking-[0.22em] text-black"
              >
                <span className="relative">
                  {showAll ? 'Show Less' : 'Show More'}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
                </span>
                <span className={`inline-block transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>↓</span>
              </button>
            </div>
          )}

          {/* Floating certificate preview on hover (desktop) */}
          <FloatingPreview cert={activeCert} isDesktop={isDesktop} />
        </div>
      </div>
    </div>
  );
}
