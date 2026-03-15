import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Zap, Store } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-jaime.jpg";

const priorities = [
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
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent-foreground/80 font-display font-semibold tracking-widest uppercase text-sm mb-4"
            style={{ color: "hsl(var(--primary-foreground) / 0.8)" }}
          >
            Ellington Board of Selectmen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground leading-tight mb-4"
          >
            Jaime Boucher
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl md:text-2xl font-display font-semibold text-primary-foreground/90 mb-8"
          >
            Working for Our Town
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-primary-foreground/75 text-base md:text-lg mb-8 max-w-xl mx-auto font-body leading-relaxed"
          >
            As Selectman, I have focused on common sense decisions that are good for Ellington and support our community. This site is your link to stay informed on meetings and updates that help shape our town.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/volunteer">Volunteer</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/priorities">2026 Campaign Page</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Priorities */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Key Priorities
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Common-sense solutions that support our residents and strengthen our community.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {priorities.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Get Involved
          </h2>
          <p className="text-primary-foreground/75 mb-8 max-w-lg mx-auto">
            The perspectives and feedback from residents are essential to making thoughtful decisions that serve the best interests of our town.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/volunteer">Join the Team</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Contact Jaime</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
