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
    description: "A semantic Q&A system that lets you ask questions across multiple PDFs and get context-grounded answers. Built as a complete RAG pipeline — SentenceTransformer embeddings, ChromaDB vector search, and a FastAPI backend — it taught me how much retrieval quality shapes what an LLM can answer.",
    link: 'https://github.com/Adhi1755/EmbedMindAI',
  },
  {
    id: 2,
    src: '/images/SkillSpark.png',
    alt: 'SkillSpark',
    description: "An adaptive learning platform my team built at HackVerse, where it won 3rd prize. Quizzes adjust their difficulty to your performance, spaced-repetition flashcards handle long-term retention, and an AI coaching layer assembles personalised interview-prep roadmaps.",
    link: 'https://github.com/Adhi1755/SkillSpark',
  },
  {
    id: 3,
    src: '/images/GalaxyGeeks.png',
    alt: 'GalaxyGeeks',
    description: "The shared home of my hackathon team — utilities, project boilerplates, and documentation that keep multi-member builds consistent. Maintaining it taught me the unglamorous side of collaboration: structure, conventions, and docs people actually read.",
    link: 'https://github.com/Adhi1755/GalaxyGeeks',
  },
  {
    id: 4,
    src: '/images/InventoryManagementSystem.png',
    alt: 'InventoryHub',
    description: "A full-stack inventory management system with JWT authentication, role-based access control, and real-time stock tracking. Product CRUD, low-stock alerts, and a turnover dashboard — my deepest dive so far into designing a backend around real business rules.",
    link: 'https://github.com/Adhi1755/InventoryHub',
  },
  {
    id: 5,
    src: '/images/AgriNova.png',
    alt: 'AgriNova',
    description: "An analytics platform that turns crop yield, soil health, and weather data into practical guidance on irrigation, fertilisation, and harvest timing. Wiring predictive models into a usable interface showed me that impact depends on presentation as much as accuracy.",
    link: 'https://github.com/Adhi1755/AgriNova',
  },
  {
    id: 6,
    src: '/images/GigEconomy.png',
    alt: 'Gig Economy',
    description: "An end-to-end analysis of gig workforce trends — income patterns, regional disparities, and the economics of platform work. Pure EDA, statistics, and visualisation: the project that made me comfortable letting the data lead the story.",
    link: 'https://github.com/Adhi1755/Gig-Economy',
  },
  {
    id: 7,
    src: '/images/PageWhisper.png',
    alt: 'PageWhisper',
    description: "A document assistant that answers natural-language questions about uploaded PDFs with source-cited responses. It chunks and embeds documents at ingestion and runs similarity search at query time — building it alongside EmbedMindAI let me compare RAG design choices directly.",
    link: 'https://github.com/Adhi1755/PageWhisper',
  },
  {
    id: 8,
    src: '/images/FocusSense.png',
    alt: 'FocusSense',
    description: "A deep-work companion I forked and extended: session timers, break scheduling, streak tracking, and analytics that surface your most productive hours. Working inside someone else's codebase — and improving it without breaking it — was the real lesson.",
    link: 'https://github.com/Adhi1755/FocusSense',
  },
  {
    id: 9,
    src: '/images/Orrery-web-app.png',
    alt: 'Orrery Web App',
    description: "Our NASA Space Apps Challenge 2024 build — an interactive 3D solar system driven by real orbital mechanics data, with clickable planets surfacing facts, mission history, and live ephemeris. It won the Art & Technology Award.",
    link: 'https://github.com/Adhi1755/Orrery-web-app',
  },
  {
    id: 10,
    src: '/images/Power-Consumption-Demand-Forecasting.png',
    alt: 'Power Consumption Demand Forecasting',
    description: "Time-series forecasting of electricity demand from historical load and weather features like temperature and season. Benchmarking regression models against LSTMs — with residual analysis and demand-curve visualisations — made this my most rigorous ML evaluation work so far.",
    link: 'https://github.com/Adhi1755/Power-Consumption-Demand-Forecasting',
  },
  {
    id: 11,
    src: '/images/SanctionImpact.png',
    alt: 'SanctionImpact',
    description: "An NLP project that classifies economic sanction documents with transformer models — categorising sanction types, extracting targeted entities, and scoring projected impact. My introduction to applying deep learning to messy, real-world policy text.",
    link: 'https://github.com/Adhi1755/SanctionImpact',
  },
  {
    id: 12,
    src: '/images/Pharma-Sales-Analysis.png',
    alt: 'Pharma Sales Analysis',
    description: "Sales forecasting for pharmaceutical products from historical transaction data, with feature engineering on seasonal and regional variables. Comparing regression models and visualising trends across drug categories sharpened my end-to-end analytics workflow.",
    link: 'https://github.com/Adhi1755/Pharma-Sales-Analysis',
  },
  {
    id: 13,
    src: '/images/Crop-Price-Prediction.png',
    alt: 'Crop Price Prediction',
    description: "Commodity price forecasting from market history, crop yields, and seasonal indicators — comparing Random Forest and Gradient Boosting, with SHAP-based feature importance. Explaining why the model predicts what it does became the real point.",
    link: 'https://github.com/Adhi1755/Crop-Price-Prediction-',
  },
  {
    id: 14,
    src: '/images/Heart_Diseases_Prediction.png',
    alt: 'Heart Diseases Prediction',
    description: "A binary classification pipeline that flags cardiovascular risk from clinical indicators like cholesterol, blood pressure, and ECG features. Preprocessing, class-imbalance handling, and model comparison across Logistic Regression, SVM, and Random Forest — the project where evaluation metrics started to really mean something.",
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

  // Clamp position to keep preview within viewport
  const previewW = 420;
  const previewH = 240;
  const halfW = previewW / 2;
  const halfH = previewH / 2;
  const clampedX = Math.max(halfW + 8, Math.min(cursorPosition.x, (typeof window !== 'undefined' ? window.innerWidth : 1920) - halfW - 8));
  const clampedY = Math.max(halfH + 8, Math.min(cursorPosition.y, (typeof window !== 'undefined' ? window.innerHeight : 1080) - halfH - 8));

  return (
    <div
      className="fixed pointer-events-none z-50 w-105 h-60"
      style={{
        left: `${clampedX}px`,
        top: `${clampedY}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={420}
        height={240}
        className="w-full h-full rounded-sm object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/65 via-black/30 to-transparent rounded-b-sm" />
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium uppercase tracking-[0.15em] text-white text-center px-4">
        {image.alt}
      </p>
    </div>
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

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const ctx = gsap.context(() => {
      const headerEl = headerRef.current;
      const projectItems = projectItemsRef.current.filter((item): item is HTMLDivElement => Boolean(item));
      if (!headerEl || projectItems.length === 0) return;

      if (isTouch) {
        // Ensure items are visible on touch devices — no scroll animations.
        gsap.set([headerEl, ...projectItems], { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
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
            toggleActions: 'play none none none',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Heading slides up through its mask as the header fades in
      gsap.from('.proj-heading-line', {
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
      className="relative bg-[#F2EFE9] border-t border-black/[0.08] overflow-hidden"
    >
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col gap-4">
           
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold uppercase tracking-tight text-black leading-none overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="proj-heading-line inline-block will-change-transform">Selected Work</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg font-light text-gray-600 max-w-xl leading-relaxed">
              Full-stack builds, AI systems, and data work — each chosen for what it taught me.
            </p>
          </div>
          <a
            href="https://github.com/Adhi1755"
            target="_blank"
            rel="noopener noreferrer"
            className="group self-start lg:self-auto inline-flex items-baseline gap-1.5 text-xs font-normal uppercase tracking-[0.22em] text-black"
          >
            <span className="relative">
              All work on GitHub
              <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
            </span>
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
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
              className={`group relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-6 border-b border-black/10 cursor-pointer transition-all duration-300 md:hover:px-2 ${activeImage?.id === image.id ? 'bg-black/[0.03]' : ''
                }`}
              onMouseEnter={() => handleImageHover(image)}
              onClick={() => handleProjectClick(image)}
              data-cursor-text="Open"
            >
              {/* Mobile project image — always visible on mobile */}
              {!isDesktop && (
                <div className="w-full overflow-hidden rounded-sm border border-black/10">
                  <Image
                    src={image.src}
                    className="w-full h-44 sm:h-52 object-cover"
                    alt={image.alt}
                    width={600}
                    height={400}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3
                  className={`text-xl sm:text-2xl lg:text-4xl font-medium uppercase tracking-tight mb-1 sm:mb-2 transition-colors duration-200 ${activeImage?.id === image.id ? 'text-black' : 'text-gray-700'
                    }`}
                >
                  {image.alt}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                  {image.description}
                </p>
              </div>

              <button
                className={`self-start md:self-center flex-shrink-0 p-2.5 sm:p-3 rounded-sm border transition-all duration-300 ${activeImage?.id === image.id
                  ? 'bg-black border-black text-white'
                  : 'border-black/15 text-gray-400 group-hover:border-black group-hover:text-black'
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

          {/* Floating image on hover (desktop) */}
          <FloatingPreview image={activeImage} isDesktop={isDesktop} />
        </div>
      </div>
    </div>
  );
}