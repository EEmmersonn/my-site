import { useState, useEffect } from 'react';
import { socialLinks } from '../../lib/data-ru';

export default function Footer() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const SunIcon = () => (
    <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const MoonIcon = () => (
    <svg className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  if (!mounted) {
    return (
      <footer className="w-full border-t bg-background mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Роберта Иванова. Все права защищены.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex items-center gap-4 border-l pl-6">
                {socialLinks.map((social) => (
                  <div
                    key={social.name}
                    className="h-5 w-5 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t bg-background mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Роберта Иванова. Все права защищены.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-colors group"
              aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
            >
              {isDark ? (
                <>
                  <SunIcon />
                  <span className="text-sm hidden sm:inline text-muted-foreground group-hover:text-foreground">
                    Светлая тема
                  </span>
                </>
              ) : (
                <>
                  <MoonIcon />
                  <span className="text-sm hidden sm:inline text-muted-foreground group-hover:text-foreground">
                    Темная тема
                  </span>
                </>
              )}
            </button>
            
            <div className="flex items-center gap-4 border-l pl-6">
              {socialLinks.map((social) => {
                // Получаем иконку как компонент
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-muted-foreground hover:text-primary transition-colors hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}