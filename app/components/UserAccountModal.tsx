"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, ShoppingBag, Download, ExternalLink, LogOut, CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/app/context/StoreContext";

export default function UserAccountModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, loginUser, logoutUser, orders } = useStore();
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPhone, setEditPhone] = useState(user.phone);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name: editName,
      email: editEmail,
      phone: editPhone,
    });
    alert("Profile updated successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-ivory rounded-3xl shadow-palace-glow border border-gold/40 overflow-hidden my-8"
      >
        {/* Top Banner */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold-light">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{user.name}</h2>
              <p className="text-xs text-emerald-200/80">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gold/20 bg-white/50 px-6 pt-3 gap-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
              activeTab === "orders" ? "text-gold" : "text-espresso-muted hover:text-espresso"
            }`}
          >
            My Orders ({orders.length})
            {activeTab === "orders" && (
              <motion.div
                layoutId="tabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
              activeTab === "profile" ? "text-gold" : "text-espresso-muted hover:text-espresso"
            }`}
          >
            Account Details
            {activeTab === "profile" && (
              <motion.div
                layoutId="tabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
              />
            )}
          </button>
        </div>

        {/* Tab content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "orders" ? (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-gold mx-auto opacity-50" />
                  <p className="text-sm font-display text-espresso">No orders placed yet</p>
                  <p className="text-xs text-espresso-muted">
                    When you order wedding suites or free greetings, they will appear here with instant download links.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl glass border border-gold/25 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/15 pb-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">
                          Order #{order.id}
                        </span>
                        <span className="text-xs text-espresso-muted flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {order.status}
                        </span>
                        <span className="text-sm font-bold font-display text-espresso">
                          {order.total === 0 ? "FREE" : `₹${order.total.toLocaleString("en-IN")}`}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div>
                            <p className="font-semibold text-espresso">{item.title}</p>
                            <span className="text-[10px] text-espresso-muted">{item.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/invite/${item.templateId}`}
                              target="_blank"
                              className="text-[10px] font-semibold text-gold-dark hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View 3D URL
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-gold/15 text-xs">
                      <span className="text-espresso-muted text-[11px]">
                        Payment: {order.paymentMethod}
                      </span>
                      <Link
                        href="/studio"
                        onClick={onClose}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gold-gradient shadow-sm hover:scale-105 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Customize / Download Card
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Profile Settings */
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-espresso uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-espresso uppercase mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                <button
                  type="button"
                  onClick={logoutUser}
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:underline"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient rounded-full shadow-gold-glow hover:scale-105 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
