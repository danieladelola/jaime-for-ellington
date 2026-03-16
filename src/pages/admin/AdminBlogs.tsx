import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload, Eye, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featured_image: string | null;
  status: string;
  created_at: string;
};

const emptyForm = { title: "", slug: "", content: "", status: "draft", featured_image: "" };

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return form.featured_image || null;
    const ext = imageFile.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, imageFile);
    if (error) { toast.error("Image upload failed"); return null; }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const imageUrl = await uploadImage();

    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      content: form.content,
      status: form.status,
      featured_image: imageUrl,
    };

    if (editing) {
      const { error } = await supabase.from("blogs").update(payload).eq("id", editing);
      if (error) toast.error("Update failed");
      else toast.success("Post updated!");
    } else {
      const { error } = await supabase.from("blogs").insert(payload);
      if (error) toast.error("Create failed: " + error.message);
      else toast.success("Post created!");
    }

    setLoading(false);
    resetForm();
    fetchBlogs();
  };

  const handleEdit = (blog: Blog) => {
    setEditing(blog.id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      content: blog.content || "",
      status: blog.status,
      featured_image: blog.featured_image || "",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Post deleted"); fetchBlogs(); }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    setImageFile(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog content</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-card rounded-xl border border-border p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-foreground">
                {editing ? "Edit Post" : "New Post"}
              </h2>
              <button onClick={resetForm} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Title *</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                    required
                    placeholder="Post title"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Slug</label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated-slug"
                    className="h-12"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Content</label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={8}
                  placeholder="Write your blog post content..."
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Featured Image</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      {imageFile ? imageFile.name : "Choose file"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  {form.featured_image && !imageFile && (
                    <img src={form.featured_image} alt="Preview" className="mt-3 h-20 rounded-lg object-cover" />
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editing ? "Update Post" : "Create Post"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts list */}
      <div className="space-y-4">
        {blogs.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No blog posts yet. Create your first one!</p>
          </div>
        )}
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-xl border border-border p-5 flex items-center gap-4 hover:border-primary/20 hover:shadow-sm transition-all"
          >
            {blog.featured_image && (
              <img src={blog.featured_image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-foreground truncate">{blog.title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  blog.status === "published" ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600"
                }`}>
                  {blog.status === "published" ? <Eye className="w-3 h-3" /> : <PenLine className="w-3 h-3" />}
                  {blog.status}
                </span>
                <span className="text-muted-foreground text-xs">
                  {new Date(blog.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(blog)}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogs;
