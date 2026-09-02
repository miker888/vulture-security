import Link from "next/link";
import { notFound } from "next/navigation";
import PostEditor from "@/components/PostEditor";
import type { Post } from "@/lib/posts";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let post: Post | undefined;

  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (!data) notFound();
    post = data as Post;
  }

  return (
    <main className="min-h-screen bg-ink">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Link
          href="/admin"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson hover:text-white"
        >
          &larr; Admin
        </Link>
        <h1 className="mt-5 mb-9 font-display text-2xl font-bold text-white">
          {isNew ? "New post" : "Edit post"}
        </h1>
        <PostEditor post={post} />
      </div>
    </main>
  );
}
