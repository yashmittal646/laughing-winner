import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Lightbulb, Users } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { ModeLoginModal } from "./ModeLoginModal";

interface ModeSelectorProps {
  onModeSelected?: (mode: "general" | "manager") => void;
}

export const ModeSelector = ({ onModeSelected }: ModeSelectorProps) => {
  const [selectedMode, setSelectedMode] = useState<"general" | "manager" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickLockRef = useRef(false);

  const handleModeClick = (mode: "general" | "manager") => {
    // Prevent multiple rapid clicks
    if (clickLockRef.current || isModalOpen) return;
    clickLockRef.current = true;

    setSelectedMode(mode);
    setIsModalOpen(true);

    // Reset lock after modal opens
    setTimeout(() => {
      clickLockRef.current = false;
    }, 300);
  };

  const handleAuthenticated = (user: { email: string }, mode: "general" | "manager") => {
    setIsModalOpen(false);
    onModeSelected?.(mode);
    // Here you would typically navigate to the dashboard
    console.log(`Welcome back — launching ${mode}…`, user);
  };

  const modes = [
    {
      id: "general" as const,
      title: "General Mode",
      subline: "Creative-first workspace — streamlined for rapid ideation and content flow.",
      icon: Lightbulb,
      secondaryIcon: Sparkles,
      chip: "Creative · Lightweight",
      gradient: "from-pink via-orange to-gold",
      accentColor: "pink",
    },
    {
      id: "manager" as const,
      title: "Manager Mode",
      subline: "Full admin controls — manage teams, monetization, and advanced AI workflows.",
      icon: Shield,
      secondaryIcon: Users,
      chip: "Admin · Powerful",
      gradient: "from-violet via-pink to-orange",
      accentColor: "violet",
    },
  ];

  return (
    <>
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
              Choose Your <span className="text-gradient">Experience</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Select how you want to create and manage your content.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {modes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <TiltCard
                  className="h-full cursor-pointer"
                  glowColor={mode.accentColor === "pink" ? "rgba(255, 79, 178, 0.3)" : "rgba(125, 95, 255, 0.3)"}
                >
                  <motion.button
                    data-mode={mode.id}
                    onClick={() => handleModeClick(mode.id)}
                    className="w-full h-full p-8 md:p-10 bg-card rounded-2xl text-left relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${mode.gradient}`}
                    />

                    {/* Holographic overlay on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                      }}
                    />

                    {/* Floating icons */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center shadow-lg`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <mode.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <motion.div
                          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
                          animate={{ y: [0, -3, 0], x: [0, 3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                          <mode.secondaryIcon className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                        {mode.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-muted-foreground mb-6">
                        {mode.subline}
                      </p>

                      {/* Chip */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${mode.gradient} bg-opacity-10`}>
                        <span className="text-sm font-medium text-foreground">{mode.chip}</span>
                      </div>
                    </div>

                    {/* Animated border on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-colors duration-300"
                    />
                  </motion.button>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ModeLoginModal
        isOpen={isModalOpen}
        mode={selectedMode}
        onClose={() => setIsModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
    </>
  );
};
