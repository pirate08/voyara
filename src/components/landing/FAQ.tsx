import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useRef } from "react";
import { Plus, Minus, MessageCircle, Headphones, Mail } from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    category: "Booking",
    color: "#f97316",
    items: [
      {
        q: "How far in advance should I book my trip?",
        a: "We recommend booking at least 6–8 weeks before departure for the best availability and pricing on flights and hotels. For peak seasons (Dec–Jan, Jul–Aug) or bucket-list destinations like Maldives or Santorini, 3–6 months ahead is ideal.",
      },
      {
        q: "Can I customize an existing package?",
        a: "Absolutely — every package on Voyara is a starting point, not a fixed itinerary. Your dedicated travel designer will tailor everything to you during a free consultation call.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards, PayPal, bank transfer, and for orders above $1,500 we also offer interest-free installment plans.",
      },
    ],
  },
  {
    category: "Travel",
    color: "#38bdf8",
    items: [
      {
        q: "Do you handle visa applications?",
        a: "We provide comprehensive visa guidance for all destinations: required documents, processing times, and step-by-step instructions.",
      },
      {
        q: "What happens if my flight gets cancelled?",
        a: "Our 24/7 emergency concierge team springs into action immediately — rebooking flights and rearranging hotel check-ins.",
      },
    ],
  },
  {
    category: "Support",
    color: "#4ade80",
    items: [
      {
        q: "What is your cancellation and refund policy?",
        a: "Cancel 30+ days before departure for a full refund. We also offer free rescheduling up to 21 days before travel — no questions asked.",
      },
      {
        q: "Is there support available during my trip?",
        a: "Yes — your personal Voyara concierge is reachable 24/7 via WhatsApp, phone, and in-app chat for the entire duration of your trip.",
      },
    ],
  },
];

// ─── Accordion Item ───────────────────────────────────────────────────────────
const AccordionItem = ({
  item,
  isOpen,
  onToggle,
  color,
  globalIndex,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  color: string;
  globalIndex: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: globalIndex * 0.06 }}
    className="group"
  >
    <motion.button
      onClick={onToggle}
      className="w-full text-left flex items-start gap-4 py-5 px-1 focus:outline-none"
      whileTap={{ scale: 0.995 }}
    >
      <motion.div
        className="flex-shrink-0 w-8 h-8 rounded-full grid place-items-center mt-0.5 transition-all duration-300"
        /* CHANGE: #f1f5f9 -> secondary */
        animate={{
          backgroundColor: isOpen ? color : "hsl(var(--secondary))",
          scale: isOpen ? 1.1 : 1,
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            /* CHANGE: text-slate-500 -> text-muted-foreground */
            <Plus className="w-4 h-4 text-muted-foreground" />
          )}
        </motion.div>
      </motion.div>

      {/* CHANGE: text-slate-800 -> text-foreground */}
      <span
        className="text-base font-semibold text-foreground leading-snug group-hover:opacity-80 transition-opacity"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {item.q}
      </span>
    </motion.button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pl-12 pr-2 pb-6">
            <div
              className="relative pl-4 border-l-2"
              style={{ borderColor: `${color}66` }}
            >
              {/* CHANGE: text-slate-500 -> text-muted-foreground */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* CHANGE: bg-slate-100 -> bg-border */}
    <div className="h-px bg-border mx-1" />
  </motion.div>
);

// ─── Floating 3D Question Marks ───────────────────────────────────────────────
const FloatingQMarks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      {
        top: "10%",
        left: "5%",
        size: 32,
        delay: 0,
        color: "#f97316",
        rot: -15,
      },
      {
        top: "25%",
        right: "8%",
        size: 20,
        delay: 1.5,
        color: "#38bdf8",
        rot: 20,
      },
      { top: "60%", left: "3%", size: 16, delay: 3, color: "#4ade80", rot: 10 },
      {
        top: "75%",
        right: "5%",
        size: 28,
        delay: 0.8,
        color: "#f97316",
        rot: -8,
      },
      {
        bottom: "15%",
        left: "8%",
        size: 14,
        delay: 2,
        color: "#38bdf8",
        rot: 25,
      },
    ].map((qm, i) => (
      <motion.div
        key={i}
        className="absolute font-black select-none"
        style={{
          top: qm.top,
          left: (qm as any).left,
          right: (qm as any).right,
          bottom: (qm as any).bottom,
          fontSize: qm.size,
          color: qm.color,
          opacity: 0.1, // Lowered slightly for dark mode harmony
          rotate: qm.rot,
          fontFamily: "'Playfair Display', serif",
          filter: "blur(0.5px)",
        }}
        animate={{ y: [0, -16, 0], rotate: [qm.rot, qm.rot + 8, qm.rot] }}
        transition={{
          duration: 5 + i,
          repeat: Infinity,
          ease: "easeInOut",
          delay: qm.delay,
        }}
      >
        ?
      </motion.div>
    ))}
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      <FloatingQMarks />

      {/* CHANGE: bg-orange-50 -> bg-primary/5 for dark mode compatibility */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            <span className="w-6 h-px bg-orange-400" /> Got Questions?{" "}
            <span className="w-6 h-px bg-orange-400" />
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Frequently asked{" "}
            <span className="italic font-light text-gradient-sunset">
              questions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to know before your first adventure with Voyara.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {faqs.map((cat, i) => (
            <motion.button
              key={cat.category}
              onClick={() => {
                setActiveCategory(i);
                setOpenIndex(0);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === i
                  ? "text-white"
                  : "text-muted-foreground bg-secondary"
              }`}
              style={{
                backgroundColor: activeCategory === i ? cat.color : undefined,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.category}
            </motion.button>
          ))}
        </div>

        {/* Accordion panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden px-6 md:px-8 py-2"
          >
            {faqs[activeCategory].items.map((item, idx) => (
              <AccordionItem
                key={item.q}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                color={faqs[activeCategory].color}
                globalIndex={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CHANGE: Background now uses card/border instead of hardcoded white/orange */}
        <motion.div className="mt-12 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden bg-card border border-border">
          {/* Decorative ring - hidden in dark mode for cleaner look */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 border-primary/5" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-2 border-accent/5" />

          <MessageCircle className="w-10 h-10 mx-auto mb-4 text-orange-500" />
          <h3
            className="text-2xl font-bold text-foreground mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Still have questions?
          </h3>
          <p className="text-muted-foreground text-sm mb-7 max-w-sm mx-auto">
            Our travel experts are online right now. Usually reply in under 5
            minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              <Headphones className="w-4 h-4" /> Live Chat
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground text-sm bg-secondary border border-border"
            >
              <Mail className="w-4 h-4 text-sky-500" /> Send Email
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
