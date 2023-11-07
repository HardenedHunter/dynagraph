import { type AppType } from "next/app";
import { EffectorNext } from "@effector/next";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ values: Record<string, unknown> }> = ({
  Component,
  pageProps,
}) => {
  return (
    <EffectorNext values={pageProps.values}>
      <Component {...pageProps} />
    </EffectorNext>
  );
};

export default api.withTRPC(MyApp);
