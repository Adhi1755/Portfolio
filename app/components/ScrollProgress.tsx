'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Thin scroll-progress bar along the top edge plus a back-to-top button
 * that fades in once the user has scrolled past the hero.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 34, mass: 0.4 });
  const [showTop, setShowTop] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[210] h-[2px] origin-left bg-black dark:bg-white"
        style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      />
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-[180] flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/70 dark:border-zinc-700/70 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md text-gray-500 dark:text-gray-400 shadow-lg shadow-black/5 dark:shadow-black/30 transition-colors duration-200 hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
