import Image from "next/image";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-crimson">
            What we do
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
            Services
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-mist">
            Discover our range of security solutions tailored to meet your needs.
            From mobile patrols to event security, we provide top-notch services
            to ensure the safety and security of your premises.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-line bg-surface-2 transition-colors hover:border-crimson/60"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">
                  {s.blurb}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
