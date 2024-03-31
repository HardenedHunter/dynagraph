import { useUnit } from "effector-react";
import { FC } from "react";

import { model } from "./model";
import { DashboardToolbox } from "~/modules/dashboardToolbox";
import { DashboardWidgets } from "~/modules/dashboardWidgets";

export const Dashboard: FC = () => {
  const dashboard = useUnit(model.$dashboard);

  if (!dashboard) return null;

  return (
    <div className="flex min-h-full flex-col p-4">
      <DashboardToolbox dashboard={dashboard} />
      <DashboardWidgets dashboardId={dashboard.id} />
    </div>
  );
};
