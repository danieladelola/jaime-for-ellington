import { Shield, Heart, Zap, Store } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    icon: Zap,
    title: "Fought Rising Utility Costs",
    description: "Attended PURA public hearing and confronted Connecticut Water Co. over a proposed 18% rate hike to fight for Ellington residents.",
  },
  {
    icon: Heart,
    title: "Expand Veterans Exemption",
    description: "I support and advocate for the expansion of the Local Veteran Exemption to include widowed spouses and those with a 100% unemployable disability rating.",
  },
  {
    icon: Shield,
    title: "Investing in Public Safety",
    description: "Strengthening public safety and response with new emergency vehicles for better town-wide response.",
  },
  {
    icon: Store,
    title: "Small Business Aid",
    description: "Voted for tax relief for our home daycares, Ellington's new tennis facility and Oak Ridge Farms.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

const Priorities = () => (
  <div>
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary-foreground">
          Priorities
        </h1>
        <p className="text-primary-foreground/75 mt-3 text-lg">What I'm fighting for in Ellington</p>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-card border border-border rounded-lg p-8 flex gap-6 items-start hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Priorities;
