import { FC } from "react";
import { Dashboard } from "@prisma/client";

import { Button } from "~/shared/ui";
import { addWidgetToDashboardModal } from "~/features/addWidgetToDashboard";
import { dashboardDatasourcesModal } from "~/features/dashboardDatasources";

type DashboardToolboxProps = {
  dashboard: Dashboard;
  onAddWidget?: () => void;
};

export const DashboardToolbox: FC<DashboardToolboxProps> = ({
  dashboard,
  onAddWidget,
}) => {
  const handleAddWidget = () => {
    addWidgetToDashboardModal.open({
      dashboardId: dashboard.id,
      onAdd: onAddWidget,
    });
  };

  const handleOpenDatasources = () => {
    dashboardDatasourcesModal.open({ dashboardId: dashboard.id });
  };

  return (
    <section className="flex gap-2">
      <Button onClick={handleAddWidget}>Add widget</Button>
      <Button variant="secondary" onClick={handleOpenDatasources}>
        Datasources
      </Button>
    </section>
  );
};
