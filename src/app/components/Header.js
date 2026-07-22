'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import ThemeSwitch from './ThemeSwitch'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
  ];

  const socialItems = [
    {
      href: 'https://github.com/bsibecas',
      label: 'GitHub',
      icon: AiFillGithub,
    },
    {
      href: 'https://www.linkedin.com/in/blancasibecas/',
      label: 'LinkedIn',
      icon: AiFillLinkedin,
    },
  ];

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 12);
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[9999] h-[74px] w-full border-b text-brand transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isScrolled
            ? 'border-line/70 bg-surface/88 backdrop-blur-[6px]'
            : 'border-transparent bg-surface/0'
        }`}
      >
        <div className="site-container grid h-full grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          {/* Logo + Nombre */}
          <Link href="/" className="group flex min-w-0 items-center gap-4 text-brand hover:!text-accent hover:no-underline">
            <img
              src={theme === 'dark' ? '/assets/brand/profile-logo-dark.png' : '/assets/brand/profile-logo.png'}
              alt="Logo"
              className="h-10 w-10 shrink-0 transition-opacity duration-300 group-hover:opacity-85"
            />
            <span className="truncate font-sans text-base font-medium tracking-normal sm:text-lg">
              Blanca Sibecas
            </span>
          </Link>

          {/* Botón hamburguesa en móviles */}
          <button
            type="button"
            className="z-20 flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-accent md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
          </button>

          {/* Navegación para escritorio */}
          <nav className="hidden items-center gap-11 md:flex">
            {navItems.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-2 text-[13px] font-medium uppercase tracking-[0.13em] transition-colors duration-200 hover:!text-accent hover:no-underline ${
                    isActive
                      ? 'text-accent'
                      : 'text-ink-muted'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center justify-end gap-1 md:flex">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center text-ink-muted transition-colors duration-200 hover:!text-accent hover:no-underline"
                >
                  <Icon className="h-[23px] w-[23px]" />
                </a>
              );
            })}
            <ThemeSwitch />
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isOpen && (
          <nav
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-10 border-b border-line bg-surface/95 px-4 pb-6 pt-3 text-ink-muted shadow-lg backdrop-blur-[8px] md:hidden"
          >
            <div className="mx-auto flex max-w-[1500px] flex-col">
              {navItems.map((item) => (
              (() => {
                const isActive = item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-12 items-center border-b border-line/60 text-sm font-medium uppercase tracking-[0.13em] hover:!text-accent hover:no-underline ${
                      isActive ? 'text-accent hover:!text-accent' : 'text-ink-muted'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })()
              ))}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {socialItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="flex h-11 w-11 items-center justify-center text-ink-muted hover:!text-accent hover:no-underline"
                      >
                        <Icon className="h-[23px] w-[23px]" />
                      </a>
                    );
                  })}
                </div>
                <ThemeSwitch />
              </div>
            </div>
          </nav>
        )}
      </header>
      <div className="h-[74px]" aria-hidden="true" />
    </>
  );
};

export default Header;
