import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../lib/data-ru';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              Портфолио
            </a>
            {/* Десктопное меню */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            {/* Мобильное меню - кнопка */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Мобильное меню - выпадающий список */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    onClick={handleNavClick}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
      {/* Оверлей для закрытия меню при клике вне его */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}