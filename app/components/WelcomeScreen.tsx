'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';

const DUST_COUNT = 14;

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const darkMaskRef = useRef<HTMLDivElement>(null);
  const dustRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(true);

  const name = 'Adithya'.split('');

  // Deterministic dust props (avoids hydration mismatch from Math.random in render)
  const dustParticles = useMemo(() =>
    Array.from({ length: DUST_COUNT }, (_, i) => ({
      size: 3 + (i % 5),
      hue:  28 + (i * 13) % 38,
      sat:  45 + (i *  7) % 30,
      lit:  55 + (i * 11) % 28,
    })), []
  );

  useEffect(() => {
    // Torch state — mutated directly to avoid re-renders
    const pos = { x: 50, y: -22, r: 130 };

    function updateMask() {
      if (!darkMaskRef.current) return;
      darkMaskRef.current.style.background =
        `radial-gradient(circle ${pos.r}px at ${pos.x}% ${pos.y}%, ` +
        `rgba(255,238,170,0.10) 0%, transparent 22%, transparent 52%, ` +
        `rgba(0,0,0,0.84) 72%, rgba(0,0,0,0.99) 100%)`;
    }

    updateMask();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl
        // ── 1. Torch descends from above ──────────────────────────────────────
        .to(pos, { y: 38, r: 142, duration: 0.9, ease: 'power2.out', onUpdate: updateMask })

        // subtle flicker on entry
        .to(darkMaskRef.current, { opacity: 0.88, duration: 0.06 })
        .to(darkMaskRef.current, { opacity: 1.00, duration: 0.10 })
        .to(darkMaskRef.current, { opacity: 0.93, duration: 0.07 })
        .to(darkMaskRef.current, { opacity: 1.00, duration: 0.09 })

        // ── 2. Scan left ───────────────────────────────────────────────────────
        .to(pos, { x: 30, y: 44, r: 135, duration: 0.95, ease: 'sine.inOut', onUpdate: updateMask })
        // micro-tremor
        .to(pos, { x: 32, y: 46, duration: 0.18, ease: 'sine.inOut', onUpdate: updateMask })
        .to(pos, { x: 28, y: 43, duration: 0.18, ease: 'sine.inOut', onUpdate: updateMask })

        // ── 3. Scan right ──────────────────────────────────────────────────────
        .to(pos, { x: 70, y: 52, r: 138, duration: 1.1, ease: 'sine.inOut', onUpdate: updateMask })
        .to(pos, { x: 68, y: 54, duration: 0.16, ease: 'sine.inOut', onUpdate: updateMask })
        .to(pos, { x: 72, y: 50, duration: 0.16, ease: 'sine.inOut', onUpdate: updateMask })

        // ── 4. Return to centre, hover ─────────────────────────────────────────
        .to(pos, { x: 50, y: 49, r: 140, duration: 0.65, ease: 'sine.inOut', onUpdate: updateMask })
        .to({}, { duration: 0.2 })

        // ── 5. TORCH FALLS ─────────────────────────────────────────────────────
        .to(pos, { y: 120, r: 45, duration: 0.38, ease: 'power3.in', onUpdate: updateMask })

        // ── 6. IMPACT ──────────────────────────────────────────────────────────
        .call(() => {
          // Screen shake (x + tiny y)
          gsap.timeline()
            .to(overlayRef.current, { x: -13, y:  4, duration: 0.05, ease: 'none' })
            .to(overlayRef.current, { x:  11, y: -3, duration: 0.05, ease: 'none' })
            .to(overlayRef.current, { x:  -8, y:  2, duration: 0.05, ease: 'none' })
            .to(overlayRef.current, { x:   6, y: -1, duration: 0.05, ease: 'none' })
            .to(overlayRef.current, { x:  -3, y:  1, duration: 0.05, ease: 'none' })
            .to(overlayRef.current, { x:   0, y:  0, duration: 0.05, ease: 'none' });

          // Dust burst upward from bottom-centre
          dustRefs.current.forEach((el, i) => {
            if (!el) return;
            const angle  = -Math.PI / 2 + (i - DUST_COUNT / 2) * (Math.PI / (DUST_COUNT - 1)) * 1.7;
            const dist   = 55 + (i % 5) * 28;
            gsap.fromTo(el,
              { opacity: 0.9, scale: 1, x: 0, y: 0 },
              {
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: 0,
                scale: 0.15,
                duration: 0.55 + (i % 4) * 0.15,
                ease: 'power2.out',
              }
            );
          });

          // White flash → fade away, revealing text on black
          if (darkMaskRef.current) {
            darkMaskRef.current.style.background = 'rgba(255,255,255,0.90)';
            darkMaskRef.current.style.opacity    = '1';
          }
          gsap.to(darkMaskRef.current, { opacity: 0, duration: 0.80, ease: 'power2.out' });
        })

        // ── 7. Hold — "Adithya." fully visible on black ────────────────────────
        .to({}, { duration: 1.15 })

        // ── 8. Fade out, hand off ──────────────────────────────────────────────
        .to(overlayRef.current, {
          opacity: 0, duration: 0.6, ease: 'power2.inOut',
          onComplete: () => { setVisible(false); onComplete(); },
        });
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* ── Text revealed through the torch ──────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none select-none">
        <div className="flex items-end gap-[2px]">
          <h1 className="flex items-end text-[clamp(3.5rem,10vw,8rem)] font-semibold tracking-tighter leading-none text-white">
            {name.map((letter, i) => (
              <span key={i} className="inline-block">{letter}</span>
            ))}
          </h1>
          <span className="inline-block mb-[0.15em] text-[clamp(3.5rem,10vw,8rem)] font-bold text-(--lab-accent) leading-none">
            .
          </span>
        </div>
        <div className="mt-4 h-px w-[clamp(3rem,14vw,9rem)] bg-(--lab-accent) rounded-full" />
        <p className="mt-4 text-sm sm:text-base font-light tracking-widest uppercase text-gray-500">
          AI · ML · Full-Stack
        </p>
      </div>

      {/* ── Dust particles — animate from bottom-centre on impact ─────────────── */}
      <div className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 pointer-events-none">
        {dustParticles.map((p, i) => (
          <div
            key={i}
            ref={(el) => { dustRefs.current[i] = el; }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
            style={{
              width:      p.size + 'px',
              height:     p.size + 'px',
              background: `hsl(${p.hue}, ${p.sat}%, ${p.lit}%)`,
            }}
          />
        ))}
      </div>

      {/* ── Dark mask — torch hole punched by radial-gradient ─────────────────── */}
      <div
        ref={darkMaskRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.99)' }}
      />
    </div>
  );
}
