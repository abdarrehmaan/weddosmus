"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "MuslimsWedd Live", href: "/invite/muslimswedd", highlight: true },
  { label: "3D Collection", href: "#collection" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-xl shadow-palace-soft py-3.5"
            : "bg-ivory/70 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="WEDOS Home"
          >
            <span className="gold-shimmer-text font-display text-2xl md:text-3xl font-extrabold tracking-wider">
              WEDOS
            </span>
            <span className="text-gold text-lg group-hover:rotate-45 transition-transform duration-300">
              ✦
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-espresso-light hover:text-gold transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-blush rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/invite/muslimswedd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              MuslimsWedd Demo
            </a>
            <a
              href="https://wa.me/911234567890?text=Hi!%20I%20want%20to%20order%20the%20MuslimsWedd%20royal%20invitation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-espresso glass hover:bg-white border border-gold/30 hover:border-gold/60 transition-all"
            >
              Order on WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl glass text-espresso-light hover:text-gold transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Bottom subtle gold hairline border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[65px] z-40 md:hidden bg-ivory-cream/98 backdrop-blur-2xl border-b border-gold/25 shadow-palace-soft px-6 pt-6 pb-8"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-base font-medium text-espresso hover:text-gold py-2 border-b border-gold/10 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/911234567890?text=Hi!%20I%20want%20a%20live%20demo%20of%20your%203D%20wedding%20invitation"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center justify-center gap-2 w-full mt-4 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gold-gradient shadow-gold-glow"
              >
                <Sparkles className="w-4 h-4" />
                Book Live Demo
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
