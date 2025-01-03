import Image from "next/image";
import styles from "./page.module.css";

type Portfolio = {
  id: string;
  image: string;
  title: string;
  text: string;
  category: {
    name: string;
  };
  publishedAt: string;
};
const data: {
  contents: Portfolio[];
} = {
  contents: [
    {
      id: "1",
      image: "/thumb-portfolio-omgpartners.jpg",
      title: "OMG PARTNERS",
      text: "OMGパートナーズグループ9社WEBサイト運用保守、自社ブランドHP制作",
      category: {
        name: "WEBサイト",
      },
      publishedAt: "2025/01/01",
    },
    {
      id: "2",
      image: "/thumb-portfolio-bc.jpg",
      title: "BCプロジェクト",
      text: "プロジェクトリーダーとして社内のインナーブランディング施策の立案・提案、教育、進捗管理等を行っております。",
      category: {
        name: "社内プロジェクト",
      },
      publishedAt: "2024/12/01",
    },
    {
      id: "3",
      image: "/thumb-portfolio-mahalo.jpg",
      title: "MAHALO",
      text: "ハワイをイメージとしたリラクゼーションブランドです。",
      category: {
        name: "WEBサイト",
      },
      publishedAt: "2024/11/01",
    },
  ],
};

export default function Home() {
  const sliceData = data.contents.slice(0, 3);
  return (
    <>
      <section className={styles.top}>
        <div>
          <div className={styles.bgTextWrap}>
            <h2 className={styles.title}>成果を導くWEB制作</h2>
            <p className={styles.bgtext}>
              データ解析×一気通貫のWEB制作で、顧客の課題解決に貢献
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
      </section>
      <section className={styles.portfolio}>
        <div className={styles.toph3Wrep}>
          <h3 className={styles.toph3Title}>PORTFOLIO</h3>
          <p className={styles.topTitleSub}>
            多様なプロジェクトの実績を紹介します
          </p>
        </div>
        <ul className={styles.portfolioUl}>
          {sliceData.map((article) => (
            <li key={article.id} className={styles.list}>
              <div className={styles.link}></div>
              <Image
                className={styles.image}
                src={article.image}
                alt="No Image"
                width={1200}
                height={630}
              />
              <div className={styles.portfolioListTextWrap}>
                <div className={styles.portfolioListTextWrapTitle}>
                  {article.title}
                </div>
                <div className={styles.portfolioListTextWrapText}>
                  {article.text}
                </div>
                <div className={styles.portfolioListTextWrapCate}>
                  {article.category.name}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.profileBg}>
        <div className={styles.toph3Wrep}>
          <div className={styles.toph3WrepProfile}>
            <div className={styles.toph3WrepProfileText}>
              <h3 className={styles.toph3TitleProfile}>PROFILE</h3>
              <p className={styles.topTitleSubProfile}>
                WEB制作会社を経て、全国300店舗以上を展開する事業会社でWEBディレクションから運用保守まで経験を持つクリエイター。デザインとアクセス解析を融合し、具体的な成果に繋がるサイトを構築します。
              </p>
            </div>

            <Image
              className={styles.imageProfile}
              src="/img-t-okada-profile.jpg"
              alt="T.OKADA"
              width={613}
              height={666}
            />
          </div>
        </div>
      </section>
    </>
  );
}
