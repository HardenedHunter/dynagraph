import { createEffect, createEvent, createStore, sample } from "effector";

import { apiClient, RouterOutputs } from "~/shared/api";

type WidgetsStore = RouterOutputs["widget"]["getWidgets"];

const $widgets = createStore<WidgetsStore>([]);

const getWidgets = createEvent();

const getWidgetsFx = createEffect(apiClient.widget.getWidgets.query);

sample({ clock: getWidgets, target: getWidgetsFx });
sample({ clock: getWidgetsFx.doneData, target: $widgets });

export const model = {
  $widgets,
  getWidgets,
};
