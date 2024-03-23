import { FC } from "react";
import { useUnit } from "effector-react";

import { CreateDashboardButton } from "~/features/createDashboard";
import { DashboardCover } from "~/entities/dashboardCover";
import { model } from "./model";

export const DashboardsDrawer: FC = () => {
  const [dashboards, getDashboards] = useUnit([
    model.$dashboards,
    model.getDashboards,
  ]);

  return (
    <div className="flex flex-col gap-4 bg-neutral-50 p-3">
      <CreateDashboardButton onCreate={getDashboards} />
      {dashboards.map((dashboard) => (
        <DashboardCover
          key={dashboard.id}
          icon={dashboard.icon}
          backgroundColor={dashboard.color}
        />
      ))}
    </div>
  );
};
