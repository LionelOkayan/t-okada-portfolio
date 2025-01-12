import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { getPortfolioList } from "@/app/_libs/microcms";
import PortfolioList from "@/app/_components/PortfolioList";
import Pagination from "@/app/_components/Pagination";
import { PORTFOLIO_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const current = parseInt(params.current);
  const { contents: portfolio, totalCount } = await getPortfolioList({
    limit: PORTFOLIO_LIST_LIMIT,
    offset: PORTFOLIO_LIST_LIMIT * (current - 1),
  });

  if (portfolio.length === 0) {
    notFound();
  }

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
        <Pagination totalCount={totalCount} current={current} />
      </section>
    </>
  );
}
