import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    pax: "",
    date: "",
    message: "",
    confirmWebsite: "", // Honeypot field for bot detection
  });
  const [submitting, setSubmitting] = useState(false);
  const [mountedAt] = useState(() => Date.now());

  // Today's date string (YYYY-MM-DD) for min date constraint
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── 1. Honeypot check (Silent rejection for bots) ─────────────────────
    if (form.confirmWebsite && form.confirmWebsite.trim() !== "") {
      console.warn("[ContactForm] Spam bot detected via honeypot field.");
      // Pretend success to fool the bot into thinking submission succeeded
      toast({
        title: "✅ Quote Request Sent!",
        description: "We'll contact you shortly.",
      });
      setForm({ name: "", phone: "", email: "", eventType: "", pax: "", date: "", message: "", confirmWebsite: "" });
      return;
    }

    // ── 2. Submission speed check (<2.5 seconds = automated script) ──────────
    const elapsed = Date.now() - mountedAt;
    if (elapsed < 2500) {
      console.warn("[ContactForm] Spam bot detected via submission speed:", elapsed, "ms");
      toast({
        title: "✅ Quote Request Sent!",
        description: "We'll contact you shortly.",
      });
      setForm({ name: "", phone: "", email: "", eventType: "", pax: "", date: "", message: "", confirmWebsite: "" });
      return;
    }

    // ── 3. Client Cooldown (Prevent rapid re-submissions within 45s) ────────
    const lastSubmit = localStorage.getItem("last_quote_submit");
    if (lastSubmit) {
      const timeSinceLast = Date.now() - Number(lastSubmit);
      if (timeSinceLast < 45000) {
        const remainingSec = Math.ceil((45000 - timeSinceLast) / 1000);
        toast({
          title: "⏳ Please Wait",
          description: `You sent a quote request recently. Please wait ${remainingSec} seconds before submitting another.`,
          variant: "destructive",
        });
        return;
      }
    }

    // ── 4. Event Date Validation ──────────────────────────────────────────
    if (form.date) {
      const selectedDate = new Date(form.date);
      const selectedYear = selectedDate.getFullYear();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(selectedDate.getTime()) || selectedYear < 2024 || selectedDate < today) {
        toast({
          title: "❌ Invalid Event Date",
          description: "Please select a valid current or future date for your event.",
          variant: "destructive",
        });
        return;
      }
    }

    // ── 5. Phone & Name basic sanity check ────────────────────────────────
    const cleanPhone = form.phone.replace(/\D/g, "");
    if (cleanPhone.length < 7) {
      toast({
        title: "❌ Invalid Phone Number",
        description: "Please enter a valid contact phone number.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const elapsedTimeMs = Date.now() - mountedAt;

    const inquiryPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email ? form.email.trim() : null,
      event_type: form.eventType || null,
      pax: form.pax ? Number(form.pax) : null,
      event_date: form.date || null,
      message: form.message ? form.message.trim() : null,
      confirmWebsite: form.confirmWebsite || null,
      elapsedTimeMs: elapsedTimeMs,
    };

    console.log("[ContactForm] Invoking secure notify-inquiry edge function...");

    // Record submission timestamp for local cooldown
    localStorage.setItem("last_quote_submit", Date.now().toString());

    try {
      const { data: fnData, error: fnError } = await supabase.functions.invoke("notify-inquiry", {
        body: inquiryPayload,
      });

      setSubmitting(false);

      if (fnError) {
        console.error("[ContactForm] Edge function invocation error:", fnError);
        toast({
          title: "❌ Submission Failed",
          description: "Sorry, we couldn't submit your inquiry right now. Please try again or contact us directly at +65 9838 9733.",
          variant: "destructive",
        });
        return;
      }

      console.log("[ContactForm] ✅ Edge function response:", fnData);

      const desc = form.email
        ? `We'll contact you shortly. A confirmation has been sent to ${form.email}`
        : "We'll be in touch shortly via phone.";

      toast({ title: "✅ Quote Request Sent!", description: desc });
      setForm({ name: "", phone: "", email: "", eventType: "", pax: "", date: "", message: "", confirmWebsite: "" });

    } catch (err) {
      console.error("[ContactForm] Fail-safe catch exception:", err);
      setSubmitting(false);
      toast({
        title: "❌ Submission Issue",
        description: "An unexpected error occurred. Please call or WhatsApp us directly at +65 9838 9733.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get a <span className="text-gradient-warm">Free Quote</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Tell us about your event and we'll prepare a customized quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4"
          >
            {/* Honeypot anti-spam field (hidden from human users, filled by bots) */}
            <div
              className="opacity-0 absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden pointer-events-none select-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              <label htmlFor="confirmWebsite">Leave this field blank</label>
              <input
                type="text"
                id="confirmWebsite"
                name="confirmWebsite"
                autoComplete="off"
                tabIndex={-1}
                value={form.confirmWebsite}
                onChange={(e) => setForm({ ...form, confirmWebsite: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text" placeholder="Your Name *" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              />
              <input
                type="tel" placeholder="Phone Number *" required
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              />
            </div>
            <input
              type="email" placeholder="Email Address"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            />
            <div className="grid sm:grid-cols-3 gap-4">
              <select
                value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              >
                <option value="">Event Type</option>
                <option>Corporate Lunch</option>
                <option>Buffet Catering</option>
                <option>Bento Order</option>
                <option>Festive Catering</option>
                <option>Party / Celebration</option>
                <option>Other</option>
              </select>
              <input
                type="number" placeholder="No. of Pax" min="10"
                value={form.pax} onChange={(e) => setForm({ ...form, pax: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              />
              <input
                type="date"
                min={todayStr}
                value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              />
            </div>
            <textarea
              placeholder="Tell us more about your event..." rows={4}
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-warm text-primary-foreground py-4 rounded-lg font-semibold text-base font-body hover:opacity-90 transition-opacity shadow-warm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Sending..." : "Send Quote Request"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-background rounded-xl border border-border p-6 space-y-5">
              <h3 className="font-bold font-display text-lg text-foreground">Contact Us Directly</h3>
              <a href="tel:+6598389733" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold font-body text-sm">+65 9838 9733</p>
                  <p className="text-xs text-muted-foreground font-body">Call or WhatsApp</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-foreground/80">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:kenny.huang@2iccatering.com" className="font-semibold font-body text-sm hover:text-primary transition-colors break-all">kenny.huang@2iccatering.com</a>
                  <a href="mailto:admin@2iccatering.com" className="font-semibold font-body text-sm hover:text-primary transition-colors break-all">admin@2iccatering.com</a>
                  <p className="text-xs text-muted-foreground font-body">Email us anytime</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-foreground/80">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold font-body text-sm">15 Jln Tepong</p>
                  <p className="text-xs text-muted-foreground font-body">Singapore 619336</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6598389733"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[hsl(142,70%,40%)] text-primary-foreground py-4 rounded-lg font-semibold text-center font-body hover:opacity-90 transition-opacity"
            >
              💬 WhatsApp Us Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

