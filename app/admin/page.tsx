"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Tag,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  Search,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useStore, Order, Coupon } from "@/app/context/StoreContext";
import { MAIN_CATEGORIES, Template } from "@/app/data/templates";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AdminDashboardPage() {
  const {
    templates,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    addTemplate,
    deleteTemplate,
    announcement,
    setAnnouncement,
  } = useStore();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "templates" | "coupons" | "settings">("overview");

  // Add Template Form State
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Template["mainCategory"]>("Islamic Wedding Invitations");
  const [newSubcategory, setNewSubcategory] = useState("Nikah Invitations");
  const [newPrice, setNewPrice] = useState(2499);
  const [newOriginalPrice, setNewOriginalPrice] = useState(3999);
  const [newArabicCalligraphy, setNewArabicCalligraphy] = useState("بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
  const [newBadge, setNewBadge] = useState("New Arrival");
  const [newImageUrl, setNewImageUrl] = useState("https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?w=800&auto=format&fit=crop&q=80");

  // Add Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponType, setNewCouponType] = useState<"percentage" | "fixed">("percentage");
  const [newCouponAmount, setNewCouponAmount] = useState(15);
  const [newCouponDesc, setNewCouponDesc] = useState("");

  // Search filter
  const [searchTerm, setSearchTerm] = useState("");

  // Stats Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0);
  const totalOrders = orders.length;
  const activeTemplatesCount = templates.length;

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const t: Template = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      mainCategory: newCategory,
      subcategory: newSubcategory,
      category: newCategory,
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice),
      image: newImageUrl.trim(),
      arabicCalligraphy: newArabicCalligraphy.trim(),
      calligraphyTitle: "Custom Arabic Inscription",
      features: ["3D Interactive Reveal", "WhatsApp Direct Sync", "Instant PDF/PNG Download"],
      badge: newBadge.trim() || undefined,
      popular: true,
      trending: true,
    };

    addTemplate(t);
    setShowAddTemplateModal(false);
    setNewTitle("");
    alert("New Islamic Template added successfully!");
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const c: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      amount: Number(newCouponAmount),
      description: newCouponDesc.trim() || `${newCouponAmount}${newCouponType === "percentage" ? "%" : "₹"} Discount Promo`,
    };

    addCoupon(c);
    setNewCouponCode("");
    setNewCouponDesc("");
    alert(`Coupon code ${c.code} activated!`);
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col">
      <Navbar />

      {/* Admin Top Header */}
      <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gold-light" />
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-light flex items-center gap-1.5">
                <LayoutDashboard className="w-3 h-3 text-gold" />
                Store Owner Portal
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold">
                Islamic Studio Admin Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddTemplateModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Upload New Template
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl glass border border-gold/30 space-y-2">
            <div className="flex items-center justify-between text-espresso-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-espresso">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>

          <div className="p-5 rounded-2xl glass border border-gold/30 space-y-2">
            <div className="flex items-center justify-between text-espresso-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Orders Placed</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-espresso">{totalOrders}</p>
            <span className="text-[11px] text-espresso-muted">Real-time synced orders</span>
          </div>

          <div className="p-5 rounded-2xl glass border border-gold/30 space-y-2">
            <div className="flex items-center justify-between text-espresso-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Templates</span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-espresso">{activeTemplatesCount}</p>
            <span className="text-[11px] text-espresso-muted">Across 4 Islamic categories</span>
          </div>

          <div className="p-5 rounded-2xl glass border border-gold/30 space-y-2">
            <div className="flex items-center justify-between text-espresso-muted">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Coupons</span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display text-2xl font-bold text-espresso">{coupons.length}</p>
            <span className="text-[11px] text-espresso-muted">Promotional campaigns</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gold/25 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "overview", label: "Orders & Purchases", icon: ShoppingBag },
            { id: "templates", label: "Templates Catalog", icon: Layers },
            { id: "coupons", label: "Coupons & Discounts", icon: Tag },
            { id: "settings", label: "Announcement & Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? "border-gold text-gold-dark bg-gold/5"
                    : "border-transparent text-espresso-muted hover:text-espresso"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS & PURCHASES */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-espresso">
                  Customer Orders Management
                </h3>
                <p className="text-xs text-espresso-muted">
                  View and manage real-time customer purchases, WhatsApp RSVPs, and fulfillment status.
                </p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer or Order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                />
              </div>
            </div>

            <div className="rounded-2xl glass border border-gold/30 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-ivory-sandstone/60 border-b border-gold/20 text-espresso font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Items Purchased</th>
                    <th className="p-3.5">Total Amount</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15">
                  {orders
                    .filter(
                      (o) =>
                        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-gold/5 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-gold-dark">{order.id}</td>
                        <td className="p-3.5">
                          <p className="font-semibold text-espresso">{order.customerName}</p>
                          <p className="text-[11px] text-espresso-muted">{order.customerPhone}</p>
                        </td>
                        <td className="p-3.5 max-w-xs">
                          {order.items.map((i, idx) => (
                            <span key={idx} className="block truncate text-espresso">
                              • {i.title}
                            </span>
                          ))}
                        </td>
                        <td className="p-3.5 font-display font-bold text-espresso">
                          {order.total === 0 ? "FREE" : `₹${order.total.toLocaleString("en-IN")}`}
                        </td>
                        <td className="p-3.5 text-espresso-muted">{order.paymentMethod}</td>
                        <td className="p-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.status === "Paid"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "Fulfilled"
                                ? "bg-sky-100 text-sky-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value as Order["status"])
                            }
                            className="text-[11px] px-2 py-1 rounded-lg border border-gold/30 bg-white"
                          >
                            <option value="Paid">Mark Paid</option>
                            <option value="Fulfilled">Mark Fulfilled</option>
                            <option value="Pending">Mark Pending</option>
                            <option value="Cancelled">Cancel Order</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TEMPLATES MANAGEMENT */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-espresso">
                  Islamic Invitation Templates Catalog
                </h3>
                <p className="text-xs text-espresso-muted">
                  Create, update prices, and feature wedding and festival invitations.
                </p>
              </div>
              <button
                onClick={() => setShowAddTemplateModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gold-gradient shadow-gold-glow hover:scale-105 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Design
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="p-4 rounded-2xl glass border border-gold/30 flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                        {tpl.subcategory || tpl.category}
                      </span>
                      {tpl.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-gold-gradient text-white">
                          {tpl.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-base text-espresso">{tpl.title}</h4>
                    <p className="font-arabic text-sm text-gold-dark">{tpl.arabicCalligraphy}</p>
                  </div>

                  <div className="border-t border-gold/15 pt-3 flex items-center justify-between">
                    <div>
                      <span className="font-display font-bold text-espresso text-base">
                        {tpl.price === 0 ? "FREE" : `₹${tpl.price.toLocaleString("en-IN")}`}
                      </span>
                      <span className="text-xs text-espresso-muted line-through ml-2">
                        ₹{tpl.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/studio?template=${tpl.id}`}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-espresso glass hover:bg-white border border-gold/30"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTemplate(tpl.id)}
                        className="text-espresso-muted hover:text-red-600 p-1"
                        title="Delete Template"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COUPONS & DISCOUNTS */}
        {activeTab === "coupons" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Coupon Form */}
            <div className="p-6 rounded-2xl glass border border-gold/30 space-y-4">
              <h3 className="font-display font-bold text-lg text-espresso flex items-center gap-2">
                <Tag className="w-4 h-4 text-gold" />
                Create New Promo Code
              </h3>
              <form onSubmit={handleCreateCoupon} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BARAKAH20"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white uppercase font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Type
                    </label>
                    <select
                      value={newCouponType}
                      onChange={(e) => setNewCouponType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Flat (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      required
                      value={newCouponAmount}
                      onChange={(e) => setNewCouponAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Campaign Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eid-ul-Adha Special Gift"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Activate Promo Code
                </button>
              </form>
            </div>

            {/* Coupons List */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-display font-bold text-lg text-espresso">
                Active Promotional Campaigns ({coupons.length})
              </h3>
              <div className="space-y-3">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="p-4 rounded-2xl glass border border-gold/25 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-espresso bg-gold/15 px-2.5 py-0.5 rounded-lg border border-gold/30">
                          {c.code}
                        </span>
                        <span className="text-xs font-semibold text-emerald-800">
                          {c.discountType === "percentage" ? `${c.amount}% OFF` : `₹${c.amount} FLAT OFF`}
                        </span>
                      </div>
                      <p className="text-xs text-espresso-muted mt-1">{c.description}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS & ANNOUNCEMENT */}
        {activeTab === "settings" && (
          <div className="p-6 rounded-2xl glass border border-gold/30 space-y-5 max-w-2xl">
            <h3 className="font-display font-bold text-lg text-espresso flex items-center gap-2">
              <Settings className="w-4 h-4 text-gold" />
              Website Banner & Islamic Store Settings
            </h3>

            <div>
              <label className="block text-xs font-semibold text-espresso uppercase mb-1">
                Top Announcement Bar Message
              </label>
              <textarea
                rows={3}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gold/30 bg-white"
              />
              <p className="text-[11px] text-espresso-muted mt-1">
                This banner appears at the very top of all store and home pages.
              </p>
            </div>

            <button
              onClick={() => alert("Banner updated successfully across website!")}
              className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow hover:scale-105 transition-all"
            >
              Save Website Settings
            </button>
          </div>
        )}
      </div>

      {/* Add Template Modal */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-ivory rounded-3xl p-6 shadow-2xl border border-gold/40 my-8 space-y-4">
            <h3 className="font-display font-bold text-xl text-espresso">
              Upload New Islamic Invitation Template
            </h3>

            <form onSubmit={handleCreateTemplate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                  Template Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Andalusian Walima Suite"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Main Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  >
                    {MAIN_CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Subcategory Occasion
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Walima Invitations"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Price (₹) (0 for Free)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                  Arabic Calligraphy Inscription
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={newArabicCalligraphy}
                  onChange={(e) => setNewArabicCalligraphy(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white font-arabic text-base"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-espresso-muted uppercase mb-1">
                  Image Mockup URL
                </label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gold/30 bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => setShowAddTemplateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-espresso-muted hover:text-espresso"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gold-gradient shadow-gold-glow"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
