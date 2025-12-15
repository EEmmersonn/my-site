//src\lib\image-utils.ts

// Простая утилита для работы с изображениями в CRA
// В CRA все пути начинаются от public папки

// Всё должно начинаться с /my-site/ для GitHub Pages
const BASE_PATH = '/my-site';

// Статический список проектов
const PROJECT_IMAGES: Record<string, { poster: string; carousel: string[] }> = {
  'project-1': {
    poster: `${BASE_PATH}/images/portfolio/project-1/poster.jpg`,
    carousel: [
      `${BASE_PATH}/images/portfolio/project-1/carousel/photo1.jpg`,
      `${BASE_PATH}/images/portfolio/project-1/carousel/photo2.jpg`,
    ]
  },
  'project-2': {
    poster: `${BASE_PATH}/images/portfolio/project-2/poster.jpg`,
    carousel: [] // Нет фото в карусели
  }
};

// Дефолтные изображения
const DEFAULT_POSTER = `${BASE_PATH}/images/portfolio/default-poster.jpg`;
const DEFAULT_PROJECT_IMAGE = `${BASE_PATH}/images/portfolio/default.jpg`;

export const getProjectPoster = (projectId: string): string => {
  if (PROJECT_IMAGES[projectId]?.poster) {
    return PROJECT_IMAGES[projectId].poster;
  }
  
  return DEFAULT_POSTER;
};

export const getProjectCarouselImages = (projectId: string): string[] => {
  if (PROJECT_IMAGES[projectId]?.carousel) {
    return PROJECT_IMAGES[projectId].carousel;
  }
  
  return [DEFAULT_PROJECT_IMAGE];
};

// Синхронная функция
export const getAllProjectImages = (projectId: string): string[] => {
  const images: string[] = [];
  
  // Добавляем афишу
  const posterUrl = getProjectPoster(projectId);
  if (posterUrl !== DEFAULT_POSTER) {
    images.push(posterUrl);
  }
  
  // Добавляем фото карусели (если есть)
  const carouselImages = getProjectCarouselImages(projectId);
  if (carouselImages.length > 0 && carouselImages[0] !== DEFAULT_PROJECT_IMAGE) {
    images.push(...carouselImages);
  }
  
  // Если вообще нет изображений, добавляем дефолтное
  if (images.length === 0) {
    images.push(DEFAULT_PROJECT_IMAGE);
  }
  
  return images;
};

// Функция для получения списка всех доступных проектов
export const getAvailableProjects = (): string[] => {
  return Object.keys(PROJECT_IMAGES);
};

// Функция для проверки существования проекта
export const projectExists = (projectId: string): boolean => {
  return projectId in PROJECT_IMAGES;
};

// Функция для получения информации о проекте
export const getProjectInfo = (projectId: string) => {
  const exists = projectExists(projectId);
  const carousel = exists ? PROJECT_IMAGES[projectId].carousel : [];
  
  return {
    id: projectId,
    poster: getProjectPoster(projectId),
    carousel: getProjectCarouselImages(projectId),
    hasCarousel: carousel.length > 0,
    exists
  };
};

// Получение аватарки
export const getAvatar = (): string => {
  return `${BASE_PATH}/images/Avatar.jpg`;
};

// Получение дефолтного изображения проекта
export const getDefaultProjectImage = (): string => {
  return DEFAULT_PROJECT_IMAGE;
};

// Получение дефолтного постера
export const getDefaultPoster = (): string => {
  return DEFAULT_POSTER;
};