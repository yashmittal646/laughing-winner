import { ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MagneticButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className 
}: MagneticButtonProps) {
  const { magneticStyle, handleMouseMove, handleMouseLeave } = useMagnetic(0.4);

  const variants = {
    primary: 'bg-gradient-to-r from-neon-pink to-secondary text-primary-foreground shadow-glow-pink hover:shadow-glow-violet',
    secondary: 'bg-gradient-to-r from-secondary to-neon-pink text-secondary-foreground shadow-glow-violet',
    outline: 'border-2 border-neon-pink/50 text-foreground hover:bg-neon-pink/10 hover:border-neon-pink',
    ghost: 'text-foreground hover:bg-muted/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magneticStyle}
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold transition-all duration-300',
        'before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300',
        'before:bg-gradient-to-r before:from-neon-pink/20 before:to-secondary/20 before:blur-xl',
        'hover:before:opacity-100',
        'active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
