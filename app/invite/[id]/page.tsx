"use client";

import { useState, useEffect, useRef } from "react";
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
import { useParams, useSearchParams } from "next/navigation";
import { templates } from "@/app/data/templates";
import { weddingAudio } from "@/app/invite/synthAudio";
import MuslimsWeddInvitePage from "@/app/invite/muslimswedd/page";

// ── Multilingual Dictionary ──
const TRANSLATIONS = {
  en: {
    bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    bismillahTrans: "In the name of Allah, the Most Gracious, the Most Merciful",
    together: "Together with their beloved families",
    couple: "Ahmad & Fatima",
    request: "request the honor of your presence and blessings at the celebration of their holy union",
    guestIntro: "Specially Prepared For:",
    honoredGuest: "Honored Guest",
    tapToOpen: "Tap the Wax Seal to Open",
    openPrompt: "Experience the royal 3D invitation experience",
    countdownTitle: "Countdown to Grand Celebration",
    days: "Days",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    eventsTitle: "Ceremony & Events",
    eventsSubtitle: "Join us across each blessed chapter of our wedding",
    nikah: "Nikah Ceremony",
    nikahDesc: "Solemnization of marriage following Sunnah in the Grand Mosque",
    nikahTime: "Friday, Nov 27 • 11:30 AM",
    nikahVenue: "Noor-ul-Huda Grand Mosque, Emerald Hall",
    walima: "Walima Banquet",
    walimaDesc: "Grand celebratory dinner & royal reception with family and friends",
    walimaTime: "Saturday, Nov 28 • 07:30 PM",
    walimaVenue: "The Royal Noor Palace Banquet & Courtyard",
    addToCal: "Add to Calendar",
    venueTitle: "Venue & Location",
    getDirections: "Open in Google Maps",
    rsvpTitle: "RSVP & Guest Confirmation",
    rsvpSubtitle: "Please grace us with your response by November 15",
    attendingQ: "Will you be attending?",
    joyfullyAccept: "Joyfully Accepts",
    regretfullyDecline: "Regretfully Declines",
    guestCountQ: "Number of Guests Attending",
    dietaryQ: "Meal Preference",
    dietaryHalal: "Royal Mughlai Feast (Halal)",
    dietaryVeg: "Pure Vegetarian Delight",
    dietarySpecial: "Special Dietary / Gluten-Free",
    notesQ: "Blessings & Wishes for the Couple",
    notesPlaceholder: "Write your heartfelt prayers, dua, or message...",
    sendWhatsApp: "Submit & Confirm via WhatsApp",
    submitInstant: "Instant RSVP Confirm",
    rsvpSuccess: "Thank You! Your RSVP is Recorded",
    rsvpSuccessSub: "We look forward to welcoming you with warmth and joy.",
    shareTitle: "Share Invitation with Guests",
    shareDesc: "Generate a personalized WhatsApp invite link with the guest's name",
    guestNamePlaceholder: "e.g. Uncle Tariq & Family",
    generateLink: "Send on WhatsApp",
    copyLink: "Copy Link",
    copied: "Copied!",
    soundPlaying: "Sound Playing",
    soundMuted: "Sound Muted",
    duffOudDesc: "Traditional Duff & Oud Live Synthesizer",
  },
  ar: {
    bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    bismillahTrans: "بارك الله لكما وبارك عليكما وجمع بينكما في خير",
    together: "بقلوب ملؤها المودة والمحبة، تتشرف عائلتا",
    couple: "أحمد & فاطمة",
    request: "بدعوتكم لمشاركتنا فرحة عقد القران والوليمة المباركة",
    guestIntro: "دعوة كريمة موجهة إلى:",
    honoredGuest: "الضيف الكريم",
    tapToOpen: "اضغط على الختم الملكي لفتح الدعوة",
    openPrompt: "دعوة زفاف تفاعلية ثلاثية الأبعاد",
    countdownTitle: "العد التنازلي ليوم الفرح",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوانٍ",
    eventsTitle: "مراسم الحفل والوليمة",
    eventsSubtitle: "نسعد بحضوركم ومشاركتكم في بهجة هذه الأيام المباركة",
    nikah: "عقد القران (النكاح)",
    nikahDesc: "مراسم عقد القران المبارك في رحاب المسجد الجامع",
    nikahTime: "الجمعة، ٢٧ نوفمبر • ١١:٣٠ صباحاً",
    nikahVenue: "جامع نور الهدى الكبير • قاعة الزمرد",
    walima: "حفل الوليمة والاستقبال",
    walimaDesc: "مأدبة العشاء الملكية واستقبال المهنئين",
    walimaTime: "السبت، ٢٨ نوفمبر • ٠٧:٣٠ مساءً",
    walimaVenue: "قصر النور الملكي • القاعة الكبرى",
    addToCal: "إضافة للتقويم",
    venueTitle: "موقع الحفل والوصول",
    getDirections: "فتح الموقع على خرائط جوجل",
    rsvpTitle: "تأكيد الحضور (RSVP)",
    rsvpSubtitle: "نرجو التكرم بتأكيد الحضور قبل ١٥ نوفمبر",
    attendingQ: "هل ستشرفوننا بالحضور؟",
    joyfullyAccept: "بكل سرور، سأحضر",
    regretfullyDecline: "أعتذر لعدم التمكن",
    guestCountQ: "عدد الضيوف الحاضرين",
    dietaryQ: "الوجبة المفضلة",
    dietaryHalal: "بوفيه ملكي حلال",
    dietaryVeg: "نباتي فاخر",
    dietarySpecial: "وجبة خاصة / خالية من الغلوتين",
    notesQ: "دعواتكم وتمنياتكم الطيبة للعروسين",
    notesPlaceholder: "اكتبوا دعاءكم وكلماتكم الطيبة هنا...",
    sendWhatsApp: "تأكيد وإرسال عبر واتساب",
    submitInstant: "تأكيد فوري",
    rsvpSuccess: "شكراً جزيلاً! تم تأكيد حضوركم بنجاح",
    rsvpSuccessSub: "نسعد ونتشرف بوجودكم معنا في هذا اليوم السعيد.",
    shareTitle: "إرسال الدعوة إلى الأقارب والأصدقاء",
    shareDesc: "إنشاء رابط مخصص باسم الضيف وإرساله عبر واتساب",
    guestNamePlaceholder: "مثال: العم طارق والعائلة",
    generateLink: "إرسال عبر واتساب",
    copyLink: "نسخ الرابط",
    copied: "تم النسخ!",
    soundPlaying: "الصوت يعمل",
    soundMuted: "الصوت صامت",
    duffOudDesc: "أنغام الدف والعود الشرقية المباشرة",
  },
  ur: {
    bismillah: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    bismillahTrans: "خلوصِ دل اور دعاؤں کے ساتھ تشریف لائیے",
    together: "باہمی رضا مندی اور والدین کی مسرتوں کے ساتھ",
    couple: "احمد اور فاطمہ",
    request: "آپ کی معزز اور پُروقار شرکت کے تہہ دل سے متمنی و مشکور ہیں",
    guestIntro: "بخدمتِ جناب معزز مہمان:",
    honoredGuest: "محترم مہمانِ گرامی",
    tapToOpen: "دعوت نامہ کھولنے کے لیے شاہی مہر پر کلک کریں",
    openPrompt: "تھری ڈی شاہی ڈیجیٹل دعوت نامہ",
    countdownTitle: "شادی کی پروقار تقریب میں باقی وقت",
    days: "دن",
    hours: "گھنٹے",
    minutes: "منٹ",
    seconds: "سیکنڈ",
    eventsTitle: "تقریبات کا شیڈول",
    eventsSubtitle: "ہماری زندگی کے اس پُرمسرت آغاز میں شرکت فرمائیں",
    nikah: "مراسمِ نکاح",
    nikahDesc: "مسنون طریقہ پر مسجد کے احاطہ میں عقدِ نکاح کی تقریب",
    nikahTime: "جمعہ، 27 نومبر • صبح 11:30 بجے",
    nikahVenue: "جامع نور الہدیٰ، ایمرلڈ ہال",
    walima: "دعوتِ ولیمہ",
    walimaDesc: "عزیز و اقارب کے ساتھ شاہی دعوت و ضیافت",
    walimaTime: "ہفتہ، 28 نومبر • شام 07:30 بجے",
    walimaVenue: "دی رائل نور پیلس بینکوئٹ",
    addToCal: "کیلنڈر میں محفوظ کریں",
    venueTitle: "مقام اور نقشہ",
    getDirections: "گوگل میپس پر راستہ دیکھیں",
    rsvpTitle: "اطلاعِ آمد و تصدیق (RSVP)",
    rsvpSubtitle: "براہ کرم 15 نومبر تک اپنی تشریف آوری کی اطلاع فرمائیں",
    attendingQ: "کیا آپ شرکت فرما رہے ہیں؟",
    joyfullyAccept: "ضرور شرکت کریں گے",
    regretfullyDecline: "معذرت خواہ ہیں",
    guestCountQ: "شرکاء کی تعداد",
    dietaryQ: "طعام کی پسند",
    dietaryHalal: "شاہی مغلائی ضیافت",
    dietaryVeg: "سبزی خور طعام",
    dietarySpecial: "مخصوص طعام",
    notesQ: "نئے جوڑے کے لیے نیک تمنائیں اور دعائیں",
    notesPlaceholder: "دعا اور پیغامات یہاں تحریر فرمائیں...",
    sendWhatsApp: "واٹس ایپ کے ذریعے تصدیق بھیجیں",
    submitInstant: "فوری تصدیق",
    rsvpSuccess: "بہت شکریہ! آپ کی شرکت کی تصدیق درج ہو گئی ہے",
    rsvpSuccessSub: "ہم آپ کی خوشگوار تشریف آوری کے منتظر ہیں۔",
    shareTitle: "مہمانوں کو واٹس ایپ پر بھیجیں",
    shareDesc: "مہمان کے نام کے ساتھ خصوصی لنک تیار کریں",
    guestNamePlaceholder: "مثلاً: چچا طارق اور اہلِ خانہ",
    generateLink: "واٹس ایپ پر روانہ کریں",
    copyLink: "لنک کاپی کریں",
    copied: "کاپی ہو گیا!",
    soundPlaying: "موسیقی جاری ہے",
    soundMuted: "آواز بند ہے",
    duffOudDesc: "روایتی دف اور عود کی دھیمی مدھر دھن",
  },
};

type LangKey = "en" | "ar" | "ur";

export default function InteractiveInvitationPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // Find template or default to Royal Palace
  const templateId = (params?.id as string) || "royal-palace";
  if (templateId === "muslimswedd") {
    return <MuslimsWeddInvitePage />;
  }
  const currentTemplate =
    templates.find((t) => t.id === templateId) || templates[0];

  // Language state
  const [lang, setLang] = useState<LangKey>("en");
  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar" || lang === "ur";

  // Guest name from URL (e.g. ?guest=Uncle+Tariq)
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    const guestParam = searchParams.get("guest") || searchParams.get("to");
    if (guestParam) {
      setGuestName(guestParam);
    }
  }, [searchParams]);

  // Envelope Interactive State
  const [isOpened, setIsOpened] = useState(false);
  const [isFlapOpening, setIsFlapOpening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Active Event Tab
  const [activeTab, setActiveTab] = useState<"nikah" | "walima">("nikah");

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
    days: "24",
    hours: "08",
    minutes: "42",
    seconds: "15",
  });

  useEffect(() => {
    const targetDate = new Date("2026-11-27T11:30:00").getTime();
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
  }, []);

  // Handle Envelope Open with Audio and Sequence
  const handleOpenEnvelope = () => {
    weddingAudio.playSealBreak();
    setIsFlapOpening(true);

    // Start background duff & oud music
    setTimeout(() => {
      weddingAudio.start();
      setIsPlayingAudio(true);
    }, 350);

    // Slide letter out
    setTimeout(() => {
      setIsOpened(true);
    }, 850);
  };

  // Toggle Audio
  const handleToggleAudio = () => {
    const state = weddingAudio.toggle();
    setIsPlayingAudio(state);
  };

  // WhatsApp RSVP submission
  const handleWhatsAppRSVP = () => {
    const name = guestName.trim() || "Guest";
    const statusText =
      attendance === "yes"
        ? `✅ Joyfully Accepts (${guestCount} Guests)`
        : `❌ Regretfully Declines`;
    const mealText =
      dietary === "halal"
        ? "Mughlai Feast (Halal)"
        : dietary === "veg"
        ? "Vegetarian"
        : "Special Diet";
    const noteText = wishes.trim() ? `\n\nWishes: "${wishes}"` : "";

    const message = `*RSVP for Ahmad & Fatima's Wedding*\n\n*Name:* ${name}\n*Status:* ${statusText}\n*Meal Preference:* ${mealText}${noteText}\n\n_Sent via Wedos 3D Invitation_`;

    const encoded = encodeURIComponent(message);
    // Open WhatsApp link
    window.open(`https://wa.me/919876543210?text=${encoded}`, "_blank");
    setRsvpSubmitted(true);
  };

  // Instant In-App RSVP
  const handleInstantRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  // Generate Personalized WhatsApp Share Link for Hosts
  const getPersonalizedUrl = () => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/invite/${templateId}`;
    if (!shareGuestInput.trim()) return base;
    return `${base}?guest=${encodeURIComponent(shareGuestInput.trim())}`;
  };

  const handleShareToWhatsApp = () => {
    const targetUrl = getPersonalizedUrl();
    const guestLabel = shareGuestInput.trim() || "our honored guest";
    const text = `Assalamu Alaikum *${guestLabel}*,\n\nYou are cordially invited to celebrate the Nikah & Walima of *Ahmad & Fatima*.\n\nPlease open your personalized 3D royal invitation card here:\n${targetUrl}`;
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
      className={`min-h-screen bg-[#11071F] text-[#F8F3E9] selection:bg-[#DFC38A]/30 selection:text-white ${
        isRTL ? "font-serif" : "font-sans"
      } relative overflow-x-hidden`}
    >
      {/* Background Palace Ambiance */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Image
          src="/royal-archway.jpg"
          alt="Palace Ambience"
          fill
          priority
          className="object-cover object-center opacity-30 blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#11071F]/90 via-[#1A0A2E]/85 to-[#0D0418]/95" />
      </div>

      {/* Floating Sparkles & Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-10 w-[350px] h-[350px] rounded-full bg-rose-500/10 blur-[100px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STEP 1: 3D UNBOXING & ANIMATED ENVELOPE (WooowInvites Hook)
         ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-radial from-[#240e3b] via-[#150726] to-[#0a0314]"
          >
            {/* Top Wedos Brand Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 text-xs tracking-widest uppercase text-amber-200/70 font-sans">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Wedos 3D Interactive Invitation</span>
            </div>

            {/* Language Switcher on Envelope Screen */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full p-1 border border-amber-300/20 text-xs">
              {(["en", "ar", "ur"] as LangKey[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full uppercase transition-all ${
                    lang === l
                      ? "bg-amber-400 text-espresso font-bold shadow-md"
                      : "text-amber-100/70 hover:text-white"
                  }`}
                >
                  {l === "en" ? "EN" : l === "ar" ? "عربي" : "اردو"}
                </button>
              ))}
            </div>

            {/* Guest Special Greeting Header */}
            {guestName && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-center px-4"
              >
                <span className="text-[11px] uppercase tracking-[3px] text-amber-300/80 font-medium">
                  {t.guestIntro}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-amber-100 drop-shadow-md mt-1">
                  {guestName}
                </h3>
              </motion.div>
            )}

            {/* 3D Envelope Container with Real Perspective */}
            <div className="relative w-[320px] sm:w-[380px] h-[230px] sm:h-[260px] perspective-[1200px]">
              {/* Floating levitation wrapper */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateX: [0, 2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full transform-style-3d cursor-pointer"
                onClick={handleOpenEnvelope}
              >
                {/* Envelope Base Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/60 rounded-full blur-xl transform rotate-x-60" />

                {/* Envelope Pocket Body (Ivory Silk Texture) */}
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#FFFBF2] via-[#F5ECD7] to-[#E5D5B5] p-2 border-2 border-[#DFC38A] shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(212,168,71,0.35)] overflow-hidden">
                  {/* Subtle Arch Foil Pattern Overlay */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, #B88B4A 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Corner Golden Filigree Ornaments */}
                  <div className="absolute top-2 left-2 text-[#B88B4A]/60 text-lg select-none">
                    ✦
                  </div>
                  <div className="absolute top-2 right-2 text-[#B88B4A]/60 text-lg select-none">
                    ✦
                  </div>
                  <div className="absolute bottom-2 left-2 text-[#B88B4A]/60 text-lg select-none">
                    ✦
                  </div>
                  <div className="absolute bottom-2 right-2 text-[#B88B4A]/60 text-lg select-none">
                    ✦
                  </div>

                  {/* Envelope Interior Fold Lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full flex flex-col justify-between">
                      {/* Left and Right Fold Diagonals */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(45deg, #e3cfab 0%, transparent 45%), linear-gradient(-45deg, #dfc89f 0%, transparent 45%)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Inner Card Letter Peeking Out */}
                  <motion.div
                    animate={
                      isFlapOpening
                        ? { y: -80, scale: 1.05 }
                        : { y: 0, scale: 1 }
                    }
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-x-5 top-5 bottom-5 rounded-xl bg-gradient-to-b from-[#1F0A38] to-[#140526] border border-amber-300/40 p-4 flex flex-col items-center justify-center text-center shadow-inner"
                  >
                    <div className="text-amber-300 text-sm font-serif">
                      بِسْمِ ٱللَّهِ
                    </div>
                    <div className="font-display text-lg font-bold text-amber-100 mt-1">
                      Ahmad & Fatima
                    </div>
                    <div className="text-[10px] text-rose-300/80 tracking-widest uppercase mt-0.5">
                      Royal Palace Wedding
                    </div>
                  </motion.div>

                  {/* 3D Animated Top Flap */}
                  <motion.div
                    animate={{
                      rotateX: isFlapOpening ? -180 : 0,
                    }}
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                    style={{
                      transformOrigin: "top center",
                      clipPath: "polygon(0 0, 100% 0, 50% 88%)",
                    }}
                    className="absolute top-0 left-0 right-0 h-[62%] bg-gradient-to-b from-[#FAF4E6] to-[#DFC89F] border-b border-[#B88B4A] shadow-md z-20 flex items-start justify-center pt-2"
                  >
                    <span className="text-[10px] uppercase tracking-[4px] text-[#8C642B] font-bold">
                      Wedos Royal Suite
                    </span>
                  </motion.div>

                  {/* 3D Royal Wax Seal Button */}
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      isFlapOpening
                        ? { scale: [1, 1.25, 0], opacity: [1, 0.8, 0] }
                        : { scale: [1, 1.04, 1] }
                    }
                    transition={{
                      scale: isFlapOpening
                        ? { duration: 0.5 }
                        : { repeat: Infinity, duration: 2.5 },
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#A82828] via-[#7F1717] to-[#4C0B0B] border-2 border-[#DFC38A] shadow-[0_10px_25px_rgba(127,23,23,0.7),0_0_20px_rgba(223,195,138,0.5)] flex flex-col items-center justify-center cursor-pointer group"
                  >
                    <span className="font-display font-bold text-amber-100 text-lg sm:text-xl tracking-wider drop-shadow">
                      A&F
                    </span>
                    <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-amber-200/90 font-medium group-hover:text-white transition-colors">
                      OPEN
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Helper Prompt Beneath Envelope */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 text-center space-y-2"
            >
              <button
                onClick={handleOpenEnvelope}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-espresso font-bold text-sm shadow-[0_10px_25px_rgba(212,168,71,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-espresso" />
                <span>{t.tapToOpen}</span>
              </button>
              <p className="text-xs text-amber-200/60">{t.openPrompt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
          STEP 2: FULL REVEALED INVITATION SUITE (Interactive Web Page)
         ═══════════════════════════════════════════════════════════ */}
      {/* Sticky Utility Header */}
      <header className="sticky top-0 z-40 w-full bg-[#150726]/85 backdrop-blur-md border-b border-amber-300/20 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-amber-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Wedos</span>
          </Link>

          {/* Center Brand */}
          <div className="text-center font-display text-sm sm:text-base font-bold text-amber-100 flex items-center gap-1.5">
            <span>Ahmad & Fatima</span>
            <span className="text-rose-400">♥</span>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle with Live Synthesizer Wave */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isPlayingAudio
                  ? "bg-amber-400 text-espresso border-amber-300 shadow-[0_0_15px_rgba(212,168,71,0.4)]"
                  : "bg-white/10 text-amber-200 border-white/20 hover:bg-white/20"
              }`}
              title={isPlayingAudio ? t.soundPlaying : t.soundMuted}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span className="hidden sm:inline text-[11px] font-bold">
                    Duff & Oud
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-70" />
                  <span className="hidden sm:inline text-[11px]">Play Music</span>
                </>
              )}
            </button>

            {/* Language Dropdown / Buttons */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-amber-300/20 text-[11px]">
              {(["en", "ar", "ur"] as LangKey[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                    lang === l
                      ? "bg-amber-400 text-espresso font-bold"
                      : "text-amber-100/70 hover:text-white"
                  }`}
                >
                  {l === "en" ? "EN" : l === "ar" ? "عربي" : "اردو"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* ── SECTION 1: ROYAL ARCHWAY HERO CARD ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border-2 border-amber-300/40 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_50px_rgba(212,168,71,0.25)] bg-gradient-to-b from-[#240e3b] to-[#120421] p-6 sm:p-10 text-center"
        >
          {/* Palace Arch Border Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <Image
              src="/royal-archway.jpg"
              alt="Archway"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Top Golden Bismillah */}
          <div className="relative z-10 space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs tracking-widest uppercase font-medium">
              ✦ Blessed Union ✦
            </div>

            <div className="text-2xl sm:text-4xl text-amber-200 font-serif leading-relaxed drop-shadow">
              {t.bismillah}
            </div>
            <p className="text-xs sm:text-sm text-amber-100/70 italic max-w-lg mx-auto">
              "{t.bismillahTrans}"
            </p>

            {/* Personalized Guest Badge */}
            {guestName && (
              <div className="my-6 inline-block py-2.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-300/40 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-[3px] text-amber-300 font-bold block">
                  {t.guestIntro}
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-white drop-shadow">
                  {guestName}
                </span>
              </div>
            )}

            <div className="pt-4 space-y-2">
              <p className="text-xs sm:text-sm text-amber-200/80 uppercase tracking-[3px] font-medium">
                {t.together}
              </p>
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 drop-shadow-lg">
                {t.couple}
              </h1>
              <p className="text-xs sm:text-sm text-rose-200/90 max-w-md mx-auto leading-relaxed pt-2">
                {t.request}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── SECTION 2: LIVE WEDDING COUNTDOWN ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-black/40 backdrop-blur-md border border-amber-300/30 p-6 sm:p-8 text-center shadow-xl space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{t.countdownTitle}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-amber-300/20 shadow-md">
              <span className="text-2xl sm:text-4xl font-display font-bold text-amber-300 block">
                {countdown.days}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-100/70 uppercase tracking-wider">
                {t.days}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-amber-300/20 shadow-md">
              <span className="text-2xl sm:text-4xl font-display font-bold text-amber-300 block">
                {countdown.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-100/70 uppercase tracking-wider">
                {t.hours}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-amber-300/20 shadow-md">
              <span className="text-2xl sm:text-4xl font-display font-bold text-amber-300 block">
                {countdown.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-100/70 uppercase tracking-wider">
                {t.minutes}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-amber-300/20 shadow-md">
              <span className="text-2xl sm:text-4xl font-display font-bold text-amber-300 block">
                {countdown.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-100/70 uppercase tracking-wider">
                {t.seconds}
              </span>
            </div>
          </div>
        </motion.section>

        {/* ── SECTION 3: MULTI-EVENT SCHEDULE TABS ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="text-center space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-100">
              {t.eventsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70">
              {t.eventsSubtitle}
            </p>
          </div>

          {/* Event Tab Selector */}
          <div className="flex justify-center gap-2 p-1.5 bg-black/50 rounded-2xl max-w-sm mx-auto border border-amber-300/20">
            <button
              onClick={() => setActiveTab("nikah")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "nikah"
                  ? "bg-amber-400 text-espresso shadow-lg"
                  : "text-amber-200/70 hover:text-white"
              }`}
            >
              {t.nikah}
            </button>
            <button
              onClick={() => setActiveTab("walima")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "walima"
                  ? "bg-amber-400 text-espresso shadow-lg"
                  : "text-amber-200/70 hover:text-white"
              }`}
            >
              {t.walima}
            </button>
          </div>

          {/* Active Tab Card */}
          <AnimatePresence mode="wait">
            {activeTab === "nikah" ? (
              <motion.div
                key="nikah"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-gradient-to-br from-[#200A38] to-[#140526] p-6 sm:p-8 border border-amber-300/30 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-amber-300/20 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-400/40 px-2.5 py-1 rounded-full">
                      Sacred Sunnah Chapter
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-100">
                      {t.nikah}
                    </h3>
                  </div>
                  <Calendar className="w-8 h-8 text-amber-400 opacity-80" />
                </div>

                <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                  {t.nikahDesc}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-amber-300/10">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.nikahTime}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-amber-300/10">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.nikahVenue}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nikah+Ceremony+-+Ahmad+%26+Fatima&dates=20261127T060000Z/20261127T090000Z&details=Sacred+Nikah+Ceremony&location=Grand+Mosque"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-200 hover:text-espresso font-semibold text-xs transition-all border border-amber-400/40"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.addToCal}</span>
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t.getDirections}</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="walima"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-gradient-to-br from-[#280c2e] to-[#15041a] p-6 sm:p-8 border border-amber-300/30 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-amber-300/20 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-rose-300 font-bold bg-rose-950/60 border border-rose-400/40 px-2.5 py-1 rounded-full">
                      Grand Royal Feast
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-100">
                      {t.walima}
                    </h3>
                  </div>
                  <Sparkles className="w-8 h-8 text-amber-400 opacity-80" />
                </div>

                <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                  {t.walimaDesc}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-amber-300/10">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.walimaTime}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-amber-300/10">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.walimaVenue}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Walima+Banquet+-+Ahmad+%26+Fatima&dates=20261128T140000Z/20261128T180000Z&details=Royal+Walima+Banquet+Dinner&location=Royal+Palace+Courtyard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-200 hover:text-espresso font-semibold text-xs transition-all border border-amber-400/40"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.addToCal}</span>
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t.getDirections}</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ── SECTION 4: INTERACTIVE RSVP SECTION (WooowInvites Signature Feature) ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-b from-[#220B38] to-[#120421] border-2 border-amber-300/40 p-6 sm:p-10 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[3px] text-amber-300 font-bold">
              Confirm Your Presence
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-100">
              {t.rsvpTitle}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70">
              {t.rsvpSubtitle}
            </p>
          </div>

          {rsvpSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-400/40 text-center space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-display text-xl font-bold text-white">
                {t.rsvpSuccess}
              </h3>
              <p className="text-xs text-emerald-200/80 max-w-sm mx-auto">
                {t.rsvpSuccessSub}
              </p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="mt-2 text-xs text-amber-300 underline cursor-pointer"
              >
                Edit my RSVP details
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleInstantRSVP} className="space-y-5">
              {/* Guest Name input */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-amber-200">
                  Your Full Name / Family Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Tariq Khan & Family"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-300/30 text-amber-100 placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Attendance toggle */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-amber-200">
                  {t.attendingQ}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance("yes")}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      attendance === "yes"
                        ? "bg-amber-400 text-espresso border-amber-300 shadow-lg"
                        : "bg-black/30 text-amber-200/70 border-white/10 hover:bg-black/50"
                    }`}
                  >
                    ✓ {t.joyfullyAccept}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance("no")}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      attendance === "no"
                        ? "bg-rose-900/80 text-rose-100 border-rose-400 shadow-lg"
                        : "bg-black/30 text-amber-200/70 border-white/10 hover:bg-black/50"
                    }`}
                  >
                    ✗ {t.regretfullyDecline}
                  </button>
                </div>
              </div>

              {attendance === "yes" && (
                <>
                  {/* Guest count */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-amber-200">
                      {t.guestCountQ}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            guestCount === num
                              ? "bg-amber-400 text-espresso border-amber-300"
                              : "bg-black/30 text-amber-100 border-white/10"
                          }`}
                        >
                          {num} {num === 1 ? "Person" : "People"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary preference */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-amber-200">
                      {t.dietaryQ}
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-300/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="halal" className="bg-[#1F0A38] text-white">
                        {t.dietaryHalal}
                      </option>
                      <option value="veg" className="bg-[#1F0A38] text-white">
                        {t.dietaryVeg}
                      </option>
                      <option value="special" className="bg-[#1F0A38] text-white">
                        {t.dietarySpecial}
                      </option>
                    </select>
                  </div>
                </>
              )}

              {/* Blessings message */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-amber-200">
                  {t.notesQ}
                </label>
                <textarea
                  rows={3}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-300/30 text-amber-100 placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppRSVP}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendWhatsApp}</span>
                </button>

                <button
                  type="submit"
                  className="sm:w-auto py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-300/30 text-amber-200 font-semibold text-sm transition-all cursor-pointer"
                >
                  {t.submitInstant}
                </button>
              </div>
            </form>
          )}
        </motion.section>

        {/* ── SECTION 5: HOST PERSONALIZED WHATSAPP INVITE GENERATOR TOOL ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-black/50 border border-amber-300/20 p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-bold">
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>{t.shareTitle}</span>
          </div>

          <p className="text-xs text-amber-200/80">{t.shareDesc}</p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={shareGuestInput}
              onChange={(e) => setShareGuestInput(e.target.value)}
              placeholder={t.guestNamePlaceholder}
              className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-amber-300/30 text-sm text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleShareToWhatsApp}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.generateLink}</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copyLink}</span>
                </>
              )}
            </button>
          </div>
        </motion.section>

        {/* Footer info */}
        <footer className="text-center pt-8 pb-12 text-xs text-amber-200/50 space-y-2">
          <p>
            Designed with love & royal precision by{" "}
            <Link href="/" className="text-amber-300 underline font-semibold">
              Wedos 3D Wedding Invitations
            </Link>
          </p>
          <p>© {new Date().getFullYear()} Wedos. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
