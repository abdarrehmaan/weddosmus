"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, MessageCircle, Heart, Sparkles } from "lucide-react";

const quickLinks = [
  { label: "3D Collection", href: "#collection" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const trustBadges = [
  "✅ 100% Mobile & WhatsApp Compatible",
  "⚡ 24-Hour Express Delivery",
  "🔒 Secure Payments & Free Revisions",
];

export default function Footer() {
  return (
    <footer className="bg-[#FAF5ED] border-t border-gold/25 relative overflow-hidden">
      {/* Subtle Warm Amber Glow Corner */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Row: Brand & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <span className="gold-shimmer-text font-display text-3xl font-extrabold tracking-wider">
                WEDOS
              </span>
              <Sparkles className="w-5 h-5 text-gold" />
            </a>
            <p className="text-sm text-espresso-muted max-w-sm leading-relaxed">
              Crafting bespoke 3D interactive wedding website experiences inspired by
              royal palace architecture, golden wax seals, and modern digital grace.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-espresso-muted hover:text-gold hover:border-gold/40 hover:scale-110 transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-espresso uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-espresso-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="font-display text-sm font-bold text-espresso uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-espresso-muted">
              <li>📍 New Delhi, India · Global Delivery</li>
              <li>📱 WhatsApp: +91 12345 67890</li>
              <li>✉️ hello@wedos.in</li>
              <li>🕐 Mon–Sat, 10:00 AM – 8:00 PM IST</li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-6 border-y border-gold/15">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="glass-strong rounded-full px-4 py-2 text-xs font-medium text-espresso-light shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-espresso-muted">
          <p>© {new Date().getFullYear()} WEDOS. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & Barakah
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Floating WhatsApp Action Button ── */
export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/911234567890?text=Hi!%20I'm%20interested%20in%20a%20royal%203D%20wedding%20invitation%20website."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_25px_rgba(37,211,102,0.4)] flex items-center justify-center cursor-pointer group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulsing Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
      <MessageCircle className="w-7 h-7 text-white fill-white relative z-10" />

      {/* Hover Tooltip */}
      <span className="hidden sm:inline-block absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-espresso text-ivory text-xs px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with Us
      </span>
    </motion.a>
  );
}
