import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMagnetic } from '@/hooks/useMagnetic';
import logo from '@/assets/creaiman-logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'General Mode', path: '/general' },
  { name: 'Manager Mode', path: '/manager' },
  { name: 'Pricing', path: '/pricing' },
];

function NavLink({ name, path, onClick }: { name: string; path: string; onClick?: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === path;
  const { magneticStyle, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  return (
    <Link
      to={path}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magneticStyle}
      className={cn(
        'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
        'hover:text-neon-pink',
        isActive ? 'text-neon-pink' : 'text-foreground/80',
        'group'
      )}
    >
      {name}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-neon-pink to-secondary transition-transform duration-300',
          'group-hover:scale-x-100',
          isActive && 'scale-x-100'
        )}
      />
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <div className="glass border-b border-border/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg">
              <img src={logo} alt="CreAIman" className="h-full w-full object-cover" />
            </div>
            <span className="gradient-text font-space text-xl font-bold">CreAIman</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 md:hidden',
            isOpen ? 'max-h-64' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 px-4 pb-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} onClick={() => setIsOpen(false)} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
