'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type Mode = 'default' | 'hover' | 'text' | 'input';

const FRAME_SIZE = 44;

/**
 * Editorial two-part cursor matching the site's hairline/viewfinder language:
 * an instant crosshair (two hairlines + a square center tick) plus a lagging
 * corner-bracketed square frame that locks onto links and buttons.
 * mix-blend-difference self-inverts it over the cream and ink sections alike
 * (and over the adaptive navigation bar).
 * Renders nothing on touch devices or when the user prefers reduced motion,
 * so the native cursor is never hidden there.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const crossRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const modeRef = useRef<Mode>('default');

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (finePointer && !reducedMotion) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cross = crossRef.current;
    const frame = frameRef.current;
    const label = labelRef.current;
    const hLine = hLineRef.current;
    const vLine = vLineRef.current;
    const center = centerRef.current;
    if (!cross || !frame || !label || !hLine || !vLine || !center) return;

    document.documentElement.classList.add('has-custom-cursor');

    gsap.set(cross, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    gsap.set(frame, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.7 });

    const crossX = gsap.quickTo(cross, 'x', { duration: 0.06, ease: 'power2.out' });
    const crossY = gsap.quickTo(cross, 'y', { duration: 0.06, ease: 'power2.out' });
    const frameX = gsap.quickTo(frame, 'x', { duration: 0.38, ease: 'power3.out' });
    const frameY = gsap.quickTo(frame, 'y', { duration: 0.38, ease: 'power3.out' });

    const frameVisible = () => modeRef.current === 'hover' || modeRef.current === 'text';

    const applyMode = (mode: Mode, text = '') => {
      if (modeRef.current === mode && label.textContent === text) return;
      modeRef.current = mode;
      if (text) label.textContent = text;

      switch (mode) {
        case 'hover':
          // Crosshair rotates into an ×; the viewfinder frame locks on.
          gsap.to(cross, { rotate: 45, scale: 1.1, autoAlpha: 1, duration: 0.3, ease: 'power3.out' });
          gsap.to(hLine, { scaleX: 1, autoAlpha: 1, duration: 0.2 });
          gsap.to(vLine, { scaleY: 1, duration: 0.2 });
          gsap.to(center, { autoAlpha: 0, duration: 0.2 });
          gsap.to(frame, {
            width: FRAME_SIZE, height: FRAME_SIZE, scale: 1, autoAlpha: 1,
            backgroundColor: 'rgba(255,255,255,0)', duration: 0.3, ease: 'power3.out',
          });
          gsap.to(label, { autoAlpha: 0, duration: 0.15 });
          break;
        case 'text':
          // Filled square badge carrying the action label (e.g. "Open").
          gsap.to(cross, { autoAlpha: 0, duration: 0.2 });
          gsap.to(frame, {
            width: 84, height: 84, scale: 1, autoAlpha: 1,
            backgroundColor: 'rgba(255,255,255,1)', duration: 0.3, ease: 'power3.out',
          });
          gsap.to(label, { autoAlpha: 1, duration: 0.25, delay: 0.05 });
          break;
        case 'input':
          // Collapse to a text caret: vertical hairline only.
          gsap.to(frame, { autoAlpha: 0, scale: 0.7, duration: 0.25 });
          gsap.to(label, { autoAlpha: 0, duration: 0.15 });
          gsap.to(cross, { rotate: 0, scale: 1, autoAlpha: 1, duration: 0.25 });
          gsap.to(hLine, { scaleX: 0, autoAlpha: 0, duration: 0.2 });
          gsap.to(vLine, { scaleY: 1.25, duration: 0.2 });
          gsap.to(center, { autoAlpha: 0, duration: 0.2 });
          break;
        default:
          gsap.to(cross, { rotate: 0, scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power3.out' });
          gsap.to(hLine, { scaleX: 1, autoAlpha: 1, duration: 0.2 });
          gsap.to(vLine, { scaleY: 1, duration: 0.2 });
          gsap.to(center, { autoAlpha: 1, duration: 0.2 });
          gsap.to(frame, { autoAlpha: 0, scale: 0.7, duration: 0.25 });
          gsap.to(label, { autoAlpha: 0, duration: 0.15 });
      }
    };

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([cross, frame], { x: e.clientX, y: e.clientY });
        gsap.to(cross, { autoAlpha: 1, duration: 0.25 });
        if (frameVisible()) gsap.to(frame, { autoAlpha: 1, duration: 0.25 });
      }
      crossX(e.clientX);
      crossY(e.clientY);
      frameX(e.clientX);
      frameY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el || !(el instanceof Element)) return;
      const textEl = el.closest('[data-cursor-text]');
      if (textEl) {
        applyMode('text', textEl.getAttribute('data-cursor-text') ?? '');
        return;
      }
      if (el.closest('input, textarea, select, [contenteditable="true"]')) {
        applyMode('input');
        return;
      }
      if (el.closest('a, button, [role="button"], [data-cursor="hover"]')) {
        applyMode('hover');
        return;
      }
      applyMode('default');
    };

    const onDown = () => gsap.to([frame, cross], { scale: (i: number) => (i === 0 ? 0.88 : 0.8), duration: 0.2, ease: 'power2.out' });
    const onUp = () => {
      gsap.to(frame, { scale: frameVisible() ? 1 : 0.7, duration: 0.35, ease: 'back.out(2.5)' });
      gsap.to(cross, { scale: modeRef.current === 'hover' ? 1.1 : 1, duration: 0.35, ease: 'back.out(2.5)' });
    };

    const onDocLeave = () => gsap.to([cross, frame], { autoAlpha: 0, duration: 0.25 });
    const onDocEnter = () => {
      gsap.to(cross, { autoAlpha: modeRef.current === 'text' ? 0 : 1, duration: 0.25 });
      if (frameVisible()) gsap.to(frame, { autoAlpha: 1, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onDocLeave);
    document.documentElement.addEventListener('mouseenter', onDocEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onDocLeave);
      document.documentElement.removeEventListener('mouseenter', onDocEnter);
      gsap.killTweensOf([cross, frame, label, hLine, vLine, center]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Lagging viewfinder frame: hairline square with corner brackets */}
      <div
        ref={frameRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[600] flex items-center justify-center border border-white/25 mix-blend-difference will-change-transform"
        style={{ width: FRAME_SIZE, height: FRAME_SIZE, opacity: 0 }}
      >
        <span className="absolute -top-px -left-px w-2 h-2 border-t border-l border-white" />
        <span className="absolute -top-px -right-px w-2 h-2 border-t border-r border-white" />
        <span className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-white" />
        <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-white" />
        <span
          ref={labelRef}
          className="select-none text-[10px] font-medium uppercase tracking-[0.14em] text-black"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Instant crosshair: two hairlines + a square center tick */}
      <div
        ref={crossRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[601] mix-blend-difference will-change-transform"
        style={{ width: 0, height: 0, opacity: 0 }}
      >
        <div ref={hLineRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[18px] bg-white" />
        <div ref={vLineRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[18px] bg-white" />
        <div ref={centerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-white" />
      </div>
    </>
  );
}
