"use client";

import { motion } from "framer-motion";
import { Palette, FileText, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Pick a 3D Design",
    description:
      "Choose from our curated collection of Royal Palace, Nikah / Walima, or Modern Minimalist templates.",
    icon: Palette,
  },
  {
    step: "02",
    title: "Share Your Details",
    description:
      "Send your couple names, wedding dates, venues, and optional photos via our instant form or WhatsApp.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Go Live in 24 Hours",
    description:
      "Receive your custom link with interactive 3D seal, background music, and ready-to-share WhatsApp card.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-py relative overflow-hidden bg-ivory-cream/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold">
            Effortless Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            No technical knowledge or coding required. Our team handles complete
            customization and cloud hosting for you.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative rounded-3xl p-8 glass-strong border border-gold/20 hover:border-gold/50 shadow-palace-soft hover:shadow-palace-glow transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number Background Stamp */}
                <span className="absolute top-4 right-6 font-display text-6xl font-black text-gold/10 group-hover:text-gold/20 transition-colors pointer-events-none select-none">
                  {item.step}
                </span>

                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-[#FAF5ED] border border-gold/30 flex items-center justify-center text-gold shadow-sm mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-gold-dark" />
                  </div>

                  {/* Title & Description */}
                  <div className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    Step {item.step}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-espresso group-hover:text-gold transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow indicator on desktop */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass bg-white border border-gold/30 items-center justify-center text-gold shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
