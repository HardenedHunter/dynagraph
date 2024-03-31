import { createEffect, createEvent, createStore, forward } from "effector";

import { apiClient, RouterOutputs } from "~/shared/api";

type WidgetsStore = RouterOutputs["widget"]["getAllWidgets"];

const $widgets = createStore<WidgetsStore>([]);

const getWidgets = createEvent();

const getWidgetsFx = createEffect(apiClient.widget.getAllWidgets.query);

forward({ from: getWidgets, to: getWidgetsFx });
forward({ from: getWidgetsFx.doneData, to: $widgets });

export const model = {
  $widgets,
  getWidgets,
};
