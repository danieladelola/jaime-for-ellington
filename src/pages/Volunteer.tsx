import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Users, Heart, Megaphone, MapPin, Calendar, Phone, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const roles = [
  { icon: Users, title: "Door Knocking", desc: "Go door-to-door in your neighborhood sharing Jaime's vision for Ellington. Training and materials provided.", color: "primary" },
  { icon: Megaphone, title: "Phone Banking", desc: "Call fellow Ellington residents from the comfort of your home. Scripts and call lists provided.", color: "primary" },
  { icon: Heart, title: "Community Events", desc: "Help organize and run campaign events, town halls, and community gatherings.", color: "primary" },
  { icon: MapPin, title: "Yard Signs", desc: "Display a campaign yard sign at your home to show your support and build visibility.", color: "primary" },
  { icon: Calendar, title: "Event Planning", desc: "Help coordinate fundraisers, meet-and-greets, and voter registration drives.", color: "primary" },
  { icon: Star, title: "Social Media", desc: "Help spread the word online by sharing campaign updates and engaging with the community.", color: "primary" },
];

const testimonials = [
  { name: "Sarah M.", role: "Door Knocking Volunteer", quote: "Being part of this campaign has been incredibly rewarding. The team is welcoming and the mission is clear." },
  { name: "Tom R.", role: "Event Volunteer", quote: "Jaime genuinely listens to residents. Volunteering for his campaign feels like investing in our community's future." },
  { name: "Linda K.", role: "Phone Bank Volunteer", quote: "I've never volunteered for a campaign before, but Jaime's dedication to Ellington inspired me to get involved." },
];

const Volunteer = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", interests: "", note: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for volunteering! We'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", address: "", interests: "", note: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="container mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-4">Join the Movement</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              Volunteer for <span className="text-primary">Ellington</span>
            </h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Every volunteer makes a difference. Join our team and help shape the future of our community.
            </p>
            <div className="w-16 h-1 bg-primary mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "6", label: "Ways to Help" },
              { value: "100%", label: "Grassroots" },
              { value: "2026", label: "Election Year" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display font-bold text-primary-foreground text-3xl md:text-4xl">{s.value}</p>
                <p className="text-primary-foreground/60 text-sm mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">Opportunities</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Ways to Get Involved</h2>
            <p className="text-muted-foreground text-lg">Choose the volunteer role that fits your schedule and interests.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((r, i) => (
              <motion.div
                key={r.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <r.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-3 text-lg">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">From Our Volunteers</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Why They Volunteer</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-xl p-8 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-display font-bold text-foreground">{t.name}</p>
                  <p className="text-muted-foreground text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">Ready?</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Sign Up to Volunteer</h2>
            <p className="text-muted-foreground text-lg">Fill out the form below and we'll match you with the right opportunity.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl p-8 md:p-12 border border-border shadow-lg space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Your full name" className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email Address *</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="you@email.com" className="h-12" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Phone (Optional)</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(860) 555-0100" className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Ellington Address</label>
                <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Your street address" className="h-12" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Interests *</label>
              <select
                value={form.interests}
                onChange={(e) => setForm({ ...form, interests: e.target.value })}
                required
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select your interest</option>
                {roles.map((r) => (
                  <option key={r.title} value={r.title}>{r.title}</option>
                ))}
                <option value="Anything">I'll help with anything!</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Additional Notes</label>
              <Textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={4} placeholder="Anything else you'd like us to know..." />
            </div>
            <Button variant="default" size="lg" type="submit" className="w-full">
              <CheckCircle2 className="mr-2 w-4 h-4" /> Submit Volunteer Application
            </Button>
          </motion.form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">Not Ready to Volunteer?</h2>
            <p className="text-primary-foreground/65 mb-8">You can still help by spreading the word and staying informed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold" asChild>
                <Link to="/priorities">Explore Priorities <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact">Contact Jaime</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
