import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Users, Heart, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Users, title: "Knock on Doors", desc: "Help spread the word in your neighborhood." },
  { icon: Megaphone, title: "Phone Bank", desc: "Call fellow residents to share Jaime's vision." },
  { icon: Heart, title: "Community Events", desc: "Help organize events and town meetings." },
];

const Volunteer = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for volunteering! We'll be in touch.");
    setForm({ name: "", email: "", phone: "", note: "" });
  };

  return (
    <div>
      <section className="pt-28 pb-16 bg-muted">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground"
          >
            Volunteer
          </motion.h1>
          <p className="text-muted-foreground mt-3 text-lg">Join Jaime's team and make a difference</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-6 rounded-lg border border-border bg-card text-center hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center mx-auto mb-4">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">
              Sign Up to Volunteer
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="you@email.com"
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone (optional)</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(860) 555-0100"
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">How would you like to help?</label>
                <Textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  placeholder="Door knocking, phone calls, events..."
                />
              </div>
              <Button variant="default" size="lg" type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
