import { FC, ReactNode } from "react";

import { DashboardsDrawer } from "~/modules/dashboards-drawer";

type DashboardsLayoutProps = {
  children: ReactNode;
};

export const DashboardsLayout: FC<DashboardsLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full">
      <DashboardsDrawer />
      <div className="flex-grow">{children}</div>
    </div>
  );
};
