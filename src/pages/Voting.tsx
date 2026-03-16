import { CalendarDays, MapPin, FileText } from "lucide-react";
import { motion } from "framer-motion";

const infoCards = [
  {
    icon: CalendarDays,
    title: "Election Day",
    description: "November 3, 2026 — Polls open 6:00 AM to 8:00 PM.",
  },
  {
    icon: MapPin,
    title: "Polling Location",
    description: "Check your polling location at the Connecticut Secretary of State's website or contact Ellington Town Hall.",
  },
  {
    icon: FileText,
    title: "Register to Vote",
    description: "Connecticut residents can register online, by mail, or in person. Deadline is typically 7 days before Election Day.",
  },
];

const Voting = () => (
  <div>
    <section className="pt-28 pb-16 bg-muted">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl font-display font-bold text-foreground"
        >
          Voting Information
        </motion.h1>
        <p className="text-muted-foreground mt-3 text-lg">Make your voice heard in Ellington</p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-3xl space-y-6">
        {infoCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group flex gap-6 items-start p-8 rounded-lg border border-border bg-card hover:border-secondary/30 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors duration-300">
              <card.icon className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          </motion.div>
        ))}

        <div className="mt-12 rounded-lg bg-muted p-8 text-center">
          <h3 className="font-display text-lg font-bold text-foreground mb-3">Need Help?</h3>
          <p className="text-muted-foreground mb-2">
            Contact Ellington Town Hall for voting questions and registration assistance.
          </p>
          <p className="text-muted-foreground text-sm">
            Visit{" "}
            <a
              href="https://portal.ct.gov/sots"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-medium hover:underline"
            >
              CT Secretary of State
            </a>{" "}
            for official voter resources.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default Voting;
