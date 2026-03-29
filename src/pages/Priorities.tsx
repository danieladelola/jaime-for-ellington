import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Zap, Store, Home, Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const items = [
  {
    icon: Zap,
    title: "Fought Rising Utility Costs",
    description: "Attended PURA public hearing and confronted Connecticut Water Co. over a proposed 18% rate hike to fight for Ellington residents. Utility costs directly impact family budgets and Jamie continues to push back against unreasonable increases.",
    actions: [
      "Attended PURA public hearings",
      "Confronted Connecticut Water Co. directly",
      "Advocated for rate transparency",
      "Working to prevent future excessive increases",
    ],
  },
  {
    icon: Heart,
    title: "Expand Veterans Exemption",
    description: "I support and advocate for the expansion of the Local Veteran Exemption to include widowed spouses and those with a 100% unemployable disability rating. Our veterans and their families deserve recognition and support.",
    actions: [
      "Expand exemptions to widowed spouses",
      "Cover 100% unemployable disability ratings",
      "Recognize veteran family sacrifices",
      "Push for state-level alignment",
    ],
  },
  {
    icon: Shield,
    title: "Investing in Public Safety",
    description: "Strengthening public safety and response with new emergency vehicles for better town-wide response. Modern equipment saves lives and ensures our first responders have the tools they need.",
    actions: [
      "New emergency vehicle procurement",
      "Improved response time infrastructure",
      "Support volunteer fire departments",
      "Emergency preparedness planning",
    ],
  },
  {
    icon: Store,
    title: "Small Business Aid",
    description: "Voted for tax relief for our home daycares, Ellington's new tennis facility and Oak Ridge Farms. Local businesses are the backbone of our economy and deserve a government that supports their growth.",
    actions: [
      "Tax relief for home daycares",
      "Support for new business facilities",
      "Agricultural business preservation",
      "Reduced regulatory burden for small operators",
    ],
  },
  {
    icon: Home,
    title: "Crumbling Foundation Crisis",
    description: "Studied the impacts of the crumbling foundation crisis affecting many local homeowners. This issue has devastated property values and created financial hardship for families across our community.",
    actions: [
      "Researched impact on local homeowners",
      "Support for affected families",
      "Advocate for state assistance programs",
      "Push for long-term remediation solutions",
    ],
  },
  {
    icon: Leaf,
    title: "Conservation & Open Space",
    description: "Joined the Conservation Commission in 2025 to protect Ellington's natural resources, open spaces, and agricultural heritage for future generations.",
    actions: [
      "Active Conservation Commission member",
      "Protecting natural resources",
      "Preserving agricultural land",
      "Balancing growth with conservation",
    ],
  },
];

const Priorities = () => (
  <div>
    {/* Hero Banner */}
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>
      <div className="container mx-auto relative text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-4">2026 Campaign</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
            Priorities for <span className="text-primary">Ellington</span>
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
            What I'm fighting for — practical solutions that support residents, strengthen businesses, and preserve what makes Ellington special.
          </p>
          <div className="w-16 h-1 bg-primary mx-auto mt-8" />
        </motion.div>
      </div>
    </section>

    {/* Priority Cards */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="group grid md:grid-cols-2 gap-8 p-8 md:p-12 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-xl transition-all duration-500"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-[1.8] text-lg">{item.description}</p>
              </div>
              <div className="bg-muted rounded-lg p-6 md:p-8">
                <h4 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-4">Key Actions</h4>
                <ul className="space-y-3">
                  {item.actions.map((action) => (
                    <li key={action} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Vision Statement */}
    <section className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">Vision</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">Common-Sense Leadership</h2>
          <p className="text-muted-foreground text-lg leading-[1.9] mb-8">
            My approach to governing is straightforward: listen to residents, study the issues, and make decisions that serve the best interests of our town. Ellington deserves leadership that's transparent, accessible, and grounded in the real concerns of the people who live here.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { stat: "6+", label: "Priority Areas" },
              { stat: "3+", label: "Years Serving" },
              { stat: "100%", label: "Community Focused" },
            ].map((s) => (
              <div key={s.label} className="p-6 bg-card rounded-xl border border-border">
                <p className="font-display font-bold text-3xl text-primary">{s.stat}</p>
                <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-primary">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">Share Your Priorities</h2>
          <p className="text-primary-foreground/65 mb-8">What matters most to you in Ellington? Let Jamie know.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold" asChild>
              <Link to="/contact">Share Your Voice <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/volunteer">Join the Campaign</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Priorities;
