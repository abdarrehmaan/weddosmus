"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Template, templates as defaultTemplates } from "@/app/data/templates";

export interface CartItem {
  id: string; // unique cart entry ID
  templateId: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  customizationSummary?: string;
  timestamp: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: string;
  status: "Pending" | "Paid" | "Fulfilled" | "Cancelled";
  notes?: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  amount: number;
  description: string;
  minSpend?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

interface StoreContextType {
  templates: Template[];
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (template: Template, customSummary?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "createdAt" | "status">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  user: UserProfile;
  loginUser: (user: Partial<UserProfile>) => void;
  logoutUser: () => void;
  announcement: string;
  setAnnouncement: (msg: string) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  addTemplate: (template: Template) => void;
  deleteTemplate: (id: string) => void;
}

const DEFAULT_COUPONS: Coupon[] = [
  { code: "BISMILLAH10", discountType: "percentage", amount: 10, description: "10% off your entire order with Bismillah" },
  { code: "EID50", discountType: "percentage", amount: 50, description: "50% off Eid & Celebration cards" },
  { code: "BARAKAH", discountType: "fixed", amount: 500, description: "₹500 flat discount for weddings" },
];

const DEFAULT_USER: UserProfile = {
  name: "Zayd Al-Ansari",
  email: "zayd.ansari@example.com",
  phone: "+91 98765 43210",
  isLoggedIn: true,
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [allTemplates, setAllTemplates] = useState<Template[]>(defaultTemplates);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [announcement, setAnnouncement] = useState(
    "🌙 Special Ramadan & Nikah Season Offer: Get 10% off with code BISMILLAH10 | 100% Free Eid & Jummah Cards Available"
  );
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("noor_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem("noor_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        // Seed an initial demo order
        const seedOrder: Order = {
          id: "NOOR-78241",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          customerName: "Farhan & Zainab",
          customerEmail: "farhan@example.com",
          customerPhone: "+91 98200 12345",
          items: [
            {
              id: "cart-seed-1",
              templateId: "royal-noor-nikah",
              title: "Royal Emerald Mughal Nikah Archway",
              category: "Islamic Wedding Invitations",
              price: 2999,
              originalPrice: 4999,
              image: "/royal-archway.jpg",
              timestamp: Date.now() - 86400000 * 2,
            },
          ],
          subtotal: 2999,
          discount: 300,
          couponCode: "BISMILLAH10",
          total: 2699,
          paymentMethod: "UPI / GPay",
          status: "Paid",
          notes: "Nikah scheduled for December 2026",
        };
        setOrders([seedOrder]);
        localStorage.setItem("noor_orders", JSON.stringify([seedOrder]));
      }

      const savedUser = localStorage.getItem("noor_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      // Ignore SSR / localStorage issues
    }
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem("noor_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Save orders
  useEffect(() => {
    try {
      localStorage.setItem("noor_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const addToCart = (template: Template, customSummary?: string) => {
    const newItem: CartItem = {
      id: `${template.id}-${Date.now()}`,
      templateId: template.id,
      title: template.title,
      category: template.mainCategory,
      price: template.price,
      originalPrice: template.originalPrice,
      image: template.image,
      customizationSummary: customSummary,
      timestamp: Date.now(),
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price, 0);

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal > 0) {
    if (appliedCoupon.discountType === "percentage") {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.amount) / 100);
    } else {
      cartDiscount = Math.min(appliedCoupon.amount, cartSubtotal);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === clean);
    if (!found) {
      return { success: false, message: "Invalid or expired coupon code." };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `Coupon '${found.code}' applied! Saved ${
        found.discountType === "percentage" ? `${found.amount}%` : `₹${found.amount}`
      }.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const createOrder = (orderData: Omit<Order, "id" | "createdAt" | "status">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `NOOR-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: "Paid",
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const loginUser = (userData: Partial<UserProfile>) => {
    const updated = { ...user, ...userData, isLoggedIn: true };
    setUser(updated);
    try {
      localStorage.setItem("noor_user", JSON.stringify(updated));
    } catch {}
  };

  const logoutUser = () => {
    const updated = { ...user, isLoggedIn: false };
    setUser(updated);
    try {
      localStorage.setItem("noor_user", JSON.stringify(updated));
    } catch {}
  };

  const addCoupon = (c: Coupon) => {
    setCoupons((prev) => [c, ...prev]);
  };

  const addTemplate = (t: Template) => {
    setAllTemplates((prev) => [t, ...prev]);
  };

  const deleteTemplate = (id: string) => {
    setAllTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        templates: allTemplates,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        user,
        loginUser,
        logoutUser,
        announcement,
        setAnnouncement,
        coupons,
        addCoupon,
        addTemplate,
        deleteTemplate,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
