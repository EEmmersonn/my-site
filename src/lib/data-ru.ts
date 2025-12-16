//src\lib\data-ru.ts
import { Mail, Phone } from 'lucide-react';

// Создаем тип для проекта
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  fulldescription: string;
  videolink: string;
  link: string;
  date: string;
  isUpcoming?: boolean;
}

export const personalInfo = {
  name: "Иванова Роберта",
  bio: "Балетмейстер-постановщик с опытом создания современных хореографических спектаклей. Специализируюсь на синтезе классической хореографии и современных танцевальных техник.",
  email: "roberta.ivanova@example.com",
  phone: "+7 (999) 123-45-67",
};

export const socialLinks = [
  {
    name: "Почта",
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
  },
  {
    name: "Телефон",
    href: `tel:${personalInfo.phone}`,
    icon: Phone,
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "project-1",
    title: "«Mouth Mantra»",
    description: "Пластическая фантазия, иммерсивный спектакль, стремящийся раскрыть язык заклинания.",
    fulldescription: "Дорогие искатели тайн, Вы готовы открыть дверь в неизведанное? Приглашаем вас на уникальный иммерсивный спектакль `Mouth Mantra` — предупреждение о грядущем новом мире, который уже на пороге. Это не просто шоу, а путешествие в глубины мистики, где реальность и фантазия переплетаются, раскрывая скрытые тайны.Погрузитесь в атмосферу загадок, почувствуйте дыхание будущего и станьте частью истории, которая может изменить ваше настоящее. В этом мире каждый шаг — предупреждение, каждое слово — ключ к разгадке.",
    videolink: "", // добавьте реальную ссылку
    link: "#",
    date: "07.12.2025, 21.00",
    isUpcoming: false
  },
  {
    id: "project-2",
    title: "«Как избавиться от надоедливой пассии»",
    description: "Юмор, музыка, немного безумия и лёгкий лондонский шик - всё, как в лучших романтических историях.",
    fulldescription: "Что бы вы сделали, если бы вам навязали партнера, с которым нужно разделить всю свою жизнь? Можно страдать… А можно создать джентльменское пособие по избавлению от надоедливой пассии. Тедди мечтает о писательской славе и красивой жизни, но чтобы получить наследство, ему нужно жениться на заносчивой Амелии. Каждая их встреча — это настоящая дуэль характеров. Придумывая способы избавиться от этой неурядицы, Тедди пишет руководство «Как избавиться от надоедливой пассии». Лондон, его узкие улочки и разводные мосты становятся свидетелями небольших побед Тедди. Между спорами с Амелией и планами по спасению наследства в его голове всё чаще звучит «I’m in love with the shape of you», и он начинает сомневаться, что чувства возможно предугадать… Из этой истории точно выйдет роман!",
    videolink: "", // добавьте реальную ссылку
    link: "#",
    date: "28.02.2026, 19.00",
    isUpcoming: true
  },
];

export const navLinks = [
  { name: 'Обо мне', href: '#bio' },
  { name: 'Постановки', href: '#portfolio' },
  { name: 'Контакты', href: '#contact' },
];

export const isProjectComingSoon = (dateString: string): boolean => {
  try {
    // Парсим дату в формате "DD.MM.YYYY"
    const [datePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('.').map(Number);
    const projectDate = new Date(year, month - 1, day);
    const now = new Date();
    // Проверяем, что дата проекта в будущем
    if (projectDate <= now) return false;
    // Вычисляем разницу в миллисекундах
    const diffTime = projectDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Если осталось меньше 30 дней - это "скоро"
    return diffDays <= 30;
  } catch (error) {
    console.error('Ошибка при парсинге даты:', dateString, error);
    return false;
  }
};