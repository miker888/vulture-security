import Link from "next/link";
import Icon, { type IconName } from "./Icon";

type Tone = "dark" | "light";

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-display text-base font-bold uppercase tracking-[3px] ${
        tone === "dark" ? "text-brand-hot" : "text-brand-deep"
      }`}
    >
      <span aria-hidden="true" className="block h-[3px] w-9 flex-none bg-brand" />
      {children}
    </p>
  );
}

export const h2Class =
  "font-display text-[clamp(40px,4.4vw,64px)] font-extrabold uppercase leading-[0.95] tracking-[0.3px]";

/** Eyebrow + big heading on the left, short intro on the right. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "dark",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  tone?: Tone;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-4">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2 className={h2Class}>{title}</h2>
      </div>
      {intro && (
        <p
          className={`min-w-0 flex-[0_1_440px] text-lg leading-relaxed ${
            tone === "dark" ? "text-smoke" : "text-slate"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

const buttonBase =
  "inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[2px] px-6 font-display text-xl font-bold uppercase tracking-[1px] no-underline transition-colors";

const buttonVariants = {
  primary: "bg-brand text-white hover:bg-brand-deep",
  dark: "bg-ink text-white hover:bg-black",
  outlineDark: "border border-[#3a3a3f] text-[#f5f5f4] hover:border-white",
  outlineLight: "border border-sand-strong text-graphite hover:border-graphite",
} as const;

export function ButtonLink({
  href,
  children,
  icon,
  iconAfter,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  icon?: IconName;
  iconAfter?: IconName;
  variant?: keyof typeof buttonVariants;
  className?: string;
}) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  const inner = (
    <>
      {icon && <Icon name={icon} size={20} />}
      {children}
      {iconAfter && <Icon name={iconAfter} size={20} />}
    </>
  );
  // tel:, mailto: and in-page anchors are plain links.
  if (/^(tel:|mailto:|#|https?:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

export function buttonClass(variant: keyof typeof buttonVariants = "primary") {
  return `${buttonBase} ${buttonVariants[variant]}`;
}
