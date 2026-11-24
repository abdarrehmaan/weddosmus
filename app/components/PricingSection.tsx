"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Moon } from "lucide-react";
import Link from "next/link";
import { pricingTiers } from "@/app/data/templates";

export default function PricingSection({
  onSelectTier,
}: {
  onSelectTier?: (tier: (typeof pricingTiers)[0]) => void;
}) {
  const handleSelectTier = (tier: (typeof pricingTiers)[0]) => {
    if (onSelectTier) {
      onSelectTier(tier);
    } else {
      window.dispatchEvent(
        new CustomEvent("openOrder", {
          detail: {
            package: tier.name,
            price: tier.price,
          },
        })
      );
    }
  };

  return (
    <section id="pricing" className="section-py relative overflow-hidden bg-ivory">
      {/* Decorative Warm Ambient Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold-dark flex items-center justify-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-gold" />
            Transparent & Modest Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso">
            Choose Your Sacred Suite Tier
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            From 100% complimentary Islamic greetings to full bespoke 3D royal palace wedding editions. Zero monthly fees, cloud hosted for 6 months.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingTiers.map((tier, idx) => {
            const isPopular = tier.popular;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`relative rounded-3xl p-8 sm:p-9 glass-strong border transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? "border-gold/60 shadow-palace-glow ring-2 ring-gold/40 md:-translate-y-2 bg-gradient-to-b from-white/95 to-ivory-cream/90"
                    : "border-gold/20 hover:border-gold/40 shadow-palace-soft bg-white/80"
                }`}
              >
                {/* Popular Pill Top */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow">
                      <Sparkles className="w-3 h-3" />
                      {tier.badge || "Most Popular"}
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Description */}
                  <div className="text-center pb-6 border-b border-gold/15 space-y-2">
                    <h3 className="font-display text-2xl font-bold text-espresso">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-espresso-muted leading-relaxed">
                      {tier.description}
                    </p>

                    {/* Price */}
                    <div className="pt-4 flex items-baseline justify-center gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-black text-espresso">
                        {tier.price === 0 ? "FREE" : `₹${tier.price.toLocaleString("en-IN")}`}
                      </span>
                      {tier.originalPrice > 0 && (
                        <span className="text-sm text-espresso-muted line-through">
                          ₹{tier.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    {tier.price > 0 && (
                      <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 inline-block px-2.5 py-0.5 rounded-full mt-1">
                        Save ₹{(tier.originalPrice - tier.price).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="py-6 space-y-3 text-xs sm:text-sm text-espresso">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="text-espresso-light leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-gold/15 space-y-2">
                  <button
                    onClick={() => handleSelectTier(tier)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isPopular
                        ? "bg-gold-gradient text-white shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-102"
                        : "glass hover:bg-espresso hover:text-white border-gold/30 text-espresso"
                    }`}
                  >
                    {tier.cta}
                  </button>

                  <Link
                    href="/studio"
                    className="block text-center text-[11px] text-gold-dark hover:underline font-semibold"
                  >
                    Or test in Studio first →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
