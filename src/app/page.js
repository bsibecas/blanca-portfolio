'use client'
// pages/index.js
// pages/index.js

import Head from 'next/head';
import Footer from './components/Footer';
import Header from './components/Header';
import Card from "./components/Cards";
import { Providers } from './providers';
import projects from '../../public/projects.json';
import ImageTitleText from './components/ImageTitleText';
import { useEffect } from 'react';
import Image from 'next/image'

export default function Home() {
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
      <Providers>
        <Header />
        <main className="flex flex-col md:flex-row items-center justify-center flex-1 px-20 text-center">
          <div className="md:w-1/2 md:text-left mb-10 md:mb-0 animate-section">
            <h2 className="text-3xl font-bold py-4 text-amber-500">
              Hello, I'm
            </h2>
            <h1 className="text-5xl font-bold">
              Blanca Sibecas Hernández
            </h1>
            <p className="mt-3 text-2xl">
              A <span className="text-emerald-500">Software Engineer</span>  from Barcelona
            </p>
            <p className="mt-3 text-md text-justify">
              I'm passionate about exploring new technologies and creating innovative solutions. This portfolio is built with Next.js, showcasing my skills in modern web development. Dive in to see my projects and learn more about my journey.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/imageHome.png" // Replace with your image path
              alt="Profile Image"
              width={500} // Provide appropriate width
              height={300} // Provide appropriate height
              className="rounded-full h-90 w-90 object-cover mx-auto md:ml-auto" // Adjust size and styling as needed
            />
          </div>
        </main>
        
        {/* Horizontal line */}
        <hr className="w-full border-t border-gray-300 my-8 animate-section" />

        <div className="text-center animate-section">
          <h2 className="text-2xl font-bold mb-4">Main Interests</h2>
        </div>

        <div className="flex flex-wrap justify-center mt-8 space-x-32 animate-section">
          <ImageTitleText
            imageUrl="/WebAppDev-img.png"
            title="Web & Mobile Apps"
            text="I create responsive web and mobile apps, handling front-end interfaces and back-end logic."
          />
          <ImageTitleText
            imageUrl="/AI-img.png"
            title="Artificial Intelligence"
            text="I'm beginning my journey into Artificial Intelligence (AI) with a master's program ahead."
          />
          <ImageTitleText
            imageUrl="/VideoGames-img.png"
            title="Video Games Programming"
            text="I combine creativity with technical expertise to craft immersive gaming experiences"
          />
        </div>
        <hr className="w-full border-t border-gray-300 my-8 animate-section" />
        <div className="text-center mt-8 animate-section">
          <h2 className="text-2xl font-bold mb-6">Main Skills</h2>
          <div className="flex flex-wrap item-center justify-center">
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">C</span>
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">C++</span>
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">JavaScript</span>
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">Python</span>
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">React Native</span>
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">React js</span>
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">Next js</span>
            <span className="text-sm font-medium bg-emerald-500 py-1 px-2 rounded text-emerald-800 align-middle mr-4 mb-4">Vue js</span>
          </div>
          <div className="flex flex-wrap item-center justify-center">
            <span className="text-sm font-medium bg-amber-500 py-1 px-2 rounded text-amber-800 align-middle mr-4 mb-4">Unreal</span>
            <span className="text-sm font-medium bg-amber-500 py-1 px-2 rounded text-amber-800 align-middle mr-4 mb-4">Unity</span>
            <span className="text-sm font-medium bg-amber-500 py-1 px-2 rounded text-amber-800 align-middle mr-4 mb-4">C#</span>
            <span className="text-sm font-medium bg-amber-500 py-1 px-2 rounded text-amber-800 align-middle mr-4 mb-4">Godot</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 animate-section">
          <h2 className="text-2xl font-bold mb-6">Most recent projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <Card
                key={index}
                imageUrl={project.imageUrl}
                projectName={project.projectName}
                projectDate={project.projectDate}
                projectDescription={project.projectDescription}
              />
            ))}
          </div>
        </div>
        <Footer />
      </Providers>
    </div>
  );
}

