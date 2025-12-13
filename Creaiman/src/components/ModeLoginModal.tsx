import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import creaImanLogo from "@/assets/creaiman-logo.jpg";

interface ModeLoginModalProps {
  isOpen: boolean;
  mode: "general" | "manager" | null;
  onClose: () => void;
  onAuthenticated: (user: { email: string }, mode: "general" | "manager") => void;
}

export const ModeLoginModal = ({ isOpen, mode, onClose, onAuthenticated }: ModeLoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaComplete, setCaptchaComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const modeConfig = {
    general: {
      title: "Sign in to General Mode",
      accent: "from-pink to-orange",
      icon: "✨",
    },
    manager: {
      title: "Sign in to Manager Mode",
      accent: "from-violet to-pink",
      icon: "⚡",
    },
  };

  const config = mode ? modeConfig[mode] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaComplete || !mode) return;

    setIsLoading(true);
    setError(null);

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo, always succeed - in real app, this would call auth API
    if (email && password) {
      onAuthenticated({ email }, mode);
    } else {
      setError("We couldn't verify your credentials. Try again or reset your password.");
      setIsLoading(false);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && config && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with slowed particles effect */}
          <motion.div
            className="absolute inset-0 bg-plum/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Swirling gradient backdrop */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
              style={{ background: `linear-gradient(135deg, hsl(var(--pink)), hsl(var(--violet)))` }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
              style={{ background: `linear-gradient(135deg, hsl(var(--orange)), hsl(var(--gold)))` }}
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "relative w-full max-w-md glass-strong rounded-3xl p-8 border border-white/20",
              error && "animate-[shake_0.5s_ease-in-out]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Logo */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src={creaImanLogo}
                alt="CreAIman"
                className="w-20 h-20 object-contain rounded-xl"
              />
            </motion.div>

            {/* Mode indicator */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-3">
                <span>{config.icon}</span>
                <span className="text-sm font-medium text-foreground capitalize">{mode} Mode</span>
              </div>
              <h2 id="modal-title" className="font-display text-2xl font-bold text-foreground">
                {config.title}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <motion.div
                className="relative"
                animate={focusedInput === "email" ? { y: -2 } : { y: 0 }}
              >
                <div className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-300",
                  focusedInput === "email" && "ring-2 ring-pink/50"
                )} />
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-pink/50 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Password input */}
              <motion.div
                className="relative"
                animate={focusedInput === "password" ? { y: -2 } : { y: 0 }}
              >
                <div className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-300",
                  focusedInput === "password" && "ring-2 ring-pink/50"
                )} />
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-pink/50 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* CAPTCHA */}
              <motion.button
                type="button"
                onClick={() => setCaptchaComplete(!captchaComplete)}
                className={cn(
                  "w-full p-4 rounded-xl border transition-all flex items-center gap-3",
                  captchaComplete
                    ? "bg-green-500/10 border-green-500/50"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={cn(
                    "w-6 h-6 rounded border-2 flex items-center justify-center",
                    captchaComplete ? "bg-green-500 border-green-500" : "border-muted-foreground"
                  )}
                  animate={captchaComplete ? { scale: [1, 1.2, 1] } : {}}
                >
                  {captchaComplete && <Check className="w-4 h-4 text-white" />}
                </motion.div>
                <span className="text-sm text-foreground">I'm not a robot</span>
              </motion.button>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={!captchaComplete || isLoading}
                className={cn(
                  "relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden transition-all",
                  `bg-gradient-to-r ${config.accent}`,
                  isLoading && "animate-pulse"
                )}
                whileHover={{ scale: captchaComplete && !isLoading ? 1.02 : 1 }}
                whileTap={{ scale: captchaComplete && !isLoading ? 0.98 : 1 }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Sign In"
                )}
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 border-2 border-white/50 rounded-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            </form>

            {/* Social login */}
            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-muted-foreground">or continue with</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="flex gap-3">
                {["Google", "Apple", "GitHub"].map((provider) => (
                  <motion.button
                    key={provider}
                    type="button"
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground hover:bg-white/10 transition-all relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {provider}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Guest option */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              <button
                type="button"
                className="text-pink hover:text-pink/80 underline-offset-4 hover:underline transition-colors"
              >
                Continue as Guest
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
