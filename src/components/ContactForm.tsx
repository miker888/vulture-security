"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { clean, EMAIL_RE, submitLead, supabase } from "@/lib/supabase";
import Icon from "./Icon";

type Status = "idle" | "sending" | "sent" | "error";

export const fieldClass =
  "min-h-[52px] w-full rounded-[2px] border border-sand-strong bg-white px-4 py-3 text-base text-graphite outline-none transition-colors placeholder:text-pebble focus:border-brand aria-[invalid=true]:border-brand";
export const labelClass = "flex flex-col gap-2 text-sm font-semibold text-[#2a2a2e]";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field.
    if (clean(data.get("website"), 200)) {
      setStatus("sent");
      return;
    }

    const first = clean(data.get("first_name"), 100);
    const last = clean(data.get("last_name"), 100);
    const email = clean(data.get("email"), 320);
    const phone = clean(data.get("phone"), 40);
    const message = clean(data.get("message"), 4000);

    const bad = {
      first_name: !first,
      email: !EMAIL_RE.test(email),
      message: !message,
    };
    setInvalid(bad);
    if (Object.values(bad).some(Boolean)) {
      setError("Please fill in your first name, a valid email and a message.");
      return;
    }

    if (!supabase) {
      setStatus("error");
      setError(`The form isn't connected yet. Please call ${site.contact.phone} or email ${site.contact.email}.`);
      return;
    }

    setStatus("sending");
    setError(null);
    const { ok } = await submitLead({
      name: `${first} ${last}`.trim(),
      email,
      phone: phone || null,
      interest: "General enquiry",
      message,
    });

    if (!ok) {
      setStatus("error");
      setError(`Something went wrong sending your message. Please try again, or call ${site.contact.phone}.`);
      return;
    }

    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <Icon name="check" size={28} strokeWidth={2.5} />
        </span>
        <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-graphite">
          Message sent.
        </h3>
        <p className="text-base leading-relaxed text-slate">
          Thanks, we have your message and will get back to you. For anything
          urgent, call {site.contact.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-display text-lg font-bold uppercase tracking-[1px] text-brand-deep underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
      <label className={labelClass}>
        First name
        <input name="first_name" autoComplete="given-name" maxLength={100} aria-invalid={invalid.first_name || undefined} className={fieldClass} />
      </label>
      <label className={labelClass}>
        Last name
        <input name="last_name" autoComplete="family-name" maxLength={100} className={fieldClass} />
      </label>
      <label className={labelClass}>
        Email
        <input name="email" type="email" autoComplete="email" maxLength={320} aria-invalid={invalid.email || undefined} className={fieldClass} />
      </label>
      <label className={labelClass}>
        Phone <span className="sr-only">(optional)</span>
        <input name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldClass} />
      </label>
      <label className={`${labelClass} col-span-full`}>
        How can we help?
        <textarea
          name="message"
          rows={5}
          maxLength={4000}
          aria-invalid={invalid.message || undefined}
          className={`${fieldClass} resize-y`}
        />
      </label>
      {/* Honeypot */}
      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="col-span-full min-h-14 rounded-[2px] bg-brand font-display text-xl font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {error && (
        <p role="alert" className="col-span-full text-sm font-semibold text-brand-deep">
          {error}
        </p>
      )}
    </form>
  );
}
