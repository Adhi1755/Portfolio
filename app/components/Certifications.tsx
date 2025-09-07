'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type Cert = {
  id: number;
  title: string;
  issuer: string;
  date: string; // e.g. "Jun 2024"
  link?: string;
  badgeSrc?: string; // optional local image path
};

const sampleCerts: Cert[] = [
  { id: 1, title: "Machine Learning A-Z", issuer: "Coursera", date: "Apr 2024", link: "#" },
  { id: 2, title: "Azure Fundamentals (AZ-900)", issuer: "Microsoft Learn", date: "Jan 2024", link: "#" },
  { id: 3, title: "Full-Stack Web Development", issuer: "freeCodeCamp", date: "Dec 2023", link: "#" },
  // replace above sample items with your certifications
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const headingEl = headingRef.current;
      const cardEls: Element[] = Array.from(cardsRef.current?.querySelectorAll('.cert-card') || []);

      // initial states
      if (headingEl) gsap.set(headingEl, { y: 60, opacity: 0 });
      if (cardEls.length) gsap.set(cardEls, { y: 40, opacity: 0, scale: 0.98 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 0.6,
        }
      });

      // animate heading first
      if (headingEl) {
        tl.to(headingEl, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // animate cards with stagger
      if (cardEls.length) {
        tl.to(cardEls, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: { each: 0.12, from: 'start' },
        }, '-=0.4');
      }

      // small hover pop for cards (keeps style consistent with your portfolio)
      cardEls.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.02, duration: 0.18, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, duration: 0.18, ease: 'power2.out' });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="bg-white dark:bg-black transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="ml-5 mb-10">
          <h3 ref={headingRef} className="text-4xl md:text-5xl font-light text-black mb-6 dark:text-white">
            CERTIFICATIONS
          </h3>
          <p className="text-gray-700 dark:text-gray-400 font-extralight max-w-2xl">
            Selected certificates that showcase my learning journey — click a card to view certificate details.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-5">
          {sampleCerts.map(cert => (
            <article
              key={cert.id}
              onClick={() => cert.link && window.open(cert.link, '_blank')}
              className="cert-card cursor-pointer p-5 border border-black dark:border-zinc-500 rounded-2xl bg-transparent dark:bg-transparent transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]"
            >
              <div className="flex items-start gap-4">
                {cert.badgeSrc ? (
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image src={cert.badgeSrc} alt={`${cert.title} badge`} width={64} height={64} className="object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-black dark:text-white">
                    <span className="font-medium text-sm">{cert.issuer.slice(0,2).toUpperCase()}</span>
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-medium text-black dark:text-white mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-light">
                    {cert.issuer} • <span className="font-extralight">{cert.date}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-light truncate max-w-[70%]">{cert.link ? 'View credential' : 'Offline certificate'}</p>
                {cert.link ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); window.open(cert.link, '_blank'); }}
                    className="px-4 py-2 border border-black dark:border-zinc-500 rounded-full text-sm font-light transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    Open
                  </button>
                ) : (
                  <div className="text-xs text-gray-500 dark:text-gray-400">—</div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
