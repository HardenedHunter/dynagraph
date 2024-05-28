import { useUnit } from "effector-react";
import { Dashboard } from "@prisma/client";
import clsx from "clsx";

import { model } from "../model";
import { WidgetGrid } from "./WidgetGrid";
import { FullscreenWidget } from "./FullscreenWidget";

type DashboardWidgetsProps = {
  dashboard: Dashboard;
};

export const DashboardWidgets: FCC<DashboardWidgetsProps> = ({
  className,
  dashboard,
}) => {
  const [fullScreenWidget, closeFullscreen] = useUnit([
    model.$fullscreenWidget,
    model.closeFullscreen,
  ]);

  return (
    <div className={clsx(className, "relative flex flex-grow")}>
      <WidgetGrid
        dashboardId={dashboard.id}
        className={clsx("flex-grow", fullScreenWidget && "invisible")}
      />
      {fullScreenWidget && (
        <FullscreenWidget widget={fullScreenWidget} onClose={closeFullscreen} />
      )}
    </div>
  );
};
