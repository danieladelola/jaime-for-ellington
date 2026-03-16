import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Users, Shield, BookOpen, Heart, MapPin, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import portrait from "@/assets/jaime-portrait.jpg";
import meetingImage from "@/assets/jaime-meeting.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const milestones = [
  { year: "Lifelong", title: "Ellington Resident", desc: "Born and raised in Ellington, graduated from Ellington High School.", icon: MapPin },
  { year: "Business", title: "Local Brewery & Tavern Owner", desc: "Previously owned and operated the local brewery and tavern, understanding Ellington's small business community firsthand.", icon: Briefcase },
  { year: "Current", title: "Town of Vernon Employee", desc: "Currently works for the Town of Vernon while staying active in the Ellington community.", icon: GraduationCap },
  { year: "2023", title: "Elected to Board of Selectmen", desc: "Voted into office to represent the interests of Ellington residents.", icon: Award },
  { year: "2024", title: "Charter Revision Committee", desc: "Served on the committee to review and update the town's charter for better governance.", icon: BookOpen },
  { year: "2025", title: "Conservation Commission", desc: "Joined the Conservation Commission to protect Ellington's natural resources and open spaces.", icon: Shield },
];

const involvement = [
  { icon: Users, title: "Baseball Coach", desc: "Coached Ellington High School and American Legion baseball programs, investing in the next generation." },
  { icon: Heart, title: "Ellington Lions Club", desc: "Current volunteer with the Lions Club, serving the community through charity and outreach." },
  { icon: Shield, title: "Union Leadership", desc: "Vice President, Professional Employees Union Local 818 (AFSCME), advocating for workers' rights." },
];

const MeetJaime = () => (
  <div>
    {/* Hero Banner */}
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-4">About</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Meet <span className="text-primary">Jamison</span> Boucher
            </h1>
            <p className="text-primary-foreground/60 text-lg leading-relaxed mb-4">
              Selectman · Lifelong Ellington Resident · Community Leader
            </p>
            <div className="w-16 h-1 bg-primary" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src={portrait}
              alt="Jamison Boucher - Selectman"
              className="rounded-xl w-full max-w-md mx-auto object-cover aspect-[4/3] shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-xl hidden md:block">
              <p className="font-display font-bold text-lg">Selectman</p>
              <p className="text-primary-foreground/70 text-sm">Since 2023</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Bio Section */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-8"
          >
            <div>
              <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">Background</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Rooted in Ellington</h2>
              <div className="space-y-5 text-muted-foreground leading-[1.9] text-lg">
                <p>
                  I'm a lifelong Ellington resident and proud graduate of Ellington High School. I previously owned the local brewery and tavern in town and now I work for the Town of Vernon while still staying active in our community. As a former small business owner, finding ways that allow our local businesses to grow in Ellington continues to be one of my top priorities.
                </p>
                <p>
                  Staying involved and giving back to the community has always been an important part of who I am. I've coached the Ellington High School and American Legion baseball programs, currently volunteer with the Ellington Lions Club, and serve as Vice President of the Professional Employees Union Local 818 (AFSCME).
                </p>
                <p>
                  Since being elected to the Board of Selectmen in 2023, I've worked to advance practical solutions that best support our residents, strengthen our local businesses and farms, and back initiatives that make Ellington a place where families can grow. I've spoken out against unfair utility rate hikes, studied the impacts of the crumbling foundation crisis affecting many local homeowners, served on the 2024 Charter Revision Committee, and joined the Conservation Commission in 2025.
                </p>
                <p>
                  I believe that the local exemptions for our permanent and totally disabled veterans should be expanded to cover widowed spouses. The perspectives and feedback from residents are essential to making thoughtful decisions that serve the best interests of our town.
                </p>
              </div>
            </div>

            <blockquote className="relative border-l-4 border-primary pl-8 py-4 my-8">
              <p className="italic text-foreground/80 text-xl leading-relaxed font-display">
                "My focus remains simple: advance common-sense policies that best support our residents, strengthen our local businesses and farms, and back initiatives that make Ellington a place where families can grow."
              </p>
              <cite className="text-muted-foreground text-sm mt-4 block not-italic">— Jamison Boucher, Selectman</cite>
            </blockquote>

            <Button variant="default" size="lg" asChild>
              <Link to="/priorities">
                View 2026 Campaign Page <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Sidebar info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-muted rounded-xl p-8">
              <h3 className="font-display font-bold text-foreground text-lg mb-4">Quick Facts</h3>
              <div className="space-y-4">
                {[
                  { label: "Title", value: "Selectman" },
                  { label: "Email", value: "jboucher@ellington-ct.gov" },
                  { label: "Residence", value: "Lifelong Ellington, CT" },
                  { label: "Education", value: "Ellington High School" },
                  { label: "Elected", value: "2023" },
                  { label: "Party", value: "Working for Ellington" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-baseline border-b border-border pb-3 last:border-0 last:pb-0">
                    <span className="text-muted-foreground text-sm">{item.label}</span>
                    <span className="font-medium text-foreground text-sm text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
              <h3 className="font-display font-bold text-foreground text-lg mb-4">Key Accomplishments</h3>
              <ul className="space-y-3">
                {[
                  "Confronted 18% water rate hike at PURA",
                  "Served on Charter Revision Committee",
                  "Joined Conservation Commission",
                  "Advocate for veteran exemption expansion",
                  "Studied crumbling foundation crisis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <img
              src={meetingImage}
              alt="Jaime at a board meeting"
              className="rounded-xl w-full object-cover aspect-[4/3] shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Community Involvement */}
    <section className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">Beyond Politics</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Community Involvement</h2>
          <p className="text-muted-foreground text-lg">Giving back has always been part of who I am.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {involvement.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-3 text-lg">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">Path of Service</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Milestones</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-8">
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group flex gap-6 md:gap-8 items-start"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <m.icon className="w-6 h-6 text-primary" />
                </div>
                {i < milestones.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
              </div>
              <div className="pb-4">
                <span className="text-primary font-display font-bold text-sm uppercase tracking-wider">{m.year}</span>
                <h3 className="font-display font-bold text-foreground text-lg mt-1 mb-2">{m.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
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
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">Want to Get Involved?</h2>
          <p className="text-primary-foreground/65 mb-8 leading-relaxed">Join the team and help shape Ellington's future.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-bold" asChild>
              <Link to="/volunteer">Volunteer Now</Link>
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

export default MeetJaime;
