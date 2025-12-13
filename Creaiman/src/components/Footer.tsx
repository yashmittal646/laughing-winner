import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CreAImanLogo } from "./CreAImanLogo";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", path: "#" },
    { name: "Pricing", path: "/pricing" },
    { name: "Integrations", path: "#" },
    { name: "API", path: "#" },
  ],
  company: [
    { name: "About", path: "#" },
    { name: "Blog", path: "#" },
    { name: "Careers", path: "#" },
    { name: "Contact", path: "#" },
  ],
  resources: [
    { name: "Documentation", path: "#" },
    { name: "Help Center", path: "#" },
    { name: "Community", path: "#" },
    { name: "Tutorials", path: "#" },
  ],
  legal: [
    { name: "Privacy", path: "#" },
    { name: "Terms", path: "#" },
    { name: "Cookies", path: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Youtube, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border/50">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-pink to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2">
            <CreAImanLogo size="md" />
            <p className="mt-4 text-muted-foreground text-sm max-w-xs">
              Empowering creators and brands with AI-driven tools for the future of content creation.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-glow-pink transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CreAIman. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with ✨ for the future of creation
          </p>
        </div>
      </div>
    </footer>
  );
};
