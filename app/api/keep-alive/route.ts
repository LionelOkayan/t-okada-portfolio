import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cron から毎回新鮮に実行させる（キャッシュさせない）
export const dynamic = "force-dynamic";

/**
 * Supabase の自動停止（無料プランは 7 日間アクセスがないと停止）対策。
 * Vercel Cron から 1 日 1 回呼ばれ、Supabase の Auth API へ軽い疎通リクエストを投げる。
 *
 * Supabase は現状 Auth 専用でアプリ用テーブルが無いため、テーブルクエリではなく
 * Auth の health エンドポイント（read-only）を叩いてプロジェクトのアクティビティを発生させる。
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  // Vercel Cron からの正規リクエストのみ許可する
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json(
      { error: "Supabase env not configured" },
      { status: 500 },
    );
  }

  try {
    // Auth API の health エンドポイントへ疎通（read-only・データ変更なし）
    const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: { apikey: anonKey },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, status: res.status },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
