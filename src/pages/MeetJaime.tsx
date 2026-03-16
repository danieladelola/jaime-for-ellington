import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import portrait from "@/assets/jaime-portrait.jpg";

const MeetJaime = () => (
  <div>
    <section className="pt-28 pb-16 bg-muted">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl font-display font-bold text-foreground"
        >
          Meet Jaime
        </motion.h1>
        <p className="text-muted-foreground mt-3 text-lg">Lifelong Ellington Resident & Selectman</p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <img
              src={portrait}
              alt="Jaime Boucher portrait"
              className="rounded-lg w-full object-cover aspect-[4/5]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Rooted in Ellington</h2>
              <p className="text-muted-foreground leading-[1.8]">
                I'm a lifelong Ellington resident and proud graduate of Ellington High School. I previously owned the local brewery and tavern in town and now I work for the Town of Vernon while still staying active in our community. As a former small business owner, finding ways that allow our local businesses to grow in Ellington continues to be one of my top priorities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-4">Community Involvement</h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Coached Ellington High School and American Legion baseball programs",
                  "Current volunteer with the Ellington Lions Club",
                  "Vice President, Professional Employees Union Local 818 (AFSCME)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-4">Since Taking Office (2023)</h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Spoken out against unfair utility rate hikes",
                  "Studied the impacts of the crumbling foundation crisis",
                  "Served on the 2024 Charter Revision Committee",
                  "Joined the Conservation Commission in 2025",
                  "Advocate for expanding veteran exemptions to widowed spouses",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="border-l-4 border-primary pl-5 italic text-foreground/80 leading-relaxed">
              My focus remains simple: advance common-sense policies that best support our residents, strengthen our local businesses and farms, and back initiatives that make Ellington a place where families can grow.
            </blockquote>

            <Button variant="default" size="lg" asChild>
              <Link to="/priorities">2026 Campaign Page →</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default MeetJaime;
