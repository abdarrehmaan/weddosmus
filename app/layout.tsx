import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WEDOS — Royal 3D Interactive Digital Wedding Invitations",
  description:
    "Bespoke 3D interactive wedding website templates inspired by royal palace architecture, golden wax seals, live Google Maps, and instant WhatsApp RSVPs.",
  keywords: [
    "Royal wedding invitation website",
    "3D wedding invite light theme",
    "Palace digital wedding card",
    "Interactive wedding website",
    "WhatsApp wedding invite",
    "Luxury e-invite",
    "Nikah Walima digital card",
  ],
  openGraph: {
    title: "WEDOS — Royal 3D Interactive Digital Wedding Invitations",
    description:
      "Turn your wedding invitation into an ethereal 3D palace experience. Golden seals, live RSVP, music, and maps.",
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
      <body className="bg-ivory text-espresso antialiased">{children}</body>
    </html>
  );
}
