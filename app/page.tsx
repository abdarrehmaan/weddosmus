"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ArchwayShowcase from "@/app/components/ArchwayShowcase";
import TemplateCatalog from "@/app/components/TemplateCatalog";
import {
  TrendingEidSection,
  RamadanSpecialSection,
  CustomerTestimonials,
} from "@/app/components/FeaturedIslamicSections";
import BentoFeatures from "@/app/components/BentoFeatures";
import HowItWorks from "@/app/components/HowItWorks";
import PricingSection from "@/app/components/PricingSection";
import FAQSection from "@/app/components/FAQSection";
import Footer, { WhatsAppButton } from "@/app/components/Footer";
import PhoneSimulator from "@/app/components/PhoneSimulator";
import OrderModal from "@/app/components/OrderModal";
import CartDrawer from "@/app/components/CartDrawer";
import CheckoutModal from "@/app/components/CheckoutModal";
import UserAccountModal from "@/app/components/UserAccountModal";
import { Template } from "@/app/data/templates";

export default function Home() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedTemplateForOrder, setSelectedTemplateForOrder] = useState<Template | null>(null);

  const handleOpenCheckoutWithTemplate = (tpl: Template) => {
    setSelectedTemplateForOrder(tpl);
    setShowCheckout(true);
  };

  return (
    <main className="relative min-h-screen bg-ivory text-espresso overflow-x-hidden selection:bg-gold/25 selection:text-gold-dark">
      {/* Sticky Glass Navbar with Announcement Bar */}
      <Navbar
        onOpenCart={() => {}}
        onOpenAccount={() => setShowAccount(true)}
      />

      {/* Hero Section: "Celebrate Every Beautiful Moment, The Islamic Way." */}
      <HeroSection />

      {/* Featured Wedding & All Islamic Collections */}
      <TemplateCatalog onSelectOrder={handleOpenCheckoutWithTemplate} />

      {/* Trending Eid Greeting Cards & Takbeerat */}
      <TrendingEidSection onSelectOrder={handleOpenCheckoutWithTemplate} />

      {/* Ramadan Special Collection */}
      <RamadanSpecialSection />

      {/* Signature Royal Islamic Archway Showcase */}
      <ArchwayShowcase />

      {/* Bento Grid: Why Choose Our Islamic Digital Suites */}
      <BentoFeatures />

      {/* 3-Step Effortless Journey */}
      <HowItWorks />

      {/* Muslim Couple & Family Testimonials */}
      <CustomerTestimonials />

      {/* Transparent Pricing Cards (Free to Royal Bespoke) */}
      <PricingSection onSelectTier={() => setShowCheckout(true)} />

      {/* Islamic Etiquette & Product FAQs */}
      <FAQSection />

      {/* Islamic Branding Footer & WhatsApp Concierge */}
      <Footer />
      <WhatsAppButton />

      {/* Global E-Commerce & Interactive Modals */}
      <CartDrawer onCheckout={() => setShowCheckout(true)} />
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => {
          setShowCheckout(false);
          setSelectedTemplateForOrder(null);
        }}
        directTemplate={selectedTemplateForOrder}
      />
      <UserAccountModal
        isOpen={showAccount}
        onClose={() => setShowAccount(false)}
      />
      <PhoneSimulator />
      <OrderModal />
    </main>
  );
}
