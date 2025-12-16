//src\components\sections\Biography.tsx
import React from 'react';
import { personalInfo } from '../../lib/data-ru';
import { FadeIn } from '../common/fade-in';

// Создаем компонент с мемоизацией
function BiographyComponent() {
  return (
    <section id="bio" className="w-full py-20 md:py-32 lg:py-40 ">
      <FadeIn>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-primary">
                {personalInfo.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-headline">Балетмейстер-постановщик</h2>
              <p className="max-w-[600px] text-foreground/80 text-lg/relaxed md:text-xl/relaxed">
                {personalInfo.bio}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/my-site/images/Avatar.jpg"
                alt="Фото разработчика"
                className="w-[400px] h-[400px] rounded-full object-cover aspect-square shadow-2xl shadow-primary/20"
                loading="lazy" // ← Добавлена ленивая загрузка
                decoding="async" // ← Оптимизация декодирования
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// Обертываем компонент в React.memo для мемоизации
const Biography = React.memo(BiographyComponent);

// Экспортируем мемоизированную версию
export default Biography;