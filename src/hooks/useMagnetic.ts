import { useCallback, useState, useRef } from 'react';

interface MagneticState {
  x: number;
  y: number;
}

export function useMagnetic(strength: number = 0.3) {
  const [offset, setOffset] = useState<MagneticState>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    
    setOffset({ x, y });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const magneticStyle = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: 'transform 0.2s ease-out',
  };

  return { magneticStyle, handleMouseMove, handleMouseLeave, elementRef };
}
