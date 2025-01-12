import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioList } from "@/app/_libs/microcms";
import { TOP_PORTFOLIO_LIMIT } from "@/app/_constants";
import PortfolioList from "@/app/_components/PortfolioList";

export default async function Home() {
  const data = await getPortfolioList({
    limit: TOP_PORTFOLIO_LIMIT,
  });
  return (
    <>
      <section className={styles.top}>
        <div>
          <div className={styles.bgTextWrap}>
            <h2 className={styles.title}>成果を生むWEB制作</h2>
            <p className={styles.bgtext}>
              デザイン×データ解析×生成AIで、課題解決を実現する一気通貫のWEB制作
            </p>
          </div>
          <Image
            className={styles.bgimg}
            src="/mv.webp"
            alt=""
            width={1792}
            height={1024}
          />
        </div>
        <a href="#contents" className={styles.topTitleArrow}>
          <div className={styles.topTitleArrowFont}>Scroll</div>
          <FontAwesomeIcon
            className={styles.topTitleArrowFA}
            icon={faAngleDown}
          />
        </a>
      </section>
      <section id="contents" className={styles.portfolio}>
        <div className={styles.toph3Wrep}>
          <h3 className={styles.toph3Title}>PORTFOLIO</h3>
          <p className={styles.topTitleSub}>
            多様なプロジェクトの実績を紹介します
          </p>
        </div>
        <PortfolioList portfolio={data.contents} />
        <a href="/portfolio" className={styles.linkBtn}>
          ポートフォリオをもっと見る
        </a>
      </section>
      <section className={styles.profileBg}>
        <div className={styles.toph3Wrep}>
          <div className={styles.toph3WrepProfile}>
            <div className={styles.toph3WrepProfileText}>
              <h3 className={styles.toph3TitleProfile}>PROFILE</h3>
              <p className={styles.topTitleSubProfile}>
                WEB制作会社と事業会社で培った経験を活かし、デザインと解析、生成AI活用で成果を創出するWEBクリエイター。
              </p>
            </div>

            <div className={styles.topTitleSubProfileImg}>
              <Image
                className={styles.imageProfile}
                src="/top-profile-t-okada.jpg"
                alt="T.OKADA"
                width={1478}
                height={700}
              />
            </div>
          </div>
          <Link href="/profile" className={styles.linkBtn}>
            プロフィールをもっと見る
          </Link>
        </div>
      </section>
    </>
  );
}
