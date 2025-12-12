import { useCursorGlow, useCursorTrail } from '@/hooks/useCursorGlow';

export function CursorGlow() {
  const { position, isVisible } = useCursorGlow();
  const particles = useCursorTrail();

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="pointer-events-none fixed z-50 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity duration-300"
        style={{
          left: position.x - 128,
          top: position.y - 128,
          background: 'radial-gradient(circle, hsl(330 100% 65% / 0.6), hsl(252 100% 69% / 0.3), transparent)',
          opacity: isVisible ? 0.4 : 0,
        }}
      />
      
      {/* Smaller focused glow */}
      <div
        className="pointer-events-none fixed z-50 h-8 w-8 rounded-full opacity-60 blur-sm transition-opacity duration-150"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          background: 'radial-gradient(circle, hsl(330 100% 65%), transparent)',
          opacity: isVisible ? 0.8 : 0,
        }}
      />
      
      {/* Particle trail */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
          }}
        />
      ))}
    </>
  );
}
