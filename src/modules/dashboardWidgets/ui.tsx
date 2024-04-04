import { Suspense } from "react";
import { useUnit } from "effector-react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { ErrorBoundary } from "react-error-boundary";
import { MDXRemote } from "next-mdx-remote";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const ResponsiveGridLayout = WidthProvider(Responsive);

import { Icon, Panel } from "~/shared/ui";
import { WidgetLoadingError } from "~/entities/widgetLoadingError";
import { model } from "./model";

export const DashboardWidgets: FCC = ({ className }) => {
  const widgets = useUnit(model.$widgets);

  if (!widgets.length) {
    return (
      <section className="flex flex-grow flex-col items-center justify-center gap-6">
        <h2 className="text-4xl font-bold">This dashboard is empty!</h2>
      </section>
    );
  }

  return (
    <section className={className}>
      <ResponsiveGridLayout
        containerPadding={[0, 0]}
        breakpoints={{ lg: 0 }}
        cols={{ lg: 12 }}
        rowHeight={72}
      >
        {widgets.map(({ id, mdxSource, error }, index) => (
          <Panel
            key={id}
            data-grid={{
              x: (index % 2) * 6,
              y: Math.floor(index / 2) * 6,
              w: 6,
              h: 3,
            }}
          >
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
              <WidgetLoadingError key={index} error={error} />
            )}
          </Panel>
        ))}
      </ResponsiveGridLayout>
    </section>
  );
};
