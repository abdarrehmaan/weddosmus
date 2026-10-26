"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Music, Heart, ArrowRight, Eye, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Golden Palace Light Particles Canvas ──
function PalaceLightParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Warm golden embers & light motes
    const count = 35;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 0.8,
      dx: (Math.random() - 0.5) * 0.35,
      dy: -(Math.random() * 0.4 + 0.15),
      alpha: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.005 + 0.003,
      fadeIn: Math.random() > 0.5,
      hue: Math.random() > 0.3 ? 42 : 18,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.fadeIn) {
          p.alpha += p.fadeSpeed;
          if (p.alpha >= 0.75) p.fadeIn = false;
        } else {
          p.alpha -= p.fadeSpeed;
          if (p.alpha <= 0.15) p.fadeIn = true;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
}

export default function HeroSection() {
  const triggerSimulator = () => {
    window.dispatchEvent(
      new CustomEvent("openSimulator", {
        detail: {
          id: "royal-palace",
          title: "Royal Noor Palace Archway",
        },
      })
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 md:py-32"
    >
      {/* ── Palace Background with Radiant Sunlight Vignette ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/royal-archway.jpg"
          alt="Royal Palace Archway with Roses and Candle Lanterns"
          fill
          priority
          className="object-cover object-center opacity-30 md:opacity-35 scale-105 filter blur-[0.5px]"
        />
        {/* Soft alabaster and warm amber radial mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/85 to-ivory" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-ivory/90" />
      </div>

      {/* Floating Canvas Particles */}
      <PalaceLightParticles />

      {/* ── Content Grid ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Pill Badge with Archway Thumbnail */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border border-gold/40 text-xs md:text-sm font-medium text-espresso shadow-palace-soft"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-gold/40 shrink-0 relative">
                <Image
                  src="/royal-archway.jpg"
                  alt="Archway"
                  fill
                  className="object-cover"
                />
              </div>
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Royal 3D Palace Archway Invitation Websites</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-espresso leading-[1.12] tracking-tight">
              Turn Your Sacred Union Into a{" "}
              <span className="block mt-2 gold-shimmer-text italic font-normal">
                3D Royal Palace Archway
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-espresso-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Step inside a candlelit Moorish palace corridor with cascading blush roses,
              hanging brass lanterns, levitating 3D wax seals, live countdown, and one-tap Google Maps directions.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/invite/muslimswedd"
                target="_blank"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider group"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Open MuslimsWedd 3D Invite (Live Demo)</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </Link>

              <button
                onClick={triggerSimulator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-espresso glass-strong border border-gold/30 hover:border-gold/60 hover:bg-white hover:scale-105 transition-all duration-300 text-sm tracking-wide shadow-palace-soft cursor-pointer"
              >
                <Eye className="w-4 h-4 text-gold" />
                <span>Test Phone Simulator</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gold/20 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-gold">24 Hours</div>
                <div className="text-xs text-espresso-muted">Express Delivery</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-gold">100%</div>
                <div className="text-xs text-espresso-muted">Mobile & WhatsApp</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-gold">₹0</div>
                <div className="text-xs text-espresso-muted">Hosting Fees</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Smartphone Palace Mockup (Prominently showcasing the archway image!) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center relative"
            style={{ perspective: 1200 }}
          >
            {/* Ambient Palace Glow behind Mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-tr from-amber-300/35 to-blush/35 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* The 3D Floating Phone Frame */}
            <div
              className="relative w-[285px] h-[570px] sm:w-[310px] sm:h-[610px] rounded-[3.2rem] p-3.5 bg-gradient-to-b from-[#F2E8DC] via-[#FAF5ED] to-[#E5D7C2] border-4 border-[#DFC38A] shadow-[0_25px_60px_-15px_rgba(74,53,43,0.3),0_0_40px_rgba(184,139,74,0.3)] animate-float cursor-pointer group"
              onClick={triggerSimulator}
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateY(-10deg) rotateX(6deg)",
              }}
            >
              {/* Phone Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#2C1E18] rounded-full z-40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-espresso-light mr-2" />
                <div className="w-8 h-1 bg-espresso-muted rounded-full" />
              </div>

              {/* Inner Screen Area with Full High-Res Archway Design */}
              <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden flex flex-col justify-between p-5 text-center shadow-inner border border-gold/30">
                {/* HIGH-RES ROYAL ARCHWAY BACKGROUND (Crisp & Glorious) */}
                <Image
                  src="/royal-archway.jpg"
                  alt="Royal Palace Archway Design"
                  fill
                  priority
                  className="object-cover object-center scale-102 group-hover:scale-108 transition-transform duration-700"
                />

                {/* Subtle top and bottom atmospheric gradients so text is readable while arch remains vivid */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/75 z-10" />

                {/* Top Calligraphy & Heading */}
                <div className="relative z-20 pt-6">
                  <div className="text-amber-200 font-serif text-xl font-bold tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-[10px] uppercase tracking-[3px] text-amber-100/90 font-medium mt-1 drop-shadow">
                    Royal Nikah & Walima
                  </div>
                  <div className="font-display text-2xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mt-1">
                    Ahmad & Fatima
                  </div>
                  <div className="text-xs text-rose-200 drop-shadow mt-0.5">
                    ✦ The Sacred Palace Corridor ✦
                  </div>
                </div>

                {/* Center 3D Wax Seal Floating in Archway Corridor */}
                <div className="relative z-20 my-auto py-3">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#A83232] via-[#851E1E] to-[#5C1212] flex flex-col items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.4)] border-2 border-[#DFC38A] group-hover:scale-110 transition-transform">
                    <span className="font-display font-bold text-amber-100 text-lg tracking-wider">
                      A&F
                    </span>
                    <span className="text-[8px] text-amber-200 uppercase tracking-widest">
                      Open
                    </span>
                  </div>
                  <div className="inline-block mt-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-[10px] text-amber-200 font-semibold tracking-wider uppercase">
                    Tap to Open 3D Palace
                  </div>
                </div>

                {/* Bottom Event Badge & Countdown */}
                <div className="relative z-20 space-y-2 pb-2">
                  <div className="grid grid-cols-3 gap-1.5 bg-black/65 backdrop-blur-md p-2 rounded-xl border border-gold/30 text-center text-white">
                    <div>
                      <div className="text-xs font-bold text-amber-300">15</div>
                      <div className="text-[8px] text-amber-100/70 uppercase">Days</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300">08</div>
                      <div className="text-[8px] text-amber-100/70 uppercase">Hours</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300">42</div>
                      <div className="text-[8px] text-amber-100/70 uppercase">Mins</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-100 font-semibold bg-emerald-950/80 backdrop-blur-md py-1.5 rounded-full border border-emerald-500/40">
                    <span>📍 Royal Orchid Banquet Hall</span>
                  </div>
                </div>
              </div>

              {/* ── Levitating Orbiting Glass Cards ── */}
              {/* Card 1: Top Right */}
              <div className="absolute -top-4 -right-10 glass-strong border border-gold/30 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-palace-soft animate-float-slow z-30">
                <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-espresso">Google Maps</div>
                  <div className="text-[9px] text-espresso-muted">1-Tap Live Navigation</div>
                </div>
              </div>

              {/* Card 2: Left Center */}
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 glass-strong border border-gold/30 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-palace-soft animate-float-delay z-30">
                <div className="w-7 h-7 rounded-full bg-blush/20 flex items-center justify-center text-blush-deep">
                  <Music className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-espresso">Duff & Oud Melodies</div>
                  <div className="text-[9px] text-espresso-muted">+ Modest Silent Toggle</div>
                </div>
              </div>

              {/* Card 3: Bottom Right */}
              <div className="absolute -bottom-5 -right-8 glass-strong border border-gold/30 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-palace-soft animate-float z-30">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Heart className="w-3.5 h-3.5 fill-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-espresso">Instant WhatsApp RSVP</div>
                  <div className="text-[9px] text-emerald-700 font-medium">184 Confirmed Guests</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
