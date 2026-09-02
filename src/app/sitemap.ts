import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/blog`, lastModified: new Date(), priority: 0.8 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      priority: 0.6,
    })),
  ];
}
