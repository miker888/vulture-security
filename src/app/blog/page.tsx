import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { formatPostDate, getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Security insight, Calgary crime data and company updates from Vulture Security Services.",
};

export const revalidate = 300;

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Header />
      <main className="bg-ink">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 md:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-crimson">
            From the field
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
            News &amp; Updates
          </h1>

          {posts.length === 0 ? (
            <p className="mt-10 text-[15px] text-mist">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <ul className="mt-14 divide-y divide-line border-t border-line">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-6 py-10 sm:grid-cols-[220px_1fr]"
                  >
                    {post.cover_image ? (
                      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-surface">
                        <Image
                          src={post.cover_image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 220px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="hidden sm:block" />
                    )}
                    <div>
                      <p className="text-xs text-neutral-500">
                        {formatPostDate(post.published_at)}
                        {post.author ? ` · ${post.author}` : ""}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-white transition-colors group-hover:text-gold">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 text-sm leading-relaxed text-mist">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
