'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// ── Skill data — text only ─────────────────────────────────────────────────
const skillsData = [
  {
    category: 'AI & ML',
    items: ['Machine Learning', 'Generative AI', 'scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Three.js', 'HTML / CSS'],
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'Flask', 'Node.js', 'Next.js', 'REST APIs'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'MongoDB', 'NoSQL'],
  },
  {
    category: 'Languages',
    items: ['Python', 'Java', 'C'],
  },
  {
    category: 'Tools & Cloud',
    items: ['Git / GitHub', 'Azure Cloud', 'PowerBI', 'Figma', 'Excel'],
  },
];

// ── Component ──────────────────────────────────────────────────────────────
const AboutMeContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const skillsHeadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([leftRef.current, rightRef.current], { opacity: 0 });
      gsap.set(leftRef.current, { x: -40 });
      gsap.set(rightRef.current, { x: 40 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 85%', end: 'top 30%', scrub: 0.8 } });
      tl.to(leftRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
        .to(rightRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.7');

      if (skillsRef.current && skillsHeadingRef.current) {
        gsap.set(skillsHeadingRef.current, { y: 40, opacity: 0 });
        gsap.set(skillsRef.current.querySelectorAll('.skill-row'), { y: 30, opacity: 0 });
        const stl = gsap.timeline({ scrollTrigger: { trigger: skillsRef.current, start: 'top 88%', end: 'top 40%', scrub: 0.5 } });
        stl.to(skillsHeadingRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
          .to(skillsRef.current.querySelectorAll('.skill-row'), { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: { each: 0.08 } }, '-=0.4');
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="about" ref={containerRef} className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-gray-100 dark:bg-zinc-900/30 blur-[100px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-gray-200 dark:bg-zinc-800/20 blur-[90px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">

        {/* About + avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 sm:mb-24 lg:mb-32">
          <div ref={leftRef} className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
              About Me
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">Who I am</h2>
            <div className="space-y-3 sm:space-y-4 text-md sm:text-md lg:text-lg font-light leading-relaxed text-gray-600 dark:text-gray-400">
              <p>I am a <span className="text-black dark:text-white font-normal">pre-final year B.Tech student majoring in Computer Science Engineering (Data Science)</span> at Dayananda Sagar University, Bengaluru, with a current <span className="text-black dark:text-white font-normal">CGPA of 8.56</span>.</p>
              <p>Deeply passionate about AI, I focus on solving real-world problems through full-stack development integrated with intelligent systems. Currently upskilling in <span className="text-black dark:text-white font-normal">AI/ML</span> and <span className="text-black dark:text-white font-normal">DSA</span>, with a special interest in <span className="text-black dark:text-white font-normal">Generative AI</span>.</p>
              <p>Recently, my team won the <span className="text-black dark:text-white font-normal">Art and Technology Award</span> at the <span className="text-black dark:text-white font-normal">NASA Space Apps Challenge 2024</span>.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-normal text-sm tracking-wide hover:opacity-85 transition-all duration-200 shadow-lg shadow-black/10">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                Contact Me
              </button>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 font-light text-sm tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>
                Resume
              </a>
            </div>
          </div>

          <div ref={rightRef} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[420px] aspect-[3/4]">
              <div className="absolute -top-3 -left-2 sm:-left-4 z-20 flex items-center gap-2 sm:gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg shadow-black/5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>
                <div><p className="text-[11px] sm:text-xs font-medium text-black dark:text-white leading-tight">CGPA 8.56</p><p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">DSU Bengaluru</p></div>
              </div>
              <div className="absolute -bottom-3 -right-2 sm:-right-4 z-20 flex items-center gap-2 sm:gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg shadow-black/5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <div><p className="text-[11px] sm:text-xs font-medium text-black dark:text-white leading-tight">NASA Award</p><p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">Space Apps 2024</p></div>
              </div>
              <div className="w-full h-full rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 shadow-2xl shadow-black/10 dark:shadow-black/40">
                <Image src="/Profile.jpg" alt="Adithya profile" width={600} height={600} className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Skills showcase — clean text-only grouped rows ── */}
        <div ref={skillsRef}>
          <div ref={skillsHeadingRef} className="mb-12">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
              Skills &amp; Technologies
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black dark:text-white">What I work with</h2>
          </div>

          <div className="space-y-8">
            {skillsData.map((group, gi) => (
              <div key={gi} className="skill-row">
                {/* Category label with line */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    {group.category}
                  </span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-800" />
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, si) => (
                    <span
                      key={si}
                      className="px-4 py-2 rounded-full text-sm font-light
                        text-gray-600 dark:text-gray-400
                        border border-gray-200 dark:border-zinc-800
                        bg-white dark:bg-zinc-900/60
                        hover:border-black dark:hover:border-zinc-500
                        hover:text-black dark:hover:text-white
                        hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20
                        transition-all duration-200 cursor-default select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeContainer;
