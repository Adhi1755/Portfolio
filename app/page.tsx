'use client';

import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import MainPage from './components/Home';
import AboutMeContainer from './components/About';
import Projects from './components/Project';
import ContactComponent from './components/Connect';
import Certifications from './components/Certifications';

export default function Home() {
  const [welcomed, setWelcomed] = useState(false);

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
        <AboutMeContainer />
        <Projects />
        <Certifications />
        <ContactComponent />
      </div>
    </>
  );
}
