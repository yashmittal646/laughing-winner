import { useEffect, useState, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export function useCursorGlow() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { position, isVisible };
}

export function useCursorTrail() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  let particleId = 0;

  const addParticle = useCallback((x: number, y: number) => {
    const id = particleId++;
    setParticles(prev => [...prev.slice(-15), { id, x, y }]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let frameCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      frameCount++;
      if (frameCount % 3 !== 0) return;
      
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 10) {
        addParticle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  return particles;
}
