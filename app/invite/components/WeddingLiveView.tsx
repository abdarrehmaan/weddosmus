"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
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
  ChevronRight,
  Languages,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Template } from "@/app/data/templates";
import { weddingAudio } from "@/app/invite/synthAudio";
import { ResolvedThemeStyles } from "../lib/resolveTemplate";

type LangKey = "en" | "ar" | "ur";

export interface WeddingLiveViewProps {
  template: Template;
  theme: ResolvedThemeStyles;
  initialGuestName?: string;
}

export default function WeddingLiveView({
  template,
  theme,
  initialGuestName = "",
}: WeddingLiveViewProps) {
  const [lang, setLang] = useState<LangKey>("en");
  const isRTL = lang === "ar" || lang === "ur";

  // Guest name from URL
  const [guestName, setGuestName] = useState<string>(initialGuestName);

  // Envelope Interactive State
  const [isOpened, setIsOpened] = useState(false);
  const [isFlapOpening, setIsFlapOpening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Active Event Tab
  const [activeTab, setActiveTab] = useState<"ceremony" | "reception">("ceremony");

  // RSVP Form States
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [dietary, setDietary] = useState<string>("halal");
  const [wishes, setWishes] = useState<string>("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);

  // Host Sharing Tool State
  const [shareGuestInput, setShareGuestInput] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Live Countdown State
  const [countdown, setCountdown] = useState({
    days: "28",
    hours: "14",
    minutes: "35",
    seconds: "20",
  });

  // Dynamic Couple Details
  const groom = template.sampleGroom || "Yassine Al-Mansoor";
  const bride = template.sampleBride || "Fatima Az-Zahra";
  const arabicGroom = template.sampleArabicGroom || "ياسين المنصور";
  const arabicBride = template.sampleArabicBride || "فاطمة الزهراء";
  const eventTitle = template.sampleEvent || "Sacred Nikah & Grand Walima";
  const eventDate = template.sampleDate || "Saturday, November 28, 2026";
  const hijriDate = template.sampleHijriDate || "18 Jumada al-Awwal 1448 AH";
  const venue = template.sampleVenue || "The Royal Noor Palace Banquet & Courtyard";

  useEffect(() => {
    // Parse target date or fallback to Nov 28, 2026
    const parsedTime = Date.parse(eventDate);
    const targetDate = isNaN(parsedTime)
      ? new Date("2026-11-28T17:00:00").getTime()
      : parsedTime;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

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

  // Handle Envelope Open
  const handleOpenEnvelope = () => {
    weddingAudio.playSealBreak();
    setIsFlapOpening(true);

    setTimeout(() => {
      weddingAudio.start("wedding");
      setIsPlayingAudio(true);
    }, 350);

    setTimeout(() => {
      setIsOpened(true);
    }, 850);
  };

  const handleToggleAudio = () => {
    const state = weddingAudio.toggle("wedding");
    setIsPlayingAudio(state);
  };

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
        ? "Vegetarian"
        : "Special Diet";
    const noteText = wishes.trim() ? `\n\nBlessings: "${wishes}"` : "";

    const message = `*RSVP for ${groom} & ${bride}'s Wedding*\n\n*Guest Name:* ${name}\n*Status:* ${statusText}\n*Headcount:* ${guestCount}\n*Meal:* ${mealText}${noteText}\n\n_Sent via Wedos 3D Royal Invitation_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
    setRsvpSubmitted(true);
  };

  const getPersonalizedUrl = () => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/invite/${template.id}`;
    if (!shareGuestInput.trim()) return base;
    return `${base}?guest=${encodeURIComponent(shareGuestInput.trim())}`;
  };

  const handleShareToWhatsApp = () => {
    const targetUrl = getPersonalizedUrl();
    const guestLabel = shareGuestInput.trim() || "our honored guest";
    const text = `Assalamu Alaikum *${guestLabel}*,\n\nYou are cordially invited to celebrate the ${eventTitle} of *${groom} & ${bride}*.\n\nPlease tap to open your bespoke 3D royal invitation:\n${targetUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    const targetUrl = getPersonalizedUrl();
    navigator.clipboard.writeText(targetUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`min-h-screen ${theme.bodyBg} ${theme.textPrimary} selection:bg-amber-400/30 selection:text-white ${
        isRTL ? "font-serif" : "font-sans"
      } relative overflow-x-hidden`}
    >
      {/* Background Ambience from Template Image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Image
          src={template.image || "/royal-archway.jpg"}
          alt={template.title}
          fill
          priority
          className="object-cover object-center opacity-25 blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080312]/90 via-[#10061e]/85 to-[#05010b]/95" />
      </div>

      {/* Floating Sparkles & Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[130px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STEP 1: 3D UNBOXING & ANIMATED ENVELOPE
         ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-radial from-[#1A0A26] via-[#0E0517] to-[#040108]"
          >
            {/* Top Wedos Brand Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-xs tracking-widest uppercase text-amber-200/80 font-sans">
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/5 py-1 px-3 rounded-full border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wedos Showcase</span>
              </Link>
              <span className="hidden sm:inline text-amber-400">• {template.title}</span>
            </div>

            {/* Language Switcher */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full p-1 border border-amber-300/20 text-xs">
              {(["en", "ar", "ur"] as LangKey[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full uppercase transition-all ${
                    lang === l
                      ? "bg-amber-400 text-stone-900 font-bold shadow-md"
                      : "text-amber-100/70 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Guest Personalization Header */}
            {guestName && (
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-center"
              >
                <span className="text-xs uppercase tracking-widest text-amber-300/80 block">
                  Specially Prepared For
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-amber-100 font-bold tracking-wide mt-1">
                  {guestName}
                </h3>
              </motion.div>
            )}

            {/* 3D Luxury Envelope Container */}
            <div className="relative w-full max-w-[390px] aspect-[4/3] perspective-1000">
              {/* Envelope Body */}
              <motion.div
                className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${theme.envelopeOuter} border border-amber-400/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 overflow-hidden`}
                animate={isFlapOpening ? { rotateX: 6 } : { rotateX: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Damask Background Pattern */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.4) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Top Corner Filigree */}
                <div className="flex justify-between items-center text-amber-400/60 text-xs font-serif z-10">
                  <span>✦ ﷽ ✦</span>
                  <span className="text-[10px] uppercase tracking-widest text-amber-200/60">
                    {template.subcategory || "Royal Nikah"}
                  </span>
                </div>

                {/* Center Foil Stamp Calligraphy */}
                <div className="text-center z-10 my-auto">
                  <p className="font-arabic text-3xl sm:text-4xl text-amber-200 drop-shadow-md leading-relaxed">
                    {template.arabicCalligraphy || "بَارَكَ ٱللَّٰهُ لَكُمَا"}
                  </p>
                  <p className="font-display text-xl sm:text-2xl text-amber-100 tracking-wider font-semibold mt-1">
                    {groom} & {bride}
                  </p>
                  <p className="text-xs text-amber-300/70 tracking-widest uppercase mt-0.5">
                    {hijriDate}
                  </p>
                </div>

                {/* Bottom Wax Seal Anchor Area */}
                <div className="relative z-20 flex flex-col items-center pb-2">
                  <motion.button
                    onClick={handleOpenEnvelope}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative group cursor-pointer flex items-center justify-center"
                    aria-label="Break Wax Seal to Open Invitation"
                  >
                    {/* Concentric Pulse Rings */}
                    <div className="absolute w-24 h-24 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />
                    <div className="absolute w-20 h-20 rounded-full border border-amber-400/60 animate-pulse pointer-events-none" />

                    {/* Wax Seal Medallion */}
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${theme.sealGradient} border-2 ${theme.sealBorder} ${theme.sealShadow} flex flex-col items-center justify-center text-stone-900 group-hover:brightness-110 transition-all`}
                    >
                      <span className="font-arabic text-xl font-bold text-stone-900 leading-none">
                        بارك
                      </span>
                      <span className="text-[7px] uppercase tracking-widest font-black text-stone-900/80">
                        OPEN
                      </span>
                    </div>
                  </motion.button>
                  <span className="text-[11px] text-amber-200/80 font-medium tracking-wide mt-3 animate-pulse">
                    Tap the Wax Seal to Open
                  </span>
                </div>

                {/* Animated Flap */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b ${theme.envelopeFlap} border-b border-amber-400/40 origin-top z-30`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                  animate={
                    isFlapOpening
                      ? { rotateX: -160, opacity: 0 }
                      : { rotateX: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </div>

            <p className="mt-8 text-xs text-amber-200/60 tracking-wider text-center max-w-xs">
              Includes procedural Duff & Oud sound, interactive RSVP, and calendar syncing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          STEP 2: FULL MULTI-SECTION WEDDING EXPERIENCE
         ═══════════════════════════════════════════════════════════ */}
      {isOpened && (
        <main className="relative z-10 max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-12">
          {/* Top Floating Glass Utility Bar */}
          <header className="sticky top-4 z-40 flex items-center justify-between p-3 rounded-full bg-stone-950/70 backdrop-blur-xl border border-amber-400/25 shadow-xl text-xs">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold transition-colors px-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Wedos Catalog</span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                onClick={handleToggleAudio}
                className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 hover:bg-amber-400/25 transition-all cursor-pointer font-medium"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Sound On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                    <span>Muted</span>
                  </>
                )}
              </button>

              {/* Language Switch */}
              <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5">
                {(["en", "ar", "ur"] as LangKey[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2 py-0.5 rounded-full uppercase text-[10px] font-bold ${
                      lang === l
                        ? "bg-amber-400 text-stone-950"
                        : "text-amber-200/70 hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Section 1: Grand Royal Archway Hero */}
          <section className="text-center space-y-5 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              {/* Bismillah Header */}
              <p className="font-arabic text-2xl sm:text-3xl text-amber-300 drop-shadow">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
              <p className="text-xs uppercase tracking-widest text-amber-200/70">
                Together with their families
              </p>
            </motion.div>

            {/* Couple Typography */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={`p-8 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-2xl relative overflow-hidden`}
            >
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-3 left-3 text-amber-400/40 text-xs">✦</div>
              <div className="absolute top-3 right-3 text-amber-400/40 text-xs">✦</div>
              <div className="absolute bottom-3 left-3 text-amber-400/40 text-xs">✦</div>
              <div className="absolute bottom-3 right-3 text-amber-400/40 text-xs">✦</div>

              <div className="space-y-4">
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-amber-100 tracking-wide">
                    {groom}
                  </h1>
                  <p className="font-arabic text-2xl text-amber-300/90 mt-0.5">
                    {arabicGroom}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
                  <span className="font-serif italic text-amber-300 text-lg">&</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
                </div>

                <div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-amber-100 tracking-wide">
                    {bride}
                  </h1>
                  <p className="font-arabic text-2xl text-amber-300/90 mt-0.5">
                    {arabicBride}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed pt-2 max-w-md mx-auto">
                  request the honor of your presence and heartfelt blessings at the celebration of their holy union.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Section 2: Real-time Live Countdown */}
          <section className="text-center space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-amber-300/80 block font-semibold">
              Countdown to Grand Celebration
            </span>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Mins", value: countdown.minutes },
                { label: "Secs", value: countdown.seconds },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-black/40 border border-amber-400/20 backdrop-blur-md"
                >
                  <span className="font-display text-2xl sm:text-3xl font-bold text-amber-200 block">
                    {item.value}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-amber-400/70">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-200/60">{eventDate} • {hijriDate}</p>
          </section>

          {/* Section 3: Ceremony & Events Schedule */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-amber-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Ceremony & Events</span>
              </h2>
              <div className="flex gap-1.5 bg-black/40 p-1 rounded-full border border-amber-400/20 text-xs">
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
                  onClick={() => setActiveTab("reception")}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    activeTab === "reception"
                      ? "bg-amber-400 text-stone-950 font-bold"
                      : "text-amber-200/70"
                  }`}
                >
                  Walima
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-xl space-y-4`}>
              {activeTab === "ceremony" ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-amber-100">
                        Solemnization of Nikah
                      </h3>
                      <p className="text-xs text-amber-200/75 mt-0.5">
                        Following the Sunnah of the Prophet Muhammad (ﷺ)
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      Ceremony
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
                      <h3 className="font-display text-lg font-bold text-amber-100">
                        Dawat-e-Walima Banquet
                      </h3>
                      <p className="text-xs text-amber-200/75 mt-0.5">
                        Royal celebratory reception with family & friends
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      Banquet
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

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </section>

          {/* Section 4: Interactive RSVP Modal & Guestbook */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-amber-100 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <span>RSVP & Guest Attendance</span>
            </h2>

            <div className={`p-6 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-xl space-y-4`}>
              {rsvpSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-display text-lg font-bold text-amber-100">
                    JazakAllah Khair!
                  </h3>
                  <p className="text-xs text-amber-200/80">
                    Your attendance confirmation has been recorded. We eagerly look forward to celebrating with you!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Guest Name Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Uncle Tariq & Family"
                      className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Attendance Toggle */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1.5">
                      Will you be attending?
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
                          Total Number of Guests Attending: {guestCount}
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

                      {/* Meal Preference */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1.5">
                          Dietary Preference
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "halal", label: "Halal Feast" },
                            { id: "veg", label: "Vegetarian" },
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

                  {/* Warm Wishes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                      Heartfelt Prayers & Dua for the Couple
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

          {/* Section 5: Host Personalized Link Generator */}
          <section className={`p-6 rounded-3xl bg-black/50 border border-amber-400/25 backdrop-blur-xl space-y-3`}>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <h3 className="font-display text-sm font-bold text-amber-100">
                Share Personalized Invite with Guests
              </h3>
            </div>
            <p className="text-xs text-amber-200/70">
              Type your guest's name below to generate a custom link where their name is engraved on the envelope:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={shareGuestInput}
                onChange={(e) => setShareGuestInput(e.target.value)}
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
              className="w-full py-2 px-3 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-300 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Invite on WhatsApp</span>
            </button>
          </section>

          {/* Footer Branding */}
          <footer className="text-center pt-6 pb-12 text-xs text-amber-200/50 space-y-1">
            <p className="font-serif">بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
            <p>© {new Date().getFullYear()} Wedos Digital Suites • Bespoke 3D Islamic Heirlooms</p>
          </footer>
        </main>
      )}
    </div>
  );
}
