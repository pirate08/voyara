import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  destination: z.string().trim().min(2, "Where would you like to go?").max(80),
  budget: z.string().min(1, "Pick a budget range"),
  duration: z.string().min(1, "Select a duration"),
});

type FormData = z.infer<typeof schema>;

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Booking inquiry:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh -z-10 opacity-60" />
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 lg:sticky lg:top-32"
          >
            <span className="inline-block text-sm font-medium tracking-wider uppercase text-primary mb-4">
              · Plan your trip
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5">
              Let's design your <span className="italic text-gradient-ocean">next adventure</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Tell us about your dream trip. A real human travel designer will get back to you within 24 hours with a tailored proposal.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "hello@voyara.travel" },
                { icon: Phone, label: "+1 (555) 010-2030" },
                { icon: MapPin, label: "Lisbon · Tokyo · NYC" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-ocean grid place-items-center shadow-elegant shrink-0">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-3xl p-6 md:p-10 shadow-elegant">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-ocean grid place-items-center mx-auto mb-6 shadow-elegant animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-3">Inquiry sent!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    A travel designer will reach out within 24 hours with a personalized proposal. Pack your curiosity.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" placeholder="Jane Doe" className="mt-2 h-12 rounded-xl" {...register("name")} />
                      {errors.name && <p className="text-destructive text-xs mt-1.5">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="jane@email.com" className="mt-2 h-12 rounded-xl" {...register("email")} />
                      {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="destination">Dream destination</Label>
                    <Input id="destination" placeholder="Bali, Maldives, anywhere..." className="mt-2 h-12 rounded-xl" {...register("destination")} />
                    {errors.destination && <p className="text-destructive text-xs mt-1.5">{errors.destination.message}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="budget">Budget per person</Label>
                      <select
                        id="budget"
                        className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        {...register("budget")}
                      >
                        <option value="">Select budget</option>
                        <option value="<2000">Under $2,000</option>
                        <option value="2000-5000">$2,000 – $5,000</option>
                        <option value="5000-10000">$5,000 – $10,000</option>
                        <option value=">10000">$10,000+</option>
                      </select>
                      {errors.budget && <p className="text-destructive text-xs mt-1.5">{errors.budget.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="duration">Trip duration</Label>
                      <select
                        id="duration"
                        className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        {...register("duration")}
                      >
                        <option value="">Select duration</option>
                        <option value="weekend">Weekend (2-3 days)</option>
                        <option value="short">Short (4-7 days)</option>
                        <option value="medium">Medium (1-2 weeks)</option>
                        <option value="long">Long (2+ weeks)</option>
                      </select>
                      {errors.duration && <p className="text-destructive text-xs mt-1.5">{errors.duration.message}</p>}
                    </div>
                  </div>

                  <Button type="submit" variant="ocean" size="xl" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending your inquiry...
                      </>
                    ) : (
                      <>
                        Send inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    No spam. We'll only use your details to plan your trip.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
