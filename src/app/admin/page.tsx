import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPostDate, type Post } from "@/lib/posts";
import { deletePost, signOut } from "./actions";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

export default async function AdminHome() {
  const supabase = await createClient();

  const [{ data: posts }, { data: leads }] = await Promise.all([
    supabase.from("posts").select("*").order("created_at", { ascending: false }),
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(25),
  ]);

  return (
    <main className="min-h-screen bg-ink">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold text-white">
            Site admin
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts/new"
              className="rounded-full bg-crimson px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
            >
              New post
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-mist transition-colors hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist">
            Posts
          </h2>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
            {(posts as Post[] | null)?.length ? (
              (posts as Post[]).map((post) => (
                <li
                  key={post.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div>
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="font-medium text-white hover:text-gold"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {post.published
                        ? `Published ${formatPostDate(post.published_at)}`
                        : "Draft"}
                      {" · /blog/"}
                      {post.slug}
                    </p>
                  </div>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="text-xs font-medium text-neutral-500 transition-colors hover:text-crimson"
                    >
                      Delete
                    </button>
                  </form>
                </li>
              ))
            ) : (
              <li className="px-5 py-6 text-sm text-mist">No posts yet.</li>
            )}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist">
            Recent enquiries
          </h2>
          <ul className="mt-4 space-y-3">
            {(leads as Lead[] | null)?.length ? (
              (leads as Lead[]).map((lead) => (
                <li
                  key={lead.id}
                  className="rounded-xl border border-line bg-surface p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-white">
                      {lead.first_name} {lead.last_name ?? ""}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(lead.created_at).toLocaleString("en-CA")}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-mist">
                    <a href={`mailto:${lead.email}`} className="hover:text-gold">
                      {lead.email}
                    </a>
                    {lead.phone ? ` · ${lead.phone}` : ""}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-mist">
                    {lead.message}
                  </p>
                </li>
              ))
            ) : (
              <li className="rounded-xl border border-line px-5 py-6 text-sm text-mist">
                No enquiries yet.
              </li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
