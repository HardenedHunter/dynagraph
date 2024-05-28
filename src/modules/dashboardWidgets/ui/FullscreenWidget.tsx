import { FC } from "react";

import { Panel, Button } from "~/shared/ui";
import { WidgetBody } from "./WidgetBody";
import { DashboardWidget } from "../model";

type FullscreenWidgetProps = {
  widget: DashboardWidget;
  onClose: () => void;
};

export const FullscreenWidget: FC<FullscreenWidgetProps> = ({
  widget,
  onClose,
}) => {
  return (
    <div className="absolute inset-0">
      <Panel className="relative h-full w-full pt-10">
        <p className="absolute left-4 top-2 text-xs font-bold">
          {widget.raw.displayedName}
        </p>
        <div className="absolute right-1 top-1">
          <Button.Icon tabIndex={-1} icon="close" onClick={onClose} />
        </div>
        <WidgetBody widget={widget} />
      </Panel>
    </div>
  );
};
