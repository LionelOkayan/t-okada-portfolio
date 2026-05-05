import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogDetail } from "@/app/_libs/microcms";
import ArticleBlog from "@/app/_components/ArticleBlog";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ dk?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogDetail(slug);
  const titleName = data.title + ` | T.OKADA's PORTFOLIO`;
  return {
    title: titleName,
    openGraph: {
      title: data.title,
      images: [data?.thumbnail?.url ?? ""],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { dk } = await searchParams;
  const data = await getBlogDetail(slug, {
    draftKey: dk,
  }).catch(notFound);

  return (
    <>
      <ArticleBlog data={data} />
    </>
  );
}
