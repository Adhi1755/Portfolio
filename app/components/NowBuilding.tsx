'use client';
import React from 'react';
import Typewriter from 'typewriter-effect';

export default function NowBuilding() {
  return (
    <div className="relative bg-(--lab-bg) py-20 sm:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 lab-grid opacity-15" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs font-mono-lab tracking-[0.25em] uppercase text-zinc-500 mb-8">
          what i&apos;m building now
        </p>
        <div className="glass rounded-2xl px-6 py-5 text-left w-full max-w-md mx-auto">
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-(--lab-accent)/70" />
            <span className="ml-2 font-mono-lab text-[10px] text-zinc-500">now_building.sh</span>
          </div>
          <div className="font-mono-lab text-sm sm:text-base text-accent min-h-6 flex items-baseline gap-1">
            <span className="text-zinc-500">$</span>
            <Typewriter
              options={{
                strings: ['Building EmbedMindAI', 'Studying Generative AI', 'Open to internships'],
                autoStart: true,
                loop: true,
                delay: 45,
                deleteSpeed: 25,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
