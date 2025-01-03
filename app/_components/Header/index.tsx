import Image from "next/image";
import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <a href="/" className={styles.logoLink}>
          <Image
            className={styles.logoImg}
            src="/logo.png"
            alt="T.OKADA's PORTFOLIO"
            width={517}
            height={50}
          />
        </a>
      </h1>
    </header>
  );
}
