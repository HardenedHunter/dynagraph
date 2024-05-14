import { FC } from "react";
import { useGate, useUnit } from "effector-react";

import {
  Button,
  confirmationModal,
  Icon,
  ModalWindow,
  Panel,
} from "~/shared/ui";
import { api } from "~/shared/api";
import { createModalActions } from "~/shared/misc";
import { addDatasourceModal } from "./AddDatasourceModal";
import { Datasource, model } from "../model";

const name = "DashboardDatasourcesModal";

type DashboardDatasourcesModalProps = {
  dashboardId: string;
};

const DashboardDatasourcesModal: FC<DashboardDatasourcesModalProps> = ({
  dashboardId,
}) => {
  const [datasources, isLoading] = useUnit([
    model.$datasources,
    model.$pending,
  ]);

  useGate(model.Gate, dashboardId);

  const mutation =
    api.dashboardDatasource.removeDatasourceFromDashboard.useMutation({
      onSuccess: async () => {
        await confirmationModal.close();
        dashboardDatasourcesModal.push({ dashboardId });
      },
    });

  const handleRemove = async (d: Datasource) => {
    await dashboardDatasourcesModal.close();
    confirmationModal.push({
      title: "Remove datasource",
      description: `Are you sure you want to delete datasource "${d.name}"?`,
      onConfirm: async () => {
        await mutation.mutateAsync(d.id);
      },
      onCancel: () => dashboardDatasourcesModal.push({ dashboardId }),
    });
  };

  const handleAdd = async () => {
    await dashboardDatasourcesModal.close();
    addDatasourceModal.push({
      dashboardId,
      onAdd: () => dashboardDatasourcesModal.push({ dashboardId }),
    });
  };

  const renderEmpty = !isLoading && !datasources.length;
  const renderItems = !isLoading && !!datasources.length;

  return (
    <ModalWindow title="Datasources">
      <div className="h-96">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Icon icon="spinner" className="animate-spin" />
          </div>
        )}
        {renderEmpty && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="text-xl">This dashboard has no datasources!</p>
            <Button onClick={handleAdd}>Add datasource</Button>
          </div>
        )}
        {renderItems && (
          <div className="h-full overflow-y-scroll">
            <Button onClick={handleAdd}>Add datasource</Button>
            <ul className="mt-6 flex flex-col gap-2">
              {datasources.map((d) => (
                <li key={d.id}>
                  <Panel className="grid grid-cols-[100px_1fr_24px] gap-4 !bg-neutral-100">
                    <p
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      title={d.name}
                    >
                      {d.name}
                    </p>
                    <p
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      title={d.url}
                    >
                      {d.url}
                    </p>
                    <Button.Icon
                      icon="trash"
                      iconProps={{ size: "sm" }}
                      onClick={() => handleRemove(d)}
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
