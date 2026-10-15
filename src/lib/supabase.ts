import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Null until the project's URL and publishable key are set, so the site
// still builds and renders before Supabase is connected.
export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    : null;

// Every row this site writes is tagged with this key, so one Supabase project
// can collect leads from several sites (same pattern as Aspire).
export const SITE_KEY = "vulture-security";

export type LeadInput = {
  name: string;
  email: string;
  phone: string | null;
  interest: string;
  message: string | null;
};

/** Inserts a lead. Visitors can insert but never read leads (RLS). */
export async function submitLead(lead: LeadInput): Promise<{ ok: boolean }> {
  if (!supabase) return { ok: false };

  const { error } = await supabase.from("leads").insert({
    site: SITE_KEY,
    name: lead.name.slice(0, 200),
    email: lead.email.slice(0, 320),
    phone: lead.phone ? lead.phone.slice(0, 40) : null,
    interest: lead.interest.slice(0, 120),
    message: lead.message ? lead.message.slice(0, 4000) : null,
    source_url: window.location.href.slice(0, 500),
  });

  if (error) {
    console.error("Lead insert failed", error.message);
    return { ok: false };
  }
  return { ok: true };
}

export function clean(value: FormDataEntryValue | null, max: number) {
  const s = typeof value === "string" ? value.trim() : "";
  return s.slice(0, max);
}

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
