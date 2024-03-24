import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type CustomNextPage<P = object, IP = P> = NextPage<P, IP> & {
  layoutClassName?: string;
  getLayout?: (page: ReactElement) => ReactNode;
};
