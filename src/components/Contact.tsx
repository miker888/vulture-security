import { site } from "@/lib/site";
import ContactForm from "./ContactForm";
import Icon, { type IconName } from "./Icon";
import { Eyebrow, h2Class } from "./ui";

function Detail({
  icon,
  label,
  children,
}: {
  icon: IconName;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[2px] border border-sand bg-white text-brand-deep">
        <Icon name={icon} size={22} />
      </span>
      <div className="flex flex-col">
        <span className="text-[13px] font-semibold uppercase tracking-[1.5px] text-pebble">{label}</span>
        <span className="text-[17px] text-graphite">{children}</span>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-paper py-[clamp(64px,8vw,120px)] text-graphite">
      <div className="wrap flex flex-wrap items-start gap-16">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
          <Eyebrow tone="light">Contact</Eyebrow>
          <h2 className={h2Class}>Get in touch.</h2>
          <p className="text-lg leading-relaxed text-slate">
            Questions about coverage, pricing or an existing site? Send us a note
            or give us a call.
          </p>
          <div className="mt-2 flex flex-col gap-5">
            <Detail icon="mapPin" label="Office">
              {site.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Detail>
            <Detail icon="phone" label="Phone">
              <a href={site.contact.phoneHref} className="hover:text-brand-deep">
                {site.contact.phoneLong}
              </a>
            </Detail>
            <Detail icon="mail" label="Email">
              <a href={`mailto:${site.contact.email}`} className="hover:text-brand-deep">
                {site.contact.email}
              </a>
            </Detail>
          </div>
        </div>

        <div className="min-w-0 flex-[1_1_520px] rounded-[2px] border border-sand bg-white p-[clamp(24px,3vw,40px)]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
