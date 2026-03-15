import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Users, Heart, Megaphone } from "lucide-react";

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
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary-foreground">
            Volunteer
          </h1>
          <p className="text-primary-foreground/75 mt-3 text-lg">Join Jaime's team and make a difference</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-14 max-w-3xl mx-auto">
            {reasons.map((r) => (
              <div key={r.title} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <r.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">
              Sign Up to Volunteer
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Phone (optional)</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(860) 555-0100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">How would you like to help?</label>
                <Textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  placeholder="Door knocking, phone calls, events..."
                />
              </div>
              <Button variant="hero" size="lg" type="submit" className="w-full">
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
