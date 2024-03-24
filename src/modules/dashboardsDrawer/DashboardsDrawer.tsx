import { FC } from "react";
import { useUnit } from "effector-react";

import { CreateDashboardButton } from "~/features/createDashboard";
import { DashboardCover } from "~/entities/dashboardCover";
import { model } from "./model";
import Link from "next/link";

export const DashboardsDrawer: FC = () => {
  const [dashboards, getDashboards] = useUnit([
    model.$dashboards,
    model.getDashboards,
  ]);

  return (
    <div className="border-r-[1px] border-neutral-300 bg-neutral-50">
      <div className="p-4">
        <CreateDashboardButton onCreate={getDashboards} />
      </div>
      <div className="flex flex-col gap-4 border-t-[1px] border-neutral-300 p-4">
        {dashboards.map((dashboard) => (
          <Link key={dashboard.id} href={`/dashboards/${dashboard.id}`}>
            <DashboardCover
              icon={dashboard.icon}
              backgroundColor={dashboard.color}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
