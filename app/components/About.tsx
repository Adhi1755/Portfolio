'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutMeContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const socialLinksRef = useRef<HTMLDivElement | null>(null);
  const firstDivRef = useRef<HTMLDivElement | null>(null);
  const secondDivRef = useRef<HTMLDivElement | null>(null);
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const skillsHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const skillsData = [
  {
    category: "Programming Foundations",
    items: ["C", "Java", "Python"],
  },

  {
    category: "Databases",
    items: ["MySQL", "NoSQL", "MongoDB"],
  },

  {
    category: "Backend & APIs",
    items: ["FastAPI", "Flask", "Node/Next.js"], // kept Next.js in backend group since you listed it with backend stack
  },

  {
    category: "Frontend & Frameworks",
    items: ["React.js", "Next.js", "React Native", "HTML", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS"],
  },

  {
    category: "Data Science & Machine Learning",
    items: ["MachineLearning", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"],
  },

  {
    category: "Visualization & Design",
    items: ["GSAP Animation", "React Model", "Figma"], // kept "React Model" as you wrote it
  },

  {
    category: "Tools & Cloud",
    items: ["Git", "GitHub", "Excel", "PowerBI", "Azure Cloud"],
  },
];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states for intro elements
      gsap.set([headingRef.current, descriptionRef.current, socialLinksRef.current], {
        opacity: 0
      });

      // Timeline for initial entrance animations (immediate)
      const tl = gsap.timeline();

      tl.fromTo(firstDivRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(secondDivRef.current,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );

      // Create a master timeline for scroll-synced animations
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "top 20%",
          scrub: 0.8,
        }
      });

      // Add animations to the master timeline with relative timing
      masterTL
        .fromTo(headingRef.current, {
          y: -60,
          opacity: 0,
          scale: 0.8
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }, 0)

        .fromTo(descriptionRef.current, {
          x: 50,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }, 0.2)

        .fromTo(socialLinksRef.current, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 0.4)

        .fromTo(containerRef.current, {
          opacity: 0.7
        }, {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        }, 0);

      // SKILLS section animation using selectors (reliable)
      const skillsContainer = skillsContainerRef.current;
      const skillsHeading = skillsHeadingRef.current;
      if (skillsContainer && skillsHeading) {
        // Select all category headings and all skill items inside the skills container
        const categoryHeadings: Element[] = Array.from(skillsContainer.querySelectorAll('.skill-category-heading'));
        const skillItems: Element[] = Array.from(skillsContainer.querySelectorAll('.skill-item'));

        // Set initial states
        gsap.set(skillsHeading, { y: 60, opacity: 0 });
        if (categoryHeadings.length) {
          gsap.set(categoryHeadings, { y: 40, opacity: 0 });
        }
        if (skillItems.length) {
          gsap.set(skillItems, { y: 40, opacity: 0, scale: 0.8 });
        }

        // Timeline for skills
        const skillsTL = gsap.timeline({
          scrollTrigger: {
            trigger: skillsContainer,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.5,
          }
        });

        // Animate main SKILLS heading
        skillsTL.to(skillsHeading, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        // Animate category headings with a small stagger
        if (categoryHeadings.length) {
          skillsTL.to(categoryHeadings, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              each: 0.12,
              from: "start"
            }
          }, "-=0.4");
        }

        // Animate all skill chips with a stagger (after headings start)
        if (skillItems.length) {
          skillsTL.to(skillItems, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            stagger: {
              amount: 0.9,
              from: "start"
            }
          }, "-=0.7");
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id='about'
      ref={containerRef}
      className="bg-white dark:bg-black transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 grid.lightModeColors max-w-7xl mx-auto">

        {/* First Div - 3 columns on desktop, full width on mobile */}
        <div ref={firstDivRef} className="col-span-1 md:col-span-3 z-50">
          {/* About Me Section - Centered */}
          <div className="space-y-8 ml-5 lg:text-left">

            {/* Heading */}
            <div ref={headingRef}>
              <h2 className="text-4xl   md:text-5xl font-light text-black mb-8 dark:text-white">
                ABOUT ME
              </h2>
            </div>

            {/* Description */}
            <div ref={descriptionRef} className="space-y-3 font-extralight ">
              <p className="text-xl  md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed">
                I am a <span className='font-normal'>pre-final year B.Tech student majoring in Computer Science Engineering (Data Science)</span> at Dayananda Sagar University, Bengaluru, with a current <span className='font-normal'>CGPA 8.56 (up to the 4th semester)</span>. I am deeply passionate about Artificial Intelligence and its development, with a strong focus on solving real-world problems through full-stack development integrated with AI.
              </p>

              <p className="text-xl md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed">
                Currently, <span className='font-normal'>I am actively upskilling in AI and Machine Learning</span>, while also enhancing my problem-solving abilities through <span className='font-normal'>Data Structures and Algorithms (DSA)</span>. I am particularly interested in the evolving field of Generative AI and continuously explore new technologies and AI agents to build impactful, real-world projects.
              </p>

              <p className="text-xl md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed">
                Recently, I had the chance to participate in the <span className='font-normal'>NASA Space Apps Challenge 2024</span>, where my team won under the title of <span className='font-normal'>Art and Technology Award</span>.
              </p>
            </div>

            {/* Social Media Links */}
            <div ref={socialLinksRef}>
              <div className="flex justify-center lg:justify-start space-x-6">

                {/* Contact Button */}
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
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Contact
                  </button>
                </div>

                {/* Resume Download Button */}
                <div className="pt-1">
                  <button

                    className="px-5 sm:px-6 py-2.5 sm:py-3 border border-black  dark:border-zinc-500 text-gray-700 dark:text-gray-400 bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-full font-light tracking-wide text-sm sm:text-base flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    Resume
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Second Div - 1 column on desktop, full width on mobile */}
        <div ref={secondDivRef} className="col-span-1 md:col-span-2 z-40">
          <div className="h-full rounded-lg flex items-center justify-center">
            <div className='w-full relative h-full group mx-auto backdrop-blur-4xl z-40 bg-white/5 border border-gray-300 dark:border-gray-400 rounded-2xl dark:text-white text-black flex flex-col'>
              {/* Image container - now fills available height dynamically */}
              <div className='w-full rounded-t-md flex-grow overflow-hidden transition-all duration-300 relative min-h-0'>
                <div className='absolute inset-0 group-hover:scale-95 transition-all duration-300'>
                  <Image
                    src={'/Avatar.png'}
                    alt='Avatar'
                    width={600}
                    height={600}
                    className='h-full w-full scale-90 group-hover:scale-100 grayscale group-hover:grayscale-0 object-cover transition-all duration-300'
                  />
                </div>
              </div>

              {/* Content section - fixed height for consistent layout */}
              <article className='relative overflow-hidden flex-shrink-0 h-20 group-hover:h-30 transition-all duration-300'>
                <div className='info p-2 translate-y-0 group-hover:-translate-y-20 transition-all duration-300 text-center'>
                  <p className='md:text-4xl font-medium truncate text-gray-700 dark:text-gray-400'>Adithya.N</p>
                </div>
                <button className='absolute h-10 -bottom-6 opacity-0 group-hover:opacity-100 cursor-pointer group-hover:bottom-10 transition-all duration-300 w-full text-center flex justify-center space-x-6'>
                  {/* GitHub */}
                  <a
                    href="https://github.com/Adhi1755"
                    className="group flex items-center justify-center w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-7 h-7 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/adithyanagamuneendran/"
                    className="group flex items-center justify-center w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-7 h-7 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>


                  {/* Email */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=adithya1755@gmail.com"
                    className="group flex items-center justify-center w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-7 h-7 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </button>
              </article>
            </div>
          </div>
        </div>

        {/* skills section */}
        <div ref={skillsContainerRef} className="col-span-1 md:col-span-5 mt-8 md:mt-12 z-10">
          <div className="max-w-7xl">
            <div className="mb-12 sm:mb-16 lg:mb-20 ml-5">
              <h3 ref={skillsHeadingRef} className="text-4xl   md:text-5xl font-light text-black mb-8 dark:text-white">
                SKILLS
              </h3>

              {skillsData.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-8">
                  {/* Category Heading */}
                  <h4 className="skill-category-heading text-xl md:text-2xl font-extralight text-black dark:text-white mb-4">
                    {group.category}
                  </h4>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
                    {group.items.map((skill, index) => (
                      <div
                        key={index}
                        className="skill-item px-5 sm:px-6 py-2.5 sm:py-2.5 border backdrop-blur-4xl bg-transparent border-black  dark:border-zinc-500 text-gray-700 dark:text-gray-400  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-full font-light tracking-wide text-sm sm:text-base"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeContainer;
