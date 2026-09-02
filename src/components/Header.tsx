"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/#top" className="flex items-center" aria-label={site.name}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={420}
            height={110}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium tracking-[0.06em] text-neutral-800 transition-colors hover:text-crimson"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.contact.phoneHref}
            className="rounded-full bg-crimson px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-crimson-dark"
          >
            {site.contact.phone}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-900 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-white px-5 pb-5 md:hidden">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-black/5 py-3.5 text-sm font-medium text-neutral-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.contact.phoneHref}
            className="mt-4 block rounded-full bg-crimson px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Call {site.contact.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
