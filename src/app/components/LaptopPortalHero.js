'use client';

import { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';
import ParticlesBackgroundMobile from './ParticlesBackgroundMobile';

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const lerp = (from, to, progress) => from + (to - from) * progress;

const smoothstep = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};

const skills = [
  'React',
  'React Native',
  'Next.js',
  'TypeScript',
  'Firebase',
  'AI',
];

export default function LaptopPortalHero() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const screenSlotRef = useRef(null);
  const profileCardRef = useRef(null);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [metrics, setMetrics] = useState({
    screenScale: 1,
    screenX: 0,
    screenY: 0,
    viewportWidth: 1,
    viewportHeight: 1,
    screenStartWidth: 1,
    screenStartHeight: 1,
    profileWidth: 320,
    profileHeight: 540,
    finalImageWidth: 190,
    finalImageHeight: 238,
    profileStartX: 0,
    profileStartY: 0,
    profileFinalX: 64,
    profileFinalY: 112,
    skillsWidth: 640,
    skillsStartX: 0,
    skillsStartY: 0,
    skillsFinalX: 456,
    skillsFinalY: 116,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);

    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);

    return () => mediaQuery.removeEventListener('change', updateReducedMotion);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!screenSlotRef.current || !stickyRef.current) return;

      const rect = screenSlotRef.current.getBoundingClientRect();
      const stickyRect = stickyRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const screenScale = Math.max(
        viewportWidth / rect.width,
        viewportHeight / rect.height
      );
      const isDesktop = viewportWidth >= 768;
      const profileWidth = isDesktop
        ? clamp(viewportWidth * 0.28, 300, 360)
        : Math.min(viewportWidth - 32, 320);
      const finalImageWidth = clamp(profileWidth * 0.58, 170, 210);
      const finalImageHeight = finalImageWidth * 1.25;
      const profileHeight = finalImageWidth * 1.25 + 280;
      const skillsWidth = isDesktop
        ? Math.min(viewportWidth * 0.52, 720)
        : Math.min(viewportWidth - 32, 520);
      const profileStartX = rect.left - stickyRect.left;
      const profileStartY = rect.top - stickyRect.top;
      const profileFinalX = isDesktop ? clamp(viewportWidth * 0.055, 48, 80) : 16;
      const profileFinalY = isDesktop ? clamp(viewportHeight * 0.18, 104, 140) : 96;
      const skillsFinalX = isDesktop
        ? profileFinalX + profileWidth + clamp(viewportWidth * 0.07, 56, 96)
        : 16;
      const skillsFinalY = isDesktop
        ? profileFinalY + 8
        : profileFinalY + profileHeight + 32;

      setMetrics({
        screenScale,
        screenX: viewportWidth / 2 - (rect.left + rect.width / 2),
        screenY: viewportHeight / 2 - (rect.top + rect.height / 2),
        viewportWidth,
        viewportHeight,
        screenStartWidth: rect.width,
        screenStartHeight: rect.height,
        profileWidth,
        profileHeight,
        finalImageWidth,
        finalImageHeight,
        profileStartX,
        profileStartY,
        profileFinalX,
        profileFinalY,
        skillsWidth,
        skillsStartX: rect.left - stickyRect.left + rect.width * 0.5 - skillsWidth * 0.48,
        skillsStartY: rect.top - stickyRect.top + rect.height * 0.5 - 180,
        skillsFinalX,
        skillsFinalY,
      });
    };

    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollDistance = Math.max(rect.height - window.innerHeight, 1);
      const nextProgress = clamp(-rect.top / scrollDistance);

      setProgress(nextProgress);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateProgress();
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    if (screenSlotRef.current) resizeObserver.observe(screenSlotRef.current);

    measure();
    updateProgress();
    document.fonts?.ready.then(measure);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const p = reducedMotion ? 1 : progress;
  const zoom = smoothstep(0.1, 0.58, p);
  const frameFade = smoothstep(0.1, 0.32, p);
  const heroFade = smoothstep(0.12, 0.56, p);
  const profileMove = smoothstep(0.26, 0.62, p);
  const profileInfoReveal = smoothstep(0.36, 0.56, p);
  const profileDetails = smoothstep(0.52, 0.72, p);
  const skillsReveal = smoothstep(0.66, 0.86, p);
  const windowMaterial = smoothstep(0.16, 0.36, p);
  const windowChrome = smoothstep(0.18, 0.36, p);

  const screenStyle = reducedMotion
    ? {}
    : {
        translate: `${lerp(0, metrics.screenX, zoom)}px ${lerp(0, metrics.screenY, zoom)}px`,
        scale: lerp(1, metrics.screenScale, zoom),
        borderRadius: `${lerp(18, 0, zoom)}px`,
        boxShadow: `0 ${lerp(24, 0, frameFade)}px ${lerp(60, 0, frameFade)}px rgb(var(--color-ink) / ${lerp(0.22, 0, frameFade)})`,
      };
  const profileStyle = reducedMotion
    ? {
        width: `${metrics.profileWidth}px`,
        height: `${metrics.profileHeight}px`,
        translate: `${metrics.profileFinalX}px ${metrics.profileFinalY}px`,
      }
    : {
        width: `${lerp(metrics.screenStartWidth, metrics.profileWidth, profileMove)}px`,
        height: `${lerp(metrics.screenStartHeight, metrics.profileHeight, profileMove)}px`,
        translate: `${lerp(metrics.profileStartX, metrics.profileFinalX, profileMove)}px ${lerp(metrics.profileStartY, metrics.profileFinalY, profileMove)}px`,
      };
  const skillsStyle = reducedMotion
    ? {
        width: `${metrics.skillsWidth}px`,
        translate: `${metrics.skillsFinalX}px ${metrics.skillsFinalY}px`,
        opacity: 1,
        scale: 1,
      }
    : {
        width: `${metrics.skillsWidth}px`,
        translate: `${lerp(metrics.skillsStartX, metrics.skillsFinalX, skillsReveal)}px ${lerp(metrics.skillsStartY, metrics.skillsFinalY, skillsReveal)}px`,
        opacity: skillsReveal,
        scale: lerp(0.96, 1, skillsReveal),
      };
  const windowChromeStyle = {
    opacity: windowChrome,
  };
  const windowSurfaceStyle = {
    borderColor: `rgb(var(--color-line) / ${windowMaterial})`,
    backgroundColor: 'rgb(var(--color-surface-raised))',
    borderRadius: '18px',
    boxShadow: `0 ${22 * windowMaterial}px ${55 * windowMaterial}px rgb(var(--color-ink) / ${0.12 * windowMaterial})`,
  };
  const profileContentStyle = {
    padding: `${lerp(0, 20, profileMove)}px`,
  };
  const profileImageStyle = {
    width: `${lerp(metrics.screenStartWidth, metrics.finalImageWidth, profileMove)}px`,
    height: `${lerp(metrics.screenStartHeight, metrics.finalImageHeight, profileMove)}px`,
    borderRadius: `${lerp(6, 16, profileMove)}px`,
  };
  const profileInfoStyle = {
    opacity: profileInfoReveal,
    translate: `0 ${lerp(14, 0, profileInfoReveal)}px`,
  };

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-0 ${reducedMotion ? 'md:min-h-[150vh]' : 'md:min-h-[380vh]'}`}
    >
      <div ref={stickyRef} className="relative min-h-0 overflow-visible py-10 text-left md:sticky md:top-0 md:min-h-[100svh] md:overflow-clip md:py-16 lg:py-24">
        <div className="block md:hidden">
          <ParticlesBackgroundMobile />
        </div>
        <div className="hidden md:block">
          <ParticlesBackground />
        </div>

        <div className="relative z-10 flex min-h-0 flex-col items-start gap-10 md:min-h-[calc(100svh-8rem)] md:flex-row md:items-center md:gap-12 lg:gap-20">
          <section
            className="relative z-10 w-full max-w-none md:w-[52%] md:flex-shrink-0"
            style={{
              opacity: lerp(1, 0, heroFade),
              translate: `0 ${lerp(0, 22, heroFade)}px`,
              pointerEvents: heroFade > 0.85 ? 'none' : 'auto',
            }}
          >
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Software engineer
            </p>

            <h1 className="font-serif text-6xl leading-[0.98] tracking-normal sm:text-6xl md:text-7xl lg:text-[92px]">
              Blanca Sibecas
            </h1>

            <p className="mt-5 font-serif text-4xl italic leading-tight text-accent sm:text-4xl md:text-5xl lg:text-[56px]">
              Software engineer · Mobile · Web · AI
            </p>

            <p className="mt-12 max-w-xl font-serif text-xl italic leading-8 text-ink-muted">
              Building scalable, user-centered digital products from mobile apps to AI-driven solutions.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="/assets/cv/blanca-sibecas-cv-eng.pdf"
                download="blanca-sibecas-cv-eng.pdf"
                className="inline-flex items-center justify-center gap-3 bg-brand-strong px-8 py-4 text-sm font-bold text-ink-inverse transition hover:bg-accent hover:text-ink-inverse hover:no-underline"
              >
                <span>Download CV</span>
                <Download className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/blanca-sibecas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center border border-brand px-8 py-4 text-sm font-bold text-ink transition hover:border-accent hover:text-accent hover:no-underline"
              >
                Get in touch
              </a>
            </div>
          </section>

          <section className="relative z-20 ml-auto hidden w-full max-w-[920px] self-center md:block md:w-[54%]">
            <div className="relative mx-auto aspect-[1366/768] w-full">
              <img
                src="/assets/hero/laptop-front-frame.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                style={{ opacity: 1 - frameFade }}
              />

              <div
                ref={screenSlotRef}
                className="absolute left-[21.1%] top-[8.6%] h-[66.9%] w-[57.9%]"
              >
                <div
                  className="absolute inset-0 origin-center overflow-hidden bg-transparent"
                  style={{
                    ...screenStyle,
                  }}
                />
              </div>
            </div>
          </section>
        </div>

        <section
          ref={profileCardRef}
          className="hero-profile-window pointer-events-auto absolute left-0 top-0 z-40 origin-top-left overflow-hidden rounded-[18px] border border-line bg-surface-raised text-ink"
          style={{
            ...profileStyle,
            ...windowSurfaceStyle,
          }}
        >
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-line px-4"
            style={windowChromeStyle}
            aria-hidden="true"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-soft" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>

          <div className="hero-profile-content" style={profileContentStyle}>
            <div className="hero-profile-image overflow-hidden bg-surface-muted" style={profileImageStyle}>
              <img
                src="/assets/hero/profile-photo.png"
                alt="Blanca Sibecas"
                className="h-full w-full object-cover object-center"
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                }}
              />
            </div>

            <div className="hero-profile-info pt-6" style={profileInfoStyle}>
              <h2 className="font-serif text-[clamp(2.4rem,4.4vw,4.8rem)] leading-[0.92] text-ink">
                Blanca Sibecas
              </h2>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-accent">
                Software Engineer
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                Mobile · Web · AI
              </p>
              <p
                className="mt-2 text-sm text-ink-muted"
                style={{
                  opacity: profileDetails,
                  translate: `0 ${lerp(10, 0, profileDetails)}px`,
                }}
              >
                Barcelona · Remote
              </p>
              <a
                href="/assets/cv/blanca-sibecas-cv-eng.pdf"
                download="blanca-sibecas-cv-eng.pdf"
                className="mt-8 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-ink underline decoration-accent underline-offset-4 hover:text-accent"
                style={{
                  opacity: profileDetails,
                  translate: `0 ${lerp(10, 0, profileDetails)}px`,
                }}
              >
                Download CV
              </a>
            </div>
          </div>
        </section>

        <section
          className="hero-skills-window pointer-events-none absolute left-0 top-0 z-30 origin-top-left overflow-hidden rounded-[18px] border border-line bg-surface-raised text-ink"
          style={{
            ...skillsStyle,
            ...windowSurfaceStyle,
          }}
        >
          <div
            className="flex h-9 items-center gap-2 border-b border-line px-4"
            style={windowChromeStyle}
            aria-hidden="true"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-soft" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>

          <div className="px-5 py-6 sm:px-7 sm:py-8">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Main Skills
            </p>
            <div className="divide-y divide-line">
              {skills.map((skill) => (
                <p
                  key={skill}
                  className="py-4 font-serif text-[clamp(2rem,5vw,5rem)] leading-none text-ink"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
