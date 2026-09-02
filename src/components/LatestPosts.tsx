import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getPublishedPosts } from "@/lib/posts";

export default async function LatestPosts() {
  const posts = await getPublishedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-crimson">
              From the field
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              News &amp; Updates
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-white underline underline-offset-4 transition-colors hover:text-gold"
          >
            All posts
          </Link>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.cover_image && (
                  <div className="relative mb-5 aspect-16/10 w-full overflow-hidden rounded-xl bg-surface">
                    <Image
                      src={post.cover_image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <p className="text-xs text-neutral-500">
                  {formatPostDate(post.published_at)}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
