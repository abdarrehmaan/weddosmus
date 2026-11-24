"use client";

import { motion } from "framer-motion";
import { Sparkles, Moon, Star, Heart, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { templates, Template } from "@/app/data/templates";
import { useStore } from "@/app/context/StoreContext";

export function TrendingEidSection({ onSelectOrder }: { onSelectOrder?: (t: Template) => void }) {
  const { addToCart } = useStore();
  const eidTemplates = templates.filter(
    (t) =>
      t.mainCategory === "Islamic Festival Cards" &&
      (t.subcategory.includes("Eid") || t.subcategory.includes("Chand Raat"))
  );

  return (
    <section id="festivals" className="section-py relative bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[3px] text-emerald-800 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-gold" />
              Blessed Festivities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso">
              Trending Eid Greeting Cards & Takbeerat
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted max-w-xl">
              Share spiritual joy and authentic Eid-ul-Fitr and Eid-ul-Adha greetings with relatives across the globe. Free downloadable and interactive cards.
            </p>
          </div>
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-dark hover:underline"
          >
            Open Eid Studio <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eidTemplates.slice(0, 4).map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-2xl glass border border-gold/25 overflow-hidden flex flex-col justify-between group hover:shadow-palace-glow transition-all"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory-sandstone">
                <Image
                  src={tpl.image}
                  alt={tpl.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 text-center">
                  <p className="font-arabic text-lg text-amber-100 font-bold">
                    {tpl.arabicCalligraphy}
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gold">
                    {tpl.subcategory}
                  </span>
                  <h4 className="font-display font-bold text-sm text-espresso line-clamp-1">
                    {tpl.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gold/15">
                  <span className="font-display font-bold text-sm text-espresso">
                    {tpl.price === 0 ? "FREE" : `₹${tpl.price.toLocaleString("en-IN")}`}
                  </span>
                  <Link
                    href={`/studio?template=${tpl.id}`}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-gold-gradient shadow-sm hover:scale-105 transition-all"
                  >
                    Customize
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RamadanSpecialSection() {
  const ramadanTemplates = templates.filter(
    (t) =>
      t.mainCategory === "Islamic Festival Cards" &&
      (t.subcategory.includes("Ramadan") || t.subcategory.includes("Sehri"))
  );

  return (
    <section className="section-py relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden">
      {/* Background Starry Glow */}
      <div className="absolute inset-0 islamic-emerald-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold-light flex items-center justify-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-gold-bright" />
            Holy Month Collection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Ramadan Kareem & Iftar Dawat Suites
          </h2>
          <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed">
            Welcome the month of the Holy Quran. Elegant invitations for community Iftar gatherings, family Suhoor fellowship, and Quran completion majlis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ramadanTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-3xl glass-emerald border border-gold/30 p-6 flex flex-col justify-between space-y-4 hover:border-gold transition-all"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                  {tpl.subcategory}
                </span>
                <p className="font-arabic text-2xl text-amber-100 font-bold">
                  {tpl.arabicCalligraphy}
                </p>
                <h3 className="font-display text-xl font-bold text-white">
                  {tpl.title}
                </h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
                <div>
                  <span className="font-display text-lg font-bold text-gold-light">
                    {tpl.price === 0 ? "FREE GREETING" : `₹${tpl.price.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <Link
                  href={`/studio?template=${tpl.id}`}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-espresso bg-gold-light hover:bg-gold-bright transition-all"
                >
                  Personalize
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomerTestimonials() {
  const reviews = [
    {
      name: "Dr. Farhan & Aaliyah Siddiqui",
      location: "London, United Kingdom",
      occasion: "Nikah & Walima Suite",
      quote:
        "Our families in the UK and overseas in Pakistan were blown away by the candlelit 3D archway! The authentic Bismillah calligraphy and WhatsApp RSVP tracker made managing 450 guests effortless without spreadsheets.",
      rating: 5,
    },
    {
      name: "Tariq & Fatima Al-Mansoor",
      location: "Dubai, United Arab Emirates",
      occasion: "Moroccan Cartouche Royal Invite",
      quote:
        "The modesty and elegance was unmatched. Having the option for traditional Duff music while keeping it muted by default was so thoughtful. Every elder praised the Arabic calligraphy.",
      rating: 5,
    },
    {
      name: "Zainab & Hamza Qureshi",
      location: "Toronto, Canada",
      occasion: "Emerald Noor Engagement & Nikah",
      quote:
        "The 1-tap Google Maps directions saved our guests on the wedding day. We received our personalized link within 24 hours, and being able to download high-res PNGs for WhatsApp status was fantastic!",
      rating: 5,
    },
  ];

  return (
    <section className="section-py relative bg-ivory-cream/70 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold-dark">
            Barakah & Blessings
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso">
            Loved by Muslim Couples Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-espresso-muted">
            Read heartfelt testimonials from couples and families who celebrated their life milestones with Noor Al-Aqd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass border border-gold/25 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gold/30" />
                <p className="text-xs sm:text-sm text-espresso-light leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gold/15">
                <p className="font-display font-bold text-espresso text-base">{rev.name}</p>
                <div className="flex justify-between items-center text-[11px] text-espresso-muted mt-0.5">
                  <span>{rev.location}</span>
                  <span className="text-emerald-800 font-semibold">{rev.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
