"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { site } from "@/lib/site";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setPending(false);
      return;
    }

    router.replace(params.get("next") ?? "/admin");
    router.refresh();
  }

  const field =
    "w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-crimson";

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">
          {site.name}
        </h1>
        <p className="mt-1 text-sm text-mist">Sign in to manage the site.</p>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-mist">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-mist">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={field}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-crimson">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
