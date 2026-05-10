import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import { destinations } from "../data/destinations";
import { Navbar } from "../components/landing/Navbar";
import { Footer } from "../components/landing/CtaFooter";
import { useNavigate } from "react-router-dom";

export const AllDestinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const navigate = useNavigate();

  const tags = ["All", ...new Set(destinations.map((d) => d.tag))];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === "All" || d.tag === activeTag;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeTag]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* ── Header ── */}
      <header className="pt-32 pb-12 bg-gradient-to-b from-orange-50/50 to-background dark:from-orange-950/10">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-display mb-6"
          >
            Explore the{" "}
            <span className="italic font-light text-orange-500">World</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From hidden emerald lagoons to neon-lit cityscapes, find the
            destination that speaks to your soul.
          </p>
        </div>
      </header>

      {/* ── Controls (Search & Filter) ── */}
      <section className="top-[72px] z-40 bg-background/80 backdrop-blur-xl border-y border-border py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all"
            />
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-2 hidden md:block" />
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTag === tag
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <main className="container mx-auto px-6 py-12 flex-grow">
        {filteredDestinations.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((d) => (
                <DestinationCard key={d.id} d={d} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-grid place-items-center w-16 h-16 rounded-full bg-secondary mb-4 text-muted-foreground">
              <X className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">No destinations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

// ─── Sub-component: DestinationCard ───
const DestinationCard = ({ d }: { d: any }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
    className="group relative cursor-pointer"
    onClick={() => (window.location.href = `/destinations/${d.id}`)}
  >
    <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative border border-border shadow-sm">
      <img
        src={d.img}
        alt={d.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute top-6 left-6">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
          {d.tag}
        </span>
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <div className="flex items-center gap-1 text-white/70 text-xs mb-2">
          <MapPin className="w-3 h-3" />
          {d.country}
        </div>
        <h3 className="text-2xl font-bold font-display mb-1">{d.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: d.color }}>
            {d.price}
          </span>
          <button
            onClick={() => (window.location.href = `/destinations/${d.id}`)}
            className="text-xs text-white/60 group-hover:text-white transition-colors"
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default AllDestinations;
