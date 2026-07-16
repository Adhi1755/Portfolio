'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Text link that plays a download micro-interaction on click:
 * the ↗ becomes a ↓ falling through a mask while a hairline progress
 * line draws under the label, then a ✓ pops in, holds, and reverts.
 * The actual download is the anchor's native behavior — the animation
 * is purely decorative and skipped under prefers-reduced-motion.
 */
const DownloadLink: React.FC<{
  href: string;
  label?: string;
  className?: string;
}> = ({ href, label = 'Resume', className = '' }) => {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const busyRef = useRef(false);

  useEffect(() => () => {
    tlRef.current?.kill();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (busyRef.current) {
      e.preventDefault(); // one download per animation cycle
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const arrow = arrowRef.current;
    const line = lineRef.current;
    if (!arrow || !line) return;

    busyRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
      },
    });
    tlRef.current = tl;

    tl.call(() => { arrow.textContent = '↓'; })
      // arrow streams down through the mask while the line "loads"
      .fromTo(arrow, { yPercent: -130 }, { yPercent: 130, duration: 0.4, ease: 'power1.in', repeat: 2 }, 0)
      .fromTo(
        line,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.25, ease: 'power2.inOut' },
        0,
      )
      // done: check pops up from below
      .call(() => {
        arrow.textContent = '✓';
        if (liveRef.current) liveRef.current.textContent = `${label} downloaded`;
      })
      .fromTo(arrow, { yPercent: 130 }, { yPercent: 0, duration: 0.5, ease: 'back.out(2.5)' })
      // hold, then the check drops out and the ↗ returns from above
      .to(arrow, { yPercent: 130, duration: 0.3, ease: 'power2.in' }, '+=1.1')
      .call(() => {
        arrow.textContent = '↗';
        if (liveRef.current) liveRef.current.textContent = '';
      })
      .fromTo(arrow, { yPercent: -130 }, { yPercent: 0, duration: 0.35, ease: 'power2.out' })
      .to(line, { scaleX: 0, transformOrigin: 'right center', duration: 0.45, ease: 'power2.inOut' }, '<');
  };

  return (
    <a
      href={href}
      download
      onClick={handleClick}
      aria-label={`Download ${label.toLowerCase()}`}
      className={`group inline-flex items-baseline gap-1.5 text-xs font-normal uppercase tracking-[0.22em] ${className}`}
    >
      <span className="relative">
        {label}
        <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
        <span ref={lineRef} className="absolute left-0 -bottom-1 h-px w-full bg-current scale-x-0" />
      </span>
      <span className="inline-block w-[1em] overflow-hidden text-center transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        <span ref={arrowRef} className="inline-block will-change-transform">↗</span>
      </span>
      <span ref={liveRef} aria-live="polite" className="sr-only" />
    </a>
  );
};

export default DownloadLink;
