import { FC } from "react";
import { useUnit } from "effector-react";

import {
  BlockLoader,
  Button,
  confirmationModal,
  ModalWindow,
  Panel,
} from "~/shared/ui";
import { api } from "~/shared/api";
import { createModalActions } from "~/shared/misc";
import { addDatasourceModal } from "./add-datasource-modal";
import { Datasource, model } from "../model";

const name = "DashboardDatasourcesModal";

type DashboardDatasourcesModalProps = {
  dashboardId: string;
};

const DashboardDatasourcesModal: FC<DashboardDatasourcesModalProps> = ({
  dashboardId,
}) => {
  const [datasources, isLoading, getDatasources] = useUnit([
    model.$datasourcesArray,
    model.$pending,
    model.getDatasources,
  ]);

  const mutation =
    api.dashboardDatasource.removeDatasourceFromDashboard.useMutation({
      onSuccess: async () => {
        await confirmationModal.close();
        getDatasources(dashboardId);
        dashboardDatasourcesModal.open({ dashboardId });
      },
    });

  const handleRemove = async (entity: Datasource) => {
    await dashboardDatasourcesModal.close();
    confirmationModal.open({
      title: "Удалить источник данных",
      description: `Вы уверены, что хотите удалить источник данных "${entity.name}"?`,
      onConfirm: async () => {
        await mutation.mutateAsync(entity.id);
      },
      onCancel: () => dashboardDatasourcesModal.open({ dashboardId }),
      confirmProps: { variant: "error" },
    });
  };

  const handleAdd = async () => {
    await dashboardDatasourcesModal.close();
    addDatasourceModal.open({
      dashboardId,
      onAdd: () => {
        getDatasources(dashboardId);
        dashboardDatasourcesModal.open({ dashboardId });
      },
    });
  };

  const renderEmpty = !isLoading && !datasources.length;
  const renderItems = !isLoading && !!datasources.length;

  return (
    <ModalWindow title="Источники данных">
      <div className="h-80">
        {isLoading && <BlockLoader />}
        {renderEmpty && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="text-xl">У этой панели еще нет источников данных!</p>
            <Button onClick={handleAdd}>Добавить источник</Button>
          </div>
        )}
        {renderItems && (
          <div className="h-full overflow-y-auto">
            <Button onClick={handleAdd} tabIndex={-1}>
              Добавить источник данных
            </Button>
            <ul className="mt-6 flex flex-col gap-2">
              {datasources.map(({ entity }) => (
                <li key={entity.id}>
                  <Panel className="grid grid-cols-[150px_1fr_24px] gap-4 !bg-neutral-100">
                    <p
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      title={entity.name}
                    >
                      {entity.name}
                    </p>
                    <p
                      className="overflow-hidden text-ellipsis whitespace-nowrap underline"
                      title={entity.url}
                    >
                      {entity.url}
                    </p>
                    <Button.Icon
                      icon="trash"
                      iconProps={{ size: "sm" }}
                      onClick={() => handleRemove(entity)}
                      tabIndex={-1}
                    />
                  </Panel>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ModalWindow>
  );
};

export const dashboardDatasourcesModal = createModalActions({
  name,
  Component: DashboardDatasourcesModal,
});