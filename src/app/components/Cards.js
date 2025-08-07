import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Card({ id, imageUrl, projectName, projectDescription, projectDate }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleScroll = () => {
        const element = cardRef.current;
        if (!element) return;

        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.75 && elementTop > -element.clientHeight) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Link href={`/project?id=${id}`} className="no-underline">
            <div
                ref={cardRef}
                className="group w-[460px] flex flex-col overflow-hidden animate-section"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: isHovered ? 'pointer' : 'default' }}
            >
                {/* Imagen arriba */}
                <div className="w-[473px] h-[461px] bg-gray-200 overflow-hidden rounded-lg">
                    {imageUrl ? (
                        <img
                        src={imageUrl}
                        alt={projectName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-200" />
                    )}
                    </div>

                {/* Contenido debajo */}
                <div className="mt-4 flex flex-col items-start px-2 select-none">
                    <span
                        className={`text-xs transition-colors duration-300 ${
                            isHovered ? 'text-skyCustom' : 'text-gray-400'
                        }`}
                    >
                        {projectDate || 'Main technology'}
                    </span>

                    <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                            isHovered ? 'text-skyCustom' : ''
                        }`}
                    >
                        {projectName || 'Project Name'}
                    </h3>

                    <p
                        className={`text-sm mt-1 transition-colors duration-300 ${
                            isHovered ? 'text-skyCustom' : ''
                        }`}
                    >
                        {projectDescription ||
                            'Description description description description description.'}
                    </p>

                    {/* Botón */}
                    <div
                        className={`mt-4 inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium
                                   transition-colors duration-300 no-underline
                                   ${
                                       isHovered
                                           ? 'text-skyCustom border-sky-400'
                                           : ''
                                   }`}
                    >
                        Read More
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
