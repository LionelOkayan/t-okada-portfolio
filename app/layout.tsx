import "./globals.css";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://t-okada-portfolio.vercel.app/"),
  title: {
    template: "%s | T.OKADA's PORTFOLIO",
    default: "T.OKADA's PORTFOLIO",
  },
  description: "T.OKADAのポートフォリオサイトです。",
  openGraph: {
    title: "T.OKADA's PORTFOLIO",
    description: "T.OKADAのポートフォリオサイトです。",
    images: ["/ogp.jpg"],
  },
  alternates: {
    canonical: "https://t-okada-portfolio.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
