import { forwardRef } from "react";

import { Widget, WidgetProps } from "~/entities/widget";

type WidgetInGridProps = WidgetProps & {
  //
};

export const WidgetInGrid = forwardRef<
  HTMLDivElement,
  PropsWithClassName<WidgetInGridProps>
>(({ ...props }, ref) => {
  return <Widget {...props} ref={ref} />;
});

WidgetInGrid.displayName = "WidgetInGrid";
