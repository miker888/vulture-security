import Image from "next/image";
import heroGuard from "@/assets/hero-guard.jpg";
import { site } from "@/lib/site";
import Icon from "./Icon";
import { ButtonLink, Eyebrow } from "./ui";

const trust = [
  { label: "Alberta licensed", icon: "shield" },
  { label: "Hands-off, de-escalation first", icon: "chat" },
  { label: "Clear incident reporting", icon: "file" },
] as const;

export default function Hero() {
  return (
    <section id="top" className="bg-ink">
      <div className="wrap flex flex-wrap items-stretch gap-10 py-[clamp(40px,6vw,88px)]">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col justify-center gap-7">
          <Eyebrow>Calgary security officers, day and night</Eyebrow>

          <h1 className="font-display text-[clamp(42px,5vw,76px)] font-extrabold uppercase leading-[0.92] tracking-[0.3px]">
            Professional security{" "}
            <span className="block text-brand-head">you can rely on.</span>
          </h1>

          <p className="max-w-[560px] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-[#c4c4c9]">
            Licensed security officers, mobile patrol and loss prevention for
            Calgary businesses, properties and events. A calm, visible presence
            that protects your people and represents your brand.
          </p>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/risk-assessment/" icon="calendar">
              Book your free risk assessment
            </ButtonLink>
            <ButtonLink href={site.contact.phoneHref} icon="phone" variant="outlineDark">
              {site.contact.phone}
            </ButtonLink>
          </div>

          <ul className="mt-1 flex flex-wrap gap-x-8 gap-y-3.5 border-t border-[#232327] pt-6 text-[15px] font-semibold text-[#e7e7e9]">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2.5">
                <Icon name={t.icon} size={22} className="text-brand-hot" />
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[540px] w-full min-w-0 flex-[0_1_420px]">
          <div aria-hidden="true" className="clip-hero-slab absolute inset-0 bg-brand" />
          <div className="clip-hero-photo absolute inset-0">
            <Image
              src={heroGuard}
              alt="Vulture security officer in uniform standing post outside a commercial building entrance"
              fill
              priority
              placeholder="blur"
              className="object-cover object-[center_25%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
