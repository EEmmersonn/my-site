//src\components\sections\Portfolio.tsx
import { useState } from 'react';
import { portfolioProjects, PortfolioProject, isProjectComingSoon } from '../../lib/data-ru';
import { ArrowRight, Calendar  } from 'lucide-react';
import { FadeIn } from '../common/fade-in';
import ProjectModal from '../modal/ProjectModal';
import { getProjectPoster } from '../../lib/image-utils';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  
  return (
    <>
      <section id="portfolio" className="relative w-full py-12 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-white/30" />
        <div className="relative container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Мои постановки</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Хореографические работы, представляющие синтез классической традиции и современных экспериментов.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            {portfolioProjects.map((project, index) => {
              const projectImageUrl = getProjectPoster(project.id);
              return (
                <FadeIn key={project.id} delay={index * 150}>
                  <div className="group h-full flex flex-col overflow-hidden border border-white/40 bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl rounded-lg">
                    <div className="relative overflow-hidden">
                      {/* БАДЖ ПРЕДСТОЯЩЕГО ПРОЕКТА */}
                      {project.isUpcoming && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-lg">
                            Предстоящий проект
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                      <img
                        src={projectImageUrl}
                        alt={project.title}
                        className="object-contain w-full aspect-video group-hover:scale-105 transition-transform duration-500"
                        loading="lazy" 
                        decoding="async"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/my-site/images/portfolio/default-poster.jpg';
                        }}
                      />
                    </div>
                    <div className="bg-card p-6 flex flex-col flex-grow rounded-b-lg">
                      <div className="p-0 pb-4">
                        <h3 className="font-headline text-xl font-semibold">{project.title}</h3>
                        {/* ДАТА ПРОЕКТА В КАРТОЧКЕ */}
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{project.date}</span>
                          {isProjectComingSoon(project.date) && (
                            <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                              Скоро
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-0 flex-grow">
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="p-0 pt-4">
                        <button 
                          className="text-primary p-0 h-auto flex items-center hover:underline"
                          onClick={() => setSelectedProject(project)}
                        >
                          Подробнее о постановке <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
      <ProjectModal
        project={selectedProject}
        onCloseAction={() => setSelectedProject(null)}
      />
    </>
  );
}