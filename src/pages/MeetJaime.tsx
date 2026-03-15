import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import portrait from "@/assets/jaime-portrait.jpg";

const MeetJaime = () => (
  <div>
    {/* Header */}
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary-foreground">
          Meet Jaime
        </h1>
        <p className="text-primary-foreground/75 mt-3 text-lg">Lifelong Ellington Resident & Selectman</p>
      </div>
    </section>

    {/* Bio */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={portrait}
              alt="Jaime Boucher portrait"
              className="rounded-lg shadow-xl w-full max-w-md mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-display font-bold text-foreground">
              Rooted in Ellington
            </h2>
            <p className="text-muted-foreground leading-[1.7]">
              I'm a lifelong Ellington resident and proud graduate of Ellington High School. I previously owned the local brewery and tavern in town and now I work for the Town of Vernon while still staying active in our community. As a former small business owner, finding ways that allow our local businesses to grow in Ellington continues to be one of my top priorities.
            </p>

            <h3 className="text-xl font-display font-bold text-foreground">Community Involvement</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Coached Ellington High School and American Legion baseball programs
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Current volunteer with the Ellington Lions Club
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Vice President, Professional Employees Union Local 818 (AFSCME)
              </li>
            </ul>

            <h3 className="text-xl font-display font-bold text-foreground">Since Taking Office (2023)</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Spoken out against unfair utility rate hikes
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Studied the impacts of the crumbling foundation crisis
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Served on the 2024 Charter Revision Committee
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Joined the Conservation Commission in 2025
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                Advocate for expanding veteran exemptions to widowed spouses
              </li>
            </ul>

            <p className="text-foreground font-medium leading-[1.7] border-l-4 border-accent pl-4 italic">
              My focus remains simple: advance common-sense policies that best support our residents, strengthen our local businesses and farms, and back initiatives that make Ellington a place where families can grow.
            </p>

            <Button variant="hero" size="lg" asChild>
              <Link to="/priorities">2026 Campaign Page →</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default MeetJaime;
