import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aanya Sharma",
    location: "Mumbai, India",
    text: "Voyara planned our Bali honeymoon down to the last sunset. Every villa, every dinner, every detail felt designed for us. We're already planning trip two.",
    avatar: "AS",
    color: "from-orange-400 to-pink-500",
    rating: 5,
  },
  {
    name: "Marcus Lindberg",
    location: "Stockholm, Sweden",
    text: "I've used a dozen agencies. None compare. The 24/7 concierge re-routed us through a snowstorm in Iceland in under an hour. Worth every krona.",
    avatar: "ML",
    color: "from-blue-400 to-cyan-500",
    rating: 5,
  },
  {
    name: "Sofia Reyes",
    location: "Lisbon, Portugal",
    text: "The Santorini package was pure poetry. Boutique hotels, private boat at golden hour, a chef in our suite. Voyara turned a vacation into a memory.",
    avatar: "SR",
    color: "from-purple-400 to-fuchsia-500",
    rating: 5,
  },
  {
    name: "James O'Connor",
    location: "Dublin, Ireland",
    text: "Booked the Odyssey for our 25th anniversary. Twelve days, four countries, zero stress. They thought of things we hadn't even considered.",
    avatar: "JO",
    color: "from-emerald-400 to-teal-500",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[i];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4">
            · Stories from travelers
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Loved by people who <span className="italic text-gradient-sunset">love to wander</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-3xl p-8 md:p-14 shadow-elegant overflow-hidden">
            <Quote className="absolute top-8 right-8 w-24 h-24 text-primary/5" strokeWidth={1} />

            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-display text-2xl md:text-3xl leading-relaxed mb-8 text-foreground">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color} grid place-items-center text-white font-semibold text-lg shadow-soft`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10">
              <div className="flex gap-2">
                {testimonials.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    className={`h-2 rounded-full transition-all ${
                      k === i ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to review ${k + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors grid place-items-center"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors grid place-items-center"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
