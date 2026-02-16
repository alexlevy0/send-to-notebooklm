"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update(mx: number, my: number, mouseDistance: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x < 0 || this.x > this.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.height) this.vy *= -1;

    // Interaction with mouse
    const dx = this.x - mx;
    const dy = this.y - my;
    const distance = Math.hypot(dx, dy);

    if (distance < mouseDistance) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (mouseDistance - distance) / mouseDistance;
      const directionX = forceDirectionX * force * 0.6;
      const directionY = forceDirectionY * force * 0.6;
      this.vx += directionX;
      this.vy += directionY;
    }

    // Friction
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(99, 102, 241, 0.5)"; // Indigo 500
    ctx.fill();
  }
}

export function NeuralBrain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      
      const mx = mouseX.get();
      const my = mouseY.get();

      particles.forEach((p, index) => {
        p.update(mx, my, mouseDistance);
        p.draw(ctx);

        // Connect particles
        for (let j = index; j < particles.length; j++) {
            const dx = particles[index].x - particles[j].x;
            const dy = particles[index].y - particles[j].y;
            const distance = Math.hypot(dx, dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[index].x, particles[index].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative h-[600px] w-full bg-white overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />
      
      <div className="relative z-10 p-8 max-w-4xl mx-auto space-y-8 select-none pointer-events-none">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
        >
             <div className="px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
                Neural Interface
             </div>
        </motion.div>
        
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900"
        >
            Your Second Brain <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Alive & Connected
            </span>
        </motion.h2>

        <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-neutral-600 text-xl md:text-2xl max-w-2xl mx-auto"
        >
            Experience knowledge management that feels organic.
            It adapts, connects, and grows with you.
        </motion.p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
    </section>
  );
}
