'use client'
// pages/index.js

import Footer from './components/Footer';
import Header from './components/Header';
import { Providers } from './providers';
import projects from '../../public/projects.json';
import { useEffect } from 'react';
import LaptopPortalHero from './components/LaptopPortalHero';
import RecentProjectsSection from './components/RecentProjectCard';

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
    <div className="flex min-h-screen flex-col justify-center bg-surface py-2 text-ink">
      <Providers>
        <Header />
        <div className="site-container">
          <LaptopPortalHero />
          <RecentProjectsSection projects={projects} />
        </div>
        <Footer />
      </Providers>
    </div>
  );
}
