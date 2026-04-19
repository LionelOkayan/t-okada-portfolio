"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthHeader from "@/app/_components/AuthHeader";

type Status = "idle" | "loading" | "sent" | "error";

function LoginContent(): JSX.Element {
  useSearchParams();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  if (status === "sent") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-center text-lg">
          メールを確認してください。
          <br />
          送信先: {email}
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 p-8"
      >
        <h1 className="text-center text-2xl font-bold">ログイン</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
          disabled={status === "loading"}
          className="rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {status === "error" && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {status === "loading" ? "送信中..." : "Magic Linkを送信"}
        </button>
      </form>
    </main>
  );
}

export default function LoginPage(): JSX.Element {
  return (
    <>
      <AuthHeader />
      <Suspense fallback={<div>読み込み中...</div>}>
        <LoginContent />
      </Suspense>
    </>
  );
}
