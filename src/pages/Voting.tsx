import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, FileText, Clock, ExternalLink, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const keyDates = [
  { date: "October 27, 2026", event: "Voter Registration Deadline", note: "Last day to register for the November election" },
  { date: "October 28 – November 2", event: "Early Voting Period", note: "Vote early at designated locations" },
  { date: "November 3, 2026", event: "Election Day", note: "Polls open 6:00 AM to 8:00 PM" },
];

const steps = [
  {
    step: "1",
    title: "Check Your Registration",
    desc: "Verify you're registered at your current address through the CT Secretary of State's online portal.",
    link: "https://portal.ct.gov/sots",
  },
  {
    step: "2",
    title: "Find Your Polling Place",
    desc: "Your polling location is based on your residential address. Contact Town Hall if unsure.",
    link: null,
  },
  {
    step: "3",
    title: "Know What's on the Ballot",
    desc: "Research candidates and local issues before heading to the polls.",
    link: null,
  },
  {
    step: "4",
    title: "Vote!",
    desc: "Bring a valid form of ID. Polls are open from 6:00 AM to 8:00 PM on Election Day.",
    link: null,
  },
];

const eligibility = [
  "Must be a U.S. citizen",
  "Must be at least 18 years old by Election Day",
  "Must be a resident of Ellington, CT",
  "Must not be currently serving a felony sentence",
];

const Voting = () => (
  <div>
    {/* Hero */}
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary blur-3xl" />
      </div>
      <div className="container mx-auto relative text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-secondary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-4">Your Vote Matters</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
            Voting <span className="text-secondary">Information</span>
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to make your voice heard in Ellington's elections.
          </p>
          <div className="w-16 h-1 bg-secondary mx-auto mt-8" />
        </motion.div>
      </div>
    </section>

    {/* Key Dates */}
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {keyDates.map((item, i) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-card rounded-xl p-8 border border-border text-center hover:border-secondary/30 hover:shadow-lg transition-all duration-300"
            >
              <CalendarDays className="w-8 h-8 text-secondary mx-auto mb-4" />
              <p className="font-display font-bold text-foreground text-xl mb-2">{item.date}</p>
              <p className="font-display font-semibold text-secondary text-sm uppercase tracking-wider mb-2">{item.event}</p>
              <p className="text-muted-foreground text-sm">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How to Vote */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-secondary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">Step by Step</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">How to Vote</h2>
          <p className="text-muted-foreground text-lg">Follow these simple steps to cast your ballot in Ellington.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative group"
            >
              <div className="bg-card rounded-xl p-8 border border-border h-full hover:border-secondary/30 hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <span className="font-display font-bold text-secondary text-lg">{s.step}</span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                {s.link && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-secondary text-sm font-medium hover:underline"
                  >
                    Visit Portal <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 text-border">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Eligibility & Registration */}
    <section className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">Eligibility Requirements</h2>
            <div className="space-y-4">
              {eligibility.map((item) => (
                <div key={item} className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">Registration Options</h2>
            <div className="space-y-6">
              {[
                { title: "Online", desc: "Register through the Connecticut Secretary of State's online voter registration portal.", icon: FileText },
                { title: "By Mail", desc: "Download and mail a voter registration form to the Ellington Town Clerk.", icon: MapPin },
                { title: "In Person", desc: "Visit Ellington Town Hall during regular business hours to register in person.", icon: Clock },
              ].map((opt) => (
                <div key={opt.title} className="flex gap-4 bg-card p-6 rounded-lg border border-border hover:border-secondary/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <opt.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">{opt.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Important Notice */}
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/5 rounded-xl p-8 md:p-12 border border-secondary/15"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-display font-bold text-foreground text-lg mb-3">Need Help?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about voting, registration, absentee ballots, or need assistance at the polls, contact Ellington Town Hall or visit the Connecticut Secretary of State's website.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://portal.ct.gov/sots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-secondary font-medium text-sm hover:underline"
                >
                  CT Secretary of State <ExternalLink className="w-3 h-3" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                >
                  Contact Jaime <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Voting;
