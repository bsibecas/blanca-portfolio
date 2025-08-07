'use client'
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Providers } from '../providers';
import Card from "../components/Cards";
import projects from '../../../public/projects.json';
import { useEffect } from 'react';

export default function Projects() {
  const handleScroll = () => {
    const elements = document.querySelectorAll('.animate-section');

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.95 && elementTop > -element.clientHeight) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen py-2">
      <Providers>
        <Header />
        <Head>
          <title>Projects</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="max-w-6xl w-full mx-auto px-4">
          <main className="flex flex-col justify-center flex-1 text-left mt-8">
            <h1 className="text-5xl text-skyCustom font-bold mb-8 animate-section">
              Projects
            </h1>

            <p className="text-sm font-light animate-section">
              Below are some projects I've worked on during my career and some personal projects that highlight various skills I've developed.
            </p>

            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <Card
                      id={project.id}
                      imageUrl={project.imageUrl}
                      projectName={project.projectName}
                      projectDate={project.projectDate}
                      projectDescription={project.projectDescription}
                    />
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </Providers>
    </div>
  );
}
