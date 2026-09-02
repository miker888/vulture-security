import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { formatPostDate, getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt ?? site.description,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? site.description,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content ?? "");

  return (
    <>
      <Header />
      <main className="bg-ink">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:text-white"
          >
            &larr; News &amp; Updates
          </Link>

          <h1 className="mt-6 font-display text-3xl font-bold leading-[1.18] tracking-[-0.02em] text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xs text-neutral-500">
            {formatPostDate(post.published_at)}
            {post.author ? ` · ${post.author}` : ""}
          </p>

          {post.cover_image && (
            <div className="relative mt-10 aspect-16/9 w-full overflow-hidden rounded-2xl bg-surface">
              <Image
                src={post.cover_image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="prose-vulture mt-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-16 rounded-2xl border border-line bg-surface p-8">
            <h2 className="font-display text-xl font-semibold text-white">
              Need coverage in Calgary?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Tell us about the site and we will come back with a plan and a rate.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex rounded-full bg-crimson px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
            >
              Get in touch
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
