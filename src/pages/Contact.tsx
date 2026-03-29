import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Phone, Send, MessageSquare } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "jboucher@ellington-ct.gov", href: "mailto:jboucher@ellington-ct.gov" },
  { icon: MapPin, label: "Location", value: "Ellington, Connecticut", href: null },
  { icon: Clock, label: "Availability", value: "Board meetings & community events", href: null },
  { icon: Phone, label: "Town Hall", value: "Ellington Town Hall", href: null },
];

const topics = [
  "General Inquiry",
  "Utility Concerns",
  "Veterans Issues",
  "Public Safety",
  "Small Business",
  "Conservation",
  "Crumbling Foundations",
  "Other",
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("contacts").insert({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Thank you! Your message has been sent to Jamie.");
    setForm({ name: "", email: "", phone: "", topic: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-secondary blur-3xl -translate-x-1/2" />
        </div>
        <div className="container mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-4">Get In Touch</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              Contact <span className="text-primary">Jamie</span>
            </h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Your voice matters. Share your thoughts, concerns, or questions — Jamie reads every message personally.
            </p>
            <div className="w-16 h-1 bg-primary mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card rounded-xl p-6 border border-border text-center hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">{info.label}</p>
                {info.href ? (
                  <a href={info.href} className="font-medium text-foreground hover:text-primary transition-colors text-sm">{info.value}</a>
                ) : (
                  <p className="font-medium text-foreground text-sm">{info.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Send a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="Your full name"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email Address *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      placeholder="you@email.com"
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone (Optional)</label>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(860) 555-0100"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Topic *</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select a topic</option>
                      {topics.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="Share your thoughts, concerns, or questions..."
                  />
                </div>
                <Button variant="default" size="lg" type="submit" className="w-full sm:w-auto">
                  <Send className="mr-2 w-4 h-4" /> Send Message
                </Button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-muted rounded-xl p-8">
                <h3 className="font-display font-bold text-foreground text-lg mb-4">How I'll Respond</h3>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>I personally review all messages from Ellington residents. Here's what to expect:</p>
                  <ul className="space-y-3">
                    {[
                      "Messages are reviewed within 48 hours",
                      "You'll receive a personal response, not a form letter",
                      "Complex issues may require a follow-up call",
                      "Confidentiality is always respected",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
                <h3 className="font-display font-bold text-foreground text-lg mb-4">Prefer Email?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  You can always reach Jamie directly at his official email address.
                </p>
                <a
                  href="mailto:jboucher@ellington-ct.gov"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  jboucher@ellington-ct.gov
                </a>
              </div>

              <div className="bg-secondary/5 rounded-xl p-8 border border-secondary/10">
                <h3 className="font-display font-bold text-foreground text-lg mb-4">Attend a Meeting</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Board of Selectmen meetings are open to the public. It's a great way to voice your concerns in person and engage directly with town leadership.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-6">
            {[
              { q: "How can I attend a Board of Selectmen meeting?", a: "Meetings are open to the public and typically held at Ellington Town Hall. Check the town website for the current schedule." },
              { q: "How do I register to vote in Ellington?", a: "You can register online through the CT Secretary of State's website, by mail, or in person at Town Hall. Visit our Voting Info page for details." },
              { q: "Can I volunteer for the campaign?", a: "Absolutely! Visit our Volunteer page to sign up. We need help with door knocking, phone banks, and community events." },
              { q: "How do I report a town issue?", a: "For immediate town services, contact Ellington Town Hall directly. For policy concerns, feel free to reach out to Jamie through this contact form." },
            ].map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <h3 className="font-display font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
