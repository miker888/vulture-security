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

        {/* Partner marks sit on white plates rather than being recoloured.
            Minto's is navy, which would disappear against this ground, and a
            partner's logo is theirs to specify, not ours to restyle. */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {partners.map((p) => (
            <li
              key={p.name}
              className="flex h-20 items-center justify-center rounded-xl bg-white px-8 shadow-sm"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={344}
                height={120}
                className="h-8 w-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
