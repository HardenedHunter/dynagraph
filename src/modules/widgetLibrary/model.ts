import { createEffect, createEvent, createStore, forward } from "effector";

import { apiClient } from "~/shared/api";

type LibraryWidget = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const $widgets = createStore<LibraryWidget[]>([]);

const getWidgets = createEvent();

const getWidgetsFx = createEffect(async () => {
  const widgets = await apiClient.widget.getAllWidgets.query();

  return widgets.map((w) => ({
    id: w.id,
    name: w.name,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }));
});

forward({ from: getWidgets, to: getWidgetsFx });
forward({ from: getWidgetsFx.doneData, to: $widgets });

export const model = {
  $widgets,
  getWidgets,
};
