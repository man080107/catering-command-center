import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Admin notification target — always receives inquiry emails
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "kenny.huang@2iccatering.com";

// Sender address — must be from a Resend-verified domain
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "noreply@2iccatering.com";
const FROM_NAME = "2 IC Catering";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryPayload {
  name: string;
  phone: string;
  email?: string | null;
  event_type?: string | null;
  pax?: number | null;
  event_date?: string | null;
  message?: string | null;
}

// ─── Helper: send a single email via Resend ──────────────────────────────────
async function sendEmail(to: string[], subject: string, html: string): Promise<{ ok: boolean; data: unknown }> {
  console.log(`[notify-inquiry] Sending email to: ${to.join(", ")} | Subject: ${subject}`);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    }),
  });

  const data = await res.json();
  console.log(`[notify-inquiry] Resend response (${res.status}):`, JSON.stringify(data));
  return { ok: res.ok, data };
}

// ─── Admin notification email HTML ────────────────────────────────────────────
function buildAdminEmailHtml(inquiry: InquiryPayload, eventDate: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Catering Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#c8860a 0%,#e8a020 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">🍽️ New Catering Inquiry</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Someone just submitted a quote request on your website</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Alert Banner -->
              <div style="background:#fff8e8;border-left:4px solid #c8860a;border-radius:6px;padding:14px 18px;margin-bottom:28px;">
                <p style="margin:0;color:#7a5000;font-size:14px;font-weight:600;">⚡ Action Required — Please respond promptly to this inquiry.</p>
              </div>

              <!-- Inquiry Details -->
              <h2 style="margin:0 0 20px;font-size:17px;color:#1a1a1a;font-weight:700;">Inquiry Details</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:12px 0;color:#888;font-size:13px;font-weight:600;width:38%;vertical-align:top;">👤 Client Name</td>
                  <td style="padding:12px 0;color:#1a1a1a;font-size:14px;font-weight:600;">${inquiry.name}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:12px 0;color:#888;font-size:13px;font-weight:600;vertical-align:top;">📞 Phone</td>
                  <td style="padding:12px 0;color:#1a1a1a;font-size:14px;">
                    <a href="tel:${inquiry.phone}" style="color:#c8860a;text-decoration:none;font-weight:600;">${inquiry.phone}</a>
                  </td>
                </tr>
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:12px 0;color:#888;font-size:13px;font-weight:600;vertical-align:top;">✉️ Email</td>
                  <td style="padding:12px 0;color:#1a1a1a;font-size:14px;">
                    ${inquiry.email
                      ? `<a href="mailto:${inquiry.email}" style="color:#c8860a;text-decoration:none;font-weight:600;">${inquiry.email}</a>`
                      : '<span style="color:#aaa;">Not provided</span>'
                    }
                  </td>
                </tr>
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:12px 0;color:#888;font-size:13px;font-weight:600;vertical-align:top;">🎉 Event Type</td>
                  <td style="padding:12px 0;color:#1a1a1a;font-size:14px;">${inquiry.event_type || "Not specified"}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:12px 0;color:#888;font-size:13px;font-weight:600;vertical-align:top;">👥 No. of Pax</td>
                  <td style="padding:12px 0;color:#1a1a1a;font-size:14px;font-weight:700;">${inquiry.pax ? `${inquiry.pax} pax` : "Not specified"}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0f0f0;">
                  <td style="padding:12px 0;color:#888;font-size:13px;font-weight:600;vertical-align:top;">📅 Event Date</td>
                  <td style="padding:12px 0;color:#1a1a1a;font-size:14px;">${eventDate}</td>
                </tr>
                ${inquiry.message ? `
                <tr>
                  <td style="padding:12px 0;color:#888;font-size:13px;font-weight:600;vertical-align:top;">💬 Message</td>
                  <td style="padding:12px 0;color:#1a1a1a;font-size:14px;line-height:1.6;">${inquiry.message.replace(/\n/g, "<br/>")}</td>
                </tr>
                ` : ""}
              </table>

              <!-- CTA Buttons -->
              <div style="margin:32px 0 0;">
                ${inquiry.phone ? `
                <a href="https://wa.me/65${inquiry.phone.replace(/\D/g, "")}" style="display:inline-block;background:linear-gradient(135deg,#25d366,#128c7e);color:#ffffff;text-decoration:none;padding:13px 24px;border-radius:8px;font-size:14px;font-weight:600;margin-right:12px;">💬 WhatsApp Client</a>
                ` : ""}
                ${inquiry.email ? `
                <a href="mailto:${inquiry.email}?subject=Re: Catering Quote from 2 IC Catering" style="display:inline-block;background:linear-gradient(135deg,#c8860a,#e8a020);color:#ffffff;text-decoration:none;padding:13px 24px;border-radius:8px;font-size:14px;font-weight:600;">✉️ Reply by Email</a>
                ` : ""}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #ebebeb;text-align:center;">
              <p style="margin:0;color:#aaa;font-size:12px;">This notification was automatically sent by <strong>2 IC Catering</strong> website</p>
              <p style="margin:6px 0 0;color:#aaa;font-size:12px;">15 Jln Tepong, Singapore 619336</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Customer auto-reply email HTML ──────────────────────────────────────────
function buildCustomerEmailHtml(inquiry: InquiryPayload, eventDate: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your inquiry!</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#c8860a 0%,#e8a020 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">🍽️ Thank You, ${inquiry.name}!</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">We've received your catering inquiry and will be in touch shortly.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:15px;color:#333;line-height:1.7;">
                Hi <strong>${inquiry.name}</strong>, thank you for reaching out to <strong>2 IC Catering</strong>! 
                Our team has received your inquiry and we'll get back to you as soon as possible — usually within <strong>1 business day</strong>.
              </p>

              <!-- Summary Box -->
              <div style="background:#fff8e8;border:1px solid #f0d080;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
                <h3 style="margin:0 0 14px;font-size:15px;color:#7a5000;">📋 Your Inquiry Summary</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;color:#888;font-size:13px;width:40%;">🎉 Event Type</td>
                    <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-weight:600;">${inquiry.event_type || "Not specified"}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#888;font-size:13px;">👥 No. of Pax</td>
                    <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-weight:600;">${inquiry.pax ? `${inquiry.pax} pax` : "Not specified"}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#888;font-size:13px;">📅 Event Date</td>
                    <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-weight:600;">${eventDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#888;font-size:13px;">📞 Phone</td>
                    <td style="padding:6px 0;color:#1a1a1a;font-size:13px;font-weight:600;">${inquiry.phone}</td>
                  </tr>
                </table>
              </div>

              <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.7;">
                In the meantime, feel free to reach us directly:
              </p>

              <!-- Contact options -->
              <div style="margin:0 0 28px;">
                <a href="https://wa.me/6598389733" style="display:inline-block;background:linear-gradient(135deg,#25d366,#128c7e);color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;margin-right:10px;">💬 WhatsApp Us</a>
                <a href="tel:+6598389733" style="display:inline-block;background:linear-gradient(135deg,#c8860a,#e8a020);color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;">📞 Call Us</a>
              </div>

              <p style="margin:0;font-size:13px;color:#aaa;">
                Please do not reply to this email — this is an automated message. Use the buttons above or email us at 
                <a href="mailto:kenny.huang@2iccatering.com" style="color:#c8860a;text-decoration:none;">kenny.huang@2iccatering.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #ebebeb;text-align:center;">
              <p style="margin:0;color:#aaa;font-size:12px;"><strong>2 IC Catering</strong> | 15 Jln Tepong, Singapore 619336</p>
              <p style="margin:6px 0 0;color:#aaa;font-size:12px;">+65 9838 9733 | kenny.huang@2iccatering.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Main handler ─────────────────────────────────────────────────────────────
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  console.log("[notify-inquiry] Function invoked");

  // Guard: ensure RESEND_API_KEY is set
  if (!RESEND_API_KEY) {
    console.error("[notify-inquiry] CRITICAL: RESEND_API_KEY secret is not set!");
    return new Response(
      JSON.stringify({ error: "Server misconfiguration: RESEND_API_KEY not set" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const inquiry: InquiryPayload = await req.json();
    console.log("[notify-inquiry] Payload received:", JSON.stringify({
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email,
      event_type: inquiry.event_type,
      pax: inquiry.pax,
      event_date: inquiry.event_date,
    }));

    const eventDate = inquiry.event_date
      ? new Date(inquiry.event_date).toLocaleDateString("en-SG", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "Not specified";

    const errors: string[] = [];

    // ── 1. Send admin notification ────────────────────────────────────────
    console.log(`[notify-inquiry] Sending admin notification to: ${NOTIFY_EMAIL}`);
    const adminHtml = buildAdminEmailHtml(inquiry, eventDate);
    const adminResult = await sendEmail(
      [NOTIFY_EMAIL],
      `🍽️ New Quote Request from ${inquiry.name} — ${inquiry.event_type || "Catering Inquiry"}`,
      adminHtml
    );

    if (!adminResult.ok) {
      const errMsg = `Admin email failed: ${JSON.stringify(adminResult.data)}`;
      console.error("[notify-inquiry]", errMsg);
      errors.push(errMsg);
    } else {
      console.log("[notify-inquiry] ✅ Admin notification sent successfully");
    }

    // ── 2. Send customer auto-reply (only if customer provided their email) ──
    if (inquiry.email) {
      console.log(`[notify-inquiry] Sending customer auto-reply to: ${inquiry.email}`);
      const customerHtml = buildCustomerEmailHtml(inquiry, eventDate);
      const customerResult = await sendEmail(
        [inquiry.email],
        "✅ We received your catering inquiry — 2 IC Catering",
        customerHtml
      );

      if (!customerResult.ok) {
        const errMsg = `Customer auto-reply failed: ${JSON.stringify(customerResult.data)}`;
        console.error("[notify-inquiry]", errMsg);
        errors.push(errMsg);
      } else {
        console.log("[notify-inquiry] ✅ Customer auto-reply sent successfully");
      }
    } else {
      console.log("[notify-inquiry] No customer email provided — skipping auto-reply");
    }

    // Return result
    if (errors.length > 0 && !adminResult.ok) {
      // Admin email failed — this is a real error
      return new Response(
        JSON.stringify({ error: errors.join("; ") }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        adminEmailSent: adminResult.ok,
        customerReplySent: inquiry.email ? true : false,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[notify-inquiry] Unhandled exception:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
