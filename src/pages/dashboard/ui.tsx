import { FC } from "react";
import { useGate, useUnit } from "effector-react";
import { useRouter } from "next/router";

import { DashboardToolbox } from "~/modules/dashboardToolbox";
import {
  DashboardWidgets,
  dashboardWidgetsModel,
} from "~/modules/dashboardWidgets";
import { dashboardDatasourcesModel } from "~/features/dashboardDatasources";
import { model } from "./model";

export const Dashboard: FC = () => {
  const dashboard = useUnit(model.$dashboard);
  const router = useRouter();

  useGate(model.UnmountGate);
  useGate(dashboardWidgetsModel.UnmountGate);
  useGate(dashboardDatasourcesModel.UnmountGate);

  if (!dashboard) return null;

  const handleWidgetAddition = () => {
    void router.replace(router.asPath);
  };

  const handleWidgetRemoval = () => {
    void router.replace(router.asPath);
  };

  const handleDashboardDeletion = () => {
    void router.replace("/dashboards");
  };

  return (
    <div
      key={dashboard.id}
      className="flex h-[calc(100vh-64px)] flex-col overflow-y-scroll p-4"
    >
      <DashboardToolbox
        dashboard={dashboard}
        onAddWidget={handleWidgetAddition}
        onDeleteDashboard={handleDashboardDeletion}
      />
      <DashboardWidgets className="mt-6" onRemoveWidget={handleWidgetRemoval} />
    </div>
  );
};
