import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/app/context/StoreContext";

export const metadata: Metadata = {
  title: "Noor Al-Aqd — Luxury Islamic Digital Invitations & Muslim Wedding Cards",
  description:
    "Celebrate life's most sacred moments the Islamic way. Bespoke Islamic digital invitations, Nikah & Walima suites, Eid Mubarak cards, Ramadan greetings, and Aqiqah announcements with 3D wax seal reveals, live WhatsApp RSVPs, and authentic Arabic calligraphy.",
  keywords: [
    "Islamic digital wedding invitation",
    "Muslim wedding cards online",
    "Nikah invitation card maker",
    "Walima digital invite",
    "Eid Mubarak greeting cards",
    "Ramadan Kareem cards",
    "Aqiqah invitation cards",
    "Bismillah ceremony cards",
    "Barakallahu Lakuma invitation",
    "Arabic calligraphy wedding cards",
    "Islamic e-invite WhatsApp",
    "3D interactive wedding invitation",
  ],
  openGraph: {
    title: "Noor Al-Aqd — Luxury Islamic Digital Invitations & Muslim Wedding Cards",
    description:
      "Celebrate Every Beautiful Moment, The Islamic Way. Authentic Arabic calligraphy, 3D wax seal reveals, live Quranic duas, and instant WhatsApp RSVPs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory text-espresso antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
