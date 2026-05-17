---
name: styling-conventions
description: コンポーネントのスタイリング、CSS Modules と Tailwind の使い分け、新規スタイル追加時に使用。Sass は使用しない。
---

# スタイリング規約

## 構成

CSS Modules + Tailwind CSS の併用。Sass(.scss)は使わない。
各コンポーネントフォルダに `index.module.css` を置く運用。

app/_components/Card/
├── index.tsx
└── index.module.css

## 使い分け

- レイアウト・余白・色のトークン的なもの → Tailwind ユーティリティ
- コンポーネント固有の複雑なスタイル・アニメーション・擬似要素 → CSS Modules
- 状態に応じた動的なクラス切り替え → CSS Modules + clsx 等
- 迷ったら CSS Modules(スコープが閉じていて保守しやすい)

## CSS Modules の書き方

```tsx
import styles from "./index.module.css";

export default function Card({ title }: Props) {
  return <div className={styles.root}>{title}</div>;
}
```

```css
/* index.module.css */
.root {
  padding: 16px;
  border-radius: 8px;
}

.title {
  font-weight: bold;
}
```

- クラス名は camelCase 推奨(`styles.cardTitle` が自然に書ける)
- ルート要素は `.root` で統一すると追いやすい

## Tailwind と併用するとき

同じ要素に両方当てるのは可。ただし役割を分ける。

```tsx
<div className={`${styles.root} flex items-center gap-4`}>
```

- Tailwind:汎用ユーティリティ(余白・flex・色)
- CSS Modules:そのコンポーネント固有の見た目

## 禁止事項

- `.scss` / `.sass` ファイルを新規作成しない
- `tailwind.config.*` を勝手に変更しない(必ず事前確認)
- グローバル CSS の追記は最小限(`app/globals.css` への追記は要相談)
- 既存の CSS Modules を全面書き換えしない(必要箇所だけ修正)

## 新規 index.module.css のテンプレ

```css
.root {
  /* コンポーネントのルート */
}
```
