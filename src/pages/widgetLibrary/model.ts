import { createEffect, createEvent, createStore, sample } from "effector";

import { apiClient, RouterOutputs } from "~/shared/api";

type WidgetsStore = RouterOutputs["widget"]["getAllWidgets"];

const $widgets = createStore<WidgetsStore>([]);

const getWidgets = createEvent();

const getWidgetsFx = createEffect(apiClient.widget.getAllWidgets.query);

sample({ clock: getWidgets, target: getWidgetsFx });
sample({ clock: getWidgetsFx.doneData, target: $widgets });

export const model = {
  $widgets,
  getWidgets,
};
