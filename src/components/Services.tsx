import { services } from "@/lib/site";
import { SectionHeader } from "./ui";

export default function Services() {
  return (
    <section id="services" className="bg-white py-[clamp(64px,8vw,120px)] text-graphite">
      <div className="wrap">
        <SectionHeader
          tone="light"
          eyebrow="What we do"
          title="Security built around your site."
          intro="Every property is different. We start with how your site works, then match the right coverage to it: on site, on patrol, or both."
        />

        <ol className="border-t border-sand">
          {services.map((service, i) => (
            <li
              key={service.title}
              className="flex flex-wrap items-start gap-x-10 gap-y-3.5 border-b border-sand py-8"
            >
              <span className="flex-[0_0_56px] font-display text-[22px] font-bold leading-[1.3] text-brand-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="min-w-0 flex-[1_1_240px] font-display text-[clamp(28px,2.6vw,38px)] font-extrabold uppercase leading-none">
                {service.title}
              </h3>
              <div className="flex min-w-0 flex-[2_1_420px] flex-col gap-3.5">
                <p className="text-[17px] leading-relaxed text-slate">{service.blurb}</p>
                <ul className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-[2px] border border-[#d9d4cc] bg-[#f7f5f2] px-2.5 py-1.5 text-[13px] font-semibold text-[#2a2a2e]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
