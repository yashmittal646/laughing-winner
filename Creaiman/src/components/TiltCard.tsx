import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glowOnHover?: boolean;
  holographicBorder?: boolean;
  glowColor?: string;
}

export const TiltCard = ({ 
  children, 
  className,
  tiltStrength = 15,
  glowOnHover = true,
  holographicBorder = true,
  glowColor
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const rotateX = useTransform(springY, [0, 1], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(springX, [0, 1], [-tiltStrength, tiltStrength]);
  
  const gradientX = useTransform(springX, [0, 1], [0, 100]);
  const gradientY = useTransform(springY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d",
          ...(glowColor && { boxShadow: `0 0 60px ${glowColor}` })
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className={cn(
          "relative rounded-2xl transition-shadow duration-300",
          glowOnHover && !glowColor && "hover:shadow-glow-violet",
          holographicBorder && "holographic-border",
          className
        )}
      >
        {/* Holographic shine overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, hsl(330 100% 65% / 0.3), transparent 50%)`
            )
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};
