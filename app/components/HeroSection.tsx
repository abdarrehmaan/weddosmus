"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Moon, ShieldCheck, MapPin, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 flex items-center justify-center overflow-hidden islamic-pattern-bg">
      {/* Decorative Islamic Background Ornaments */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-amber-200/25 via-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-24 left-10 w-72 h-72 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Islamic Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Sacred Arabic Calligraphy Crown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/30 text-emerald-900 shadow-sm"
            >
              <Moon className="w-3.5 h-3.5 text-gold-dark" />
              <span className="text-xs font-semibold uppercase tracking-widest font-arabic text-base leading-none">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </span>
            </motion.div>

            {/* Headline as requested */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-espresso leading-[1.15] tracking-tight">
                Celebrate Every Beautiful Moment,{" "}
                <span className="gold-shimmer-text block mt-1">The Islamic Way.</span>
              </h1>
            </motion.div>

            {/* Subtitle as requested */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-espresso-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            >
              Elegant Islamic invitations and greetings for life&apos;s most meaningful occasions —
              from sacred Nikah ceremonies and royal Walima feasts to blessed Eid celebrations,
              Aqiqah milestones, and personal duas.
            </motion.p>

            {/* Quranic Verse Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="p-4 rounded-2xl glass-strong border border-gold/30 max-w-xl mx-auto lg:mx-0 space-y-1"
            >
              <p className="font-arabic text-sm text-emerald-900 font-bold text-center lg:text-left">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>
              <p className="text-[11px] text-espresso-muted italic">
                &ldquo;And He placed between you affection and mercy.&rdquo; — Surah Ar-Rum [30:21]
              </p>
            </motion.div>

            {/* Primary Action Buttons as requested */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <a
                href="#weddings"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Explore Wedding Invitations
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#festivals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-espresso glass hover:bg-white border border-gold/35 hover:border-gold/60 transition-all shadow-sm"
              >
                <Moon className="w-4 h-4 text-gold-dark" />
                Explore Eid & Islamic Cards
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-espresso-muted"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                100% Sunnah & Modest Aesthetic
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold" />
                Authentic Arabic Calligraphy
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-700" />
                Live Maps & WhatsApp RSVP
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3D Islamic Invitation Stage (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Floating Islamic Geometry Shadow */}
            <div className="absolute inset-0 bg-gold/15 rounded-3xl blur-2xl transform rotate-2 scale-95" />

            {/* Grand Islamic Arch Card Mockup */}
            <div className="relative w-full max-w-sm rounded-[36px] bg-emerald-deep p-6 sm:p-7 border-2 border-gold/45 shadow-palace-glow text-center text-white overflow-hidden space-y-4">
              {/* Inner Gold Foil Archway Frame */}
              <div className="absolute inset-3 border border-gold/30 rounded-[28px] pointer-events-none" />

              {/* Top Calligraphy */}
              <div className="relative z-10 space-y-1">
                <span className="font-arabic text-xl text-gold-light block">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-200/80 font-bold block">
                  Royal Nikah & Walima Suite
                </span>
              </div>

              {/* Main Calligraphy Emblem */}
              <div className="relative z-10 py-1">
                <span className="font-arabic text-3xl text-gold-bright block font-bold">
                  بَارَكَ ٱللَّٰهُ لَكُمَا
                </span>
                <p className="text-[11px] text-amber-100/90 font-serif italic mt-1">
                  Together with their families request the honor of your prayers & presence
                </p>
              </div>

              {/* Couple Names */}
              <div className="relative z-10 py-1">
                <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                  Yassine Al-Mansoor
                </h3>
                <span className="font-arabic text-lg text-gold-light block mt-0.5">
                  ياسين المنصور
                </span>
                <span className="font-serif italic text-gold text-lg block my-0.5">&</span>
                <h3 className="font-display text-2xl font-bold tracking-wide text-white">
                  Fatima Az-Zahra
                </h3>
                <span className="font-arabic text-lg text-gold-light block mt-0.5">
                  فاطمة الزهراء
                </span>
              </div>

              {/* 3D Wax Seal Button Teaser */}
              <div className="relative z-10 pt-1">
                <Link
                  href="/invite/walima"
                  className="w-16 h-16 rounded-full mx-auto bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-gold-glow flex flex-col items-center justify-center text-espresso border border-amber-200 hover:scale-110 transition-transform group cursor-pointer"
                >
                  <span className="font-arabic font-bold text-lg leading-tight">وليمة</span>
                  <span className="text-[8px] font-extrabold uppercase tracking-wider text-amber-950">
                    Open 3D
                  </span>
                </Link>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Link
                    href="/invite/muslimswedd"
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-[#FFF6BD] border border-gold/30 transition-all"
                  >
                    ✦ Nikah Demo
                  </Link>
                  <Link
                    href="/invite/walima"
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gold/25 hover:bg-gold/35 text-gold-light border border-gold/45 transition-all"
                  >
                    ✨ Walima Demo
                  </Link>
                </div>
                <p className="text-[10px] text-emerald-200/70 mt-1 font-medium">
                  Tap to Experience Live 3D Heirloom Suites
                </p>
              </div>

              {/* Floating feature pills */}
              <div className="relative z-10 pt-2 border-t border-gold/20 flex items-center justify-between text-[10px] text-emerald-200/90">
                <span>📍 Royal Noor Palace</span>
                <span>•</span>
                <span>📅 18 Jumada al-Awwal</span>
                <span>•</span>
                <span>🌙 Live RSVP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
