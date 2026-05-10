import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, ArrowUpRight, Plane } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Destination {
  img: string;
  name: string;
  country: string;
  desc: string;
  price: string;
  tag: string;
  color: string; // accent color per card
}

// ─── Static data (swap with Strapi fetch later) ───────────────────────────────
const destinations: Destination[] = [
  {
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    name: "Santorini",
    country: "Greece",
    desc: "Whitewashed villages perched above the deep Aegean blue",
    price: "from $1,890",
    tag: "Coastal",
    color: "#38bdf8",
  },
  {
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    name: "Bali",
    country: "Indonesia",
    desc: "Lush rice terraces, ancient temples & spiritual retreats",
    price: "from $1,290",
    tag: "Tropical",
    color: "#4ade80",
  },
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    name: "Swiss Alps",
    country: "Switzerland",
    desc: "Snow-capped peaks, alpine lakes & crisp mountain air",
    price: "from $2,450",
    tag: "Mountain",
    color: "#a78bfa",
  },
  {
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    name: "Tokyo",
    country: "Japan",
    desc: "Neon nights, ramen alleys & cherry blossom days",
    price: "from $2,180",
    tag: "City",
    color: "#f472b6",
  },
  {
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    name: "Maldives",
    country: "Indian Ocean",
    desc: "Overwater villas floating in turquoise coral lagoons",
    price: "from $3,290",
    tag: "Luxury",
    color: "#fb923c",
  },
  {
    img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
    name: "Iceland",
    country: "Reykjavík",
    desc: "Northern lights dancing over ancient volcanic glaciers",
    price: "from $2,690",
    tag: "Adventure",
    color: "#34d399",
  },
];

// ─── Ticker tags ──────────────────────────────────────────────────────────────
const tickerItems = [
  "✈ Santorini",
  "🌴 Bali",
  "🏔 Swiss Alps",
  "🗼 Tokyo",
  "🐠 Maldives",
  "🌌 Iceland",
  "🏛 Rome",
  "🌊 Amalfi Coast",
  "🦁 Safari Kenya",
  "🎭 Barcelona",
  "🌸 Kyoto",
  "🏖 Phuket",
];

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
const TiltCard = ({ d, i }: { d: Destination; i: number }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 20 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  const slug = d.name.toLowerCase().replace(/ /g, "-");

  const handleNavigate = () => {
    navigate(`/destinations/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
      onClick={handleNavigate}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative rounded-3xl overflow-hidden cursor-pointer will-change-transform"
      >
        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden">
          <motion.img
            src={d.img}
            alt={`${d.name}, ${d.country}`}
            loading="lazy"
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: hovered
              ? `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
              : "none",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Top tag */}
        <div className="absolute top-5 left-5">
          <motion.span
            className="text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: `${d.color}99`,
              backdropFilter: "blur(8px)",
              border: `1px solid ${d.color}66`,
            }}
          >
            {d.tag}
          </motion.span>
        </div>

        {/* Arrow button */}
        <motion.div
          className="absolute top-5 right-5 w-10 h-10 rounded-full grid place-items-center text-white"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
          }}
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 8,
            scale: hovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.15, backgroundColor: d.color }}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>

        {/* Bottom content — translates up on hover in 3D space */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex items-center gap-1.5 text-sm text-white/70 mb-1">
            <MapPin className="w-3.5 h-3.5" />
            {d.country}
          </div>
          <h3
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {d.name}
          </h3>

          {/* Desc slides up on hover */}
          <motion.p
            className="text-white/80 text-sm mb-4 overflow-hidden"
            animate={{ maxHeight: hovered ? 80 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {d.desc}
          </motion.p>

          <div className="flex items-center justify-between pt-3 border-t border-white/20">
            <span className="text-base font-bold" style={{ color: d.color }}>
              {d.price}
            </span>
            <motion.span
              className="text-sm font-medium flex items-center gap-1 cursor-pointer"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleNavigate}
            >
              View details →
            </motion.span>
          </div>
        </div>

        {/* Bottom accent glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
          style={{ backgroundColor: d.color }}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── Infinite Ticker ──────────────────────────────────────────────────────────
const Ticker = () => {
  const items = [...tickerItems, ...tickerItems]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden py-4 mb-14">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 dark:from-slate-950" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 dark:from-slate-950" />

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-orange-300 hover:text-orange-500 transition-colors cursor-default select-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Counter Badge ────────────────────────────────────────────────────────────
const CounterBadge = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = destinations.length;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <div ref={ref} className="flex items-center gap-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={visible ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="flex items-center gap-2 bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-orange-200"
      >
        <Plane className="w-4 h-4" />
        <span>{count} destinations</span>
      </motion.div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export const Destinations = () => {
  return (
    <section
      id="destinations"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white dark:from-slate-950 dark:to-slate-950"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl -z-10 dark:bg-orange-900/10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky-100/50 blur-3xl -z-10 dark:bg-sky-900/10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase text-orange-500 mb-4">
              <span className="w-4 h-px bg-orange-400 inline-block" />
              Popular destinations
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl text-slate-800 dark:text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Where will your next{" "}
              <span
                className="italic font-light"
                style={{
                  background: "linear-gradient(135deg, #f97316, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                story
              </span>{" "}
              begin?
            </h2>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end">
            <p className="text-slate-500 max-w-sm text-base dark:text-slate-400">
              Hand-picked locations loved by our community. Every trip fully
              customizable to your pace.
            </p>
            <CounterBadge />
          </div>
        </motion.div>

        {/* ── Ticker ── */}
        <Ticker />

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <TiltCard key={d.name} d={d} i={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white shadow-lg shadow-orange-200 text-base"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            onClick={() => (window.location.href = "/destinations")}
          >
            <Plane className="w-4 h-4" />
            View all destinations
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,300&display=swap');
      `}</style>
    </section>
  );
};
