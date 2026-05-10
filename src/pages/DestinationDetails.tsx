import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, Shield, Zap } from "lucide-react";
import { Destination } from "../data/destinations";

export const DestinationDetails = ({
  item,
  onBack,
}: {
  item: Destination;
  onBack: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background overflow-y-auto"
    >
      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <motion.img
          layoutId={`img-${item.id}`}
          src={item.img}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />

        <button
          onClick={onBack}
          className="absolute top-8 left-8 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content Section */}
      <div className="container max-w-5xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.tag}
            </span>
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {item.duration}
              </span>
              <span className="flex items-center gap-1 text-orange-500">
                <Star className="w-4 h-4 fill-current" /> {item.rating}
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
            {item.name}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            {item.longDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Shield,
                title: "Secure Booking",
                desc: "100% money back guarantee",
              },
              {
                icon: Zap,
                title: "Fast Track",
                desc: "Skip the queues on tours",
              },
              {
                icon: Star,
                title: "Top Rated",
                desc: "Verified by 500+ travelers",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-secondary/50 border border-border"
              >
                <feature.icon className="w-6 h-6 mb-3 text-primary" />
                <h4 className="font-bold">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Price starts from</p>
              <p className="text-3xl font-bold text-foreground">{item.price}</p>
            </div>
            <button
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
              style={{ backgroundColor: item.color }}
            >
              Book This Experience
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
