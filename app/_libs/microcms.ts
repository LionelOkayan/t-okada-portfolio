import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Category = {
  categoryname: string;
} & MicroCMSListContent;

export type Portfolio = {
  title: string;
  description_thumb: string;
  description: string;
  projectname: string;
  thumbnail?: MicroCMSImage;
  category: Category;
  kikan: string;
  koutei: string;
  usetechnical: string;
  usetool: string;
  url: string;
  seika: string;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is requied");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICRO_API_KEY is required");
}
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getPortfolioList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Portfolio>({
    endpoint: "portfolio",
    queries,
  });
  return listData;
};

export const getPortfolioDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Portfolio>({
    endpoint: "portfolio",
    contentId,
    queries,
  });
  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};
export const getAllCategoryList = async () => {
  const listData = await client.getAllContents<Category>({
    endpoint: "categories",
  });
  return listData;
};

export const getAllPortfolioList = async () => {
  const listData = await client.getAllContents<Portfolio>({
    endpoint: "portfolio",
  });
  return listData;
};
