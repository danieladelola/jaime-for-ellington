import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featured_image: string | null;
  status: string;
  created_at: string;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

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

      {loading ? (
        <section className="py-24 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        </section>
      ) : posts.length === 0 ? (
        <section className="py-24 text-center">
          <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
        </section>
      ) : (
        <>
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
                  {featured.featured_image && (
                    <img src={featured.featured_image} alt={featured.title} className="w-full h-64 md:h-80 object-cover" />
                  )}
                  <div className="p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="bg-primary text-primary-foreground text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">Latest</span>
                      <span className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar className="w-3 h-3" /> {new Date(featured.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8 line-clamp-3">
                      {featured.content}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* All Posts */}
          {rest.length > 0 && (
            <section className="py-24 md:py-32 bg-muted">
              <div className="container mx-auto">
                <h2 className="text-3xl font-display font-bold text-foreground mb-12">Recent Posts</h2>
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
                      {post.featured_image && (
                        <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-8">
                        <h3 className="font-display font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                          {post.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

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
