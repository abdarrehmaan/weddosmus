"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Sparkles, Volume2, Calendar, Check, Flame, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Template } from "@/app/data/templates";

export default function PhoneSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Mini invite interactive states
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [rsvpAttending, setRsvpAttending] = useState<"yes" | "no" | null>(null);

  // Live Countdown inside simulator
  const [timeLeft, setTimeLeft] = useState({
    days: "18",
    hours: "06",
    minutes: "24",
    seconds: "50",
  });

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<Template>;
      setSelectedTemplate(customEvent.detail || null);
      setEnvelopeOpen(false);
      setRsvpAttending(null);
      setIsOpen(true);
    };

    window.addEventListener("openSimulator", handleOpen);
    return () => window.removeEventListener("openSimulator", handleOpen);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Countdown timer ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date("2026-12-25T18:00:00").getTime();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(s).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent("openOrder", { detail: selectedTemplate })
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-espresso/70 backdrop-blur-md overflow-y-auto"
        >
          {/* Modal Backdrop click to close */}
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 flex flex-col items-center my-auto max-w-sm w-full"
          >
            {/* Close Button Top-Right of Modal */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 p-2 rounded-full glass bg-white/90 hover:bg-white text-espresso border border-gold/30 hover:scale-110 transition-all shadow-md cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── THE SMARTPHONE SIMULATOR ── */}
            <div className="relative w-[315px] sm:w-[335px] h-[640px] rounded-[3.2rem] p-3 bg-gradient-to-b from-[#FAF5ED] via-[#F0E6D6] to-[#E3D4BD] border-4 border-[#DFC38A] shadow-[0_25px_60px_rgba(44,30,24,0.5),0_0_40px_rgba(184,139,74,0.35)]">
              {/* Phone Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-espresso rounded-full z-40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-espresso-light mr-3" />
                <div className="w-10 h-1 bg-espresso-muted rounded-full" />
              </div>

              {/* Inner Screen Area */}
              <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-ivory phone-scroll overflow-y-auto border border-gold/30 flex flex-col">
                {/* ── PERMANENT ROYAL ARCHWAY BACKGROUND (Clear & Vibrant) ── */}
                <div className="fixed-inset-0 absolute inset-0 -z-0">
                  <Image
                    src="/royal-archway.jpg"
                    alt="Royal Palace Archway Background"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                  {/* Subtle darkening gradient so all text & controls pop */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />
                </div>

                {/* ── STEP 1: 3D WAX SEAL ENVELOPE (Shown if not yet opened) ── */}
                <AnimatePresence>
                  {!envelopeOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center"
                    >
                      {/* Atmospheric Glass Card around Envelope */}
                      <div className="p-6 rounded-3xl bg-black/40 backdrop-blur-md border border-gold/40 shadow-2xl space-y-6">
                        <div className="space-y-1">
                          <div className="text-amber-200 font-serif text-lg font-bold">
                            بِسْمِ ٱللَّهِ
                          </div>
                          <div className="text-[10px] uppercase tracking-[3px] text-amber-100/90 font-medium">
                            Royal Palace Archway
                          </div>
                        </div>

                        {/* 3D Envelope Body */}
                        <div className="relative w-56 h-40 mx-auto bg-gradient-to-b from-[#FAF5ED] to-[#E9DCB8] rounded-xl border-2 border-gold shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-center">
                          {/* Envelope Flap */}
                          <div
                            className="absolute -top-[1px] left-0 right-0 h-20 bg-gradient-to-b from-[#EEDEB8] to-[#E2CE9E] origin-top border-b border-gold/40"
                            style={{
                              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                            }}
                          />

                          {/* Wax Seal Button (Click to trigger flip) */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEnvelopeOpen(true)}
                            className="relative z-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#A83232] via-[#851E1E] to-[#5C1212] flex flex-col items-center justify-center shadow-[0_6px_20px_rgba(133,30,30,0.6)] border-2 border-[#DFC38A] cursor-pointer group"
                          >
                            <span className="font-display font-bold text-amber-100 text-base tracking-wider">
                              A&F
                            </span>
                            <span className="text-[7px] text-amber-200 uppercase tracking-widest">
                              Open
                            </span>
                          </motion.button>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold text-amber-100">
                            Tap the Wax Seal to Open
                          </p>
                          <p className="text-[10px] text-amber-200/70">
                            Step inside the candlelit palace archway
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── STEP 2: REVEALED INVITATION CONTENT (Inside the Royal Archway!) ── */}
                <div className="relative z-10 p-5 space-y-5 pt-10">
                  {/* Top Bar inside Phone */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold bg-black/60 backdrop-blur-md border border-gold/40 text-amber-200 shadow-sm">
                      <Sparkles className="w-2.5 h-2.5 text-gold" />
                      Royal Palace Edition
                    </span>
                    <button
                      className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-amber-200 hover:text-white"
                      title="Toggle Duff / Oud Music"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bismillah & Couple Names */}
                  <div className="text-center space-y-1 bg-black/45 backdrop-blur-md p-4 rounded-2xl border border-gold/30">
                    <div className="text-amber-300 font-serif text-xl font-bold">
                      بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                    </div>
                    <div className="text-[9px] uppercase tracking-[3px] text-amber-100/80 font-medium">
                      Together with their families
                    </div>
                    <h2 className="font-display text-2xl font-bold text-white drop-shadow">
                      Ahmad & Fatima
                    </h2>
                    <p className="text-[11px] text-rose-200 italic">
                      request the honor of your presence at their Nikah & Walima
                    </p>
                  </div>

                  {/* Live Countdown Grid */}
                  <div className="bg-black/55 backdrop-blur-md p-3.5 rounded-2xl border border-gold/30 text-center shadow-lg">
                    <div className="text-[9px] uppercase tracking-widest text-amber-200 mb-2 font-semibold flex items-center justify-center gap-1.5">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>Countdown to Walima Reception</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg border border-gold/20">
                        <div className="text-sm font-bold text-amber-300">{timeLeft.days}</div>
                        <div className="text-[8px] text-amber-100/70 uppercase">Days</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg border border-gold/20">
                        <div className="text-sm font-bold text-amber-300">{timeLeft.hours}</div>
                        <div className="text-[8px] text-amber-100/70 uppercase">Hrs</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg border border-gold/20">
                        <div className="text-sm font-bold text-amber-300">{timeLeft.minutes}</div>
                        <div className="text-[8px] text-amber-100/70 uppercase">Min</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg border border-gold/20">
                        <div className="text-sm font-bold text-amber-300">{timeLeft.seconds}</div>
                        <div className="text-[8px] text-amber-100/70 uppercase">Sec</div>
                      </div>
                    </div>
                  </div>

                  {/* Event Chapters */}
                  <div className="space-y-3">
                    <div className="text-[10px] uppercase tracking-widest text-amber-200 font-bold text-center">
                      Blessed Celebrations
                    </div>

                    {/* Nikah Card */}
                    <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-emerald-400/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                          Nikah Ceremony
                        </span>
                        <span className="text-[10px] text-amber-100/80 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gold" /> Friday, 15 Jan
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">Masjid Al-Noor</div>
                      <div className="text-[10px] text-amber-100/70">
                        City Center, 1:30 PM (After Zuhr)
                      </div>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300 hover:text-emerald-100 pt-1"
                      >
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>Google Maps Directions</span>
                      </a>
                    </div>

                    {/* Walima Card */}
                    <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-400/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-200 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                          Walima Reception
                        </span>
                        <span className="text-[10px] text-amber-100/80 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gold" /> Saturday, 16 Jan
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">Royal Orchid Palace Hall</div>
                      <div className="text-[10px] text-amber-100/70">
                        Garden Road, 7:30 PM Onwards
                      </div>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-300 hover:text-white pt-1"
                      >
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>Google Maps Directions</span>
                      </a>
                    </div>
                  </div>

                  {/* Interactive RSVP Section inside Simulator */}
                  <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-gold/40 text-center space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-amber-200">
                      Kindly Confirm Attendance
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setRsvpAttending("yes")}
                        className={`py-2 px-3 rounded-xl text-[10px] font-semibold transition-all cursor-pointer ${
                          rsvpAttending === "yes"
                            ? "bg-emerald-600 text-white shadow-md border border-emerald-400"
                            : "bg-white/10 text-white border border-gold/30 hover:bg-white/20"
                        }`}
                      >
                        ✓ Joyfully Accept
                      </button>
                      <button
                        onClick={() => setRsvpAttending("no")}
                        className={`py-2 px-3 rounded-xl text-[10px] font-semibold transition-all cursor-pointer ${
                          rsvpAttending === "no"
                            ? "bg-rose-700 text-white shadow-md border border-rose-400"
                            : "bg-white/10 text-white border border-gold/30 hover:bg-white/20"
                        }`}
                      >
                        ✗ Decline
                      </button>
                    </div>

                    {rsvpAttending && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-emerald-200 font-semibold bg-emerald-950/80 py-1.5 px-3 rounded-lg border border-emerald-500/50"
                      >
                        {rsvpAttending === "yes"
                          ? "✓ JazakAllah! Your RSVP has been confirmed."
                          : "Thank you for letting us know. You will be missed!"}
                      </motion.div>
                    )}
                  </div>

                  {/* Reset Envelope Preview Button */}
                  <div className="text-center pt-2 pb-6">
                    <button
                      onClick={() => setEnvelopeOpen(false)}
                      className="text-[10px] text-amber-200/80 hover:text-amber-100 underline cursor-pointer"
                    >
                      ↺ Re-Seal 3D Envelope
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── ACTION BELOW PHONE: FULLSCREEN DEMO & BUY ── */}
            <div className="mt-4 w-full flex flex-col gap-2">
              <a
                href={`/invite/${selectedTemplate?.id || "royal-palace"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full font-semibold text-xs text-amber-200 bg-black/60 hover:bg-black/80 border border-gold/40 hover:border-gold shadow-md hover:scale-102 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
                <span>Open Fullscreen Interactive URL</span>
              </a>

              <button
                onClick={handleBuy}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-sm text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-105 transition-all text-center uppercase tracking-wider cursor-pointer"
              >
                Buy & Customize This Theme
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
