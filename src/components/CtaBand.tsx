import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "./Icon";

export default function CtaBand() {
  return (
    <section className="bg-white py-[clamp(64px,8vw,112px)]">
      <div className="wrap">
        <div className="clip-ribbon flex flex-wrap items-center justify-between gap-8 bg-brand p-[clamp(32px,5vw,64px)]">
          <div className="flex min-w-0 flex-[1_1_560px] flex-wrap items-start gap-6">
            <span className="flex h-[76px] w-[76px] flex-none items-center justify-center rounded-[2px] bg-ink text-white">
              <Icon name="calendarDots" size={36} strokeWidth={1.8} />
            </span>
            <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3">
              <h2 className="font-display text-[clamp(36px,4vw,60px)] font-extrabold uppercase leading-[0.95] text-white">
                Book your free risk assessment
              </h2>
              <p className="max-w-[620px] text-lg leading-relaxed text-white">
                We&apos;ll walk your site, talk through your concerns and recommend
                coverage that fits your budget. No cost and no obligation.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3.5 pr-6">
            <Link
              href="/risk-assessment/"
              className="inline-flex min-h-14 items-center gap-2.5 rounded-[2px] bg-ink px-7 font-display text-xl font-bold uppercase tracking-[1px] text-white hover:bg-black"
            >
              Book my assessment
              <Icon name="arrowRight" size={20} />
            </Link>
            <a href={site.contact.phoneHref} className="text-[17px] font-semibold text-white underline underline-offset-4">
              or call {site.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
