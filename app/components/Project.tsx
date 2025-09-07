'use client'
import { useEffect , useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from '@react-hook/media-query';
import { MoveUpRight } from 'lucide-react';
import React, { useState,  useCallback,  } from 'react';
import Image from 'next/image';
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger) 

interface ImageData {
  id: number;
  src: string;
  alt: string;
  description : string;
  link? : string;
}

const images: ImageData[] = [
  {
    id: 1,
    src: '/images/InventoryManagementSystem.png',
    alt: 'Inventory Management System',
    description: "Built using Flask, this project showcases my skills in full-stack web development, including user authentication, data visualization with Chart.js, responsive UI design, SQL database management, and real-time inventory tracking",
    link: 'https://github.com/Adhi1755/InventoryHub',
  },
  {
    id: 2,
    src: '/images/HeartPredict.png',
    alt: 'Heart Disease Prediction',
    description: "Heart Disease Prediction using machine learning models to identify at-risk patients based on health indicators. By using Python, Pandas, Scikit-learn, EDA, Model Training, Evaluation Metrics, Data Visualization, Logistic Regression, Random Forest.",
    link: 'https://github.com/Adhi1755/Heat_Diseases_Prediction',
  },
  {
    id: 3,
    src: '/images/Orrery-web-app.png',
    alt: 'Orrey Web App',
    description: "Developed for the NASA Space Apps Challenge 2024, this web app visually simulates the solar system using animated planetary orbits. Built with HTML, CSS, and JavaScript, it includes interactive planet details displayed via a custom toolbox positioned over the orbital paths.",
    link: 'https://github.com/Adhi1755/Orrery-web-app',
  },
  {
    id: 4,
    src: '/images/Portfolio.png',
    alt: 'Portfolio',
    description: "A personal portfolio built using Next.js, Tailwind CSS, and GSAP animations to showcase my work and skills. This project helps me practice and strengthen my knowledge in modern web development, UI design, and interactive animations.",
    link: '#Home',
  },
];

export default function Projects() {
  
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [activeImage, setActiveImage] = useState<ImageData | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  const card1Ref = useRef<HTMLDivElement>(null);
  const contentCardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageItemsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectItemsRef = useRef<HTMLDivElement[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;

    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove]);

  const handleImageHover = useCallback(
    (image: ImageData) => {
      if (activeImage !== image) {
        setActiveImage(image);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setOpacity(1);
          setScale(1);
        }, 50);
      } else {
        setOpacity(1);
        setScale(1);
      }
    },
    [activeImage]
  );

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveImage(null);
    }, 300);
  }, []);
  
  const handleProjectClick = (image: ImageData): void => {
  if (image.link) {
    window.open(image.link, '_blank', 'noopener,noreferrer');
  } else {
    console.warn(`No link found for project: ${image.alt}`);
  }
};

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // GSAP ScrollTrigger Animation
  useGSAP(() => {
    // Wait for client-side rendering
    if (!isClient || !containerRef.current) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Ensure all elements exist before animating
        const titleEl = titleRef.current;
        const descEl = descriptionRef.current;
        const buttonEl = buttonRef.current;
        const projectItems = projectItemsRef.current.filter(Boolean);

        if (!titleEl || !descEl || !buttonEl || projectItems.length === 0) return;

        // Set initial states
        gsap.set([titleEl, descEl, buttonEl], {
          opacity: 0,
          y: 60,
          scale: 0.9,
        });

        gsap.set(projectItems, {
          opacity: 0,
          y: 40,
          scale: 0.95,
        });

        // Create timeline for left section with scrub
        const leftTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 1, // Smooth scrubbing with 1 second catch-up
            markers: false,
          }
        });

        // Animate left section elements with stagger
        leftTl
          .to(titleEl, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          })
          .to(descEl, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }, "-=0.7")
          .to(buttonEl, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }, "-=0.5");

        // Create timeline for project items with scrub and stagger
        const projectTl = gsap.timeline({
          scrollTrigger: {
            trigger: contentCardsRef.current,
            start: "top 85%",
            end: "bottom 80%",
            scrub: 1.2, // Slightly slower scrubbing for smoother effect
            markers: false,
          }
        });

        // Animate project items with stagger
        projectTl.to(projectItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          stagger: {
            amount: 1.5, // Total time for stagger
            from: "start",
            ease: "power2.out",
          },
          ease: "power2.out",
        });

        // Add a subtle parallax effect to the entire container
        gsap.to(containerRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
            markers: false,
          }
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

      }, containerRef);

      return () => {
        ctx.revert();
        clearTimeout(timer);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isClient]); // Add isClient dependency

  if (!isClient) return null; 

  return (
    <div ref={containerRef} id="projects" className="min-h-screen mt-0 mb-0 bg-white p-4 md:p-6 lg:p-8 flex justify-center items-center overflow-hidden dark:bg-black ">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
        {/* Projects Section */}
        <div id='card1' ref={card1Ref}  className="bg-white dark:bg-black   border rounded-2xl md:border-0 md:rounded-[0px] md:border-r-2  p-8 flex flex-col justify-between min-h-[500px] lg:min-h-[600px] lg:col-span-2">
          <div>
            <h1 ref={titleRef} className="text-4xl  md:text-5xl font-light text-black mb-8 dark:text-white">
              RECENT WORKS
            </h1>
            <p ref={descriptionRef} className="text-gray-700 dark:text-gray-400  font-extralight text-xl mb-8 ">
              Here are some of the projects I have  worked on recently, where I combined my knowledge in AI, web development, and problem-solving to build practical, real-world solutions.
            </p>
          </div>
          {/* GitHub Button */}
      <div className="pt-1 flex justify-center">
        <button ref={buttonRef} onClick={() => window.open("https://github.com/Adhi1755", "_blank")}
          className="px-5 sm:px-6 py-2.5 sm:py-3 border border-black dark:border-zinc-500 text-gray-700 dark:text-gray-400 bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-full font-light tracking-wide text-sm sm:text-base flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </button>
      </div>
        </div>

        {/* Content Cards Section */}
        <div ref={contentCardsRef} className=" grid grid-cols-1 gap-4 lg:gap-2 lg:col-span-3">
          <div
      className='relative w-full min-h-fit  rounded-md '
      onMouseLeave={handleMouseLeave}
    >
      {images.map((image, index) => (
        <div
          key={image.id}
          ref={(el) => {
            if (el) projectItemsRef.current[index] = el;
          }}
          className={`p-4 cursor-pointer relative sm:flex items-center justify-between border border-gray-200 dark:border-gray-700 lg:border-none rounded-2xl shadow-sm hover:shadow-md lg:shadow-none lg:hover:shadow-none transition-shadow duration-300 mb-4 lg:mb-2`}
          onMouseEnter={() => handleImageHover(image)}
        >
          {!isDesktop && (
            <Image
              src={image?.src}
              className='sm:w-32 sm:h-20 w-full h-52 object-cover rounded-2xl mb-4'
              alt='mobileImg'
              width={600}
              height={400}
            />
          )}
          <div className="flex-1">
            <h2
              className={`newFont dark:text-gray-300  md:text-4xl sm:text-xl text-xl  sm:py-6 py-2 leading-[100%] relative ${
                activeImage?.id === image?.id
                  ? 'mix-blend-difference z-20 text-gray-300'
                  : 'text-gray-700'
              }`}
            >
              {image.alt}
            </h2>
            
            
            
              <p className={`text-sm sm:text-base font-light dark:text-gray-400 text-gray-600 leading-relaxed mb-4 sm:mb-0 ${
                activeImage?.id === image?.id
                  ? 'mix-blend-difference z-20 text-gray-300'
                  : 'text-gray-700'
              }`}>
                {image.description}
              </p>

              {/* Mobile Button */}
              <button
                onClick={() => handleProjectClick(image)}
                className="sm:hidden w-full px-4 py-2 mt-3 border border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-400 bg-white dark:bg-black rounded-2xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 transition-all duration-200  text-sm font-light"
              >
                View Project
              </button>
          </div>
          
          
          {/* Desktop Button */}
          <button
            onClick={() => handleProjectClick(image)}
            className={`sm:block hidden p-4 rounded-full transition-all duration-300 ease-out ${
              activeImage?.id === image?.id
                ? 'mix-blend-difference z-20 bg-white text-black'
                : ''
            }`}
          >
            <MoveUpRight className='w-8 h-8' />
          </button>
          <div
            className={`h-[2px] dark:bg-white bg-black absolute bottom-0 left-0 transition-all duration-300 ease-linear ${
              activeImage?.id === image?.id ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      ))}
      {isDesktop && activeImage && (
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          width={450}
          height={250}
          className={`fixed dark:bg-gray-950 bg-white object-cover pointer-events-none z-10 w-[450px] h-[250px] rounded-lg`}
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity: opacity,
          }}
        />
      )}
    </div>

        </div>
          
      </div>
      
    </div>
  );
}