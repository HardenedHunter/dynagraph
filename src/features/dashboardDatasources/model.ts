import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

import { apiClient, RouterOutputs } from "~/shared/api";

type DatasourcesStore =
  RouterOutputs["dashboardDatasource"]["getDatasourcesByDashboardId"];

export type Datasource = DatasourcesStore[number];

const $datasources = createStore<DatasourcesStore>([]);

const getDatasources = createEvent<string>();

const getDatasourcesFx = createEffect(
  apiClient.dashboardDatasource.getDatasourcesByDashboardId.query,
);

sample({ clock: getDatasources, target: getDatasourcesFx });
sample({ clock: getDatasourcesFx.doneData, target: $datasources });

const Gate = createGate<string>();

sample({ clock: Gate.open, target: getDatasourcesFx });

export const model = {
  Gate,
  $datasources,
  $pending: getDatasourcesFx.pending,
};
