'use client'
import { useEffect, useRef, useState } from 'react';
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
    src: '/images/EmbedMindAI.png',
    alt: 'EmbedMindAI',
    description: "EmbedMindAI — AI-powered PDF embedding and semantic question-answering system.",
    link: 'https://github.com/Adhi1755/EmbedMindAI',
  },
  {
    id: 2,
    src: '/images/SkillSpark.png',
    alt: 'SkillSpark',
    description: "SkillSpark — AI-powered adaptive learning and interview preparation platform.",
    link: 'https://github.com/Adhi1755/SkillSpark',
  },
  {
    id: 3,
    src: '/images/GalaxyGeeks.png',
    alt: 'GalaxyGeeks',
    description: "GalaxyGeeks — Collaborative team-based project repository.",
    link: 'https://github.com/Adhi1755/GalaxyGeeks',
  },
  {
    id: 4,
    src: '/images/InventoryManagementSystem.png',
    alt: 'InventoryHub',
    description: "InventoryHub — Full-stack inventory management system with authentication and real-time stock tracking.",
    link: 'https://github.com/Adhi1755/InventoryHub',
  },
  {
    id: 5,
    src: '/images/AgriNova.png',
    alt: 'AgriNova',
    description: "AgriNova — AI-based agriculture project focused on improving farming analytics and insights.",
    link: 'https://github.com/Adhi1755/AgriNova',
  },
  {
    id: 6,
    src: '/images/GigEconomy.png',
    alt: 'Gig Economy',
    description: "Gig Economy — Data analysis project exploring gig workforce trends and economic insights.",
    link: 'https://github.com/Adhi1755/Gig-Economy',
  },
  {
    id: 7,
    src: '/images/PageWhisper.png',
    alt: 'PageWhisper',
    description: "PageWhisper — RAG-based intelligent document assistant for querying PDF content.",
    link: 'https://github.com/Adhi1755/PageWhisper',
  },
  
  {
    id: 8,
    src: '/images/FocusSense.png',
    alt: 'FocusSense',
    description: "FocusSense — Productivity tracking web application (forked project) for monitoring focus sessions.",
    link: 'https://github.com/Adhi1755/FocusSense',
  },
  {
    id: 9,
    src: '/images/Orrery-web-app.png',
    alt: 'Orrery Web App',
    description: "Orrery Web App — NASA Space Apps Challenge 2024 project simulating the solar system with interactive planetary orbits.",
    link: 'https://github.com/Adhi1755/Orrery-web-app',
  },  
  {
    id: 10,
    src: '/images/Power-Consumption-Demand-Forecasting.png',
    alt: 'Power Consumption Demand Forecasting',
    description: "Electricity Demand Forecasting — A data-driven ML project predicting future power usage using time series data and weather patterns.",
    link: 'https://github.com/Adhi1755/Power-Consumption-Demand-Forecasting',
  },
  {
    id: 11,
    src: '/images/SanctionImpact.png',
    alt: 'SanctionImpact',
    description: "SanctionImpact — AI/NLP deep learning project for analyzing and classifying economic sanction policies.",
    link: 'https://github.com/Adhi1755/SanctionImpact',
  },
  {
    id: 12,
    src: '/images/Pharma-Sales-Analysis.png',
    alt: 'Pharma Sales Analysis',
    description: "Pharma Sales Analysis — Data-science project forecasting pharmaceutical sales trends using historical data.",
    link: 'https://github.com/Adhi1755/Pharma-Sales-Analysis',
  },
  {
    id: 13,
    src: '/images/Crop-Price-Prediction.png',
    alt: 'Crop Price Prediction',
    description: "Crop Price Prediction — Machine learning regression model predicting agricultural crop prices.",
    link: 'https://github.com/Adhi1755/Crop-Price-Prediction-',
  },
  {
    id: 14,
    src: '/images/Heart_Diseases_Prediction.png',
    alt: 'Heart Diseases Prediction',
    description: "Heart Disease Prediction — ML classification pipeline identifying at-risk patients using medical indicators.",
    link: 'https://github.com/Adhi1755/Heart_Diseases_Prediction',
  },
];

function FloatingPreview({ image, isDesktop }: { image: ImageData | null; isDesktop: boolean }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  const hasPositionRef = useRef(false);

  useEffect(() => {
    if (!isDesktop || !image) return;

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
  }, [isDesktop, image]);

  if (!isDesktop || !image) return null;

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={420}
      height={240}
      className="fixed pointer-events-none z-50 w-[420px] h-[240px] rounded-2xl object-cover shadow-2xl shadow-black/20"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

export default function Projects() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeImage, setActiveImage] = useState<ImageData | null>(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 4;
  const visibleProjects = showAll ? images : images.slice(0, INITIAL_COUNT);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectItemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const handleImageHover = (image: ImageData) => {
    setActiveImage(image);
  };

  const handleMouseLeave = () => {
    setActiveImage(null);
  };

  const handleProjectClick = (image: ImageData) => {
    if (image.link) window.open(image.link, '_blank', 'noopener,noreferrer');
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useGSAP(() => {
    if (!isClient || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const headerEl = headerRef.current;
      const projectItems = projectItemsRef.current.filter((item): item is HTMLDivElement => Boolean(item));
      if (!headerEl || projectItems.length === 0) return;

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
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      gsap.set(projectItems, { opacity: 0, y: 20, scale: 0.99 });

      ScrollTrigger.batch(projectItems, {
        start: 'top 95%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
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
      id="projects"
      className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* Background orbs — neutral B&W */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-gray-100 dark:bg-zinc-900/30 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 -left-24 w-[350px] h-[350px] rounded-full bg-gray-200 dark:bg-zinc-800/20 blur-[90px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
              Recent Works
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">
              Projects
            </h2>
            <p className="text-sm sm:text-base lg:text-lg font-light text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              Combining AI, web development, and problem-solving to build practical, real-world solutions.
            </p>
          </div>
          <button
            onClick={() => window.open('https://github.com/Adhi1755', '_blank')}
            className="self-start lg:self-auto flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 font-light text-sm tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub
          </button>
        </div>

        {/* Projects list */}
        <div
          className="relative"
          onMouseLeave={handleMouseLeave}
        >
          {visibleProjects.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => { projectItemsRef.current[index] = el; }}
              className={`group relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-6 border-b border-gray-200 dark:border-zinc-800 cursor-pointer transition-all duration-300 md:hover:px-2 ${activeImage?.id === image.id ? 'bg-black/[0.02] dark:bg-white/[0.02] rounded-xl' : ''
                }`}
              onMouseEnter={() => handleImageHover(image)}
              onClick={() => handleProjectClick(image)}
            >
              {/* Mobile project image — always visible on mobile */}
              {!isDesktop && (
                <div className="w-full overflow-hidden rounded-2xl">
                  <Image
                    src={image.src}
                    className="w-full h-44 sm:h-52 object-cover rounded-2xl"
                    alt={image.alt}
                    width={600}
                    height={400}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3
                  className={`text-xl sm:text-2xl lg:text-4xl font-medium tracking-tight mb-1 sm:mb-2 transition-colors duration-200 ${activeImage?.id === image.id ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {image.alt}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                  {image.description}
                </p>
              </div>

              <button
                className={`self-start md:self-center flex-shrink-0 p-2.5 sm:p-3 rounded-full border transition-all duration-300 ${activeImage?.id === image.id
                  ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                  : 'border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-gray-500 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white'
                  }`}
              >
                <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Hover underline indicator */}
              <div
                className={`absolute bottom-0 left-0 h-[1.5px] bg-black dark:bg-white transition-all duration-300 ease-out ${activeImage?.id === image.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
              />
            </div>
          ))}

          {/* Show More / Show Less button */}
          {images.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  setShowAll((prev) => !prev);
                  setTimeout(() => ScrollTrigger.refresh(), 100);
                }}
                className="flex items-center gap-2 px-7 py-3 rounded-full border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 font-light text-sm tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
              >
                {showAll ? 'Show Less' : 'Show More'}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* Floating image on hover (desktop) */}
          <FloatingPreview image={activeImage} isDesktop={isDesktop} />
        </div>
      </div>
    </div>
  );
}