'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import projects from '../../../public/projects.json'; 
import { Providers } from '../providers';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Project() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [path, setPath] = useState('');
  const [project, setProject] = useState(null);
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    setPath(pathname);

    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const id = params.id;
    setProjectId(id);

    if (id) {
      const foundProject = projects.find(proj => proj.id === id);
      setProject(foundProject);
    }

    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-section');

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.90) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial execution

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, searchParams, project]); // Include `project` in dependencies

  return (
    <div className="min-h-screen">
      <Providers>
        <Header />
        <div className="flex flex-col items-center justify-center py-8">
          <div className="max-w-4xl mx-auto px-4">
            {project ? (
              <>
                <h1 className="text-5xl font-bold text-center animate-section">{project.projectName}</h1>
                <div className="mt-4 flex flex-col md:flex-row items-start py-12">
                  <div className="md:w-1/2 justify-center animate-section">
                    <h2 className="text-xl font-semibold">{project.introductionTitle}</h2>
                    <h2 className="text-sm mb-4 font-light">{project.projectDate}</h2>
                    <p className="mt-2 text-justify">{project.projectIntroduction}</p>
                  </div>
                  <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center items-center animate-section">
                    <img src={project.imageUrl} alt={project.projectName} className="w-64 h-64 object-cover rounded-lg shadow-xl" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold animate-section">{project.projectInfoTitle}</h2>
                <p className="mt-2 text-justify animate-section">{project.projectInfo}</p>
                <div className="mt-12 flex justify-center animate-section space-y-12">
                  <img src={project.projectImage} alt={project.projectName} className="w-90 h-90 object-cover rounded-lg shadow-xl" />
                </div>
                <div className="mt-4 flex flex-col md:flex-row items-start py-8">
                {project.imageExtra1 && (
                  <div className="flex flex-col md:flex-row items-start space-x-8">
                    <div className="md:w-1/2 justify-center animate-section">
                      <img src={project.imageExtra1} alt={project.projectName} className="w-full h-auto object-cover rounded-lg shadow-xl" />
                    </div>
                    <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center items-center animate-section">
                      <img src={project.imageExtra2} alt={`${project.projectName} extra`} className="w-full h-auto object-cover rounded-lg shadow-xl" />
                    </div>
                  </div>
                )}
                </div>
                <h2 className="text-xl font-semibold animate-section">{project.usageTitle}</h2>
                <p className="mt-2 text-justify animate-section">{project.usageProject}</p>
                {project.url && (
                  <div className="flex items-center space-x-2 mt-4 animate-section">
                    <p className="font-bold">{project.urlTitle}</p>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline">
                      {project.urlReference}
                    </a>
                  </div>
                )}
                <hr className="w-full border-t border-gray-300 my-8 animate-section" />
                <h2 className="text-xl font-semibold text-center mt-2 mb-8 animate-section">Tools Used</h2>
                <div className="mt-2 flex flex-wrap justify-center gap-2 animate-section">
                  {project.Tools.map((tool, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md shadow-md">
                      {tool}
                    </span>
                  ))}
                </div>
                {project.videoUrl && (
                  <>
                    <hr className="w-full border-t border-gray-300 my-8 animate-section" />
                    <h2 className="text-3xl font-semibold text-center animate-section">DEMO</h2>
                    <div className="mt-12 flex justify-center animate-section space-y-12">
                      <video className="w-74 h-74 rounded-lg shadow-xl" controls>
                        <source src={project.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </>
                )}
              </>
            ) : (
              <h2 className="text-2xl mt-4 text-center">Error: No project found</h2>
            )}
          </div>
        </div>
        <Footer />
      </Providers>
    </div>
  );
}
