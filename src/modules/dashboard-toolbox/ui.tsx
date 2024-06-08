import { FC } from "react";
import { Dashboard } from "@prisma/client";
import { useRouter } from "next/router";
import { useUnit } from "effector-react";

import { Button } from "~/shared/ui";
import { addWidgetToDashboardModal } from "~/features/add-widget-to-dashboard";
import { dashboardDatasourcesModal } from "~/features/dashboard-datasources";
import { useDeleteDashboard } from "~/features/delete-dashboard";
import { dashboardWidgetsModel } from "~/modules/dashboard-widgets";

type DashboardToolboxProps = {
  dashboard: Dashboard;
};

export const DashboardToolbox: FC<DashboardToolboxProps> = ({ dashboard }) => {
  const router = useRouter();

  const deleteDashboard = useDeleteDashboard(
    () => void router.replace("/dashboards"),
  );

  const getWidgets = useUnit(dashboardWidgetsModel.getWidgets);

  const handleAddWidget = () => {
    addWidgetToDashboardModal.open({
      dashboardId: dashboard.id,
      onAdd: () => getWidgets(dashboard.id),
    });
  };

  const handleOpenDatasources = () => {
    dashboardDatasourcesModal.open({ dashboardId: dashboard.id });
  };

  const handleDeleteDashboard = () => {
    deleteDashboard(dashboard.id);
  };

  return (
    <section className="flex gap-2">
      <Button onClick={handleAddWidget}>Добавить виджет</Button>
      <Button variant="secondary" onClick={handleOpenDatasources}>
        Источники данных
      </Button>
      <Button
        fillVariant="border"
        variant="error"
        onClick={handleDeleteDashboard}
      >
        Удалить панель
      </Button>
    </section>
  );
};
