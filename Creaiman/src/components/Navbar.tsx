import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Lightbulb, Shield } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { ModeLoginModal } from "./ModeLoginModal";
import { cn } from "@/lib/utils";
import creaImanLogo from "@/assets/creaiman-logo.jpg";


interface ModeIconProps {
  mode: "general" | "manager";
  onClick: () => void;
}

const ModeNavItem = ({ mode, onClick }: ModeIconProps) => {
  const isGeneral = mode === "general";
  const Icon = isGeneral ? Lightbulb : Shield;
  const label = isGeneral ? "General Mode" : "Manager Mode";
  
  return (
    <motion.button
      data-mode={mode}
      onClick={onClick}
      aria-label={`Sign in to ${label}`}
      className={cn(
        "relative flex items-center gap-2 px-3 py-1.5 rounded-full glass",
        "cursor-pointer transition-all duration-300",
        "hover:shadow-lg",
        isGeneral 
          ? "hover:shadow-pink/30 hover:border-pink/50" 
          : "hover:shadow-violet/30 hover:border-violet/50"
      )}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon 
        className={cn(
          "w-4 h-4 transition-colors duration-300",
          isGeneral 
            ? "text-pink" 
            : "text-violet"
        )} 
      />
      <span className={cn(
        "font-body text-xs font-medium transition-colors duration-300",
        isGeneral 
          ? "text-pink" 
          : "text-violet"
      )}>
        {label}
      </span>
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
          isGeneral ? "bg-pink/10" : "bg-violet/10"
        )}
        whileHover={{ opacity: 1 }}
      />
    </motion.button>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"general" | "manager" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const handleModeClick = (mode: "general" | "manager") => {
    if (isModalOpen) return; // Prevent rapid clicks
    setSelectedMode(mode);
    setIsModalOpen(true);
  };

  const handleAuthenticated = (user: { email: string }, mode: "general" | "manager") => {
    setIsModalOpen(false);
    console.log(`Welcome back — launching ${mode}…`, user);
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={creaImanLogo}
                alt="CreAIman"
                className="w-10 h-10 object-contain rounded-lg"
              />
              <span className="font-display text-lg font-bold text-foreground hidden sm:block">
                CreAIman
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={cn(
                  "relative font-body text-sm font-medium transition-colors duration-300",
                  location.pathname === "/" 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Home
                {location.pathname === "/" && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink to-violet rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
              
              {/* Mode Nav Items */}
              <ModeNavItem mode="general" onClick={() => handleModeClick("general")} />
              <ModeNavItem mode="manager" onClick={() => handleModeClick("manager")} />
              
              <Link
                to="/pricing"
                className={cn(
                  "relative font-body text-sm font-medium transition-colors duration-300",
                  location.pathname === "/pricing" 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Pricing
                {location.pathname === "/pricing" && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink to-violet rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </div>

            {/* Get Started Button */}
            <div className="hidden md:flex items-center">
              <Link to="/signup">
                <MagneticButton variant="hero" size="sm">
                  Get Started
                </MagneticButton>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2 glass-strong rounded-2xl p-6"
              >
                <div className="flex flex-col gap-4">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "font-body text-lg font-medium py-2",
                      location.pathname === "/" 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                    )}
                  >
                    Home
                  </Link>
                  
                  {/* Mode Nav Items in Mobile Menu */}
                  <div className="flex flex-col gap-2 py-2">
                    <ModeNavItem mode="general" onClick={() => { handleModeClick("general"); setIsOpen(false); }} />
                    <ModeNavItem mode="manager" onClick={() => { handleModeClick("manager"); setIsOpen(false); }} />
                  </div>
                  
                  <Link
                    to="/pricing"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "font-body text-lg font-medium py-2",
                      location.pathname === "/pricing" 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                    )}
                  >
                    Pricing
                  </Link>
                  
                  <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <MagneticButton variant="hero" className="w-full">
                        Get Started
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mode Login Modal */}
      <ModeLoginModal
        isOpen={isModalOpen}
        mode={selectedMode}
        onClose={() => setIsModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
    </>
  );
};
