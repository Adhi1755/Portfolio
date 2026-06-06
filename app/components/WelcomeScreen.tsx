'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(true);

  const name = 'Adithya'.split('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // fade the whole overlay out
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });
        },
      });

      // start hidden
      gsap.set(letterRefs.current, { opacity: 0, y: 40 });
      gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 10 });

      // stagger name letters in
      tl.to(letterRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.3,
      })
        // dot pops in
        .to(dotRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, '-=0.15')
        // line expands
        .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out', transformOrigin: 'left center' }, '-=0.1')
        // tagline fades in
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15')
        // hold for a beat, then exit
        .to({}, { duration: 1.1 });
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-white dark:bg-black"
    >
      {/* name */}
      <div className="flex items-end gap-[2px] select-none">
        <h1 className="flex items-end text-[clamp(3.5rem,10vw,8rem)] font-semibold tracking-tighter leading-none text-black dark:text-white">
          {name.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              className="inline-block"
            >
              {letter}
            </span>
          ))}
        </h1>
        <span
          ref={dotRef}
          className="inline-block mb-[0.15em] text-[clamp(3.5rem,10vw,8rem)] font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent leading-none"
        >
          .
        </span>
      </div>

      {/* expanding line */}
      <div
        ref={lineRef}
        className="mt-4 h-px w-[clamp(3rem,14vw,9rem)] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
      />

      {/* tagline */}
      <p
        ref={taglineRef}
        className="mt-4 text-sm sm:text-base font-light tracking-widest uppercase text-gray-400 dark:text-gray-500"
      >
        AI · ML · Full-Stack
      </p>
    </div>
  );
}
