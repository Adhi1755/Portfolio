"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        // Use a small lag smoothing instead of 0 to avoid frame storm on tab re-focus
        gsap.ticker.lagSmoothing(500, 33);

        // Pause ticker when tab is hidden, resume when visible — prevents heat buildup
        const handleVisibility = () => {
            if (document.hidden) {
                gsap.ticker.sleep();
            } else {
                gsap.ticker.wake();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            gsap.ticker.remove(update);
            document.removeEventListener('visibilitychange', handleVisibility);
            lenis.destroy();
        };
    }, []);

    return null; // This component handles side effects only
}
