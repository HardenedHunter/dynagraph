import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MDXRemote } from "next-mdx-remote";

import {
  BlockLoader,
  LineChart,
  NoSSR,
  transformPrometheusResponse,
} from "~/shared/ui";
import { WidgetLoadingError } from "./widget-loading-error";
import { SerializedWidget } from "../types";

type WidgetProps = {
  data?: unknown;
  serialized: SerializedWidget;
  isLoading?: boolean;
};

export const Widget = React.memo<WidgetProps>(
  ({ data, serialized, isLoading }) => {
    if (!serialized.mdxSource) {
      return <WidgetLoadingError error={serialized.error} />;
    }

    return (
      <NoSSR>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <WidgetLoadingError error={(error as Error).message} />
          )}
        >
          {!isLoading && (
            <Suspense fallback={<BlockLoader />}>
              <MDXRemote
                {...serialized.mdxSource}
                components={{ LineChart }}
                scope={{
                  scope: {
                    data,
                    transformPrometheusResponse,
                  },
                }}
              />
            </Suspense>
          )}
          {isLoading && <BlockLoader />}
        </ErrorBoundary>
      </NoSSR>
    );
  },
);

Widget.displayName = "Widget";
