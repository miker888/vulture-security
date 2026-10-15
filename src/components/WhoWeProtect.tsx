import Image from "next/image";
import { protectPhotos, sectors } from "@/lib/site";
import Icon from "./Icon";
import { SectionHeader } from "./ui";

export default function WhoWeProtect() {
  return (
    <section id="industries" className="bg-surface py-[clamp(64px,8vw,120px)]">
      <div className="wrap">
        <SectionHeader
          eyebrow="Who we protect"
          title="On post across Calgary."
          intro="Offices, retail floors, residential towers, construction sites and events. Our officers adjust how they work to fit each environment."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {protectPhotos.map((photo) => (
            <figure
              key={photo.title}
              className="relative m-0 h-[440px] overflow-hidden rounded-[2px] bg-[#1b1b1e]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 to-transparent"
              />
              <figcaption className="absolute inset-x-6 bottom-5 flex flex-col gap-1">
                <span className="font-display text-[28px] font-extrabold uppercase leading-none text-white">
                  {photo.title}
                </span>
                <span className="text-[15px] text-[#dadadd]">{photo.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 border-t border-[#2a2a2e]">
          {sectors.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-3.5 border-b border-[#2a2a2e] py-5 font-display text-xl font-bold uppercase tracking-[1px]"
            >
              <Icon name={s.icon} size={24} className="flex-none text-brand-hot" />
              {s.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
