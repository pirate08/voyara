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
    glow: "#fed7aa",
    detail: ["Smart filters", "AI recommendations", "Seasonal guides"],
  },
  {
    icon: Sliders,
    number: "02",
    title: "Customize Every Detail",
    desc: "Choose your hotels, activities, and pace. Our travel designers craft a bespoke itinerary around your life.",
    color: "#38bdf8",
    glow: "#bae6fd",
    detail: ["Designer consultation", "Flexible dates", "Add-ons"],
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Book with Confidence",
    desc: "Secure checkout in under 2 minutes. Full refund protection and 24/7 concierge from day one.",
    color: "#4ade80",
    glow: "#bbf7d0",
    detail: ["SSL secure", "Best price guarantee", "Installments"],
  },
  {
    icon: Plane,
    number: "04",
    title: "Fly & Explore",
    desc: "Arrive to pre-arranged transfers, checked-in rooms, and a local guide ready to show you the real destination.",
    color: "#c084fc",
    glow: "#e9d5ff",
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
      animate={{ scale: active ? [1, 1.3, 1] : 1, opacity: active ? 0.9 : 0.3 }}
      transition={{ duration: 2.5, repeat: active ? Infinity : 0 }}
    />
    <motion.div
      className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${color}25, ${color}50)`,
        border: `1.5px solid ${color}60`,
        boxShadow: active
          ? `0 16px 40px ${color}35, inset 0 1px 0 ${color}40`
          : `0 6px 16px ${color}18, inset 0 1px 0 ${color}20`,
      }}
      animate={{ y: active ? [0, -6, 0] : 0 }}
      transition={{
        duration: 3,
        repeat: active ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1/2 opacity-30 rounded-t-2xl"
        style={{ background: "linear-gradient(to bottom, white, transparent)" }}
      />
      <Icon className="w-9 h-9 relative z-10" style={{ color }} />
    </motion.div>

    {active &&
      [0, 1, 2].map((j) => (
        <motion.div
          key={j}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: color,
            top: `${20 + j * 28}%`,
            right: "-6px",
          }}
          animate={{ x: [0, 14, 0], y: [0, -8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: j * 0.55 }}
        />
      ))}
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
        className="relative w-full rounded-3xl border text-center px-5 pt-6 pb-7"
        animate={{
          borderColor: active ? `${step.color}50` : "#f1f5f9",
          backgroundColor: active ? `${step.color}07` : "white",
          boxShadow: active
            ? `0 16px 50px ${step.color}18, 0 4px 16px ${step.color}12`
            : "0 2px 8px rgba(0,0,0,0.04)",
          y: active ? -4 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Step number — inside card at top, centered */}
        <motion.div
          className="inline-flex items-center text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5"
          animate={{
            backgroundColor: active ? step.color : "#f1f5f9",
            color: active ? "white" : "#94a3b8",
          }}
          transition={{ duration: 0.3 }}
        >
          Step {step.number}
        </motion.div>

        {/* Icon */}
        <div className="mb-5">
          <FloatingIcon
            Icon={Icon}
            color={step.color}
            glow={step.glow}
            active={active}
          />
        </div>

        <h3
          className="text-lg font-bold text-slate-800 mb-2.5 leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {step.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">
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

        {active && (
          <motion.div
            layoutId="activeStepDot"
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: step.color }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Connector between cards ───────────────────────────────────────────────────
const ConnectorArrow = ({
  active,
  color,
}: {
  active: boolean;
  color: string;
}) => (
  <div className="hidden lg:flex items-center justify-center w-8 flex-shrink-0 self-center">
    <div className="relative w-full">
      {/* Track */}
      <div className="w-full h-[2px] bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, #38bdf8)` }}
          animate={{ width: active ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {/* Arrow tip */}
      <svg
        viewBox="0 0 10 10"
        className="w-2.5 h-2.5 absolute -right-1.5 top-1/2 -translate-y-1/2"
        fill="none"
      >
        <motion.path
          d="M1 5 H9 M6 2 L9 5 L6 8"
          stroke={active ? "#38bdf8" : "#e2e8f0"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: active ? 1 : 0.4 }}
        />
      </svg>
    </div>
  </div>
);

// ─── Mobile vertical connector ─────────────────────────────────────────────────
const MobileConnector = ({
  active,
  color,
}: {
  active: boolean;
  color: string;
}) => (
  <div className="lg:hidden flex justify-center my-2">
    <div className="relative h-8 w-[2px] bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full rounded-full"
        style={{ background: color }}
        animate={{ height: active ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* BG */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-orange-50 blur-3xl opacity-70" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-sky-50 blur-3xl opacity-70" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            <span className="w-6 h-px bg-orange-400" />
            Simple Process
            <span className="w-6 h-px bg-orange-400" />
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your journey in{" "}
            <span
              className="italic font-light"
              style={{
                background: "linear-gradient(135deg, #f97316, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              4 easy steps
            </span>
          </h2>
          <p className="mt-5 text-slate-500 text-lg max-w-xl mx-auto">
            From wandering mind to boarding pass — we make the whole journey
            effortless.
          </p>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="relative h-1 bg-slate-100 rounded-full max-w-2xl mx-auto mb-14 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: progressWidth,
              background: "linear-gradient(90deg, #f97316, #38bdf8)",
            }}
          />
        </div>

        {/* ── Desktop: single flex row, items-start keeps tops aligned ── */}
        <div className="hidden lg:flex flex-row items-start gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-row items-center flex-1 min-w-0"
            >
              <div className="flex-1 min-w-0">
                <StepCard
                  step={step}
                  i={i}
                  active={activeStep === i}
                  onClick={() => setActiveStep(i)}
                />
              </div>
              {i < steps.length - 1 && (
                <ConnectorArrow active={activeStep > i} color={step.color} />
              )}
            </div>
          ))}
        </div>

        {/* ── Mobile: vertical stack with connectors ── */}
        <div className="lg:hidden flex flex-col">
          {steps.map((step, i) => (
            <div key={step.number}>
              <StepCard
                step={step}
                i={i}
                active={activeStep === i}
                onClick={() => setActiveStep(i)}
              />
              {i < steps.length - 1 && (
                <MobileConnector active={activeStep > i} color={step.color} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-3 mt-8 lg:hidden">
          {steps.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-2 rounded-full"
              animate={{
                width: activeStep === i ? 28 : 8,
                backgroundColor: activeStep === i ? s.color : "#cbd5e1",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-lg shadow-orange-200 text-base"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            Start Planning Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-400" />
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
