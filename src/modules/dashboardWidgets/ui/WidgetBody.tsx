import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MDXRemote } from "next-mdx-remote";

import {
  BlockLoader,
  LineChart,
  transformPrometheusResponse,
} from "~/shared/ui";
import { useDatasource } from "~/features/dashboardDatasources";
import { WidgetLoadingError } from "~/entities/widgetLoadingError";
import { DashboardWidget } from "../model";

type WidgetBodyProps = {
  widget: DashboardWidget;
};

export const WidgetBody: FC<WidgetBodyProps> = ({ widget }) => {
  const { datasourceId, serialized } = widget;

  const datasource = useDatasource(datasourceId);

  const renderSerialized =
    !datasourceId || (datasource && datasource.status === "LOADED");

  const renderLoading =
    datasource &&
    (datasource.status === "PENDING" || datasource.status === "NOT_STARTED");

  if (!serialized.mdxSource) {
    return <WidgetLoadingError error={serialized.error} />;
  }

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <WidgetLoadingError error={(error as Error).message} />
      )}
    >
      {renderSerialized && (
        <Suspense fallback={<BlockLoader />}>
          <MDXRemote
            {...serialized.mdxSource}
            components={{ LineChart }}
            scope={{
              scope: {
                data: datasource?.data?.result,
                transformPrometheusResponse,
              },
            }}
          />
        </Suspense>
      )}
      {renderLoading && <BlockLoader />}
    </ErrorBoundary>
  );
};
