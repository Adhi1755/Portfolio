'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!mounted || !headerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial header animation
      gsap.fromTo(headerRef.current, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // Stagger animation for nav items
      gsap.fromTo(navItemsRef.current,
        { y: -10, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.2 
        }
      );

      // Theme button animation
      if (themeButtonRef.current) {
        gsap.fromTo(themeButtonRef.current,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3, 
            ease: 'back.out(1.7)',
            delay: 0.4 
          }
        );
      }

      // Scroll-triggered backdrop blur enhancement
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top -50px',
        end: 'bottom bottom',
        onEnter: () => {
          gsap.to(headerRef.current, {
            backdropFilter: 'blur(20px)',
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            duration: 0.3
          });
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, {
            backdropFilter: 'blur(12px)',
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
            duration: 0.3
          });
        }
      });

    }, headerRef);

    return () => ctx.revert();
  }, [mounted, isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // GSAP animation for theme toggle
    if (themeButtonRef.current) {
      gsap.to(themeButtonRef.current, {
        rotation: 360,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavItemHover = (index: number, isEntering: boolean) => {
    const item = navItemsRef.current[index];
    if (!item) return;
    
    if (isEntering) {
      gsap.to(item, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
    } else {
      gsap.to(item, { scale: 1, duration: 0.2, ease: 'power2.out' });
    }
  };

  const handleNavItemClick = (index: number) => {
    const item = navItemsRef.current[index];
    if (!item) return;

    gsap.to(item, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    });
  };

  const handleThemeButtonHover = (isEntering: boolean) => {
    if (!themeButtonRef.current) return;

    gsap.to(themeButtonRef.current, {
      scale: isEntering ? 1.1 : 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-full border-1 border-zinc-200 dark:border-zinc-50/12 px-6 py-3">
          <div className="flex items-center justify-between">
            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-4 md:space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <span className="text-gray-800 dark:text-white/90 font-light text-sm md:text-base">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div
        ref={headerRef}
        className="backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-full border-1 border-zinc-200 dark:border-zinc-50/12 px-6 py-3"
      >
        <div className="flex items-center justify-between">
          {/* Navigation */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-4 md:space-x-8">
              {navItems.map((item, index) => (
                <li 
                  key={item.name}
                  ref={(el) => {
                    if (el) navItemsRef.current[index] = el;
                  }}
                  onMouseEnter={() => handleNavItemHover(index, true)}
                  onMouseLeave={() => handleNavItemHover(index, false)}
                  onClick={() => handleNavItemClick(index)}
                >
                  <Link href={item.href}>
                    <span className="relative capitalize text-gray-800 dark:text-white/90 font-normal text-sm md:text-base cursor-pointer transition-colors duration-200 hover:text-gray-900 dark:hover:text-white">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <button
            ref={themeButtonRef}
            onClick={toggleTheme}
            onMouseEnter={() => handleThemeButtonHover(true)}
            onMouseLeave={() => handleThemeButtonHover(false)}
            className="ml-4 p-2 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            <div key={isDark ? 'dark' : 'light'}>
              {isDark ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}