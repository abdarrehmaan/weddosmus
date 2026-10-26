/* ═══════════════════════════════════════
   TEMPLATE DATA & TYPES
   ═══════════════════════════════════════ */

export interface Template {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  cta: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

/* ── Templates ── */
export const templates: Template[] = [
  {
    id: "muslimswedd",
    title: "Yassine & Fatima Moroccan Cartouche",
    category: "Nikah / Walima",
    price: 4499,
    originalPrice: 7999,
    image: "/wedding-hero-bg.jpg",
    features: ["Scalloped Ogee Cartouche", "BarakAllahu 3D Wax Seal", "Surah Ar-Rum Blessing"],
    badge: "Bespoke Heirloom",
    popular: true,
  },
  {
    id: "royal-palace",
    title: "Royal Noor Palace Archway",
    category: "Royal Palace",
    price: 3999,
    originalPrice: 6999,
    image: "/royal-archway.jpg",
    features: ["3D Candlelit Archway", "Rose Garland Reveal", "Live RSVP & Music"],
    badge: "Signature Theme",
    popular: true,
  },
  {
    id: "nikah-elegance",
    title: "Mughal Nikah Archway",
    category: "Nikah / Walima",
    price: 2999,
    originalPrice: 4999,
    image: "/royal-archway.jpg",
    features: ["Bismillah Calligraphy", "Duff & Oud Audio", "Arabic / Urdu Mode"],
    badge: "Most Loved",
  },
  {
    id: "modern-minimal",
    title: "Alhambra Courtyard Luxe",
    category: "Modern Minimalist",
    price: 1999,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?w=600&h=800&fit=crop&q=80",
    features: ["Clean Sandstone UI", "Fast WhatsApp Sharing", "Modest Floral Mode"],
  },
  {
    id: "destination-bliss",
    title: "Umaid Palace Heritage",
    category: "Destination Wedding",
    price: 3499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=800&fit=crop&q=80",
    features: ["Multi-Venue Navigation", "Pre-Wedding Gallery", "Live Countdown"],
    badge: "Trending",
  },
  {
    id: "mughal-heritage",
    title: "Sheesh Mahal Grandeur",
    category: "Royal Palace",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&q=80",
    features: ["3D Gate Opening", "Family Monogram Seal", "Multi-Event Chapters"],
    badge: "Bespoke Royal",
  },
  {
    id: "walima-grace",
    title: "Rosewater Walima Banquet",
    category: "Nikah / Walima",
    price: 2499,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=800&fit=crop&q=80",
    features: ["Walima Grand Feast", "Guest Count Sync", "Blush Rose Theme"],
  },
];

export const categories = ["All", "Royal Palace", "Nikah / Walima", "Modern Minimalist", "Destination Wedding"];

/* ── Pricing ── */
export const pricingTiers: PricingTier[] = [
  {
    id: "silver",
    name: "Silver",
    price: 1999,
    originalPrice: 3499,
    description: "2D Royal Motion Invite",
    features: [
      "Royal Palace Motif Animation",
      "Couple Names & Family Blessings",
      "Wedding Dates & Google Maps Venue",
      "Instant WhatsApp Sharing Card",
      "100% Mobile Responsive",
      "Delivery in 48 Hours",
    ],
    cta: "Select Silver",
  },
  {
    id: "gold",
    name: "Gold",
    price: 3499,
    originalPrice: 5999,
    description: "Full 3D Royal Archway Interactive Invite",
    features: [
      "Everything in Silver",
      "3D Palace Archway & Wax Seal Reveal",
      "Custom Duff / Oud Melodies + Silent Toggle",
      "1-Tap Google Maps Turn-by-Turn Navigation",
      "Real-Time WhatsApp RSVP Confirmation",
      "Live Days/Hours/Secs Countdown",
      "3D Pre-Wedding Photo Gallery Slider",
      "Priority 24-Hour Express Delivery",
    ],
    popular: true,
    badge: "Most Popular",
    cta: "Order Royal Gold",
  },
  {
    id: "royal",
    name: "Royal Platinum",
    price: 5999,
    originalPrice: 9999,
    description: "Custom Bespoke Palace Edition",
    features: [
      "Everything in Gold",
      "Custom Monogram on 3D Wax Seal",
      "Bespoke Multi-Event Chapters (Mehendi, Sangeet, Nikah, Walima)",
      "Custom Domain Setup (e.g. ahmadandfatima.com)",
      "Bespoke Color Palette & Floral Arrangement",
      "Dedicated Royal Wedding Designer",
      "Ultra-Fast 12-Hour Priority Delivery",
      "30 Days of Unlimited Revisions",
    ],
    badge: "Bespoke Royal",
    cta: "Go Royal Platinum",
  },
];

/* ── FAQs ── */
export const faqs: FAQ[] = [
  {
    question: "Do I need any coding or technical skills to edit or use this?",
    answer: "Zero technical skills needed! You simply provide your details (names, dates, venues, photos) through our quick form or directly on WhatsApp, and our royal design team handles the entire 3D build, animations, and cloud hosting for you.",
  },
  {
    question: "How does the 3D candlelit palace archway animation work for guests?",
    answer: "When your guests tap your wedding link on their smartphone, they are welcomed by a grand candlelit palace archway with climbing roses. A levitating 3D golden wax seal invites them to tap, smoothly unfolding the arch into your personalized wedding timeline, live countdown, Google Maps, and RSVP.",
  },
  {
    question: "Can I customize this for Islamic Nikah / Walima with modest duff music?",
    answer: "Yes, absolutely! The invitation includes authentic Arabic Bismillah calligraphy, customizable Quranic duas (Surah Ar-Rum), an optional Duff-only traditional rhythm or Oud melody, and a one-tap modest silent mode. We also offer a photo-less floral calligraphy version.",
  },
  {
    question: "How do RSVPs and guest counts reach me?",
    answer: "Guests confirm their attendance, number of attendees, dietary notes, and heartfelt prayers via the built-in RSVP module. Each confirmation is sent directly to your WhatsApp with all information neatly organized.",
  },
  {
    question: "Do I or my guests need to download any app?",
    answer: "No app required! The website opens instantly in any browser (Safari, Chrome, WhatsApp in-app browser) within 1.5 seconds on both iPhones and Android phones.",
  },
  {
    question: "Are there any recurring or monthly hosting fees?",
    answer: "No monthly fees whatsoever. Every tier includes free cloud CDN hosting for 6 months, giving your guests ample time before, during, and after your wedding celebrations.",
  },
  {
    question: "Can I request changes if wedding dates or venues change?",
    answer: "Yes! Silver and Gold tiers come with 7 days of complimentary post-delivery edits, while Royal Platinum includes 30 days of unlimited free revisions.",
  },
];

/* ── Bento Features ── */
export const bentoFeatures = [
  {
    icon: "Box",
    title: "3D Candlelit Archway & Wax Seal",
    description: "Guests tap an antique golden wax seal to open a majestic Moorish archway with hanging brass lanterns and cascading rose garlands.",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: "Music",
    title: "Duff & Oud Wedding Melodies",
    description: "Serenade your guests with traditional Duff rhythms or Oud acoustics, paired with an instant one-tap silent / modest toggle.",
    span: "col-span-1",
  },
  {
    icon: "MapPin",
    title: "1-Tap Google Maps Navigation",
    description: "Eliminate event-day confusion. Every ceremony card (Nikah, Barat, Walima) includes a direct GPS navigation button.",
    span: "col-span-1",
  },
  {
    icon: "Users",
    title: "Real-Time WhatsApp RSVP Sync",
    description: "Receive confirmations, headcount, dietary preferences, and duas sent directly to your phone without cumbersome spreadsheets.",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: "Image",
    title: "3D Pre-Wedding Photo Gallery",
    description: "Showcase your pre-wedding portraits in a depth-of-field carousel or choose our modest floral calligraphy gallery.",
    span: "col-span-1",
  },
  {
    icon: "Share2",
    title: "Rich WhatsApp Preview Sharing",
    description: "Share your custom link across WhatsApp, Instagram Stories, and iMessage with an opulent preview card and custom domain.",
    span: "col-span-1",
  },
];
