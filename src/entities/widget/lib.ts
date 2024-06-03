import { serialize } from "next-mdx-remote/serialize";

export const serializeRawWidget = async (source: string) => {
  try {
    return {
      mdxSource: await serialize(source, {
        mdxOptions: { development: process.env.NODE_ENV === "development" },
      }),
    };
  } catch (e) {
    return {
      error: (e as Error).message,
    };
  }
};
