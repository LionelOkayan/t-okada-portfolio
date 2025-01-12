import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/app/_libs/microcms";
import Category from "../Category";
import styles from "./index.module.css";

type Props = {
  portfolio: Portfolio[];
};

export default function PortfolioList({ portfolio }: Props) {
  if (portfolio.length === 0) {
    return <p>ポートフォリオがありません。</p>;
  }
  return (
    <div className={styles.portfolioUl}>
      {portfolio.map((article) => (
        <Link
          href={`/portfolio/${article.id}`}
          key={article.id}
          className={styles.list}
        >
          <div className={styles.link}></div>
          {article.thumbnail ? (
            <Image
              className={styles.image}
              src={article.thumbnail.url}
              alt={article.title}
              width={article.thumbnail.width}
              height={article.thumbnail.height}
            />
          ) : (
            <Image
              className={styles.image}
              src="/no-image.jpg"
              alt="NO IMAGE"
              width={800}
              height={450}
            />
          )}
          <div className={styles.portfolioListTextWrap}>
            <div className={styles.portfolioListTextWrapTitle}>
              {article.title}
            </div>
            <div className={styles.portfolioListTextWrapText}>
              {article.description_thumb}
            </div>
            <Category category={article.category} />
            <div className={styles.portfolioListTextWrapLink}>
              <div>View More ＞</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
