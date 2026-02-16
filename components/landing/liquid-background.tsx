"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    const colors = ["#6366f1", "#a855f7", "#ec4899", "#06b6d4"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = Math.random() * 20 + 10;
    this.life = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.01;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life * 0.4;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // For trail effect
      // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      // ctx.fillRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(index, 1);
        }
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply opacity-50">
      <canvas ref={canvasRef} className="w-full h-full blur-[60px]" />
    </div>
  );
}
