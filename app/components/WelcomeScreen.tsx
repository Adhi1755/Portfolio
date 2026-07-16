'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(true);

  const greeting = 'WELCOME'.split('');

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
      // start hidden / dimmed
      gsap.set(letterRefs.current, { yPercent: 115, opacity: 0.22 });
      gsap.set([topMetaRef.current, quoteRef.current, bottomMetaRef.current], { opacity: 0, y: 14 });

      // Loading label: soft breathing pulse while the word fills.
      gsap.to(loadingRef.current, {
        opacity: 0.35,
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      });

      gsap.timeline({
        onComplete: () => {
          // Hand off to the hero, then the column panels swipe up one by one.
          onComplete();
          gsap.timeline({ onComplete: () => setVisible(false) })
            .to(contentRef.current, { opacity: 0, y: -28, duration: 0.4, ease: 'power2.in' }, 0)
            .to(panelRefs.current, {
              yPercent: -100,
              duration: 0.7,
              ease: 'power4.inOut',
              stagger: 0.09,
            }, 0.2);
        },
      })
        // corner meta rows
        .to(topMetaRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.15)
        .to(bottomMetaRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.25)
        // greeting: per-letter masked slide-up, still dimmed
        .to(letterRefs.current, { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.05 }, 0.3)
        .to(quoteRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3')
        // the loader: WELCOME ignites letter by letter as the progress meter
        .to(letterRefs.current, { opacity: 1, duration: 0.3, ease: 'power1.inOut', stagger: 0.2 }, '-=0.15')
        // hold for a beat before the panels lift
        .to({}, { duration: 0.3 });
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] will-change-transform"
    >
      {/* Column panels — the exit swipes them up one by one; the 1px overlap
          hides subpixel seams between them while idle */}
      <div aria-hidden className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="flex-1 -ml-px first:ml-0 bg-[#131110] will-change-transform"
          />
        ))}
      </div>
      <div
        ref={contentRef}
        className="relative h-full w-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-7 sm:py-8"
      >
        {/* Top meta row */}
        <div
          ref={topMetaRef}
          className="flex items-center justify-between text-[10px] sm:text-[11px] font-light uppercase tracking-[0.3em] text-gray-500 select-none"
        >
          <span>Adithya — Portfolio</span>
          <span>2026</span>
        </div>

        {/* Center: greeting + quote */}
        <div className="flex flex-col items-center gap-5 select-none">
          <h1
            aria-label="Welcome"
            className="flex justify-center text-[clamp(3rem,12vw,11rem)] font-semibold uppercase tracking-tight leading-none text-[#F2EFE9]"
          >
            {greeting.map((letter, i) => (
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
            ref={quoteRef}
            className="max-w-[90vw] text-center text-[11px] sm:text-xs font-light uppercase tracking-[0.35em] text-gray-400"
          >
            If it were easy, everyone would do it.
          </p>
        </div>

        {/* Bottom: quiet loading label */}
        <div
          ref={bottomMetaRef}
          className="flex items-center justify-center select-none"
        >
          <span
            ref={loadingRef}
            className="text-[10px] sm:text-[11px] font-light uppercase tracking-[0.3em] text-gray-500"
          >
            Loading
          </span>
        </div>
      </div>
    </div>
  );
}
