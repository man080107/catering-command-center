import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, TrendingUp, UtensilsCrossed, Clock } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ inquiries: 0, pending: 0, menuItems: 0, brands: 0 });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [inq, pending, menu, brands, recent] = await Promise.all([
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("menu_items").select("id", { count: "exact", head: true }),
        supabase.from("brands").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        inquiries: inq.count || 0,
        pending: pending.count || 0,
        menuItems: menu.count || 0,
        brands: brands.count || 0,
      });
      setRecentInquiries(recent.data || []);
    };
    load();
  }, []);

  const cards = [
    { label: "Total Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-primary" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-secondary" },
    { label: "Menu Items", value: stats.menuItems, icon: UtensilsCrossed, color: "text-accent-foreground" },
    { label: "Brands", value: stats.brands, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground font-body">{c.label}</span>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <p className="text-3xl font-bold font-display text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-display font-bold text-foreground mb-4">Recent Inquiries</h2>
        {recentInquiries.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body">No inquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-semibold text-sm font-body text-foreground">{inq.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{inq.event_type} · {inq.pax} pax · {inq.phone}</p>
                </div>
                <span className={`text-xs font-semibold font-body px-2.5 py-1 rounded-full ${
                  inq.status === "pending" ? "bg-secondary/20 text-secondary" :
                  inq.status === "contacted" ? "bg-primary/10 text-primary" :
                  "bg-accent/20 text-accent-foreground"
                }`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
