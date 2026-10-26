import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FDFBF7",
          cream: "#FAF5ED",
          sandstone: "#EFE5D5",
          parchment: "#E4D6C1",
        },
        espresso: {
          DEFAULT: "#2C1E18",
          light: "#4A352B",
          muted: "#765B4D",
        },
        gold: {
          DEFAULT: "#B88B4A",
          light: "#DFC38A",
          bright: "#D4AF37",
          dark: "#8A6527",
          muted: "rgba(184, 139, 74, 0.15)",
        },
        blush: {
          DEFAULT: "#E2A995",
          soft: "#F5E4DC",
          deep: "#C48671",
        },
        sage: {
          DEFAULT: "#6B7C68",
          soft: "#E8EEE7",
        },
      },
      fontFamily: {
        display: ["Georgia", "Palatino Linotype", "Times New Roman", "serif"],
        body: ["Segoe UI", "Helvetica Neue", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #DFC38A 0%, #B88B4A 50%, #8A6527 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(184,139,74,0.3) 50%, transparent 100%)",
        "palace-gradient": "radial-gradient(ellipse at 50% 20%, #FAF5ED 0%, #EFE5D5 60%, #E4D6C1 100%)",
        "glass-light": "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 100%)",
        "glass-strong": "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)",
      },
      boxShadow: {
        "palace-soft": "0 10px 40px -10px rgba(74, 53, 43, 0.08), 0 0 20px rgba(184, 139, 74, 0.08)",
        "palace-glow": "0 15px 50px rgba(184, 139, 74, 0.2), 0 0 25px rgba(223, 195, 138, 0.3)",
        "gold-glow": "0 0 30px rgba(184, 139, 74, 0.25), 0 0 60px rgba(223, 195, 138, 0.15)",
        "gold-glow-strong": "0 8px 30px rgba(184, 139, 74, 0.35)",
        "card": "0 8px 30px rgba(74, 53, 43, 0.06)",
        "glass": "0 8px 32px rgba(74, 53, 43, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(184, 139, 74, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(184, 139, 74, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
