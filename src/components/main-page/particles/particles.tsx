'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  if (!init) return null;

  return (
    <Particles
      id='tsparticles'
      url='/particles/particles.json'
      particlesLoaded={particlesLoaded}
      className='absolute inset-0 -z-10'
    />
  );
}
