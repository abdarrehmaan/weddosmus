"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/app/context/StoreContext";

export default function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput("");
    }
    setTimeout(() => setCouponFeedback(null), 3500);
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    onCheckout();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-espresso/50 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-ivory shadow-2xl flex flex-col border-l border-gold/30"
          >
            {/* Header */}
            <div className="p-5 border-b border-gold/20 flex items-center justify-between bg-white/70 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h2 className="font-display text-xl font-bold text-espresso">
                  Your Invitation Cart ({cart.length})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-espresso-muted hover:text-espresso hover:bg-gold/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-espresso">Your cart is empty</h3>
                  <p className="text-xs text-espresso-muted max-w-xs mx-auto">
                    Explore our Islamic wedding suites, Eid greetings, and religious milestone cards to add to your order.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gold-gradient shadow-gold-glow hover:scale-105 transition-all"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl glass border border-gold/20 flex gap-3 relative group"
                    >
                      <div className="w-20 h-24 rounded-xl overflow-hidden relative bg-ivory-sandstone shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                            {item.category}
                          </span>
                          <h4 className="font-display font-bold text-sm text-espresso line-clamp-1">
                            {item.title}
                          </h4>
                          {item.customizationSummary && (
                            <p className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded mt-1 line-clamp-1">
                              Custom: {item.customizationSummary}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-display font-bold text-espresso">
                            {item.price === 0 ? "FREE" : `₹${item.price.toLocaleString("en-IN")}`}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-espresso-muted hover:text-red-600 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={clearCart}
                    className="text-xs text-espresso-muted hover:text-red-600 transition-colors underline pt-2 block text-right"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gold/20 bg-white/90 backdrop-blur-md space-y-4">
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. BISMILLAH10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gold/30 bg-ivory focus:outline-none focus:ring-1 focus:ring-gold uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-espresso text-amber-100 hover:bg-espresso-light transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponFeedback && (
                    <p
                      className={`text-[11px] ${
                        couponFeedback.success ? "text-emerald-700" : "text-red-600"
                      }`}
                    >
                      {couponFeedback.message}
                    </p>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Code: <strong>{appliedCoupon.code}</strong> (
                        {appliedCoupon.discountType === "percentage"
                          ? `${appliedCoupon.amount}% off`
                          : `₹${appliedCoupon.amount} off`}
                        )
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-espresso-muted hover:text-red-600 text-[10px] underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Subtotal & Total */}
                <div className="space-y-1 text-xs text-espresso-muted pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-espresso font-medium">
                      ₹{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount</span>
                      <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold font-display text-espresso border-t border-gold/20 pt-2">
                    <span>Total Amount</span>
                    <span className="text-gold-dark text-lg">
                      {cartTotal === 0 ? "FREE" : `₹${cartTotal.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleStartCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs uppercase tracking-wider font-bold text-white bg-gold-gradient shadow-gold-glow hover:shadow-gold-glow-strong hover:scale-[1.02] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
