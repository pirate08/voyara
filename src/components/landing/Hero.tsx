import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Play, Star, MapPin, Compass, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

// ─── Globe + Plane SVG Component ───────────────────────────────────────────
const GlobePlane = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full bg-gradient-to-br from-orange-400/20 to-sky-400/20 blur-3xl animate-pulse-slow" />

      {/* Globe SVG */}
      <svg
        viewBox="0 0 300 300"
        className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="globeGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="40%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
          <radialGradient id="globeShine" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx="150" cy="150" r="120" />
          </clipPath>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base globe */}
        <circle cx="150" cy="150" r="120" fill="url(#globeGrad)" />

        {/* Land masses */}
        <g clipPath="url(#globeClip)" className="origin-center">
          {/* Europe/Africa */}
          <ellipse
            cx="148"
            cy="120"
            rx="28"
            ry="38"
            fill="#4ade80"
            opacity="0.85"
          />
          <ellipse
            cx="155"
            cy="170"
            rx="22"
            ry="35"
            fill="#22c55e"
            opacity="0.85"
          />
          {/* Americas */}
          <ellipse
            cx="85"
            cy="115"
            rx="18"
            ry="32"
            fill="#4ade80"
            opacity="0.8"
          />
          <ellipse
            cx="80"
            cy="165"
            rx="14"
            ry="28"
            fill="#16a34a"
            opacity="0.8"
          />
          {/* Asia */}
          <ellipse
            cx="200"
            cy="110"
            rx="35"
            ry="28"
            fill="#4ade80"
            opacity="0.85"
          />
          <ellipse
            cx="215"
            cy="150"
            rx="20"
            ry="18"
            fill="#22c55e"
            opacity="0.75"
          />
          {/* Australia */}
          <ellipse
            cx="220"
            cy="195"
            rx="20"
            ry="14"
            fill="#4ade80"
            opacity="0.8"
          />
          {/* Antarctica */}
          <ellipse
            cx="150"
            cy="262"
            rx="70"
            ry="16"
            fill="#e0f2fe"
            opacity="0.6"
          />

          {/* Latitude lines */}
          {[-60, -30, 0, 30, 60].map((lat, i) => {
            const y = 150 + (lat / 90) * 120;
            const halfWidth = Math.sqrt(
              Math.max(0, 120 * 120 - (y - 150) * (y - 150)),
            );
            return (
              <line
                key={i}
                x1={150 - halfWidth}
                y1={y}
                x2={150 + halfWidth}
                y2={y}
                stroke="white"
                strokeWidth="0.5"
                opacity="0.25"
              />
            );
          })}

          {/* Longitude lines */}
          {[0, 30, 60, 90, 120, 150].map((_, i) => (
            <ellipse
              key={i}
              cx="150"
              cy="150"
              rx={10 + i * 20}
              ry="120"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.2"
            />
          ))}
        </g>

        {/* Shine overlay */}
        <circle cx="150" cy="150" r="120" fill="url(#globeShine)" />

        {/* Globe border */}
        <circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Location pins */}
        {[
          { cx: 148, cy: 100, label: "Paris" },
          { cx: 85, cy: 130, label: "NYC" },
          { cx: 210, cy: 115, label: "Tokyo" },
        ].map((pin, i) => (
          <g key={i}>
            <motion.circle
              cx={pin.cx}
              cy={pin.cy}
              r="5"
              fill="#f97316"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: 1 }}
              transition={{
                delay: 1.5 + i * 0.4,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
            <circle cx={pin.cx} cy={pin.cy} r="3" fill="white" />
          </g>
        ))}
      </svg>

      {/* ── Orbiting Plane ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute"
          style={{
            width: "calc(100% + 60px)",
            height: "calc(100% + 60px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Plane at top of orbit */}
          <motion.div
            className="absolute -top-5 left-1/2 -translate-x-1/2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* SVG Plane icon */}
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg"
              style={{ transform: "rotate(90deg)" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="planeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Fuselage */}
              <path
                d="M20 4 C16 4 14 8 14 14 L14 28 C14 31 16 33 20 33 C24 33 26 31 26 28 L26 14 C26 8 24 4 20 4Z"
                fill="url(#planeGrad)"
              />
              {/* Wings */}
              <path
                d="M14 18 L2 24 L6 24 L14 22Z"
                fill="url(#planeGrad)"
                opacity="0.9"
              />
              <path
                d="M26 18 L38 24 L34 24 L26 22Z"
                fill="url(#planeGrad)"
                opacity="0.9"
              />
              {/* Tail */}
              <path
                d="M16 27 L10 33 L14 33 L20 29 L26 33 L30 33 L24 27Z"
                fill="url(#planeGrad)"
                opacity="0.85"
              />
              {/* Window */}
              <ellipse
                cx="20"
                cy="14"
                rx="3"
                ry="4"
                fill="white"
                opacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Contrail dots */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${-10 + i * 12}px`,
                left: "50%",
                transform: `translateX(-50%)`,
              }}
            >
              <div
                className="w-1 h-1 rounded-full bg-orange-300"
                style={{ opacity: 1 - i * 0.18 }}
              />
            </div>
          ))}
        </motion.div>

        {/* Orbit ring (dashed) */}
        <div
          className="absolute rounded-full border-2 border-dashed border-orange-300/30"
          style={{
            width: "calc(100% + 60px)",
            height: "calc(100% + 60px)",
          }}
        />
      </div>

      {/* Floating destination cards */}
      <motion.div
        className="absolute -left-4 md:-left-8 top-1/4 glass-card rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-white flex items-center gap-2 shadow-xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <MapPin className="w-3 h-3 text-orange-500" />
        <span>Bali, Indonesia</span>
      </motion.div>

      <motion.div
        className="absolute -right-4 md:-right-8 bottom-1/3 glass-card rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-white flex items-center gap-2 shadow-xl"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Compass className="w-3 h-3 text-sky-500" />
        <span>Santorini, Greece</span>
      </motion.div>
    </div>
  );
};

// ─── Animated Cloud ─────────────────────────────────────────────────────────
const Cloud = ({
  top,
  delay,
  size,
}: {
  top: string;
  delay: number;
  size: number;
}) => (
  <motion.div
    className="absolute opacity-20"
    style={{ top }}
    initial={{ x: "-10%" }}
    animate={{ x: "110%" }}
    transition={{
      duration: 20 + delay * 5,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  >
    <svg viewBox="0 0 200 80" width={size} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="50" rx="90" ry="30" fill="white" />
      <ellipse cx="70" cy="40" rx="45" ry="35" fill="white" />
      <ellipse cx="130" cy="38" rx="40" ry="32" fill="white" />
    </svg>
  </motion.div>
);

// ─── Main Hero ───────────────────────────────────────────────────────────────
export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { num: "120+", label: "Destinations" },
    { num: "10K+", label: "Happy travelers" },
    { num: "4.9★", label: "Avg rating" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-br from-sky-50 via-orange-50/40 to-blue-100"
    >
      {/* ── Animated background gradient mesh ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-100 via-white to-orange-50" />
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-200/40 to-yellow-200/30 blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-sky-200/50 to-blue-300/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Floating clouds ── */}
      <Cloud top="15%" delay={0} size={180} />
      <Cloud top="35%" delay={5} size={120} />
      <Cloud top="60%" delay={2} size={220} />

      {/* ── Main content grid ── */}
      <div className="container relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[80vh]">
          {/* ── Left: Text content ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-4 py-2 mb-8 w-fit shadow-sm"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
                ].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`Traveler ${i + 1}`}
                    className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700 ml-1">
                Trusted by 10,000+ travelers
              </span>
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-slate-800 leading-[0.95] max-w-2xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Explore the{" "}
              <span
                className="italic font-light"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316, #fb923c, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                world
              </span>
              <br />
              <span className="text-slate-700">with us.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-7 text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed"
            >
              Curated journeys to the planet's most breathtaking destinations.
              Hand-crafted itineraries, premium stays, unforgettable moments.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#contact")}
                className="group flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white shadow-lg shadow-orange-300/50 text-base transition-all"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                Book Now
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#destinations")}
                className="flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-slate-700 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-all text-base"
              >
                <Play className="w-4 h-4 fill-orange-500 text-orange-500" />
                Explore Destinations
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-14 grid grid-cols-3 gap-3 max-w-lg"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="font-display text-2xl md:text-3xl font-bold"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      background: "linear-gradient(135deg, #ea580c, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Globe + Plane ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center order-1 lg:order-2 h-[340px] sm:h-[420px] lg:h-[520px]"
          >
            {/* Wind/speed lines */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-orange-300/40 to-transparent"
                style={{ top: `${25 + i * 20}%`, width: "40%" }}
                animate={{ x: ["-100%", "300%"], opacity: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <GlobePlane />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-xs uppercase tracking-widest flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-400/80 to-transparent" />
      </motion.div>

      {/* ── Inline styles for Playfair + animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,300;1,700&display=swap');

        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.9);
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.08); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
