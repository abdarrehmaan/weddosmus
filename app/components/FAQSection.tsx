"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/app/data/templates";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-py relative overflow-hidden bg-ivory-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gold">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-espresso">
            Frequently Asked Questions
          </h2>
          <p className="text-espresso-muted text-sm sm:text-base leading-relaxed">
            Everything you need to know about our weightless 3D digital wedding invitations.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl glass-strong border border-gold/20 hover:border-gold/40 shadow-palace-soft overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 font-display text-base sm:text-lg font-bold text-espresso">
                    <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs shrink-0 font-sans">
                      Q
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-espresso-muted leading-relaxed border-t border-gold/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* More Help Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl glass border border-gold/25 max-w-xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-gold uppercase tracking-wider">
            Have a custom theme requirement?
          </div>
          <p className="text-xs text-espresso-muted">
            We build bespoke multi-event chapters for Mehendi, Sangeet, Barat, Nikah, and Walima.
          </p>
          <a
            href="https://wa.me/911234567890?text=Hi!%20I%20have%20a%20custom%20wedding%20theme%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-gold pt-2 underline underline-offset-4"
          >
            Chat with a Wedding Designer on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
