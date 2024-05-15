import { createEffect, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { or } from "patronum";

import { apiClient, RouterOutputs } from "~/shared/api";

type WidgetsStore = RouterOutputs["widget"]["getWidgets"];
type DatasourcesStore =
  RouterOutputs["dashboardDatasource"]["getDatasourcesByDashboardId"];

const $widgets = createStore<WidgetsStore>([]);
const $datasources = createStore<DatasourcesStore>([]);

const getWidgetsFx = createEffect(apiClient.widget.getWidgets.query);
const getDatasourcesFx = createEffect(
  apiClient.dashboardDatasource.getDatasourcesByDashboardId.query,
);

sample({ clock: getWidgetsFx.doneData, target: $widgets });
sample({ clock: getDatasourcesFx.doneData, target: $datasources });

const Gate = createGate<string>();

sample({ clock: Gate.open, target: getWidgetsFx });
sample({ clock: Gate.open, target: getDatasourcesFx });

export const model = {
  Gate,
  $widgets,
  $datasources,
  $pending: or(getWidgetsFx.pending, getDatasourcesFx.pending),
};
