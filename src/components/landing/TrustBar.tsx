import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Award, Star, Users, Globe, Clock } from "lucide-react";
import { useRef } from "react";

const stats = [
  { icon: Users, value: "10K+", label: "Happy Travelers", color: "#f97316" },
  { icon: Globe, value: "120+", label: "Destinations", color: "#38bdf8" },
  { icon: Star, value: "4.9", label: "Average Rating", color: "#fbbf24" },
  { icon: Clock, value: "8+", label: "Years of Expertise", color: "#4ade80" },
];

const pressLogos = [
  {
    name: "Forbes",
    style: {
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      letterSpacing: "-1px",
    },
  },
  {
    name: "TravelWeekly",
    style: { fontFamily: "Georgia, serif", fontStyle: "italic" },
  },
  {
    name: "Condé Nast",
    style: {
      fontFamily: "Georgia, serif",
      fontWeight: 300,
      letterSpacing: "2px",
    },
  },
  {
    name: "AFAR",
    style: { fontFamily: "'Arial Black', sans-serif", letterSpacing: "4px" },
  },
  { name: "Lonely Planet", style: { fontFamily: "Georgia, serif" } },
  {
    name: "National Geo",
    style: { fontFamily: "'Arial Black', sans-serif", letterSpacing: "1px" },
  },
];

const StatCard = ({ stat, i }: { stat: (typeof stats)[0]; i: number }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      whileHover={{ y: -6, scale: 1.04 }}
      /* CHANGE: bg-white -> bg-card | border-slate-100 -> border-border */
      className="relative flex flex-col items-center gap-2 px-6 py-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-default group"
    >
      <div
        className="w-11 h-11 rounded-xl grid place-items-center mb-1 transition-transform duration-300 group-hover:rotate-12"
        style={{ backgroundColor: `${stat.color}18` }}
      >
        <Icon className="w-5 h-5" style={{ color: stat.color }} />
      </div>

      <span
        className="text-3xl font-bold leading-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          background: `linear-gradient(135deg, ${stat.color}, ${stat.color}aa)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {stat.value}
      </span>

      {/* CHANGE: text-slate-500 -> text-muted-foreground */}
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
        {stat.label}
      </span>

      <motion.div
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
        style={{ backgroundColor: stat.color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
      />
    </motion.div>
  );
};

const badges = [
  { icon: Shield, label: "Secure Payments", sub: "256-bit SSL" },
  { icon: Award, label: "Award Winning", sub: "Best Agency 2024" },
  { icon: Star, label: "Top Rated", sub: "on TrustPilot" },
];

export const TrustBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const loopLogos = [...pressLogos, ...pressLogos];

  return (
    <section
      ref={ref}
      /* CHANGE: from-slate-50 to-white -> from-background to-secondary/20 */
      className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-b from-background to-secondary/20"
    >
      {/* Subtle grid bg - CHANGE: opacity based on theme */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          y: bgY,
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* CHANGE: fill="white" -> fill="hsl(var(--background))" */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 40"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
            <span className="w-6 h-px bg-orange-400" />
            Trusted Worldwide
            <span className="w-6 h-px bg-orange-400" />
          </span>
          {/* CHANGE: text-slate-800 -> text-foreground */}
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Thousands of adventures. One trusted partner.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} i={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* CHANGE: text-slate-400 -> text-muted-foreground */}
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            As featured in
          </p>
          <div className="relative overflow-hidden">
            {/* CHANGE: Fades now use the background variable */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div
              className="flex items-center gap-12 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {loopLogos.map((logo, i) => (
                <span
                  key={i}
                  /* CHANGE: text-slate-300 -> text-muted-foreground/50 */
                  className="text-xl text-muted-foreground/40 hover:text-foreground transition-colors duration-300 cursor-default select-none flex-shrink-0"
                  style={logo.style}
                >
                  {logo.name}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ scale: 1.05 }}
                /* CHANGE: bg-white -> bg-card | border-slate-200 -> border-border */
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/10 grid place-items-center">
                  <Icon className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  {/* CHANGE: text-slate-700 -> text-foreground */}
                  <div className="text-sm font-bold text-foreground">
                    {b.label}
                  </div>
                  {/* CHANGE: text-slate-400 -> text-muted-foreground */}
                  <div className="text-xs text-muted-foreground">{b.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
