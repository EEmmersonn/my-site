import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-rose-50 to-orange-50" />
      
      {/* Частицы */}
      <Particles
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 70, density: { enable: true, area: 900 } },
            color: { value: '#fcd34d' }, // amber-300
            links: {
              enable: true,
              color: '#fbbf24', // amber-400
              opacity: 0.25,
              distance: 140,
            },
            move: { enable: true, speed: 0.3 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.5 },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}