"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye, Flame, MapPin, Music, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ArchwayShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const openDemo = () => {
    window.dispatchEvent(
      new CustomEvent("openSimulator", {
        detail: {
          id: "royal-palace",
          title: "Royal Noor Palace Archway",
        },
      })
    );
  };

  const openOrder = () => {
    window.dispatchEvent(
      new CustomEvent("openOrder", {
        detail: {
          package: "Gold",
          title: "Royal Noor Palace Archway",
        },
      })
    );
  };

  const hotspots = [
    {
      id: "lantern",
      x: "50%",
      y: "32%",
      title: "Hanging Brass Lantern",
      desc: "Warm ambient candlelight guiding your guests into the palace.",
    },
    {
      id: "roses",
      x: "82%",
      y: "22%",
      title: "Cascading Blush Rose Garlands",
      desc: "Delicate English roses framing your couple names and ceremony details.",
    },
    {
      id: "arch",
      x: "24%",
      y: "38%",
      title: "Carved Moorish Sandstone Arch",
      desc: "Sacred Andalusian & Mughal geometric carvings for royal prestige.",
    },
    {
      id: "candles",
      x: "15%",
      y: "88%",
      title: "Flickering Aisle Pillar Candles",
      desc: "Ethereal glow that welcomes guests with weightless antigravity physics.",
    },
  ];

  return (
    <section className="section-py relative overflow-hidden bg-gradient-to-b from-ivory via-ivory-cream to-ivory">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold/40 text-xs font-semibold text-gold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Signature 3D Palace Experience
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight">
            The Royal Palace Archway Theme
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            Inspired by majestic royal corridors, candlelit sanctuaries, and sacred calligraphy.
            Explore the interactive elements that make this our #1 most requested design.
          </p>
        </div>

        {/* ── Architectural Archway Showcase Canvas ── */}
        <div className="relative max-w-4xl mx-auto rounded-[2.5rem] sm:rounded-[3.5rem] p-4 sm:p-7 glass-strong border-2 border-gold/40 shadow-palace-glow overflow-hidden">
          {/* Main Visual Display */}
          <div className="relative aspect-[9/14] sm:aspect-[16/10] w-full rounded-[2rem] sm:rounded-[2.8rem] overflow-hidden shadow-2xl border border-gold/30">
            <Image
              src="/royal-archway.jpg"
              alt="The Royal Palace Archway Wedding Theme"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Radiant Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Interactive Hotspots */}
            {hotspots.map((h) => {
              const isSelected = activeHotspot === h.id;

              return (
                <div
                  key={h.id}
                  style={{ left: h.x, top: h.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <button
                    onClick={() => setActiveHotspot(isSelected ? null : h.id)}
                    className="relative group p-2 rounded-full cursor-pointer focus:outline-none"
                    aria-label={h.title}
                  >
                    {/* Pulsing halo */}
                    <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
                    <span className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border-2 border-gold flex items-center justify-center text-espresso shadow-lg group-hover:scale-115 transition-transform">
                      <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                    </span>
                  </button>

                  {/* Hotspot Card Tooltip */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 sm:w-64 p-3.5 rounded-2xl bg-espresso/95 backdrop-blur-xl border border-gold/50 text-white shadow-2xl z-40 text-left"
                    >
                      <div className="text-xs font-bold text-amber-300 font-display mb-1 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        {h.title}
                      </div>
                      <p className="text-[11px] text-amber-100/80 leading-relaxed">
                        {h.desc}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Bottom Overlay Card with Features */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 z-20 p-5 sm:p-7 rounded-3xl bg-black/65 backdrop-blur-md border border-gold/40 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-[3px] text-amber-300 font-semibold">
                  Live Interactive Website
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Ahmad & Fatima — Royal Noor Archway
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-amber-100/80 pt-1">
                  <span className="flex items-center gap-1">
                    <Music className="w-3.5 h-3.5 text-gold" /> Duff & Oud Audio
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Google Maps GPS
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" /> WhatsApp RSVP
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={openDemo}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-espresso bg-white hover:bg-ivory-sandstone shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-gold-dark" />
                  Live Preview
                </button>
                <button
                  onClick={openOrder}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Order Theme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
