'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveUpRight } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Certification Data ─────────────────────────────────────────────────── */

interface CertData {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link?: string;
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
    link: '#',
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
    link: '#',
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
    link: '#',
    description:
      'Awarded the Art & Technology Award for developing a creative and technically impactful solution during NASA Space Apps Challenge 2024.',
    imageSrc: '/Certificates/ArtandTech.png',
    imageAlt: 'NASA Space Apps Art and Technology Award Certificate',
  },
  {
    id: 4,
    title: 'Power BI for Business Intelligence: Unlocking Data-Driven Decisions',
    issuer: 'IEEE Information Theory Society, Dayananda Sagar University',
    date: 'Oct 2024',
    link: '#',
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
    link: '#',
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
    link: '#',
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
    link: '#',
    description:
      'Recognized as a Global Nominee in NASA International Space Apps Challenge 2025 for an innovative project integrating React Native, Machine Learning, Tailwind CSS, and MongoDB.',
    imageSrc: '/Certificates/GlobalNominee.png',
    imageAlt: 'NASA Space Apps Global Nominee 2025 Certificate',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function Certifications() {
  const [activeCert, setActiveCert] = useState<CertData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const certItemsRef = useRef<HTMLDivElement[]>([]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const handleCertHover = useCallback((cert: CertData) => {
    if (activeCert !== cert) {
      setActiveCert(cert);
    }
  }, [activeCert]);

  const handleMouseLeave = useCallback(() => {
    setActiveCert(null);
  }, []);

  const handleCertClick = (cert: CertData) => {
    if (cert.link) window.open(cert.link, '_blank', 'noopener,noreferrer');
  };

  useGSAP(() => {
    if (!isClient || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const headerEl = headerRef.current;
      const certItems = certItemsRef.current.filter(Boolean);
      if (!headerEl || certItems.length === 0) return;

      gsap.set(headerEl, { opacity: 0, y: 28 });
      gsap.set(certItems, { opacity: 0, y: 20, scale: 0.99 });

      gsap.to(headerEl, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      ScrollTrigger.batch(certItems, {
        start: 'top 96%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <section
      ref={containerRef}
      id="certifications"
      className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-100 h-100 rounded-full bg-gray-100 dark:bg-zinc-900/30 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 -left-24 w-87.5 h-87.5 rounded-full bg-gray-200 dark:bg-zinc-800/20 blur-[90px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
            Credentials
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">
            Certifications
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-light text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            Validated milestones in my learning journey — each one a step toward mastery.
          </p>
        </div>

        {/* Certifications list */}
        <div
          ref={listRef}
          className="relative"
          onMouseLeave={handleMouseLeave}
        >
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => { if (el) certItemsRef.current[index] = el; }}
              className={`group relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-6 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-all duration-300 md:hover:px-2 ${activeCert?.id === cert.id ? 'bg-black/2 dark:bg-white/2 rounded-xl md:pr-96 lg:pr-104' : ''
                }`}
              onMouseEnter={() => handleCertHover(cert)}
              onClick={() => handleCertClick(cert)}
            >
              <div className="relative z-0 flex-1 min-w-0 max-w-full">
                {/* Issuer + Date */}
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500">
                    {cert.issuer}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-600" />
                  <span className="text-xs font-light text-gray-400 dark:text-gray-500">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl sm:text-2xl lg:text-4xl font-medium tracking-tight mb-1 sm:mb-2 transition-colors duration-200 ${activeCert?.id === cert.id ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm lg:text-base font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                  {cert.description}
                </p>
              </div>

              {/* Arrow button */}
              <button
                className={`relative z-10 self-start md:self-center shrink-0 md:mr-3 p-2.5 sm:p-3 rounded-full border transition-all duration-300 ${activeCert?.id === cert.id
                  ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                  : 'border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-gray-500 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white'
                  }`}
              >
                <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div
                className={`hidden md:flex pointer-events-none absolute z-30 inset-y-0 right-0 w-72 items-center justify-center overflow-hidden shadow-xl shadow-black/15 transition-all duration-500 ease-out ${activeCert?.id === cert.id
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-full opacity-0'
                  }`}
              >
                <Image
                  src={cert.imageSrc}
                  alt={cert.imageAlt}
                  width={1200}
                  height={800}
                  className="h-full w-auto object-contain"
                  sizes="288px"
                />
              </div>

              {/* Hover underline indicator */}
              <div
                className={`absolute bottom-0 left-0 h-[1.5px] bg-black dark:bg-white transition-all duration-300 ease-out ${activeCert?.id === cert.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
