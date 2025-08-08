'use client'
// pages/index.js

import Head from 'next/head';
import Footer from './components/Footer';
import Header from './components/Header';
import RecentProjectCard from "./components/RecentProjectCard";
import { Providers } from './providers';
import projects from '../../public/projects.json';
import ImageTitleText from './components/ImageTitleText';
import { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import SkillsSection from './components/SkillsSection';
import MainInterests from './components/MainInterests';
import RecentProjectsSection from './components/RecentProjectCard';
import ParticlesBackground from './components/ParticlesBackground';
import ParticlesBackgroundMobile from './components/ParticlesBackgroundMobile';

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
    <div className="flex flex-col justify-center min-h-screen py-2 px-2 ">
      <Providers>
        <Header />
        <div className="max-w-6xl mx-auto w-full">
        <main className="relative flex flex-col md:flex-row items-center justify-center flex-1 text-center">
        <div className="block md:hidden">
          <ParticlesBackgroundMobile />
        </div>
        <div className="hidden md:block">
          <ParticlesBackground />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <div className="mb-6 space-y-2 text-center md:text-left">
            <p className="text-xs">Currently open to new opportunities</p>
              <p className="text-xs">Worldwide</p>
            </div>
            <div className="space-y-5">
              <hr className="w-12 mx-auto md:mx-0"/>
              <h2 className="text-base sm:text-lg md:text-xl font-light">
                Hello I’m Blanca Sibecas Hernández
              </h2>
              <h1 className="font-bold text-3xl sm:text-4xl md:text-[54px] space-y-4 sm:space-y-4 md:space-y-8">
                <span className="text-skyCustom block">A Creative</span>
                <span className="text-stroke block">Software Engineer</span>
              </h1>
            </div>
            <div className="mb-6 space-y-0 mt-4 text-center md:text-left">
              <p className="text-sm">I build modern web & mobile apps</p>
              <p className="text-sm">using React, Next.js & React Native</p>
            </div>
           {/* Bloque SOLO visible en desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://www.linkedin.com/in/blanca-sibecas/" // <-- LinkedIn
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-skyCustom hover:bg-pointedBluetSky hover:text-black hover:no-underline text-black font-medium py-3 px-6 rounded-lg transition"
              >  
                Get in touch →  
              </a>
              <a href="https://github.com/bsibecas" target="_blank" rel="noopener noreferrer" className="hover:text-skyCustom" >
                <AiFillGithub className="w-9 h-9" />
              </a>
            </div>
          </div>
            <div className="md:w-1/2">
              <img
                src="/imageHome2.jpg"
                alt="Profile Image"
                className="rounded-full h-90 w-90 object-cover mx-auto md:ml-auto"
              />
              {/* Bloque SOLO visible en móvil */}
              <div className="flex md:hidden items-center justify-center mt-4 space-x-3">
                <a 
                  href="https://www.linkedin.com/in/blanca-sibecas/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-skyCustom hover:bg-pointedBluetSky hover:text-black hover:no-underline text-black font-medium 
                            py-2 px-4 sm:py-3 sm:px-6 rounded-md transition text-sm sm:text-base"
                >  
                  Get in touch →  
                </a>
                <a 
                  href="https://github.com/bsibecas" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-skyCustom"
                >
                  <AiFillGithub className="w-7 h-7 sm:w-9 sm:h-9" />
                </a>
              </div>
            </div>
          </main>
          <SkillsSection />
          <div className="flex flex-col  justify-center mt-10 animate-section">
            <h1 className="text-3xl lg:text-5xl mt-12">
              Main Interests
            </h1>
            <MainInterests />
          </div>
          <RecentProjectsSection projects={projects} />
        </div>
        <Footer />
      </Providers>
    </div>
  );
}

