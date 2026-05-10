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
        a: "We recommend booking at least 6–8 weeks before departure for the best availability and pricing on flights and hotels. For peak seasons (Dec–Jan, Jul–Aug) or bucket-list destinations like Maldives or Santorini, 3–6 months ahead is ideal. That said, we've pulled off amazing last-minute trips — just ask!",
      },
      {
        q: "Can I customize an existing package?",
        a: "Absolutely — every package on Voyara is a starting point, not a fixed itinerary. You can swap hotels, add or remove excursions, change travel dates, extend stays, and add private transfers. Your dedicated travel designer will tailor everything to you during a free consultation call.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, bank transfer, and for orders above $1,500 we also offer installment plans — split your payment into 3 interest-free monthly installments with zero extra fees.",
      },
    ],
  },
  {
    category: "Travel",
    color: "#38bdf8",
    items: [
      {
        q: "Do you handle visa applications?",
        a: "We provide comprehensive visa guidance for all destinations: required documents, processing times, embassy contacts, and step-by-step instructions. For select destinations we partner with a visa facilitation service to handle the paperwork for you at a flat fee.",
      },
      {
        q: "What happens if my flight gets cancelled?",
        a: "Our 24/7 emergency concierge team springs into action immediately — rebooking flights, rearranging hotel check-ins, and keeping your itinerary as intact as possible. All our packages include travel disruption coverage, and we recommend adding our premium travel insurance for full peace of mind.",
      },
      {
        q: "Are solo travelers welcome?",
        a: "100%. Solo travel is one of our specialties. We offer single-room supplements, small group tours where you can meet fellow travellers, and solo-focused itineraries designed for safety, spontaneity, and connection. We'll never charge you a hidden solo penalty.",
      },
    ],
  },
  {
    category: "Support",
    color: "#4ade80",
    items: [
      {
        q: "What is your cancellation and refund policy?",
        a: "Cancel 30+ days before departure for a full refund. 15–29 days: 70% refund. 7–14 days: 50% refund. Under 7 days: non-refundable (travel insurance covers force majeure events). We also offer free rescheduling up to 21 days before travel — no questions asked.",
      },
      {
        q: "Is there support available during my trip?",
        a: "Yes — your personal Voyara concierge is reachable 24/7 via WhatsApp, phone, and in-app chat for the entire duration of your trip. Response time is under 15 minutes for urgent matters. We also pre-load your itinerary, local emergency numbers, and offline maps in our companion app.",
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
      {/* Toggle icon */}
      <motion.div
        className="flex-shrink-0 w-8 h-8 rounded-full grid place-items-center mt-0.5 transition-all duration-300"
        animate={{
          backgroundColor: isOpen ? color : "#f1f5f9",
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
            <Plus className="w-4 h-4 text-slate-500" />
          )}
        </motion.div>
      </motion.div>

      <span
        className="text-base font-semibold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors"
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
            {/* Left accent bar */}
            <div
              className="relative pl-4 border-l-2"
              style={{ borderColor: `${color}66` }}
            >
              <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Divider */}
    <div className="h-px bg-slate-100 mx-1" />
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
          opacity: 0.12,
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

// ─── Category tab ─────────────────────────────────────────────────────────────
const CategoryTab = ({
  cat,
  active,
  onClick,
}: {
  cat: (typeof faqs)[0];
  active: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex-shrink-0"
    animate={{
      backgroundColor: active ? cat.color : "#f1f5f9",
      color: active ? "white" : "#64748b",
      scale: active ? 1.05 : 1,
      boxShadow: active ? `0 8px 24px ${cat.color}40` : "none",
    }}
    whileHover={{ scale: active ? 1.05 : 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {cat.category}
  </motion.button>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const currentFaq = faqs[activeCategory];
  let globalCounter = 0;

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      <FloatingQMarks />

      {/* BG blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-orange-50 blur-3xl opacity-60 -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-sky-50 blur-3xl opacity-60 -z-10" />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            <span className="w-6 h-px bg-orange-400" />
            Got Questions?
            <span className="w-6 h-px bg-orange-400" />
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Frequently asked{" "}
            <span
              className="italic font-light"
              style={{
                background: "linear-gradient(135deg, #f97316, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              questions
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Everything you need to know before your first adventure with Voyara.
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {faqs.map((cat, i) => (
            <CategoryTab
              key={cat.category}
              cat={cat}
              active={activeCategory === i}
              onClick={() => {
                setActiveCategory(i);
                setOpenIndex(0);
              }}
            />
          ))}
        </motion.div>

        {/* ── Accordion panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden px-6 md:px-8 py-2"
          >
            {currentFaq.items.map((item, idx) => (
              <AccordionItem
                key={item.q}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                color={currentFaq.color}
                globalIndex={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Still have questions CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fff7ed, #eff6ff)" }}
        >
          {/* Decorative ring */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 border-orange-100" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-2 border-sky-100" />

          <MessageCircle className="w-10 h-10 mx-auto mb-4 text-orange-400" />
          <h3
            className="text-2xl font-bold text-slate-800 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Still have questions?
          </h3>
          <p className="text-slate-500 text-sm mb-7 max-w-sm mx-auto">
            Our travel experts are online right now. Usually reply in under 5
            minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm shadow-md shadow-orange-200"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              <Headphones className="w-4 h-4" />
              Live Chat
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 text-sm bg-white border border-slate-200 shadow-sm"
            >
              <Mail className="w-4 h-4 text-sky-500" />
              Send Email
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,300&display=swap');
      `}</style>
    </section>
  );
};
