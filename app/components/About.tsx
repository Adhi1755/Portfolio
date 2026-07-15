'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// ── Skill data — text only ─────────────────────────────────────────────────
const skillsData = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['HTML / CSS', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'Flask', 'Node.js', 'REST APIs'],
  },
  {
    category: 'AI & Data Science',
    items: ['Machine Learning', 'Deep Learning', 'Generative AI', 'Data Science', 'RAG', 'Prompt Engineering'],
  },
  {
    category: 'Data Analytics',
    items: ['SQL', 'Power BI', 'Tableau', 'Data Visualization'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma'],
  },
];

// Bio paragraphs split into words for the scroll-scrubbed reveal. `hl` words render black.
const w = (s: string) => s.split(' ').map((t) => ({ t }));
const hl = (s: string) => s.split(' ').map((t) => ({ t, hl: true }));
const BIO: { t: string; hl?: boolean }[][] = [
  [
    ...w('I am'), ...hl('Adithya Nagamuneendran,'), ...w('a'),
    ...hl('final-year B.Tech student'),
    ...w('in Computer Science and Engineering'),
    ...hl('(Data Science)'),
    ...w('at Dayananda Sagar University, Bengaluru, with a CGPA of'),
    ...hl('8.85.'),
  ],
  [
    ...w('I started with'), ...hl('web development'),
    ...w('in my first year — HTML, CSS, and JavaScript, then'),
    ...hl('Next.js, TypeScript, and Tailwind'),
    ...w('— and grew curious about what makes applications intelligent. That curiosity pulled me into'),
    ...hl('machine learning, data science, and generative AI,'),
    ...w('where I now build'), ...hl('RAG systems'),
    ...w('and AI-powered products end to end.'),
  ],
  [
    ...w('Right now I am preparing for placements — strengthening'),
    ...hl('DSA, SQL, and ML fundamentals'),
    ...w('— and learning by shipping: hackathons have brought an'),
    ...hl('Art & Technology Award'),
    ...w('at NASA Space Apps 2024, a'),
    ...hl('Global Nominee'),
    ...w('spot in 2025, and'),
    ...hl('3rd prize at HackVerse.'),
  ],
];

// ── Component ──────────────────────────────────────────────────────────────
const AboutMeContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const skillsHeadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Label fades, heading slides up through its mask
      gsap.from('.about-label', {
        opacity: 0, y: 16, duration: 0.5, ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true, invalidateOnRefresh: true },
      });
      gsap.from('.about-heading-line', {
        yPercent: 110, duration: 0.9, ease: 'power4.out', clearProps: 'all',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true, invalidateOnRefresh: true },
      });

      // Bio: words brighten one by one, scrubbed to scroll position
      const words = gsap.utils.toArray<HTMLElement>('.about-word');
      gsap.set(words, { opacity: 0.15 });
      gsap.to(words, {
        opacity: 1, ease: 'none', stagger: 1,
        scrollTrigger: {
          trigger: '.about-bio', start: 'top 80%', end: 'bottom 50%',
          scrub: 0.4, invalidateOnRefresh: true,
        },
      });

      gsap.from('.about-ctas', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: '.about-ctas', start: 'top 92%', once: true, invalidateOnRefresh: true },
      });

      gsap.from(rightRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true, invalidateOnRefresh: true },
      });

      if (skillsRef.current && skillsHeadingRef.current) {
        const rows = skillsRef.current.querySelectorAll('.skill-row');

        gsap.from('.skills-label', {
          opacity: 0, y: 16, duration: 0.5, ease: 'power2.out', clearProps: 'all',
          scrollTrigger: { trigger: skillsRef.current, start: 'top 90%', once: true, invalidateOnRefresh: true },
        });
        gsap.from('.skills-heading-line', {
          yPercent: 110, duration: 0.9, ease: 'power4.out', clearProps: 'all',
          scrollTrigger: { trigger: skillsRef.current, start: 'top 90%', once: true, invalidateOnRefresh: true },
        });

        gsap.from(rows, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: { each: 0.1 },
          clearProps: 'all',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="about" ref={containerRef} className="relative bg-[#131110] overflow-hidden">
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        {/* About + avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 sm:mb-24 lg:mb-32">
          <div className="flex flex-col gap-6">
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold uppercase tracking-tight text-[#F2EFE9] leading-none overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="about-heading-line inline-block will-change-transform">Who I am</span>
            </h2>
            <div className="about-bio space-y-3 sm:space-y-4 text-md sm:text-md lg:text-lg font-light leading-relaxed text-gray-400">
              {BIO.map((para, pi) => (
                <p key={pi} className="flex flex-wrap gap-x-[0.3em]">
                  {para.map((word, wi) => (
                    <span key={wi} className={`about-word ${word.hl ? 'text-[#F2EFE9] font-normal' : ''}`}>
                      {word.t}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <div className="about-ctas flex flex-wrap items-center gap-6 pt-2">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-shine inline-block bg-[#F2EFE9] text-black px-9 py-4 rounded-sm text-xs font-semibold tracking-[0.18em] uppercase hover:opacity-80 active:scale-95 transition-all duration-200"
              >
                Contact Me
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group inline-flex items-baseline gap-1.5 text-xs font-normal uppercase tracking-[0.22em] text-[#F2EFE9]"
              >
                <span className="relative">
                  Resume
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </div>

          <div ref={rightRef} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[420px] aspect-3/4">
              <div className="absolute -top-3 -left-2 sm:-left-4 z-20 flex items-center gap-2 sm:gap-2.5 bg-[#F2EFE9] border border-black/15 rounded-sm px-3 sm:px-4 py-2 sm:py-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>
                <div><p className="text-xs font-medium text-black leading-tight">CGPA 8.85</p><p className="text-[10px] font-light tracking-wide uppercase text-gray-400 leading-tight">DSU Bengaluru</p></div>
              </div>
              <div className="absolute -bottom-3 -right-2 sm:-right-4 z-20 flex items-center gap-2 sm:gap-2.5 bg-[#F2EFE9] border border-black/15 rounded-sm px-3 sm:px-4 py-2 sm:py-2.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <div><p className="text-xs font-medium text-black leading-tight">NASA Award</p><p className="text-[10px] font-light tracking-wide uppercase text-gray-400 leading-tight">Space Apps 2024</p></div>
              </div>
              <div className="w-full h-full rounded-sm overflow-hidden border border-black/10 bg-black/[0.03]">
                <Image src="/Profile.jpg" alt="Adithya profile" width={600} height={600} className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills showcase — clean text-only grouped rows ── */}
        <div ref={skillsRef}>
          <div ref={skillsHeadingRef} className="mb-12">
            <p className="skills-label text-[10px] sm:text-[11px] font-light tracking-[0.3em] uppercase text-gray-500 mb-4">
              Skills & Technologies
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase tracking-tight text-[#F2EFE9] leading-none overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span className="skills-heading-line inline-block will-change-transform">What I work with</span>
            </h2>
          </div>

          {/* Ledger rows: index / category / skills */}
          <div>
            {skillsData.map((group, gi) => (
              <div
                key={gi}
                className="skill-row group grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr_1.4fr] gap-x-4 md:gap-x-8 gap-y-2 items-baseline py-6 sm:py-7 border-b border-white/10 first:border-t transition-colors duration-300 md:hover:bg-white/[0.03]"
              >
                <span className="text-xs font-mono tabular-nums text-gray-600 group-hover:text-[#F2EFE9] transition-colors duration-300">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold uppercase tracking-tight text-[#F2EFE9] leading-none transition-transform duration-300 md:group-hover:translate-x-2">
                  {group.category}
                </h3>
                <p className="col-start-2 md:col-start-3 text-sm sm:text-base font-light leading-relaxed text-gray-500 transition-colors duration-300 md:group-hover:text-gray-300">
                  {group.items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeContainer;
