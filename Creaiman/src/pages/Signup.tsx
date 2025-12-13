import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CreAImanLogo } from "@/components/CreAImanLogo";
import { MagneticButton } from "@/components/MagneticButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Navigate} from "react-router-dom";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState({email:"", password:"",});

function ChatForm(){
  const [form, setForm] = useState({
    title: "",
    genre: "",
    description: "",
  });
  const handleChange=(e:any) => {
    setForm({...form,  [e.target.name]: e.target.value});
  };
}
const handleSignIn = async (e: any) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();
  if (data["message"] == "User registered")
    return <Navigate to="/general" replace/>
};

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link to="/">
            <CreAImanLogo size="lg" />
          </Link>
        </motion.div>

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden">
          {/* Decorative gradient orbs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">
              Join the Future
            </h1>
            <p className="font-body text-muted-foreground text-center mb-8">
              Create your CreAIman account
            </p>

            <form className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-body">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
              
                    className={`pl-12 h-12 rounded-xl bg-muted/50 border-2 transition-all duration-300 font-body ${
                      focusedField === 'name' 
                        ? 'border-pink shadow-glow-pink' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-body">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-12 h-12 rounded-xl bg-muted/50 border-2 transition-all duration-300 font-body ${
                      focusedField === 'email' 
                        ? 'border-pink shadow-glow-pink' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-body">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={`pl-12 pr-12 h-12 rounded-xl bg-muted/50 border-2 transition-all duration-300 font-body ${
                      focusedField === 'password' 
                        ? 'border-violet shadow-glow-violet' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <MagneticButton variant="hero" className="w-full" size="lg" onClick = {handleSignIn}>
                Create Account
                <ArrowRight className="w-5 h-5 ml-1" />
              </MagneticButton>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="text-sm text-muted-foreground font-body">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <MagneticButton variant="glass" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </MagneticButton>
              <MagneticButton variant="glass" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </MagneticButton>
            </div>

            {/* Login Link */}
            <p className="text-center text-muted-foreground font-body mt-8">
              Already have an account?{" "}
              <Link to="/login" className="text-pink hover:text-pink-light transition-colors font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default Signup;
