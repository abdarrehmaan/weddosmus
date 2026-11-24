"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  Send,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Baby,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Template } from "@/app/data/templates";
import { weddingAudio } from "@/app/invite/synthAudio";
import { ResolvedThemeStyles } from "../lib/resolveTemplate";

export interface ReligiousLiveViewProps {
  template: Template;
  theme: ResolvedThemeStyles;
  initialGuestName?: string;
}

export default function ReligiousLiveView({
  template,
  theme,
  initialGuestName = "",
}: ReligiousLiveViewProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [guestName, setGuestName] = useState(initialGuestName || "");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [wishes, setWishes] = useState<string>("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Distinguish event type
  const isAqiqah = template.subcategory.toLowerCase().includes("aqiqah");
  const isHajj = template.subcategory.toLowerCase().includes("hajj") || template.subcategory.toLowerCase().includes("umrah");
  const isQuran = template.subcategory.toLowerCase().includes("quran") || template.subcategory.toLowerCase().includes("bismillah");

  // Sample data fallback
  const host = template.sampleGroom || "The Siddiqui Family";
  const honoree = template.sampleBride || "Prince Zayn Al-Din";
  const eventTitle = template.sampleEvent || template.title;
  const eventDate = template.sampleDate || "Sunday, December 6, 2026";
  const venue = template.sampleVenue || "Emerald Hall, Noor Palace";

  const handleOpenCeremony = () => {
    weddingAudio.playSealBreak();
    setTimeout(() => {
      weddingAudio.start("spiritual");
      setIsPlayingAudio(true);
    }, 300);
    setIsOpened(true);
  };

  const handleToggleAudio = () => {
    const state = weddingAudio.toggle("spiritual");
    setIsPlayingAudio(state);
  };

  const handleWhatsAppRSVP = () => {
    const name = guestName.trim() || "Respected Family Guest";
    const status = attendance === "yes" ? `✅ Attending (${guestCount} Guests)` : "❌ Regretfully Declines";
    const msg = `*RSVP for ${eventTitle}*\n\n*Name:* ${name}\n*Status:* ${status}\n*Duas:* ${wishes || "MashaAllah Barakah"}\n\n_Sent via Wedos Religious Suite_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    setRsvpSubmitted(true);
  };

  const getPersonalizedUrl = () => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/invite/${template.id}`;
    if (!guestName.trim()) return base;
    return `${base}?guest=${encodeURIComponent(guestName.trim())}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPersonalizedUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <div className={`min-h-screen ${theme.bodyBg} ${theme.textPrimary} relative overflow-x-hidden selection:bg-amber-400/30 selection:text-white`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Image
          src={template.image || "/royal-archway.jpg"}
          alt={template.title}
          fill
          priority
          className="object-cover object-center opacity-25 blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1512]/95 via-[#060D0B]/85 to-[#020504]/95" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STAGE 1: 3D SACRED MILESTONE MEDALLION
         ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-radial from-[#10241E] via-[#081511] to-[#020605]"
          >
            {/* Top Navigation */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-xs tracking-widest uppercase text-amber-200/80">
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/10 py-1 px-3 rounded-full border border-white/15"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Wedos Showcase</span>
              </Link>
              <span className="hidden sm:inline text-amber-400">• {template.title}</span>
            </div>

            {/* Sacred Card Medallion */}
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#0B2E24] via-[#071F18] to-[#04110D] border border-amber-400/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-7 flex flex-col justify-between items-center text-center overflow-hidden">
              {/* Top Sacred Icon */}
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shadow-lg">
                  {isAqiqah ? (
                    <Baby className="w-7 h-7 text-amber-300" />
                  ) : (
                    <BookOpen className="w-7 h-7 text-amber-300" />
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-bold">
                  {template.subcategory}
                </span>
              </div>

              {/* Center Calligraphy */}
              <div className="relative z-10 space-y-2 my-auto">
                <p className="font-arabic text-3xl sm:text-4xl text-amber-200 leading-snug drop-shadow-md">
                  {template.arabicCalligraphy || "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
                </p>
                <h2 className="font-display text-2xl font-bold text-amber-100">
                  {template.title}
                </h2>
                <p className="text-xs text-amber-200/70 max-w-[270px] mx-auto leading-relaxed">
                  {template.description || "Join us in celebrating this sacred milestone and blessing our gathering with your prayers."}
                </p>
                <p className="text-xs uppercase tracking-widest text-amber-300/90 font-semibold pt-2">
                  Hosted by {host}
                </p>
              </div>

              {/* Tap to Open */}
              <div className="relative z-10 w-full pt-4">
                <motion.button
                  onClick={handleOpenCeremony}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3D78A] to-[#B8860B] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Open Sacred Milestone</span>
                </motion.button>
                <p className="text-[10px] text-amber-200/60 mt-2">
                  Procedural tranquil audio, prayer verses & venue directions
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          STAGE 2: FULL SACRED CEREMONY DETAILS & RSVP
         ═══════════════════════════════════════════════════════════ */}
      {isOpened && (
        <main className="relative z-10 max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-10">
          {/* Header Bar */}
          <header className="sticky top-4 z-40 flex items-center justify-between p-3 rounded-full bg-stone-950/70 backdrop-blur-xl border border-amber-400/30 shadow-xl text-xs">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold transition-colors px-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Wedos Catalog</span>
            </Link>

            <button
              onClick={handleToggleAudio}
              className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 hover:bg-amber-400/25 transition-all cursor-pointer font-medium"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Serene Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span>Muted</span>
                </>
              )}
            </button>
          </header>

          {/* Ceremony Hero */}
          <section className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-2xl relative space-y-4`}
            >
              <p className="font-arabic text-3xl sm:text-4xl text-amber-300 drop-shadow">
                {template.arabicCalligraphy || "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-amber-100">
                {template.title}
              </h1>
              <p className="text-xs uppercase tracking-widest text-amber-300/80">
                {template.subcategory} • In the Grace of Allah
              </p>

              <div className="h-px w-24 mx-auto bg-amber-400/40 my-3" />

              <p className="text-sm text-amber-200/90 leading-relaxed max-w-md mx-auto">
                {host} cordially invite you and your family to join us in prayers, thanksgiving, and dinner reception honoring {honoree}.
              </p>

              <div className="pt-2 text-xs text-amber-300/90">
                <span>{eventDate} • {template.sampleHijriDate || "Jumada al-Awwal 1448 AH"}</span>
              </div>
            </motion.div>
          </section>

          {/* Event Schedule & Venue */}
          <section className="space-y-4">
            <div className={`p-6 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-xl space-y-4`}>
              <h3 className="font-display text-lg font-bold text-amber-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Gathering & Banquet Schedule</span>
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-amber-200/80">
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Program Begins: 06:30 PM • Dinner Banquet: 08:00 PM</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{venue}</span>
                </p>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(venue)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Open in Google Maps GPS</span>
              </a>
            </div>
          </section>

          {/* Simple Family Headcount RSVP */}
          <section className="space-y-4">
            <div className={`p-6 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-xl space-y-4`}>
              <h3 className="font-display text-lg font-bold text-amber-100">
                Family Attendance & Prayers
              </h3>

              {rsvpSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-600/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>JazakAllah Khair! Your attendance has been confirmed.</span>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-amber-300/80 uppercase tracking-wider text-[10px] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Uncle Rashid & Family"
                      className="w-full py-2 px-3 rounded-xl bg-black/40 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendance("yes")}
                      className={`py-2 px-3 rounded-xl font-semibold border ${
                        attendance === "yes"
                          ? "bg-emerald-600/30 border-emerald-400 text-emerald-300"
                          : "bg-black/30 border-white/10 text-stone-400"
                      }`}
                    >
                      ✓ Will Attend
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance("no")}
                      className={`py-2 px-3 rounded-xl font-semibold border ${
                        attendance === "no"
                          ? "bg-rose-600/30 border-rose-400 text-rose-300"
                          : "bg-black/30 border-white/10 text-stone-400"
                      }`}
                    >
                      ✕ Unable to Attend
                    </button>
                  </div>

                  {attendance === "yes" && (
                    <div>
                      <label className="text-amber-200/80 block mb-1">
                        Total Number of Family Members: {guestCount}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full accent-amber-400"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-amber-300/80 uppercase tracking-wider text-[10px] mb-1">
                      Heartfelt Duas & Blessings
                    </label>
                    <textarea
                      rows={2}
                      value={wishes}
                      onChange={(e) => setWishes(e.target.value)}
                      placeholder="Write your prayers..."
                      className="w-full py-2 px-3 rounded-xl bg-black/40 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleWhatsAppRSVP}
                    className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm via WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Share with Family */}
          <section className="p-6 rounded-3xl bg-black/50 border border-amber-400/25 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <h4 className="font-display text-sm font-bold text-amber-100">
                Share Milestone with Relatives
              </h4>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Footer Branding */}
          <footer className="text-center pt-4 pb-10 text-xs text-amber-200/50 space-y-1">
            <p className="font-arabic text-sm text-amber-300/70">مَا شَاءَ ٱللَّٰهُ تَبَارَكَ ٱللَّٰهُ</p>
            <p>© {new Date().getFullYear()} Wedos Religious & Family Milestone Suites</p>
          </footer>
        </main>
      )}
    </div>
  );
}
