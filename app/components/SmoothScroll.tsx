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

        // Define the update function for GSAP ticker
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        // Use GSAP ticker to update Lenis on every frame
        gsap.ticker.add(update);

        // Turn off GSAP's default lag smoothing to avoid conflicts with Lenis
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Cleanup
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return null; // This component handles side effects only
}
