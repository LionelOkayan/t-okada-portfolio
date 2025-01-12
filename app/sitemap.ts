import { MetadataRoute } from "next";
import { getAllPortfolioList } from "./_libs/microcms";
import Portfolio from "./portfolio/page";

const buildUrl = (path?: string) =>
  `https://t-okada-portfolio.vercel.app${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioContents = await getAllPortfolioList();

  const newUrls: MetadataRoute.Sitemap = portfolioContents.map((content) => ({
    url: buildUrl(`/portfolio/${content.id}`),
    lastModified: content.revisedAt,
  }));

  const now = new Date();

  return [
    { url: buildUrl(), lastModified: now },
    { url: buildUrl("/profile"), lastModified: now },
    { url: buildUrl("/portfolio"), lastModified: now },
    ...newUrls,
  ];
}
