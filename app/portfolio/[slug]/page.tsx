import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ dk?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioDetail(slug);
  const titleName = data.title + ` | T.OKADA's PORTFOLIO`;
  return {
    title: titleName,
    description: data.description_thumb,
    openGraph: {
      title: data.title,
      description: data.description_thumb,
      images: [data?.thumbnail?.url ?? ""],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { dk } = await searchParams;
  const data = await getPortfolioDetail(slug, {
    draftKey: dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
    </>
  );
}
