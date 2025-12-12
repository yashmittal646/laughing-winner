import { ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'pink' | 'violet' | 'peach';
}

export function TiltCard({ children, className, glowColor = 'pink' }: TiltCardProps) {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(4);

  const glowColors = {
    pink: 'hover:shadow-glow-pink-subtle',
    violet: 'hover:shadow-glow-violet-subtle',
    peach: 'hover:shadow-glow-peach-subtle',
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={cn(
        'glass-card p-6 transition-all duration-300',
        'neon-border',
        glowColors[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
}
