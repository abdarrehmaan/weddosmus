"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, MessageCircle, Sparkles, ShieldCheck, Zap } from "lucide-react";

interface OrderDetail {
  package?: string;
  price?: number;
  id?: string;
  title?: string;
}

const PACKAGES = [
  { label: "Silver — ₹1,999 (2D Motion)", value: "Silver", price: 1999 },
  { label: "Gold — ₹3,499 (Full 3D Interactive)", value: "Gold", price: 3499 },
  { label: "Royal Platinum — ₹5,999 (Bespoke 3D Theme)", value: "Royal Platinum", price: 5999 },
];

export default function OrderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

  // Form state
  const [coupleNames, setCoupleNames] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("Gold");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");

  const handleOpen = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail as OrderDetail | undefined;
    setOrderDetail(detail ?? null);

    if (detail?.package) {
      const match = PACKAGES.find(
        (p) => p.value.toLowerCase() === detail.package!.toLowerCase()
      );
      if (match) setSelectedPackage(match.value);
    } else if (detail?.title) {
      // If triggered from template card, pre-select Gold
      setSelectedPackage("Gold");
    }

    setIsOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener("openOrder", handleOpen);
    return () => window.removeEventListener("openOrder", handleOpen);
  }, [handleOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
  };

  const selectedPkg = PACKAGES.find((p) => p.value === selectedPackage);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = [
      `👑 *Royal 3D Wedding Website Order*`,
      ``,
      `💍 *Couple Names:* ${coupleNames || "To be confirmed"}`,
      `📅 *Wedding Date:* ${weddingDate || "To be confirmed"}`,
      `📦 *Selected Tier:* ${selectedPackage} (₹${selectedPkg?.price?.toLocaleString("en-IN")})`,
      orderDetail?.title ? `🎨 *Chosen Theme:* ${orderDetail.title}` : "",
      `📞 *Client Phone:* ${phone || "Not specified"}`,
      requests ? `📝 *Special Notes:* ${requests}` : "",
      ``,
      `✨ Please share the next steps and payment confirmation!`,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/911234567890?text=${encoded}`, "_blank");
  };

  const handlePayment = () => {
    alert(
      "Razorpay Gateway Ready! Once connected with your merchant keys, this will instantly launch UPI / Cards / NetBanking."
    );
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-ivory-cream/80 border border-gold/30 text-espresso text-sm placeholder:text-espresso-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-md overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0" onClick={close} aria-hidden="true" />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-lg my-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#FAF5ED] to-white border-2 border-gold/40 shadow-palace-glow"
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-5 right-5 p-2 rounded-full glass hover:bg-white text-espresso-muted hover:text-espresso border border-gold/20 hover:scale-105 transition-all cursor-pointer"
              aria-label="Close Order Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center pb-6 border-b border-gold/15 space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                <Sparkles className="w-3.5 h-3.5" />
                Instant Customization
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-espresso">
                Order Your 3D Wedding Website
              </h3>
              <p className="text-xs text-espresso-muted">
                {orderDetail?.title ? (
                  <>Selected Theme: <strong className="text-gold font-medium">{orderDetail.title}</strong></>
                ) : (
                  "Ready in 24 hours · 100% Mobile & WhatsApp Compatible"
                )}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleWhatsApp} className="py-6 space-y-4">
              {/* Couple Names */}
              <div>
                <label className="block text-xs font-semibold text-espresso uppercase tracking-wider mb-1.5">
                  Couple Names
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmad & Fatima (or Priya & Arjun)"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className={inputClasses}
                />
              </div>

              {/* Grid: Wedding Date & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso uppercase tracking-wider mb-1.5">
                    Wedding Date
                  </label>
                  <input
                    type="date"
                    required
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-espresso uppercase tracking-wider mb-1.5">
                    WhatsApp Phone No.
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Package Select */}
              <div>
                <label className="block text-xs font-semibold text-espresso uppercase tracking-wider mb-1.5">
                  Selected Package
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className={inputClasses}
                >
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.value} value={pkg.value}>
                      {pkg.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-espresso uppercase tracking-wider mb-1.5">
                  Special Notes or Venues (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Nikah at Masjid Al-Noor, Walima at Royal Orchid Hall, modest Duff audio..."
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  className={inputClasses}
                />
              </div>

              {/* Dual Actions */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Send Order Details on WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  Proceed to Online Payment (Razorpay Ready)
                </button>
              </div>

              {/* Badges */}
              <div className="pt-3 flex items-center justify-center gap-6 text-[11px] text-espresso-muted">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Money-Back Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-gold" />
                  24-Hour Express Delivery
                </span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
