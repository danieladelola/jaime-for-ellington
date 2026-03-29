import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Zap, Store, ArrowRight, Users, Quote, ChevronRight, MapPin, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-jamie.jpg";
import meetingImage from "@/assets/jamie-meeting.jpg";
import EventsSection from "@/components/EventsSection";

const priorities = [
  {
    icon: Zap,
    title: "Fought Rising Utility Costs",
    description: "Attended PURA public hearing and confronted Connecticut Water Co. over a proposed 18% rate hike to fight for Ellington residents.",
    stat: "18%",
    statLabel: "Rate hike opposed",
  },
  {
    icon: Heart,
    title: "Expand Veterans Exemption",
    description: "Advocating for the expansion of the Local Veteran Exemption to include widowed spouses and those with a 100% unemployable disability rating.",
    stat: "100%",
    statLabel: "Disability coverage",
  },
  {
    icon: Shield,
    title: "Investing in Public Safety",
    description: "Strengthening public safety and response with new emergency vehicles for better town-wide response.",
    stat: "24/7",
    statLabel: "Better response",
  },
  {
    icon: Store,
    title: "Small Business Aid",
    description: "Voted for tax relief for our home daycares, Ellington's new tennis facility and Oak Ridge Farms.",
    stat: "3+",
    statLabel: "Relief programs",
  },
];

const timeline = [
  { year: "2023", event: "Elected to Board of Selectmen" },
  { year: "2024", event: "Served on Charter Revision Committee" },
  { year: "2025", event: "Joined Conservation Commission" },
  { year: "2026", event: "Running for re-election" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="relative z-10 container mx-auto">
          <div className="max-w-2xl pt-24">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "4rem" }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-primary mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-primary-foreground/60 font-display font-medium tracking-[0.2em] uppercase text-xs mb-4"
            >
              Ellington Board of Selectmen
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground leading-[1.05] mb-4"
            >
              Jamie
              <br />
              <span className="text-primary">Boucher</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-primary-foreground/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-body"
            >
              Working for our town — advancing common-sense policies that support residents, strengthen local businesses, and make Ellington a place where families can grow.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/volunteer">
                  Get Involved <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/priorities">View Priorities</Link>
              </Button>
            </motion.div>

            {/* Quick stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 flex gap-8 md:gap-12"
            >
              {[
                { value: "3+", label: "Years Serving" },
                { value: "Lifelong", label: "Ellington Resident" },
                { value: "2026", label: "Re-Election" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-primary text-2xl md:text-3xl">{s.value}</p>
                  <p className="text-primary-foreground/50 text-xs uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={meetingImage}
                  alt="Jamie Boucher at a selectmen meeting"
                  className="rounded-lg w-full object-cover aspect-[4/3] shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl hidden md:block">
                  <p className="font-display font-bold text-3xl">Since</p>
                  <p className="font-display font-bold text-4xl">2023</p>
                  <p className="text-primary-foreground/70 text-sm mt-1">Serving Ellington</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em]">About Jamie</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                A Lifelong Resident Fighting for{" "}
                <span className="text-primary">Ellington</span>
              </h2>
              <p className="text-muted-foreground leading-[1.8] text-lg">
                I'm a lifelong Ellington resident and proud graduate of Ellington High School. As a former small business owner and current public servant, I bring real-world experience to the Board of Selectmen.
              </p>
              <p className="text-muted-foreground leading-[1.8]">
                My focus remains simple: advance common-sense policies that best support our residents, strengthen our local businesses and farms, and back initiatives that make Ellington a place where families can grow.
              </p>

              <div className="grid grid-cols-2 gap-4 py-4">
                {[
                  { icon: MapPin, text: "Lifelong Ellington Resident" },
                  { icon: Users, text: "Lions Club Volunteer" },
                  { icon: Calendar, text: "Selectman Since 2023" },
                  { icon: Mail, text: "jboucher@ellington-ct.gov" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <Button variant="default" size="lg" asChild>
                <Link to="/meet-jamie">
                  Read Full Bio <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Priorities */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">What I Stand For</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Key Priorities
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Practical solutions for Ellington's families, veterans, businesses, and community.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {priorities.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group relative p-8 md:p-10 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-3xl text-primary">{item.stat}</p>
                      <p className="text-muted-foreground text-xs uppercase tracking-wider">{item.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-3 text-xl">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button variant="default" size="lg" asChild>
              <Link to="/priorities">
                View All Priorities <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>



      {/* Quote */}
      <section className="py-24 md:py-32 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-8" />
            <blockquote className="text-2xl md:text-3xl font-display font-bold text-foreground leading-snug mb-8">
              "The perspectives and feedback from residents are essential to making thoughtful decisions that serve the best interests of our town."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <p className="text-muted-foreground font-display font-semibold">Jamie Boucher, Selectman</p>
              <div className="w-12 h-px bg-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/65 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
              Your voice matters. Join our campaign to keep Ellington moving forward with common-sense leadership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold active:scale-[0.97] transition-all shadow-xl"
                asChild
              >
                <Link to="/volunteer">
                  Volunteer Today <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact">Contact Jamie</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="py-12 bg-foreground">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:jboucher@ellington-ct.gov" className="text-background/80 hover:text-background transition-colors font-medium">
                jboucher@ellington-ct.gov
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-background/80">Ellington, Connecticut</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
