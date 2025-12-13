import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  Wand2,
  BarChart3,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Target,
} from "lucide-react";

import Layout from "@/components/Layout";

import { MagneticButton } from "@/components/MagneticButton";
import { TiltCard } from "@/components/TiltCard";
import { LoginModal } from "@/components/LoginModal";
import { Footer } from "@/components/Footer";
import { FloatingShapes } from "@/components/ui/FloatingShapes";

export default function Home() {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState<"general" | "manager" | null>(null);

  const selectMode = (mode: "general" | "manager") => {
    setLoginMode(mode);
  };

  const onLoginSuccess = () => {
    navigate(loginMode === "general" ? "/general" : "/manager");
    setLoginMode(null);
  };

  return (
    <Layout>
      {/* Background Glow + Shapes */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <FloatingShapes />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-700/20 to-black" />
      </div>

      {/* HERO SECTION */}
      <section className="relative flex min-h-[85vh] items-center justify-center text-center px-6">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white">
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
              CreAIman
            </span>
            <br />
            Your AI Content Partner
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Create smarter, grow faster. AI-powered tools for creators & managers — 
            designed to elevate your workflow.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => selectMode("general")}
            >
              <Sparkles className="h-5 w-5" />
              Try General Mode
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => selectMode("manager")}
            >
              <BarChart3 className="h-5 w-5" />
              Try Manager Mode
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>

            <MagneticButton variant="outline" size="lg" onClick={() => navigate("/pricing")}>
              View Pricing
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              icon: Sparkles,
              title: "AI-Powered Ideas",
              desc: "Generate endless content ideas tailored to your niche."
            },
            {
              icon: Wand2,
              title: "Smart Writing",
              desc: "Polish your thoughts into scripts, captions & posts instantly."
            },
            {
              icon: BarChart3,
              title: "Growth Analytics",
              desc: "Understand your audience and grow smarter with insights."
            },
          ].map((f, i) => (
            <TiltCard key={i} glowColor={i === 0 ? "pink" : i === 1 ? "violet" : "peach"}>
              <div className="flex flex-col items-start">
                <f.icon className="h-8 w-8 mb-4 text-purple-300" />
                <h3 className="text-xl font-semibold text-white">{f.title}</h3>
                <p className="text-gray-300">{f.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">
          How It <span className="gradient-text">Works</span>
        </h2>

        <div className="grid gap-10 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              icon: Zap,
              title: "Choose Mode",
              desc: "Select General or Manager Mode to personalize your experience."
            },
            {
              icon: TrendingUp,
              title: "Create Smarter",
              desc: "Generate posts, insights & ideas using advanced AI tools."
            },
            {
              icon: Shield,
              title: "Grow Confidently",
              desc: "Use analytics and insights to scale with precision."
            },
          ].map((step, i) => (
            <TiltCard key={i} glowColor={i % 2 ? "violet" : "pink"}>
              <div className="text-center">
                <step.icon className="h-10 w-10 mb-4 text-purple-300 mx-auto" />
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Transform Your Content?
        </h2>
        <p className="text-gray-300 mb-8">
          Join thousands of creators already using CreAIman to grow faster.
        </p>

        <MagneticButton variant="primary" size="lg" onClick={() => navigate("/pricing")}>
          See Pricing
          <ArrowRight className="h-5 w-5" />
        </MagneticButton>
      </section>

      {/* FOOTER FIXED */}
      <Footer />

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={loginMode !== null}
        onClose={() => setLoginMode(null)}
        onSuccess={onLoginSuccess}
        mode={loginMode || "general"}
      />
    </Layout>
  );
}
