"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  CheckCircle2,
  Send,
  ExternalLink,
  ArrowLeft,
  Copy,
  Check,
  ChevronDown,
  Moon,
  Sparkles,
  Baby,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Template } from "@/app/data/templates";
import { weddingAudio, AudioThemeMode } from "@/app/invite/synthAudio";
import { ResolvedThemeStyles } from "@/app/invite/lib/resolveTemplate";
import ScallopedCartoucheSvg from "./ScallopedCartoucheSvg";
import EnvelopeFlapSvg from "./EnvelopeFlapSvg";

export interface RoyalHeirloomEngineProps {
  template: Template;
  theme: ResolvedThemeStyles;
  audioMode: AudioThemeMode;
  initialGuestName?: string;
}

export default function RoyalHeirloomEngine({
  template,
  theme,
  audioMode,
  initialGuestName = "",
}: RoyalHeirloomEngineProps) {
  // Envelope unboxing state
  const [isOpened, setIsOpened] = useState(false);
  const [isFlapOpening, setIsFlapOpening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Guest personalization
  const [guestName, setGuestName] = useState(initialGuestName);
  const [shareInput, setShareInput] = useState(initialGuestName);
  const [copiedLink, setCopiedLink] = useState(false);

  // Active Event Tab (for weddings: Nikah / Walima)
  const [activeTab, setActiveTab] = useState<"ceremony" | "banquet">("ceremony");

  // RSVP Form States
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietary, setDietary] = useState<string>("halal");
  const [wishes, setWishes] = useState<string>("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);

  // Confetti Canvas Ref
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  // Resolved dynamic content
  const groom = template.sampleGroom || "Yassine";
  const bride = template.sampleBride || "Fatima";
  const arabicGroom = template.sampleArabicGroom || "ياسين";
  const arabicBride = template.sampleArabicBride || "فاطمة";
  const arabicSubtitle = template.calligraphyTitle || "حفل زفافنا المبارك";
  const eventDate = template.sampleDate || "Thursday, May 21, 2026";
  const hijriDate = template.sampleHijriDate || "4 Dhu al-Hijjah 1447 AH";
  const venue = template.sampleVenue || "The Royal Noor Palace Banquet & Courtyard";

  // Monogram calculation (e.g. Y • F)
  const groomInitial = groom.trim().charAt(0).toUpperCase() || "Y";
  const brideInitial = bride.trim().charAt(0).toUpperCase() || "F";
  const sealMonogram =
    template.mainCategory === "Islamic Wedding Invitations"
      ? `${groomInitial} • ${brideInitial}`
      : "WEDOS";

  // Seal Arabic Calligraphy
  const sealArabic =
    template.mainCategory === "Islamic Festival Cards"
      ? "عِيد مُبَارَك"
      : template.mainCategory === "Religious & Family Events"
      ? "مَا شَاءَ اللَّهُ"
      : "بَارَكَ اللَّهُ";

  // Category Flags
  const isWedding = template.mainCategory === "Islamic Wedding Invitations";
  const isFestival = template.mainCategory === "Islamic Festival Cards";
  const isReligious = template.mainCategory === "Religious & Family Events";

  // Live Countdown State
  const [countdown, setCountdown] = useState({
    days: "24",
    hours: "08",
    minutes: "42",
    seconds: "15",
  });

  useEffect(() => {
    const parsed = Date.parse(eventDate);
    const target = isNaN(parsed)
      ? new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).getTime()
      : parsed;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpened ? "auto" : "hidden";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, [isOpened]);

  // Unsealing Choreography
  const triggerUnsealing = () => {
    if (isFlapOpening || isOpened) return;

    weddingAudio.playSealBreak();
    setIsFlapOpening(true);

    // Audio start
    setTimeout(() => {
      try {
        weddingAudio.start(audioMode);
        setIsPlayingAudio(true);
      } catch (err) {
        console.log("Audio play blocked", err);
      }
    }, 300);

    // Envelope unmount and hero reveal
    setTimeout(() => {
      setIsOpened(true);
    }, 850);
  };

  const handleToggleAudio = () => {
    const state = weddingAudio.toggle(audioMode);
    setIsPlayingAudio(state);
  };

  // WhatsApp RSVP
  const handleWhatsAppRSVP = () => {
    const name = guestName.trim() || "Respected Guest";
    const statusText =
      attendance === "yes"
        ? `✅ Joyfully Accepts (${guestCount} Guests)`
        : `❌ Regretfully Declines`;
    const mealText =
      dietary === "halal"
        ? "Royal Feast (Halal)"
        : dietary === "veg"
        ? "Pure Vegetarian"
        : "Special Dietary";
    const noteText = wishes.trim() ? `\n\nPrayers & Duas: "${wishes}"` : "";

    const message = `*RSVP Confirmation for ${template.title}*\n\n*Guest Name:* ${name}\n*Status:* ${statusText}\n*Headcount:* ${guestCount}\n*Meal Preference:* ${mealText}${noteText}\n\n_Sent via Wedos Royal Heirloom Experience_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
    setRsvpSubmitted(true);
    triggerConfetti();
  };

  // Confetti Blast Effect
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngle: number;
      tiltAngleIncremental: number;
    }> = [];

    const colors = ["#C59B48", "#E8CA7C", "#DFC38A", "#FFF6BD", "#D4AF37", "#FFFFFF"];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 3,
        d: Math.random() * 40 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      });
    }

    let animationFrameId: number;
    let step = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step++;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(step + p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      }

      if (step < 200) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    draw();
  };

  // Personalized Share Link Generator
  const getPersonalizedUrl = () => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/invite/${template.id}`;
    if (!shareInput.trim()) return base;
    return `${base}?guest=${encodeURIComponent(shareInput.trim())}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPersonalizedUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleShareToWhatsApp = () => {
    const url = getPersonalizedUrl();
    const guestLabel = shareInput.trim() || "our respected guest";
    let msg = "";
    if (isWedding) {
      msg = `Assalamu Alaikum *${guestLabel}*,\n\nYou are cordially invited to celebrate the Nikah & Walima of *${groom} & ${bride}*.\n\nTap to open your bespoke 3D heirloom royal invitation:\n${url}`;
    } else if (isFestival) {
      msg = `✨ *${template.title}* ✨\n\nAssalamu Alaikum *${guestLabel}*,\n\nMay Allah bless you and your family with boundless joy and barakah on this holy occasion.\n\nOpen your 3D festive card:\n${url}`;
    } else {
      msg = `Assalamu Alaikum *${guestLabel}*,\n\nYou are cordially invited to our sacred gathering for *${template.title}*.\n\nOpen your bespoke 3D invitation:\n${url}`;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden font-sans select-none"
      style={{
        backgroundColor: theme.bodyBg,
        color: "#F9F4F0",
      }}
    >
      {/* Canvas for celebratory golden confetti */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />

      {/* Subtle Paper Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* =========================================================================
          STAGE 1: THE 3D INTERACTIVE ENVELOPE (100dvh Locked)
          ========================================================================= */}
      <AnimatePresence>
        {!isOpened && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 w-screen h-[100dvh] z-[1000] flex flex-col items-center justify-between overflow-hidden"
            style={{ backgroundColor: theme.envelopeBg }}
          >
            {/* Top Return to Catalog Pill */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold text-stone-900 bg-white/70 hover:bg-white/95 backdrop-blur-md border border-stone-400/40 shadow-sm transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wedos Showcase</span>
              </Link>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-stone-700 bg-white/40 px-2.5 py-0.5 rounded-full border border-stone-300/40">
                {template.title}
              </span>
            </div>

            {/* Top Envelope Triangular Flap */}
            <div className="absolute top-0 left-0 right-0 h-[48vh] max-h-[460px] overflow-visible z-[2] drop-shadow-[0_18px_24px_rgba(45,29,20,0.25)]">
              <EnvelopeFlapSvg
                stopColor0={theme.flap0}
                stopColor60={theme.flap60}
                stopColor100={theme.flap100}
                strokeColor={theme.flapStroke}
              />
            </div>

            {/* Envelope Lower Body Background */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background: theme.envelopeBodyGradient,
                borderBottom: `2px solid rgba(197, 155, 72, 0.2)`,
              }}
            >
              {/* Arabesque watermark pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 155, 72, 0.4) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Guest Personalization Header (if provided) */}
            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-20 mt-16 text-center px-4"
              >
                <span className="text-[10px] uppercase tracking-widest text-stone-600 font-bold block">
                  Specially Prepared For
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-bold tracking-wide mt-0.5">
                  {guestName}
                </h3>
              </motion.div>
            )}

            {/* Centerpiece 3D Wax Seal Button */}
            <div
              onClick={triggerUnsealing}
              className="absolute top-[48vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] cursor-pointer flex items-center justify-center select-none perspective-[1000px] touch-manipulation group"
              role="button"
              tabIndex={0}
              aria-label="Tap to open the royal invitation"
            >
              {/* Concentric Pulsing Shockwave Rings */}
              {!isFlapOpening && (
                <div className="absolute w-[130px] h-[130px] rounded-full pointer-events-none z-[1] flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border-[1.5px] border-white/70 animate-ping opacity-60" />
                  <span className="absolute inset-[-15px] rounded-full border border-amber-300/50 animate-pulse opacity-40" />
                </div>
              )}

              {/* The 3D Wax Seal Disc */}
              <motion.div
                animate={
                  isFlapOpening
                    ? { scale: 0.94, opacity: 0.85 }
                    : { scale: 1, opacity: 1 }
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-[102px] h-[102px] rounded-full flex items-center justify-center transition-transform duration-300"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${theme.sealBronzeLight} 0%, ${theme.sealBronze} 55%, ${theme.sealBronzeDark} 100%)`,
                  boxShadow: `inset 0 3px 6px rgba(255, 255, 255, 0.22), inset 0 -4px 7px rgba(0, 0, 0, 0.6), 0 12px 28px rgba(35, 20, 12, 0.48), 0 2px 6px rgba(0, 0, 0, 0.3)`,
                }}
              >
                {/* Organic Scalloped Edge */}
                <div
                  className="absolute -inset-[6px] rounded-full pointer-events-none border-[4px] border-dashed"
                  style={{
                    borderColor: theme.sealBorderDash,
                    boxShadow: `inset 0 2px 4px rgba(255, 230, 180, 0.15), 0 0 10px rgba(0, 0, 0, 0.25)`,
                  }}
                />

                {/* Inner Gold Bezel */}
                <div className="absolute inset-[5px] rounded-full border border-amber-200/25 pointer-events-none shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]" />

                {/* Engraved Calligraphy & Monogram Artwork */}
                <div className="relative z-[2] w-[80px] h-[80px] flex flex-col items-center justify-center text-center">
                  <span
                    className="font-arabic text-xl sm:text-[1.35rem] font-bold leading-none tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    style={{ color: theme.sealArabicColor }}
                  >
                    {sealArabic}
                  </span>
                  <span
                    className="font-serif text-[10px] tracking-[0.2em] uppercase font-bold mt-1 drop-shadow"
                    style={{ color: theme.sealMonogramColor }}
                  >
                    {sealMonogram}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Invitation Prompt */}
            <div className="relative z-[2] mb-10 text-center px-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-700/60" />
                <span className="text-amber-800 text-sm">✦</span>
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-700/60" />
              </div>
              <h2 className="font-serif text-sm sm:text-base font-bold tracking-[0.22em] uppercase text-stone-900 mb-1">
                You Are Cordially Invited
              </h2>
              <p className="text-[11px] tracking-[0.24em] uppercase text-stone-600 font-semibold">
                Touch the golden wax seal to unseal
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* =========================================================================
          STAGE 2: ROYAL ISLAMIC SCALLOPED OGEE CARTOUCHE CARD (HERO REVEAL)
          ========================================================================= */}
      <div className="relative w-full min-h-screen flex flex-col items-center">
          {/* Top Floating Glass Utility Bar */}
          <header className="sticky top-3 z-50 w-full max-w-lg px-4 flex items-center justify-between py-2 px-3 rounded-full bg-stone-900/80 backdrop-blur-xl border border-amber-400/30 shadow-2xl text-xs mt-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-semibold text-amber-300 hover:text-white transition-colors py-1 px-2 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Wedos Catalog</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 hover:bg-amber-400/30 transition-all font-medium cursor-pointer"
                title="Wedding Nasheed | Muhammad Al Muqit"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Nasheed On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                    <span>Nasheed Off</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Hero Reveal Stage with Palace Background */}
          <div
            className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
            style={{
              backgroundColor: theme.bodyBg,
            }}
          >
            {/* Background Image Overlay with Theme Tint */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <Image
                src={template.image || "/wedding-hero-bg.jpg"}
                alt={template.title}
                fill
                priority
                className="object-cover object-center scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: theme.heroBgOverlay }}
              />
            </div>

            {/* Seamless Bottom Fade Mask */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[5]"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, ${theme.bodyBg} 100%)`,
              }}
            />

            {/* ── THE ROYAL SCALLOPED CARTOUCHE CARD ── */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[470px] aspect-[600/880] max-h-[min(88dvh,740px)] min-h-[520px] mx-auto z-10 flex flex-col items-center justify-center p-0 box-border"
            >
              {/* Mathematical SVG Scalloped Ogee Arch with Floral Vine Tracery */}
              <ScallopedCartoucheSvg
                parchmentStart={theme.cartoucheParchmentStart}
                parchmentMid={theme.cartoucheParchmentMid}
                parchmentEnd={theme.cartoucheParchmentEnd}
                filigreeColor={theme.cartoucheFiligree}
                filigreeStart={theme.cartoucheFiligreeLight}
                filigreeEnd={theme.cartoucheFiligreeDark}
              />

              {/* Staggered Typography Inside the Cartouche Frame */}
              <div className="relative z-10 flex flex-col items-center justify-between h-full w-full py-12 sm:py-14 px-8 text-center box-border">
                {/* Header Block: Bismillah & Invitation Pre-Text */}
                <div className="flex flex-col items-center gap-3 w-full">
                  <h1
                    className="font-arabic text-xl sm:text-2xl font-bold leading-tight"
                    style={{ color: theme.bismillahColor }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </h1>
                  <p
                    className="font-serif tracking-[0.22em] text-[10px] sm:text-xs font-semibold uppercase leading-relaxed max-w-[240px]"
                    style={{ color: theme.subtextColor }}
                  >
                    {isWedding
                      ? "TOGETHER WITH THEIR FAMILIES, INVITE YOU TO CELEBRATE"
                      : isFestival
                      ? "WARMEST WISHES OF PEACE, JOY & BARAKAH"
                      : "IN GRATITUDE TO ALLAH, INVITING YOU TO SHARE OUR JOY"}
                  </p>
                </div>

                {/* Centerpiece Block: Grand Couple / Event Names */}
                <div className="flex flex-col items-center my-auto w-full space-y-1">
                  {isWedding ? (
                    <div className="flex flex-col items-center">
                      <span
                        className="font-serif text-3xl sm:text-4xl font-bold tracking-wide"
                        style={{ color: theme.namesColor }}
                      >
                        {groom}
                      </span>
                      <span
                        className="font-serif italic text-lg sm:text-xl my-0.5"
                        style={{ color: theme.accentGold }}
                      >
                        &
                      </span>
                      <span
                        className="font-serif text-3xl sm:text-4xl font-bold tracking-wide"
                        style={{ color: theme.namesColor }}
                      >
                        {bride}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span
                        className="font-serif text-2xl sm:text-3xl font-bold tracking-wide"
                        style={{ color: theme.namesColor }}
                      >
                        {template.title}
                      </span>
                      {groom && (
                        <span
                          className="font-serif text-xs uppercase tracking-widest mt-1 font-semibold"
                          style={{ color: theme.subtextColor }}
                        >
                          Hosted by {groom}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Arabic Subtitle */}
                  <p
                    className="font-arabic text-xl sm:text-2xl pt-2 font-bold"
                    style={{ color: theme.accentGold }}
                  >
                    {template.arabicCalligraphy || arabicSubtitle}
                  </p>
                </div>

                {/* Footer Block: Divider + Date + Floral Flourish */}
                <div className="flex flex-col items-center w-full gap-2">
                  <div
                    className="w-36 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${theme.cartoucheFiligree}, transparent)`,
                    }}
                  />
                  <div
                    className="font-serif text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase"
                    style={{ color: theme.dateColor }}
                  >
                    {eventDate.toUpperCase()}
                  </div>
                  <div
                    className="font-arabic text-[11px] tracking-wider"
                    style={{ color: theme.subtextColor }}
                  >
                    {hijriDate}
                  </div>

                  {/* SVG Flourish Ornament */}
                  <svg
                    className="mt-1"
                    viewBox="0 0 120 18"
                    width="76"
                    height="12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 60 9 C 50 9 45 4 35 4 C 25 4 20 12 10 12 C 4 12 0 9 0 9"
                      stroke={theme.cartoucheFiligree}
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 60 9 C 70 9 75 4 85 4 C 95 4 100 12 110 12 C 116 12 120 9 120 9"
                      stroke={theme.cartoucheFiligree}
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <circle cx="60" cy="9" r="2.2" fill={theme.cartoucheFiligreeLight} />
                    <circle cx="35" cy="4" r="1.3" fill={theme.cartoucheFiligreeLight} />
                    <circle cx="85" cy="4" r="1.3" fill={theme.cartoucheFiligreeLight} />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Scroll Indicator Prompt */}
            <div className="relative z-10 mt-6 flex flex-col items-center gap-1 text-xs tracking-widest uppercase text-amber-200/80 animate-bounce">
              <span>Scroll to Explore</span>
              <ChevronDown className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {/* =========================================================================
              STAGE 3: STREAMLINED LUXURY SECTIONS (BELOW THE FOLD)
              ========================================================================= */}
          <main className="relative z-10 w-full max-w-xl mx-auto px-4 py-12 space-y-12">
            {/* SECTION 1: GLASSMORPHIC LIVE COUNTDOWN */}
            <section className="text-center space-y-3 p-6 rounded-3xl bg-black/40 border border-amber-400/25 backdrop-blur-xl shadow-xl">
              <span className="text-[11px] uppercase tracking-widest text-amber-300/80 font-bold block">
                {isFestival ? "العد التنازلي • Countdown to Blessed Day" : "العد التنازلي • Countdown to Celebration"}
              </span>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto pt-2">
                {[
                  { labelEn: "Days", labelAr: "أيام", value: countdown.days },
                  { labelEn: "Hours", labelAr: "ساعات", value: countdown.hours },
                  { labelEn: "Mins", labelAr: "دقائق", value: countdown.minutes },
                  { labelEn: "Secs", labelAr: "ثوانٍ", value: countdown.seconds },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white/5 border border-amber-400/20 backdrop-blur-md"
                  >
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 block">
                      {item.value}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-amber-400/80 font-medium block">
                      {item.labelEn}
                    </span>
                    <span className="font-arabic text-[9px] text-amber-300/60 block">
                      {item.labelAr}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 2: CEREMONY TIMELINE & VENUE (Category Adaptive) */}
            {isWedding ? (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-amber-100 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <span>مراسم الحفل • Ceremony & Events</span>
                  </h3>
                  <div className="flex gap-1 bg-black/40 p-1 rounded-full border border-amber-400/20 text-xs">
                    <button
                      onClick={() => setActiveTab("ceremony")}
                      className={`px-3 py-1 rounded-full font-medium transition-all ${
                        activeTab === "ceremony"
                          ? "bg-amber-400 text-stone-950 font-bold"
                          : "text-amber-200/70"
                      }`}
                    >
                      Nikah
                    </button>
                    <button
                      onClick={() => setActiveTab("banquet")}
                      className={`px-3 py-1 rounded-full font-medium transition-all ${
                        activeTab === "banquet"
                          ? "bg-amber-400 text-stone-950 font-bold"
                          : "text-amber-200/70"
                      }`}
                    >
                      Walima
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-black/45 border border-amber-400/30 backdrop-blur-xl shadow-xl space-y-4">
                  {activeTab === "ceremony" ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-amber-100">
                            عقد القران المبارك • Nikah Ceremony
                          </h4>
                          <p className="text-xs text-amber-200/75 mt-0.5">
                            Following the Sunnah of Prophet Muhammad (ﷺ)
                          </p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Nikah
                        </span>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm text-amber-200/80 pt-2 border-t border-amber-400/15">
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>11:30 AM • Friday, November 27, 2026</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{venue}</span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-amber-100">
                            حفل الوليمة الملكية • Dawat-e-Walima
                          </h4>
                          <p className="text-xs text-amber-200/75 mt-0.5">
                            Grand celebratory banquet with beloved family & friends
                          </p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Walima
                        </span>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm text-amber-200/80 pt-2 border-t border-amber-400/15">
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>07:30 PM • Saturday, November 28, 2026</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{venue}</span>
                        </p>
                      </div>
                    </>
                  )}

                  <div className="pt-2 flex gap-2">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(venue)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open in Google Maps GPS</span>
                    </a>
                  </div>
                </div>
              </section>
            ) : (
              <section className="space-y-4">
                <div className="p-6 rounded-3xl bg-black/45 border border-amber-400/30 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{template.subcategory || "Event Schedule"}</span>
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      Gathering
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-amber-200/80 pt-2 border-t border-amber-400/15">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{venue}</span>
                    </p>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(venue)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>Get GPS Directions</span>
                  </a>
                </div>
              </section>
            )}

            {/* SECTION 3: QURANIC BLESSING / SACRED DUA */}
            <section className="p-8 rounded-3xl bg-black/40 border border-amber-400/25 backdrop-blur-xl text-center space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-bold block">
                ✦ Ayah of Barakah ✦
              </span>
              <p className="font-arabic text-2xl sm:text-3xl text-amber-200 leading-relaxed">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>
              <p className="text-xs sm:text-sm text-amber-200/80 italic max-w-md mx-auto leading-relaxed">
                "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them; and He placed between you love and mercy."
              </p>
              <span className="text-[10px] uppercase tracking-widest text-amber-400/70 font-semibold block">
                Surah Ar-Rum (30:21)
              </span>
            </section>

            {/* SECTION 4: INTERACTIVE RSVP & GUESTBOOK */}
            <section className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-amber-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <span>تأكيد الحضور • RSVP & Attendance Confirmation</span>
              </h3>

              <div className="p-6 rounded-3xl bg-black/45 border border-amber-400/30 backdrop-blur-xl shadow-xl space-y-4">
                {rsvpSubmitted ? (
                  <div className="text-center py-6 space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-amber-100">
                      JazakAllah Khair!
                    </h4>
                    <p className="text-xs text-amber-200/80">
                      Your response has been graciously recorded. We look forward to welcoming you!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-xs sm:text-sm">
                    {/* Guest Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                        Your Respected Name
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Dr. & Mrs. Farooqi"
                        className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Attendance Toggle */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1.5">
                        Will you honor us with your presence?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAttendance("yes")}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            attendance === "yes"
                              ? "bg-emerald-600/30 border-emerald-400 text-emerald-300"
                              : "bg-black/30 border-white/10 text-stone-400 hover:text-white"
                          }`}
                        >
                          ✓ Joyfully Accepts
                        </button>
                        <button
                          type="button"
                          onClick={() => setAttendance("no")}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            attendance === "no"
                              ? "bg-rose-600/30 border-rose-400 text-rose-300"
                              : "bg-black/30 border-white/10 text-stone-400 hover:text-white"
                          }`}
                        >
                          ✕ Regretfully Declines
                        </button>
                      </div>
                    </div>

                    {attendance === "yes" && (
                      <>
                        {/* Guest Count */}
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                            Number of Guests Attending: {guestCount}
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            className="w-full accent-amber-400"
                          />
                        </div>

                        {/* Dietary Choices */}
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1.5">
                            Meal Preference
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "halal", label: "Mughlai Feast (Halal)" },
                              { id: "veg", label: "Pure Vegetarian" },
                              { id: "special", label: "Special Diet" },
                            ].map((m) => (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => setDietary(m.id)}
                                className={`py-1.5 px-2 rounded-lg border text-[11px] font-medium transition-all ${
                                  dietary === m.id
                                    ? "bg-amber-400 text-stone-950 font-bold border-amber-300"
                                    : "bg-black/30 border-white/10 text-amber-200/70"
                                }`}
                              >
                                {m.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Warm Duas */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                        Prayers & Warm Duas
                      </label>
                      <textarea
                        rows={2}
                        value={wishes}
                        onChange={(e) => setWishes(e.target.value)}
                        placeholder="Write your heartfelt prayers..."
                        className="w-full py-2 px-3 rounded-xl bg-black/40 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      onClick={handleWhatsAppRSVP}
                      className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit & Confirm via WhatsApp</span>
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 5: HOST PERSONALIZED SHARE LINK GENERATOR */}
            <section className="p-6 rounded-3xl bg-black/50 border border-amber-400/25 backdrop-blur-xl space-y-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-400" />
                <h4 className="font-serif text-sm font-bold text-amber-100">
                  Share Personalized Invitation with Guests
                </h4>
              </div>
              <p className="text-xs text-amber-200/70">
                Type the guest name below to engrave their name on the 3D envelope when opened:
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareInput}
                  onChange={(e) => setShareInput(e.target.value)}
                  placeholder="e.g. Uncle Tariq & Family"
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 text-xs focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="py-2 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleShareToWhatsApp}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-300 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>
            </section>

            {/* Footer */}
            <footer className="text-center pt-6 pb-12 text-xs text-amber-200/50 space-y-1">
              <p className="font-arabic text-sm text-amber-300/60">بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
              <p>© {new Date().getFullYear()} Wedos 3D Royal Heirloom Digital Invitations</p>
            </footer>
          </main>
        </div>
    </div>
  );
}
