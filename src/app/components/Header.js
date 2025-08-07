'use client'

import Link from 'next/link';
import { useTheme } from 'next-themes'
import { useState } from 'react';
import ThemeSwitch from './ThemeSwitch'
import { Menu, X } from 'lucide-react'; // iconos de hamburguesa

const Header = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full p-4 relative">
      {/* Logo + Nombre */}
      <div className="flex items-center">
        <img
          src={theme === 'dark' ? '/profileLogo-dark.png' : '/profileLogo.png'}
          alt="Logo"
          className="h-12 w-12 mr-2"
        />
        <h1 className="text-xl font-sans">Blanca Sibecas Hernández</h1>
      </div>

      {/* Botón hamburguesa en móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden z-20"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navegación para escritorio */}
      <nav className="hidden md:flex items-center space-x-12">
        <Link href="/" className="hover:text-skyCustom">Home</Link>
        <Link href="/projects" className="hover:text-skyCustom">Projects</Link>
        <Link href="/about" className="hover:text-skyCustom">About</Link>
        <ThemeSwitch />
      </nav>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="absolute top-20 right-4 bg-white dark:bg-black border rounded-lg shadow-lg p-4 flex flex-col items-end space-y-4 md:hidden z-10">
          <Link href="/" className="hover:text-skyCustom" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/projects" className="hover:text-skyCustom" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/about" className="hover:text-skyCustom" onClick={() => setIsOpen(false)}>About</Link>
          <ThemeSwitch />
        </div>
      )}
    </header>
  );
};

export default Header;
