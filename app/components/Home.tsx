'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect';
import Magnet from './Magnet/Magnet'
import Image from 'next/image';
import Link from 'next/link';

const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLParagraphElement>(null);
  const navItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Achievements", href: "/certificates" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([greetingRef.current, nameRef.current, typewriterRef.current, profileRef.current, descriptionRef.current, buttonRef.current], {
        opacity: 0,
        y: 20
      });

      // Create timeline for staggered animations
      const tl = gsap.timeline();

      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
        .to(greetingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4")
        .to(nameRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4")
        .to(typewriterRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4")
        .to(profileRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4")
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id='home' className="min-h-screen transition-colors duration-300 text-black dark:bg-black dark:text-white overflow-hidden">
      {/* Main Content */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center"
        style={{ opacity: 0 }}
      >
        {/* Name */}
        <p ref={greetingRef} className="text-xltext-gray-700  font-light md:text-2xl text-center z-50">Heyy, I&apos;mm</p>
        <h1
          ref={nameRef}
          className="text-5xl md:text-6xl  font-medium mb-1 text-center z-50"
        >
          Adithya
        </h1>

        <div ref={typewriterRef} className='text-xl md:text-xl font-extralight text-gray-700 dark:text-gray-400 z-50'>
          <Typewriter
            options={{
              strings: [
                "Aspiring AI/ML Engineer",
                "Problem Solver",
                "Front-end Developer",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        {/* Profile Image */}
        <div ref={profileRef} className="relative z-50">
          <div className="w-60 h-60 md:w-60 md:h-60 rounded-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl">
              <Magnet padding={100} disabled={false} magnetStrength={15}>
                <Image
                  src="/Avatar.png"
                  alt="Profile picture"
                  width={300}
                  height={400}
                />
              </Magnet>

            </div>
          </div>
        </div>

        {/* Description */}
    
        <div className="flex justify-center gap-3 mb-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-1.5 my-1 z-10 rounded-full text-sm
            backdrop-blur-md bg-white/30 dark:bg-black/30
            border border-zinc-200 dark:border-zinc-50/20
            text-zinc-800 dark:text-zinc-200
            hover:bg-white/50 dark:hover:bg-black/50
            hover:scale-105 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full max-w-3xl mx-auto
  backdrop-blur-md bg-white/20 dark:bg-black/20
  rounded-full border border-zinc-200 dark:border-zinc-50/20
  px-3 py-3 my-1 z-10">

          {/* Resume Icon with Tooltip */}
          <div className="relative group">
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center
        w-10 h-10 rounded-full border border-zinc-200
       
        text-black dark:text-white
        hover:scale-110 transition"
            >
              {/* Document SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 2v6h6"
                />
              </svg>
            </a>

            {/* Tooltip */}
            <span
              className="absolute left-1/2 -translate-x-1/2 top-12
        whitespace-nowrap rounded-md
        bg-zinc-900 text-white text-xs
        px-2 py-1
        opacity-0 scale-95
        group-hover:opacity-100 group-hover:scale-100
        transition pointer-events-none"
            >
              Resume
            </span>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Ask anything about adhi"
            className="flex-1 bg-transparent outline-none
      text-zinc-900 dark:text-zinc-100
      placeholder-zinc-500 dark:placeholder-zinc-400"
          />

          {/* Arrow Button */}
          <button
            className="flex items-center justify-center
      w-10 h-10 rounded-full
      bg-zinc-900 dark:bg-white
      text-white dark:text-black
      hover:scale-110 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </button>

        </div>


      </div>
    </div>
  );
};

export default MainPage;