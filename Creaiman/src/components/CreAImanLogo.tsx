import { motion } from "framer-motion";

interface CreAImanLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const textSizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

export const CreAImanLogo = ({ 
  size = "md", 
  animated = true, 
  showText = true 
}: CreAImanLogoProps) => {
  const LogoIcon = () => (
    <svg 
      viewBox="0 0 100 100" 
      className={`${sizeClasses[size]} ${animated ? 'animate-pulse-glow' : ''}`}
      fill="none"
    >
      {/* Outer glow */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(330 100% 65%)" />
          <stop offset="50%" stopColor="hsl(31 100% 71%)" />
          <stop offset="100%" stopColor="hsl(251 100% 69%)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Lightbulb shape */}
      <path 
        d="M50 10 C30 10 15 28 15 45 C15 58 25 68 30 75 L30 82 C30 87 35 90 40 90 L60 90 C65 90 70 87 70 82 L70 75 C75 68 85 58 85 45 C85 28 70 10 50 10Z"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        opacity="0.9"
      />
      
      {/* Gear inside */}
      <circle cx="50" cy="45" r="18" fill="hsl(278 89% 13%)" />
      <path 
        d="M50 30 L53 35 L60 33 L58 40 L65 43 L60 48 L63 55 L56 53 L53 60 L50 55 L47 60 L44 53 L37 55 L40 48 L35 43 L42 40 L40 33 L47 35 Z"
        fill="url(#logoGradient)"
      />
      <circle cx="50" cy="45" r="8" fill="hsl(278 89% 13%)" />
      <circle cx="50" cy="45" r="4" fill="url(#logoGradient)" opacity="0.8" />
      
      {/* Base lines */}
      <rect x="35" y="82" width="30" height="3" rx="1.5" fill="hsl(262 100% 98%)" opacity="0.8" />
      <rect x="38" y="87" width="24" height="2" rx="1" fill="hsl(262 100% 98%)" opacity="0.6" />
    </svg>
  );

  if (!showText) {
    return animated ? (
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <LogoIcon />
      </motion.div>
    ) : <LogoIcon />;
  }

  return (
    <motion.div 
      className="flex items-center gap-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {animated ? (
        <motion.div
          animate={{ 
            scale: [1, 1.02, 1],
            filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <LogoIcon />
        </motion.div>
      ) : (
        <LogoIcon />
      )}
      <span className={`font-display font-bold ${textSizes[size]} text-gradient`}>
        CreAIman
      </span>
    </motion.div>
  );
};
