import { Dashboard } from "@prisma/client";
import { createEffect, createEvent, createStore, forward } from "effector";

import { apiClient } from "~/shared/api";

const $dashboards = createStore<Dashboard[]>([]);

const getDashboards = createEvent();

const getDashboardsFx = createEffect(async () => {
  const dashboards = await apiClient.dashboard.getAllDashboards.query();
  console.log(dashboards);
  return dashboards;
});

forward({ from: getDashboards, to: getDashboardsFx });
forward({ from: getDashboardsFx.doneData, to: $dashboards });

export const model = {
  $dashboards,
  getDashboards,
};
