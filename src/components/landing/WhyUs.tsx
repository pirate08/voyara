import { motion } from "framer-motion";
import { Wallet, Headphones, Sparkles, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Wallet, title: "Affordable Packages", desc: "Best price guarantee with transparent, no-hidden-fee pricing across every destination." },
  { icon: Headphones, title: "24/7 Concierge", desc: "Real humans on call worldwide — from re-booking flights to last-minute reservations." },
  { icon: Sparkles, title: "Custom Trips", desc: "Tailored itineraries built around your pace, taste, and dream moments." },
  { icon: ShieldCheck, title: "Trusted by Travelers", desc: "10,000+ five-star reviews. Fully insured, locally vetted partners on every leg." },
];

const stats = [
  { num: 10000, suffix: "+", label: "Trips planned" },
  { num: 120, suffix: "+", label: "Destinations" },
  { num: 98, suffix: "%", label: "Would rebook" },
  { num: 24, suffix: "/7", label: "Support" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1600;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(to * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

export const WhyUs = () => {
  return (
    <section id="why" className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4">
            · Why Voyara
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Travel that feels <span className="italic text-gradient-sunset">effortless</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-card rounded-3xl p-7 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-ocean opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-ocean grid place-items-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-elegant">
                <f.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-card rounded-3xl p-8 md:p-12 shadow-soft"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-ocean">
                <Counter to={s.num} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
