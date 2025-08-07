'use client'
// pages/about.js

import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProgressBar from "../components/ProgressBar";
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

      // Check if element is in view (adjusted to only animate when scrolling down)
      if (elementTop < windowHeight * 0.75) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  };

  useEffect(() => {
    // Trigger initial animation check
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
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
        <main className="flex flex-col  justify-center flex-1 text-left mt-8 max-w-6xl mx-auto w-full">
          <h1 className="text-5xl text-skyCustom font-bold mb-8 animate-section">
            About
          </h1>
          <PersonalCard />
          <div className="w-full flex px-8">

            <div className="w-full text-left mb-8 ">
            <h1 className="text-3xl lg:text-5xl mb-2 mt-12">
              Professional Experience
            </h1>
              <ExperienceSection experienceData={experienceData} />
            </div>
          </div>

          <div className="w-full text-left mb-8 ml-10 animate-section">
            <h1 className="text-3xl lg:text-5xl mb-6">
              Curriculum Vitae
            </h1>
          </div>
          <div className="w-full h-full flex justify-center items-start space-x-8 animate-section">
            <iframe
              src="/Blanca_Sibecas_CV_ENG.pdf"
              width="45%"
              height="550px"
              className="border-2 border-sky-950"
              title="PDF Document"
            />
            
            <div className="w-2/5 h-full flex flex-col items-center justify-center space-y-4">
              <p className="text-lg text-center">Here is my CV for more information:</p>
              <div className="flex space-x-4">
              <a
                href="/Blanca_Sibecas_CV_ESP.pdf"
                download="Blanca_Sibecas_CV_ESP.pdf"
                className="bg-skyCustom text-black px-4 py-3 rounded hover:bg-pointedBluetSky hover:text-black transition duration-150 text-sm"
              >
                Download Spanish CV
              </a>

              <a
                href="/Blanca_Sibecas_CV_ENG.pdf"
                download="Blanca_Sibecas_CV_ENG.pdf"
                className="bg-skyCustom text-black px-4 py-3 rounded hover:bg-pointedBluetSky hover:text-black transition duration-150 text-sm"
              >
                Download English CV
              </a>
              </div>
              <ContactForm />
            </div>
          </div>

          <Footer />
        </main>
      </Providers>
    </div>
  );
};

export default About;
