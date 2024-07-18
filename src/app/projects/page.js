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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
      <Providers>
        <Header />
        <Head>
          <title>My Portfolio</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold mb-8 animate-section">
            Projects
          </h1>
          <p className="text-base font-light max-w-3xl px-26 animate-section">
            Below are some projects I've worked on during my career and some personal projects that highlight various skills I've developed.
          </p>
          <div className="mx-auto px-5 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  id={project.id}
                  imageUrl={project.imageUrl}
                  projectName={project.projectName}
                  projectDate={project.projectDate}
                  projectDescription={project.projectDescription}
                />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Providers>
    </div>
  );
}
