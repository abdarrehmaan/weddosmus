"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Download,
  Share2,
  Phone,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useStore, Order } from "@/app/context/StoreContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  directTemplate?: any;
}

export default function CheckoutModal({ isOpen, onClose, directTemplate }: CheckoutModalProps) {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    createOrder,
    user,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "whatsapp">("upi");
  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [notes, setNotes] = useState("");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8921");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("•••");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // If opening checkout with a single direct template instead of cart
  const itemsToBuy = directTemplate
    ? [
        {
          id: `direct-${directTemplate.id}`,
          templateId: directTemplate.id,
          title: directTemplate.title,
          category: directTemplate.mainCategory || directTemplate.category,
          price: directTemplate.price,
          originalPrice: directTemplate.originalPrice,
          image: directTemplate.image,
          timestamp: Date.now(),
        },
      ]
    : cart;

  const subtotal = directTemplate ? directTemplate.price : cartSubtotal;
  const discount = directTemplate
    ? appliedCoupon
      ? appliedCoupon.discountType === "percentage"
        ? Math.round((subtotal * appliedCoupon.amount) / 100)
        : Math.min(appliedCoupon.amount, subtotal)
      : 0
    : cartDiscount;
  const finalTotal = Math.max(0, subtotal - discount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Please provide your name and WhatsApp number.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || "guest@noor.islamic",
        customerPhone: customerPhone.trim(),
        items: itemsToBuy,
        subtotal,
        discount,
        couponCode: appliedCoupon?.code,
        total: finalTotal,
        paymentMethod:
          paymentMethod === "upi"
            ? "UPI / Instant QR"
            : paymentMethod === "card"
            ? "Credit/Debit Card"
            : paymentMethod === "netbanking"
            ? "Islamic Net Banking"
            : "WhatsApp Direct Order",
        notes: notes.trim(),
      });

      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1200);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-ivory rounded-3xl shadow-palace-glow border border-gold/40 overflow-hidden my-8"
      >
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-gold-light font-semibold">
                Noor Islamic Studio • Secure Checkout
              </span>
              <h2 className="font-display text-2xl font-bold">
                {completedOrder ? "Order Confirmed & Blessed!" : "Complete Your Order"}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-emerald-200/80 mt-2 font-arabic text-right">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {completedOrder ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-emerald-glow">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-espresso">
                  Barakallahu Feekum! Your Order is Confirmed
                </h3>
                <p className="text-sm text-espresso-muted max-w-md mx-auto">
                  Order <strong>#{completedOrder.id}</strong> has been created. A confirmation receipt has been sent to{" "}
                  <strong>{completedOrder.customerPhone}</strong> via WhatsApp.
                </p>
              </div>

              {/* Order Summary Pill */}
              <div className="p-4 rounded-2xl glass border border-gold/30 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-espresso">
                  <span>Order ID:</span>
                  <span className="font-mono text-gold-dark">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between text-espresso-muted">
                  <span>Items:</span>
                  <span>{completedOrder.items.length} Islamic Template(s)</span>
                </div>
                <div className="flex justify-between text-espresso-muted">
                  <span>Payment Mode:</span>
                  <span>{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-espresso border-t border-gold/20 pt-2">
                  <span>Total Paid:</span>
                  <span className="text-emerald-800">
                    {completedOrder.total === 0 ? "FREE" : `₹${completedOrder.total.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link
                  href="/studio"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Customize in Studio Now
                </Link>
                <Link
                  href="/account"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-espresso glass hover:bg-white border border-gold/30 transition-all"
                >
                  View My Orders
                </Link>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Summary Accordion Box */}
              <div className="p-4 rounded-2xl bg-ivory-sandstone/40 border border-gold/25 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  <span>Order Items ({itemsToBuy.length})</span>
                  <span>Amount</span>
                </div>
                {itemsToBuy.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs text-espresso">
                    <span className="line-clamp-1 font-medium">{item.title}</span>
                    <span className="font-semibold shrink-0 ml-2">
                      {item.price === 0 ? "FREE" : `₹${item.price.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                ))}
                {discount > 0 && (
                  <div className="flex justify-between items-center text-xs text-emerald-700 font-semibold border-t border-gold/20 pt-1.5">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm font-bold font-display text-espresso border-t border-gold/25 pt-2">
                  <span>Final Total</span>
                  <span className="text-gold-dark text-base">
                    {finalTotal === 0 ? "FREE" : `₹${finalTotal.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-base text-espresso flex items-center gap-2">
                  <User className="w-4 h-4 text-gold" />
                  Customer & Delivery Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zayd Al-Ansari"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Email Address (For PDF & Receipt)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              {finalTotal > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-base text-espresso flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gold" />
                    Select Payment Method
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === "upi"
                          ? "border-gold bg-gold/10 font-bold text-espresso shadow-sm"
                          : "border-gold/20 glass text-espresso-muted hover:border-gold/40"
                      }`}
                    >
                      <QrCode className="w-5 h-5 mx-auto mb-1 text-gold" />
                      <span className="text-[11px] block">UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-gold bg-gold/10 font-bold text-espresso shadow-sm"
                          : "border-gold/20 glass text-espresso-muted hover:border-gold/40"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-gold" />
                      <span className="text-[11px] block">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === "netbanking"
                          ? "border-gold bg-gold/10 font-bold text-espresso shadow-sm"
                          : "border-gold/20 glass text-espresso-muted hover:border-gold/40"
                      }`}
                    >
                      <Building className="w-5 h-5 mx-auto mb-1 text-gold" />
                      <span className="text-[11px] block">Net Banking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("whatsapp")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === "whatsapp"
                          ? "border-emerald-600 bg-emerald-50 font-bold text-emerald-900 shadow-sm"
                          : "border-gold/20 glass text-espresso-muted hover:border-gold/40"
                      }`}
                    >
                      <Phone className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      <span className="text-[11px] block">WhatsApp</span>
                    </button>
                  </div>

                  {/* Payment Sub-details */}
                  {paymentMethod === "upi" && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
                        <QrCode className="w-6 h-6" />
                      </div>
                      <div className="text-xs text-emerald-900">
                        <p className="font-semibold">Instant UPI & QR Code</p>
                        <p className="text-[11px] text-emerald-700">
                          Supports Google Pay, PhonePe, Paytm, and BHIM UPI with instant approval.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="p-3.5 rounded-xl bg-white border border-gold/30 space-y-2 text-xs">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-ivory focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-ivory focus:outline-none"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gold/30 bg-ivory focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Sacred Order...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Confirm & Complete Order ({finalTotal === 0 ? "FREE" : `₹${finalTotal.toLocaleString("en-IN")}`})
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-espresso-muted">
                🔒 256-Bit SSL Encrypted • Halal Guarantee • 100% Islamic-Compliant Content
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
