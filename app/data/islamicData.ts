/* ═══════════════════════════════════════
   AUTHENTIC ISLAMIC PHRASES, VERSES & STYLES
   ═══════════════════════════════════════ */

export interface IslamicPhrase {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  suitableFor: ("wedding" | "eid" | "ramadan" | "general" | "sympathy" | "baby")[];
}

export const ISLAMIC_PHRASES: IslamicPhrase[] = [
  {
    id: "bismillah",
    arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    transliteration: "Bismillahir Rahmanir Raheem",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful",
    suitableFor: ["wedding", "eid", "ramadan", "general", "baby"],
  },
  {
    id: "assalamu_alaikum",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ",
    transliteration: "Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh",
    translation: "May the peace, mercy, and blessings of Allah be upon you",
    suitableFor: ["wedding", "eid", "ramadan", "general"],
  },
  {
    id: "nikah_mubarak",
    arabic: "نِكَاح مُبَارَك",
    transliteration: "Nikah Mubarak",
    translation: "Blessed Wedding Ceremony",
    suitableFor: ["wedding"],
  },
  {
    id: "barakallahu_lakuma",
    arabic: "بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    transliteration: "Barakallahu Lakuma Wa Baraka Alaykuma Wa Jama'a Baynakuma Fee Khayr",
    translation: "May Allah bless you, shower His blessings upon you, and unite you both in goodness",
    suitableFor: ["wedding"],
  },
  {
    id: "eid_mubarak",
    arabic: "عِيدٌ مُبَارَكٌ وَكُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ",
    transliteration: "Eid Mubarak Wa Kullu Aam Wa Antum Bi-Khayr",
    translation: "Blessed Eid, may you be in wellness every year",
    suitableFor: ["eid"],
  },
  {
    id: "ramadan_kareem",
    arabic: "رَمَضَانُ كَرِيمٌ وَصِيَامٌ مَقْبُولٌ",
    transliteration: "Ramadan Kareem Wa Siyamun Maqbool",
    translation: "Generous Ramadan and accepted fasting",
    suitableFor: ["ramadan"],
  },
  {
    id: "inshallah",
    arabic: "إِنْ شَاءَ ٱللَّٰهُ تَعَالَىٰ",
    transliteration: "InshaAllah Ta'ala",
    translation: "If Allah wills, Exalted is He",
    suitableFor: ["wedding", "general"],
  },
  {
    id: "mashallah",
    arabic: "مَا شَاءَ ٱللَّٰهُ تَبَارَكَ ٱللَّٰهُ",
    transliteration: "MashaAllah TabarakAllah",
    translation: "What Allah has willed; blessed is Allah",
    suitableFor: ["wedding", "baby", "general"],
  },
  {
    id: "jazakallah",
    arabic: "جَزَاكُمُ ٱللَّٰهُ خَيْرًا وَأَحْسَنَ ٱلْجَزَاءَ",
    transliteration: "Jazakumullahu Khairan Wa Ahsanal Jaza",
    translation: "May Allah reward you with goodness and the best reward",
    suitableFor: ["general", "wedding"],
  },
  {
    id: "inna_lillah",
    arabic: "إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
    transliteration: "Inna Lillahi Wa Inna Ilayhi Raji'un",
    translation: "Indeed, to Allah we belong and to Him we shall return",
    suitableFor: ["sympathy"],
  },
];

export interface QuranicVerse {
  id: string;
  arabic: string;
  reference: string;
  translation: string;
  category: "wedding" | "eid" | "ramadan" | "knowledge" | "gratitude";
}

export const QURANIC_VERSES: QuranicVerse[] = [
  {
    id: "ar-rum-21",
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    reference: "Surah Ar-Rum [30:21]",
    translation: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
    category: "wedding",
  },
  {
    id: "al-furqan-74",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    reference: "Surah Al-Furqan [25:74]",
    translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    category: "wedding",
  },
  {
    id: "al-baqarah-185",
    arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ",
    reference: "Surah Al-Baqarah [2:185]",
    translation: "The month of Ramadan in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion.",
    category: "ramadan",
  },
  {
    id: "ibrahim-7",
    arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    reference: "Surah Ibrahim [14:7]",
    translation: "If you are grateful, I will surely increase you in favor.",
    category: "gratitude",
  },
];

export interface CalligraphyStyle {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  fontClass: string;
}

export const CALLIGRAPHY_STYLES: CalligraphyStyle[] = [
  {
    id: "thuluth",
    name: "Classic Thuluth (الscript الثلث)",
    arabicName: "خط الثلث الجلي",
    description: "Grand, stately, and majestic for royal seals and formal invitations",
    fontClass: "font-arabic",
  },
  {
    id: "diwani",
    name: "Imperial Diwani (الخط الديواني)",
    arabicName: "الخط الديواني الملكي",
    description: "Flowing, poetic curves historically favored by royal sultans",
    fontClass: "font-arabic italic",
  },
  {
    id: "kufic",
    name: "Geometric Kufic (الخط الكوفي)",
    arabicName: "الخط الكوفي المربع",
    description: "Clean architectural geometry, timeless minimalism",
    fontClass: "font-kufic",
  },
  {
    id: "naskh",
    name: "Elegant Naskh (خط النسخ القرآني)",
    arabicName: "خط النسخ الرشيق",
    description: "Highly legible, sacred Quranic script with pure balance",
    fontClass: "font-arabic",
  },
];

/* ── Traditional Multi-language Wedding Invitation Phrasings ── */
export const MULTILANG_WORDING = {
  english: {
    greeting: "In the Name of Allah, the Most Gracious, the Most Merciful",
    dua: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them...",
    hostPhrase: "Together with their beloved parents & families",
    request: "cordially invite you and your family to grace the auspicious occasion of the Nikah ceremony and Walima banquet of",
    and: "&",
    blessing: "Your presence and heartfelt prayers will be our greatest gift as they embark on this blessed journey following the Sunnah of Prophet Muhammad (ﷺ).",
  },
  arabic: {
    greeting: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    dua: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    hostPhrase: "بقلوب مفعمة بالمحبة ومستبشرة برضا الرحمن، تتشرف العائلتان",
    request: "بدعوتكم لحضور عقد قران وحفل زفاف ولديهما المبارك",
    and: "وَ",
    blessing: "وبحضوركم ودعواتكم الصالحة تكتمل سعادتنا وتتنزل البركات على العروسين إن شاء الله تعالى.",
  },
  urdu: {
    greeting: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    dua: "بارک اللہ لکما وبارک علیکما وجمع بینکما فی خیر",
    hostPhrase: "ہم اپنے معزز خاندان کے ہمراہ دلی مسرت کے ساتھ",
    request: "آپ کو اپنے فرزند اور دختر نیک اختر کی پُر مسرت تقریب نکاح و دعوتِ ولیمہ میں شرکت کی دعوت دیتے ہیں",
    and: "اور",
    blessing: "آپ کی تشریف آوری اور دعاؤں کے ساتھ یہ بابرکت تقریب مزید یادگار بنے گی۔ منجانب: دونوں خاندان",
  },
  hindi: {
    greeting: "बिस्मिल्लाह हिर्रहमान निर्रहीम",
    dua: "अल्लाह आपके इस रिश्ते में बरकत और मोहब्बत अता फरमाए",
    hostPhrase: "दुआ-ए-ख़ैर के साथ दोनों परिवार आपको",
    request: "अपने अज़ीज़ बच्चों के मुक़द्दस निकाह और दावत-ए-वलीमा में शिरकत की दिली दावत पेश करते हैं",
    and: "और",
    blessing: "आपकी मौजूदगी और दुआएं हमारे लिए बाइस-ए-रहमत होंगी। इंशाअल्लाह।",
  },
};

/* ── Card Design Themes / Palettes ── */
export const ISLAMIC_THEMES = [
  {
    id: "emerald-gold",
    name: "Royal Emerald & Gold",
    primary: "#064E3B",
    accent: "#D4AF37",
    bg: "bg-emerald-deep",
    border: "border-gold/40",
    textPrimary: "text-amber-100",
    textMuted: "text-emerald-200/80",
    badge: "Most Popular",
  },
  {
    id: "midnight-navy",
    name: "Celestial Midnight Navy",
    primary: "#0B192C",
    accent: "#DFC38A",
    bg: "bg-navy-dark",
    border: "border-gold/35",
    textPrimary: "text-amber-50",
    textMuted: "text-slate-300",
    badge: "Luxury Night",
  },
  {
    id: "ivory-arabesque",
    name: "Pearl Ivory & Champagne",
    primary: "#FAF5ED",
    accent: "#B88B4A",
    bg: "bg-ivory-cream",
    border: "border-gold/30",
    textPrimary: "text-espresso",
    textMuted: "text-espresso-muted",
    badge: "Classic Sunnah",
  },
  {
    id: "moroccan-cartouche",
    name: "Moroccan Courtyard Ochre",
    primary: "#EFE5D5",
    accent: "#A77732",
    bg: "bg-ivory-sandstone",
    border: "border-amber-700/30",
    textPrimary: "text-stone-900",
    textMuted: "text-stone-600",
    badge: "Artisanal",
  },
  {
    id: "rosewater-blush",
    name: "Rosewater & Alabaster",
    primary: "#F5E4DC",
    accent: "#8A6527",
    bg: "bg-blush-soft",
    border: "border-rose-400/40",
    textPrimary: "text-rose-950",
    textMuted: "text-rose-800/80",
    badge: "Blush Walima",
  },
];
