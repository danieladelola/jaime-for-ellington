import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload, Calendar, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface EventRow {
  id: string;
  title: string;
  short_description: string | null;
  full_description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  featured_image: string | null;
  status: string;
  created_at: string;
}

const emptyForm = {
  title: "",
  short_description: "",
  full_description: "",
  event_date: "",
  event_time: "",
  location: "",
  status: "published",
};

const AdminEvents = () => {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    const { data, error } = await (supabase as any)
      .from("events")
      .select("*")
      .order("event_date", { ascending: false });
    if (!error && data) setEvents(data as EventRow[]);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `events/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) { toast.error("Image upload failed"); return null; }
    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
    return urlData.publicUrl;
  };

  const handleSubmit = async () => {
    if (!form.title || !form.event_date) {
      toast.error("Title and date are required");
      return;
    }
    setSaving(true);
    let imageUrl = imagePreview;

    if (imageFile) {
      const uploaded = await uploadImage(imageFile);
      if (uploaded) imageUrl = uploaded;
    }

    const payload = {
      title: form.title,
      short_description: form.short_description || null,
      full_description: form.full_description || null,
      event_date: form.event_date,
      event_time: form.event_time || null,
      location: form.location || null,
      featured_image: imageUrl,
      status: form.status,
    };

    if (editingId) {
      const { error } = await (supabase as any).from("events").update(payload).eq("id", editingId);
      if (error) toast.error("Failed to update event");
      else toast.success("Event updated");
    } else {
      const { error } = await (supabase as any).from("events").insert(payload);
      if (error) toast.error("Failed to create event");
      else toast.success("Event created");
    }

    resetForm();
    setSaving(false);
    fetchEvents();
  };

  const handleEdit = (event: EventRow) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      short_description: event.short_description || "",
      full_description: event.full_description || "",
      event_date: event.event_date,
      event_time: event.event_time || "",
      location: event.location || "",
      status: event.status,
    });
    setImagePreview(event.featured_image);
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    const { error } = await (supabase as any).from("events").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Event deleted"); fetchEvents(); }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setImageFile(null);
    setImagePreview(null);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground text-sm mt-1">{events.length} total events</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" /> New Event
        </Button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-lg text-foreground">
                  {editingId ? "Edit Event" : "Create Event"}
                </h2>
                <button onClick={resetForm} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Title *</label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Date *</label>
                    <Input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Time</label>
                    <Input type="time" value={form.event_time} onChange={(e) => setForm({ ...form, event_time: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Location</label>
                  <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Event location" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Short Description</label>
                  <Textarea rows={2} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} placeholder="Brief summary for cards" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Description</label>
                  <Textarea rows={5} value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} placeholder="Detailed event description" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Featured Image</label>
                  <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg p-4 hover:bg-muted transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{imageFile ? imageFile.name : "Choose image..."}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-3 rounded-lg w-full max-h-48 object-cover" />
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={handleSubmit} disabled={saving} className="flex-1">
                    {saving ? "Saving..." : editingId ? "Update Event" : "Create Event"}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-display font-semibold text-lg">No events yet</p>
          <p className="text-sm mt-1">Create your first event to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-card border border-border rounded-xl p-3 sm:p-5 flex gap-3 sm:gap-5 items-start hover:shadow-md transition-shadow overflow-hidden">
              {event.featured_image && (
                <img src={event.featured_image} alt={event.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-foreground text-sm sm:text-base truncate">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(event.event_date).toLocaleDateString()}</span>
                      {event.event_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.event_time}</span>}
                      {event.location && <span className="flex items-center gap-1 truncate max-w-[120px] sm:max-w-none"><MapPin className="w-3 h-3 flex-shrink-0" /> {event.location}</span>}
                    </div>
                    {event.short_description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{event.short_description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cn("text-xs px-2 py-1 rounded-full font-medium", event.status === "published" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                      {event.status}
                    </span>
                    <button onClick={() => handleEdit(event)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(event.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
