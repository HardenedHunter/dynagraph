import { FC } from "react";
import Link from "next/link";
import { useUnit } from "effector-react";

import { Button, Panel } from "~/shared/ui";
import { createDashboardModal } from "~/features/createDashboard";
import { dashboardsDrawerModel } from "~/modules/dashboardsDrawer";

export const Dashboards: FC = () => {
  const getDashboards = useUnit(dashboardsDrawerModel.getDashboards);

  const handleCreate = () => {
    createDashboardModal.open({ onCreate: getDashboards });
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-10">
      <h2 className="text-4xl font-bold">Добро пожаловать в Dynagraph</h2>
      <div className="grid w-full max-w-3xl grid-cols-2 grid-rows-1 gap-2">
        <Panel className="flex flex-col justify-between gap-8">
          <p>
            Начните с добавления новой панели индикаторов или выберите одну
            из существующих в списке слева
          </p>
          <Button onClick={handleCreate}>Добавить</Button>
        </Panel>
        <Panel className="flex flex-col justify-between gap-8">
          <p>Исследуйте библиотеку виджетов и загрузите ваш собственный</p>
          <Link href="/library">
            <Button block variant="secondary">
              Перейти в библиотеку
            </Button>
          </Link>
        </Panel>
      </div>
    </div>
  );
};
