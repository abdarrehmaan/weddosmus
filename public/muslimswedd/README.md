# Royal Muslim Wedding Digital Invitation (Nikah & Walima)
### Bespoke Mobile-First Heirloom Experience

An ultra-luxury, mobile-first **Interactive Muslim Wedding Digital Invitation** inspired by bespoke royal envelopes, oxidized antique bronze wax seals, and cinematic 3D golden light-reveal experiences.

---

## 🌟 Highlights & Architectural Features

### 1. Stage 1: The Interactive Envelope & 3D Golden Light Reveal
- **Viewport Lock:** Locks scroll on initial load (`100dvh; overflow: hidden`) inside WhatsApp, Instagram, Safari, and Chrome WebViews.
- **Top Envelope Flap:** Textured triangular flap with soft embossed drop shadow and arabesque damask accents.
- **Antique Bronze Wax Seal:** 3D medallion featuring embossed Arabic calligraphy (*"BarakAllahu"* / Wedding Monogram) surrounded by a concentric pulsing touch indicator.
- **The 4-Step Cinematic Choreography (3.5s – 4.5s):**
  1. **Audio & Haptic Start (0.0s):** Fades touch indicator, initiates background Oud & Piano melody, and reveals the floating glassmorphic audio controller.
  2. **Bronze-to-24K Gold Illumination (0.0s – 1.5s):** Metallic gold mask sweeps across the medallion into radiant 24K gold with an ambient glow.
  3. **3D Levitation & Volumetric God-Rays (1.2s – 3.2s):** Tilts seal into 3D perspective (`transform: perspective(900px) rotateX(...)`) and unleashes rotating volumetric light rays and radial bloom.
  4. **Golden-White Flash Dissolve (3.0s – 4.2s):** Engulfs the screen in a radiant light burst, unmounts the envelope, unlocks page scrolling, and reveals the Archway Hero.

### 2. Stage 2: Moroccan Archway Hero (Couple Reveal)
- **Atmospheric Architecture:** Sandstone/ivory archway adorned with blush-pink and cream cascading rose garlands.
- **Moroccan Brass Lanterns:** Ambient glowing lanterns hanging from the arch with slow natural swaying animations.
- **Staggered Typography:** Sequential reveal for *Bismillah*, Groom (`Yassine`), `&`, Bride (`Fatima`), Arabic Subtitle (`حفل زفافنا`), and Wedding Date.

### 3. Stage 3: Streamlined Scroll Sections (Below the Fold)
1. **Live Glassmorphic Countdown (`العد التنازلي`):** Frosted glass cards ticking in real-time with bilingual English + Arabic labels (`Days / أيام`, `Hours / ساعات`, etc.).
2. **Architectural Venue & Nikah/Walima Timeline (`مكان الحفل`):** Fine-line architectural sketch illustration of the palace + compact expandable accordion for **Mehendi Night**, **Nikah Solemnization**, and **Dawat-e-Walima Banquet** with direct Google Maps directions and one-click `.ics` Calendar downloads.
3. **Quranic Blessing & Our Story:** Surah Ar-Rum (30:21) calligraphy and translation, paired with a compact 3-milestone timeline (*Maktub*, *Khitbah*, *Nikah*).
4. **Curated Touch Carousel Gallery:** Touch-scrollable photo gallery with dynamic dot indicator and a fullscreen swipeable lightbox.
5. **Glassmorphic RSVP Modal & Warm Duas:** Interactive popup modal with attendance toggle, guest count, mobile number, custom Dua message, celebratory golden confetti, and 1-click WhatsApp invitation sharing.

### 4. Zero-Dependency Procedural Web Audio Engine
- Built-in Web Audio API synthesizer generating an acoustic Arabic Oud + Grand Piano melody in the Andalusian / Nahawand mode.
- Works 100% offline with zero CORS or network streaming failures, plus fallback support for custom MP3 streaming.
- Floating glassmorphic soundwave toggle button (`🔊` / `🔇`) pinned in the bottom-right corner.

---

## 🚀 How to Run & Preview

### Local Preview (Zero Dependencies)
You can open `index.html` directly in any web browser, or launch the built-in Node preview server:

```bash
# Start the local server
node server.js
```
Then visit: `http://localhost:3000`

### Static Deployment
This project has **zero build steps** and can be deployed instantly to:
- **Vercel / Netlify:** Drag-and-drop the directory or push to GitHub.
- **GitHub Pages:** Enable GitHub Pages under Repository Settings -> Source: `main` branch root.
- **Cloudflare Pages / AWS S3 / Firebase Hosting:** Upload `index.html`, `styles.css`, and `app.js`.

---

## 🎨 Customization Guide

- **Couple Names & Date:** Edit names (`Yassine`, `Fatima`) and the wedding date (`2026-05-21T17:00:00`) in `index.html` and `app.js`.
- **Venue & Google Maps Links:** Update the Google Maps URLs in `index.html` inside the accordion item buttons.
- **Colors & Typography:** Modify the CSS variables at the top of `styles.css`.
