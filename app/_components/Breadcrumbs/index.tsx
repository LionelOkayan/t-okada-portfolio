import Link from "next/link";
import styles from "./index.module.css"; // 必要に応じてスタイルを追加

type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  breadcrumbs: Breadcrumb[];
};

export default function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbs.map((crumb, index) => (
        <span key={index}>
          {crumb.href ? (
            <>
              <Link href={crumb.href}>{crumb.label}</Link>
              {index < breadcrumbs.length - 1 && " ＞ "}
            </>
          ) : (
            <span>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
