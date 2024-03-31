import { createEffect, createEvent, createStore, forward } from "effector";

import { apiClient, RouterOutputs } from "~/shared/api";

type DashboardWidgetsStore =
  RouterOutputs["dashboardWidget"]["getWidgetsByDashboardId"];

const $dashboardWidgets = createStore<DashboardWidgetsStore>([]);

const getDashboardWidgets = createEvent<string>();

const getDashboardWidgetsFx = createEffect(
  apiClient.dashboardWidget.getWidgetsByDashboardId.query,
);

forward({ from: getDashboardWidgets, to: getDashboardWidgetsFx });
forward({ from: getDashboardWidgetsFx.doneData, to: $dashboardWidgets });

export const model = {
  $dashboardWidgets,
  getDashboardWidgets,
};
