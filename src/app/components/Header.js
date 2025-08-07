'use client'

// components/Header.js
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'

const Header = () => {
  const { theme } = useTheme()
  return (
    <header className="flex items-center justify-between w-full p-4" >
      <div className="flex items-center ">
        <img
          src={theme === 'dark' ? '/profileLogo-dark.png' : '/profileLogo.png'}
          alt="Logo"
          className="h-12 w-12 mr-2"
        />
        <h1 className="text-xl font-sans">Blanca Sibecas Hernández</h1>
      </div>
      <nav className="flex items-center space-x-12">
        <Link href="/" id="link" className="hover:text-skyCustom">
          Home
        </Link>
        <Link href="/projects" id="link" className="hover:text-skyCustom">
          Projects
        </Link>
        <Link href="/about" id="link" className="hover:text-skyCustom">
          About
        </Link>
        <ThemeSwitch/>
      </nav>
    </header>
  );
};

export default Header;
