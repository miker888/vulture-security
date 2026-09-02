import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} {site.legalName}. Licensed security
          services, Calgary, Alberta.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs text-neutral-500 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
