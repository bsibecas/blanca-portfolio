'use client';
import { useRef, useEffect } from 'react';

export default function ParticlesBackground() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    let p5Instance = null;

    const sketch = (p) => {
      const totalParticles = 160;
      const activationDistance = 250;
      const visibleDistance = 400;
      const linkDistance = 150;
      const particles = [];
      let mouseX = -9999;
      let mouseY = -9999;

      const baseColor = [125, 214, 232];

      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.vx = p.random(-0.5, 0.5);
          this.vy = p.random(-0.5, 0.5);
          this.size = p.random(2, 4);
          this.active = false;
          this.visible = false;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > p.width) this.vx *= -1;
          if (this.y < 0 || this.y > p.height) this.vy *= -1;

          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist2 = dx * dx + dy * dy;

          this.active = dist2 < activationDistance * activationDistance;
          this.visible = dist2 < visibleDistance * visibleDistance;
        }

        draw() {
          if (!this.visible) return;
          p.noStroke();
          p.fill(
            baseColor[0],
            baseColor[1],
            baseColor[2],
            this.active ? 200 : 80
          );
          p.circle(this.x, this.y, this.size);
        }

        drawLinks(others) {
          if (!this.active) return;
          for (let other of others) {
            if (!other.active || other === this) continue;
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDistance * linkDistance) {
              const alpha = 200 * (1 - d2 / (linkDistance * linkDistance));
              p.stroke(baseColor[0], baseColor[1], baseColor[2], alpha);
              p.line(this.x, this.y, other.x, other.y);
            }
          }
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.clear();
        p.frameRate(60);

        const spacing = Math.sqrt((p.width * p.height) / totalParticles);
        for (let i = 0; i < totalParticles; i++) {
          const x = (i * spacing + p.random(-spacing / 2, spacing / 2)) % p.width;
          const y = Math.floor(i * spacing / p.width) * spacing + p.random(-spacing / 2, spacing / 2);
          particles.push(new Particle(x, y));
        }
      };

      p.draw = () => {
        p.clear();

        let closest = null;
        let closestDist2 = Infinity;

        for (let particle of particles) {
          particle.update();
          particle.draw();
          if (particle.active) particle.drawLinks(particles);

          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const d2 = dx * dx + dy * dy;
          if (d2 < closestDist2) {
            closestDist2 = d2;
            closest = particle;
          }
        }

        if (closest && closestDist2 < activationDistance * activationDistance) {
          p.stroke(baseColor[0], baseColor[1], baseColor[2], 220);
          p.line(closest.x, closest.y, mouseX, mouseY);
        }
      };

      p.mouseMoved = () => {
        mouseX = p.mouseX;
        mouseY = p.mouseY;
      };

      p.mouseOut = () => {
        mouseX = -9999;
        mouseY = -9999;
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
      id="constellations-container"
      ref={wrapperRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}
