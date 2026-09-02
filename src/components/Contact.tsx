import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-20 md:py-28">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-crimson">
            {site.legalName}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
            Tell us what you need covered and we will come back with a plan and
            a rate. Same-day response on weekdays.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Office
              </dt>
              <dd className="mt-1.5 text-white">
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Phone
              </dt>
              <dd className="mt-1.5">
                <a
                  href={site.contact.phoneHref}
                  className="text-white transition-colors hover:text-gold"
                >
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Email
              </dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-white transition-colors hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-ink p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
