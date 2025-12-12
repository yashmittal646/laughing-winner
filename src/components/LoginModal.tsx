import { useState } from 'react';
import { X, Mail, Lock, Loader2, User } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { cn } from '@/lib/utils';
import logo from '@/assets/creaiman-logo.png';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'general' | 'manager';
}

export function LoginModal({ isOpen, onClose, onSuccess, mode }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login/signup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onSuccess();
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setEmail('');
    setPassword('');
    setName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          'relative w-full max-w-md',
          'glass-card p-8',
          'shimmer',
          'animate-slide-up'
        )}
      >
        {/* Animated border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-neon-pink via-secondary to-peach opacity-75 blur-sm animate-gradient" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-pink via-secondary to-peach opacity-50" />
        
        {/* Content */}
        <div className="relative rounded-2xl bg-card p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl">
              <img src={logo} alt="CreAIman" className="h-full w-full object-cover" />
            </div>
            <h2 className="font-space text-2xl font-bold">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {authMode === 'login' 
                ? `Sign in to access ${mode === 'general' ? 'General' : 'Manager'} Mode`
                : `Sign up to get started with ${mode === 'general' ? 'General' : 'Manager'} Mode`
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className={cn(
                      'w-full rounded-xl border border-border bg-input py-3 pl-11 pr-4',
                      'text-foreground placeholder:text-muted-foreground',
                      'transition-all duration-300',
                      'focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20'
                    )}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={cn(
                    'w-full rounded-xl border border-border bg-input py-3 pl-11 pr-4',
                    'text-foreground placeholder:text-muted-foreground',
                    'transition-all duration-300',
                    'focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20'
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={cn(
                    'w-full rounded-xl border border-border bg-input py-3 pl-11 pr-4',
                    'text-foreground placeholder:text-muted-foreground',
                    'transition-all duration-300',
                    'focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20'
                  )}
                />
              </div>
            </div>

            <MagneticButton 
              variant="primary" 
              size="lg" 
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                authMode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </MagneticButton>
          </form>

          {/* Toggle auth mode */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleAuthMode}
              className="font-medium text-neon-pink transition-colors hover:text-neon-pink/80"
            >
              {authMode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
