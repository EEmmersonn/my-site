import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function ParticlesBackground() {
  const [isDark, setIsDark] = useState(false);
  
  // Отслеживаем смену темы
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Слушаем изменения темы
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Адаптивный фон */}
      <div className={`
        absolute inset-0 
        transition-colors duration-500
        ${isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-white via-rose-50 to-orange-50'
        }
      `} />
      
      {/* Адаптивные частицы */}
      <Particles
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 70, density: { enable: true, area: 900 } },
            color: { 
              value: isDark ? '#94a3b8' : '#fcd34d' // slate-400 в темной, amber-300 в светлой
            },
            links: {
              enable: true,
              color: isDark ? '#64748b' : '#fbbf24', // slate-500 в темной, amber-400 в светлой
              opacity: isDark ? 0.15 : 0.25,
              distance: 140,
            },
            move: { enable: true, speed: 0.3 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: isDark ? 0.3 : 0.5 },
          },
          detectRetina: true,
        }}
        key={isDark ? 'dark' : 'light'} // Перезагружаем частицы при смене темы
      />
    </div>
  );
}