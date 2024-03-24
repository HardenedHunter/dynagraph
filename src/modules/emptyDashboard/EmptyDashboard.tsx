import { FC } from "react";

import { AddWidgetToDashboardButton } from "~/features/addWidgetToDashboard";

export const EmptyDashboard: FC = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6">
      <h2 className="text-4xl font-bold">This dashboard is empty!</h2>
      <AddWidgetToDashboardButton dashboardId="" />
    </div>
  );
};
