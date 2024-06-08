import { useUnit } from "effector-react";
import { Responsive, WidthProvider } from "react-grid-layout";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const ResponsiveGridLayout = WidthProvider(Responsive);

import { WidgetInDashboard } from "./widget-in-dashboard";
import { model } from "../model";

type WidgetGridProps = {
  dashboardId: string;
};

export const WidgetGrid: FCC<WidgetGridProps> = ({
  className,
  dashboardId,
}) => {
  const [widgets, getWidgets] = useUnit([
    model.$widgetsArray,
    model.getWidgets,
  ]);

  if (!widgets.length) {
    return (
      <section className="flex flex-grow flex-col items-center justify-center gap-6">
        <h2 className="text-4xl font-bold">На этой панели пока ничего нет!</h2>
      </section>
    );
  }

  const handleRemove = () => getWidgets(dashboardId);

  return (
    <section className={className}>
      <ResponsiveGridLayout
        containerPadding={[0, 0]}
        breakpoints={{ lg: 0 }}
        cols={{ lg: 12 }}
        rowHeight={72}
      >
        {widgets.map((widget, index) => (
          // Из-за внутренней реализации RGL при работе с children
          // лучше обернуть все в div, при прямом прокидывании
          // этих пропсов на сам виджет возникают неразрешимые проблемы
          <div
            key={widget.raw.id}
            data-grid={{
              x: (index % 2) * 6,
              y: Math.floor(index / 2) * 6,
              w: 6,
              h: 3,
            }}
          >
            <WidgetInDashboard
              className="h-full"
              widget={widget}
              onRemove={handleRemove}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </section>
  );
};
