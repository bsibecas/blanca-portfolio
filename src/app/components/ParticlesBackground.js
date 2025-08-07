'use client';
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

function sketch(p) {
  const totalParticles = 160;
  const activationDistance = 250; // Conexión al ratón
  const visibleDistance = 400; // Distancia para que se vean partículas sin conectar
  const linkDistance = 150; // Conexión entre partículas
  const particles = [];
  let mouseX = -9999;
  let mouseY = -9999;

  const baseColor = [125, 214, 232]; // Color #7DD6E8 en RGB

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

      // Rebote en bordes
      if (this.x < 0 || this.x > p.width) this.vx *= -1;
      if (this.y < 0 || this.y > p.height) this.vy *= -1;

      // Distancias al ratón
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
        this.active ? 200 : 80 // Menos alpha si no está activa
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

    // Distribuir partículas con cierta separación
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

      // Encontrar partícula más cercana al mouse
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const d2 = dx * dx + dy * dy;
      if (d2 < closestDist2) {
        closestDist2 = d2;
        closest = particle;
      }
    }

    // Línea directa al mouse solo si está cerca
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
}

export default function ParticlesBackground() {
  const wrapperRef = useRef();

  useEffect(() => {
    let p5Instance = null;
    if (typeof window !== 'undefined' && wrapperRef.current) {
      p5Instance = new p5(sketch, wrapperRef.current);
    }

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
