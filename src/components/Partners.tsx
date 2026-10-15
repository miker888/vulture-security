import Image from "next/image";
import { partners } from "@/lib/site";

export default function Partners() {
  if (partners.length === 0) return null;

  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-sand bg-white py-14 text-graphite"
    >
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
        <h2
          id="partners-heading"
          className="font-display text-base font-bold uppercase tracking-[3px] text-slate"
        >
          Our community partners
        </h2>
        <ul className="flex flex-wrap items-center gap-4">
          {partners.map((p) => (
            <li
              key={p.name}
              className="flex h-[72px] items-center justify-center rounded-[2px] border border-sand px-7"
            >
              <Image src={p.logo} alt={p.name} className="h-8 w-auto" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
