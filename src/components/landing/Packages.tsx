import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Escape",
    duration: "5 days",
    price: 1290,
    desc: "A short, perfectly curated reset.",
    features: ["4-star boutique stays", "Daily breakfast", "2 guided experiences", "Airport transfers"],
    featured: false,
  },
  {
    name: "Discovery",
    duration: "7 days",
    price: 2190,
    desc: "Our most-loved itinerary. Balanced.",
    features: ["5-star stays + 1 luxury", "All meals included", "5 private experiences", "Dedicated concierge", "Domestic flights"],
    featured: true,
  },
  {
    name: "Odyssey",
    duration: "12 days",
    price: 4490,
    desc: "The full immersion. Multi-region.",
    features: ["Luxury stays throughout", "Private guides everywhere", "All flights included", "Spa & wellness credits", "Photographer for 1 day"],
    featured: false,
  },
];

export const Packages = () => {
  const scrollContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="packages" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh -z-10 opacity-60" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-wider uppercase text-primary mb-4">
            · Travel packages
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Pick the trip that <span className="italic text-gradient-ocean">fits you</span>
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Transparent pricing. No hidden fees. Every package fully customizable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 lg:items-center">
          {packages.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 ${
                p.featured
                  ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-elegant lg:scale-105 lg:py-14"
                  : "bg-card shadow-soft hover:shadow-elegant"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-sunset text-accent-foreground text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sunset">
                  <Sparkles className="w-3 h-3" /> MOST POPULAR
                </div>
              )}
              <div className={`text-sm font-medium uppercase tracking-wider mb-2 ${p.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {p.duration}
              </div>
              <h3 className="font-display text-3xl font-bold mb-2">{p.name}</h3>
              <p className={`text-sm mb-6 ${p.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-sm ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>$</span>
                <span className="font-display text-5xl font-bold">{p.price.toLocaleString()}</span>
                <span className={`text-sm ml-1 ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/ person</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full grid place-items-center mt-0.5 shrink-0 ${
                      p.featured ? "bg-white/20" : "bg-primary/10"
                    }`}>
                      <Check className={`w-3 h-3 ${p.featured ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={scrollContact}
                variant={p.featured ? "hero" : "ocean"}
                size="lg"
                className="w-full"
              >
                Book Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
