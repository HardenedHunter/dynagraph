import { FC, useRef } from "react";

import { Panel, Button } from "~/shared/ui";
import { exportDomElement } from "~/shared/misc";
import { ConnectedWidget } from "./connected-widget";
import { DashboardWidget } from "../model";

type FullscreenWidgetProps = {
  widget: DashboardWidget;
  onClose: () => void;
};

export const FullscreenWidget: FC<FullscreenWidgetProps> = ({
  widget,
  onClose,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    const element = widgetRef.current;

    if (!element) return;

    exportDomElement(element, widget.raw.displayedName);
  };

  return (
    <div className="absolute inset-0">
      {/* NOTE padding этой панели "перемещен" в div с виджетом, чтобы корректно
          генерилась картинка при сохранении */}
      <Panel className="relative h-full w-full !p-0 !pt-6">
        <p className="absolute left-4 top-2 text-xs font-bold">
          {widget.raw.displayedName}
        </p>
        <div className="absolute right-8 top-1">
          <Button.Icon tabIndex={-1} icon="save" onClick={handleSave} />
        </div>
        <div className="absolute right-1 top-1">
          <Button.Icon tabIndex={-1} icon="close" onClick={onClose} />
        </div>
        <div ref={widgetRef} className="h-full w-full p-4">
          <ConnectedWidget widget={widget} />
        </div>
      </Panel>
    </div>
  );
};
