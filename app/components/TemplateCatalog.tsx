"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Search,
  Eye,
  Heart,
  Moon,
  Check,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  MAIN_CATEGORIES,
  SUBCATEGORIES_BY_MAIN,
  Template,
} from "@/app/data/templates";
import { useStore } from "@/app/context/StoreContext";

// 3D Tilt Card Component for Islamic Invitations
function IslamicTemplateCard({
  template,
  index,
  onQuickOrder,
}: {
  template: Template;
  index: number;
  onQuickOrder: (tpl: Template) => void;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { addToCart } = useStore();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isFree = template.price === 0 || template.isFree;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`group relative rounded-3xl overflow-hidden glass-strong border transition-all duration-300 flex flex-col justify-between ${
        template.popular
          ? "border-gold/50 shadow-palace-glow ring-1 ring-gold/40"
          : "border-gold/25 hover:border-gold/50 shadow-palace-soft hover:shadow-palace-glow"
      }`}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
        {isFree ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-sm">
            100% Free
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-espresso shadow-sm border border-gold/30">
            <Sparkles className="w-3 h-3 text-gold" />
            3D Interactive
          </span>
        )}
      </div>

      {template.badge && (
        <div className="absolute top-3 right-3 z-20">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow">
            {template.badge}
          </span>
        </div>
      )}

      {/* Image Preview Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory-sandstone">
        <Image
          src={template.image}
          alt={template.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Soft gradient fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />

        {/* Arabic Calligraphy Banner Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-center z-10">
          <p className="font-arabic text-xl sm:text-2xl text-amber-100 font-bold drop-shadow-md leading-tight">
            {template.arabicCalligraphy}
          </p>
          <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold block drop-shadow">
            {template.calligraphyTitle}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 space-y-3.5 bg-white/70 backdrop-blur-md flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
              {template.subcategory || template.category}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-espresso group-hover:text-gold transition-colors line-clamp-1">
            {template.title}
          </h3>
          {template.description && (
            <p className="text-xs text-espresso-muted line-clamp-2 leading-relaxed">
              {template.description}
            </p>
          )}
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1">
          {template.features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium text-espresso-muted bg-ivory-sandstone/60 border border-gold/15"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Pricing Line */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-gold/15">
          {isFree ? (
            <span className="text-xl font-bold font-display text-emerald-800">
              FREE DOWNLOAD
            </span>
          ) : (
            <>
              <span className="text-xl font-bold font-display text-espresso">
                ₹{template.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-espresso-muted line-through">
                ₹{template.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="ml-auto text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Save {Math.round(((template.originalPrice - template.price) / template.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/studio?template=${template.id}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-espresso glass hover:bg-white border border-gold/30 hover:border-gold/60 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              Customize
            </Link>

            <button
              onClick={() => {
                if (isFree) {
                  addToCart(template, "Free Islamic Download");
                } else {
                  onQuickOrder(template);
                }
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-102 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {isFree ? "Get Free" : "Order"}
            </button>
          </div>

          <Link
            href={`/invite/${template.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-semibold text-gold-dark hover:text-espresso bg-gold/10 hover:bg-gold/20 border border-gold/20 transition-all"
          >
            <ExternalLink className="w-3 h-3 text-gold" />
            <span>Open Live 3D Experience</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function TemplateCatalog({
  onSelectOrder,
}: {
  onSelectOrder?: (tpl: Template) => void;
}) {
  const { templates } = useStore();
  const [activeMainCategory, setActiveMainCategory] = useState<string>("All");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);

  // Subcategories for current main category
  const availableSubcategories =
    activeMainCategory !== "All" && SUBCATEGORIES_BY_MAIN[activeMainCategory]
      ? SUBCATEGORIES_BY_MAIN[activeMainCategory]
      : [];

  // Filter templates
  const filteredTemplates = templates.filter((t) => {
    // Main category
    if (activeMainCategory !== "All" && t.mainCategory !== activeMainCategory) {
      return false;
    }
    // Subcategory
    if (
      activeSubcategory !== "All" &&
      !activeSubcategory.startsWith("All ") &&
      t.subcategory !== activeSubcategory
    ) {
      return false;
    }
    // Free only toggle
    if (freeOnly && t.price !== 0 && !t.isFree) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        t.title.toLowerCase().includes(q) ||
        t.subcategory?.toLowerCase().includes(q) ||
        t.mainCategory?.toLowerCase().includes(q) ||
        t.arabicCalligraphy?.toLowerCase().includes(q) ||
        t.calligraphyTitle?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <section id="weddings" className="section-py relative overflow-hidden bg-ivory-cream/50">
      {/* Decorative background ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold-dark flex items-center justify-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-gold" />
            Curated Islamic Suites & Greetings
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso">
            Explore All Islamic Collections
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            Every design includes authentic Arabic calligraphy, customizable Quranic duas, real-time live WhatsApp RSVPs, and high-resolution downloads.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Nikah, Walima, Eid, Ramadan, Aqiqah or calligraphy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full text-xs border border-gold/30 bg-white/90 backdrop-blur-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <button
              onClick={() => setFreeOnly(!freeOnly)}
              className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                freeOnly
                  ? "bg-emerald-800 text-white shadow-emerald-glow"
                  : "glass text-espresso-muted hover:text-espresso border-gold/30"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              {freeOnly ? "Showing 100% Free Only" : "Filter: Free Templates"}
            </button>
          </div>

          {/* Primary Main Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {MAIN_CATEGORIES.map((category) => {
              const isActive = activeMainCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveMainCategory(category);
                    setActiveSubcategory("All");
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-espresso text-amber-100 shadow-palace-soft scale-105"
                      : "glass text-espresso-muted hover:text-espresso border-gold/20 hover:border-gold/40"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Subcategory Pills (when a specific main category is selected) */}
          {availableSubcategories.length > 0 && (
            <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {availableSubcategories.map((subcat) => {
                const isSubActive =
                  activeSubcategory === subcat ||
                  (activeSubcategory === "All" && subcat.startsWith("All "));
                return (
                  <button
                    key={subcat}
                    onClick={() => setActiveSubcategory(subcat)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                      isSubActive
                        ? "bg-gold text-white font-semibold"
                        : "bg-white/60 text-espresso-muted hover:text-espresso border border-gold/15"
                    }`}
                  >
                    {subcat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Templates Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, idx) => (
              <IslamicTemplateCard
                key={template.id}
                template={template}
                index={idx}
                onQuickOrder={(tpl) => {
                  if (onSelectOrder) onSelectOrder(tpl);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Moon className="w-12 h-12 text-gold mx-auto opacity-50" />
            <h3 className="font-display text-xl font-bold text-espresso">
              No matching Islamic designs found
            </h3>
            <p className="text-xs text-espresso-muted max-w-sm mx-auto">
              Try adjusting your search query or reset the category filters to browse all Islamic suites.
            </p>
            <button
              onClick={() => {
                setActiveMainCategory("All");
                setActiveSubcategory("All");
                setSearchQuery("");
                setFreeOnly(false);
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-gold-gradient shadow-gold-glow"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
