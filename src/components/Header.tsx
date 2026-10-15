"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logoShield from "@/assets/logo-shield.png";
import { navItems, site } from "@/lib/site";
import Icon from "./Icon";

export function Logo({ size = 54 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <Image src={logoShield} alt="" priority style={{ height: size, width: "auto" }} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[28px] font-extrabold tracking-[2px] text-[#f5f5f4]">
          VULTURE
        </span>
        <span className="mt-1 text-[11px] font-semibold tracking-[3px] text-brand-hot">
          SECURITY SERVICES
        </span>
      </span>
    </span>
  );
}

export default function Header({ showNews = false }: { showNews?: boolean }) {
  const [open, setOpen] = useState(false);
  const nav = navItems(showNews);

  return (
    <>
      {/* Utility bar */}
      <div className="border-b border-[#1f1f22] bg-black">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-2.5 text-sm text-smoke">
          <span className="inline-flex items-center gap-2">
            <Icon name="shield" size={16} className="text-brand-hot" />
            Alberta-licensed security agency · Calgary, AB
          </span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
            <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 text-[#e7e7e9] hover:text-white">
              <Icon name="phone" size={15} />
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 text-[#e7e7e9] hover:text-white">
              <Icon name="mail" size={15} />
              {site.contact.email}
            </a>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#1f1f22] bg-ink/95 backdrop-blur">
        <div className="wrap flex items-center justify-between gap-6 py-3.5">
          <Link href="/" aria-label={`${site.name} home`} className="flex-none">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 text-[15px] font-medium lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[#e7e7e9] transition-colors hover:text-brand-hot ${
                  item.label === "News" ? "hidden xl:inline" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-none items-center gap-5">
            <a
              href={site.contact.phoneHref}
              className="hidden font-display text-xl font-bold tracking-[0.5px] text-[#f5f5f4] hover:text-brand-hot xl:inline"
            >
              {site.contact.phone}
            </a>
            <Link
              href="/risk-assessment/"
              className="hidden min-h-12 items-center rounded-[2px] bg-brand px-5 font-display text-lg font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-deep sm:inline-flex"
            >
              Free Risk Assessment
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-line-strong bg-surface-2 text-[#f5f5f4] lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t border-[#1f1f22] bg-ink lg:hidden">
            <ul className="wrap flex flex-col py-2">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 font-display text-xl font-bold uppercase tracking-[1px] text-[#f5f5f4]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="wrap flex flex-col gap-3 pb-6">
              <Link
                href="/risk-assessment/"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-14 items-center justify-center rounded-[2px] bg-brand font-display text-xl font-bold uppercase tracking-[1px] text-white"
              >
                Book a free risk assessment
              </Link>
              <a
                href={site.contact.phoneHref}
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[2px] border border-[#3a3a3f] font-display text-xl font-bold tracking-[1px] text-[#f5f5f4]"
              >
                <Icon name="phone" size={18} />
                {site.contact.phone}
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
