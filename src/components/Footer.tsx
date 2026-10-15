import Link from "next/link";
import { services, site } from "@/lib/site";
import { Logo } from "./Header";

const headingClass =
  "mb-1.5 font-display text-base font-bold uppercase tracking-[2px] text-white";
const linkClass = "text-[15px] text-smoke transition-colors hover:text-white";

export default function Footer({ showNews = false }: { showNews?: boolean }) {
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="wrap">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
          <div className="flex flex-col gap-4">
            <Logo size={60} />
            <p className="text-[15px] leading-relaxed text-[#a3a3a9]">
              Protecting people, property and reputation across Calgary.
            </p>
          </div>

          <nav aria-label="Services" className="flex flex-col gap-2.5">
            <h2 className={headingClass}>Services</h2>
            {services.map((s) => (
              <Link key={s.title} href="/#services" className={linkClass}>
                {s.title}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company" className="flex flex-col gap-2.5">
            <h2 className={headingClass}>Company</h2>
            <Link href="/#about" className={linkClass}>About</Link>
            <Link href="/#standard" className={linkClass}>Our Standard</Link>
            <Link href="/#industries" className={linkClass}>Industries</Link>
            {showNews && (
              <Link href="/blog/" className={linkClass}>News and Updates</Link>
            )}
            <Link href="/risk-assessment/" className={linkClass}>Free Risk Assessment</Link>
          </nav>

          <div className="flex flex-col gap-2.5 text-[15px] text-smoke">
            <h2 className={headingClass}>Contact</h2>
            <span>
              {site.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <a href={site.contact.phoneHref} className={linkClass}>
              {site.contact.phoneLong}
            </a>
            <a href={`mailto:${site.contact.email}`} className={linkClass}>
              {site.contact.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-[#1f1f22] pt-6 text-[13px] text-mist">
          <span>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <span>Alberta security services licence {site.licence}</span>
        </div>
      </div>
    </footer>
  );
}
