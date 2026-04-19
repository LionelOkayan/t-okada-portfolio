"use client";

import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton(): JSX.Element {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} type="button">
      ログアウト
    </button>
  );
}
