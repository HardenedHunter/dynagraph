import { createEffect, createEvent, createStore, forward } from "effector";

import { apiClient, RouterOutputs } from "~/shared/api";

type DashboardsStore = RouterOutputs["dashboard"]["getAllDashboards"];

const $dashboards = createStore<DashboardsStore>([]);

const getDashboards = createEvent();

const getDashboardsFx = createEffect(
  apiClient.dashboard.getAllDashboards.query,
);

forward({ from: getDashboards, to: getDashboardsFx });
forward({ from: getDashboardsFx.doneData, to: $dashboards });

export const model = {
  $dashboards,
  getDashboards,
};
