'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const name = 'ADITHYA'.split('');

  useEffect(() => {
    // Reduced motion: skip the choreography, show briefly, then hand off.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 400);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };

      // start hidden / zeroed
      gsap.set(letterRefs.current, { yPercent: 115 });
      gsap.set([topMetaRef.current, roleRef.current, bottomMetaRef.current], { opacity: 0, y: 14 });
      gsap.set(barRef.current, { scaleX: 0 });

      gsap.timeline({
        onComplete: () => {
          // Curtain lift: hand off to the hero as the overlay slides away,
          // so the hero entrance plays while the curtain rises.
          onComplete();
          gsap.timeline({ onComplete: () => setVisible(false) })
            .to(contentRef.current, { yPercent: -14, duration: 0.9, ease: 'power4.inOut' }, 0)
            .to(overlayRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 0);
        },
      })
        // corner meta rows
        .to(topMetaRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.15)
        .to(bottomMetaRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.25)
        // name: per-letter masked slide-up
        .to(letterRefs.current, { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.05 }, 0.3)
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3')
        // fake load: counter + hairline progress bar in lockstep
        .to(counter, {
          v: 100,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            }
          },
        }, 0.35)
        .to(barRef.current, { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0.35)
        // hold for a beat before the curtain
        .to({}, { duration: 0.2 });
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] bg-[#F2EFE9] will-change-transform"
    >
      <div
        ref={contentRef}
        className="relative h-full w-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-7 sm:py-8"
      >
        {/* Top meta row */}
        <div
          ref={topMetaRef}
          className="flex items-center justify-between text-[10px] sm:text-[11px] font-light uppercase tracking-[0.3em] text-gray-400 select-none"
        >
          <span>Adithya — Portfolio</span>
          <span>2026</span>
        </div>

        {/* Center: name + role */}
        <div className="flex flex-col items-center gap-5 select-none">
          <h1
            aria-label="Adithya"
            className="flex justify-center text-[clamp(3rem,12vw,11rem)] font-semibold uppercase tracking-tight leading-none text-black"
          >
            {name.map((letter, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span
                  ref={(el) => { letterRefs.current[i] = el; }}
                  className="inline-block will-change-transform"
                >
                  {letter}
                </span>
              </span>
            ))}
          </h1>
          <p
            ref={roleRef}
            className="text-[11px] sm:text-xs font-light uppercase tracking-[0.4em] text-gray-500"
          >
            Full Stack · AI · Data Science
          </p>
        </div>

        {/* Bottom row: loading label + counter */}
        <div
          ref={bottomMetaRef}
          className="flex items-end justify-between select-none"
        >
          <span className="mb-1.5 text-[10px] sm:text-[11px] font-light uppercase tracking-[0.3em] text-gray-400">
            Loading
          </span>
          <span
            ref={counterRef}
            className="text-4xl sm:text-5xl font-semibold tracking-tight tabular-nums text-black"
          >
            000
          </span>
        </div>
      </div>

      {/* Progress hairline along the very bottom */}
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-[2px] w-full bg-black origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
