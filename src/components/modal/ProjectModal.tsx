import { useState, useEffect } from 'react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioProject } from '../../lib/data-ru';
import { getAllProjectImages } from '../../lib/image-utils';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onCloseAction: () => void;
}

export default function ProjectModal({ project, onCloseAction }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (!project) {
      setAllImages([]);
      setCurrentImageIndex(0);
      return;
    }
    
    const images = getAllProjectImages(project.id);
    setAllImages(images);
    setCurrentImageIndex(0);
  }, [project]);
  
  if (!project) return null;

  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const isShowingFirstImage = currentImageIndex === 0;
  const currentImageAlt = isShowingFirstImage 
    ? `Афиша: ${project.title}`
    : `Фото ${currentImageIndex} постановки ${project.title}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onCloseAction}
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 md:mt-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  isShowingFirstImage 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  {isShowingFirstImage ? 'Афиша' : `Фото ${currentImageIndex}`}
                </span>
                {hasMultipleImages && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentImageIndex + 1} / {allImages.length}
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={onCloseAction}
              className="p-1 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="mb-4 md:mb-6 relative">
            {allImages.length > 0 ? (
              <div className="relative">
                <div className="relative h-48 md:h-96 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={currentImageAlt}
                    className="w-full h-full object-contain"
                  />
                  
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 md:p-2 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Предыдущее изображение"
                      >
                        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 md:p-2 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Следующее изображение"
                      >
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                    </>
                  )}
                </div>
                
                {hasMultipleImages && allImages.length > 1 && (
                  <div className="flex gap-1 md:gap-2 mt-2 md:mt-4 overflow-x-auto py-2 px-1">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 relative h-12 w-16 md:h-16 md:w-24 rounded overflow-hidden border-2 transition-all ${
                          currentImageIndex === index 
                            ? 'border-primary scale-105' 
                            : 'border-transparent opacity-70 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Превью ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] md:text-xs p-0.5 md:p-1 text-center">
                          {index === 0 ? 'Афиша' : `Фото ${index}`}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-48 md:h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Изображения не найдены</p>
              </div>
            )}
          </div>
          
          {project.fulldescription && (
            <div className="mb-4 md:mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Подробное описание
              </h3>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {project.fulldescription}
                </p>
              </div>
            </div>
          )}
          
          {project.videolink && project.videolink.trim() !== "" && (
            <div className="mb-4">
              <a
                href={project.videolink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 md:px-4 md:py-3 rounded-md hover:bg-primary/90 transition-colors text-sm md:text-base"
              >
                <Play className="h-4 w-4 md:h-5 md:w-5" />
                Смотреть видео постановки
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}