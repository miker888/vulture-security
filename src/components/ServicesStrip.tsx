import { Fragment } from "react";
import { services } from "@/lib/site";

export default function ServicesStrip() {
  return (
    <div className="bg-brand">
      <ul className="wrap flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-[18px] sm:gap-x-4 font-display text-lg font-bold uppercase tracking-[1.5px] text-white">
        {services.map((s, i) => (
          <Fragment key={s.title}>
            {i > 0 && (
              <li aria-hidden="true" className="hidden h-1.5 w-1.5 rotate-45 bg-ink sm:block" />
            )}
            <li>{s.title}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
