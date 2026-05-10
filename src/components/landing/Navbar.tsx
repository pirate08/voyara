import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Destinations", href: "#destinations" },
  { label: "Why Us", href: "#why" },
  { label: "Packages", href: "#packages" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`container ${scrolled ? "glass rounded-full shadow-soft" : ""} transition-all duration-500`}>
        <nav className="flex items-center justify-between px-2 md:px-4">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-ocean grid place-items-center shadow-elegant group-hover:rotate-12 transition-transform">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className={`font-display text-xl font-bold ${scrolled ? "text-foreground" : "text-white"} drop-shadow`}>
              Voyara
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full hover:bg-white/10 transition-colors ${
                  scrolled ? "text-foreground hover:bg-secondary" : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-full transition-colors ${
                scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/10 text-white"
              }`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button
              variant="hero"
              size="sm"
              className="hidden md:inline-flex rounded-full"
              onClick={() => scrollTo("#contact")}
            >
              Book Now
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 rounded-full ${scrolled ? "text-foreground" : "text-white"}`}
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden container mt-2"
          >
            <div className="glass rounded-2xl p-4 flex flex-col gap-1 shadow-soft">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left px-4 py-3 rounded-xl hover:bg-secondary text-foreground font-medium"
                >
                  {l.label}
                </button>
              ))}
              <Button variant="hero" className="mt-2" onClick={() => scrollTo("#contact")}>
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
