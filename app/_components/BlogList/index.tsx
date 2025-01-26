import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/app/_libs/microcms";
import Date from "../Date";
import styles from "./index.module.css";
import { article } from "framer-motion/client";

type Props = {
  blog: Blog[];
};

export default function BlogList({ blog }: Props) {
  if (blog.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <div className={styles.blogUl}>
      {blog.map((article) => (
        <Link
          href={`/blog/${article.id}`}
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
          <div className={styles.blogListTextWrap}>
            <div className={styles.blogListTextWrapTitle}>{article.title}</div>
            <div className={styles.blogListTextWrapDate}>
              <Date date={article.publishedAt ?? article.createdAt} />
            </div>
            <ul className={styles.categoryTagUl}>
              {article.category?.map((cate: string, index: number) => (
                <li
                  key={`${article.id}-${cate}-${index}`}
                  className={styles.categoryTagLi}
                >
                  #{cate}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
