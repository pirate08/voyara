import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaBanner = () => {
  const scrollContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          /* CHANGE: bg-gradient-ocean is usually blue/teal; in dark mode, we ensure the shadow doesn't look muddy */
          className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-orange-500 to-sky-600 p-10 md:p-20 shadow-2xl shadow-orange-500/20"
        >
          {/* Animated Blobs - adjusted opacity for dark mode */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-sky-400/30 blur-3xl animate-bounce"
            style={{ animationDuration: "8s" }}
          />

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Ready for your next{" "}
              <span className="italic font-light">adventure?</span>
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-10">
              Your story is waiting on the other side of a "yes." Let's plan
              something unforgettable together.
            </p>
            <Button
              onClick={scrollContact}
              variant="secondary" // CHANGE: variant to secondary/hero for high contrast against the colored banner
              size="xl"
              className="group bg-white text-orange-600 hover:bg-orange-50 border-none"
            >
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
    {
      title: "Explore",
      links: ["Destinations", "Packages", "Custom trips", "Group travel"],
    },
    {
      title: "Company",
      links: ["About us", "Careers", "Press", "Sustainability"],
    },
    { title: "Support", links: ["Help center", "Contact", "Privacy", "Terms"] },
  ];

  return (
    /* CHANGE: Instead of bg-foreground (which flips to white), we use a semantic deep color */
    <footer className="bg-slate-950 text-slate-200 pt-20 pb-10 border-t border-white/5">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 grid place-items-center shadow-lg shadow-orange-500/20">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Voyara
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
              Curated travel for people who want their journeys to mean
              something. Designed in Lisbon, lived everywhere.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-all grid place-items-center border border-white/10"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold text-white mb-4">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-orange-500 text-sm transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Voyara Travel Co. All rights reserved.
          </p>
          <p className="hover:text-slate-300 transition-colors cursor-default">
            Made by Mayukh Deb Goswami
          </p>
        </div>
      </div>
    </footer>
  );
};
