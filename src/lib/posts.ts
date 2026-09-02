import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * Published posts, newest first. Returns an empty list when Supabase is not
 * yet configured so the site still builds and renders.
 */
export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  if (!supabaseConfigured()) return [];

  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("Failed to load posts", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to load post", error.message);
    return null;
  }
  return (data as Post) ?? null;
}

export function formatPostDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
