import { useUnit } from "effector-react";
import { FC } from "react";

import { Icon, Panel } from "~/shared/ui";
import { CreateWidgetPanel } from "~/features/createWidget";
import { model } from "../model";

export const WidgetLibrary: FC = () => {
  const [widgets, getWidgets] = useUnit([model.$widgets, model.getWidgets]);

  return (
    <div className="mx-auto grid max-w-[90rem] gap-6 lg:grid-cols-4">
      <CreateWidgetPanel onCreate={getWidgets} />
      {widgets.map((w) => (
        <Panel key={w.id}>
          <p className="text-sm font-bold">{w.name}</p>
          <div className="flex h-24 items-center justify-center">
            <Icon icon="chart-column" size="3x" />
          </div>
        </Panel>
      ))}
    </div>
  );
};
