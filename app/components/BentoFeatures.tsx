"use client";

import { motion } from "framer-motion";
import {
  Box,
  Music,
  MapPin,
  Users,
  Image as ImageIcon,
  Share2,
} from "lucide-react";
import { bentoFeatures } from "@/app/data/templates";

// Mapping icon strings to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Box,
  Music,
  MapPin,
  Users,
  Image: ImageIcon,
  Share2,
};

export default function BentoFeatures() {
  return (
    <section id="features" className="section-py relative overflow-hidden bg-ivory">
      {/* Decorative Warm Palace Ambient Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold">
            Next-Gen Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso">
            Why Choose Our 3D Websites
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            Eliminate print delays, lost invitations, and guest confusion with our
            cutting-edge interactive features.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoFeatures.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Box;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`${item.span} group relative rounded-3xl p-7 sm:p-9 glass-strong border border-gold/20 hover:border-gold/50 shadow-palace-soft hover:shadow-palace-glow transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle Amber Glow Corner */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-amber-200/30 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

                <div>
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-[#FAF5ED] border border-gold/30 flex items-center justify-center text-gold shadow-sm mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-gold-dark" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-espresso group-hover:text-gold transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Decorative Line */}
                <div className="pt-6 mt-4 border-t border-gold/15 flex items-center justify-between text-xs font-semibold text-gold">
                  <span>Included in All 3D Packages</span>
                  <span className="group-hover:translate-x-1 transition-transform">✦</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
