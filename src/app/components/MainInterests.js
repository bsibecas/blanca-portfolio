// components/ServicesSectionLight.jsx
import React from 'react';
import { FaLaptopCode, FaBrain, FaGamepad } from 'react-icons/fa';

const ServiceCardLight = ({ icon, title, description, className = '' }) => (
  <div className={`p-6 bg-white rounded-lg shadow-xl dark:bg-darkCard ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="text-skyCustom text-3xl">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
    <p className="">{description}</p>
  </div>
);

const RecentProjectCard = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative">
        {/* Líneas de conexión */}
        <div className="absolute inset-0 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 25 15 L 75 45 L 25 85"
              stroke="#cbd5e1"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead-light)"
            />
            {/* Si quieres líneas con puntas de flecha, puedes añadir esto al SVG */}
            <defs>
              <marker id="arrowhead-light" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
              </marker>
            </defs>
          </svg>
        </div>
        
        {/* Tarjetas de servicios */}
        <div className="flex flex-col space-y-12 z-10">
          <ServiceCardLight
            icon={<FaLaptopCode />}
            title="Web & Mobile Apps"
            description="I create responsive web and mobile apps, handling front-end interfaces and back-end logic."
          />
          {/* Tarjeta inferior con margen para la línea */}
          <div className="md:ml-auto md:w-1/2">
            <ServiceCardLight
              icon={<FaGamepad />}
              title="Video Games Programming"
              description="I combine creativity with technical expertise to craft immersive gaming experiences."
            />
          </div>
        </div>
        
        <div className="flex items-center md:items-start md:mt-24 z-10">
          <ServiceCardLight
            icon={<FaBrain />}
            title="Artificial Intelligence"
            description="I'm beginning my journey into Artificial Intelligence (AI) with a master's program ahead."
          />
        </div>
      </div>
    </section>
  );
};

export default RecentProjectCard;