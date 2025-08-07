'use client'

import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Providers } from '../providers';
import { useEffect } from 'react';
import PersonalCard from "../components/PersonalInfoCard";
import ContactForm from "../components/ContactForm";
import ExperienceSection from '../components/ExperienceSector';
import experienceData from '../../../public/workExperience.json';

const About = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
      <Providers>
        <Header />
        <Head>
          <title>About Me</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col justify-center flex-1 text-left mt-8 max-w-6xl mx-auto w-full">
          {/* Título principal */}
          <h1 className="text-5xl text-skyCustom font-bold mb-8 animate-section">
            About
          </h1>

          {/* Info personal */}
          <PersonalCard />

          {/* Experiencia profesional */}
          <div className="w-full flex px-4 lg:px-8">
            <div className="w-full text-left mb-8">
              <h2 className="text-3xl lg:text-5xl mb-4 mt-12">Professional Experience</h2>
              <ExperienceSection experienceData={experienceData} />
            </div>
          </div>

          {/* CV */}
          <div className="w-full text-left mb-8 px-4 lg:ml-10 animate-section">
            <h2 className="text-3xl lg:text-5xl mb-6">Curriculum Vitae</h2>
          </div>

          {/* CV viewer + Contacto */}
          <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 px-4 animate-section">
            {/* IFRAME CV */}
            <iframe
              src="/Blanca_Sibecas_CV_ENG.pdf"
              className="w-full lg:w-[45%] h-[500px] border-2 border-sky-950"
              title="PDF Document"
            />

            {/* Botones y formulario */}
            <div className="w-full lg:w-[40%] flex flex-col items-center justify-center gap-6">
              <p className="text-base text-center">
                Here is my CV for more information:
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/Blanca_Sibecas_CV_ESP.pdf"
                  download="Blanca_Sibecas_CV_ESP.pdf"
                  className="bg-skyCustom text-black px-4 py-2 rounded hover:bg-pointedBluetSky hover:text-black transition duration-150 text-sm text-center"
                >
                  Download Spanish CV
                </a>

                <a
                  href="/Blanca_Sibecas_CV_ENG.pdf"
                  download="Blanca_Sibecas_CV_ENG.pdf"
                  className="bg-skyCustom text-black px-4 py-2 rounded hover:bg-pointedBluetSky hover:text-black transition duration-150 text-sm text-center"
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
