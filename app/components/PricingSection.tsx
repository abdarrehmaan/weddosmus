"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { pricingTiers } from "@/app/data/templates";

export default function PricingSection() {
  const handleSelectTier = (tier: (typeof pricingTiers)[0]) => {
    window.dispatchEvent(
      new CustomEvent("openOrder", {
        detail: {
          package: tier.name,
          price: tier.price,
        },
      })
    );
  };

  return (
    <section id="pricing" className="section-py relative overflow-hidden bg-ivory">
      {/* Decorative Warm Ambient Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold">
            Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso">
            Choose Your Royal Tier
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            One-time payment with zero hosting fees. Free revisions and dedicated
            WhatsApp support included.
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
                        ₹{tier.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-espresso-muted line-through">
                        ₹{tier.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 inline-block px-2.5 py-0.5 rounded-full mt-1">
                      Save ₹{(tier.originalPrice - tier.price).toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="py-6 space-y-3.5">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-espresso-light">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Tier CTA */}
                <button
                  onClick={() => handleSelectTier(tier)}
                  className={`w-full py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${
                    isPopular
                      ? "text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-103"
                      : "text-espresso glass hover:bg-white border border-gold/30 hover:border-gold/60"
                  }`}
                >
                  {tier.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
