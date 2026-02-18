'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect';
import Magnet from './Magnet/Magnet'
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Smile, Briefcase, Layers, Sparkles, UserSearch } from 'lucide-react';

const navItems = [
  {
    name: "Me",
    href: "/about",
    icon: <Smile size={26} strokeWidth={1.5} className="text-teal-500" />,
    color: "bg-teal-50 dark:bg-teal-950",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <Briefcase size={26} strokeWidth={1.5} className="text-green-600" />,
    color: "bg-green-50 dark:bg-green-950",
  },
  {
    name: "Skills",
    href: "/skills",
    icon: <Layers size={26} strokeWidth={1.5} className="text-purple-500" />,
    color: "bg-purple-50 dark:bg-purple-950",
  },
  {
    name: "Fun",
    href: "/fun",
    icon: <Sparkles size={26} strokeWidth={1.5} className="text-pink-500" />,
    color: "bg-pink-50 dark:bg-pink-950",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <UserSearch size={26} strokeWidth={1.5} className="text-orange-500" />,
    color: "bg-orange-50 dark:bg-orange-950",
  },
];

const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          greetingRef.current,
          nameRef.current,
          typewriterRef.current,
          profileRef.current,
          descriptionRef.current,
          searchBarRef.current,
          navCardsRef.current,
        ],
        { opacity: 0, y: 20 }
      );

      const tl = gsap.timeline();

      tl.to(containerRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to(greetingRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .to(typewriterRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .to(profileRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .to(searchBarRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(navCardsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="home" className="min-h-screen transition-colors duration-300 text-black dark:bg-black dark:text-white overflow-hidden">
      <div
        ref={containerRef}
        className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center gap-2"
        style={{ opacity: 0 }}
      >
        {/* Greeting */}
        <p ref={greetingRef} className="text-xl text-gray-700 dark:text-gray-300 font-light md:text-2xl text-center z-50">
          Heyy, I&apos;m
        </p>

        {/* Name */}
        <h1 ref={nameRef} className="text-5xl md:text-6xl font-medium mb-1 text-center z-50">
          Adithya
        </h1>

        {/* Typewriter */}
        <div ref={typewriterRef} className="text-xl md:text-xl font-extralight text-gray-700 dark:text-gray-400 z-50">
          <Typewriter
            options={{
              strings: ['Aspiring AI/ML Engineer', 'Problem Solver', 'Front-end Developer'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        {/* Profile Image */}
        <div ref={profileRef} className="relative z-50">
          <div className="w-72 h-72 md:w-72 md:h-72 rounded-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl">
              <Magnet padding={100} disabled={false} magnetStrength={25}>
                <Image src="/Avatar.png" alt="Profile picture" width={300} height={300} />
              </Magnet>
            </div>
          </div>
        </div>

        {/* Description */}


        {/* ── Glassmorphism Search Bar ── */}
        <div ref={searchBarRef} className="w-full max-w-md mx-auto z-50">
          <div
            className="
              flex items-center w-full h-14 rounded-full
              bg-white/1 dark:bg-white/20
              backdrop-blur-2xl
              text-gray-800 dark:text-white/90 font-light text-sm md:text-base
              border-1 border-zinc-200
              px-2
              transition-all duration-300
              focus-within:shadow-[0_4px_40px_rgba(0,0,0,0.14)]
            "
          >
            {/* Spacer / left padding */}
            <div className="w-4" />

            {/* Input */}
            <input
              type="text"
              id="ask-me-anything"
              placeholder="Ask me anything..."
              className="
                flex-1 bg-transparent outline-none
                text-sm text-gray-700 dark:text-gray-200
                placeholder-gray-400 dark:placeholder-gray-500
              "
            />

            {/* Blue arrow button */}
            <button
              aria-label="Submit"
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full shrink-0
                bg-blue-500/60 hover:bg-blue-600/60
                text-white
                active:scale-95
                transition-all duration-200
                shadow-md
              "
            >
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ── Navigation Cards ── */}
        <div
          ref={navCardsRef}
          className="flex flex-wrap justify-center gap-3 w-full max-w-3xl mx-auto z-50 mt-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                group flex flex-col items-center justify-center
                w-[5.5rem] h-[3.5rem] md:w-28 md:h-18.5
                rounded-2xl
                bg-white/20 dark:bg-white/10
                backdrop-blur-2xl
                hover:-translate-y-1
                border-1 border-zinc-200
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.05)]
                dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.2)]
                transition-all duration-300
                cursor-pointer
              "
            >
              {/* Icon bubble */}
              <div className={`flex items-center justify-center w-4 h-4  rounded-xl mb-1`}>
                {item.icon}
              </div>
              <span className="text-gray-800 dark:text-white/90 text-xs md:text-xs">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;