import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const posts = [
  {
    id: "water-rate-hike",
    date: "March 10, 2026",
    category: "Utility Costs",
    readTime: "4 min read",
    title: "Standing Up Against the 18% Water Rate Hike",
    excerpt: "Last week, I attended the PURA public hearing to confront Connecticut Water Co. about their proposed 18% rate increase. Here's what happened and what it means for Ellington families.",
    featured: true,
  },
  {
    id: "conservation-commission",
    date: "February 22, 2026",
    category: "Conservation",
    readTime: "3 min read",
    title: "Why I Joined the Conservation Commission",
    excerpt: "Protecting Ellington's natural spaces and agricultural heritage is critical for our community's future. Here's my vision for balancing growth with conservation.",
    featured: false,
  },
  {
    id: "veterans-exemption",
    date: "February 8, 2026",
    category: "Veterans",
    readTime: "5 min read",
    title: "Expanding the Veterans Exemption: A Moral Imperative",
    excerpt: "Our disabled veterans and their widowed spouses deserve better. I'm pushing to expand the Local Veteran Exemption to cover those who've sacrificed the most.",
    featured: false,
  },
  {
    id: "charter-revision",
    date: "January 15, 2026",
    category: "Governance",
    readTime: "6 min read",
    title: "Reflections on the Charter Revision Process",
    excerpt: "Serving on the 2024 Charter Revision Committee gave me insight into how our town government can better serve residents. Here are the key takeaways.",
    featured: false,
  },
  {
    id: "small-business-support",
    date: "December 20, 2025",
    category: "Business",
    readTime: "4 min read",
    title: "Supporting Ellington's Small Businesses and Farms",
    excerpt: "As a former small business owner myself, I know the challenges local entrepreneurs face. Here's what we're doing to support home daycares, farms, and local businesses.",
    featured: false,
  },
  {
    id: "crumbling-foundations",
    date: "November 5, 2025",
    category: "Housing",
    readTime: "7 min read",
    title: "The Crumbling Foundation Crisis: What Ellington Needs to Know",
    excerpt: "Hundreds of homes in our area are affected by the crumbling foundation crisis. I've been studying the impacts and here's where we stand on solutions.",
    featured: false,
  },
];

const categories = ["All", "Utility Costs", "Conservation", "Veterans", "Governance", "Business", "Housing"];

const Blog = () => {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="container mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-4">Updates & Insights</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              News & <span className="text-primary">Blog</span>
            </h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Stay informed about what's happening in Ellington and where I stand on the issues that matter.
            </p>
            <div className="w-16 h-1 bg-primary mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 bg-muted border-b border-border">
        <div className="container mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-200 first:bg-primary first:text-primary-foreground first:border-primary"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-primary text-primary-foreground text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured</span>
                  <span className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Tag className="w-3 h-3" /> {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Calendar className="w-3 h-3" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
                  {featured.excerpt}
                </p>
                <Button variant="default" size="lg">
                  Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-24 md:py-32 bg-muted">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground">Recent Posts</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <motion.article
                key={post.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary text-xs font-display font-semibold px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Stay Informed</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Follow Jaime's campaign for regular updates on town meetings, policy decisions, and community events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/contact">Get in Touch <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/volunteer">Join the Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
