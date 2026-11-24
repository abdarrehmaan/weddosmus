"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Maximize2,
  Send,
} from "lucide-react";

function WalimaInviteInner() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState("");
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareInput, setShareInput] = useState("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const g = searchParams.get("guest") || searchParams.get("to");
    if (g) {
      setGuestName(g);
      setShareInput(g);
    }
  }, [searchParams]);

  const getFullUrl = () => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/invite/walima`;
    return shareInput.trim()
      ? `${base}?guest=${encodeURIComponent(shareInput.trim())}`
      : base;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleWhatsAppShare = () => {
    const url = getFullUrl();
    const guestLabel = shareInput.trim() || "our respected guest";
    const msg = `Assalamu Alaikum *${guestLabel}*,\n\n*\"In Shaa Allah Programme\"*\nYou are cordially invited to celebrate the Wedding Reception of *Hamza Khan* (S/O Shrafat Ullah) & *Hameeza Siddiqui* (Grand D/O Iftikhar Ullah).\n\n📅 Date: Tuesday, 1 December 2026 at 7:00 PM\n📍 Venue: Shalimar Garden, 60 Feet Road, Kareli, Prayagraj\n\nTap to open your bespoke 3D interactive heirloom invitation:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Build target iframe source with parameters
  const iframeSrc = guestName
    ? `/walima/index.html?guest=${encodeURIComponent(guestName)}`
    : `/walima/index.html`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0A1424] text-[#F0F5FF] flex flex-col font-sans">
      {/* ── Top Floating Glassmorphic Utility Bar ── */}
      {isHeaderVisible && (
        <header className="relative z-50 flex items-center justify-between px-3 sm:px-6 py-2.5 bg-[#0D1B2E]/90 backdrop-blur-md border-b border-[#DFC38A]/30 shadow-xl text-xs">
          {/* Left: Return to Wedos */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-semibold text-[#DFC38A] hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Wedos</span>
            </Link>

            <span className="hidden md:inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#DFC38A] bg-[#DFC38A]/15 px-2.5 py-0.5 rounded-full border border-[#DFC38A]/35">
              <Sparkles className="w-3 h-3 text-[#DFC38A]" />
              In Shaa Allah Programme &bull; Reception
            </span>
          </div>

          {/* Center: Couple Monogram */}
          <div className="font-serif font-bold text-sm sm:text-base text-[#FFF6DE] tracking-wider flex items-center gap-1.5">
            <span>Hamza & Hameeza</span>
            <span className="text-[#DFC38A]">✦</span>
            <span className="text-xs font-sans opacity-80 hidden sm:inline">
              Tuesday &bull; 1 Dec 2026 &bull; 7:00 PM
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DFC38A]/20 hover:bg-[#DFC38A]/35 border border-[#DFC38A]/45 text-[#FFF6DE] font-medium transition-all cursor-pointer"
              title="Personalize WhatsApp Invite"
            >
              <Share2 className="w-3.5 h-3.5 text-[#DFC38A]" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <a
              href="/walima/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#F0F5FF] font-medium transition-all"
              title="Open Standalone Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Fullscreen</span>
            </a>

            <button
              onClick={() => setIsHeaderVisible(false)}
              className="p-1.5 rounded-full text-[#DFC38A]/70 hover:text-white hover:bg-white/10 text-[10px] ml-1"
              title="Hide top bar for immersion"
            >
              ✕
            </button>
          </div>
        </header>
      )}

      {/* Floating Restore Pill if Header is Hidden */}
      {!isHeaderVisible && (
        <button
          onClick={() => setIsHeaderVisible(true)}
          className="fixed top-3 left-3 z-50 px-3 py-1.5 rounded-full bg-[#0D1B2E]/90 backdrop-blur-md border border-[#DFC38A]/45 text-[#DFC38A] text-xs font-semibold shadow-2xl hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3" />
          <span>Show Menu</span>
        </button>
      )}

      {/* ── Main Iframe Loading the Walima Heirloom Experience ── */}
      <div className="flex-1 w-full h-full relative">
        <iframe
          src={iframeSrc}
          title="Hamza &amp; Hameeza | Wedding Reception &bull; Shalimar Garden"
          className="w-full h-full border-0"
          allow="autoplay; accelerometer; gyroscope"
        />
      </div>

      {/* ── Personalized WhatsApp Share Modal ── */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setShowShareModal(false)}
          />

          <div className="relative z-10 max-w-md w-full rounded-3xl bg-gradient-to-b from-[#102035] to-[#08111D] border-2 border-[#DFC38A]/50 p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#DFC38A] font-bold">
                Guest Personalization
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF6DE]">
                Share Reception Invitation
              </h3>
              <p className="text-xs text-[#DFC38A]/75">
                Enter the honored guest or family name to generate their personalized 3D invite link:
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#DFC38A] block">
                Honored Guest / Family Name
              </label>
              <input
                type="text"
                value={shareInput}
                onChange={(e) => setShareInput(e.target.value)}
                placeholder="e.g. Dr. Salman & Family"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#DFC38A]/40 text-sm text-[#FFF6DE] placeholder-[#DFC38A]/40 focus:outline-none focus:border-[#DFC38A]"
              />

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#DFC38A]/90 break-all select-all">
                {getFullUrl()}
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                onClick={handleCopy}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-[#DFC38A]/40 text-[#FFF6DE] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? (
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
              onClick={() => setShowShareModal(false)}
              className="w-full text-center text-xs text-[#DFC38A]/60 hover:text-white pt-2 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WalimaInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A1424] text-[#FFF6DE] flex items-center justify-center font-serif">
          Loading Bespoke Grand Walima Suite...
        </div>
      }
    >
      <WalimaInviteInner />
    </Suspense>
  );
}
