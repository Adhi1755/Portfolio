'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@react-hook/media-query';
import { MoveUpRight } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ImageData {
  id: number;
  src: string;
  alt: string;
  description: string;
  link?: string;
}

const images: ImageData[] = [
  {
    id: 1,
    src: '/images/InventoryManagementSystem.png',
    alt: 'Inventory Management System',
    description: "Built using Flask — showcases full-stack development, user authentication, Chart.js data visualization, responsive UI, SQL database management, and real-time inventory tracking.",
    link: 'https://github.com/Adhi1755/InventoryHub',
  },
  {
    id: 2,
    src: '/images/HeartPredict.png',
    alt: 'Heart Disease Prediction',
    description: "ML models that identify at-risk patients based on health indicators using Python, Pandas, Scikit-learn, Logistic Regression, and Random Forest with full EDA pipeline.",
    link: 'https://github.com/Adhi1755/Heat_Diseases_Prediction',
  },
  {
    id: 3,
    src: '/images/Orrery-web-app.png',
    alt: 'Orrery Web App',
    description: "Built for NASA Space Apps Challenge 2024 — visually simulates the solar system with animated planetary orbits, interactive planet details, crafted with HTML, CSS, and JavaScript.",
    link: 'https://github.com/Adhi1755/Orrery-web-app',
  },
  {
    id: 4,
    src: '/images/Portfolio.png',
    alt: 'Portfolio',
    description: "This portfolio — built with Next.js, Tailwind CSS, and GSAP animations to showcase my work and skills, practicing modern web development, UI design, and interactive animations.",
    link: '#home',
  },
];

export default function Projects() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeImage, setActiveImage] = useState<ImageData | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const projectItemsRef = useRef<HTMLDivElement[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;
    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };
    window.addEventListener('mousemove', updateCursorPosition);
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove]);

  const handleImageHover = useCallback((image: ImageData) => {
    if (activeImage !== image) {
      setActiveImage(image);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => { setOpacity(1); setScale(1); }, 50);
    } else {
      setOpacity(1); setScale(1);
    }
  }, [activeImage]);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0); setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveImage(null), 300);
  }, []);

  const handleProjectClick = (image: ImageData) => {
    if (image.link) window.open(image.link, '_blank', 'noopener,noreferrer');
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useGSAP(() => {
    if (!isClient || !containerRef.current) return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const headerEl = headerRef.current;
        const projectItems = projectItemsRef.current.filter(Boolean);
        if (!headerEl || projectItems.length === 0) return;

        gsap.set(headerEl, { opacity: 0, y: 40 });
        gsap.set(projectItems, { opacity: 0, y: 30, scale: 0.98 });

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
        }).to(projectItems, {
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
    <div
      ref={containerRef}
      id="projects"
      className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-sky-50 dark:bg-sky-950/20 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 -left-24 w-[350px] h-[350px] rounded-full bg-violet-50 dark:bg-violet-950/15 blur-[90px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">

        {/* Header */}
        <div ref={headerRef} className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Recent Works
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">
              Projects
            </h2>
            <p className="text-base sm:text-lg font-light text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              Combining AI, web development, and problem-solving to build practical, real-world solutions.
            </p>
          </div>
          <button
            onClick={() => window.open('https://github.com/Adhi1755', '_blank')}
            className="self-start lg:self-auto flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 font-light text-sm tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub
          </button>
        </div>

        {/* Projects list */}
        <div
          ref={listRef}
          className="relative"
          onMouseLeave={handleMouseLeave}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => { if (el) projectItemsRef.current[index] = el; }}
              className={`group relative flex items-center justify-between gap-6 py-6 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-all duration-300 hover:px-2 ${activeImage?.id === image.id ? 'bg-black/[0.02] dark:bg-white/[0.02] rounded-xl' : ''
                }`}
              onMouseEnter={() => handleImageHover(image)}
              onClick={() => handleProjectClick(image)}
            >
              {/* Mobile image */}
              {!isDesktop && (
                <Image
                  src={image.src}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                  alt={image.alt}
                  width={600}
                  height={400}
                />
              )}

              <div className="flex-1">
                <h3
                  className={`text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-2 transition-colors duration-200 ${activeImage?.id === image.id ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {image.alt}
                </h3>
                <p className="text-sm sm:text-base font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                  {image.description}
                </p>
              </div>

              <button
                className={`flex-shrink-0 p-3 rounded-full border transition-all duration-300 ${activeImage?.id === image.id
                    ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                    : 'border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-gray-500 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white'
                  }`}
              >
                <MoveUpRight className="w-5 h-5" />
              </button>

              {/* Hover underline indicator */}
              <div
                className={`absolute bottom-0 left-0 h-[1.5px] bg-black dark:bg-white transition-all duration-300 ease-out ${activeImage?.id === image.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
              />
            </div>
          ))}

          {/* Floating image on hover (desktop) */}
          {isDesktop && activeImage && (
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={420}
              height={240}
              className="fixed pointer-events-none z-50 w-[420px] h-[240px] rounded-2xl object-cover shadow-2xl shadow-black/20"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: opacity,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}