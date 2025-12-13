import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Zap, Users, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CursorTrail } from "@/components/CursorTrail";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MagneticButton } from "@/components/MagneticButton";
import { TiltCard } from "@/components/TiltCard";
import { ModeSelector } from "@/components/ModeSelector";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Creation",
    description: "Generate stunning content with cutting-edge AI that understands your vision.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "From idea to execution in seconds. Your creativity, amplified instantly.",
  },
  {
    icon: Users,
    title: "Brand Connections",
    description: "Connect with top brands and unlock new opportunities for collaboration.",
  },
];

const stats = [
  { value: "50K+", label: "Creators" },
  { value: "1M+", label: "Projects" },
  { value: "500+", label: "Brands" },
  { value: "99%", label: "Satisfaction" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedBackground />
      <CursorTrail />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              <span className="text-foreground">Create Beyond</span>
              <br />
              <span className="text-gradient">Imagination</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Where AI meets creativity. Empower your content, connect with brands, 
              and transform your ideas into reality with CreAIman.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link to="/signup">
                <MagneticButton variant="hero" size="xl">
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 ml-1" />
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-pink"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Mode Selector Section */}
      <ModeSelector />

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient">CreAIman</span>?
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of content creation with our powerful AI tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard className="h-full">
                  <div className="p-8 bg-card rounded-2xl h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink to-violet flex items-center justify-center mb-6 shadow-glow-pink">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
            style={{
              background: "linear-gradient(135deg, hsl(330 100% 65% / 0.2), hsl(251 100% 69% / 0.2))",
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Transform Your <span className="text-gradient">Creative Journey</span>?
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of creators who are already using CreAIman to elevate their content.
              </p>
              <Link to="/signup">
                <MagneticButton variant="hero" size="xl">
                  Get Started Now
                  <Sparkles className="w-5 h-5 ml-1" />
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - At Page End */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="font-body text-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
