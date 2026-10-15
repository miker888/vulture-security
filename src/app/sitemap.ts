import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  return [
    { url: `${siteUrl}/`, priority: 1 },
    { url: `${siteUrl}/risk-assessment/`, priority: 0.9 },
    ...(posts.length > 0 ? [{ url: `${siteUrl}/blog/`, priority: 0.7 }] : []),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}/`,
      lastModified: post.date || undefined,
      priority: 0.6,
    })),
  ];
}
