import fs from "node:fs";
import path from "node:path";

// News & Updates posts are Markdown files in src/content/posts.
// Add a file, push to main, and the site rebuilds with the new post.
//
// Each file starts with a front matter block:
//
// ---
// title: Post title
// excerpt: One or two sentences for listings and search results.
// date: 2026-05-13
// author: Vulture Security Services
// draft: false
// ---

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  draft: boolean;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  let content = raw;

  if (match) {
    content = match[2];
    for (const line of match[1].split(/\r?\n/)) {
      const i = line.indexOf(":");
      if (i === -1) continue;
      const key = line.slice(0, i).trim();
      const value = line
        .slice(i + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      meta[key] = value;
    }
  }

  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    excerpt: meta.excerpt ?? "",
    date: meta.date ?? "",
    author: meta.author ?? "Vulture Security Services",
    draft: meta.draft === "true",
    content: content.trim(),
  };
}

/** Published posts, newest first. Drafts are left out of the build. */
export function getPublishedPosts(limit?: number): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return limit ? posts.slice(0, limit) : posts;
}

export function getPostBySlug(slug: string): Post | null {
  return getPublishedPosts().find((p) => p.slug === slug) ?? null;
}

export function formatPostDate(value: string) {
  if (!value) return "";
  // Dates are plain YYYY-MM-DD; parse at noon so time zones never shift the day.
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
