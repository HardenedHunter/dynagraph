import { useUnit } from "effector-react";
import clsx from "clsx";

import { model } from "../model";
import { WidgetGrid } from "./WidgetGrid";
import { FullscreenWidget } from "./FullscreenWidget";

type DashboardWidgetsProps = {
  onRemoveWidget?: () => void;
};

export const DashboardWidgets: FCC<DashboardWidgetsProps> = ({
  className,
  onRemoveWidget,
}) => {
  const [fullScreenWidget, closeFullscreen] = useUnit([
    model.$fullscreenWidget,
    model.closeFullscreen,
  ]);

  return (
    <div className={clsx(className, "relative flex flex-grow")}>
      <WidgetGrid
        className={clsx("flex-grow", fullScreenWidget && "invisible")}
        onRemoveWidget={onRemoveWidget}
      />
      {fullScreenWidget && (
        <FullscreenWidget widget={fullScreenWidget} onClose={closeFullscreen} />
      )}
    </div>
  );
};
