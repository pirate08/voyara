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

  // In light mode: always use dark text. In dark mode: use white text.
  const textClass = dark
    ? "text-white"
    : "text-slate-700 hover:text-orange-500";

  const logoTextClass = dark ? "text-white" : "text-slate-800";

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`container transition-all duration-500 ${
          scrolled
            ? dark
              ? "bg-slate-900/80 backdrop-blur-md rounded-full shadow-lg border border-white/10"
              : "bg-white/80 backdrop-blur-md rounded-full shadow-md border border-slate-200/60"
            : ""
        }`}
      >
        <nav className="flex items-center justify-between px-2 md:px-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-xl grid place-items-center shadow-md group-hover:rotate-12 transition-transform"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span
              className={`font-bold text-xl transition-colors ${logoTextClass}`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Voyara
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  dark
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-full transition-colors ${
                dark
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-orange-50 text-slate-600 hover:text-orange-500"
              }`}
              aria-label="Toggle theme"
            >
              {dark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Book Now — desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#contact")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-white text-sm shadow-md shadow-orange-200 transition-all"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              Book Now
            </motion.button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                dark
                  ? "text-white hover:bg-white/10"
                  : "text-slate-700 hover:bg-orange-50"
              }`}
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="md:hidden container mt-2"
          >
            <div
              className={`rounded-2xl p-4 flex flex-col gap-1 shadow-xl border ${
                dark
                  ? "bg-slate-900/95 backdrop-blur-md border-white/10"
                  : "bg-white/95 backdrop-blur-md border-slate-200/60"
              }`}
            >
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                    dark
                      ? "text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#contact")}
                className="mt-2 w-full py-3 rounded-xl font-semibold text-white shadow-md"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
