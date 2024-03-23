import { Widget } from "@prisma/client";
import { createEffect, createEvent, createStore, forward } from "effector";

import { apiClient } from "~/shared/api";

const $widgets = createStore<Widget[]>([]);

const getWidgets = createEvent();

const getWidgetsFx = createEffect(apiClient.widget.getAllWidgets.query);

forward({ from: getWidgets, to: getWidgetsFx });
forward({ from: getWidgetsFx.doneData, to: $widgets });

export const model = {
  $widgets,
  getWidgets,
};
