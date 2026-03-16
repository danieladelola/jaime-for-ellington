import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Zap, Store, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-jaime.jpg";

const priorities = [
  {
    icon: Zap,
    title: "Fought Rising Utility Costs",
    description: "Confronted Connecticut Water Co. at PURA hearings over a proposed 18% rate hike.",
  },
  {
    icon: Heart,
    title: "Expand Veterans Exemption",
    description: "Advocating for widowed spouses and 100% unemployable disability rating coverage.",
  },
  {
    icon: Shield,
    title: "Investing in Public Safety",
    description: "New emergency vehicles for stronger town-wide public safety response.",
  },
  {
    icon: Store,
    title: "Small Business Aid",
    description: "Tax relief for home daycares, new tennis facility, and Oak Ridge Farms.",
  },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        <div className="relative z-10 container mx-auto">
          <div className="max-w-2xl pt-24">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-primary-foreground/60 font-display font-medium tracking-widest uppercase text-xs mb-6"
            >
              Ellington Board of Selectmen
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6"
            >
              Jaime
              <br />
              Boucher
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary-foreground/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-body"
            >
              Common sense decisions that are good for Ellington. Stay informed on meetings and updates that shape our town.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/volunteer">
                  Volunteer <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/priorities">2026 Campaign</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Priorities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-widest mb-3">What I Stand For</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Key Priorities
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {priorities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group p-8 rounded-lg border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Get Involved
            </h2>
            <p className="text-primary-foreground/65 mb-10 max-w-md mx-auto leading-relaxed">
              Resident feedback is essential to thoughtful decisions that serve our town's best interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold active:scale-[0.97] transition-all"
                asChild
              >
                <Link to="/volunteer">Join the Team</Link>
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

export default Index;
