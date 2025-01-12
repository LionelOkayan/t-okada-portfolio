import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  title: string;
};

export default function Hero({ title }: Props) {
  return (
    <>
      <section className={styles.top}>
        <div>
          <div className={styles.bgTextWrap}>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <Image
            className={styles.bgimg}
            src="/mv-sub.webp"
            alt=""
            width={1792}
            height={1024}
          />
        </div>
      </section>
    </>
  );
}
