"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { savePost, type PostFormState } from "@/app/admin/actions";
import type { Post } from "@/lib/posts";

const field =
  "w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-crimson";
const label = "mb-1.5 block text-xs font-medium text-mist";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-crimson px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save post"}
    </button>
  );
}

export default function PostEditor({ post }: { post?: Post }) {
  const [state, formAction] = useActionState<PostFormState, FormData>(savePost, {
    error: null,
  });

  return (
    <form action={formAction} className="space-y-5">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div>
        <label htmlFor="title" className={label}>
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={post?.title ?? ""}
          required
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className={label}>
            URL slug <span className="text-neutral-600">(leave blank to auto-generate)</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={post?.slug ?? ""}
            placeholder="calgary-incident-rates-2026"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="author" className={label}>
            Author
          </label>
          <input
            id="author"
            name="author"
            defaultValue={post?.author ?? "Vulture Security Services"}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className={label}>
          Excerpt <span className="text-neutral-600">(shown on listings and in search results)</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className={`${field} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="cover_image" className={label}>
          Cover image URL
        </label>
        <input
          id="cover_image"
          name="cover_image"
          defaultValue={post?.cover_image ?? ""}
          placeholder="/images/posts/my-photo.jpg"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="content" className={label}>
          Body <span className="text-neutral-600">(Markdown: ## for headings, ** for bold, - for bullets)</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={22}
          defaultValue={post?.content ?? ""}
          className={`${field} resize-y font-mono text-[13px] leading-relaxed`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2.5 text-sm text-white">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? false}
            className="h-4 w-4 accent-crimson"
          />
          Published
        </label>
        {post?.published_at && (
          <input type="hidden" name="published_at" value={post.published_at} />
        )}
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-crimson">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <SaveButton />
        <Link href="/admin" className="text-sm text-mist hover:text-white">
          Cancel
        </Link>
      </div>
    </form>
  );
}
