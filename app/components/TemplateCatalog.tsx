"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingBag, Sparkles, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories, templates, Template } from "@/app/data/templates";

// 3D Tilt Card Component
function TiltCard({ template, index }: { template: Template; index: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handlePreview = () => {
    window.dispatchEvent(
      new CustomEvent("openSimulator", { detail: template })
    );
  };

  const handleOrder = () => {
    window.dispatchEvent(
      new CustomEvent("openOrder", { detail: template })
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`group relative rounded-3xl overflow-hidden glass-strong border transition-all duration-300 ${
        template.popular
          ? "border-gold/50 shadow-palace-glow ring-2 ring-gold/30"
          : "border-gold/20 hover:border-gold/45 shadow-palace-soft hover:shadow-palace-glow"
      }`}
    >
      {/* 3D Interactive Badge */}
      <div className="absolute top-3.5 left-3.5 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-espresso shadow-sm border border-gold/30">
          <Sparkles className="w-3 h-3 text-gold" />
          3D Interactive
        </span>
      </div>

      {/* Ribbon Badge (Best Seller, Premium, etc.) */}
      {template.badge && (
        <div className="absolute top-3.5 right-3.5 z-20">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow">
            {template.badge}
          </span>
        </div>
      )}

      {/* Image Preview Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-sandstone">
        <Image
          src={template.image}
          alt={template.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        {/* Soft gradient fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/20 to-transparent opacity-90" />
      </div>

      {/* Card Details */}
      <div className="p-5 sm:p-6 space-y-4 bg-white/60 backdrop-blur-md">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
            {template.category}
          </span>
          <h3 className="font-display text-xl font-bold text-espresso group-hover:text-gold transition-colors mt-0.5">
            {template.title}
          </h3>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1.5">
          {template.features.map((feature, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-medium text-espresso-muted bg-ivory-sandstone/60 border border-gold/15"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Pricing Line */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl font-bold font-display text-espresso">
            ₹{template.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-espresso-muted line-through">
            ₹{template.originalPrice.toLocaleString("en-IN")}
          </span>
          <span className="ml-auto text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
            Save {Math.round(((template.originalPrice - template.price) / template.originalPrice) * 100)}%
          </span>
        </div>

        {/* Dual Actions & Live Experience */}
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePreview}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-semibold text-espresso glass hover:bg-white border border-gold/30 hover:border-gold/60 transition-all shadow-sm cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              Simulator
            </button>
            <button
              onClick={handleOrder}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-semibold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-102 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Order Now
            </button>
          </div>

          <a
            href={`/invite/${template.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-[11px] font-semibold text-gold-dark hover:text-espresso bg-gold/10 hover:bg-gold/20 border border-gold/20 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3 h-3 text-gold" />
            <span>Open Fullscreen 3D URL</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function TemplateCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section id="collection" className="section-py relative overflow-hidden bg-ivory-cream/50">
      {/* Decorative background ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blush/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold">
            Bespoke 3D Designs
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso">
            Filterable 3D Template Storefront
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            Every invitation includes 3D envelope opening, custom music playback, one-click maps,
            and guest RSVP syncing with zero ongoing hosting fees.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gold-gradient text-white shadow-gold-glow scale-105"
                    : "glass text-espresso-muted hover:text-espresso border-gold/20 hover:border-gold/40"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 3D Catalog Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, idx) => (
              <TiltCard key={template.id} template={template} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
