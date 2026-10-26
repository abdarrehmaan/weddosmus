"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Maximize2,
  ExternalLink,
  Heart,
  Send,
} from "lucide-react";

export default function MuslimsWeddInvitePage() {
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
    const base = `${window.location.origin}/invite/muslimswedd`;
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
    const msg = `Assalamu Alaikum *${guestLabel}*,\n\nYou are cordially invited to celebrate the Royal Nikah & Walima of *Yassine & Fatima*.\n\nTap to open your bespoke 3D interactive heirloom invitation:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Build target iframe source with parameters
  const iframeSrc = guestName
    ? `/muslimswedd/index.html?guest=${encodeURIComponent(guestName)}`
    : `/muslimswedd/index.html`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1E110A] text-[#F9F4F0] flex flex-col font-sans">
      {/* ── Top Floating Glassmorphic Utility Bar ── */}
      {isHeaderVisible && (
        <header className="relative z-50 flex items-center justify-between px-3 sm:px-6 py-2.5 bg-[#2B1B12]/85 backdrop-blur-md border-b border-[#C59B48]/30 shadow-lg text-xs">
          {/* Left: Return to Wedos */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-semibold text-[#E8CA7C] hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Wedos</span>
            </Link>

            <span className="hidden md:inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#E8CA7C]/80 bg-[#C59B48]/15 px-2.5 py-0.5 rounded-full border border-[#C59B48]/30">
              <Sparkles className="w-3 h-3 text-[#E8CA7C]" />
              MuslimsWedd Royal Heirloom Edition
            </span>
          </div>

          {/* Center: Couple Monogram */}
          <div className="font-serif font-bold text-sm sm:text-base text-[#FFF6BD] tracking-wider flex items-center gap-1.5">
            <span>Yassine & Fatima</span>
            <span className="text-[#C59B48]">✦</span>
            <span className="text-xs font-sans opacity-80 hidden sm:inline">
              May 21, 2026
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C59B48]/20 hover:bg-[#C59B48]/35 border border-[#C59B48]/40 text-[#FFF6BD] font-medium transition-all cursor-pointer"
              title="Personalize WhatsApp Invite"
            >
              <Share2 className="w-3.5 h-3.5 text-[#E8CA7C]" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <a
              href="/muslimswedd/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#F9F4F0] font-medium transition-all"
              title="Open Standalone Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Fullscreen</span>
            </a>

            <button
              onClick={() => setIsHeaderVisible(false)}
              className="p-1.5 rounded-full text-[#E8CA7C]/60 hover:text-white hover:bg-white/10 text-[10px] ml-1"
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
          className="fixed top-3 left-3 z-50 px-3 py-1.5 rounded-full bg-[#2B1B12]/85 backdrop-blur-md border border-[#C59B48]/40 text-[#E8CA7C] text-xs font-semibold shadow-xl hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3" />
          <span>Show Menu</span>
        </button>
      )}

      {/* ── Main Iframe Loading the Muslimswedd Heirloom Experience ── */}
      <div className="flex-1 w-full h-full relative">
        <iframe
          src={iframeSrc}
          title="Yassine & Fatima | Royal Muslim Wedding Invitation"
          className="w-full h-full border-0"
          allow="autoplay; accelerometer; gyroscope"
        />
      </div>

      {/* ── Personalized WhatsApp Share Modal ── */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setShowShareModal(false)}
          />

          <div className="relative z-10 max-w-md w-full rounded-3xl bg-gradient-to-b from-[#2D1B12] to-[#190C06] border-2 border-[#C59B48]/50 p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#E8CA7C] font-bold">
                Guest Personalization
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF6BD]">
                Share Royal Invitation
              </h3>
              <p className="text-xs text-[#E8CA7C]/70">
                Type the guest or family name to generate their personalized 3D invite link:
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#E8CA7C] block">
                Guest / Family Name
              </label>
              <input
                type="text"
                value={shareInput}
                onChange={(e) => setShareInput(e.target.value)}
                placeholder="e.g. Uncle Tariq & Family"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#C59B48]/40 text-sm text-[#FFF6BD] placeholder-[#E8CA7C]/40 focus:outline-none focus:border-[#E8CA7C]"
              />

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#E8CA7C]/80 break-all select-all">
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
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-[#C59B48]/40 text-[#FFF6BD] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
              className="w-full text-center text-xs text-[#E8CA7C]/60 hover:text-white pt-2 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
