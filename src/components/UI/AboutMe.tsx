"use client";
import { useEffect, useRef } from "react";

const AboutMe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      connections: number[];
    }[] = [];
    const particleCount = 100;
    const connectionDistance = 100;
    const colors = ["#009688", "#4DB6AC", "#80CBC4"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        connections: [],
      });
    }

    function drawConnections() {
      if (!ctx) return;
      particles.forEach((particle, i) => {
        particle.connections = [];
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            particle.connections.push(j);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 150, 136, ${1 - distance / connectionDistance})`;
            ctx.stroke();
          }
        }
      });
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
      drawConnections();

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas?.height ?? 0;
          particle.x = Math.random() * (canvas?.width ?? 0);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
          <div className="w-full lg:w-2/5 mb-8 lg:mb-0">
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl">
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono text-white font-bold bg-[#009688] px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  {"<MERN/>"}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/5 lg:pl-8 xl:pl-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-[#009688] to-blue-500">
              About Me
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-800 dark:text-white">
              Md. Sohanur Rohman Sihab
            </h3>
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-[#009688]">
              MERN Stack Developer
            </h4>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed">
              Passionate MERN stack developer with a keen eye for creating
              seamless, user-friendly web applications. Committed to writing
              clean, efficient code and staying up-to-date with the latest
              industry trends and technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;