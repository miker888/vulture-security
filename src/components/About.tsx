import Image from "next/image";
import { about } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="bg-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-crimson">
            Who we are
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-mist">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Learn More
          </a>
        </div>

        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-surface md:aspect-3/4">
          <Image
            src={about.image}
            alt="Vulture Security Services officer on radio during a patrol"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
