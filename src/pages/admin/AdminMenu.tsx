import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save, ChevronDown, ChevronRight } from "lucide-react";

// Types
type MenuPackage = { id: string; tab: string; name: string; price: number | null; price_label: string | null; courses: string | null; min_pax: string | null; is_popular: boolean; sort_order: number };
type MenuCategory = { id: string; package_id: string; label: string; sort_order: number };
type MenuDish = { id: string; category_id: string; name: string; sort_order: number };
type MenuItem = { id: string; category: string; name: string; description: string | null; price: number | null; price_label: string | null; min_pax: number | null; courses: number | null; is_bestseller: boolean; is_seasonal: boolean; is_available: boolean; sort_order: number };

const AdminMenu = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"buffet" | "bento" | "connect" | "refreshment" | "bento_asian">("buffet");
  
  // Data State
  const [packages, setPackages] = useState<MenuPackage[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [dishes, setDishes] = useState<MenuDish[]>([]);
  // We no longer use bentoItems state; we filter from packages directly
  
  const [loading, setLoading] = useState(false);
  
  // UI State
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>(null);
  const [expandedCatId, setExpandedCatId] = useState<string | null>(null);

  // Editing State
  const [editPkg, setEditPkg] = useState<Partial<MenuPackage> | null>(null);
  const [editCat, setEditCat] = useState<Partial<MenuCategory> | null>(null);
  const [editDish, setEditDish] = useState<Partial<MenuDish> | null>(null);
  const [editBento, setEditBento] = useState<Partial<MenuPackage> | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [pkgRes, catRes, dishRes] = await Promise.all([
      supabase.from("menu_packages").select("*").order("sort_order"),
      supabase.from("menu_categories").select("*").order("sort_order"),
      supabase.from("menu_dishes").select("*").order("sort_order"),
    ]);
    
    setPackages(pkgRes.data as MenuPackage[] || []);
    setCategories(catRes.data as MenuCategory[] || []);
    setDishes(dishRes.data as MenuDish[] || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const savePackage = async () => {
    if (!editPkg?.name) return;
    if (editPkg.id) {
      await supabase.from("menu_packages").update(editPkg as any).eq("id", editPkg.id);
      toast({ title: "Package updated" });
    } else {
      await supabase.from("menu_packages").insert({ ...editPkg, tab: activeTab } as any);
      toast({ title: "Package added" });
    }
    setEditPkg(null);
    loadData();
  };

  const removePackage = async (id: string) => {
    if (!confirm("Delete package and all its categories/dishes?")) return;
    await supabase.from("menu_packages").delete().eq("id", id);
    toast({ title: "Package deleted" });
    loadData();
  };

  const saveCategory = async () => {
    if (!editCat?.label || !editCat.package_id) return;
    if (editCat.id) {
      await supabase.from("menu_categories").update(editCat as any).eq("id", editCat.id);
      toast({ title: "Category updated" });
    } else {
      await supabase.from("menu_categories").insert(editCat as any);
      toast({ title: "Category added" });
    }
    setEditCat(null);
    loadData();
  };

  const removeCategory = async (id: string) => {
    if (!confirm("Delete category and its dishes?")) return;
    await supabase.from("menu_categories").delete().eq("id", id);
    toast({ title: "Category deleted" });
    loadData();
  };

  const saveDish = async () => {
    if (!editDish?.name || !editDish.category_id) return;
    if (editDish.id) {
      await supabase.from("menu_dishes").update(editDish as any).eq("id", editDish.id);
      toast({ title: "Dish updated" });
    } else {
      await supabase.from("menu_dishes").insert(editDish as any);
      toast({ title: "Dish added" });
    }
    setEditDish(null);
    loadData();
  };

  const removeDish = async (id: string) => {
    if (!confirm("Delete this dish?")) return;
    await supabase.from("menu_dishes").delete().eq("id", id);
    toast({ title: "Dish deleted" });
    loadData();
  };

  const saveBento = async () => {
    if (!editBento?.name) return;
    if (editBento.id) {
      await supabase.from("menu_packages").update(editBento as any).eq("id", editBento.id);
      toast({ title: "Bento updated" });
    } else {
      await supabase.from("menu_packages").insert({ ...editBento, tab: activeTab } as any);
      toast({ title: "Bento added" });
    }
    setEditBento(null);
    loadData();
  };

  const removeBento = async (id: string) => {
    if (!confirm("Delete this bento set?")) return;
    await supabase.from("menu_packages").delete().eq("id", id);
    toast({ title: "Bento deleted" });
    loadData();
  }

  // --- RENDER HELPERS ---

  const renderDishEditor = () => {
    if (!editDish) return null;
    return (
      <div className="bg-card border border-border p-4 rounded-lg mb-4 mt-2">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-sm">{editDish.id ? "Edit Dish" : "New Dish"}</h4>
          <button onClick={() => setEditDish(null)}><X className="w-4 h-4 text-muted-foreground"/></button>
        </div>
        <input className="w-full px-3 py-2 rounded border bg-background text-sm mb-2" placeholder="Dish Name" 
          value={editDish.name || ""} onChange={e => setEditDish({...editDish, name: e.target.value})} />
        <div className="flex justify-end"><button onClick={saveDish} className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm flex gap-2"><Save className="w-4 h-4"/> Save</button></div>
      </div>
    );
  };

  const renderCategoryEditor = () => {
    if (!editCat) return null;
    return (
      <div className="bg-card border border-border p-4 rounded-lg mb-4 mt-2">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-sm">{editCat.id ? "Edit Category" : "New Category"}</h4>
          <button onClick={() => setEditCat(null)}><X className="w-4 h-4 text-muted-foreground"/></button>
        </div>
        <input className="w-full px-3 py-2 rounded border bg-background text-sm mb-2" placeholder="Category Label (e.g. Chicken (Pick 1))" 
          value={editCat.label || ""} onChange={e => setEditCat({...editCat, label: e.target.value})} />
        <div className="flex justify-end"><button onClick={saveCategory} className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm flex gap-2"><Save className="w-4 h-4"/> Save</button></div>
      </div>
    );
  };

  const renderPackageEditor = () => {
    if (!editPkg) return null;
    return (
      <div className="bg-card border border-primary p-4 rounded-lg mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">{editPkg.id ? "Edit Package" : "New Package"}</h3>
          <button onClick={() => setEditPkg(null)}><X className="w-5 h-5 text-muted-foreground"/></button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input className="px-3 py-2 rounded border bg-background text-sm" placeholder="Package Name" value={editPkg.name || ""} onChange={e => setEditPkg({...editPkg, name: e.target.value})} />
          <input className="px-3 py-2 rounded border bg-background text-sm" placeholder="Min Pax (e.g. Min 30 pax)" value={editPkg.min_pax || ""} onChange={e => setEditPkg({...editPkg, min_pax: e.target.value})} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <input type="number" className="px-3 py-2 rounded border bg-background text-sm" placeholder="Price" value={editPkg.price || ""} onChange={e => setEditPkg({...editPkg, price: Number(e.target.value) || null})} />
          <input className="px-3 py-2 rounded border bg-background text-sm" placeholder="Price Label (/pax)" value={editPkg.price_label || ""} onChange={e => setEditPkg({...editPkg, price_label: e.target.value})} />
          <input className="px-3 py-2 rounded border bg-background text-sm" placeholder="Courses (e.g. 8 Courses)" value={editPkg.courses || ""} onChange={e => setEditPkg({...editPkg, courses: e.target.value})} />
        </div>
        <label className="flex items-center gap-2 text-sm mb-4">
          <input type="checkbox" checked={editPkg.is_popular || false} onChange={e => setEditPkg({...editPkg, is_popular: e.target.checked})} />
          Mark as Most Popular
        </label>
        <button onClick={savePackage} className="bg-primary text-primary-foreground px-4 py-2 rounded shadow-sm text-sm font-semibold flex items-center gap-2">
          <Save className="w-4 h-4"/> Save Package
        </button>
      </div>
    );
  };

  const renderNestedTree = () => {
    const pkgs = packages.filter(p => p.tab === activeTab);
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <button onClick={() => setEditPkg({ tab: activeTab, is_popular: false })} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4"/> Add Package (Section)
          </button>
        </div>
        {renderPackageEditor()}

        {pkgs.map(pkg => (
          <div key={pkg.id} className="border border-border rounded-xl bg-background overflow-hidden relative">
            {pkg.is_popular && <span className="absolute top-3 right-20 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">POPULAR</span>}
            
            <div className="p-4 bg-muted/30 flex items-center justify-between cursor-pointer" onClick={() => setExpandedPkgId(expandedPkgId === pkg.id ? null : pkg.id)}>
              <div className="flex items-center gap-2">
                {expandedPkgId === pkg.id ? <ChevronDown className="w-5 h-5"/> : <ChevronRight className="w-5 h-5"/>}
                <span className="font-bold text-lg">{pkg.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  {pkg.price ? `$${pkg.price}${pkg.price_label || ''}` : 'No exact price'} · {pkg.courses || ''}
                </span>
              </div>
              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <button onClick={() => setEditPkg(pkg)} className="p-1 text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4"/></button>
                <button onClick={() => removePackage(pkg.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>

            {expandedPkgId === pkg.id && (
              <div className="p-4 border-t border-border">
                <div className="flex justify-end mb-3">
                  <button onClick={() => setEditCat({ package_id: pkg.id })} className="text-sm flex items-center gap-1 text-primary"><Plus className="w-4 h-4"/> Add Category</button>
                </div>
                {editCat?.package_id === pkg.id && renderCategoryEditor()}

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {categories.filter(c => c.package_id === pkg.id).map(cat => (
                     <div key={cat.id} className="border border-border/50 rounded-lg p-3 bg-muted/10">
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/30">
                          <span className="font-semibold text-sm">{cat.label}</span>
                          <div className="flex gap-2">
                            <button onClick={() => setEditCat(cat)} className="text-muted-foreground hover:text-primary"><Pencil className="w-3.5 h-3.5"/></button>
                            <button onClick={() => removeCategory(cat.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5"/></button>
                            <button onClick={() => setExpandedCatId(expandedCatId === cat.id ? null : cat.id)} className="text-muted-foreground">
                              {expandedCatId === cat.id ? <ChevronDown className="w-3.5 h-3.5"/> : <ChevronRight className="w-3.5 h-3.5"/>}
                            </button>
                          </div>
                        </div>

                        {expandedCatId === cat.id && (
                          <div className="pl-4">
                            <div className="flex justify-end mb-2">
                              <button onClick={() => setEditDish({ category_id: cat.id })} className="text-xs flex items-center gap-1 text-primary"><Plus className="w-3 h-3"/> Add Dish</button>
                            </div>
                            {editDish?.category_id === cat.id && renderDishEditor()}
                            
                            <ul className="space-y-1">
                              {dishes.filter(d => d.category_id === cat.id).map(dish => (
                                <li key={dish.id} className="flex justify-between items-center text-sm py-1 px-2 hover:bg-muted/30 rounded">
                                  <span className="text-foreground/80">- {dish.name}</span>
                                  <div className="flex gap-2">
                                    <button onClick={() => setEditDish(dish)} className="text-muted-foreground hover:text-primary"><Pencil className="w-3 h-3"/></button>
                                    <button onClick={() => removeDish(dish.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3"/></button>
                                  </div>
                                </li>
                              ))}
                              {dishes.filter(d => d.category_id === cat.id).length === 0 && <p className="text-xs text-muted-foreground py-1">No dishes added yet.</p>}
                            </ul>
                          </div>
                        )}
                     </div>
                  ))}
                  {categories.filter(c => c.package_id === pkg.id).length === 0 && <p className="text-sm text-muted-foreground pb-2">No categories yet.</p>}
                </div>
              </div>
            )}
          </div>
        ))}
        {pkgs.length === 0 && <p className="text-muted-foreground text-center py-8">No packages in this tab yet.</p>}
      </div>
    );
  };

  const renderBentoTab = () => {
    const pkgs = packages.filter(p => p.tab === activeTab);
    return (
      <div>
        <div className="flex justify-end mb-4">
          <button onClick={() => setEditBento({ name: "Set Name", description: "Bento Description", price: 10, price_label: "/pax"})} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4"/> Add Bento Set
          </button>
        </div>

        {editBento && (
          <div className="bg-card border border-border p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-sm">{editBento.id ? "Edit Bento" : "New Bento"}</h3>
               <button onClick={() => setEditBento(null)}><X className="w-4 h-4"/></button>
            </div>
            <input className="w-full px-3 py-2 rounded border bg-background text-sm mb-2" placeholder={activeTab === "bento_asian" ? "Bento Name (e.g. Set 1 – Ayam Penyet)" : "Bento Name (e.g. Set A - Baked Chicken Yakitori)"} value={editBento.name || ""} onChange={e => setEditBento({...editBento, name: e.target.value})} />
            <textarea className="w-full px-3 py-2 rounded border bg-background text-sm mb-2 h-20" placeholder="Description (e.g. Red-brown rice, grilled chicken...)" value={editBento.description || ""} onChange={e => setEditBento({...editBento, description: e.target.value})} />
            <div className="grid sm:grid-cols-2 gap-3 mb-2">
              <input type="number" className="w-full px-3 py-2 rounded border bg-background text-sm" placeholder="Price" value={editBento.price || ""} onChange={e => setEditBento({...editBento, price: Number(e.target.value) || null})} />
              <input className="w-full px-3 py-2 rounded border bg-background text-sm" placeholder="Price Label (e.g. /pax)" value={editBento.price_label || ""} onChange={e => setEditBento({...editBento, price_label: e.target.value})} />
            </div>
            <div className="flex justify-end"><button onClick={saveBento} className="bg-primary text-primary-foreground px-4 py-1.5 rounded flex items-center gap-1 text-sm"><Save className="w-4 h-4"/> Save</button></div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {pkgs.map(bento => (
            <div key={bento.id} className="border border-border p-4 rounded-xl bg-background">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold font-display">{bento.name}</h4>
                <div className="flex gap-2">
                  <button onClick={() => setEditBento(bento)} className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4"/></button>
                  <button onClick={() => removeBento(bento.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4"/></button>
                </div>
              </div>
              <p className="text-xs text-primary font-bold mb-1">${bento.price}{bento.price_label}</p>
              <p className="text-sm text-muted-foreground">{bento.description}</p>
            </div>
          ))}
          {pkgs.length === 0 && <p className="text-muted-foreground">No bento sets found in database.</p>}
        </div>
      </div>
    );
  };



  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground mb-6">Advanced Menu Editor</h1>
      
      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto border-b border-border pb-2 mb-6">
        {[
          { id: "buffet", label: "Buffet Packages" },
          { id: "bento_asian", label: "Bento - Asian/Local Favourites" },
          { id: "bento", label: "Bento Sets" },
          { id: "connect", label: "Connect Takeaway" },
          { id: "refreshment", label: "Refreshments" },
        ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => { setActiveTab(tab.id as any); setEditPkg(null); setEditCat(null); setEditDish(null); setExpandedPkgId(null); setExpandedCatId(null); }}
             className={`px-4 py-2 rounded-t-lg text-sm font-semibold whitespace-nowrap transition-colors \${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
           >
             {tab.label}
           </button>
        ))}
      </div>

      {activeTab === "bento" || activeTab === "bento_asian" ? renderBentoTab() : renderNestedTree()}
    </div>
  );
};

export default AdminMenu;
