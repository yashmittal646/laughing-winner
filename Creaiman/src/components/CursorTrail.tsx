import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const colors = [
  "hsl(330 100% 65%)",
  "hsl(31 100% 71%)",
  "hsl(251 100% 69%)",
  "hsl(48 100% 83%)",
];

export const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let particleId = 0;
    let lastTime = 0;
    const throttleMs = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      setMousePos({ x: e.clientX, y: e.clientY });

      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setParticles(prev => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (particles.length === 0) return;

    const timer = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 500);

    return () => clearTimeout(timer);
  }, [particles]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor glow */}
      <motion.div
        className="fixed w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          background: "radial-gradient(circle, hsl(330 100% 65% / 0.5), transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      
      {/* Particle trail */}
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="fixed w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 1, 
              opacity: 0.8 
            }}
            animate={{ 
              scale: 0.3, 
              opacity: 0,
              y: particle.y - 20
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: particle.color,
              boxShadow: `0 0 20px ${particle.color}`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
