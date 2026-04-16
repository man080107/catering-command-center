import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Calendar, Users, MessageSquare } from "lucide-react";

type Inquiry = {
  id: string; name: string; phone: string; email: string | null;
  event_type: string | null; pax: number | null; event_date: string | null;
  message: string | null; status: string; admin_notes: string | null; created_at: string;
};

const AdminInquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    toast({ title: `Status updated to ${status}` });
    load();
  };

  const updateNotes = async (id: string, notes: string) => {
    await supabase.from("inquiries").update({ admin_notes: notes }).eq("id", id);
  };



  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground mb-6">Inquiries</h1>
      {inquiries.length === 0 ? (
        <p className="text-muted-foreground font-body">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold font-body text-foreground">{inq.name}</h3>
                  <p className="text-xs text-muted-foreground font-body">
                    {new Date(inq.created_at).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <select
                  value={inq.status}
                  onChange={(e) => updateStatus(inq.id, e.target.value)}
                  className="text-xs font-semibold font-body px-3 py-1.5 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-sm font-body text-foreground/80 mb-3">
                <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" />{inq.phone}</span>
                {inq.email && <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" />{inq.email}</span>}
                {inq.event_type && <span className="flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5 text-primary" />{inq.event_type}</span>}
                {inq.pax && <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-primary" />{inq.pax} pax</span>}
                {inq.event_date && <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" />{inq.event_date}</span>}
              </div>
              {inq.message && <p className="text-sm text-muted-foreground font-body bg-muted p-3 rounded-lg mb-3">{inq.message}</p>}
              <textarea
                placeholder="Admin notes..."
                defaultValue={inq.admin_notes || ""}
                onBlur={(e) => updateNotes(inq.id, e.target.value)}
                rows={2}
                className="w-full text-sm font-body px-3 py-2 rounded-lg border border-border bg-background text-foreground resize-none focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              />
              <div className="flex gap-2 mt-3">
                <a href={`tel:${inq.phone}`} className="text-xs font-body font-semibold text-primary hover:underline">📞 Call</a>
                <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs font-body font-semibold text-primary hover:underline">💬 WhatsApp</a>
                {inq.email && <a href={`mailto:${inq.email}`} className="text-xs font-body font-semibold text-primary hover:underline">✉️ Email</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
