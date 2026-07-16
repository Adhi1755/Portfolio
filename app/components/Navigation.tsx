'use client';

import { useState, useEffect, useRef } from 'react';
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
  { name: 'About', href: '#about', sectionId: 'about' },
  { name: 'Projects', href: '#projects', sectionId: 'projects' },
  { name: 'Recognition', href: '#certifications', sectionId: 'certifications' },
  { name: 'Contact', href: '#contact', sectionId: 'contact' },
];

// The hero has no nav link (the logo navigates home) but still needs to be
// observed so no link reads as active while it's on screen.
const SECTION_IDS = ['home', ...navItems.map((i) => i.sectionId)];

/* ─── Inline SVG icons ────────────────────────────────────────────────────── */

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth={1.5} strokeLinecap="round" d="M4 8h16M4 16h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth={1.5} strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
  </svg>
);

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false); // nav sits over a dark (ink) section
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* ─ Mount: the site is permanently light — scrub any lingering dark state ─ */
  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  /* ─ Scroll listener: background change + adaptive tint over dark sections ─ */
  useEffect(() => {
    if (!mounted) return;
    const DARK_SECTIONS = new Set(['about', 'contact']);
    const NAV_Y = 32; // vertical center of the h-16 bar
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
      // Detect which section sits directly behind the bar
      let behind = 'home';
      for (const sectionId of SECTION_IDS) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= NAV_Y && r.bottom > NAV_Y) { behind = sectionId; break; }
      }
      setOnDark(DARK_SECTIONS.has(behind));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  /* ─ Active section detection via IntersectionObserver ─ */
  useEffect(() => {
    if (!mounted) return;

    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
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

  /* ─ GSAP intro animation ─ */
  useEffect(() => {
    if (!mounted || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -24, opacity: 0 },
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
      // Nothing to close on the initial mount pass — the menu starts hidden.
      if (getComputedStyle(menu).display !== 'none') {
        gsap.to(menu, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => { gsap.set(menu, { display: 'none' }); } });
      }
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, mounted]);

  /* ─ Smooth scroll helper ─ */
  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  /* ─ SSR placeholder to avoid hydration mismatch ─ */
  if (!mounted) {
    return (
      <header className="fixed top-0 inset-x-0 z-[200] pointer-events-none">
        <div className="flex items-center justify-between h-16 px-6 sm:px-10 lg:px-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-black">Adhi®</span>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* ── Header bar ── */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-[200]"
        style={{ opacity: 0 }} /* initial hidden, GSAP reveals */
      >
        <div
          className={`
            flex items-center justify-between h-16 px-6 sm:px-10 lg:px-16
            border-b transition-all duration-500
            ${isScrolled
              ? onDark
                ? 'bg-[#131110]/80 backdrop-blur-xl border-white/[0.08]'
                : 'bg-[#F2EFE9]/85 backdrop-blur-xl border-black/[0.08]'
              : 'bg-transparent border-transparent'
            }
          `}
        >
          {/* ── Logo / Brand ── */}
          <button
            onClick={() => scrollTo('home')}
            aria-label="Back to top"
            className={`select-none text-sm font-semibold uppercase tracking-[0.2em] hover:opacity-60 transition-all duration-300 ${onDark ? 'text-[#F2EFE9]' : 'text-black'}`}
          >
            Adhi<span className={onDark ? 'text-gray-500' : 'text-gray-400'}>®</span>
          </button>

          {/* ── Right cluster: links + CTA ── */}
          <div className="flex items-center gap-2 lg:gap-6">
            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = activeSection === item.sectionId;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.sectionId);
                    }}
                    className={`
                      group relative px-3 py-2 flex items-center gap-2
                      text-[11px] font-light uppercase tracking-[0.22em]
                      transition-colors duration-300 select-none
                      ${active
                        ? onDark ? 'text-[#F2EFE9]' : 'text-black'
                        : onDark ? 'text-gray-500 hover:text-[#F2EFE9]' : 'text-gray-400 hover:text-black'
                      }
                    `}
                  >
                    {/* Active marker: square tick, matching the cursor's center tick */}
                    <span
                      className={`w-1 h-1 bg-current transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    />
                    {/* Text flip on hover: the label rolls up, its twin rolls in */}
                    <span className="relative block overflow-hidden">
                      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {item.name}
                      </span>
                      <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                        {item.name}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden w-9 h-9 flex items-center justify-center hover:opacity-60 transition-all duration-300 ${onDark && !mobileOpen ? 'text-[#F2EFE9]' : 'text-black'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[195] flex-col items-center justify-center bg-[#F2EFE9]"
        style={{ display: 'none', opacity: 0 }}
      >
        {/* Nav links — centered, large, editorial (closed via the header X) */}
        <nav className="flex flex-col items-center gap-3">
          {navItems.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.sectionId)}
              className={`
                mobile-nav-link flex items-baseline gap-3 text-4xl font-semibold uppercase tracking-tight transition-colors duration-200
                ${activeSection === item.sectionId
                  ? 'text-black'
                  : 'text-gray-300 hover:text-black'
                }
              `}
            >
              <span className="text-[10px] font-light tracking-[0.3em] text-gray-400">
                0{idx + 1}
              </span>
              {item.name}
            </button>
          ))}
        </nav>

        {/* Meta footer */}
        <p className="absolute bottom-10 text-[10px] font-light uppercase tracking-[0.3em] text-gray-400">
          Bengaluru, India
        </p>
      </div>
    </>
  );
}
