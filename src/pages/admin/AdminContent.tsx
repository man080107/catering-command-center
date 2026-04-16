import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

type ContentItem = { id: string; key: string; value: string };

const defaultKeys = [
  { key: "hero_headline", label: "Hero Headline" },
  { key: "hero_subheadline", label: "Hero Subheadline" },
  { key: "phone", label: "Phone Number" },
  { key: "email", label: "Email Address" },
  { key: "address", label: "Address" },
  { key: "whatsapp", label: "WhatsApp Number" },
  { key: "promo_text", label: "Promotion Banner Text" },
];

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const load = async () => {
    const { data } = await supabase.from("site_content").select("*");
    setContent(data || []);
    const v: Record<string, string> = {};
    (data || []).forEach((d) => { v[d.key] = d.value; });
    setValues(v);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveKey = async (key: string) => {
    const existing = content.find((c) => c.key === key);
    if (existing) {
      await supabase.from("site_content").update({ value: values[key] || "" }).eq("id", existing.id);
    } else {
      await supabase.from("site_content").insert({ key, value: values[key] || "" });
    }
    toast({ title: `"${key}" saved` });
    load();
  };



  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-foreground mb-6">Site Content</h1>
      <div className="space-y-4">
        {defaultKeys.map((dk) => (
          <div key={dk.key} className="bg-card border border-border rounded-xl p-4">
            <label className="text-sm font-semibold font-body text-foreground mb-2 block">{dk.label}</label>
            <div className="flex gap-2">
              <input
                value={values[dk.key] || ""}
                onChange={(e) => setValues({ ...values, [dk.key]: e.target.value })}
                placeholder={`Enter ${dk.label.toLowerCase()}...`}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 outline-none"
              />
              <button onClick={() => saveKey(dk.key)} className="bg-gradient-warm text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold font-body hover:opacity-90">
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContent;
