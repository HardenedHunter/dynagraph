import { createEffect, createEvent, createStore, sample } from "effector";
import { Dashboard } from "@prisma/client";

import { apiClient } from "~/shared/api";

const $dashboard = createStore<Dashboard | null>(null);

const getDashboard = createEvent<string>();

const getDashboardFx = createEffect(apiClient.dashboard.getDashboardById.query);

sample({ clock: getDashboard, target: getDashboardFx });

sample({ clock: getDashboardFx.doneData, target: $dashboard });

export const model = {
  $dashboard,
  getDashboard,
};
