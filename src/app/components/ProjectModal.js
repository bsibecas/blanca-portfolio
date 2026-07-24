'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const projectMedia = {
  'project-1': [
    '/assets/projects/share-to-go/app/cover.png',
    '/assets/projects/share-to-go/app/phones-one.png',
    '/assets/projects/share-to-go/app/phones-two.png',
    '/assets/projects/share-to-go/app/phones-three.png',
    '/assets/projects/share-to-go/app/video-demo.mp4',
  ],
  'project-1-web': [
    '/assets/projects/share-to-go/web/cover.png',
    '/assets/projects/share-to-go/web/about.png',
    '/assets/projects/share-to-go/web/dashboard.png',
    '/assets/projects/share-to-go/web/home-record.mp4',
    '/assets/projects/share-to-go/web/about-r4ecord.mp4',
    '/assets/projects/share-to-go/web/companies-record.mp4',
    '/assets/projects/share-to-go/web/dashboard-record.mp4',
  ],
  'project-2': [
    '/assets/projects/work-in-progress/cover.png',
    '/assets/projects/work-in-progress/cover-game.png',
    '/assets/projects/work-in-progress/detail.png',
    '/assets/projects/work-in-progress/screenshot-01.png',
    '/assets/projects/work-in-progress/screenshot-02.png',
  ],
  'project-3': [
    '/assets/projects/area/cover.png',
    '/assets/projects/area/cover-area.png',
    '/assets/projects/area/coverw.png',
    '/assets/projects/area/detail.png',
    '/assets/projects/area/screenshot-01.png',
    '/assets/projects/area/screenshot-02.png',
  ],
  'project-4': [
    '/assets/projects/algorithmic/cover.png',
  ],
  'project-5': [
    '/assets/projects/matchstick/cover.png',
    '/assets/projects/matchstick/detail.png',
    '/assets/projects/matchstick/demo.mp4',
  ],
  'project-6': [
    '/assets/projects/sokoban/cover.png',
    '/assets/projects/sokoban/detail.png',
  ],
  'project-7': [
    '/assets/projects/runner/cover.png',
    '/assets/projects/runner/detail.png',
    '/assets/projects/runner/parallax.png',
    '/assets/projects/runner/demo.mp4',
  ],
  'project-8': [
    '/assets/projects/mobile-pos/cover.png',
    '/assets/projects/mobile-pos/phones-one.png',
    '/assets/projects/mobile-pos/phones-two.png',
    '/assets/projects/mobile-pos/phones-three.png',
    '/assets/projects/mobile-pos/phones-four.png',
    '/assets/projects/mobile-pos/phones-five.png',
  ],
  'project-9': [
    '/assets/projects/ai-music-generator/cover.png',
  ],
  'project-10': [
    '/assets/projects/meteo/cover.png',
    '/assets/projects/meteo/home.png',
  ],
};

export default function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const media = useMemo(() => {
    if (!project) return [];
    const fallbackMedia = [
      project.imageUrl,
      project.projectImage,
      project.imageExtra1,
      project.imageExtra2,
      project.videoUrl,
    ].filter(Boolean);

    return (projectMedia[project.id] || fallbackMedia).map((src) => ({
      type: /\.mp4$/i.test(src) ? 'video' : 'image',
      src,
    }));
  }, [project]);
  const [activeMedia, setActiveMedia] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    thumbnailRefs.current[activeMedia]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeMedia]);

  useEffect(() => {
    if (!project) return undefined;

    setActiveMedia(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        setActiveMedia((current) => (current - 1 + media.length) % media.length);
      }
      if (event.key === 'ArrowRight') {
        setActiveMedia((current) => (current + 1) % media.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [media.length, onClose, project]);

  if (!mounted || !project) return null;

  const showPrevious = () => {
    setActiveMedia((current) => (current - 1 + media.length) % media.length);
  };
  const showNext = () => {
    setActiveMedia((current) => (current + 1) % media.length);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink/65 p-3 backdrop-blur-sm md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        className="relative grid max-h-[94vh] w-full max-w-[1400px] overflow-y-auto rounded-[8px] border border-line bg-surface shadow-2xl lg:h-[88vh] lg:grid-cols-[1.12fr_0.88fr] lg:overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-30 flex h-11 w-11 items-center justify-center rounded-[6px] border border-line bg-surface/95 text-ink shadow-md transition-colors hover:border-accent hover:bg-accent hover:text-white md:absolute md:right-5 md:top-5"
          aria-label="Close project"
          title="Close"
        >
          <X size={23} aria-hidden="true" />
        </button>

        <div className="flex min-h-[420px] flex-col border-b border-line bg-surface-muted/45 p-4 md:p-6 lg:min-h-0 lg:border-b-0 lg:border-r">
          <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-[6px] bg-brand-wash md:min-h-[480px]">
            {media[activeMedia]?.type === 'image' && (
              <img
                src={media[activeMedia].src}
                alt={`${project.projectName} view ${activeMedia + 1}`}
                className="h-full w-full object-contain p-3 md:p-5"
              />
            )}

            {media[activeMedia]?.type === 'video' && (
              <video
                key={media[activeMedia].src}
                className="h-full w-full object-contain"
                controls
                autoPlay
                playsInline
                preload="metadata"
              >
                <source src={media[activeMedia].src} type="video/mp4" />
              </video>
            )}

            {media.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-[6px] border border-line bg-surface/90 text-ink transition-colors hover:border-accent hover:text-accent"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={21} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-[6px] border border-line bg-surface/90 text-ink transition-colors hover:border-accent hover:text-accent"
                  aria-label="Next image"
                >
                  <ChevronRight size={21} aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {media.length > 1 && (
            <div className="media-strip mt-3 flex max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1">
              {media.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  ref={(element) => {
                    thumbnailRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => setActiveMedia(index)}
                  className={`relative aspect-[16/9] w-24 shrink-0 overflow-hidden rounded-[4px] border bg-brand-wash transition-colors sm:w-28 ${
                    activeMedia === index ? 'border-accent' : 'border-line hover:border-line-strong'
                  }`}
                  aria-label={item.type === 'video' ? 'Show project video' : `Show image ${index + 1}`}
                  aria-pressed={activeMedia === index}
                >
                  {item.type === 'image' ? (
                    <img src={item.src} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <video src={item.src} muted preload="metadata" className="h-full w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
                        <Play size={20} fill="currentColor" aria-hidden="true" />
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-8 md:px-10 md:py-10 lg:overflow-y-auto lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Project</p>
          <h2 id="project-modal-title" className="mt-3 pr-14 font-serif text-4xl leading-none text-ink md:text-6xl">
            {project.projectName}
          </h2>
          <p className="mt-3 text-sm text-ink-muted">{project.projectDate}</p>

          <div className="mt-8 border-t border-line pt-7">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {project.introductionTitle || 'About'}
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink-muted">
              {project.projectIntroduction || project.projectDescription}
            </p>
          </div>

          {project.projectInfo && (
            <div className="mt-7">
              <h3 className="font-serif text-2xl text-ink">{project.projectInfoTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{project.projectInfo}</p>
            </div>
          )}

          {project.usageProject && (
            <div className="mt-7">
              <h3 className="font-serif text-2xl text-ink">{project.usageTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{project.usageProject}</p>
            </div>
          )}

          <div className="mt-8 border-t border-line pt-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Tools</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.Tools?.map((tool) => (
                <span key={tool} className="rounded-[4px] border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-[6px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong hover:!text-white hover:no-underline"
            >
              {project.urlReference || 'Visit project'}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
}
