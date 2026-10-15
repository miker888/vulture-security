import Image from "next/image";
import concierge from "@/assets/represent-concierge.jpg";
import { represent } from "@/lib/site";
import Icon from "./Icon";
import { Eyebrow, h2Class } from "./ui";

export default function About() {
  return (
    <section id="about" className="bg-white py-[clamp(64px,8vw,120px)] text-graphite">
      <div className="wrap flex flex-wrap items-center gap-16">
        <div className="relative isolate min-w-0 flex-[1_1_420px] pb-5 pl-5">
          <div aria-hidden="true" className="absolute bottom-0 left-0 -z-10 h-[45%] w-[45%] bg-brand" />
          <div className="relative h-[580px] overflow-hidden rounded-[2px]">
            <Image
              src={concierge}
              alt="Vulture security officer at a concierge desk helping a visitor"
              fill
              placeholder="blur"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
          <Eyebrow tone="light">How we show up</Eyebrow>
          <h2 className={h2Class}>
            More than security.{" "}
            <span className="block text-brand-head-light">We represent your business.</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate">
            Our officers are often the first and last person your tenants, staff
            and guests meet. We train them to protect your property and to treat
            every person with respect, so every interaction reflects your
            standards.
          </p>
          <ul className="border-t border-sand">
            {represent.map((item) => (
              <li key={item.title} className="flex items-start gap-[18px] border-b border-sand py-5">
                <span className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full border-2 border-brand text-brand-deep">
                  <Icon name={item.icon} size={24} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-2xl font-extrabold uppercase leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
