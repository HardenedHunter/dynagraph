import { useUnit } from "effector-react";
import { MDXRemote } from "next-mdx-remote";
import { Responsive, WidthProvider } from "react-grid-layout";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const ResponsiveGridLayout = WidthProvider(Responsive);

import { WidgetLoadingError } from "~/entities/widget";
import { model } from "../model";
import { WidgetInGrid } from "./WidgetInGrid";

export const WidgetGrid: FCC = ({ className }) => {
  const widgets = useUnit(model.$widgets);

  return (
    <ResponsiveGridLayout
      className={className}
      containerPadding={[0, 0]}
      breakpoints={{ lg: 0 }}
      cols={{ lg: 12 }}
      rowHeight={72}
    >
      {widgets.map(({ id, mdxSource, error }, index) => (
        <WidgetInGrid
          key={id}
          data-grid={{
            x: (index % 2) * 6,
            y: Math.floor(index / 2) * 6,
            w: 6,
            h: 3,
          }}
        >
          {mdxSource ? (
            <MDXRemote {...mdxSource} components={{}} />
          ) : (
            <WidgetLoadingError key={index} error={error} />
          )}
        </WidgetInGrid>
      ))}
    </ResponsiveGridLayout>
  );
};
