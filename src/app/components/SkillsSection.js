// components/SkillsSection.jsx
import React from 'react';
import Image from 'next/image';
import nextLogo from '../../../public/assets/logos/next-logo.png';
import reactLogo from '../../../public/assets/logos/react-logo.svg.png';
import pythonLogo from '../../../public/assets/logos/python-logo.svg';
import pytorchLogo from '../../../public/assets/logos/pytorch-logo.webp';
import cLogo from '../../../public/assets/logos/c-logo.png';
import tailwindLogo from '../../../public/assets/logos/tailwind-logo.png';
import firebaseLogo from '../../../public/assets/logos/firebase-logo.png';
import nodeLogo from '../../../public/assets/logos/node-logo.png';
import javascriptLogo from '../../../public/assets/logos/javascript-logo.webp';


const skills = [
  { name: 'Next js', logo: nextLogo },
  { name: 'Python', logo: pythonLogo },
  { name: 'React', logo: reactLogo },
  { name: 'PyTorch', logo: pytorchLogo },
  { name: 'C/ C++', logo: cLogo },
  { name: 'Tailwind CSS', logo: tailwindLogo },
  { name: 'Firebase', logo: firebaseLogo },
  { name: 'Node js', logo: nodeLogo },
  { name: 'JavaScript/ TypeScript', logo: javascriptLogo },
];

export default function SkillsSection() {
  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold mb-4">Main Skills</h2>
      <div className="border border-skyCustom rounded-lg p-6 flex flex-wrap justify-center gap-12">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Image
                src={skill.logo}
                alt={skill.name}
                className="w-10 h-10"
              />
            </div>
            <p className="text-sm mt-2">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
