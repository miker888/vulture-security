import Image from "next/image";
import { partners } from "@/lib/site";

export default function Partners() {
  if (partners.length === 0) return null;

  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <h2 className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
          Our Community Partners
        </h2>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {partners.map((p) => (
            <li key={p.name}>
              <Image
                src={p.logo}
                alt={p.name}
                width={220}
                height={80}
                className="h-10 w-auto opacity-70 transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
