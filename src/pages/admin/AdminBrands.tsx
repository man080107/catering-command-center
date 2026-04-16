import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from "lucide-react";

type Brand = {
  id: string; name: string; tagline: string | null; description: string | null;
  image_url: string | null; website_url: string | null; order_url: string | null;
  instagram_url: string | null; is_visible: boolean; sort_order: number;
};

const AdminBrands = () => {
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [editing, setEditing] = useState<Partial<Brand> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("brands").select("*").order("sort_order");
    setBrands(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.name) return;
    if (editing.id) {
      await supabase.from("brands").update(editing).eq("id", editing.id);
      toast({ title: "Brand updated" });
    } else {
      await supabase.from("brands").insert(editing as any);
      toast({ title: "Brand added" });
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this brand?")) return;
    await supabase.from("brands").delete().eq("id", id);
    toast({ title: "Brand deleted" });
    load();
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    await supabase.from("brands").update({ is_visible: !visible }).eq("id", id);
    load();
  };



  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Brands</h1>
        <button onClick={() => setEditing({ name: "", tagline: "", description: "", image_url: "", website_url: "", order_url: "", instagram_url: "", is_visible: true, sort_order: 0 })}
          className="bg-gradient-warm text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold font-body flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-body text-foreground">{editing.id ? "Edit" : "New"} Brand</h3>
            <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Brand Name *" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input placeholder="Tagline" value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
          </div>
          <textarea placeholder="Description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm resize-none focus:ring-2 focus:ring-primary/30 outline-none" />
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Image URL" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input placeholder="Website URL" value={editing.website_url || ""} onChange={(e) => setEditing({ ...editing, website_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input placeholder="Order URL" value={editing.order_url || ""} onChange={(e) => setEditing({ ...editing, order_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input placeholder="Instagram URL" value={editing.instagram_url || ""} onChange={(e) => setEditing({ ...editing, instagram_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
          </div>
          <button onClick={save} className="bg-gradient-warm text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold font-body flex items-center gap-2 hover:opacity-90">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      )}

      <div className="space-y-2">
        {brands.map((b) => (
          <div key={b.id} className="bg-card border border-border rounded-xl px-5 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm font-body text-foreground">{b.name}</p>
              <p className="text-xs text-muted-foreground font-body">{b.tagline}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleVisibility(b.id, b.is_visible)} className="text-muted-foreground hover:text-primary">
                {b.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => setEditing(b)} className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(b.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBrands;
