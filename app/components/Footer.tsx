"use client";

import { motion } from "framer-motion";
import { MessageCircle, Heart, Sparkles, Moon, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const islamicCategories = [
  { label: "Nikah & Walima Invitations", href: "/#weddings" },
  { label: "Eid-ul-Fitr & Eid-ul-Adha Cards", href: "/#festivals" },
  { label: "Ramadan Kareem & Iftar Dawat", href: "/#festivals" },
  { label: "Sunnah Aqiqah Milestones", href: "/#weddings" },
  { label: "Bismillah & Khatam-e-Quran", href: "/#weddings" },
  { label: "Jummah Mubarak Keepsakes", href: "/#festivals" },
];

const platformLinks = [
  { label: "Customization Studio", href: "/studio" },
  { label: "3D Nikah Suite Demo", href: "/invite/muslimswedd" },
  { label: "3D Walima Suite Demo", href: "/invite/walima" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing & Free Cards", href: "/#pricing" },
  { label: "Admin Dashboard", href: "/admin" },
];

export default function Footer() {
  return (
    <footer className="bg-[#FAF5ED] border-t border-gold/25 relative overflow-hidden text-espresso">
      {/* Subtle Warm Amber Glow Corner */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Islamic Banner Quote */}
        <div className="text-center py-6 mb-12 border-b border-gold/20 max-w-2xl mx-auto space-y-2">
          <p className="font-arabic text-xl sm:text-2xl text-emerald-950 font-bold leading-relaxed">
            بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="text-xs text-espresso-muted italic">
            &ldquo;May Allah bless you, shower His blessings upon you, and unite you both in goodness.&rdquo;
          </p>
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-emerald-900 border border-gold/40 flex items-center justify-center text-gold-light">
                <span className="font-arabic text-base font-bold">نور</span>
              </div>
              <span className="gold-shimmer-text font-display text-2xl font-extrabold tracking-wider">
                NOOR AL-AQD
              </span>
            </Link>
            <p className="text-xs text-espresso-muted leading-relaxed">
              The premier Islamic digital invitation & greeting card studio. Exclusively dedicated to Muslim weddings, Eid celebrations, and religious family events.
            </p>
            <div className="pt-2 text-xs text-emerald-900 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              100% Islamic & Sunnah Compliant
            </div>
          </div>

          {/* Column 2: Islamic Occasions */}
          <div>
            <h4 className="font-display text-xs font-bold text-espresso uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-gold" />
              Sacred Occasions
            </h4>
            <ul className="space-y-2.5">
              {islamicCategories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-espresso-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform Tools */}
          <div>
            <h4 className="font-display text-xs font-bold text-espresso uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Studio & Features
            </h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-espresso-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="font-display text-xs font-bold text-espresso uppercase tracking-wider mb-4">
              Direct Concierge
            </h4>
            <ul className="space-y-2 text-xs text-espresso-muted">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                Dubai • London • Hyderabad
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                WhatsApp: +91 94736 30937
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                salam@nooralaqd.com
              </li>
              <li>⏰ Sunday–Thursday: 9am – 9pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-espresso-muted">
          <p>© {new Date().getFullYear()} Noor Al-Aqd Islamic Digital Studio. All rights reserved.</p>
          <p className="text-gold/70">Made by <a href="https://abdurrahmanmaqsood.in" target="_blank" rel="noopener noreferrer" className="text-gold font-semibold hover:underline">Abdarrehmaan</a></p>
          <div className="flex gap-4">
            <Link href="/studio" className="hover:text-gold transition-colors">
              Customizer Studio
            </Link>
            <Link href="/admin" className="hover:text-gold transition-colors">
              Admin Portal
            </Link>
            <a
              href="https://wa.me/919473630937"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 font-semibold hover:underline"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp concierge button
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919473630937?text=Assalamu%20Alaikum!%20I%20would%20like%20to%20inquire%20about%20Noor%20Islamic%20invitations."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-800 text-white shadow-emerald-glow hover:bg-emerald-700 hover:scale-105 transition-all"
      aria-label="Contact Concierge on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
        Islamic Concierge
      </span>
    </a>
  );
}
