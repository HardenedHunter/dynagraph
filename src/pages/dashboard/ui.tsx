import { FC } from "react";
import { useGate, useUnit } from "effector-react";

import { DashboardToolbox } from "~/modules/dashboard-toolbox";
import {
  DashboardWidgets,
  dashboardWidgetsModel,
} from "~/modules/dashboard-widgets";
import { dashboardDatasourcesModel } from "~/features/dashboard-datasources";
import { model } from "./model";

export const Dashboard: FC = () => {
  const dashboard = useUnit(model.$dashboard);

  useGate(model.UnmountGate);
  useGate(dashboardWidgetsModel.UnmountGate);
  useGate(dashboardDatasourcesModel.UnmountGate);

  if (!dashboard) return null;

  return (
    <div
      key={dashboard.id}
      className="flex h-[calc(100vh-64px)] flex-col overflow-y-scroll p-4"
    >
      <DashboardToolbox dashboard={dashboard} />
      <DashboardWidgets dashboard={dashboard} className="mt-6" />
    </div>
  );
};
