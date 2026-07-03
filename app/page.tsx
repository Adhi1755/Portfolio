'use client';

import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import WelcomeScreen from './components/WelcomeScreen';
import MainPage from './components/Home';
import StatsDashboard from './components/StatsDashboard';
import Journey from './components/Journey';
import Projects from './components/Project';
import TechnologyUniverse from './components/TechnologyUniverse';
import NasaFeature from './components/NasaFeature';
import NowBuilding from './components/NowBuilding';
import ContactComponent from './components/Connect';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [welcomed, setWelcomed] = useState(false);

  // After the welcome screen fades out, recalculate all ScrollTrigger positions.
  // 400ms gives mobile browsers time to reflow before measuring trigger positions.
  useEffect(() => {
    if (welcomed) {
      const id = setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => clearTimeout(id);
    }
  }, [welcomed]);

  // Re-measure on orientation change — mobile browser chrome height can shift
  // causing ScrollTrigger trigger positions to become stale.
  useEffect(() => {
    if (!welcomed) return;
    let timer: ReturnType<typeof setTimeout>;
    const onOrientationChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 300);
    };
    window.addEventListener('orientationchange', onOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', onOrientationChange);
      clearTimeout(timer);
    };
  }, [welcomed]);

  return (
    <>
      <WelcomeScreen onComplete={() => setWelcomed(true)} />

      <div
        style={{
          opacity: welcomed ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: welcomed ? 'auto' : 'none',
        }}
      >
        <MainPage />
        <StatsDashboard />
        <Journey />
        <Projects />
        <TechnologyUniverse />
        <NasaFeature />
        <NowBuilding />
        <ContactComponent />
      </div>
    </>
  );
}
