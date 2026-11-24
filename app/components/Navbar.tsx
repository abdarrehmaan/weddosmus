"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ShoppingBag, User, Phone, Moon, Compass } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/app/context/StoreContext";

interface NavbarProps {
  onOpenCart?: () => void;
  onOpenAccount?: () => void;
}

export default function Navbar({ onOpenCart, onOpenAccount }: NavbarProps) {
  const { cart, announcement, setIsCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Wedding Suites", href: "/#weddings" },
    { label: "Eid & Festivals", href: "/#festivals" },
    { label: "Custom Studio", href: "/studio", highlight: true },
    { label: "3D Nikah Suite", href: "/invite/muslimswedd", isExternal: false },
    { label: "3D Walima Suite", href: "/invite/walima", isExternal: false },
    { label: "Admin Portal", href: "/admin" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      {announcement && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-amber-100 text-[11px] py-1.5 px-4 text-center font-medium border-b border-gold/30 tracking-wide flex items-center justify-center gap-2">
          <Moon className="w-3 h-3 text-gold-light" />
          <span>{announcement}</span>
        </div>
      )}

      {/* Main Glass Navbar */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          announcement ? "top-7" : "top-0"
        } ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-xl shadow-palace-soft py-3 border-b border-gold/20"
            : "bg-ivory/80 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Islamic Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Noor Islamic Platform Home"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-900 border border-gold/40 flex items-center justify-center text-gold-light shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-arabic text-lg font-bold">نور</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="gold-shimmer-text font-display text-xl sm:text-2xl font-extrabold tracking-wider">
                  NOOR AL-AQD
                </span>
                <span className="text-gold text-xs group-hover:rotate-45 transition-transform duration-300">
                  ✦
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[2px] font-semibold text-espresso-muted -mt-1 hidden sm:block">
                Islamic Digital Invitations
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-200 relative group py-1 ${
                  link.highlight
                    ? "text-gold-dark hover:text-espresso"
                    : "text-espresso-muted hover:text-gold"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-emerald-700 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Cart Button */}
            <button
              onClick={() => {
                if (onOpenCart) onOpenCart();
                else setIsCartOpen(true);
              }}
              className="relative p-2.5 rounded-full text-espresso hover:bg-gold/15 transition-all cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-espresso" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>

            {/* User Account / Profile Button */}
            <button
              onClick={() => {
                if (onOpenAccount) onOpenAccount();
              }}
              className="p-2.5 rounded-full text-espresso hover:bg-gold/15 transition-all cursor-pointer hidden sm:flex"
              aria-label="Account"
            >
              <User className="w-4 h-4 text-espresso" />
            </button>

            {/* Custom Studio CTA */}
            <Link
              href="/studio"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Studio
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-espresso hover:bg-gold/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-ivory/98 backdrop-blur-2xl border-b border-gold/30 shadow-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-lg font-bold text-espresso hover:text-gold transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-gold text-xs">✦</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-gold/20 flex flex-col gap-2">
                <Link
                  href="/studio"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 rounded-full text-xs uppercase tracking-wider font-bold text-white bg-gold-gradient shadow-gold-glow"
                >
                  Open Customization Studio
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    if (onOpenCart) onOpenCart();
                    else setIsCartOpen(true);
                  }}
                  className="w-full text-center py-2.5 rounded-full text-xs font-semibold text-espresso glass border border-gold/30"
                >
                  View Cart ({cart.length})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
