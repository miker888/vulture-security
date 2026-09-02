"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export type PostFormState = { error: string | null };

export async function savePost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in." };

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const coverImage = String(formData.get("cover_image") ?? "").trim();
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") ?? "") || title);

  if (!title) return { error: "Title is required." };
  if (!slug) return { error: "Could not build a URL slug from that title." };

  const row = {
    title,
    slug,
    content,
    excerpt: excerpt || null,
    author: author || "Vulture Security Services",
    cover_image: coverImage || null,
    published,
    published_at: published
      ? (String(formData.get("published_at") ?? "") || new Date().toISOString())
      : null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("posts").update(row).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("posts").insert(row);
    if (error) return { error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin");
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
