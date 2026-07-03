'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    description: "EmbedMindAI — Semantic PDF Q&A system built with a full RAG pipeline using SentenceTransformers for dense embeddings, ChromaDB as the vector store, and a FastAPI backend. Supports multi-document ingestion, chunk-level retrieval, and context-grounded answer generation.",
    link: 'https://github.com/Adhi1755/EmbedMindAI',
  },
  {
    id: 2,
    src: '/images/SkillSpark.png',
    alt: 'SkillSpark',
    description: "SkillSpark — AI-powered adaptive learning platform built at Hackverse. Features dynamically generated quizzes that adjust difficulty based on performance, spaced-repetition flashcards for long-term retention, and an AI coaching layer that personalises interview prep roadmaps.",
    link: 'https://github.com/Adhi1755/SkillSpark',
  },
  {
    id: 3,
    src: '/images/GalaxyGeeks.png',
    alt: 'GalaxyGeeks',
    description: "GalaxyGeeks — Centralised collaborative repository for the GalaxyGeeks team, housing shared utilities, project boilerplates, and cross-team documentation to streamline multi-member development workflows.",
    link: 'https://github.com/Adhi1755/GalaxyGeeks',
  },
  {
    id: 4,
    src: '/images/InventoryManagementSystem.png',
    alt: 'InventoryHub',
    description: "InventoryHub — Full-stack inventory management system with JWT-based authentication, role-based access control, and real-time stock tracking. Supports CRUD operations on products, low-stock alerts, and an analytics dashboard for inventory turnover insights.",
    link: 'https://github.com/Adhi1755/InventoryHub',
  },
  {
    id: 5,
    src: '/images/AgriNova.png',
    alt: 'AgriNova',
    description: "AgriNova — AI-driven agriculture analytics platform that processes crop yield, soil health, and weather data to surface actionable farming insights. Integrates predictive models to help farmers make data-informed decisions on irrigation, fertilisation, and harvest timing.",
    link: 'https://github.com/Adhi1755/AgriNova',
  },
  {
    id: 6,
    src: '/images/GigEconomy.png',
    alt: 'Gig Economy',
    description: "Gig Economy — End-to-end data analysis project exploring gig workforce trends across sectors. Combines EDA, statistical analysis, and visualisations to uncover income patterns, regional disparities, and the economic impact of platform-based employment.",
    link: 'https://github.com/Adhi1755/Gig-Economy',
  },
  {
    id: 7,
    src: '/images/PageWhisper.png',
    alt: 'PageWhisper',
    description: "PageWhisper — RAG-based intelligent document assistant that lets users query PDF content in natural language. Chunks and embeds documents at ingestion time, performs similarity search at query time, and returns precise, source-cited answers grounded in the uploaded material.",
    link: 'https://github.com/Adhi1755/PageWhisper',
  },
  {
    id: 8,
    src: '/images/FocusSense.png',
    alt: 'FocusSense',
    description: "FocusSense — Productivity web application (forked and extended) for tracking deep-work focus sessions. Provides session timers, break scheduling, daily streak tracking, and visual analytics to help users identify peak productivity windows.",
    link: 'https://github.com/Adhi1755/FocusSense',
  },
  {
    id: 9,
    src: '/images/Orrery-web-app.png',
    alt: 'Orrery Web App',
    description: "Orrery Web App — NASA Space Apps Challenge 2024 submission simulating real-time solar system dynamics. Renders interactive 3D planetary orbits using orbital mechanics data, with clickable bodies that surface planet facts, mission history, and current ephemeris information.",
    link: 'https://github.com/Adhi1755/Orrery-web-app',
  },
  {
    id: 10,
    src: '/images/Power-Consumption-Demand-Forecasting.png',
    alt: 'Power Consumption Demand Forecasting',
    description: "Electricity Demand Forecasting — Time-series ML project predicting future power consumption by combining historical load data with weather features (temperature, humidity, season). Benchmarks multiple regression and LSTM-based models, with residual analysis and demand-curve visualisations.",
    link: 'https://github.com/Adhi1755/Power-Consumption-Demand-Forecasting',
  },
  {
    id: 11,
    src: '/images/SanctionImpact.png',
    alt: 'SanctionImpact',
    description: "SanctionImpact — NLP and deep learning project for classifying and analysing economic sanction policy documents. Uses transformer-based text classification to categorise sanction types, extract targeted entities, and quantify projected economic impact scores from policy text.",
    link: 'https://github.com/Adhi1755/SanctionImpact',
  },
  {
    id: 12,
    src: '/images/Pharma-Sales-Analysis.png',
    alt: 'Pharma Sales Analysis',
    description: "Pharma Sales Analysis — Data science project forecasting pharmaceutical product sales using historical transaction data. Applies feature engineering on seasonal and regional variables, evaluates multiple regression models, and visualises sales trends across drug categories and time periods.",
    link: 'https://github.com/Adhi1755/Pharma-Sales-Analysis',
  },
  {
    id: 13,
    src: '/images/Crop-Price-Prediction.png',
    alt: 'Crop Price Prediction',
    description: "Crop Price Prediction — ML regression project forecasting agricultural commodity prices from historical market data, crop yield figures, and seasonal indicators. Compares models including Random Forest and Gradient Boosting, with SHAP-based feature importance analysis.",
    link: 'https://github.com/Adhi1755/Crop-Price-Prediction-',
  },
  {
    id: 14,
    src: '/images/Heart_Diseases_Prediction.png',
    alt: 'Heart Diseases Prediction',
    description: "Heart Disease Prediction — Binary classification pipeline identifying patients at cardiovascular risk using clinical indicators such as cholesterol, blood pressure, and ECG features. Includes preprocessing, class-imbalance handling, and model comparison across Logistic Regression, SVM, and Random Forest.",
    link: 'https://github.com/Adhi1755/Heart_Diseases_Prediction',
  },
];

interface Experiment {
  id: string;
  expId: string;
  title: string;
  image: string;
  status: 'ACTIVE' | 'DEPLOYED' | 'AWARDED';
  objective: string;
  method: string;
  impact: string;
  tech: string[];
  link: string;
}

const experiments: Experiment[] = [
  {
    id: 'embedmindai',
    expId: 'EXP-001',
    title: 'EmbedMindAI',
    image: '/images/EmbedMindAI.png',
    status: 'ACTIVE',
    objective: 'Static PDFs are hard to query — answers are buried, not searchable.',
    method: 'Full RAG pipeline — SentenceTransformers embeddings, ChromaDB vector store, FastAPI backend — with multi-document ingestion and chunk-level retrieval.',
    impact: 'Context-grounded, source-cited answers across multiple PDFs in seconds.',
    tech: ['SentenceTransformers', 'ChromaDB', 'FastAPI', 'Python'],
    link: 'https://github.com/Adhi1755/EmbedMindAI',
  },
  {
    id: 'orrery',
    expId: 'EXP-002',
    title: 'Orrery Web App',
    image: '/images/Orrery-web-app.png',
    status: 'AWARDED',
    objective: 'Solar system dynamics are abstract without a way to explore them interactively.',
    method: 'Real-time 3D planetary orbits from orbital mechanics data with Three.js, with clickable bodies surfacing mission history and ephemeris data.',
    impact: 'NASA Space Apps Challenge 2024 submission — won the Art & Technology Award.',
    tech: ['Three.js', 'React', 'Orbital Mechanics'],
    link: 'https://github.com/Adhi1755/Orrery-web-app',
  },
  {
    id: 'skillspark',
    expId: 'EXP-003',
    title: 'SkillSpark',
    image: '/images/SkillSpark.png',
    status: 'DEPLOYED',
    objective: "Generic quizzes and flashcards don't adapt to how a learner is actually performing.",
    method: 'Adaptive quizzes that adjust difficulty live, spaced-repetition flashcards, and an AI coaching layer that personalises interview-prep roadmaps.',
    impact: 'Shipped end-to-end at Hackverse 2025 in under 24 hours.',
    tech: ['React Native', 'RAG', 'Gemini', 'Node.js'],
    link: 'https://github.com/Adhi1755/SkillSpark',
  },
];

const FEATURED_IDS = new Set([1, 2, 9]);

const STATUS_COLOR: Record<Experiment['status'], string> = {
  ACTIVE: 'text-accent',
  DEPLOYED: 'text-(--lab-secondary)',
  AWARDED: 'text-accent',
};

function ExperimentCard({ project, index }: { project: Experiment; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!imgRef.current || !cardRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    gsap.fromTo(
      imgRef.current,
      { scale: 1 },
      {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: cardRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  }, []);

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || !imgWrapRef.current) return;
    const rect = imgWrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(imgWrapRef.current, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 800, duration: 0.4, ease: 'power2.out' });
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(280px circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(164,255,74,0.18), transparent 70%)`;
    }
  };

  const handleTiltLeave = () => {
    if (!imgWrapRef.current) return;
    gsap.to(imgWrapRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
    if (spotRef.current) spotRef.current.style.background = 'transparent';
  };

  const reversed = index % 2 === 1;

  return (
    <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center py-10">
      <div
        ref={imgWrapRef}
        onMouseMove={handleTiltMove}
        onMouseLeave={handleTiltLeave}
        style={{ willChange: 'transform' }}
        className={`relative rounded-3xl overflow-hidden glass aspect-4/3 ${reversed ? 'lg:order-2' : ''}`}
      >
        <Image
          ref={imgRef}
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div ref={spotRef} className="absolute inset-0 pointer-events-none transition-[background] duration-150" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
          <span className="font-mono-lab text-[10px] tracking-widest text-zinc-400">{project.expId}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-5 ${reversed ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-[10px] font-mono-lab tracking-widest uppercase ${STATUS_COLOR[project.status]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
            Status: {project.status}
          </span>
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">{project.title}</h3>
        <div className="flex flex-col gap-3 text-sm font-light leading-relaxed text-zinc-400">
          <p><span className="font-mono-lab text-xs text-zinc-300">OBJECTIVE — </span>{project.objective}</p>
          <p><span className="font-mono-lab text-xs text-zinc-300">METHOD — </span>{project.method}</p>
          <p><span className="font-mono-lab text-xs text-zinc-300">IMPACT — </span>{project.impact}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full border border-white/10 font-mono-lab text-xs text-zinc-400">
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group inline-flex items-center gap-2 font-mono-lab text-sm text-white w-fit hover:text-accent transition-colors"
        >
          view_repository()
          <MoveUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

function ArchiveRow({ image, active, onHover, onClick }: { image: ImageData; active: boolean; onHover: () => void; onClick: () => void }) {
  return (
    <div
      className={`group relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 py-6 border-b border-white/10 cursor-pointer transition-all duration-300 md:hover:px-2 ${active ? 'bg-white/[0.02] rounded-xl' : ''}`}
      onMouseEnter={onHover}
      onClick={onClick}
      data-cursor-hover
    >
      <div className="flex-1 min-w-0">
        <p className={`text-xl sm:text-2xl lg:text-3xl font-display font-medium tracking-tight mb-1 sm:mb-2 transition-colors duration-200 ${active ? 'text-white' : 'text-zinc-400'}`}>
          {image.alt}
        </p>
        <p className="text-xs sm:text-sm lg:text-base font-light text-zinc-500 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
          {image.description}
        </p>
      </div>

      <button
        className={`self-start md:self-center flex-shrink-0 p-2.5 sm:p-3 rounded-full border transition-all duration-300 ${
          active ? 'bg-(--lab-accent) border-(--lab-accent) text-black' : 'border-white/15 text-zinc-500 group-hover:border-(--lab-accent) group-hover:text-accent'
        }`}
      >
        <MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className={`absolute bottom-0 left-0 h-[1.5px] bg-(--lab-accent) transition-all duration-300 ease-out ${active ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
    </div>
  );
}

export default function Projects() {
  const [activeImage, setActiveImage] = useState<ImageData | null>(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 4;
  const archiveImages = images.filter((img) => !FEATURED_IDS.has(img.id));
  const visibleProjects = showAll ? archiveImages : archiveImages.slice(0, INITIAL_COUNT);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectItemsRef = useRef<Array<HTMLDivElement | null>>([]);

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
        gsap.set([headerEl, ...projectItems], { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
        return;
      }

      gsap.fromTo(
        headerEl,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 92%', once: true, invalidateOnRefresh: true } }
      );

      gsap.set(projectItems, { opacity: 0, y: 20, scale: 0.99 });

      ScrollTrigger.batch(projectItems, {
        start: 'top 95%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out', overwrite: 'auto' });
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [isClient, showAll]);

  if (!isClient) return null;

  return (
    <div ref={containerRef} id="projects" className="relative bg-(--lab-bg) overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-20" />
        <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-(--lab-secondary)/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        <div ref={headerRef} className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500">
              experiments — active research
            </p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-none">
              Research Terminal
            </h2>
            <p className="text-sm sm:text-base font-light text-zinc-400 max-w-xl leading-relaxed">
              Each project below is treated as a live experiment — an objective, a method, and a measured impact.
            </p>
          </div>
          <button
            onClick={() => window.open('https://github.com/Adhi1755', '_blank')}
            data-cursor-hover
            className="self-start lg:self-auto glass flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono-lab text-zinc-300 text-sm tracking-wide hover:text-accent transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            view_github()
          </button>
        </div>

        {/* Featured experiments */}
        <div className="flex flex-col divide-y divide-white/10 mb-16 sm:mb-20">
          {experiments.map((project, index) => (
            <ExperimentCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500 mb-6">
          archive — additional logs
        </p>

        <div className="relative">
          {visibleProjects.map((image, index) => (
            <div key={image.id} ref={(el) => { projectItemsRef.current[index] = el; }}>
              <ArchiveRow
                image={image}
                active={activeImage?.id === image.id}
                onHover={() => setActiveImage(image)}
                onClick={() => image.link && window.open(image.link, '_blank', 'noopener,noreferrer')}
              />
            </div>
          ))}

          {archiveImages.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  setShowAll((prev) => !prev);
                  setTimeout(() => ScrollTrigger.refresh(), 100);
                }}
                data-cursor-hover
                className="glass flex items-center gap-2 px-7 py-3 rounded-full font-mono-lab text-zinc-300 text-sm tracking-wide hover:text-accent transition-all duration-200"
              >
                {showAll ? 'show_less()' : 'show_more()'}
                <svg className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
