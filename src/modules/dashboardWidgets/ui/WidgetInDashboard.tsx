import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MDXRemote } from "next-mdx-remote";

import { Icon, Panel, PanelProps } from "~/shared/ui";
import { WidgetLoadingError } from "~/entities/widgetLoadingError";
import { WidgetFetchResult } from "../model";

type WidgetInDashboardProps = PanelProps & {
  fetchResult: WidgetFetchResult;
};

export const WidgetInDashboard: FCC<WidgetInDashboardProps> = ({
  fetchResult,
  ...rest
}) => {
  const { mdxSource, error } = fetchResult;

  return (
    <Panel {...rest} ref={null}>
      {mdxSource ? (
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <WidgetLoadingError error={(error as Error).message} />
          )}
        >
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Icon icon="spinner" className="animate-spin" />
              </div>
            }
          >
            <MDXRemote {...mdxSource} components={{}} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <WidgetLoadingError error={error} />
      )}
    </Panel>
  );
};
