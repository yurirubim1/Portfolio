"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  alpha: number;
  twinkle: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const makeParticle = (atTop = false): Particle => ({
      x: rand(0, width),
      y: atTop ? rand(-height, 0) : rand(0, height),
      r: rand(0.6, 2.2),
      speed: rand(0.15, 0.7),
      drift: rand(-0.25, 0.25),
      alpha: rand(0.15, 0.7),
      twinkle: rand(0.002, 0.012),
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density scales with viewport area, capped for performance
      const count = Math.min(140, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => makeParticle());
    };

    let phase = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      phase += 1;
      for (const p of particles) {
        p.y += p.speed;
        p.x += p.drift;
        // gentle twinkle
        p.alpha += Math.sin(phase * p.twinkle) * 0.008;

        if (p.y - p.r > height) {
          Object.assign(p, makeParticle(true));
          p.y = -p.r;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        const a = Math.max(0.05, Math.min(0.8, p.alpha));
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, `rgba(167, 139, 250, ${a})`);
        glow.addColorStop(1, "rgba(167, 139, 250, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(216, 200, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
