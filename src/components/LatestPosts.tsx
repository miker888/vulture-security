import Link from "next/link";
import { formatPostDate, getPublishedPosts } from "@/lib/posts";
import { SectionHeader } from "./ui";

export default function LatestPosts() {
  const posts = getPublishedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-paper py-[clamp(64px,8vw,112px)] text-graphite">
      <div className="wrap">
        <SectionHeader
          tone="light"
          eyebrow="From the field"
          title="News and updates."
          intro="Security insight, Calgary safety data and company news."
        />

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group flex h-full flex-col gap-3 rounded-[2px] border border-sand bg-white p-7 transition-colors hover:border-graphite"
              >
                <p className="text-sm font-semibold text-pebble">{formatPostDate(post.date)}</p>
                <h3 className="font-display text-2xl font-extrabold uppercase leading-[1.05] group-hover:text-brand-deep">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="line-clamp-3 text-base leading-relaxed text-slate">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/blog/"
          className="mt-8 inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-[1px] text-brand-deep hover:text-graphite"
        >
          All news and updates →
        </Link>
      </div>
    </section>
  );
}
