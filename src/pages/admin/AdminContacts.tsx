import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Mail, Calendar, Eye, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    if (data) setContacts(data);
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm("Delete this contact message?")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Message deleted");
    if (selected?.id === id) setSelected(null);
    fetchContacts();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Contact Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">{contacts.length} message{contacts.length !== 1 ? "s" : ""} received</p>
      </div>

      {/* Message detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-card rounded-xl border border-border p-5 sm:p-6 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground text-lg">Message Details</h3>
                <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{selected.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{selected.name}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1 truncate">
                      <Mail className="w-3 h-3 flex-shrink-0" /> {selected.email}
                    </p>
                  </div>
                </div>
                <div className="text-muted-foreground text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {new Date(selected.created_at).toLocaleString()}
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words">{selected.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10 px-3 py-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {contacts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className="bg-card border border-border rounded-xl p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-xs">{c.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{c.name}</p>
                    <p className="text-muted-foreground text-xs truncate">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-muted-foreground text-xs hidden sm:inline">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => handleDelete(c.id, e)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-2 line-clamp-1 pl-12">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
