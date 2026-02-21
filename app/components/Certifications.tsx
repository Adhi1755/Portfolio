'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Certification Data ─────────────────────────────────────────────────── */

interface CertData {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  description: string;
}

const certifications: CertData[] = [
  {
    id: 1,
    title: 'Machine Learning A-Z',
    issuer: 'Coursera',
    date: 'Apr 2024',
    link: '#',
    description: 'Comprehensive machine learning course covering supervised & unsupervised learning, deep learning, and real-world model deployment strategies.',
  },
  {
    id: 2,
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft Learn',
    date: 'Jan 2024',
    link: '#',
    description: 'Foundational cloud concepts, Azure services, security, privacy, compliance, and Azure pricing & support models.',
  },
  {
    id: 3,
    title: 'Full-Stack Web Development',
    issuer: 'freeCodeCamp',
    date: 'Dec 2023',
    link: '#',
    description: 'End-to-end web development covering responsive design, JavaScript algorithms, front-end libraries, and API development.',
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
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const headerEl = headerRef.current;
        const certItems = certItemsRef.current.filter(Boolean);
        if (!headerEl || certItems.length === 0) return;

        gsap.set(headerEl, { opacity: 0, y: 40 });
        gsap.set(certItems, { opacity: 0, y: 30, scale: 0.98 });

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            end: 'top 30%',
            scrub: 1,
          }
        }).to(headerEl, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

        gsap.timeline({
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
            end: 'bottom 75%',
            scrub: 1.2,
          }
        }).to(certItems, {
          opacity: 1, y: 0, scale: 1, duration: 2,
          stagger: { amount: 1.2, from: 'start', ease: 'power2.out' },
          ease: 'power2.out',
        });

        ScrollTrigger.refresh();
      }, containerRef);
      return () => { ctx.revert(); clearTimeout(timer); };
    }, 100);
    return () => clearTimeout(timer);
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
        <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-gray-100 dark:bg-zinc-900/30 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 -left-24 w-[350px] h-[350px] rounded-full bg-gray-200 dark:bg-zinc-800/20 blur-[90px] opacity-40" />
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
              className={`group relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-6 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-all duration-300 md:hover:px-2 ${activeCert?.id === cert.id ? 'bg-black/[0.02] dark:bg-white/[0.02] rounded-xl' : ''
                }`}
              onMouseEnter={() => handleCertHover(cert)}
              onClick={() => handleCertClick(cert)}
            >
              <div className="flex-1 min-w-0">
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
                className={`self-start md:self-center flex-shrink-0 p-2.5 sm:p-3 rounded-full border transition-all duration-300 ${activeCert?.id === cert.id
                  ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                  : 'border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-gray-500 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white'
                  }`}
              >
                <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

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
