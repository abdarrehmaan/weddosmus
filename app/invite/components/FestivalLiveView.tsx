"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Moon,
  Send,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Clock,
  MapPin,
  Heart,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Template } from "@/app/data/templates";
import { weddingAudio } from "@/app/invite/synthAudio";
import { ResolvedThemeStyles } from "../lib/resolveTemplate";

export interface FestivalLiveViewProps {
  template: Template;
  theme: ResolvedThemeStyles;
  initialGuestName?: string;
}

export default function FestivalLiveView({
  template,
  theme,
  initialGuestName = "",
}: FestivalLiveViewProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [senderName, setSenderName] = useState(template.sampleGroom || "The Farooqi Family");
  const [recipientName, setRecipientName] = useState(initialGuestName || "");
  const [copiedLink, setCopiedLink] = useState(false);

  // If this is an Iftar or Suhoor meal gathering
  const isMealEvent =
    template.subcategory.includes("Iftar") ||
    template.subcategory.includes("Sehri") ||
    template.subcategory.includes("Gathering");

  // Iftar RSVP state
  const [iftarAttendance, setIftarAttendance] = useState<"yes" | "no">("yes");
  const [iftarGuests, setIftarGuests] = useState<number>(2);
  const [iftarSubmitted, setIftarSubmitted] = useState<boolean>(false);

  // Countdown state
  const [countdown, setCountdown] = useState({
    hours: "04",
    minutes: "28",
    seconds: "45",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Target 6:30 PM (Maghrib / Iftar)
      const target = new Date();
      target.setHours(18, 30, 0);
      let diff = target.getTime() - now.getTime();
      if (diff < 0) diff += 24 * 60 * 60 * 1000;

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenCard = () => {
    weddingAudio.playSealBreak();
    setTimeout(() => {
      weddingAudio.start("festival");
      setIsPlayingAudio(true);
    }, 300);
    setIsOpened(true);
  };

  const handleToggleAudio = () => {
    const state = weddingAudio.toggle("festival");
    setIsPlayingAudio(state);
  };

  const getPersonalizedUrl = () => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/invite/${template.id}`;
    const params = new URLSearchParams();
    if (recipientName.trim()) params.set("guest", recipientName.trim());
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getPersonalizedUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleShareGreetingWhatsApp = () => {
    const url = getPersonalizedUrl();
    const to = recipientName.trim() ? `*${recipientName.trim()}*` : "You & your Family";
    const title = template.calligraphyTitle || "Eid Mubarak";
    const msg = `✨ *${title}* ✨\n\nAssalamu Alaikum ${to},\n\nMay Allah shower His infinite mercy, barakah, and happiness upon you and your loved ones on this blessed occasion.\n\nWarmest wishes from *${senderName}*.\n\nTap to open your personalized interactive 3D greeting card:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleIftarWhatsAppRSVP = () => {
    const msg = `*RSVP for ${template.title}*\n\n*Name:* ${recipientName.trim() || "Guest"}\n*Status:* ${iftarAttendance === "yes" ? "✅ Joyfully Attending" : "❌ Unable to Attend"}\n*Headcount:* ${iftarGuests} guests\n\n_Sent via Wedos Festive Suite_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    setIftarSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${theme.bodyBg} ${theme.textPrimary} relative overflow-x-hidden selection:bg-amber-400/30 selection:text-white`}>
      {/* Background Celestial Starlight Ambiance */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Image
          src={template.image || "/wedding-hero-bg.jpg"}
          alt={template.title}
          fill
          priority
          className="object-cover object-center opacity-30 blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050C1A]/95 via-[#0A162B]/85 to-[#03070E]/95" />
      </div>

      {/* Floating Crescent & Lantern Decorative Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-amber-400/10 blur-[90px]" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STAGE 1: 3D FESTIVE CARD COVER (Crescent & Fanous Lanterns)
         ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-radial from-[#0C1A32] via-[#060D1A] to-[#02050A]"
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

            {/* Glowing 3D Festive Card Medallion */}
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#112444] via-[#0B182D] to-[#050D19] border border-amber-400/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-7 flex flex-col justify-between items-center text-center overflow-hidden">
              {/* Islamic Geometric Background Pattern */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(223,195,138,0.5) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Top Crescent & Stars */}
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400/20 via-amber-300/30 to-transparent border border-amber-400/40 flex items-center justify-center shadow-lg">
                  <Moon className="w-7 h-7 text-amber-300 fill-amber-300/40 animate-pulse" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-bold">
                  {template.subcategory}
                </span>
              </div>

              {/* Calligraphy Header */}
              <div className="relative z-10 space-y-2 my-auto">
                <p className="font-arabic text-3xl sm:text-4xl text-amber-200 leading-snug drop-shadow-md">
                  {template.arabicCalligraphy || "عِيدٌ مُبَارَك"}
                </p>
                <h2 className="font-display text-2xl font-bold text-amber-100">
                  {template.calligraphyTitle || "Eid Mubarak"}
                </h2>
                <p className="text-xs text-amber-200/70 max-w-[260px] mx-auto leading-relaxed">
                  {template.description || "May this holy season bring peace, barakah, and joyous moments to your home."}
                </p>
                {senderName && (
                  <p className="text-[11px] uppercase tracking-widest text-amber-400/90 font-semibold pt-2">
                    Warmest Wishes from {senderName}
                  </p>
                )}
              </div>

              {/* Interactive Tap to Open Button */}
              <div className="relative z-10 w-full pt-4">
                <motion.button
                  onClick={handleOpenCard}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#DFC38A] via-[#F3D78A] to-[#B8902A] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(223,195,138,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Tap to Open Festive Suite</span>
                </motion.button>
                <p className="text-[10px] text-amber-200/60 mt-2">
                  Procedural Takbeerat chime audio & personalized sharing
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          STAGE 2: FULL FESTIVAL / HOLIDAY EXPERIENCE
         ═══════════════════════════════════════════════════════════ */}
      {isOpened && (
        <main className="relative z-10 max-w-xl mx-auto px-4 py-8 sm:py-12 space-y-10">
          {/* Top Glassmorphic Utility Bar */}
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
                  <span>Takbeerat Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span>Muted</span>
                </>
              )}
            </button>
          </header>

          {/* Festive Hero Card */}
          <section className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-5`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                <Moon className="w-8 h-8 text-amber-300 fill-amber-300/30" />
              </div>

              <div>
                <p className="font-arabic text-3xl sm:text-4xl text-amber-200 drop-shadow">
                  {template.arabicCalligraphy || "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ"}
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-amber-100 mt-2">
                  {template.title}
                </h1>
                <p className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold mt-1">
                  {template.sampleDate || "Blessed Islamic Celebration"}
                </p>
              </div>

              <div className="h-px w-24 mx-auto bg-amber-400/40" />

              <p className="text-sm text-amber-200/90 leading-relaxed max-w-md mx-auto">
                "May Allah accept all our righteous deeds, illuminate your home with contentment, and grant endless barakah to your loved ones."
              </p>

              {senderName && (
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-wider text-amber-400/70 block">
                    Warm Duas & Greetings From:
                  </span>
                  <span className="font-display text-lg font-bold text-amber-100">
                    {senderName}
                  </span>
                </div>
              )}
            </motion.div>
          </section>

          {/* Conditional: If this is an Iftar or Suhoor Dawat Gathering */}
          {isMealEvent && (
            <section className="space-y-4">
              <div className={`p-6 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-xl shadow-xl space-y-4`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-amber-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Iftar Gathering Schedule</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Maghrib Dawat
                  </span>
                </div>

                {/* Countdown */}
                <div className="p-4 rounded-2xl bg-black/40 border border-amber-400/20 text-center space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300/80 block">
                    Time until Maghrib / Iftar
                  </span>
                  <div className="flex justify-center gap-3">
                    {[
                      { label: "Hours", val: countdown.hours },
                      { label: "Mins", val: countdown.minutes },
                      { label: "Secs", val: countdown.seconds },
                    ].map((item, idx) => (
                      <div key={idx} className="px-3 py-1.5 rounded-xl bg-black/50 border border-amber-400/20">
                        <span className="font-display text-2xl font-bold text-amber-200 block">{item.val}</span>
                        <span className="text-[9px] uppercase tracking-widest text-amber-400/70">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-amber-200/80 space-y-2 pt-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{template.sampleVenue || "The Qureshi Residence, Emerald Banquet Hall"}</span>
                  </p>
                </div>

                {/* Iftar RSVP */}
                <div className="pt-3 border-t border-amber-400/15 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Confirm Your Iftar Attendance
                  </h4>
                  {iftarSubmitted ? (
                    <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Alhamdulillah! Your attendance is confirmed.</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setIftarAttendance("yes")}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                            iftarAttendance === "yes"
                              ? "bg-emerald-600/30 border-emerald-400 text-emerald-300"
                              : "bg-black/30 border-white/10 text-stone-400"
                          }`}
                        >
                          ✓ Attending
                        </button>
                        <button
                          onClick={() => setIftarAttendance("no")}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                            iftarAttendance === "no"
                              ? "bg-rose-600/30 border-rose-400 text-rose-300"
                              : "bg-black/30 border-white/10 text-stone-400"
                          }`}
                        >
                          ✕ Cannot Attend
                        </button>
                      </div>

                      {iftarAttendance === "yes" && (
                        <div>
                          <label className="text-xs text-amber-200/80 block mb-1">
                            Number of Guests: {iftarGuests}
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="8"
                            value={iftarGuests}
                            onChange={(e) => setIftarGuests(Number(e.target.value))}
                            className="w-full accent-amber-400"
                          />
                        </div>
                      )}

                      <button
                        onClick={handleIftarWhatsAppRSVP}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm Attendance via WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Interactive Personalized Greeting Card Generator */}
          <section className={`p-6 rounded-3xl bg-black/50 border border-amber-400/25 backdrop-blur-xl space-y-4`}>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <h3 className="font-display text-sm font-bold text-amber-100">
                Personalize & Send to Family & Friends
              </h3>
            </div>
            <p className="text-xs text-amber-200/70">
              Customize the sender and recipient names to generate a custom 3D card link:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-amber-300/80 uppercase tracking-wider text-[10px] mb-1">
                  From (Your Name / Family)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. The Farooqi Family"
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300/80 uppercase tracking-wider text-[10px] mb-1">
                  To (Recipient Name)
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Uncle Rashid & Auntie"
                  className="w-full py-2 px-3 rounded-xl bg-white/10 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleShareGreetingWhatsApp}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
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
            <p className="font-arabic text-sm text-amber-300/70">كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ</p>
            <p>© {new Date().getFullYear()} Wedos Islamic Celebration Suites</p>
          </footer>
        </main>
      )}
    </div>
  );
}
