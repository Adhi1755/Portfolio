'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      const target = e.target as HTMLElement;
      hovering = !!target.closest('a, button, [data-cursor-hover]');
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`;
      ring.style.opacity = hovering ? '0.55' : '1';
      raf = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add('cursor-none-custom');
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('cursor-none-custom');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[999] w-1.5 h-1.5 rounded-full bg-black dark:bg-white pointer-events-none" />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[999] w-7 h-7 rounded-full border border-black/40 dark:border-white/40 pointer-events-none transition-[opacity] duration-200"
      />
    </>
  );
}
