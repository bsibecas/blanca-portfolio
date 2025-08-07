import ProgressBar from "../components/ProgressBar";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function PersonalInfoCard() {
  return (
    <div className="max-w-6xl animate-section mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-6 text-left dark:bg-darkCard dark:border-gray-700 dark:text-gray-200">
      {/* Imagen / Avatar */}
      <div className="md:w-80 w-full md:flex-shrink-0">
        <img
          src="/Profile/profile-image.png"
          alt="Profile"
          className="w-full h-full md:h-auto object-cover"
        />
      </div>
      {/* Contenido */}
      <div className="flex flex-col flex-1 justify-between">
              {/* Título y descripción */}
              <div>
                <h2 className="text-skyCustom text-2xl font-semibold mb-2">
                  Personal Information
                </h2>
                <p className="text-gray-600 mb-6 text-sm text-justify dark:text-gray-400">
                  I'm Blanca Sibecas Hernández, a software engineering graduate currently pursuing advanced studies and diverse projects.
                </p>
                <p className="text-gray-600 mb-6 text-sm text-justify dark:text-gray-400">
                  I have a keen interest in Web and Mobile development, Artificial Intelligence, and video game programming. 
                  I am skilled in programming languages such as C, C++, React, and Python. 
                  I actively pursue opportunities to expand my knowledge and explore new languages and technologies.
                </p>
              </div>

              {/* Email + Follow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-left">
                <div className="border rounded-lg p-4 break-words dark:border-gray-600">
                  <span className="block font-medium mb-1">Email</span>
                  <span className="text-gray-600 text-sm break-words dark:text-gray-400">
                  b.sibecas@gmail.com
                  </span>
                </div>

                <div className="border rounded-lg p-4 dark:border-gray-600">
                  <span className="block font-medium mb-1">Follow</span>
                  <div className="flex gap-2 flex-wrap">

                    <a 
                      href="https://github.com/bsibecas" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-skyCustom transition-colors duration-300 dark:text-gray-400 dark:hover:text-skyCustom"
                    >
                      <AiFillGithub className="w-9 h-9" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/blancasibecas/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-skyCustom transition-colors duration-300 dark:text-gray-400 dark:hover:text-skyCustom"
                    >
                      <AiFillLinkedin className="w-9 h-9" />
                    </a>      
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="border rounded-lg p-4 dark:border-gray-600">
                <span className="block font-medium mb-3">Languages</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:ml-8">
                  <div>
                    <ProgressBar language="Catalan" percentage={100} level="(Native)" />
                    <ProgressBar language="Spanish" percentage={100} level="(Native)" />
                  </div>
                  <div>
                    <ProgressBar language="French" percentage={90} level="(C1)" />
                    <ProgressBar language="English" percentage={80} level="(C1)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
