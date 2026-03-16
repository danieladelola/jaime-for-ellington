import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, MessageSquare, Eye, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({ blogs: 0, published: 0, drafts: 0, contacts: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [blogsRes, pubRes, draftRes, contactsRes] = await Promise.all([
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("blogs").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        blogs: blogsRes.count ?? 0,
        published: pubRes.count ?? 0,
        drafts: draftRes.count ?? 0,
        contacts: contactsRes.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Posts", value: stats.blogs, icon: FileText, color: "bg-primary/10 text-primary" },
    { label: "Published", value: stats.published, icon: Eye, color: "bg-green-500/10 text-green-600" },
    { label: "Drafts", value: stats.drafts, icon: PenLine, color: "bg-amber-500/10 text-amber-600" },
    { label: "Contact Messages", value: stats.contacts, icon: MessageSquare, color: "bg-blue-500/10 text-blue-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your admin panel.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-muted-foreground text-sm mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
