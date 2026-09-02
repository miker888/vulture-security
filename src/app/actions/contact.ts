"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

const MAX = { name: 80, email: 160, phone: 40, message: 4000 };

function clean(value: FormDataEntryValue | null, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot. Real people never fill this in.
  if (clean(formData.get("company"), 100)) {
    return { status: "success", message: "Thanks for submitting!" };
  }

  const firstName = clean(formData.get("firstName"), MAX.name);
  const lastName = clean(formData.get("lastName"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const phone = clean(formData.get("phone"), MAX.phone);
  const message = clean(formData.get("message"), MAX.message);

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "Required";
  if (!email) fieldErrors.email = "Required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    fieldErrors.email = "Enter a valid email address";
  if (!message) fieldErrors.message = "Required";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const hdrs = await headers();
  const lead = {
    first_name: firstName,
    last_name: lastName || null,
    email,
    phone: phone || null,
    message,
    source: "website-contact-form",
    user_agent: hdrs.get("user-agent")?.slice(0, 300) ?? null,
  };

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Lead insert failed", err);
    return {
      status: "error",
      message: `Something went wrong on our end. Please call ${site.contact.phone} or email ${site.contact.email}.`,
    };
  }

  // Email notification is best effort. A lead already saved is not lost
  // just because the mail provider is down or unconfigured.
  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_TO) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.LEAD_NOTIFY_FROM ?? "Website <onboarding@resend.dev>",
        to: process.env.LEAD_NOTIFY_TO.split(",").map((s) => s.trim()),
        replyTo: email,
        subject: `New enquiry from ${firstName} ${lastName}`.trim(),
        text: [
          `Name:    ${firstName} ${lastName}`.trim(),
          `Email:   ${email}`,
          `Phone:   ${phone || "not provided"}`,
          "",
          message,
        ].join("\n"),
      });
    } catch (err) {
      console.error("Lead notification email failed", err);
    }
  }

  return { status: "success", message: "Thanks for submitting!" };
}
