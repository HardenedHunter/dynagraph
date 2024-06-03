import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type SerializedWidget =
  | {
      mdxSource: MDXRemoteSerializeResult;
      error: undefined;
    }
  | {
      mdxSource: undefined;
      error: string;
    };
