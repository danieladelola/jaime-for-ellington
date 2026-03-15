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
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary-foreground">
          Voting Information
        </h1>
        <p className="text-primary-foreground/75 mt-3 text-lg">Make your voice heard in Ellington</p>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="grid gap-8">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-lg p-8 flex gap-6 items-start"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <card.icon className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-muted rounded-lg p-8 text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Need Help?</h3>
          <p className="text-muted-foreground mb-2">
            Contact Ellington Town Hall for voting questions and registration assistance.
          </p>
          <p className="text-muted-foreground text-sm">
            Visit{" "}
            <a
              href="https://portal.ct.gov/sots"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline"
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
