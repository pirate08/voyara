import { motion } from "framer-motion";
import { ArrowRight, Compass, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaBanner = () => {
  const scrollContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-ocean p-10 md:p-20 shadow-elegant"
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/40 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary-glow/50 blur-3xl animate-float" />

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Ready for your next <span className="italic">adventure?</span>
            </h2>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-10">
              Your story is waiting on the other side of a "yes." Let's plan something unforgettable.
            </p>
            <Button onClick={scrollContact} variant="hero" size="xl" className="group">
              Plan Your Trip
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const cols = [
    { title: "Explore", links: ["Destinations", "Packages", "Custom trips", "Group travel"] },
    { title: "Company", links: ["About us", "Careers", "Press", "Sustainability"] },
    { title: "Support", links: ["Help center", "Contact", "Privacy", "Terms"] },
  ];
  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-ocean grid place-items-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold">Voyara</span>
            </div>
            <p className="text-background/70 max-w-sm leading-relaxed mb-6">
              Curated travel for people who want their journeys to mean something. Designed in Lisbon, lived everywhere.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent hover:scale-110 transition-all grid place-items-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold mb-4">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-background/70 hover:text-accent text-sm transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row gap-3 items-center justify-between text-sm text-background/60">
          <p>© {new Date().getFullYear()} Voyara Travel Co. All rights reserved.</p>
          <p>Made with ☀ for the wandering ones.</p>
        </div>
      </div>
    </footer>
  );
};
