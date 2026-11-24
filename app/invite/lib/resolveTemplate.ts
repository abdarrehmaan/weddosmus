import { Template, templates } from "@/app/data/templates";
import { AudioThemeMode } from "../synthAudio";

export interface ResolvedThemeStyles {
  themeId: string;
  themeName: string;
  // Flap SVG Gradient
  flap0: string;
  flap60: string;
  flap100: string;
  flapStroke: string;
  // Envelope Body
  envelopeBg: string;
  envelopeBodyGradient: string;
  // 3D Wax Seal
  sealBronzeLight: string;
  sealBronze: string;
  sealBronzeDark: string;
  sealArabicColor: string;
  sealMonogramColor: string;
  sealBorderDash: string;
  // Scalloped Cartouche Arch
  cartoucheParchmentStart: string;
  cartoucheParchmentMid: string;
  cartoucheParchmentEnd: string;
  cartoucheFiligree: string;
  cartoucheFiligreeLight: string;
  cartoucheFiligreeDark: string;
  // Colors & Typography
  heroBgOverlay: string;
  bodyBg: string;
  bismillahColor: string;
  namesColor: string;
  subtextColor: string;
  dateColor: string;
  accentGold: string;
  // Backward compatibility fields
  textPrimary: string;
  textMuted: string;
  cardBg: string;
  cardBorder: string;
  envelopeOuter?: string;
  envelopeFlap?: string;
  sealGradient?: string;
  sealBorder?: string;
  sealShadow?: string;
  accentBadge?: string;
}

export const THEME_STYLES: Record<string, ResolvedThemeStyles> = {
  "moroccan-cartouche": {
    themeId: "moroccan-cartouche",
    themeName: "Moroccan Courtyard Ochre",
    flap0: "#F2E3DA",
    flap60: "#E9D6CA",
    flap100: "#DEC4B3",
    flapStroke: "#C59B48",
    envelopeBg: "#EFE0D6",
    envelopeBodyGradient: "linear-gradient(180deg, #EAD7CB 0%, #E8D3C6 45%, #E2C9BA 100%)",
    sealBronzeLight: "#5A3F2E",
    sealBronze: "#3B271A",
    sealBronzeDark: "#23160D",
    sealArabicColor: "#D3A76C",
    sealMonogramColor: "#C09A64",
    sealBorderDash: "rgba(60, 38, 24, 0.5)",
    cartoucheParchmentStart: "#FCFAF6",
    cartoucheParchmentMid: "#F8F2E8",
    cartoucheParchmentEnd: "#EFE4D4",
    cartoucheFiligree: "#C59B48",
    cartoucheFiligreeLight: "#D4A757",
    cartoucheFiligreeDark: "#9E7528",
    heroBgOverlay: "linear-gradient(180deg, rgba(35, 22, 13, 0.72) 0%, rgba(45, 29, 20, 0.52) 50%, rgba(20, 13, 8, 0.85) 100%)",
    bodyBg: "#1E110A",
    bismillahColor: "#3D2B24",
    namesColor: "#2A1B14",
    subtextColor: "#6E5346",
    dateColor: "#3D2B24",
    accentGold: "#C59B48",
    textPrimary: "text-[#FDF8F3]",
    textMuted: "text-[#D8BEA5]",
    cardBg: "bg-[#2B1B12]/95",
    cardBorder: "border-[#C59B48]/40",
  },
  "emerald-gold": {
    themeId: "emerald-gold",
    themeName: "Royal Emerald & 24K Gold",
    flap0: "#0B4232",
    flap60: "#083327",
    flap100: "#052219",
    flapStroke: "#D4AF37",
    envelopeBg: "#062A1F",
    envelopeBodyGradient: "linear-gradient(180deg, #09382B 0%, #062B21 45%, #041E17 100%)",
    sealBronzeLight: "#184E3F",
    sealBronze: "#0D3328",
    sealBronzeDark: "#061F18",
    sealArabicColor: "#F5DE98",
    sealMonogramColor: "#D4AF37",
    sealBorderDash: "rgba(212, 175, 55, 0.55)",
    cartoucheParchmentStart: "#FAF8F2",
    cartoucheParchmentMid: "#F5EFE0",
    cartoucheParchmentEnd: "#ECE0CA",
    cartoucheFiligree: "#D4AF37",
    cartoucheFiligreeLight: "#F3D78A",
    cartoucheFiligreeDark: "#A88318",
    heroBgOverlay: "linear-gradient(180deg, rgba(5, 34, 25, 0.78) 0%, rgba(8, 48, 36, 0.55) 50%, rgba(3, 20, 15, 0.88) 100%)",
    bodyBg: "#042018",
    bismillahColor: "#0D3328",
    namesColor: "#08291F",
    subtextColor: "#1D5243",
    dateColor: "#0D3328",
    accentGold: "#D4AF37",
    textPrimary: "text-[#FFF6DE]",
    textMuted: "text-[#A7D7C5]",
    cardBg: "bg-[#093528]/95",
    cardBorder: "border-[#D4AF37]/40",
  },
  "midnight-navy": {
    themeId: "midnight-navy",
    themeName: "Celestial Midnight Navy",
    flap0: "#142540",
    flap60: "#0F1C31",
    flap100: "#0A1322",
    flapStroke: "#DFC38A",
    envelopeBg: "#0A1424",
    envelopeBodyGradient: "linear-gradient(180deg, #122138 0%, #0C1728 45%, #08101C 100%)",
    sealBronzeLight: "#263B5C",
    sealBronze: "#14243C",
    sealBronzeDark: "#0B1524",
    sealArabicColor: "#F5DE98",
    sealMonogramColor: "#DFC38A",
    sealBorderDash: "rgba(223, 195, 138, 0.55)",
    cartoucheParchmentStart: "#F8FAFD",
    cartoucheParchmentMid: "#F0F4FA",
    cartoucheParchmentEnd: "#E3ECF6",
    cartoucheFiligree: "#DFC38A",
    cartoucheFiligreeLight: "#F0DCB5",
    cartoucheFiligreeDark: "#B39556",
    heroBgOverlay: "linear-gradient(180deg, rgba(8, 16, 28, 0.82) 0%, rgba(14, 28, 48, 0.58) 50%, rgba(4, 9, 17, 0.90) 100%)",
    bodyBg: "#070E1A",
    bismillahColor: "#142540",
    namesColor: "#0D1B30",
    subtextColor: "#3A5173",
    dateColor: "#142540",
    accentGold: "#DFC38A",
    textPrimary: "text-[#F0F5FF]",
    textMuted: "text-[#9EB5D6]",
    cardBg: "bg-[#0C1A2F]/95",
    cardBorder: "border-[#DFC38A]/40",
  },
  "rosewater-blush": {
    themeId: "rosewater-blush",
    themeName: "Rosewater Blush & Burgundy",
    flap0: "#F5E4DC",
    flap60: "#ECD2C7",
    flap100: "#DFBEB1",
    flapStroke: "#E0A899",
    envelopeBg: "#F0DDD4",
    envelopeBodyGradient: "linear-gradient(180deg, #F0DDD4 0%, #E8CEBF 45%, #DEC0B0 100%)",
    sealBronzeLight: "#7A3D49",
    sealBronze: "#56232D",
    sealBronzeDark: "#37131B",
    sealArabicColor: "#FFD9D4",
    sealMonogramColor: "#E0A899",
    sealBorderDash: "rgba(122, 61, 73, 0.5)",
    cartoucheParchmentStart: "#FFF9F8",
    cartoucheParchmentMid: "#FAF0ED",
    cartoucheParchmentEnd: "#F3E3DD",
    cartoucheFiligree: "#D08B7A",
    cartoucheFiligreeLight: "#E8B2A5",
    cartoucheFiligreeDark: "#A86253",
    heroBgOverlay: "linear-gradient(180deg, rgba(46, 20, 27, 0.74) 0%, rgba(68, 30, 40, 0.52) 50%, rgba(28, 11, 16, 0.86) 100%)",
    bodyBg: "#250F16",
    bismillahColor: "#4E1F29",
    namesColor: "#3B141D",
    subtextColor: "#7C4550",
    dateColor: "#4E1F29",
    accentGold: "#D08B7A",
    textPrimary: "text-[#FFF0F2]",
    textMuted: "text-[#E6B8C2]",
    cardBg: "bg-[#331823]/95",
    cardBorder: "border-[#E0A899]/40",
  },
  "ivory-arabesque": {
    themeId: "ivory-arabesque",
    themeName: "Pearl Ivory & Champagne Sunnah",
    flap0: "#F6F1EA",
    flap60: "#ECE3D7",
    flap100: "#DFD2C1",
    flapStroke: "#D6A75E",
    envelopeBg: "#F2EBE0",
    envelopeBodyGradient: "linear-gradient(180deg, #EFE6D9 0%, #E6DAC9 45%, #DBCBB4 100%)",
    sealBronzeLight: "#594833",
    sealBronze: "#3D3020",
    sealBronzeDark: "#261D12",
    sealArabicColor: "#FCE7C5",
    sealMonogramColor: "#D6A75E",
    sealBorderDash: "rgba(89, 72, 51, 0.5)",
    cartoucheParchmentStart: "#FFFFFC",
    cartoucheParchmentMid: "#FAF6EE",
    cartoucheParchmentEnd: "#F2EADA",
    cartoucheFiligree: "#D6A75E",
    cartoucheFiligreeLight: "#EBD09B",
    cartoucheFiligreeDark: "#A67A32",
    heroBgOverlay: "linear-gradient(180deg, rgba(30, 25, 20, 0.72) 0%, rgba(46, 38, 30, 0.50) 50%, rgba(18, 14, 11, 0.85) 100%)",
    bodyBg: "#1C1713",
    bismillahColor: "#382A1B",
    namesColor: "#271C11",
    subtextColor: "#6B5845",
    dateColor: "#382A1B",
    accentGold: "#D6A75E",
    textPrimary: "text-[#FDFBF7]",
    textMuted: "text-[#D3C7B6]",
    cardBg: "bg-[#28231C]/95",
    cardBorder: "border-[#D6A75E]/40",
  },
};

export function resolveTemplate(templateId: string): {
  template: Template;
  theme: ResolvedThemeStyles;
  audioMode: AudioThemeMode;
} {
  let matched = templates.find((t) => t.id === templateId);

  if (!matched) {
    matched =
      templates.find((t) => t.id.toLowerCase() === templateId.toLowerCase()) ||
      templates[0];
  }

  const themeKey = matched.themeId && THEME_STYLES[matched.themeId]
    ? matched.themeId
    : "moroccan-cartouche";
  const theme = THEME_STYLES[themeKey];

  let audioMode: AudioThemeMode = "wedding";
  if (matched.mainCategory === "Islamic Festival Cards") {
    audioMode = "festival";
  } else if (
    matched.mainCategory === "Religious & Family Events" ||
    matched.mainCategory === "Islamic Personal Greetings"
  ) {
    audioMode = "spiritual";
  }

  return {
    template: matched,
    theme,
    audioMode,
  };
}
