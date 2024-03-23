// See https://github.com/FortAwesome/Font-Awesome/issues/19348
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const { library, config } = require("@fortawesome/fontawesome-svg-core");

import Head from "next/head";
import { EffectorNext } from "@effector/next";
import { FC } from "react";

import { Modals } from "~/app/ui";
import { api } from "~/shared/api";
import { CustomNextPage, icons } from "~/shared/misc";
import { MainLayout } from "~/shared/ui";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "~/styles/globals.css";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
config.autoAddCss = false;
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
library.add(...Object.values(icons));

type CustomAppProps = {
  Component: CustomNextPage;
  pageProps: { values: Record<string, unknown> };
};

const MyApp: FC<CustomAppProps> = ({ Component, pageProps }) => {
  return (
    <EffectorNext values={pageProps.values}>
      <Head>
        <title>Dynagraph</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout className={Component.layoutClassName ?? "p-6"}>
        <Component {...pageProps} />
      </MainLayout>
      <Modals />
    </EffectorNext>
  );
};

export default api.withTRPC(MyApp);
