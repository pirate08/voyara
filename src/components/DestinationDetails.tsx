import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Star,
  Shield,
  Zap,
  Plane,
  Mail,
  Phone,
  MapPin,
  Send,
  X,
} from "lucide-react";

import { Destination } from "../data/destinations";
import { useToast } from "@/components/ui/use-toast";

export const DestinationDetails = ({
  item,
  onBack,
}: {
  item: Destination;
  onBack: () => void;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    setOpenModal(false);
    toast({
      title: "Inquiry Sent ✈️",
      description:
        "Thanks for reaching out. We will contact you within 24 hours.",
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-[100] bg-white min-h-screen overflow-x-hidden"
      >
        {/* --- HERO SECTION --- */}
        <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden">
          <motion.img
            layoutId={`img-${item.id}`}
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Essential Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/40 to-black/20" />

          {/* Animated Background Elements */}
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-10 w-64 h-64 rounded-full blur-[100px]"
            style={{ backgroundColor: item.color }}
          />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-8 left-6 md:left-12 p-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 text-white hover:bg-white/30 transition-all z-30 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Hero Header Content */}
          <div className="absolute bottom-32 md:bottom-48 left-6 md:left-16 z-20 text-white max-w-4xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-white/30 mb-6"
              style={{ backgroundColor: `${item.color}cc` }}
            >
              {item.tag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-9xl font-bold leading-[0.9] drop-shadow-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {item.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-lg md:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed drop-shadow-lg"
            >
              Discover unforgettable moments and luxury experiences in{" "}
              {item.name}, crafted specially for modern travelers seeking the
              extraordinary.
            </motion.p>
          </div>
        </div>

        {/* --- MAIN CONTENT CARD --- */}
        <div className="container max-w-6xl mx-auto px-4 md:px-6 -mt-24 md:-mt-40 relative z-30 pb-32">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/95 backdrop-blur-2xl border border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[3rem] overflow-hidden"
          >
            <div className="p-8 md:p-16">
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-2xl font-bold text-sm">
                    <Clock className="w-4 h-4 text-orange-500" />8 Days / 7
                    Nights
                  </span>
                  <span className="flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-2xl font-bold text-sm border border-orange-100">
                    <Star className="w-4 h-4 fill-current" />
                    4.9 (1.2k Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-100">
                  <Shield className="w-4 h-4" />
                  Trusted by 10k+ Travelers
                </div>
              </div>

              <h3
                className="text-3xl font-bold mb-6 text-slate-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                About the journey
              </h3>
              <p className="text-xl text-slate-500 leading-relaxed mb-16 max-w-4xl">
                Experience {item.name} like never before. {item.desc}. From the
                moment you arrive, every detail is curated to provide a seamless
                blend of local culture and high-end luxury.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {[
                  {
                    icon: Shield,
                    title: "Secure Booking",
                    desc: "100% protected payments and flexible cancellation.",
                  },
                  {
                    icon: Zap,
                    title: "Priority Access",
                    desc: "Private entries to museums and hidden viewpoints.",
                  },
                  {
                    icon: Star,
                    title: "Hand-picked Stays",
                    desc: "Only the most unique, high-rated luxury boutiques.",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="group p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <feature.icon
                        className="w-7 h-7"
                        style={{ color: item.color }}
                      />
                    </div>
                    <h4 className="font-bold text-xl mb-3 text-slate-800">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA Card */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-slate-400 font-medium mb-2 uppercase tracking-widest text-sm">
                    Investment starts from
                  </p>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-5xl md:text-6xl font-bold">
                      {item.price}
                    </h2>
                    <span className="text-slate-400">/ person</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenModal(true)}
                  className="group relative z-10 px-12 py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 shadow-2xl transition-all"
                  style={{ backgroundColor: item.color }}
                >
                  Book This Experience
                  <Plane className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.button>

                {/* Decorative background shape for CTA */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{
                type: "spring",
                damping: 20,
              }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_100px_rgba(0,0,0,0.25)] grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side */}
                <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-sky-500 to-blue-700 p-10 text-white flex-col justify-between">
                  <motion.div
                    animate={{
                      x: ["-10%", "120%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-20"
                  >
                    <Plane className="w-14 h-14 opacity-20 rotate-12" />
                  </motion.div>

                  <div>
                    <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-4">
                      Plan Your Trip
                    </p>

                    <h2 className="text-5xl font-bold leading-tight">
                      Let's design your next adventure
                    </h2>

                    <p className="mt-6 text-white/80 leading-relaxed">
                      Share your dream destination and our travel specialists
                      will craft a personalized experience for you.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span>hello@voyara.travel</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span>+1 (555) 010-2030</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span>Lisbon · Tokyo · NYC</span>
                    </div>
                  </div>
                </div>

                {/* Right Side Form */}
                <div className="relative p-6 md:p-10">
                  {/* Close */}
                  <button
                    onClick={() => setOpenModal(false)}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="mb-8">
                    <h3 className="text-3xl font-bold mb-2">
                      Book Your Experience
                    </h3>

                    <p className="text-muted-foreground">
                      Fill in your travel details and we'll contact you shortly.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Full name
                        </label>

                        <input
                          type="text"
                          placeholder="Jane Doe"
                          className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Email
                        </label>

                        <input
                          type="email"
                          placeholder="jane@email.com"
                          className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Dream destination
                      </label>

                      <input
                        type="text"
                        placeholder="Bali, Maldives, Switzerland..."
                        className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Budget per person
                        </label>

                        <select className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                          <option>Select budget</option>
                          <option>$1000 - $3000</option>
                          <option>$3000 - $5000</option>
                          <option>$5000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Trip duration
                        </label>

                        <select className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                          <option>Select duration</option>
                          <option>3-5 Days</option>
                          <option>1 Week</option>
                          <option>2+ Weeks</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      onClick={handleSubmit}
                      className="w-full h-14 rounded-2xl text-white font-bold flex items-center justify-center gap-3 shadow-xl"
                      style={{
                        background: `linear-gradient(to right, ${item.color}, #38bdf8)`,
                      }}
                    >
                      Send Inquiry
                      <Send className="w-5 h-5" />
                    </motion.button>

                    <p className="text-center text-sm text-muted-foreground">
                      No spam. We’ll only use your details to plan your trip.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
