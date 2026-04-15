import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

type MenuItem = {
  id: string; category: string; name: string; description: string | null;
  price: number | null; price_label: string | null; min_pax: number | null;
  courses: number | null; is_bestseller: boolean; is_seasonal: boolean; is_available: boolean;
  sort_order: number;
};

const emptyItem: Omit<MenuItem, "id"> = {
  category: "buffet", name: "", description: "", price: null, price_label: "/pax",
  min_pax: null, courses: null, is_bestseller: false, is_seasonal: false, is_available: true, sort_order: 0,
};

const AdminMenu = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editing, setEditing] = useState<Partial<MenuItem> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.name) return;
    if (editing.id) {
      await supabase.from("menu_items").update(editing).eq("id", editing.id);
      toast({ title: "Menu item updated" });
    } else {
      await supabase.from("menu_items").insert(editing as any);
      toast({ title: "Menu item added" });
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    await supabase.from("menu_items").delete().eq("id", id);
    toast({ title: "Menu item deleted" });
    load();
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-foreground">Menu Items</h1>
        <button
          onClick={() => setEditing({ ...emptyItem })}
          className="bg-gradient-warm text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold font-body flex items-center gap-2 hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {editing && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-body text-foreground">{editing.id ? "Edit" : "New"} Menu Item</h3>
            <button onClick={() => setEditing(null)} className="text-muted-foreground"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Name *" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <select value={editing.category || "buffet"} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm">
              <option value="buffet">Buffet</option>
              <option value="bento">Bento</option>
              <option value="refreshment">Refreshment</option>
              <option value="connect">Connect Takeaway</option>
            </select>
          </div>
          <textarea placeholder="Description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm resize-none focus:ring-2 focus:ring-primary/30 outline-none" />
          <div className="grid sm:grid-cols-4 gap-3">
            <input type="number" placeholder="Price" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) || null })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input placeholder="Price label" value={editing.price_label || ""} onChange={(e) => setEditing({ ...editing, price_label: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input type="number" placeholder="Min Pax" value={editing.min_pax || ""} onChange={(e) => setEditing({ ...editing, min_pax: Number(e.target.value) || null })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
            <input type="number" placeholder="Courses" value={editing.courses || ""} onChange={(e) => setEditing({ ...editing, courses: Number(e.target.value) || null })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none" />
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-body">
            <label className="flex items-center gap-2 text-foreground/80">
              <input type="checkbox" checked={editing.is_bestseller || false} onChange={(e) => setEditing({ ...editing, is_bestseller: e.target.checked })} /> Bestseller
            </label>
            <label className="flex items-center gap-2 text-foreground/80">
              <input type="checkbox" checked={editing.is_seasonal || false} onChange={(e) => setEditing({ ...editing, is_seasonal: e.target.checked })} /> Seasonal
            </label>
            <label className="flex items-center gap-2 text-foreground/80">
              <input type="checkbox" checked={editing.is_available ?? true} onChange={(e) => setEditing({ ...editing, is_available: e.target.checked })} /> Available
            </label>
          </div>
          <button onClick={save} className="bg-gradient-warm text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold font-body flex items-center gap-2 hover:opacity-90">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-muted-foreground font-body">No menu items yet. Add one above.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl px-5 py-3 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm font-body text-foreground">{item.name}</span>
                  {item.is_bestseller && <span className="text-[10px] font-bold bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">★ BEST</span>}
                  {item.is_seasonal && <span className="text-[10px] font-bold bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">SEASONAL</span>}
                  {!item.is_available && <span className="text-[10px] font-bold bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">HIDDEN</span>}
                </div>
                <p className="text-xs text-muted-foreground font-body">
                  {item.category} {item.price ? `· $${item.price}${item.price_label || ""}` : ""} {item.min_pax ? `· Min ${item.min_pax} pax` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(item)} className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
