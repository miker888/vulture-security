"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { assessmentOptions as opts, site } from "@/lib/site";
import { clean, EMAIL_RE, submitLead, supabase } from "@/lib/supabase";
import { fieldClass, labelClass } from "./ContactForm";
import Icon from "./Icon";

const STEPS = ["Your site", "Coverage", "Contact"] as const;

const chipClass =
  "group inline-flex min-h-11 cursor-pointer select-none items-center gap-2 rounded-[2px] border border-sand-strong bg-white px-4 text-[15px] font-semibold text-graphite transition-colors hover:border-graphite has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-graphite";

function Chips({
  name,
  options,
  type,
  legend,
  defaultValue,
}: {
  name: string;
  options: readonly string[];
  type: "radio" | "checkbox";
  legend: string;
  defaultValue?: string;
}) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3.5 p-0 text-[17px] font-semibold text-graphite">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => (
          <label key={option} className={chipClass}>
            <input
              type={type}
              name={name}
              value={option}
              defaultChecked={option === defaultValue}
              className="sr-only"
            />
            <Icon name="check" size={16} strokeWidth={2.5} className="hidden group-has-[:checked]:inline-block" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepButtons({
  onBack,
  next,
  sending,
}: {
  onBack?: () => void;
  next: { label: string; type: "button" | "submit"; onClick?: () => void };
  sending?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-3 border-t border-sand pt-6 ${onBack ? "justify-between" : "justify-end"}`}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="min-h-[52px] rounded-[2px] border border-sand-strong px-6 font-display text-[19px] font-bold uppercase tracking-[1px] text-graphite hover:border-graphite"
        >
          Back
        </button>
      )}
      <button
        type={next.type}
        onClick={next.onClick}
        disabled={sending}
        className="inline-flex min-h-[52px] items-center gap-2.5 rounded-[2px] bg-brand px-6 font-display text-[19px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : next.label}
        {!sending && <Icon name="arrowRight" size={18} />}
      </button>
    </div>
  );
}

export default function AssessmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const moved = useRef(false);

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [step, done]);

  function values() {
    return new FormData(formRef.current ?? undefined);
  }

  function check(target: number): string | null {
    const d = values();
    if (target >= 1) {
      if (!d.get("property_type")) return "Choose the kind of property.";
      if (d.getAll("services").length === 0) return "Choose at least one service, or Not sure yet.";
    }
    if (target >= 2) {
      if (!d.get("coverage_hours")) return "Choose when you need coverage.";
      if (!d.get("start_timeline")) return "Choose when you'd like to start.";
    }
    return null;
  }

  function go(target: number) {
    const problem = target > step ? check(target) : null;
    setError(problem);
    if (problem) return;
    moved.current = true;
    setStep(target);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = values();

    // Honeypot: real visitors never see or fill this field.
    if (clean(d.get("website"), 200)) {
      moved.current = true;
      setDone(true);
      return;
    }

    const earlier = check(2);
    if (earlier) {
      setError(earlier);
      return;
    }

    const first = clean(d.get("first_name"), 100);
    const last = clean(d.get("last_name"), 100);
    const email = clean(d.get("email"), 320);
    const phone = clean(d.get("phone"), 40);
    const contactBy = clean(d.get("contact_method"), 20) || "Phone";

    if (!first) return setError("Enter your first name.");
    if (!EMAIL_RE.test(email)) return setError("Enter a valid email address.");
    if (contactBy === "Phone" && !phone) return setError("Enter a phone number, or choose email as the best way to reach you.");

    if (!supabase) {
      setError(`The form isn't connected yet. Please call ${site.contact.phone} or email ${site.contact.email}.`);
      return;
    }

    const lines = [
      `Property: ${clean(d.get("property_type"), 80)}`,
      `Services: ${d.getAll("services").map((v) => String(v)).join(", ")}`,
      `Coverage: ${clean(d.get("coverage_hours"), 40)}`,
      `Start: ${clean(d.get("start_timeline"), 40)}`,
      `Site address: ${clean(d.get("site_address"), 300) || "not given"}`,
      `Company: ${clean(d.get("company"), 200) || "not given"}`,
      `Best way to reach: ${contactBy}`,
    ];
    const notes = clean(d.get("notes"), 2500);
    if (notes) lines.push("", "Notes:", notes);

    setSending(true);
    setError(null);
    const { ok } = await submitLead({
      name: `${first} ${last}`.trim(),
      email,
      phone: phone || null,
      interest: "Free risk assessment",
      message: lines.join("\n"),
    });
    setSending(false);

    if (!ok) {
      setError(`Something went wrong sending your request. Please try again, or call ${site.contact.phone}.`);
      return;
    }
    moved.current = true;
    setDone(true);
  }

  function restart() {
    formRef.current?.reset();
    setError(null);
    setDone(false);
    moved.current = true;
    setStep(0);
  }

  if (done) {
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-6">
        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand text-white">
          <Icon name="check" size={34} strokeWidth={2.5} />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="font-display text-[44px] font-extrabold uppercase leading-none outline-none">
          Request received.
        </h2>
        <p className="max-w-[460px] text-lg leading-relaxed text-slate">
          Thanks. Our team will reach out to book your walk-through. If it&apos;s
          urgent, call us at {site.contact.phone}.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[52px] items-center rounded-[2px] bg-brand px-6 font-display text-[19px] font-bold uppercase tracking-[1px] text-white hover:bg-brand-deep"
          >
            Back to home
          </Link>
          <button
            type="button"
            onClick={restart}
            className="min-h-[52px] rounded-[2px] border border-sand-strong px-6 font-display text-[19px] font-bold uppercase tracking-[1px] text-graphite hover:border-graphite"
          >
            Start a new request
          </button>
        </div>
      </div>
    );
  }

  const headingClass = "font-display text-[34px] font-extrabold uppercase leading-none outline-none";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onChange={() => error && setError(null)}
      noValidate
      className="flex flex-col gap-7"
    >
      {/* Progress */}
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-base font-bold uppercase tracking-[2px] text-brand-deep">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-sm font-semibold text-slate">{STEPS[step]}</span>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {STEPS.map((s, i) => (
            <div key={s} className={`h-1 flex-1 ${i <= step ? "bg-brand" : "bg-sand"}`} />
          ))}
        </div>
      </div>

      {/* Step 1 */}
      <div hidden={step !== 0} className={step === 0 ? "flex flex-col gap-7" : "hidden"}>
        <h2 ref={step === 0 ? headingRef : undefined} tabIndex={-1} className={headingClass}>
          Tell us about your site
        </h2>
        <Chips name="property_type" type="radio" legend="What kind of property is it?" options={opts.propertyTypes} />
        <Chips name="services" type="checkbox" legend="What do you need? Choose all that apply." options={opts.services} />
      </div>

      {/* Step 2 */}
      <div hidden={step !== 1} className={step === 1 ? "flex flex-col gap-7" : "hidden"}>
        <h2 ref={step === 1 ? headingRef : undefined} tabIndex={-1} className={headingClass}>
          Coverage details
        </h2>
        <Chips name="coverage_hours" type="radio" legend="When do you need coverage?" options={opts.coverageHours} />
        <Chips name="start_timeline" type="radio" legend="When would you like to start?" options={opts.startTimeline} />
        <label className={labelClass}>
          Site address
          <input name="site_address" autoComplete="street-address" placeholder="Street address, Calgary" maxLength={300} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Anything we should know?
          <textarea
            name="notes"
            rows={4}
            maxLength={2500}
            placeholder="Recent incidents, problem areas, number of entrances"
            className={`${fieldClass} resize-y`}
          />
        </label>
      </div>

      {/* Step 3 */}
      <div hidden={step !== 2} className={step === 2 ? "flex flex-col gap-7" : "hidden"}>
        <h2 ref={step === 2 ? headingRef : undefined} tabIndex={-1} className={headingClass}>
          Your contact details
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
          <label className={labelClass}>
            First name
            <input name="first_name" autoComplete="given-name" maxLength={100} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Last name
            <input name="last_name" autoComplete="family-name" maxLength={100} className={fieldClass} />
          </label>
          <label className={`${labelClass} col-span-full`}>
            Company or organization
            <input name="company" autoComplete="organization" maxLength={200} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Email
            <input name="email" type="email" autoComplete="email" maxLength={320} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Phone
            <input name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldClass} />
          </label>
        </div>
        <Chips
          name="contact_method"
          type="radio"
          legend="Best way to reach you?"
          options={opts.contactMethods}
          defaultValue="Phone"
        />
        <p className="text-sm leading-relaxed text-pebble">
          We only use these details to follow up on this request.
        </p>
      </div>

      {/* Honeypot */}
      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {error && (
        <p role="alert" className="text-[15px] font-semibold text-brand-deep">
          {error}
        </p>
      )}

      {step === 0 && <StepButtons next={{ label: "Next: Coverage", type: "button", onClick: () => go(1) }} />}
      {step === 1 && (
        <StepButtons onBack={() => go(0)} next={{ label: "Next: Contact", type: "button", onClick: () => go(2) }} />
      )}
      {step === 2 && (
        <StepButtons onBack={() => go(1)} next={{ label: "Request my assessment", type: "submit" }} sending={sending} />
      )}
    </form>
  );
}
