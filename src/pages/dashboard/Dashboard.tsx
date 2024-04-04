import { FC } from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/router";

import { DashboardToolbox } from "~/modules/dashboardToolbox";
import { DashboardWidgets } from "~/modules/dashboardWidgets";
import { model } from "./model";

export const Dashboard: FC = () => {
  const dashboard = useUnit(model.$dashboard);
  const router = useRouter();

  if (!dashboard) return null;

  const handleWidgetAdd = () => {
    void router.replace(router.asPath);
  };

  return (
    <div
      key={dashboard.id}
      className="flex max-h-[calc(100vh-64px)] flex-col overflow-y-scroll p-4"
    >
      <DashboardToolbox dashboard={dashboard} onAddWidget={handleWidgetAdd} />
      <DashboardWidgets className="mt-6" />
    </div>
  );
};
