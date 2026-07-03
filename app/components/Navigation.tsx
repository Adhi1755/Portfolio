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
  { name: 'Journey', href: '#journey', sectionId: 'journey' },
  { name: 'Projects', href: '#projects', sectionId: 'projects' },
  { name: 'Tech', href: '#technology', sectionId: 'technology' },
  { name: 'Contact', href: '#contact', sectionId: 'contact' },
];

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
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
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

    const textPaddingX = 16;
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
      const t = setTimeout(moveIndicator, 80);
      return () => clearTimeout(t);
    }
  }, [mounted, activeSection, moveIndicator]);

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
      document.body.style.overflow = 'hidden';
      gsap.set(menu, { display: 'flex' });
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      const links = menu.querySelectorAll('.mobile-nav-link');
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.07, delay: 0.15 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menu, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => { gsap.set(menu, { display: 'none' }); } });
      setTimeout(moveIndicator, 100);
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, mounted, moveIndicator]);

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
        <div className="mt-4 mx-4 w-full max-w-3xl rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl px-5 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono-lab tracking-widest text-white">ADI_LABS</span>
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
        style={{ opacity: 0 }}
      >
        <div
          className={`
            mt-4 mx-4 w-full max-w-3xl rounded-2xl
            border transition-all duration-500
            ${isScrolled
              ? 'border-white/15 bg-black/75 shadow-lg shadow-black/40'
              : 'border-white/8 bg-black/40 shadow-none'
            }
            backdrop-blur-2xl px-5 py-2.5
          `}
        >
          <div className="flex items-center justify-between">

            {/* ── Logo / Brand ── */}
            <button
              onClick={() => scrollTo('home')}
              className="relative group flex items-center gap-1.5 select-none"
              data-cursor-hover
            >
              <span className="font-mono-lab text-sm tracking-[0.15em] text-white">
                ADI<span className="text-accent">_</span>LABS
              </span>
            </button>

            {/* ── Desktop Nav links ── */}
            <nav ref={navBarRef} className="hidden md:flex items-center gap-0.5 relative">
              <div
                ref={indicatorRef}
                className="absolute bottom-0 left-0 h-[2px] rounded-full pointer-events-none bg-(--lab-accent) shadow-[0_0_8px_var(--lab-accent)]"
                style={{ width: 0, opacity: 0 }}
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
                  data-cursor-hover
                  className={`
                    relative z-10 px-4 py-2 text-[13px] font-mono-lab tracking-wide
                    transition-all duration-300 select-none
                    ${activeSection === item.sectionId
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono-lab tracking-widest uppercase text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-(--lab-accent)" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
                Online
              </span>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center text-zinc-300 hover:bg-white/[0.08] transition-colors duration-200"
                aria-label="Toggle menu"
                data-cursor-hover
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
        className="fixed inset-0 z-[195] flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl"
        style={{ display: 'none', opacity: 0 }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-zinc-300 hover:bg-white/[0.08] transition-colors"
          aria-label="Close menu"
          data-cursor-hover
        >
          <CloseIcon />
        </button>

        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.sectionId)}
              data-cursor-hover
              className={`
                mobile-nav-link px-6 py-3 rounded-2xl text-2xl font-display tracking-tight transition-all duration-200
                ${activeSection === item.sectionId ? 'text-white' : 'text-zinc-500 hover:text-white'}
              `}
            >
              {item.name}
              {activeSection === item.sectionId && (
                <span className="block mx-auto mt-1 w-6 h-[2px] rounded-full bg-(--lab-accent)" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
