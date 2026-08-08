"use server";

import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { createResendClient } from "@/lib/resend";
import { renderContactNotificationEmail } from "@/lib/email/contactNotification";
import { CONTACT_EMAIL } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(1, "Name is required.").max(100),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(5000),
  // Honeypot — must be empty; bots fill it, humans don't.
  website: z.string().max(0),
});

export interface ContactFormState {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    // Obscure name so password managers don't autofill the honeypot.
    website: formData.get("company_url_hp") ?? "",
  };

  // Honeypot triggered — silently succeed to not tip off bots.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    console.error("[contact] honeypot filled — skipping email/db");
    return { success: true };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as "name" | "email" | "message";
      if (field === "name" || field === "email" || field === "message") {
        fieldErrors[field] = issue.message;
      }
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  const { name, email, message } = parsed.data;
  console.error("[contact] saving lead + sending email →", CONTACT_EMAIL);

  // Persist to leads table — if this fails, surface the error.
  try {
    const supabase = createServiceRoleClient();
    const { error: dbError } = await supabase
      .from("leads")
      .insert({ email, name, message, source: "contact" });
    if (dbError) throw dbError;
  } catch (err) {
    console.error("[contact] db insert failed:", err);
    return { error: "Something went wrong. Please try again or email us directly." };
  }

  // Email Rose — non-fatal; message is already saved to the DB.
  // Match Resend's working test sender when RESEND_FROM_EMAIL is unset.
  const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("[contact] RESEND_API_KEY is missing in this process");
    }
    const { subject, html, text } = renderContactNotificationEmail({ name, email, message });
    const resend = createResendClient();
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_EMAIL,
      subject,
      html,
      text,
    });

    // Resend returns { error } instead of throwing on API failures — must check it.
    if (error) {
      console.error("[contact] Resend error:", error);
    } else {
      console.error("[contact] Resend ok:", data?.id, "from=", FROM_ADDRESS, "to=", CONTACT_EMAIL);
    }
  } catch (err) {
    console.error("[contact] Resend threw:", err);
  }

  return { success: true };
}
