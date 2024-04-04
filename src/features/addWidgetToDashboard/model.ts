import { createEffect, createStore, sample } from "effector";
import { createGate } from "effector-react";

import { apiClient, RouterOutputs } from "~/shared/api";

type WidgetsStore = RouterOutputs["widget"]["getAllWidgets"];

const $widgets = createStore<WidgetsStore>([]);

const getWidgetsFx = createEffect(apiClient.widget.getAllWidgets.query);

sample({ clock: getWidgetsFx.doneData, target: $widgets });

const Gate = createGate();

sample({ clock: Gate.open, target: getWidgetsFx });

export const model = {
  Gate,
  $widgets,
  $pending: getWidgetsFx.pending,
};
