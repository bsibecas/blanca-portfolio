'use client';
import { useRef, useEffect } from 'react';

export default function ParticlesBackgroundMobile() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    let p5Instance = null;

    const sketch = (p) => {
      const totalParticles = 80;
      const particles = [];
      const baseColor = [125, 214, 232];

      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.vx = p.random(-0.3, 0.3);
          this.vy = p.random(-0.3, 0.3);
          this.size = p.random(2, 4);
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > p.width) this.vx *= -1;
          if (this.y < 0 || this.y > p.height) this.vy *= -1;
        }

        draw() {
          p.noStroke();
          p.fill(baseColor[0], baseColor[1], baseColor[2], 100);
          p.circle(this.x, this.y, this.size);
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.clear();
        p.frameRate(60);

        for (let i = 0; i < totalParticles; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          particles.push(new Particle(x, y));
        }
      };

      p.draw = () => {
        p.clear();
        for (let particle of particles) {
          particle.update();
          particle.draw();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    import('p5').then((p5Module) => {
      if (typeof window !== 'undefined' && wrapperRef.current) {
        p5Instance = new p5Module.default(sketch, wrapperRef.current);
      }
    });

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}
