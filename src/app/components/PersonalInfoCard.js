import ProgressBar from "../components/ProgressBar";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function PersonalInfoCard() {
  return (
    <div className="w-full animate-section border border-line bg-surface-raised p-6 flex flex-col md:flex-row gap-8 text-left text-ink">
      {/* Imagen / Avatar */}
      <div className="md:w-80 w-full md:flex-shrink-0">
        <img
          src="/assets/hero/profile-image.png"
          alt="Profile"
          className="w-full h-full md:h-auto object-cover"
        />
      </div>
      {/* Contenido */}
      <div className="flex flex-col flex-1 justify-between">
              {/* Título y descripción */}
              <div>
                <h2 className="text-accent text-2xl font-semibold mb-2">
                  Personal Information
                </h2>
                <p className="text-ink-muted mb-6 text-sm text-justify">
                  I'm Blanca Sibecas Hernández, a software engineering graduate currently pursuing advanced studies and diverse projects.
                </p>
                <p className="text-ink-muted mb-6 text-sm text-justify">
                  I have a keen interest in Web and Mobile development, Artificial Intelligence, and video game programming. 
                  I am skilled in programming languages such as C, C++, React, and Python. 
                  I actively pursue opportunities to expand my knowledge and explore new languages and technologies.
                </p>
              </div>

              {/* Email + Follow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-left">
                <div className="border border-line p-4 break-words">
                  <span className="block font-medium mb-1">Email</span>
                  <span className="text-ink-muted text-sm break-words">
                  b.sibecas@gmail.com
                  </span>
                </div>

                <div className="border border-line p-4">
                  <span className="block font-medium mb-1">Follow</span>
                  <div className="flex gap-2 flex-wrap">

                    <a 
                      href="https://github.com/bsibecas" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand hover:text-accent transition-colors duration-300"
                    >
                      <AiFillGithub className="w-9 h-9" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/blancasibecas/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand hover:text-accent transition-colors duration-300"
                    >
                      <AiFillLinkedin className="w-9 h-9" />
                    </a>      
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="border border-line p-4">
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
