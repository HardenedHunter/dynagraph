import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import isEqual from "lodash/isEqual";

import { apiClient, RouterOutputs } from "~/shared/api";
import { SerializedWidget, serializeRawWidget } from "~/entities/widget";

type RawWidget =
  RouterOutputs["dashboardWidget"]["getWidgetsByDashboardId"][number];

export type DashboardWidget = {
  raw: RawWidget;
  serialized: SerializedWidget;
};

type DashboardWidgetsStore = Record<string, DashboardWidget>;

const $widgets = createStore<DashboardWidgetsStore>({});

const $widgetsArray = $widgets.map((state) => Object.values(state));

const getWidgets = createEvent<string>();

const getWidgetsFx = createEffect(async (dashboardId: string) => {
  const dashboardWidgets =
    await apiClient.dashboardWidget.getWidgetsByDashboardId.query(dashboardId);

  return await Promise.all(
    dashboardWidgets.map(async (dashboardWidget) => {
      const seriaized = await serializeRawWidget(dashboardWidget.widget.source);

      return {
        raw: dashboardWidget,
        serialized: { ...seriaized, id: dashboardWidget.widget.id },
      };
    }),
  );
});

sample({ clock: getWidgets, target: getWidgetsFx });

sample({
  clock: getWidgetsFx.doneData,
  source: $widgets,
  fn: (state, responses) => {
    const newState: DashboardWidgetsStore = {};

    responses.forEach((widget) => {
      const existingWidget = state[widget.raw.id];

      if (existingWidget && isEqual(existingWidget.raw, widget.raw)) {
        newState[widget.raw.id] = existingWidget;
      } else {
        newState[widget.raw.id] = widget;
      }
    });

    return newState;
  },
  target: $widgets,
});

const $fullscreenWidget = createStore<DashboardWidget | null>(null);

const openFullscreen = createEvent<DashboardWidget>();
const closeFullscreen = createEvent();

sample({ clock: openFullscreen, target: $fullscreenWidget });
sample({ clock: closeFullscreen, fn: () => null, target: $fullscreenWidget });

const UnmountGate = createGate();

$widgets.reset(UnmountGate.close);
$fullscreenWidget.reset(UnmountGate.close);

export const model = {
  $widgets,
  $widgetsArray,
  getWidgets,
  $fullscreenWidget,
  openFullscreen,
  closeFullscreen,
  UnmountGate,
};
