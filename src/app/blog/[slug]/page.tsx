import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ButtonLink } from "@/components/ui";
import { formatPostDate, getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

// Static export: every published post becomes its own HTML page at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPublishedPosts();
  // A static export needs at least one path; this placeholder renders a 404
  // until the first post is published.
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "coming-soon" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  return {
    title: post.title,
    description: post.excerpt || site.description,
    openGraph: {
      title: post.title,
      description: post.excerpt || site.description,
      type: "article",
      publishedTime: post.date || undefined,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content);

  return (
    <>
      <Header showNews />
      <main className="bg-paper text-graphite">
        <article className="wrap max-w-[820px] py-[clamp(48px,6vw,96px)]">
          <Link
            href="/blog/"
            className="font-display text-base font-bold uppercase tracking-[2px] text-brand-deep hover:text-graphite"
          >
            ← News and updates
          </Link>

          <h1 className="mt-6 font-display text-[clamp(40px,4.4vw,60px)] font-extrabold uppercase leading-[0.98]">
            {post.title}
          </h1>
          <p className="mt-4 text-sm font-semibold text-pebble">
            {formatPostDate(post.date)} · {post.author}
          </p>

          <div className="prose-vulture mt-10" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="mt-16 flex flex-col items-start gap-4 rounded-[2px] border border-sand bg-white p-8">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-none">
              Need coverage in Calgary?
            </h2>
            <p className="text-base leading-relaxed text-slate">
              Tell us about your site and we&apos;ll recommend coverage that fits.
            </p>
            <ButtonLink href="/risk-assessment/" icon="calendar">
              Book a free risk assessment
            </ButtonLink>
          </div>
        </article>
      </main>
      <Footer showNews />
    </>
  );
}
