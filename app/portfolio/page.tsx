import Link from "next/link";
import { getPortfolioList } from "@/app/_libs/microcms";
import PortfolioList from "@/app/_components/PortfolioList";
import styles from "./page.module.css";
import Pagination from "../_components/Pagination";
import { PORTFOLIO_LIST_LIMIT } from "../_constants";

export default async function Portfolio() {
  const { contents: portfolio, totalCount } = await getPortfolioList({
    limit: PORTFOLIO_LIST_LIMIT,
  });
  return (
    <>
      <section className={styles.breadcrumbs}>
        <Link href="/">HOME</Link> ＞ ポートフォリオ
      </section>
      <section className={styles.portfolio}>
        <div className={styles.toph3Wrep}>
          <h3 className={styles.toph3Title}>PORTFOLIO</h3>
          <p className={styles.topTitleSub}>
            多様なプロジェクトの実績を紹介します
          </p>
        </div>
        <PortfolioList portfolio={portfolio} />
        <Pagination totalCount={totalCount} />
      </section>
    </>
  );
}
