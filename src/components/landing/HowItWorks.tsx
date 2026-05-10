import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Search,
  Sliders,
  CreditCard,
  Plane,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover Your Dream",
    desc: "Browse 120+ hand-curated destinations. Filter by budget, vibe, season, or activity. Let wanderlust lead.",
    color: "#f97316",
    glow: "#fed7aa30", // Made more subtle for dark mode
    detail: ["Smart filters", "AI recommendations", "Seasonal guides"],
  },
  {
    icon: Sliders,
    number: "02",
    title: "Customize Every Detail",
    desc: "Choose your hotels, activities, and pace. Our travel designers craft a bespoke itinerary around your life.",
    color: "#38bdf8",
    glow: "#bae6fd30",
    detail: ["Designer consultation", "Flexible dates", "Add-ons"],
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Book with Confidence",
    desc: "Secure checkout in under 2 minutes. Full refund protection and 24/7 concierge from day one.",
    color: "#4ade80",
    glow: "#bbf7d030",
    detail: ["SSL secure", "Best price guarantee", "Installments"],
  },
  {
    icon: Plane,
    number: "04",
    title: "Fly & Explore",
    desc: "Arrive to pre-arranged transfers, checked-in rooms, and a local guide ready to show you the real destination.",
    color: "#c084fc",
    glow: "#e9d5ff30",
    detail: ["Airport pickup", "Local guide", "24/7 support"],
  },
];

// ─── 3D Floating Icon ─────────────────────────────────────────────────────────
const FloatingIcon = ({
  Icon,
  color,
  glow,
  active,
}: {
  Icon: React.ElementType;
  color: string;
  glow: string;
  active: boolean;
}) => (
  <div className="relative w-20 h-20 mx-auto">
    <motion.div
      className="absolute inset-0 rounded-2xl blur-xl"
      style={{ backgroundColor: glow }}
      animate={{ scale: active ? [1, 1.3, 1] : 1, opacity: active ? 0.8 : 0.2 }}
      transition={{ duration: 2.5, repeat: active ? Infinity : 0 }}
    />
    <motion.div
      className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
      /* CHANGE: Background now uses a glass effect that works in both modes */
      style={{
        background: `linear-gradient(145deg, ${color}15, ${color}30)`,
        border: `1px solid ${color}40`,
        boxShadow: active
          ? `0 16px 40px ${color}30`
          : `0 4px 10px rgba(0,0,0,0.1)`,
      }}
      animate={{ y: active ? [0, -6, 0] : 0 }}
      transition={{
        duration: 3,
        repeat: active ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <Icon className="w-9 h-9 relative z-10" style={{ color }} />
    </motion.div>
  </div>
);

// ─── Step Card ─────────────────────────────────────────────────────────────────
const StepCard = ({
  step,
  i,
  active,
  onClick,
}: {
  step: (typeof steps)[0];
  i: number;
  active: boolean;
  onClick: () => void;
}) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <motion.div
        /* CHANGE: Used bg-card and border-border for automatic mode switching */
        className="relative w-full rounded-3xl border text-center px-5 pt-6 pb-7 bg-card"
        animate={{
          borderColor: active ? step.color : "hsl(var(--border))",
          backgroundColor: active ? `${step.color}08` : "hsl(var(--card))",
          y: active ? -4 : 0,
        }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="inline-flex items-center text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
          /* CHANGE: Hardcoded f1f5f9 -> secondary */
          animate={{
            backgroundColor: active ? step.color : "hsl(var(--secondary))",
            color: active ? "white" : "hsl(var(--muted-foreground))",
          }}
          transition={{ duration: 0.3 }}
        >
          Step {step.number}
        </motion.div>

        <div className="mb-5">
          <FloatingIcon
            Icon={Icon}
            color={step.color}
            glow={step.glow}
            active={active}
          />
        </div>

        {/* CHANGE: text-slate-800 -> text-foreground */}
        <h3
          className="text-lg font-bold text-foreground mb-2.5 leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {step.title}
        </h3>
        {/* CHANGE: text-slate-500 -> text-muted-foreground */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
          {step.desc}
        </p>

        <div className="flex flex-wrap justify-center gap-1.5">
          {step.detail.map((d) => (
            <span
              key={d}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${step.color}15`, color: step.color }}
            >
              {d}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      /* CHANGE: White/Slate bg -> Background/Secondary */
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background to-secondary/20"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Optimized glows for both themes */}
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            <span className="w-6 h-px bg-orange-400" />
            Simple Process
            <span className="w-6 h-px bg-orange-400" />
          </span>
          {/* CHANGE: text-slate-800 -> text-foreground */}
          <h2
            className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your journey in{" "}
            <span className="italic font-light text-gradient-sunset">
              4 easy steps
            </span>
          </h2>
          {/* CHANGE: text-slate-500 -> text-muted-foreground */}
          <p className="mt-5 text-muted-foreground text-lg max-w-xl mx-auto">
            From wandering mind to boarding pass — we make the whole journey
            effortless.
          </p>
        </motion.div>

        {/* Progress Bar - CHANGE: slate-100 -> secondary */}
        <div className="relative h-1 bg-secondary rounded-full max-w-2xl mx-auto mb-14 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: progressWidth,
              background: "linear-gradient(90deg, #f97316, #38bdf8)",
            }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              i={i}
              active={activeStep === i}
              onClick={() => setActiveStep(i)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-lg shadow-orange-500/20 text-base"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            Start Planning Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Free consultation · No commitment
          </p>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,300&display=swap');
      `}</style>
    </section>
  );
};
