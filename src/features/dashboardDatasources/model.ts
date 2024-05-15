/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEffect, createEvent, createStore, sample } from "effector";
import { spread } from "patronum";

import { apiClient, RouterOutputs } from "~/shared/api";

export type Datasource =
  RouterOutputs["dashboardDatasource"]["getDatasourcesByDashboardId"][number];

type DatasourceStatus = "NOT_STARTED" | "PENDING" | "LOADED" | "FAILED";

export type DatasourceWithData = {
  entity: Datasource;
  status: DatasourceStatus;
  data: { result: unknown } | null;
};

type DatasourcesStore = Record<string, DatasourceWithData>;

const $datasources = createStore<DatasourcesStore>({});

const $datasourcesArray = $datasources.map((state) => Object.values(state));

const getDatasources = createEvent<string>();

const getDatasourcesFx = createEffect(
  apiClient.dashboardDatasource.getDatasourcesByDashboardId.query,
);

const getDataForDatasource = createEvent<string>();

const getDataForDatasourceFx = createEffect(async (entity: Datasource) => {
  try {
    const result = await fetch(entity.url).then((res) => res.json());

    return { id: entity.id, data: { result }, status: "LOADED" } as const;
  } catch {
    return { id: entity.id, data: null, status: "FAILED" } as const;
  }
});

sample({
  clock: getDataForDatasource,
  source: $datasources,
  filter: (state, id) => {
    const datasource = state[id];

    return datasource !== undefined && datasource.status === "NOT_STARTED";
  },
  fn: (state, id) => {
    const newState = { ...state };
    const datasource = newState[id]!;

    newState[id] = { ...datasource, status: "PENDING" };

    return { entity: datasource.entity, newState };
  },
  target: spread({ entity: getDataForDatasourceFx, newState: $datasources }),
});

sample({
  clock: getDataForDatasourceFx.doneData,
  source: $datasources,
  filter: (state, result) => {
    const datasource = state[result.id];

    return datasource !== undefined && datasource.status === "PENDING";
  },
  fn: (state, result) => {
    const newState = { ...state };
    const datasource = newState[result.id]!;

    newState[result.id] = {
      ...datasource,
      data: result.data,
      status: result.status,
    };

    return newState;
  },
  target: $datasources,
});

sample({ clock: getDatasources, target: getDatasourcesFx });

sample({
  clock: getDatasourcesFx.doneData,
  source: $datasources,
  fn: (state, responses) => {
    const newState: DatasourcesStore = {};

    responses.forEach((entity) => {
      const existingDatasource = state[entity.id];

      if (existingDatasource) {
        newState[entity.id] = { ...existingDatasource, entity };
      } else {
        newState[entity.id] = { data: null, status: "NOT_STARTED", entity };
      }
    });

    return newState;
  },
  target: $datasources,
});

export const model = {
  getDatasources,
  getDataForDatasource,
  $datasources,
  $datasourcesArray,
  $pending: getDatasourcesFx.pending,
};
