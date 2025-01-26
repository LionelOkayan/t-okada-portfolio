import Link from "next/link";
import { getBlogList } from "@/app/_libs/microcms";
import BlogList from "../_components/BlogList";
import styles from "./page.module.css";
import Pagination from "../_components/Pagination";
import { BLOG_LIST_LIMIT } from "../_constants";

export default async function Blog() {
  const { contents: blog, totalCount } = await getBlogList({
    limit: BLOG_LIST_LIMIT,
  });
  return (
    <>
      <section className={styles.breadcrumbs}>
        <Link href="/">HOME</Link> ＞ ブログ
      </section>
      <section className={styles.blog}>
        <div className={styles.toph3Wrep}>
          <h3 className={styles.toph3Title}>BLOG</h3>
          <p className={styles.topTitleSub}>
            多様なプロジェクトの実績を紹介します
          </p>
        </div>

        <BlogList blog={blog} />
        <Pagination totalCount={totalCount} />
      </section>
    </>
  );
}
