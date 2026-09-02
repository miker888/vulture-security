"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle", message: "" };

const fieldClass =
  "w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-crimson";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-crimson px-9 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-crimson/40 bg-surface-2 p-8 text-center"
      >
        <p className="font-display text-lg font-semibold text-white">
          Thanks for submitting!
        </p>
        <p className="mt-2 text-sm text-mist">
          We have your details and will be in touch shortly. For anything
          urgent, call us directly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium text-mist">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            className={fieldClass}
            aria-invalid={Boolean(state.fieldErrors?.firstName)}
          />
          {state.fieldErrors?.firstName && (
            <p className="mt-1 text-xs text-crimson">{state.fieldErrors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-xs font-medium text-mist">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-mist">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-crimson">{state.fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-mist">
            Phone <span className="text-neutral-600">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-mist">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about the site, the hours you need covered, and when you want to start."
          className={`${fieldClass} resize-y`}
          aria-invalid={Boolean(state.fieldErrors?.message)}
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-crimson">{state.fieldErrors.message}</p>
        )}
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <p role="alert" className="text-sm text-crimson">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
