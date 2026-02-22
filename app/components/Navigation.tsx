'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Nav data ────────────────────────────────────────────────────────────── */

interface NavItem {
  name: string;
  href: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', sectionId: 'home' },
  { name: 'About', href: '#about', sectionId: 'about' },
  { name: 'Projects', href: '#projects', sectionId: 'projects' },
  { name: 'Certs', href: '#certifications', sectionId: 'certifications' },
  { name: 'Contact', href: '#contact', sectionId: 'contact' },
];

/* ─── Inline SVG icons ────────────────────────────────────────────────────── */

const SunIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth={2} />
    <path strokeWidth={2} strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth={2} strokeLinecap="round" d="M4 8h16M4 16h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth={2} strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
  </svg>
);

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* ─ Mount & theme init ─ */
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  /* ─ Scroll listener for background change ─ */
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  /* ─ Active section detection via IntersectionObserver ─ */
  useEffect(() => {
    if (!mounted) return;

    const observers: IntersectionObserver[] = [];

    navItems.forEach((item) => {
      const el = document.getElementById(item.sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(item.sectionId);
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [mounted]);

  /* ─ Move the indicator pill to the active nav item ─ */
  const moveIndicator = useCallback(() => {
    const activeIdx = navItems.findIndex((n) => n.sectionId === activeSection);
    const activeEl = navItemRefs.current[activeIdx];
    const barEl = navBarRef.current;
    const indEl = indicatorRef.current;

    if (!activeEl || !barEl || !indEl) return;

    const navRect = barEl.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    // Position the underline centered beneath the text
    const textPaddingX = 16; // px-4 = 16px padding each side
    gsap.to(indEl, {
      x: itemRect.left - navRect.left + textPaddingX,
      width: itemRect.width - textPaddingX * 2,
      opacity: 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  }, [activeSection]);

  useEffect(() => {
    if (mounted) {
      // small delay to let DOM settle
      const t = setTimeout(moveIndicator, 80);
      return () => clearTimeout(t);
    }
  }, [mounted, activeSection, moveIndicator]);

  // Also re-measure on resize
  useEffect(() => {
    if (!mounted) return;
    window.addEventListener('resize', moveIndicator);
    return () => window.removeEventListener('resize', moveIndicator);
  }, [mounted, moveIndicator]);

  /* ─ GSAP intro animation ─ */
  useEffect(() => {
    if (!mounted || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, [mounted]);

  /* ─ Mobile menu animation ─ */
  useEffect(() => {
    if (!mounted) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (mobileOpen) {
      // prevent body scroll
      document.body.style.overflow = 'hidden';
      gsap.set(menu, { display: 'flex' });
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      // stagger links
      const links = menu.querySelectorAll('.mobile-nav-link');
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.07, delay: 0.15 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menu, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => { gsap.set(menu, { display: 'none' }); } });
    }
  }, [mobileOpen, mounted]);

  /* ─ Theme toggle ─ */
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  /* ─ Smooth scroll helper ─ */
  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  /* ─ SSR placeholder to avoid hydration mismatch ─ */
  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[200] flex justify-center pointer-events-none">
        <div className="mt-4 mx-4 w-full max-w-3xl rounded-2xl border border-gray-200/50 dark:border-zinc-700/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl px-5 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight text-black dark:text-white">A.</span>
            <nav className="hidden md:flex items-center gap-1" />
            <div className="w-8 h-8" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Desktop + Mobile Header Bar ── */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[200] flex justify-center"
        style={{ opacity: 0 }} /* initial hidden, GSAP reveals */
      >
        <div
          className={`
            mt-4 mx-4 w-full max-w-3xl rounded-2xl
            border transition-all duration-500
            ${isScrolled
              ? 'border-gray-200/70 dark:border-zinc-700/60 bg-white/75 dark:bg-zinc-900/75 shadow-lg shadow-black/[0.04] dark:shadow-black/30'
              : 'border-gray-200/40 dark:border-zinc-700/30 bg-white/50 dark:bg-zinc-900/40 shadow-none'
            }
            backdrop-blur-2xl px-5 py-2.5
          `}
        >
          <div className="flex items-center justify-between">

            {/* ── Logo / Brand ── */}
            <button
              onClick={() => scrollTo('home')}
              className="relative group flex items-center gap-1.5 select-none"
            >
              <span className="text-xl font-medium tracking-tight text-black dark:text-white transition-colors" style={{ fontFamily: 'var(--font-moralana)' }}>
                Adhi
              </span>
              <span className="text-base font-bold tracking-tight bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                .
              </span>
            </button>

            {/* ── Desktop Nav links ── */}
            <nav ref={navBarRef} className="hidden md:flex items-center gap-0.5 relative">
              {/* Sliding gradient underline indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 left-0 h-[2px] rounded-full pointer-events-none bg-black dark:bg-white"
                style={{
                  width: 0,
                  opacity: 0,
                }}
              />

              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  ref={(el) => { navItemRefs.current[idx] = el; }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.sectionId);
                  }}
                  className={`
                    relative z-10 px-4 py-2 text-[13px] font-medium tracking-wide
                    transition-all duration-300 select-none
                    ${activeSection === item.sectionId
                      ? 'text-black dark:text-white'
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-8 h-8 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <div
                  className="transition-transform duration-300"
                  style={{ transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </div>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[195] flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-2xl"
        style={{ display: 'none', opacity: 0 }}
      >
        {/* Close button top-right */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors"
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>

        {/* Nav links — centered, large */}
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.sectionId)}
              className={`
                mobile-nav-link px-6 py-3 rounded-2xl text-2xl font-semibold tracking-tight transition-all duration-200
                ${activeSection === item.sectionId
                  ? 'text-black dark:text-white'
                  : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
                }
              `}
            >
              {item.name}
              {/* underline for active */}
              {activeSection === item.sectionId && (
                <span className="block mx-auto mt-1 w-6 h-[2px] rounded-full bg-black dark:bg-white" />
              )}
            </button>
          ))}
        </nav>

        {/* Theme toggle at bottom */}
        <div className="absolute bottom-10 flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-colors duration-200"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </>
  );
}