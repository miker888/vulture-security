import { standards } from "@/lib/site";
import Icon from "./Icon";
import { SectionHeader } from "./ui";

export default function Standard() {
  return (
    <section id="standard" className="bg-paper py-[clamp(64px,8vw,120px)] text-graphite">
      <div className="wrap">
        <SectionHeader
          tone="light"
          eyebrow="Our standard"
          title="Observe. Deter. Report."
          intro="Every Vulture officer works to the same written handbook and standard operating procedures, on every shift and at every site."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {standards.map((item, i) => (
            <article
              key={item.title}
              className="flex flex-col gap-4 rounded-[2px] border border-sand bg-white p-8"
            >
              <div className="flex items-center justify-between">
                <Icon name={item.icon} size={32} strokeWidth={1.8} className="text-brand-deep" />
                <span className="font-display text-lg font-bold text-pebble">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-[26px] font-extrabold uppercase leading-none">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-slate">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#d9d4cc] pt-10">
          <span aria-hidden="true" className="h-1 w-14 flex-none bg-brand" />
          <p className="min-w-0 flex-[1_1_520px] font-display text-[clamp(26px,2.6vw,36px)] font-bold uppercase leading-[1.15]">
            Our officers are not enforcers first. They are ambassadors of safety
            and order.
          </p>
        </div>
      </div>
    </section>
  );
}
