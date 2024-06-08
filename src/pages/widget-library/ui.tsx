import { FC } from "react";
import Link from "next/link";
import { useUnit } from "effector-react";

import { Icon, Panel } from "~/shared/ui";
import { WidgetInLibrary } from "~/modules/widget-in-library";
import { model } from "./model";

export const WidgetLibrary: FC = () => {
  const [widgets, getWidgets] = useUnit([model.$widgets, model.getWidgets]);

  return (
    <div className="mx-auto grid max-w-[90rem] gap-6 md:grid-cols-4">
      <Link href="/library/create">
        <Panel className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 hover:bg-neutral-100">
          <Icon icon="plus" />
          <p>Создать виджет</p>
        </Panel>
      </Link>
      {widgets.map((widget) => (
        <WidgetInLibrary key={widget.id} {...widget} onDelete={getWidgets} />
      ))}
    </div>
  );
};
