import { FC } from "react";
import { Dashboard } from "@prisma/client";

import { AddWidgetToDashboardButton } from "~/features/addWidgetToDashboard";

type DashboardToolboxProps = {
  dashboard: Dashboard;
  onAddWidget?: () => void;
};

export const DashboardToolbox: FC<DashboardToolboxProps> = ({
  dashboard,
  onAddWidget,
}) => {
  return (
    <section>
      <AddWidgetToDashboardButton
        dashboardId={dashboard.id}
        onAdd={onAddWidget}
      />
    </section>
  );
};
