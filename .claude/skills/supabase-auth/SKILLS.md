---
name: supabase-auth
description: Supabase Magic Link (OTP) 認証の実装。middleware の認証ガード、ログインページ、コールバックルート、ログアウト処理を作成・修正するときに使用。@supabase/ssr を使った App Router 構成。
---

# Supabase Magic Link 認証 実装ガイド

## パッケージ

`@supabase/ssr` と `@supabase/supabase-js` を使用。
`@supabase/auth-helpers-nextjs` は**使わない**（プロジェクトにインストールされていない）。

## クライアント生成の使い分け（厳守）

```ts
import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
```

- クライアントコンポーネント → `createBrowserClient(url, anonKey)`
- Route Handler / Server Component → `createServerClient(url, anonKey, { cookies: { getAll, setAll } })`
- middleware → `createServerClient(url, anonKey, { cookies: { getAll, setAll } })`

Cookie の読み書き経路が変わると Magic Link が成立しないため混在させないこと。

### middleware での cookies の渡し方

```ts
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options),
        );
      },
    },
  },
);
```

### Route Handler での cookies の渡し方

```ts
const cookieStore = await cookies();
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options),
        );
      },
    },
  },
);
```

## middleware のホワイトリスト方針

認証不要にすべきパス：

- `/login`
- `/auth/callback`
- `_next/static`, `_next/image`, `favicon.ico` などの静的アセット（matcher で除外）

セッションが無い かつ ホワイトリスト外 → `/login` に redirect。
セッションがあっても許可メールアドレス以外は `signOut()` して `/login` に redirect。

## Magic Link コールバックの実装パターン

`app/auth/callback/route.ts` では：

1. `searchParams` から `code` または `token_hash` + `type` を取得
2. `code` がある場合 → `supabase.auth.exchangeCodeForSession(code)` を呼ぶ
3. `token_hash` + `type` がある場合 → `supabase.auth.verifyOtp({ token_hash, type })` を呼ぶ
4. 成功時は `/` へ redirect
5. 失敗時は `/login?error=...` に戻す

## ログインページの UX 要件

- メールアドレス入力 → 送信後は「メールを確認してください」表示に切り替える
- エラー時はメッセージを表示（具体的な失敗理由は晒さない）
- スタイルは **Tailwind CSS のみ**（CSS Modules / Sass は使わない）
- `useSearchParams()` を使う場合は `<Suspense>` でラップする

## 環境変数（読み取り禁止だが参照する名前）

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- リダイレクト先は `process.env.NEXT_PUBLIC_SITE_URL` を基準に組み立てる

## やってはいけないこと

- service_role key をクライアントで使う
- localStorage に session を手書きで保存する（Cookie ベースで統一）
- `redirect()` を try/catch で握りつぶす（Next.js 内部例外を捕まえてしまう）
- `.scss` / `.sass` ファイルをログインページに追加する
