import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-travel.jpg";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden flex items-center">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Tropical paradise beach at sunset"
          className="w-full h-[120%] object-cover animate-ken-burns"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/30 to-accent/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </motion.div>

      {/* Floating glass orbs */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-accent/30 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-20 w-48 h-48 rounded-full bg-primary-glow/40 blur-3xl animate-float-slow" />

      <motion.div style={{ opacity }} className="container relative z-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-white"
        >
          <div className="flex -space-x-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-sunset border-2 border-white" />
            ))}
          </div>
          <span className="text-sm font-medium">Trusted by 10,000+ travelers</span>
          <Star className="w-4 h-4 fill-accent-glow text-accent-glow" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] max-w-5xl drop-shadow-2xl"
        >
          Explore the{" "}
          <span className="italic font-light text-gradient-sunset bg-gradient-to-r from-accent-glow to-accent">
            world
          </span>
          <br />
          with us.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
        >
          Curated journeys to the planet's most breathtaking destinations.
          Hand-crafted itineraries, premium stays, unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button variant="hero" size="xl" onClick={() => scrollTo("#contact")} className="group">
            Book Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="xl" onClick={() => scrollTo("#destinations")}>
            <Play className="w-4 h-4 fill-current" />
            Explore Destinations
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl"
        >
          {[
            { num: "120+", label: "Destinations" },
            { num: "10K+", label: "Happy travelers" },
            { num: "4.9★", label: "Avg rating" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 md:p-5 text-white">
              <div className="font-display text-3xl md:text-4xl font-bold">{s.num}</div>
              <div className="text-sm text-white/80 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-xs uppercase tracking-widest flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent" />
      </motion.div>
    </section>
  );
};
