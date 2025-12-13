import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CursorTrail } from "@/components/CursorTrail";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MagneticButton } from "@/components/MagneticButton";
import { TiltCard } from "@/components/TiltCard";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "/month",
    description: "Perfect for exploring CreAIman's capabilities",
    icon: Sparkles,
    features: [
      "5 AI generations per day",
      "Basic editing tools",
      "Community support",
      "1 project",
      "Standard quality exports",
    ],
    popular: false,
    cta: "Get Started Free",
  },
  {
    name: "Creator",
    price: "₹399",
    period: "/month",
    description: "Everything you need to create professionally",
    icon: Zap,
    features: [
      "Unlimited AI generations",
      "Advanced editing suite",
      "Priority support",
      "Unlimited projects",
      "4K quality exports",
      "Brand connection access",
      "Analytics dashboard",
      "Custom watermarks",
    ],
    popular: true,
    cta: "Start Creating",
  },
  {
    name: "Enterprise",
    price: "₹3999",
    period: "/month",
    description: "For teams and agencies at scale",
    icon: Crown,
    features: [
      "Everything in Creator",
      "Team collaboration",
      "API access",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Advanced analytics",
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <CursorTrail />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your creative journey. Upgrade or downgrade anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={`${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                <TiltCard 
                  className="h-full" 
                  glowOnHover={true}
                  holographicBorder={plan.popular}
                >
                  <div className={`p-8 rounded-2xl h-full flex flex-col ${
                    plan.popular 
                      ? 'bg-gradient-to-b from-card to-card/80 relative overflow-hidden' 
                      : 'bg-card'
                  }`}>
                    {/* Popular badge */}
                    {plan.popular && (
                      <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-pink to-violet text-white text-xs font-semibold rounded-bl-xl">
                        MOST POPULAR
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-pink to-violet shadow-glow-pink' 
                        : 'bg-muted'
                    }`}>
                      <plan.icon className={`w-7 h-7 ${plan.popular ? 'text-white' : 'text-foreground'}`} />
                    </div>

                    {/* Plan Info */}
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="font-display text-5xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground font-body">
                        {plan.period}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular 
                              ? 'bg-gradient-to-br from-pink to-violet' 
                              : 'bg-primary/20'
                          }`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-body text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <MagneticButton 
                      variant={plan.popular ? "hero" : "outline"} 
                      className="w-full"
                      size="lg"
                    >
                      {plan.cta}
                    </MagneticButton>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Have Questions?
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <MagneticButton variant="glass" size="lg">
              Contact Support
            </MagneticButton>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
