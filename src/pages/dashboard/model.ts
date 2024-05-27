import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { Dashboard } from "@prisma/client";

import { apiClient } from "~/shared/api";

const $dashboard = createStore<Dashboard | null>(null);

const getDashboard = createEvent<string>();

const getDashboardFx = createEffect(apiClient.dashboard.getDashboardById.query);

sample({ clock: getDashboard, target: getDashboardFx });

sample({ clock: getDashboardFx.doneData, target: $dashboard });

const UnmountGate = createGate();

$dashboard.reset(UnmountGate.close);

export const model = {
  $dashboard,
  getDashboard,
  UnmountGate,
};
