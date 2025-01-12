import Image from "next/image";
import Link from "next/link";
import type { Portfolio } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
  data: Portfolio;
};

export default function Article({ data }: Props) {
  return (
    <>
      <section className={styles.breadcrumbs}>
        <Link href="/">HOME</Link> ＞{" "}
        <Link href="/portfolio">ポートフォリオ</Link> ＞ {data.title}
      </section>
      <section className={styles.portfolio}>
        <div className={styles.toph3Wrep}>
          <h3 className={styles.toph3Title}>{data.title}</h3>
          <div className={styles.portfolioContentsWrap}>
            {data.thumbnail && (
              <Image
                className={styles.portfolioImg}
                src={data.thumbnail.url}
                alt={data.title}
                width={data.thumbnail.width}
                height={data.thumbnail.height}
              />
            )}
            <div className={styles.portfolioDlData}>
              <dl>
                <dt>プロジェクト名: </dt>
                <dd>{data.projectname}</dd>
              </dl>
              <dl>
                <dt>期間: </dt>
                <dd>{data.kikan}</dd>
              </dl>
              {data.koutei != null && (
                <dl>
                  <dt>担当工程: </dt>
                  <dd>{data.koutei}</dd>
                </dl>
              )}
              {data.usetechnical != null && (
                <dl>
                  <dt>使用技術: </dt>
                  <dd>{data.usetechnical}</dd>
                </dl>
              )}
              {data.usetool != null && (
                <dl>
                  <dt>使用ツール: </dt>
                  <dd>{data.usetool}</dd>
                </dl>
              )}
              {data.url != null && (
                <dl>
                  <dt>URL: </dt>
                  <dd>
                    <a href={data.url} target="_blank">
                      {data.url}
                    </a>
                  </dd>
                </dl>
              )}
            </div>
            <h4 className={styles.portfolioh4Title}>概要</h4>
            <div className={styles.portfolioDescription}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${data.description}`,
                }}
              />
            </div>
            {data.seika != null && (
              <>
                <h4 className={styles.portfolioh4Title}>成果</h4>
                <div className={styles.portfolioDescription}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${data.seika}`,
                    }}
                  />
                </div>
              </>
            )}
            <Link href="/portfolio" className={styles.linkBtn}>
              ポートフォリオ一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
