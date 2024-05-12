import { FC } from "react";
import { Dashboard } from "@prisma/client";

import { Button } from "~/shared/ui";
import { addWidgetToDashboardModal } from "~/features/addWidgetToDashboard";

type DashboardToolboxProps = {
  dashboard: Dashboard;
  onAddWidget?: () => void;
};

export const DashboardToolbox: FC<DashboardToolboxProps> = ({
  dashboard,
  onAddWidget,
}) => {
  const handleAdd = () => {
    addWidgetToDashboardModal.push({
      dashboardId: dashboard.id,
      onAdd: onAddWidget,
    });
  };

  return (
    <section>
      <Button onClick={handleAdd}>Add widget</Button>
    </section>
  );
};
