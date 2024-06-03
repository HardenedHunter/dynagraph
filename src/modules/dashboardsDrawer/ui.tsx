import { FC } from "react";
import Link from "next/link";
import { useUnit } from "effector-react";
import clsx from "clsx";
import { useRouter } from "next/router";

import { CreateDashboardButton } from "~/features/createDashboard";
import { DashboardCover } from "~/entities/dashboard";
import { model } from "./model";

export const DashboardsDrawer: FC = () => {
  const [dashboards, getDashboards] = useUnit([
    model.$dashboards,
    model.getDashboards,
  ]);

  const { asPath } = useRouter();

  return (
    <div className="max-h-[calc(100vh-64px)] overflow-y-scroll border-r-[1px] border-neutral-300 bg-neutral-50">
      <div className="p-4">
        <CreateDashboardButton onCreate={getDashboards} />
      </div>
      <div className="flex flex-col gap-4 border-t-[1px] border-neutral-300 p-4">
        {dashboards.map((dashboard) => (
          <div key={dashboard.id} className="relative flex items-center">
            <Link href={`/dashboards/${dashboard.id}`}>
              <DashboardCover
                icon={dashboard.icon}
                backgroundColor={dashboard.color}
                title={dashboard.name}
              />
            </Link>
            {asPath.includes(dashboard.id) && (
              <TriangleLeft className="absolute -right-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TriangleLeft: FCC = ({ className }) => {
  return (
    <div
      className={clsx(
        className,
        "border-y-8 border-l-0 border-r-8 border-solid border-y-transparent border-r-neutral-300",
      )}
    />
  );
};
