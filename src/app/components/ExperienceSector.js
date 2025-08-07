import React from "react";
import { motion } from "framer-motion";

export default function ExperienceSection({ experienceData }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        {experienceData.map((job, index) => (
          <ExperienceEntry key={index} job={job} index={index} />
        ))}
      </div>
    </div>
  );
}
function ExperienceEntry({ job, index }) {
    return (
      <div className="flex">
        {/* Contenedor de línea + bolita */}
        <div className="relative mr-6 flex flex-col items-center">
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full bg-gray-300 dark:bg-gray-600"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ transformOrigin: "top" }}
          />
  
          <motion.div
            className="relative w-3 h-3 rounded-full bg-skyCustom border border-skyCustom z-10 -ml-1"
            initial={{ y: -30, opacity: 0, scale: 0.5 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>
  
        {/* Contenido animado con logo a la derecha */}
        <motion.div
          className="flex-1 flex items-start"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Texto: 2/3 */}
          <div className="flex-[2] pr-6">
            <h3 className="text-xl font-semibold dark:text-white">{job.company}</h3>
            <p className="text-gray-500 text-sm italic mb-4 dark:text-gray-400">
              {job.title} / {job.date}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {job.responsibilities.map((responsibility, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {responsibility}
                </motion.li>
              ))}
            </ul>
          </div>
  
          {/* Logo: 1/3, cambia según tema */}
          {(job.logo || job.darkLogo) && (
            <motion.div
              className="flex-[1] flex justify-center items-start"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Logo Light */}
              {job.logo && (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-full max-w-[120px] h-auto object-contain block dark:hidden"
                />
              )}
              {/* Logo Dark */}
              {job.darkLogo && (
                <img
                  src={job.darkLogo}
                  alt={`${job.company} logo dark`}
                  className="w-full max-w-[120px] h-auto object-contain hidden dark:block"
                />
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }
  