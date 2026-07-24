'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProjectModal from '../components/ProjectModal';
import { Providers } from '../providers';
import projects from '../../../public/projects.json';

const projectMeta = {
  'project-1': {
    eyebrow: 'Mobile product',
    role: 'Founding Engineer',
    variant: 'feature',
    imageRatio: 'aspect-[9/13]',
    interaction: 'zoom',
    priority: true,
    categories: ['mobile', 'full stack'],
  },
  'project-1-web': {
    eyebrow: 'Product website',
    role: 'Frontend · UX',
    variant: 'dark',
    imageRatio: 'aspect-[16/10]',
    interaction: 'pan',
    priority: true,
    categories: ['web', 'full stack'],
  },
  'project-2': {
    eyebrow: 'Game experience',
    role: 'Game Design',
    variant: 'stack',
    imageRatio: 'aspect-[16/10]',
    interaction: 'reveal',
    categories: ['web'],
  },
  'project-3': {
    eyebrow: 'Automation platform',
    role: 'Full-stack Engineering',
    variant: 'tall',
    imageRatio: 'aspect-[4/5]',
    interaction: 'lift',
    categories: ['mobile', 'full stack'],
  },
  'project-4': {
    eyebrow: 'Technical systems',
    role: 'Problem Solving',
    variant: 'wide',
    imageRatio: 'aspect-[16/9]',
    interaction: 'pan',
    categories: ['ai'],
  },
  'project-5': {
    eyebrow: 'AI game logic',
    role: 'C Development',
    variant: 'tall',
    imageRatio: 'aspect-[16/9]',
    interaction: 'zoom',
    categories: ['ai'],
  },
  'project-6': {
    eyebrow: 'Terminal puzzle',
    role: 'Game Logic',
    layout: 'lg:col-span-3',
    variant: 'tall',
    imageRatio: 'aspect-[4/5]',
    interaction: 'reveal',
    categories: ['web'],
  },
  'project-7': {
    eyebrow: 'Motion game',
    role: 'C · CSFML',
    layout: 'lg:col-span-3',
    variant: 'poster',
    dark: true,
    imageRatio: 'aspect-[4/5]',
    interaction: 'zoom',
    categories: ['web'],
  },
  'project-8': {
    eyebrow: 'Mobile commerce',
    role: 'React Native Engineering',
    variant: 'wide',
    interaction: 'zoom',
    categories: ['mobile'],
  },
  'project-9': {
    eyebrow: 'Generative music',
    role: 'Machine Learning',
    variant: 'dark',
    interaction: 'pan',
    categories: ['ai'],
  },
  'project-10': {
    eyebrow: 'Realtime dashboard',
    role: 'Frontend Engineering',
    variant: 'wide',
    interaction: 'lift',
    categories: ['web'],
  },
};

const fallbackVariants = ['feature', 'stack', 'dark', 'tall', 'wide', 'poster', 'compact'];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI' },
  { id: 'full stack', label: 'Full Stack' },
];

const getYear = (date = '') => {
  if (date.toLowerCase().includes('actual') || date.toLowerCase().includes('present')) {
    return 'Now';
  }

  return date.match(/\d{4}/g)?.at(-1) || date;
};

const getImageSrc = (src = '') => {
  if (!src) return '';
  return src.startsWith('/') ? src : `/${src.replace(/^\.\//, '')}`;
};

const getShortDescription = (description = '') => {
  const [firstSentence] = description.split(/(?<=[.!?])\s+/);
  return firstSentence.length > 150 ? `${firstSentence.slice(0, 147).trim()}...` : firstSentence;
};

const sortedProjects = [...projects].sort((a, b) => {
  if (a.id === 'project-1') return -1;
  if (b.id === 'project-1') return 1;
  if (a.id === 'project-1-web') return -1;
  if (b.id === 'project-1-web') return 1;

  const aYear = getYear(a.projectDate) === 'Now' ? 9999 : Number(getYear(a.projectDate));
  const bYear = getYear(b.projectDate) === 'Now' ? 9999 : Number(getYear(b.projectDate));

  return bYear - aYear;
});

function ProjectExhibit({ project, index, hoveredId, setHoveredId, onOpen, className = '', variant }) {
  const reduceMotion = useReducedMotion();
  const meta = { ...(projectMeta[project.id] || {}), ...(variant ? { variant } : {}) };
  const isHovered = hoveredId === project.id;
  const tools = project.Tools?.slice(0, project.id === 'project-1' || project.id === 'project-1-web' ? 5 : 4) || [];
  const imageSrc = getImageSrc(project.imageUrl);
  const isFeature = meta.variant === 'feature';
  const isDark = meta.variant === 'dark' || meta.dark;
  const isWide = meta.variant === 'wide';
  const isPoster = meta.variant === 'poster';
  const isStack = meta.variant === 'stack';
  const isTall = meta.variant === 'tall';
  const isCompact = meta.variant === 'compact';
  const shortDescription = getShortDescription(project.projectDescription);
  const cardHeight = isFeature
    ? 'min-h-[320px]'
    : isPoster
      ? 'min-h-[290px]'
      : isWide || isDark
        ? 'min-h-[220px]'
        : isTall
          ? 'min-h-[250px]'
        : isStack
          ? 'min-h-[160px]'
          : isCompact
            ? 'min-h-[190px]'
          : 'min-h-[220px]';
  const contentWidth = isFeature
    ? 'md:w-[36%] lg:w-[34%]'
    : isStack
      ? 'md:w-[42%]'
      : 'md:w-[38%] lg:w-[36%]';
  const imageFrame = isFeature
    ? 'm-4 min-h-[220px] flex-1 rounded-[6px] md:m-5 md:ml-0 md:self-stretch'
    : isPoster
      ? 'm-4 min-h-[200px] flex-1 rounded-[6px] md:m-5 md:ml-0 md:self-stretch'
      : isWide
        ? 'm-4 min-h-[170px] flex-1 rounded-[6px] md:ml-0 md:self-stretch'
      : isDark
        ? 'm-4 min-h-[125px] flex-1 rounded-[6px] md:ml-0 md:self-stretch'
        : isStack
          ? 'm-4 min-h-[125px] flex-1 rounded-[6px] md:ml-0 md:self-stretch'
          : isTall
            ? 'm-4 min-h-[135px] flex-1 rounded-[6px] md:ml-0 md:self-stretch'
          : isCompact
            ? 'm-4 min-h-[125px] flex-1 rounded-[6px] md:ml-0 md:self-stretch'
          : 'm-4 min-h-[155px] flex-1 rounded-[6px] md:ml-0 md:self-stretch';
  const imageFit = 'object-contain';

  const imageMotion = reduceMotion
    ? {}
    : {
        scale: isHovered && (meta.interaction === 'zoom' || meta.interaction === 'reveal') ? 1.025 : 1,
        x: isHovered && meta.interaction === 'pan' ? 8 : 0,
        y: isHovered && meta.interaction === 'lift' ? -7 : 0,
      };

  return (
    <motion.article
      className={`${className} group relative h-full outline-none`}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      onMouseEnter={() => {
        setHoveredId(project.id);
      }}
      onMouseLeave={() => {
        setHoveredId(null);
      }}
      onFocus={() => setHoveredId(project.id)}
      onBlur={() => setHoveredId(null)}
      tabIndex={-1}
    >
      <Link
        href={`/project?id=${project.id}`}
        onClick={(event) => {
          event.preventDefault();
          onOpen(project);
        }}
        className={`group/link relative flex h-full ${cardHeight} overflow-hidden rounded-[8px] border border-line/45 text-ink transition-[background-color,border-color,transform] duration-300 hover:!border-accent/80 hover:!text-ink hover:no-underline focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent ${
          isDark
            ? 'bg-ink/95 text-ink-inverse hover:!text-ink-inverse'
            : isPoster
              ? 'bg-brand-wash/55'
              : 'bg-surface-raised/45'
        } flex-col`}
        aria-label={`Open ${project.projectName} project`}
      >
        <span className={`absolute right-5 top-5 z-20 text-sm md:right-6 md:top-6 ${
          isDark ? 'text-brand-soft' : 'text-ink-muted'
        }`}>
          {getYear(project.projectDate)}
        </span>

        <div className="z-10 px-5 pt-5 md:px-6 md:pt-6">
          <h2 className={`pr-12 font-serif text-[clamp(1.65rem,1.8vw,2.1rem)] leading-[0.98] tracking-normal ${isDark ? 'text-ink-inverse' : 'text-ink'}`}>
            {project.projectName}
          </h2>
        </div>

        <div className="flex flex-1 flex-col md:flex-row">
          <div className={`z-10 flex flex-col px-5 pb-5 pt-3 md:px-6 md:pb-6 ${
            contentWidth
          }`}>
          <div>
            <p className="text-sm text-accent">
              {meta.eyebrow || 'Selected work'}
            </p>
            <p className={`mt-3 max-w-[25ch] text-sm leading-5 ${
              isDark ? 'text-brand-soft' : 'text-ink-muted'
            }`}>
              {shortDescription}
            </p>
          </div>

          <div className="mt-7 pt-3">
            <p className={`text-xs font-medium uppercase tracking-[0.16em] ${
              isDark ? 'text-ink-inverse' : 'text-ink'
            }`}>
              {meta.role || 'Software Engineering'}
            </p>
            <p className={isDark ? 'mt-2 text-xs leading-5 text-brand-soft' : 'mt-2 text-xs leading-5 text-ink-muted'}>
              {tools.join(' · ')}
            </p>
          </div>
          </div>

          <div className={`relative overflow-hidden ${imageFrame}`}>
            {imageSrc && (
              <motion.div
                className="absolute inset-0"
                animate={imageMotion}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={imageSrc}
                  alt={`${project.projectName} preview`}
                  fill
                  sizes={meta.priority ? '(min-width: 1024px) 42vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
                  className={`${imageFit} object-center`}
                  priority={Boolean(meta.priority)}
                />
              </motion.div>
            )}

          </div>
        </div>

      </Link>
    </motion.article>
  );
}

function EditorialGallery({ projects: galleryProjects, hoveredId, setHoveredId, onOpen }) {
  const byId = useMemo(
    () => Object.fromEntries(galleryProjects.map((project) => [project.id, project])),
    [galleryProjects]
  );
  const isFullSet = galleryProjects.length === sortedProjects.length;
  const renderProject = (id, index, className = '', variant) => {
    const project = byId[id];
    if (!project) return null;

    return (
      <ProjectExhibit
        key={project.id}
        project={project}
        index={index}
        hoveredId={hoveredId}
        setHoveredId={setHoveredId}
        onOpen={onOpen}
        className={className}
        variant={variant}
      />
    );
  };

  if (!isFullSet) {
    return (
      <section id="project-gallery" className="space-y-6 lg:space-y-8">
        {galleryProjects.map((project, index) => (
          <div
            key={project.id}
            className="grid gap-6 lg:gap-7"
          >
            <ProjectExhibit
              project={project}
              index={index}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              onOpen={onOpen}
              variant={fallbackVariants[index % fallbackVariants.length]}
              className=""
            />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="project-gallery" className="space-y-6 lg:space-y-8">
      <div className="projects-editorial-grid">
        {renderProject('project-1', 0, 'project-slot-feature', 'feature')}
        {renderProject('project-1-web', 1, 'project-slot-web', 'stack')}
        {renderProject('project-8', 2, 'project-slot-game', 'stack')}
        {renderProject('project-9', 3, 'project-slot-area', 'dark')}
        {renderProject('project-10', 4, 'project-slot-algorithmic', 'wide')}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-7">
        {renderProject('project-2', 5, '', 'poster')}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 lg:gap-7">
          {renderProject('project-3', 6, '', 'compact')}
          {renderProject('project-4', 7, '', 'compact')}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
        {renderProject('project-5', 8, '', 'compact')}
        {renderProject('project-6', 9, '', 'compact')}
        {renderProject('project-7', 10, '', 'compact')}
      </div>
    </section>
  );
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleProjects = useMemo(
    () => sortedProjects.filter((project) => {
      if (activeFilter === 'all') return true;
      return projectMeta[project.id]?.categories?.includes(activeFilter);
    }),
    [activeFilter]
  );

  return (
    <div className="min-h-screen bg-surface text-ink">
      <Providers>
        <Header />
        <Head>
          <title>Projects</title>
          <link rel="icon" href="/assets/brand/favicon.ico" />
        </Head>

        <main className="site-container pb-24 pt-12">
          <section className="pb-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr_0.55fr] lg:items-center">
              <div>
                <h1 className="mb-8 font-serif text-5xl font-normal text-ink md:mb-10 md:text-7xl">
                  Projects
                </h1>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-4 border-b border-line pb-5 sm:mt-12 sm:gap-8 sm:pb-6">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-200 hover:text-accent ${
                    activeFilter === filter.id ? 'text-accent' : 'text-ink-muted'
                  }`}
                >
                  {filter.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-200 ${
                      activeFilter === filter.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>

          <EditorialGallery
            projects={visibleProjects}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onOpen={setSelectedProject}
          />
        </main>
        <Footer />
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Providers>
    </div>
  );
}
