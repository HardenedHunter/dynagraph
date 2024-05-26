import { FC } from "react";

import { Button, Panel } from "~/shared/ui";

export const Dashboards: FC = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-10">
      <h2 className="text-4xl font-bold">Добро пожаловать в Dynagraph</h2>
      <div className="grid w-full max-w-3xl grid-cols-2 grid-rows-1 gap-2">
        <Panel className="flex flex-col justify-between gap-8">
          <p>
            Начните с добавления новой панели индикаторов или выберите одну
            из существующих в панели слева
          </p>
          <Button>Добавить</Button>
        </Panel>
        <Panel className="flex flex-col justify-between gap-8">
          <p>Исследуйте библиотеку виджетов и загрузите ваш собственный</p>
          <Button variant="secondary">Перейти в библиотеку</Button>
        </Panel>
      </div>
    </div>
  );
};
