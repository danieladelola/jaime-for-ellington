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

const Priorities = () => (
  <div>
    <section className="pt-28 pb-16 bg-muted">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl font-display font-bold text-foreground"
        >
          Priorities
        </motion.h1>
        <p className="text-muted-foreground mt-3 text-lg">What I'm fighting for in Ellington</p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-3xl space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group flex gap-6 items-start p-8 rounded-lg border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Priorities;
