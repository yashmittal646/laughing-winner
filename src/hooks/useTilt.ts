import { useCallback, useState } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function useTilt(maxTilt: number = 6) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    setTilt({ rotateX, rotateY, scale: 1.01 });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: 'transform 0.25s ease-out',
  };

  return { tiltStyle, handleMouseMove, handleMouseLeave };
}
