import { FC } from "react";
import { useUnit } from "effector-react";

import { model } from "./model";

type DashboardWidgetsProps = {
  dashboardId: string;
};

export const DashboardWidgets: FC<DashboardWidgetsProps> = ({
  dashboardId,
}) => {
  const dashboardWidgets = useUnit(model.$dashboardWidgets);

  if (!dashboardWidgets.length) {
    return (
      <section className="flex flex-grow flex-col items-center justify-center gap-6">
        <h2 className="text-4xl font-bold">This dashboard is empty!</h2>
      </section>
    );
  }

  return <section></section>;
};
