'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DownloadLink from './DownloadLink';

gsap.registerPlugin(ScrollTrigger);

const HERO_FIRST = 'ADITHYA'.split('');
const HERO_LAST = 'NAGAMUNEENDRAN'.split('');

// Role line cycles through these with a character-scramble transition.
const ROLES = [
  'Full Stack · AI · Data Science',
  'B.Tech CSE (Data Science) — Class of 2026',
  'Learning by Building',
];

// Film-grain texture — inline SVG so it needs no CSS rebuild or network fetch.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const MARQUEE_ITEMS = [
  'Machine Learning', 'Data Science', 'Full-Stack Engineering', 'Generative AI', 'Python', 'SQL', 'Bengaluru, India',
];

const DESC_WORDS =
  "Final-year Computer Science (Data Science) student. I build across the stack — web apps in Next.js and TypeScript, AI products in Python and FastAPI — and pick every project to learn something I couldn't do before.".split(' ');

const MainPage: React.FC<{ play?: boolean }> = ({ play = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  // Live Bengaluru clock — placeholder until mounted to avoid a hydration mismatch.
  const [ist, setIst] = useState('--:--:--');
  useEffect(() => {
    const tick = () =>
      setIst(new Date().toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Asia/Kolkata' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Hide everything immediately on mount so the hero is staged (and stays hidden
  // behind the welcome screen) until `play` triggers the entrance.
  useEffect(() => {
    // Reduced motion: leave everything at its natural visible state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.set('.h-meta', { opacity: 0, y: 14 });
      gsap.set('.h-gridline', { scaleY: 0 });
      gsap.set('.h-letter', { yPercent: 115 });
      gsap.set('.h-role', { opacity: 0 });
      gsap.set('.h-rule', { scaleX: 0 });
      gsap.set('.h-desc-word', { yPercent: 115, opacity: 0 });
      gsap.set('.h-status', { opacity: 0, y: 16 });
      gsap.set('.h-links', { opacity: 0, y: 20 });
      gsap.set('.h-marquee', { opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Play the entrance once the welcome screen hands off.
  useEffect(() => {
    if (!play) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const letterHandlers: { el: HTMLElement; fn: () => void }[] = [];
    let parallaxCleanup: (() => void) | null = null;

    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.05 })
        .to('.h-meta', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        // editorial grid: hairlines draw down from the top
        .to('.h-gridline', { scaleY: 1, duration: 1.1, ease: 'power3.inOut', stagger: 0.08 }, '-=0.3')
        // name: per-letter masked slide-up
        .to('.h-letter', { yPercent: 0, duration: 0.8, ease: 'power4.out', stagger: 0.05 }, '-=0.9')
        // role: rules draw out from the center while the label fades in
        .to('.h-rule', { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to('.h-role', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.5')
        // description: word-by-word wave
        .to('.h-desc-word', { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.012 }, '-=0.55')
        .to('.h-status', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.4')
        .to('.h-links', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
        .to('.h-marquee', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.25')
        .to(scrollRef.current, { opacity: 1, duration: 0.4 }, '-=0.3');

      // Scroll hint: gentle perpetual bounce.
      gsap.to(scrollRef.current, {
        y: 7, duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.2,
      });

      // The name stays alive: a slow ripple travels through the letters on a loop.
      gsap.timeline({ repeat: -1, repeatDelay: 3.4, delay: 3 })
        .to('.h-letter', {
          yPercent: -9,
          duration: 0.32,
          ease: 'power2.out',
          stagger: { each: 0.055 },
        })
        .to('.h-letter', {
          yPercent: 0,
          duration: 0.75,
          ease: 'elastic.out(1, 0.5)',
          stagger: { each: 0.055 },
        }, 0.16);

      // Cinematic hand-off: the hero drifts up and dims as you scroll to About.
      // Uses yPercent so it composes with the mouse parallax (which sets x/y).
      gsap.to('.h-name', {
        yPercent: -16,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Fine pointers: name drifts gently with the mouse, letters spring on hover.
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const xTo = gsap.quickTo('.h-name', 'x', { duration: 1.1, ease: 'power3.out' });
        const yTo = gsap.quickTo('.h-name', 'y', { duration: 1.1, ease: 'power3.out' });
        const onMove = (e: MouseEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 18);
          yTo((e.clientY / window.innerHeight - 0.5) * 10);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        parallaxCleanup = () => window.removeEventListener('mousemove', onMove);

        gsap.utils.toArray<HTMLElement>('.h-letter').forEach((el) => {
          const fn = () => {
            gsap.to(el, {
              yPercent: -12, duration: 0.16, ease: 'power2.out',
              onComplete: () => {
                gsap.to(el, { yPercent: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' });
              },
            });
          };
          el.addEventListener('mouseenter', fn);
          letterHandlers.push({ el, fn });
        });
      }
    }, containerRef);

    return () => {
      letterHandlers.forEach(({ el, fn }) => el.removeEventListener('mouseenter', fn));
      parallaxCleanup?.();
      ctx.revert();
    };
  }, [play]);

  // Role line cycles through ROLES, each transition decoding character by character.
  useEffect(() => {
    if (!play) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = roleRef.current;
    if (!el) return;

    const CHARS = '#%&/\\<>*+-·:';
    let roleIdx = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const scrambleTo = (text: string) => {
      const from = el.textContent ?? '';
      const len = Math.max(from.length, text.length);
      const queue = Array.from({ length: len }, (_, i) => {
        const start = Math.floor(Math.random() * 18);
        return {
          from: from[i] ?? '',
          to: text[i] ?? '',
          start,
          end: start + 8 + Math.floor(Math.random() * 18),
          char: '',
        };
      });

      let frame = 0;
      const render = () => {
        let out = '';
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) { done++; out += q.to; }
          else if (frame >= q.start) {
            if (!q.char || Math.random() < 0.3) {
              q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            out += q.char;
          } else out += q.from;
        }
        el.textContent = out;
        if (done === queue.length) {
          timer = setTimeout(cycle, 2800); // hold the readable phrase
          return;
        }
        frame++;
        raf = requestAnimationFrame(render);
      };
      render();
    };

    const cycle = () => {
      roleIdx = (roleIdx + 1) % ROLES.length;
      scrambleTo(ROLES[roleIdx]);
    };

    timer = setTimeout(cycle, 2800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [play]);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-dvh bg-[#F2EFE9] dark:bg-black overflow-hidden transition-colors duration-300"
    >
      {/* Editorial hairline grid — draws down during the entrance */}
      <div className="pointer-events-none absolute inset-0 z-0 max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative h-full w-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-gridline absolute top-0 bottom-0 w-px bg-black/[0.07] dark:bg-white/[0.07] origin-top will-change-transform"
              style={{ left: `${(i / 4) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Film grain — subtle tactile texture over the whole hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.14] mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.09]"
        style={{ backgroundImage: GRAIN_URL }}
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-30 pb-24 min-h-dvh flex flex-col justify-center">

        {/* Meta row */}
        <div className="h-meta flex items-center justify-between mb-8 sm:mb-10 text-[10px] font-light uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
          <span>Bengaluru, IN</span>
          <span className="tabular-nums">{ist} IST</span>
        </div>

        {/* Giant name — first name huge, surname stacked beneath */}
        <h1
          aria-label="Adithya Nagamuneendran"
          className="h-name flex justify-center font-semibold uppercase tracking-tight leading-none text-black dark:text-white select-none will-change-transform"
        >
          {/* Shrink-wraps to the first name's width so the surname spreads to match it */}
          <span className="flex flex-col">
            <span aria-hidden className="flex justify-center text-[clamp(3.4rem,15.5vw,15rem)]">
              {HERO_FIRST.map((letter, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden pt-[0.16em] -mt-[0.16em] pb-[0.1em] -mb-[0.1em]"
                >
                  <span className="h-letter inline-block will-change-transform">{letter}</span>
                </span>
              ))}
            </span>
            <span
              aria-hidden
              className="flex justify-between px-[0.5vw] mt-[1vw] sm:mt-[0.6vw] text-[clamp(0.65rem,1.7vw,1.7rem)] font-medium"
            >
              {HERO_LAST.map((letter, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden pt-[0.16em] -mt-[0.16em] pb-[0.1em] -mb-[0.1em]"
                >
                  <span className="h-letter inline-block will-change-transform">{letter}</span>
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Role — small, flanked by thin rules */}
        <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <span className="h-rule h-px flex-1 bg-current text-black dark:text-white opacity-20 will-change-transform" />
          <span
            ref={roleRef}
            className="h-role text-[11px] sm:text-xs font-light uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 whitespace-nowrap"
          >
            Full Stack · AI · Data Science
          </span>
          <span className="h-rule h-px flex-1 bg-current text-black dark:text-white opacity-20 will-change-transform" />
        </div>


        {/* Bottom row: description + text links */}
        <div className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="h-status flex items-center gap-2.5 mb-4 text-[10px] font-light uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                style={{ animation: 'pulse 3s ease-in-out infinite' }}
              />
              Available — 2026 roles &amp; internships
            </p>
            <p className="h-desc flex flex-wrap gap-x-[0.28em] gap-y-1 max-w-md text-sm sm:text-base font-light leading-relaxed text-gray-700 dark:text-gray-400">
              {DESC_WORDS.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                  <span className="h-desc-word inline-block will-change-transform">{w}</span>
                </span>
              ))}
            </p>
          </div>

          <div className="h-links flex items-center gap-8 shrink-0">
            <DownloadLink href="/Adithya_N.pdf" className="text-black dark:text-white" />
            <a
              href="#contact"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-baseline gap-1.5 text-xs font-normal uppercase tracking-[0.22em] text-black dark:text-white"
            >
              <span className="relative">
                Contact
                <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
              </span>
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Marquee strip along the bottom edge */}
      <div className="h-marquee absolute bottom-0 inset-x-0 border-t border-black/[0.06] dark:border-white/[0.08] overflow-hidden py-3 select-none">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1} className="flex items-center">
              {MARQUEE_ITEMS.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center text-[10px] font-light uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-600"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-[8px] opacity-60">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-400 dark:text-zinc-600 cursor-pointer z-10 select-none transition-opacity duration-300 hover:opacity-60"
      >
        <span className="text-[10px] font-light tracking-[0.25em] uppercase">Scroll</span>
        <span className="text-xs">↓</span>
      </div>
    </div>
  );
};

export default MainPage;
