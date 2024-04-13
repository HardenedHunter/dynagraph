import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MDXRemote } from "next-mdx-remote";
import clsx from "clsx";

import { Icon, Menu, Panel, PanelProps } from "~/shared/ui";
import { WidgetLoadingError } from "~/entities/widgetLoadingError";
import { removeWidgetFromDashboardModal } from "~/features/removeWidgetFromDashboard";
import { DashboardWidget } from "../model";

type WidgetInDashboardProps = PanelProps & {
  widget: DashboardWidget;
  onRemove?: () => void;
};

export const WidgetInDashboard: FCC<WidgetInDashboardProps> = ({
  widget,
  onRemove,
  ...rest
}) => {
  const {
    id,
    serialized: { mdxSource, error },
  } = widget;

  const handleRemove = () => {
    removeWidgetFromDashboardModal.push({ dashboardWidgetId: id, onRemove });
  };

  const menuOptions = [
    {
      name: "Remove",
      icon: "trash",
      onClick: handleRemove,
    } as const,
  ];

  return (
    <Panel {...rest} className={clsx("relative", rest.className)} ref={null}>
      <Menu className="absolute right-0 top-0" options={menuOptions}>
        <div className="p-3 pb-0">
          <Icon icon="ellipsis-vertical" />
        </div>
      </Menu>
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
