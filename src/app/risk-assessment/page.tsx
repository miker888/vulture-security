import type { Metadata } from "next";
import AssessmentForm from "@/components/AssessmentForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { Eyebrow } from "@/components/ui";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Risk Assessment",
  description:
    "Tell us about your Calgary property or event. We'll walk the site with you and recommend security coverage that fits your budget. No cost, no obligation.",
};

const steps = [
  { title: "Tell us about your site", body: "Three short steps, about two minutes." },
  { title: "We walk the site with you", body: "At a time that works for you." },
  { title: "Get a coverage plan and quote", body: "Clear recommendations and pricing, with no obligation." },
];

export default function RiskAssessmentPage() {
  const showNews = getPublishedPosts().length > 0;

  return (
    <>
      <Header showNews={showNews} />
      <main className="bg-paper text-graphite">
        <div className="wrap flex flex-wrap items-start gap-14 py-[clamp(40px,5vw,72px)]">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-7">
            <Eyebrow tone="light">Free risk assessment</Eyebrow>
            <h1 className="font-display text-[clamp(40px,3.4vw,50px)] font-extrabold uppercase leading-[0.92] tracking-[0.3px]">
              Book your free{" "}
              <span className="block text-brand-head-light">risk assessment.</span>
            </h1>
            <p className="max-w-[520px] text-lg leading-relaxed text-slate">
              Tell us a little about your site. We&apos;ll follow up to book a
              walk-through, talk through your concerns and recommend the
              coverage that fits.
            </p>

            <ol className="border-t border-[#d9d4cc]">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-[18px] border-b border-[#d9d4cc] py-[18px]">
                  <span className="flex h-10 w-10 flex-none items-center justify-center border-2 border-brand font-display text-xl font-extrabold">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-[22px] font-extrabold uppercase leading-tight">{s.title}</span>
                    <span className="text-base text-slate">{s.body}</span>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href={site.contact.phoneHref}
              className="flex items-center gap-4 rounded-[2px] border border-sand bg-white px-5 py-[18px] hover:border-graphite"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[2px] bg-brand text-white">
                <Icon name="phone" size={20} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm text-slate">Prefer to talk?</span>
                <span className="font-display text-[22px] font-bold tracking-[0.5px]">Call {site.contact.phone}</span>
              </span>
            </a>
          </div>

          <section
            aria-label="Risk assessment request form"
            className="min-w-0 flex-[1_1_520px] rounded-[2px] border border-sand bg-white p-[clamp(24px,3vw,40px)]"
          >
            <AssessmentForm />
          </section>
        </div>
      </main>
      <Footer showNews={showNews} />
    </>
  );
}
