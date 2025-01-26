import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogDetail } from "@/app/_libs/microcms";
import ArticleBlog from "@/app/_components/ArticleBlog";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBlogDetail(params.slug);
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
  const data = await getBlogDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);

  return (
    <>
      <ArticleBlog data={data} />
    </>
  );
}
