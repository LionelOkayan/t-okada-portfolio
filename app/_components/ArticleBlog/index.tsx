import Image from "next/image";
import Link from "next/link";

import type { Blog } from "@/app/_libs/microcms";
import Date from "../Date";
import styles from "./index.module.css";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

type Props = {
  data: Blog;
};

export default function ArticleBlog({ data }: Props) {
  const $ = cheerio.load(data.text); // 旧バージョンの cheerio に対応
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  data.text = $.html();

  return (
    <>
      <section className={styles.breadcrumbs}>
        <Link href="/">HOME</Link> ＞ <Link href="/blog">ブログ</Link> ＞{" "}
        {data.title}
      </section>
      <section className={styles.portfolio}>
        <div className={styles.blogContentsWrap}>
          <div className={styles.toph3Wrep}>
            <h3 className={styles.toph3Title}>{data.title}</h3>
            <ul className={styles.categoryTagUl}>
              {data.category?.map((cate: string, index: number) => (
                <li
                  key={`${data.id}-${cate}-${index}`}
                  className={styles.categoryTagLi}
                >
                  #{cate}
                </li>
              ))}
            </ul>
            <div className={styles.blogListTextWrapTitle}>
              投稿日：
              <Date date={data.publishedAt ?? data.createdAt} />
            </div>

            {data.thumbnail ? (
              <Image
                className={styles.portfolioImg}
                src={data.thumbnail.url}
                alt={data.title}
                width={data.thumbnail.width}
                height={data.thumbnail.height}
              />
            ) : (
              <Image
                className={styles.portfolioImg}
                src="/no-image.jpg"
                alt="NO IMAGE"
                width={800}
                height={450}
              />
            )}

            <div className={styles.portfolioDescription}>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${data.text}`,
                }}
              />
            </div>
          </div>
        </div>
        <Link href="/blog" className={styles.linkBtn}>
          ブログ一覧に戻る
        </Link>
      </section>
    </>
  );
}
