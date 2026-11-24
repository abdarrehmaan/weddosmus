"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Download,
  Share2,
  Image as ImageIcon,
  Type,
  Calendar,
  MapPin,
  Heart,
  Palette,
  Check,
  RefreshCw,
  Eye,
  Layers,
  ShoppingBag,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { templates, Template } from "@/app/data/templates";
import {
  ISLAMIC_PHRASES,
  QURANIC_VERSES,
  CALLIGRAPHY_STYLES,
  MULTILANG_WORDING,
  ISLAMIC_THEMES,
} from "@/app/data/islamicData";
import { useStore } from "@/app/context/StoreContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CheckoutModal from "@/app/components/CheckoutModal";
import CartDrawer from "@/app/components/CartDrawer";
import UserAccountModal from "@/app/components/UserAccountModal";

function StudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateIdParam = searchParams.get("template");

  const { addToCart, setIsCartOpen } = useStore();

  // Find initial template
  const initialTemplate =
    templates.find((t) => t.id === templateIdParam) || templates[0];

  // Studio Form State
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(initialTemplate);
  const [activeTab, setActiveTab] = useState<"names" | "wording" | "datetime" | "style" | "photo" | "interactive">("names");
  const [viewMode, setViewMode] = useState<"card" | "envelope" | "scratch">("card");

  // Editable Invitation Fields
  const [groomName, setGroomName] = useState(initialTemplate.sampleGroom || "Yassine Al-Mansoor");
  const [brideName, setBrideName] = useState(initialTemplate.sampleBride || "Fatima Az-Zahra");
  const [arabicGroomName, setArabicGroomName] = useState(initialTemplate.sampleArabicGroom || "ياسين المنصور");
  const [arabicBrideName, setArabicBrideName] = useState(initialTemplate.sampleArabicBride || "فاطمة الزهراء");
  const [parentsText, setParentsText] = useState("Mr. & Mrs. Mansoor and Dr. & Mrs. Zahra cordially request your presence");
  const [eventTitle, setEventTitle] = useState(initialTemplate.sampleEvent || "Sacred Nikah & Grand Walima");
  const [eventDate, setEventDate] = useState(initialTemplate.sampleDate || "Saturday, November 28, 2026");
  const [hijriDate, setHijriDate] = useState(initialTemplate.sampleHijriDate || "18 Jumada al-Awwal 1448 AH");
  const [eventTime, setEventTime] = useState("Ceremony: 11:30 AM • Banquet: 7:30 PM");
  const [venueName, setVenueName] = useState(initialTemplate.sampleVenue || "The Royal Noor Palace Banquet & Courtyard");
  const [venueCity, setVenueCity] = useState("Hyderabad, India");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("https://maps.google.com");

  // Islamic Phrasings & Duas
  const [selectedPhrase, setSelectedPhrase] = useState(ISLAMIC_PHRASES[3].arabic); // Barakallahu Lakuma
  const [selectedCalligraphyTitle, setSelectedCalligraphyTitle] = useState("Barakallahu Lakuma");
  const [selectedQuranVerse, setSelectedQuranVerse] = useState(QURANIC_VERSES[0].arabic);
  const [quranReference, setQuranReference] = useState(QURANIC_VERSES[0].reference);
  const [selectedLanguageWording, setSelectedLanguageWording] = useState<"english" | "arabic" | "urdu" | "hindi">("english");
  const [customDuaNote, setCustomDuaNote] = useState(MULTILANG_WORDING.english.blessing);

  // Styling & Themes
  const [selectedThemeId, setSelectedThemeId] = useState(initialTemplate.themeId || "emerald-gold");
  const [selectedCalligraphyStyle, setSelectedCalligraphyStyle] = useState("thuluth");
  const [fontFamily, setFontFamily] = useState<"serif" | "sans" | "arabic">("serif");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [accentColor, setAccentColor] = useState("#D4AF37");
  const [showArchway, setShowArchway] = useState(true);
  const [showCrescent, setShowCrescent] = useState(true);
  const [showIslamicBorder, setShowIslamicBorder] = useState(true);

  // Photo Upload
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Interactive Features State
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardPreviewRef = useRef<HTMLDivElement>(null);

  // Modals
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Sync when template changes
  const handleSelectTemplate = (t: Template) => {
    setSelectedTemplate(t);
    if (t.sampleGroom) setGroomName(t.sampleGroom);
    if (t.sampleBride) setBrideName(t.sampleBride);
    if (t.sampleArabicGroom) setArabicGroomName(t.sampleArabicGroom);
    if (t.sampleArabicBride) setArabicBrideName(t.sampleArabicBride);
    if (t.sampleEvent) setEventTitle(t.sampleEvent);
    if (t.sampleDate) setEventDate(t.sampleDate);
    if (t.sampleHijriDate) setHijriDate(t.sampleHijriDate);
    if (t.sampleVenue) setVenueName(t.sampleVenue);
    if (t.arabicCalligraphy) setSelectedPhrase(t.arabicCalligraphy);
    if (t.calligraphyTitle) setSelectedCalligraphyTitle(t.calligraphyTitle);
    if (t.themeId) setSelectedThemeId(t.themeId);
  };

  // Language preset change
  const handleLanguageChange = (lang: "english" | "arabic" | "urdu" | "hindi") => {
    setSelectedLanguageWording(lang);
    setCustomDuaNote(MULTILANG_WORDING[lang].blessing);
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Scratch-to-reveal canvas setup
  useEffect(() => {
    if (viewMode === "scratch" && scratchCanvasRef.current) {
      const canvas = scratchCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Draw metallic gold scratch overlay
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#D4AF37");
      gradient.addColorStop(0.5, "#DFC38A");
      gradient.addColorStop(1, "#8A6527");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add text on scratch layer
      ctx.fillStyle = "#2C1E18";
      ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✨ Scratch with Mouse or Touch ✨", width / 2, height / 2 - 10);
      ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText("to reveal the Secret Wedding Blessing", width / 2, height / 2 + 15);
    }
  }, [viewMode]);

  // Scratch interaction
  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    setScratchRevealed(true);
  };

  // Download High-Resolution PNG
  const handleDownloadPNG = () => {
    setDownloading(true);

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1620;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setDownloading(false);
      return;
    }

    // Determine background color
    const isEmerald = selectedThemeId === "emerald-gold";
    const isNavy = selectedThemeId === "midnight-navy";
    const isRose = selectedThemeId === "rosewater-blush";
    const isIvory = selectedThemeId === "ivory-arabesque";

    // Draw background
    ctx.fillStyle = isEmerald
      ? "#043927"
      : isNavy
      ? "#0B192C"
      : isRose
      ? "#F5E4DC"
      : isIvory
      ? "#FAF5ED"
      : "#EFE5D5";
    ctx.fillRect(0, 0, 1080, 1620);

    // Draw ornamental border
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1000, 1540);
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 970, 1510);

    // Calligraphy & texts
    ctx.textAlign = "center";
    ctx.fillStyle = "#DFC38A";
    ctx.font = "bold 34px 'Amiri', serif";
    ctx.fillText("بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", 540, 140);

    ctx.fillStyle = "#D4AF37";
    ctx.font = "bold 56px 'Amiri', serif";
    ctx.fillText(selectedPhrase, 540, 240);

    ctx.fillStyle = isEmerald || isNavy ? "#FAF5ED" : "#2C1E18";
    ctx.font = "italic 24px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(parentsText, 540, 360);

    // Event title
    ctx.fillStyle = "#DFC38A";
    ctx.font = "bold 32px 'Cormorant Garamond', serif";
    ctx.fillText(eventTitle.toUpperCase(), 540, 440);

    // Couple Names
    ctx.fillStyle = isEmerald || isNavy ? "#FFFFFF" : "#1A130F";
    ctx.font = "bold 64px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(groomName, 540, 560);
    if (arabicGroomName) {
      ctx.fillStyle = "#D4AF37";
      ctx.font = "bold 38px 'Amiri', serif";
      ctx.fillText(arabicGroomName, 540, 620);
    }

    ctx.fillStyle = "#DFC38A";
    ctx.font = "italic 36px 'Cormorant Garamond', serif";
    ctx.fillText("&", 540, 680);

    ctx.fillStyle = isEmerald || isNavy ? "#FFFFFF" : "#1A130F";
    ctx.font = "bold 64px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(brideName, 540, 770);
    if (arabicBrideName) {
      ctx.fillStyle = "#D4AF37";
      ctx.font = "bold 38px 'Amiri', serif";
      ctx.fillText(arabicBrideName, 540, 830);
    }

    // Quran Verse
    ctx.fillStyle = "#DFC38A";
    ctx.font = "bold 30px 'Amiri', serif";
    ctx.fillText(selectedQuranVerse, 540, 960);
    ctx.font = "italic 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(quranReference, 540, 1010);

    // Date & Time
    ctx.fillStyle = isEmerald || isNavy ? "#FDFBF7" : "#2C1E18";
    ctx.font = "bold 32px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(eventDate, 540, 1140);
    ctx.fillStyle = "#D4AF37";
    ctx.font = "24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(hijriDate, 540, 1190);
    ctx.font = "22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(eventTime, 540, 1240);

    // Venue
    ctx.fillStyle = isEmerald || isNavy ? "#FFFFFF" : "#1A130F";
    ctx.font = "bold 30px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(venueName, 540, 1360);
    ctx.font = "24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#DFC38A";
    ctx.fillText(venueCity, 540, 1410);

    // Footer blessing
    ctx.fillStyle = isEmerald || isNavy ? "#FAF5ED" : "#4A352B";
    ctx.font = "italic 19px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Your heartfelt prayers and presence are our greatest blessing.", 540, 1510);

    // Download trigger
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `noor-${groomName.toLowerCase().replace(/\s+/g, "-")}-islamic-invite.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    }, 400);
  };

  // WhatsApp Share Handler
  const handleWhatsAppShare = () => {
    const text = `بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\n\nالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ\n\n${parentsText}\n\n*${eventTitle}*\n*${groomName}* & *${brideName}*\n(${arabicGroomName} وَ ${arabicBrideName})\n\n📅 *Date:* ${eventDate} (${hijriDate})\n⏰ *Timing:* ${eventTime}\n📍 *Venue:* ${venueName}, ${venueCity}\n\n✨ *View Interactive 3D Invitation:* ${typeof window !== "undefined" ? window.location.origin : ""}/invite/${selectedTemplate.id}\n\nBarakAllahu Feekum!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Theme helper classes
  const theme = ISLAMIC_THEMES.find((t) => t.id === selectedThemeId) || ISLAMIC_THEMES[0];

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenAccount={() => setShowAccount(true)} />

      {/* Studio Header Bar */}
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gold-light" />
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-light flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                Islamic Customization Studio
              </span>
              <h1 className="font-display text-xl sm:text-2xl font-bold">
                {selectedTemplate.title}
              </h1>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPNG}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-espresso bg-gold-light hover:bg-gold-bright transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading ? "Rendering..." : "Download PNG"}
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 transition-all shadow-sm cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share WhatsApp
            </button>
            <button
              onClick={() => {
                addToCart(selectedTemplate, `${groomName} & ${brideName}`);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow hover:scale-105 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {selectedTemplate.price === 0 ? "Get Free Card" : `Order (₹${selectedTemplate.price.toLocaleString("en-IN")})`}
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Control Tabs & Form Panels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Navigation Pill Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-2 border-b border-gold/20 no-scrollbar">
            {[
              { id: "names", label: "Names & Bride", icon: Heart },
              { id: "wording", label: "Phrases & Duas", icon: BookOpen },
              { id: "datetime", label: "Date & Venue", icon: Calendar },
              { id: "style", label: "Themes & Style", icon: Palette },
              { id: "photo", label: "Photo Upload", icon: ImageIcon },
              { id: "interactive", label: "3D Reveal", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-espresso text-amber-100 shadow-sm"
                      : "text-espresso-muted hover:text-espresso hover:bg-gold/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-gold" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="p-5 rounded-3xl glass border border-gold/30 space-y-5 overflow-y-auto max-h-[70vh]">
            {/* 1. NAMES & TITLES TAB */}
            {activeTab === "names" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-espresso">
                    Couple & Family Names
                  </h3>
                  <p className="text-xs text-espresso-muted">
                    Enter names in both English and Arabic script for traditional calligraphy presentation.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Groom / Host Name (English)
                    </label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Groom Name (Arabic Calligraphy)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={arabicGroomName}
                      onChange={(e) => setArabicGroomName(e.target.value)}
                      placeholder="ياسين"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white font-arabic text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Bride / Recipient Name (English)
                    </label>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Bride Name (Arabic Calligraphy)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={arabicBrideName}
                      onChange={(e) => setArabicBrideName(e.target.value)}
                      placeholder="فاطمة"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white font-arabic text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Family Invitation Request Phrasing
                  </label>
                  <textarea
                    rows={2}
                    value={parentsText}
                    onChange={(e) => setParentsText(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>
              </div>
            )}

            {/* 2. ISLAMIC PHRASES & DUAS TAB */}
            {activeTab === "wording" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-espresso">
                    Sacred Phrases & Quranic Duas
                  </h3>
                  <p className="text-xs text-espresso-muted">
                    Select authentic Arabic calligraphy phrases and Quranic verses to crown your card.
                  </p>
                </div>

                {/* Islamic Phrase Selector */}
                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-2">
                    Primary Sacred Calligraphy Emblem
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {ISLAMIC_PHRASES.map((phrase) => {
                      const isSelected = selectedPhrase === phrase.arabic;
                      return (
                        <button
                          key={phrase.id}
                          type="button"
                          onClick={() => {
                            setSelectedPhrase(phrase.arabic);
                            setSelectedCalligraphyTitle(phrase.transliteration);
                          }}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? "border-gold bg-gold/10 shadow-sm"
                              : "border-gold/20 glass hover:border-gold/40"
                          }`}
                        >
                          <div>
                            <span className="font-arabic text-lg block text-espresso">
                              {phrase.arabic}
                            </span>
                            <span className="text-[11px] font-semibold text-gold-dark block">
                              {phrase.transliteration}
                            </span>
                            <span className="text-[10px] text-espresso-muted">
                              {phrase.translation}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Traditional Multi-Language Presets */}
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-2">
                    Traditional Wording Languages
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["english", "arabic", "urdu", "hindi"] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleLanguageChange(lang)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                          selectedLanguageWording === lang
                            ? "bg-espresso text-amber-100 shadow-sm"
                            : "border border-gold/20 glass text-espresso-muted hover:border-gold/40"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Custom Blessing / Dua Note
                  </label>
                  <textarea
                    rows={3}
                    value={customDuaNote}
                    onChange={(e) => setCustomDuaNote(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>
              </div>
            )}

            {/* 3. DATE, TIME & VENUE TAB */}
            {activeTab === "datetime" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-espresso">
                    Event Schedule & GPS Venue
                  </h3>
                  <p className="text-xs text-espresso-muted">
                    Display both Gregorian and Islamic Hijri dates along with Google Maps navigation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Gregorian Date
                    </label>
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Islamic Hijri Date
                    </label>
                    <input
                      type="text"
                      value={hijriDate}
                      onChange={(e) => setHijriDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Event Timings & Schedule
                  </label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Venue Name / Grand Mosque
                  </label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      City & Country
                    </label>
                    <input
                      type="text"
                      value={venueCity}
                      onChange={(e) => setVenueCity(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Google Maps Link
                    </label>
                    <input
                      type="url"
                      value={googleMapsUrl}
                      onChange={(e) => setGoogleMapsUrl(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. THEMES & STYLE TAB */}
            {activeTab === "style" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-espresso">
                    Palettes, Archways & Typography
                  </h3>
                  <p className="text-xs text-espresso-muted">
                    Curate royal Islamic color systems and ornamental geometric borders.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-2">
                    Islamic Color Themes
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {ISLAMIC_THEMES.map((th) => {
                      const isSelected = selectedThemeId === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setSelectedThemeId(th.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? "border-gold ring-2 ring-gold/40 shadow-sm"
                              : "border-gold/20 glass hover:border-gold/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-7 h-7 rounded-full border border-gold/40 shadow-sm"
                              style={{ backgroundColor: th.primary }}
                            />
                            <div>
                              <p className="font-display font-bold text-xs text-espresso">
                                {th.name}
                              </p>
                              <span className="text-[10px] text-espresso-muted">{th.badge}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-700" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calligraphy Styles */}
                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-2">
                    Arabic Calligraphy Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CALLIGRAPHY_STYLES.map((cs) => (
                      <button
                        key={cs.id}
                        type="button"
                        onClick={() => setSelectedCalligraphyStyle(cs.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedCalligraphyStyle === cs.id
                            ? "border-gold bg-gold/15 font-bold text-espresso shadow-sm"
                            : "border-gold/20 glass text-espresso-muted"
                        }`}
                      >
                        <span className="text-xs block font-serif">{cs.name}</span>
                        <span className="text-[10px] font-arabic block text-gold-dark mt-0.5">
                          {cs.arabicName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-2 pt-2 border-t border-gold/20">
                  <label className="flex items-center justify-between text-xs text-espresso cursor-pointer">
                    <span>Show Royal Moorish Archway</span>
                    <input
                      type="checkbox"
                      checked={showArchway}
                      onChange={(e) => setShowArchway(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                  </label>
                  <label className="flex items-center justify-between text-xs text-espresso cursor-pointer">
                    <span>Show Crescent Moon Emblem</span>
                    <input
                      type="checkbox"
                      checked={showCrescent}
                      onChange={(e) => setShowCrescent(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                  </label>
                  <label className="flex items-center justify-between text-xs text-espresso cursor-pointer">
                    <span>Show Gold Foil Border</span>
                    <input
                      type="checkbox"
                      checked={showIslamicBorder}
                      onChange={(e) => setShowIslamicBorder(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* 5. PHOTO UPLOAD TAB */}
            {activeTab === "photo" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-espresso">
                    Personal Photograph Upload
                  </h3>
                  <p className="text-xs text-espresso-muted">
                    Upload a high-resolution couple or family photograph, or keep modest floral calligraphy mode.
                  </p>
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gold/40 hover:border-gold rounded-2xl p-6 text-center cursor-pointer glass hover:bg-white/80 transition-all space-y-3"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-espresso">
                      Click to Browse & Upload Photo
                    </p>
                    <p className="text-[11px] text-espresso-muted mt-0.5">
                      JPG, PNG, or WebP up to 10MB
                    </p>
                  </div>
                </div>

                {uploadedPhoto && (
                  <div className="p-3 rounded-2xl glass border border-gold/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-gold/40">
                        <img
                          src={uploadedPhoto}
                          alt="Uploaded Portrait"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-espresso">Photo Attached</p>
                        <p className="text-[10px] text-emerald-700">Displaying on live preview</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedPhoto(null)}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 6. INTERACTIVE 3D REVEAL TAB */}
            {activeTab === "interactive" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-espresso">
                    Interactive Guest Experiences
                  </h3>
                  <p className="text-xs text-espresso-muted">
                    Test the digital features your wedding guests will interact with.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("card")}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      viewMode === "card"
                        ? "border-gold bg-gold/15 font-bold text-espresso shadow-sm"
                        : "border-gold/20 glass text-espresso-muted"
                    }`}
                  >
                    <Eye className="w-4 h-4 mx-auto mb-1 text-gold" />
                    <span className="text-[11px] block">Full Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("envelope");
                      setEnvelopeOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      viewMode === "envelope"
                        ? "border-gold bg-gold/15 font-bold text-espresso shadow-sm"
                        : "border-gold/20 glass text-espresso-muted"
                    }`}
                  >
                    <Layers className="w-4 h-4 mx-auto mb-1 text-gold" />
                    <span className="text-[11px] block">Wax Seal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("scratch");
                      setScratchRevealed(false);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      viewMode === "scratch"
                        ? "border-gold bg-gold/15 font-bold text-espresso shadow-sm"
                        : "border-gold/20 glass text-espresso-muted"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 mx-auto mb-1 text-gold" />
                    <span className="text-[11px] block">Scratch Card</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 text-xs text-espresso space-y-1">
                  <p className="font-bold">💡 How guests experience this:</p>
                  <p className="text-espresso-muted text-[11px]">
                    When opened on mobile, guests see the shimmering royal envelope with golden wax seal. Tapping the seal opens the full digital experience with countdown, RSVP sync, and Google Maps.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Real-Time Live Preview Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Preview Toolbar */}
          <div className="w-full max-w-md flex items-center justify-between mb-3 px-2">
            <span className="text-xs uppercase tracking-wider font-bold text-gold-dark flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-gold" />
              Live Real-Time Preview
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                  viewMode === "card"
                    ? "bg-espresso text-amber-100"
                    : "glass text-espresso-muted hover:text-espresso"
                }`}
              >
                Card
              </button>
              <button
                onClick={() => setViewMode("envelope")}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                  viewMode === "envelope"
                    ? "bg-espresso text-amber-100"
                    : "glass text-espresso-muted hover:text-espresso"
                }`}
              >
                Envelope
              </button>
              <button
                onClick={() => setViewMode("scratch")}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                  viewMode === "scratch"
                    ? "bg-espresso text-amber-100"
                    : "glass text-espresso-muted hover:text-espresso"
                }`}
              >
                Scratch
              </button>
            </div>
          </div>

          {/* Phone / Tablet Card Stage */}
          <div className="w-full max-w-md relative flex justify-center">
            {/* 1. ENVELOPE MODE */}
            {viewMode === "envelope" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full aspect-[4/5] rounded-3xl p-6 relative overflow-hidden shadow-palace-glow flex flex-col justify-between border-2 border-gold/40 text-center"
                style={{
                  backgroundColor:
                    selectedThemeId === "emerald-gold"
                      ? "#043927"
                      : selectedThemeId === "midnight-navy"
                      ? "#0B192C"
                      : "#FAF5ED",
                }}
              >
                {/* Envelope Flap geometry */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-light">
                    Royal Digital Envelope
                  </span>
                  <p className="font-arabic text-xl text-amber-100">
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                </div>

                {/* Wax Seal in Center */}
                <div className="my-auto relative z-10 flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEnvelopeOpen(!envelopeOpen)}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-gold-glow-strong flex flex-col items-center justify-center text-espresso border-2 border-amber-200 cursor-pointer"
                  >
                    <span className="font-arabic font-bold text-2xl drop-shadow">مبارك</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-950">
                      {envelopeOpen ? "OPENED" : "TAP TO OPEN"}
                    </span>
                  </motion.button>
                  <p className="text-xs text-amber-100/90 font-display italic mt-4">
                    Specially prepared for our honored guest
                  </p>
                </div>

                {/* Bottom flap label */}
                <div className="relative z-10 border-t border-gold/30 pt-3">
                  <p className="font-display font-bold text-base text-white">
                    {groomName} & {brideName}
                  </p>
                  <span className="text-[10px] text-gold-light uppercase tracking-wider">
                    {eventTitle}
                  </span>
                </div>
              </motion.div>
            )}

            {/* 2. SCRATCH-TO-REVEAL MODE */}
            {viewMode === "scratch" && (
              <div className="w-full aspect-[4/5] rounded-3xl p-6 relative overflow-hidden shadow-palace-glow flex flex-col justify-center items-center text-center bg-emerald-950 border-2 border-gold/40">
                {/* Secret content revealed underneath */}
                <div className="space-y-4 max-w-xs">
                  <span className="font-arabic text-3xl text-gold-light block">
                    {selectedPhrase}
                  </span>
                  <h4 className="font-display text-xl font-bold text-white">
                    Secret Wedding Dua & Blessing
                  </h4>
                  <p className="text-xs text-amber-100/90 leading-relaxed font-arabic text-sm">
                    {selectedQuranVerse}
                  </p>
                  <p className="text-[11px] font-mono text-gold-bright">
                    {quranReference}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-100 border border-gold/30">
                      ✓ Blessing Revealed!
                    </span>
                  </div>
                </div>

                {/* Scratch Layer Overlay */}
                <canvas
                  ref={scratchCanvasRef}
                  width={380}
                  height={480}
                  onMouseMove={handleScratch}
                  onTouchMove={handleScratch}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-20 rounded-3xl"
                />
              </div>
            )}

            {/* 3. CARD VIEW MODE */}
            {viewMode === "card" && (
              <div
                ref={cardPreviewRef}
                className={`w-full rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-palace-glow border-2 transition-all text-center flex flex-col justify-between ${
                  selectedThemeId === "emerald-gold"
                    ? "bg-emerald-deep text-white border-gold/40"
                    : selectedThemeId === "midnight-navy"
                    ? "bg-navy-dark text-white border-gold/35"
                    : selectedThemeId === "rosewater-blush"
                    ? "bg-blush-soft text-rose-950 border-rose-300"
                    : selectedThemeId === "moroccan-cartouche"
                    ? "bg-ivory-sandstone text-stone-900 border-amber-600/30"
                    : "bg-ivory text-espresso border-gold/30"
                }`}
              >
                {/* Inner Ornamental Border */}
                {showIslamicBorder && (
                  <div className="absolute inset-3 border border-gold/35 rounded-2xl pointer-events-none" />
                )}

                {/* Top Section: Bismillah & Sacred Emblem */}
                <div className="space-y-2 relative z-10">
                  <p className="font-arabic text-lg sm:text-xl text-gold-light tracking-wide">
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                  <div className="my-1">
                    <span className="font-arabic text-2xl sm:text-3xl text-gold block font-bold leading-tight">
                      {selectedPhrase}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gold-light/90 font-semibold block">
                      {selectedCalligraphyTitle}
                    </span>
                  </div>
                  <p className="text-[11px] max-w-xs mx-auto text-amber-100/80 leading-relaxed font-serif italic pt-1">
                    {parentsText}
                  </p>
                </div>

                {/* Center Section: Event Title & Couple Names */}
                <div className="py-4 space-y-2 relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-gold-light">
                    {eventTitle}
                  </span>

                  {/* Groom */}
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-wide">
                      {groomName}
                    </h2>
                    {arabicGroomName && (
                      <span className="font-arabic text-xl text-gold block mt-0.5">
                        {arabicGroomName}
                      </span>
                    )}
                  </div>

                  <span className="font-serif italic text-gold text-lg block my-0.5">&</span>

                  {/* Bride */}
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-wide">
                      {brideName}
                    </h2>
                    {arabicBrideName && (
                      <span className="font-arabic text-xl text-gold block mt-0.5">
                        {arabicBrideName}
                      </span>
                    )}
                  </div>

                  {/* Optional Uploaded Portrait Photo */}
                  {uploadedPhoto && (
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gold/60 shadow-lg my-2 relative">
                      <img
                        src={uploadedPhoto}
                        alt="Couple Portrait"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Quranic Verse */}
                  <div className="max-w-xs mx-auto pt-2">
                    <p className="font-arabic text-sm text-gold-light leading-relaxed">
                      {selectedQuranVerse}
                    </p>
                    <span className="text-[9px] font-mono text-gold/80 block mt-0.5">
                      {quranReference}
                    </span>
                  </div>
                </div>

                {/* Bottom Section: Date, Venue & Blessing */}
                <div className="space-y-3 pt-3 border-t border-gold/25 relative z-10">
                  <div className="space-y-0.5 text-xs">
                    <p className="font-bold tracking-wide">{eventDate}</p>
                    <p className="text-[11px] text-gold-light">{hijriDate}</p>
                    <p className="text-[10px] text-amber-100/70">{eventTime}</p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-semibold text-xs flex items-center justify-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {venueName}
                    </p>
                    <p className="text-[10px] text-gold-light">{venueCity}</p>
                  </div>

                  <p className="text-[10px] italic text-amber-100/70 max-w-xs mx-auto leading-normal">
                    {customDuaNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer onCheckout={() => setShowCheckout(true)} />
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
      <UserAccountModal isOpen={showAccount} onClose={() => setShowAccount(false)} />
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-espresso font-display">Loading Islamic Customization Studio...</div>}>
      <StudioContent />
    </Suspense>
  );
}
