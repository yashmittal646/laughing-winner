import { useCursorGlow } from '@/hooks/useCursorGlow';

export function FloatingShapes() {
  const { position } = useCursorGlow();

  const shapes = [
    { size: 300, top: '10%', left: '5%', delay: 0, color: 'hsl(330 100% 65% / 0.1)' },
    { size: 200, top: '60%', left: '80%', delay: 2, color: 'hsl(252 100% 69% / 0.1)' },
    { size: 150, top: '30%', left: '70%', delay: 1, color: 'hsl(30 100% 71% / 0.1)' },
    { size: 250, top: '70%', left: '10%', delay: 3, color: 'hsl(330 100% 65% / 0.08)' },
    { size: 180, top: '20%', left: '40%', delay: 1.5, color: 'hsl(252 100% 69% / 0.08)' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {shapes.map((shape, i) => {
        const parallaxX = (position.x - window.innerWidth / 2) * 0.02 * (i + 1);
        const parallaxY = (position.y - window.innerHeight / 2) * 0.02 * (i + 1);
        
        return (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              background: shape.color,
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${shape.delay}s`,
            }}
          />
        );
      })}
      
      {/* Holographic gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at ${position.x}px ${position.y}px, 
              hsl(330 100% 65% / 0.1) 0%, 
              transparent 50%
            )
          `,
        }}
      />
    </div>
  );
}
