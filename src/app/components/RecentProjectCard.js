import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function ProjectCard({ project, isImageLeft }) {
  const flexClasses = isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse';

  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={domRef}
      className={`
        group flex flex-col ${flexClasses} md:gap-8 items-center mb-16 p-6 rounded-lg 
        bg-white  dark:bg-darkCard shadow-lg dark:shadow-none
        transition-all duration-500 ease-in-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        hover:shadow-2xl hover:scale-105
      `}
    >
      <div className="w-full md:w-1/2 mb-4 md:mb-0 group overflow-hidden rounded-lg">
        <div className="bg-gray-200 dark:bg-gray-700 w-full h-[300px] rounded-lg overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.projectName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-3xl font-semibold mb-4 dark:text-white group-hover:text-skyCustom transition-colors duration-300">{project.projectName}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 group-hover:text-skyCustom transition-colors duration-300">{project.projectDescription}</p>
        
        <Link href={`/project?id=${project.id}`} legacyBehavior>
          <a className="inline-block px-6 py-3 border border-skyCustom dark:border-pointedBluetSky text-skyCustom font-medium rounded-lg hover:bg-sky-50 dark:hover:bg-darkCard transition duration-300">
            Read More →
          </a>
        </Link>
      </div>
    </div>
  );
}

export default function RecentProjectsSection({ projects }) {
  const sortProjectsByDate = (a, b) => {
    const aIsCurrent = a.projectDate.includes('Present') || a.projectDate.includes('PRESENT');
    const bIsCurrent = b.projectDate.includes('Present') || b.projectDate.includes('PRESENT');

    if (aIsCurrent && !bIsCurrent) return -1;
    if (!aIsCurrent && bIsCurrent) return 1;

    const getYear = (dateString) => {
      const parts = dateString.match(/\d{4}/g);
      return parts ? parseInt(parts[parts.length - 1], 10) : 0;
    };

    const yearA = getYear(a.projectDate);
    const yearB = getYear(b.projectDate);

    return yearB - yearA;
  };

  const recentProjects = [...projects].sort(sortProjectsByDate).slice(0, 3);

  return (
    <div className="flex flex-col justify-center mt-10 animate-section">
      <h2 className="text-3xl lg:text-5xl mt-2 mb-8 text-center dark:text-white">
        Most Recent Projects
      </h2>
      <div className="max-w-6xl mx-auto w-full">
        {recentProjects.map((project, index) => (
          <ProjectCard 
            key={project.id}
            project={project}
            isImageLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}