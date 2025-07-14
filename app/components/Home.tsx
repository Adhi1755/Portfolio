'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typewriter from 'typewriter-effect';
import Magnet from './Magnet/Magnet'
import Image from 'next/image';

const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLParagraphElement>(null);

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
        <p ref={greetingRef} className="text-xltext-gray-700  font-light md:text-2xl text-center">Heyy, I&apos;mm</p>
        <h1
          ref={nameRef}
          className="text-5xl md:text-6xl  font-medium mb-1 text-center"
        >
          Adithya
        </h1>
        
        <div ref={typewriterRef} className='text-xl md:text-xl font-extralight text-gray-700 dark:text-gray-400'>
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
        <div ref={profileRef} className="relative">
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
        <p
          ref={descriptionRef}
          className="text-xl font-extralight md:text-2xl text-center max-w-4xl text-gray-700 dark:text-gray-400"
        >
          Passionate about AI & ML, currently exploring Generative AI and combining it with web development to build smart, impactful solutions
        </p>
         <div ref={buttonRef} className='flex items-center justify-between mt-8 space-x-3'>
            <div className="pt-1">
        <button
        onClick={() => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
          
          className="px-5 sm:px-6 py-2.5 sm:py-3 border border-black dark:border-zinc-500 text-gray-700 dark:text-gray-400 bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-full font-light tracking-wide text-sm sm:text-base flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          Contact
        </button>
      </div>

      {/* Resume Download Button */}
      <div className="pt-1">
        <button
        onClick={() => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
          
          className="px-5 sm:px-6 py-2.5 sm:py-3 border border-black dark:border-zinc-500 text-gray-700 dark:text-gray-400 bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-full font-light tracking-wide text-sm sm:text-base flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Resume
        </button>
      </div>
         </div>
      

      </div>
    </div>
  );
};

export default MainPage;