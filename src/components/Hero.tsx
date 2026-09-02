import Image from "next/image";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/images/hero.jpg"
        alt="Vulture Security Services guards on post at a commercial entrance"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Legibility scrim: darker at the edges, lifted in the middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />

      {/* Fixed heights rather than vh: the hero photo is a wide 2.3:1 crop, and
          a tall viewport would scale it up and cut the guards off the edges. */}
      <div className="relative mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center sm:min-h-[620px] lg:min-h-[680px]">
        <Image
          src="/images/shield.png"
          alt=""
          width={320}
          height={380}
          priority
          className="mb-8 h-36 w-auto drop-shadow-2xl sm:h-44"
        />

        <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
          Watching for Threats.
          <br />
          Protecting Your Assets.
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
          {site.subline}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-crimson px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-crimson-dark"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
}
