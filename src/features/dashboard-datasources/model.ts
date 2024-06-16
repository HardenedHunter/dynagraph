/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { spread } from "patronum";

import { apiClient } from "~/shared/api";
import {
  Datasource,
  DatasourceState,
  DSEligibleForLoad,
  getLoadingState,
  getPostLoadingState,
  isEligibleForLoad,
  isLoading,
  DSLoading,
} from "./lib";

type DatasourcesStore = Record<string, DatasourceState>;

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

    return { id: entity.id, data: { result } } as const;
  } catch {
    return { id: entity.id, data: null } as const;
  }
});

sample({
  clock: getDataForDatasource,
  source: $datasources,
  filter: (store, id) => {
    const datasource = store[id];

    if (!datasource) throw new Error("[FATAL] Datasource not found");

    return isEligibleForLoad(datasource);
  },
  fn: (store, id) => {
    const newState = { ...store };
    const datasource = newState[id] as DSEligibleForLoad;

    newState[id] = getLoadingState(datasource);

    return { entity: datasource.entity, newState };
  },
  target: spread({ entity: getDataForDatasourceFx, newState: $datasources }),
});

sample({
  clock: getDataForDatasourceFx.doneData,
  source: $datasources,
  filter: (store, result) => {
    const datasource = store[result.id];

    if (!datasource) throw new Error("[FATAL] Datasource not found");

    return isLoading(datasource);
  },
  fn: (store, result) => {
    const newState = { ...store };
    const datasource = newState[result.id] as DSLoading;

    newState[result.id] = getPostLoadingState(datasource, result.data);

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

const UnmountGate = createGate();

$datasources.reset(UnmountGate.close);

export const model = {
  getDatasources,
  getDataForDatasource,
  $datasources,
  $datasourcesArray,
  $pending: getDatasourcesFx.pending,
  UnmountGate,
};
