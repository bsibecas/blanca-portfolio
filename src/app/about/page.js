'use client'

import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Providers } from '../providers';
import { useEffect, useState } from 'react';
import PersonalCard from "../components/PersonalInfoCard";
import ContactForm from "../components/ContactForm";
import ExperienceSection from '../components/ExperienceSector';
import experienceData from '../../../public/workExperience.json';

const About = () => {
  const [cvLanguage, setCvLanguage] = useState('eng');
  const selectedCv = cvLanguage === 'esp'
    ? {
        src: '/assets/cv/blanca-sibecas-cv-esp.pdf',
        filename: 'blanca-sibecas-cv-esp.pdf',
        label: 'Spanish',
      }
    : {
        src: '/assets/cv/blanca-sibecas-cv-eng.pdf',
        filename: 'blanca-sibecas-cv-eng.pdf',
        label: 'English',
      };

  const handleScroll = () => {
    const elements = document.querySelectorAll('.animate-section');

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.75) {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface text-ink">
      <Providers>
        <Header />
        <Head>
          <title>About Me</title>
          <link rel="icon" href="/assets/brand/favicon.ico" />
        </Head>

        <main className="site-container mt-6 flex flex-1 flex-col justify-center text-left sm:mt-8">
          {/* Título principal */}
          <h1 className="mb-8 font-serif text-5xl font-normal text-ink animate-section md:mb-10 md:text-7xl">
            About
          </h1>

          {/* Info personal */}
          <PersonalCard />

          {/* Experiencia profesional */}
          <div className="w-full flex">
            <div className="w-full text-left mb-8">
              <h2 className="font-serif text-3xl lg:text-5xl mb-4 mt-12">Professional Experience</h2>
              <ExperienceSection experienceData={experienceData} />
            </div>
          </div>

          {/* CV */}
          <div className="w-full text-left mb-8 animate-section">
            <h2 className="font-serif text-3xl lg:text-5xl">Curriculum Vitae</h2>
          </div>

          {/* CV viewer + Contacto */}
          <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 animate-section">
            {/* CV language selector + viewer */}
            <div className="w-full lg:w-[45%]">
              <div
                className="mb-3 inline-flex border border-line bg-surface-raised p-1"
                role="group"
                aria-label="CV language"
              >
                <button
                  type="button"
                  onClick={() => setCvLanguage('esp')}
                  aria-pressed={cvLanguage === 'esp'}
                  className={`min-w-24 px-4 py-2 text-sm transition-colors ${
                    cvLanguage === 'esp'
                      ? 'bg-accent text-white'
                      : 'text-ink-muted hover:text-accent'
                  }`}
                >
                  Español
                </button>
                <button
                  type="button"
                  onClick={() => setCvLanguage('eng')}
                  aria-pressed={cvLanguage === 'eng'}
                  className={`min-w-24 px-4 py-2 text-sm transition-colors ${
                    cvLanguage === 'eng'
                      ? 'bg-accent text-white'
                      : 'text-ink-muted hover:text-accent'
                  }`}
                >
                  English
                </button>
              </div>

              <iframe
                key={cvLanguage}
                src={selectedCv.src}
                className="h-[420px] w-full border border-line bg-surface-raised sm:h-[500px]"
                title={`${selectedCv.label} CV`}
              />
            </div>

            {/* Botones y formulario */}
            <div className="flex w-full flex-col items-stretch justify-center gap-6 lg:w-[40%] lg:items-center">
              <p className="text-base text-center text-ink-muted">
                Here is my CV for more information:
              </p>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <a
                  href="/assets/cv/blanca-sibecas-cv-esp.pdf"
                  download="blanca-sibecas-cv-esp.pdf"
                  className="bg-brand-strong text-ink-inverse px-4 py-2 rounded hover:bg-accent hover:text-ink-inverse transition duration-150 text-sm text-center"
                >
                  Download Spanish CV
                </a>
                <a
                  href="/assets/cv/blanca-sibecas-cv-eng.pdf"
                  download="blanca-sibecas-cv-eng.pdf"
                  className="bg-brand-strong text-ink-inverse px-4 py-2 rounded hover:bg-accent hover:text-ink-inverse transition duration-150 text-sm text-center"
                >
                  Download English CV
                </a>
              </div>

              <ContactForm />

            </div>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </Providers>
    </div>
  );
};

export default About;
