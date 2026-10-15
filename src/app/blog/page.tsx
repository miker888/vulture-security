import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Eyebrow } from "@/components/ui";
import { formatPostDate, getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Security insight, Calgary safety data and company updates from Vulture Security Services.",
};

export default function BlogIndex() {
  const posts = getPublishedPosts();

  return (
    <>
      <Header showNews />
      <main className="bg-paper text-graphite">
        <div className="wrap max-w-[960px] py-[clamp(48px,6vw,96px)]">
          <Eyebrow tone="light">From the field</Eyebrow>
          <h1 className="mt-4 font-display text-[clamp(48px,5vw,76px)] font-extrabold uppercase leading-[0.92]">
            News and updates
          </h1>

          {posts.length === 0 ? (
            <p className="mt-10 text-lg text-slate">No posts published yet. Check back soon.</p>
          ) : (
            <ul className="mt-12 border-t border-[#d9d4cc]">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-[#d9d4cc]">
                  <Link href={`/blog/${post.slug}/`} className="group flex flex-col gap-2.5 py-9">
                    <span className="text-sm font-semibold text-pebble">
                      {formatPostDate(post.date)} · {post.author}
                    </span>
                    <span className="font-display text-[clamp(26px,2.6vw,34px)] font-extrabold uppercase leading-[1.05] group-hover:text-brand-deep">
                      {post.title}
                    </span>
                    {post.excerpt && (
                      <span className="max-w-[720px] text-base leading-relaxed text-slate">{post.excerpt}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer showNews />
    </>
  );
}
