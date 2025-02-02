import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { motion } from "framer-motion";

const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Profile() {
  return (
    <>
      <section className={styles.breadcrumbs}>
        <Link href="/">HOME</Link> ＞ プロフィール
      </section>
      <section className={styles.profileBg}>
        <h3 className={styles.toph3TitleProfile}>ABOUT ME</h3>
        <div className={styles.toph3Wrep}>
          <div className={styles.toph3WrepProfile}>
            <div className={styles.toph3WrepProfileText}>
              <div className={styles.profileList}>
                <dl className={styles.profileList_dl}>
                  <dt className={styles.profileList_dt}>名前：</dt>
                  <dd className={styles.profileList_dd}>T.OKADA</dd>
                  <dt className={styles.profileList_dt}>職業：</dt>
                  <dd className={styles.profileList_dd}>
                    大手店舗運営系事業会社WEB担当
                    <br />
                    （デザイナー兼コーダー寄りのWEBディレクター）
                  </dd>
                  <dt className={styles.profileList_dt}>出身地：</dt>
                  <dd className={styles.profileList_dd}>千葉県</dd>
                  <dt className={styles.profileList_dt}>スキル：</dt>
                  <dd className={styles.profileList_dd}>
                    WEBディレクション：経験5年
                    <br />
                    HTML：経験10年以上
                    <br />
                    CSS：経験10年以上
                    <br />
                    PHP：経験1年（主に運用保守領域）
                    <br />
                    JavaScript：経験6年（主にjQuery）
                    <br />
                    React+Next.js：経験1年未満
                    <br />
                    WordPress：経験5年
                    <br />
                    C言語：経験2年
                  </dd>
                  <dt className={styles.profileList_dt}>ツール：</dt>
                  <dd className={styles.profileList_dd}>
                    Photoshop：経験8年 <br />
                    Figma：経験3年
                    <br />
                    Canva
                    <br />
                    GoogleAnalytics4：経験2年
                    <br />
                    Microsoft Crality：経験1年
                    <br />
                    生成AIツール（ChatGPT、Gemini）
                  </dd>
                  <dt className={styles.profileList_dt}>保有資格：</dt>
                  <dd className={styles.profileList_dd}>
                    ・Google アナリティクス個人認定資格
                    <br />
                    ・普通自動車免許
                  </dd>
                </dl>
              </div>
            </div>
            <Image
              className={styles.imageProfile}
              src="/img-t-okada-profile.jpg"
              alt="T.OKADA"
              width={613}
              height={666}
            />
          </div>

          <h3 className={styles.toph3TitleProfile}>MESSAGE</h3>
          <div className={styles.profileWrap_rl}>
            <div className={styles.profileWrap_rl_img}>
              <Image
                src="/profile-first.jpg"
                alt="T.OKADA"
                width={1478}
                height={700}
              />
            </div>
            <div className={styles.profileWrap_rl_text}>
              <p>
                理系の4年制大学を卒業後、業務系プログラマーとしてシステム企業に入社し、約2年間プログラミングとテスト業務を行いました。
              </p>
              <p>
                学生時代にブログ運営をしていた経験からWEB業界に興味を持ち、2社目ではWEB制作会社に転職。コーダーとしてのスキルを軸に、WEBサイト運営、バナー制作、WEBデザイン（ワイヤーフレーム作成、デザインカンプ作成）など幅広い制作業務を経験しました。
              </p>
              <p>
                現在は、デザイナー兼コーダー寄りのWEBディレクターとして、事業会社（店舗運営会社）に所属し、企画・提案、要件定義、デザイン、コーディング、運用・保守まで一貫したWEB制作に従事しています。また、データ解析、SNS運用、社内ブランディングプロジェクトのリーダー業務なども担当し、制作とマーケティングの両面から課題解決に取り組んでいます。
              </p>
              <p>
                さらに、進化する生成AIを活用したコンテンツ制作や効率化の取り組み、新しい技術やトレンドのキャッチアップを行い、現場での即戦力を発揮しながら成果を生み出しています。
              </p>
            </div>
          </div>
          <h3 className={styles.toph3TitleProfile}>FUTURE</h3>
          <div className={styles.profileWrap_rl_reverse}>
            <div className={styles.profileWrap_rl_img}>
              <Image
                src="/profile-future.jpg"
                alt="T.OKADA"
                width={1478}
                height={700}
              />
            </div>
            <div className={styles.profileWrap_rl_text}>
              <p>
                私は、デザイナーやコーダーとしての専門性を活かしつつ、WEBディレクターとしてクライアントや社会に新たな価値を提供する存在を目指しています。また、マーケターとしての視点を取り入れた戦略設計を強みとし、制作と施策を一貫してサポートできる人材を目指しています。
              </p>
              <p>
                これまでの経験では、デザインやコーディングだけでなく、ディレクションやデータ分析にも取り組み、成果を上げてきました。例えば、アクセス解析ツールを活用した施策提案や改善案の実施を通じて、ホームページのコンバージョン数を向上させた実績があります。一方で、これらのスキルはまだ成長段階であり、さらなる習熟を目指しています。
              </p>
              <p>
                生成AIや新しい技術を活用し、業務全体の生産性を高めながら、データ分析に基づいた課題解決を通じて、マーケティング施策にも貢献できる実践力を磨きたいと考えています。また、制作とマーケティング両方のスキルを持つディレクターとして、現場の視点を大切にした戦略提案と、チームのパフォーマンス向上に寄与することを目指しています。
              </p>
            </div>
          </div>
          <h3 className={styles.toph3TitleProfile}>IDEALLY</h3>
          <div className={styles.profileWrap_rl}>
            <div className={styles.profileWrap_rl_img}>
              <Image
                src="/profile-idealy.jpg"
                alt="3人のレンガ職人風"
                width={1478}
                height={700}
              />
            </div>
            <div className={styles.profileWrap_rl_text}>
              <p>
                私の理想は、
                <span className={styles.marker}>
                  「3人のレンガ職人」の3人目
                </span>
                のような存在です。与えられたタスクをこなすだけではなく、プロジェクトや事業全体の目標を見据えたアプローチを常に追求します。
              </p>
              <p>
                特に、デザイン・コーディングのスキルを活かしながらも、データ解析やマーケティングの視点を取り入れ、効果的で持続可能な施策を実現するプロジェクト運営を心がけています。これにより、クライアントやチームにとって価値ある成果を提供できるディレクター兼マーケターとして信頼される存在になることを目指します。
              </p>
              <p>
                将来的には、プロジェクトを統括する立場として、制作とマーケティングの両面から事業の目標達成をリードし、より大きなインパクトを与えられる人材になることを目標としています。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
