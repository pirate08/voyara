import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import santorini from "@/assets/dest-santorini.jpg";
import bali from "@/assets/dest-bali.jpg";
import alps from "@/assets/dest-alps.jpg";
import tokyo from "@/assets/dest-tokyo.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import iceland from "@/assets/dest-iceland.jpg";

const destinations = [
  { img: santorini, name: "Santorini", country: "Greece", desc: "Whitewashed villages above the Aegean", price: "from $1,890", tag: "Coastal" },
  { img: bali, name: "Bali", country: "Indonesia", desc: "Lush rice terraces & spiritual retreats", price: "from $1,290", tag: "Tropical" },
  { img: alps, name: "Swiss Alps", country: "Switzerland", desc: "Snow-capped peaks & alpine lakes", price: "from $2,450", tag: "Mountain" },
  { img: tokyo, name: "Tokyo", country: "Japan", desc: "Neon nights & cherry blossom days", price: "from $2,180", tag: "City" },
  { img: maldives, name: "Maldives", country: "Indian Ocean", desc: "Overwater villas in turquoise lagoons", price: "from $3,290", tag: "Luxury" },
  { img: iceland, name: "Iceland", country: "Reykjavík", desc: "Northern lights & ancient glaciers", price: "from $2,690", tag: "Adventure" },
];

export const Destinations = () => {
  return (
    <section id="destinations" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh -z-10" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-sm font-medium tracking-wider uppercase text-primary mb-4">
              · Popular destinations
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
              Where will your next <span className="italic text-gradient-ocean">story</span> begin?
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-lg">
            Hand-picked locations loved by our community. Each trip is fully customizable to your pace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-3xl overflow-hidden bg-card shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={d.img}
                  alt={`${d.name}, ${d.country}`}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute top-5 left-5 flex gap-2">
                <span className="glass text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {d.tag}
                </span>
              </div>

              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md grid place-items-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-1.5 text-sm text-white/80 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {d.country}
                </div>
                <h3 className="font-display text-3xl font-bold mb-2">{d.name}</h3>
                <p className="text-white/80 text-sm mb-4 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                  {d.desc}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <span className="text-sm text-white/90">{d.price}</span>
                  <span className="text-sm font-medium underline-offset-4 group-hover:underline">
                    View details →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
