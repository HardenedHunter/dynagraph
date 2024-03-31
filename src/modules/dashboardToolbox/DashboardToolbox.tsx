import { FC } from "react";
import { Dashboard } from "@prisma/client";

import { AddWidgetToDashboardButton } from "~/features/addWidgetToDashboard";

type DashboardToolboxProps = {
  dashboard: Dashboard;
};

export const DashboardToolbox: FC<DashboardToolboxProps> = ({ dashboard }) => {
  return (
    <section>
      <AddWidgetToDashboardButton dashboardId={dashboard.id} />
    </section>
  );
};
