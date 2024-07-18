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

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link href={`/project?id=${id}`} passHref>
           <div
                className="max-w-xs relative rounded-lg overflow-hidden shadow-lg duration-300 hover:shadow-2xl hover:scale-105 animate-section"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: isHovered ? 'pointer' : 'default' }}
            >
                <div ref={cardRef}>
                    <img
                        className="w-full rounded-lg object-cover object-center transition-opacity duration-300"
                        src={imageUrl}
                        alt={projectName}
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-start p-4 bg-sky-950 bg-opacity-0 text-white opacity-0 transition-opacity duration-300 hover:bg-opacity-75 hover:opacity-100 space-y-4">
                        <p className="font-bold text-lg mt-4">{projectName}</p>
                        <p className="text-sm text-left">{projectDescription}</p>
                        <p className="text-xs font-light text-left">{projectDate}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
