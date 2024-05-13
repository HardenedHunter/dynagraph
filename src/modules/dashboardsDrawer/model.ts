import { createEffect, createEvent, createStore, sample } from "effector";

import { apiClient, RouterOutputs } from "~/shared/api";

type DashboardsStore = RouterOutputs["dashboard"]["getAllDashboards"];

const $dashboards = createStore<DashboardsStore>([]);

const getDashboards = createEvent();

const getDashboardsFx = createEffect(
  apiClient.dashboard.getAllDashboards.query,
);

sample({ clock: getDashboards, target: getDashboardsFx });
sample({ clock: getDashboardsFx.doneData, target: $dashboards });

export const model = {
  $dashboards,
  getDashboards,
};
