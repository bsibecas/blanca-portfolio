'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import ProjectModal from './ProjectModal';

const getYear = (date = '') => {
  if (/actual|present/i.test(date)) return 'Now';
  return date.match(/\d{4}/g)?.at(-1) || date;
};

const getShortDescription = (description = '') => {
  const [firstSentence] = description.split(/(?<=[.!?])\s+/);
  return firstSentence.length > 150
    ? `${firstSentence.slice(0, 147).trim()}...`
    : firstSentence;
};

function ProjectCard({ project, featured = false, onOpen }) {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const isDark = project.id === 'project-2';
  const tools = project.Tools?.slice(0, 4) || [];

  return (
    <motion.article
      className={featured ? 'lg:row-span-2' : ''}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/project?id=${project.id}`}
        onClick={(event) => {
          event.preventDefault();
          onOpen(project);
        }}
        className={`group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[8px] border border-line/45 transition-colors duration-300 hover:!border-accent/80 hover:no-underline ${
          isDark
            ? 'bg-ink/95 text-ink-inverse hover:!text-ink-inverse'
            : 'bg-surface-raised/45 text-ink hover:!text-ink'
        }`}
      >
        <span className={`absolute right-5 top-5 z-20 text-sm ${isDark ? 'text-brand-soft' : 'text-ink-muted'}`}>
          {getYear(project.projectDate)}
        </span>

        <div className="px-5 pt-5 md:px-6 md:pt-6">
          <h3 className={`pr-14 font-serif text-[clamp(1.8rem,2.3vw,2.7rem)] leading-none ${isDark ? 'text-ink-inverse' : 'text-ink'}`}>
            {project.projectName}
          </h3>
        </div>

        <div className="flex flex-1 flex-col md:flex-row">
          <div className={`z-10 flex flex-col justify-between px-5 pb-5 pt-4 md:px-6 md:pb-6 ${
            featured ? 'md:w-[35%]' : 'md:w-[44%]'
          }`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Selected work
              </p>
              <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-brand-soft' : 'text-ink-muted'}`}>
                {getShortDescription(project.projectDescription)}
              </p>
            </div>

            <div className="mt-6">
              <p className={`text-xs leading-5 ${isDark ? 'text-brand-soft' : 'text-ink-muted'}`}>
                {tools.join(' · ')}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                View project
                <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="relative m-4 mt-0 min-h-[160px] flex-1 overflow-hidden md:ml-0 md:mt-4">
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? {} : { scale: isHovered ? 1.025 : 1, x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={project.imageUrl}
                alt={`${project.projectName} preview`}
                fill
                sizes={featured ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function RecentProjectsSection({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const recentProjects = [...projects]
    .sort((a, b) => {
      const aCurrent = /actual|present/i.test(a.projectDate);
      const bCurrent = /actual|present/i.test(b.projectDate);
      if (aCurrent !== bCurrent) return aCurrent ? -1 : 1;
      return Number(getYear(b.projectDate)) - Number(getYear(a.projectDate));
    })
    .slice(0, 3);

  return (
    <section className="mt-20 pb-16 animate-section">
      <div className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Selected work</p>
          <h2 className="mt-3 font-serif text-4xl font-normal text-ink md:text-6xl">
            Most Recent Projects
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors hover:!text-accent hover:no-underline sm:inline-flex"
        >
          View all
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] lg:gap-7">
        {recentProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={index === 0}
            onOpen={setSelectedProject}
          />
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
