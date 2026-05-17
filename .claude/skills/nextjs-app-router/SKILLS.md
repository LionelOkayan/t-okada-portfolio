---
name: nextjs-app-router
description: Next.js App Router でページ・レイアウト・Route Handler・Server Component / Client Component を作成・修正するときに使用。pages router は使わない。
---

# App Router 規約

## 'use client' の付け方

付ける:useState/useEffect/イベントハンドラ/ブラウザAPI/Supabase クライアントを使う場合
付けない:それ以外すべて(デフォルトは Server Component)

## ファイル命名

- ページ・レイアウト:Next.js 規約に従う(`page.tsx`, `layout.tsx`, `route.ts`)
- コンポーネント:PascalCase(`LoginForm.tsx`)
- lib・ユーティリティ:camelCase(`supabaseClient.ts`)
- スタイル:同フォルダの `index.module.css`(後述「スタイリング」参照)

## スタイリング

CSS Modules + Tailwind の併用構成。Sass は使わない。
詳細は `styling-conventions` スキル参照。

## ディレクトリ構成

- コンポーネント: `app/_components/<ComponentName>/index.tsx`（トップレベルの `components/` は存在しない）
- lib・ユーティリティ: `app/_libs/`（例: `app/_libs/microcms.ts`、`app/_libs/utils.ts`）
- 定数: `app/_constants/index.ts`

## データ取得

- サーバー側:Server Component 内で直接 `await`
- クライアント側:必要な場合のみ。基本は Server で取って props で渡す
- MicroCMS 呼び出しは `app/_libs/microcms.ts` に集約し、`revalidate` を必ず指定

## Props の型

```ts
type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: Props) { ... }
```

`any` 禁止。不明型は `unknown` + 型ガード。
