import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ArchwayShowcase from "@/app/components/ArchwayShowcase";
import TemplateCatalog from "@/app/components/TemplateCatalog";
import BentoFeatures from "@/app/components/BentoFeatures";
import HowItWorks from "@/app/components/HowItWorks";
import PricingSection from "@/app/components/PricingSection";
import FAQSection from "@/app/components/FAQSection";
import Footer, { WhatsAppButton } from "@/app/components/Footer";
import PhoneSimulator from "@/app/components/PhoneSimulator";
import OrderModal from "@/app/components/OrderModal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ivory text-espresso overflow-x-hidden selection:bg-gold/25 selection:text-gold-dark">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* 3D Interactive Hero with Floating Phone & Particles */}
      <HeroSection />

      {/* Signature Royal Palace Archway Showcase */}
      <ArchwayShowcase />

      {/* Filterable 3D Template Storefront */}
      <TemplateCatalog />

      {/* Why Choose Our 3D Websites — Bento Grid */}
      <BentoFeatures />

      {/* 3-Step Timeline */}
      <HowItWorks />

      {/* Transparent Pricing Cards */}
      <PricingSection />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Footer & Floating WhatsApp */}
      <Footer />
      <WhatsAppButton />

      {/* Modals */}
      <PhoneSimulator />
      <OrderModal />
    </main>
  );
}
