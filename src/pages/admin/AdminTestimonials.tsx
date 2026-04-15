import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from "lucide-react";

type Testimonial = {
  id: string; text: string; author: string; role: string | null;
  rating: number; is_visible: boolean; sort_order: number;
};

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.text || !editing?.author) return;
    if (editing.id) {
      await supabase.from("testimonials").update(editing).eq("id", editing.id);
      toast({ title: "Testimonial updated" });
    } else {
      await supabase.from("testimonials").insert(editing as any);
      toast({ title: "Testimonial added" });
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Deleted" });
    load();
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    await supabase.from("testimonials").update({ is_visible: !visible }).eq("id", id);
    load();
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Testimonials</h1>
        <button onClick={() => setEditing({ text: "", author: "", role: "", rating: 5, is_visible: true, sort_order: 0 })}
          className="bg-gradient-warm text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold font-body flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-body text-foreground">{editing.id ? "Edit" : "New"} Testimonial</h3>
            <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <textarea placeholder="Review text *" value={editing.text || ""} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm resize-none focus:ring-2 focus:ring-primary/30 outline-none" />
          <div className="grid sm:grid-cols-3 gap-3">
            <input placeholder="Author *" value={editing.author || ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input placeholder="Role" value={editing.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <select value={editing.rating || 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm">
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
            </select>
          </div>
          <button onClick={save} className="bg-gradient-warm text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold font-body flex items-center gap-2 hover:opacity-90">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-xl px-5 py-3 flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm font-body text-foreground/80 italic">"{t.text}"</p>
              <p className="text-xs text-muted-foreground font-body mt-1">— {t.author}{t.role ? `, ${t.role}` : ""} · {"★".repeat(t.rating)}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => toggleVisibility(t.id, t.is_visible)} className="text-muted-foreground hover:text-primary">
                {t.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => setEditing(t)} className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(t.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
