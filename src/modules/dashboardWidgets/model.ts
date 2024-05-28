import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import isEqual from "lodash/isEqual";

import { apiClient, RouterOutputs } from "~/shared/api";

type RawWidget =
  RouterOutputs["dashboardWidget"]["getWidgetsByDashboardId"][number];

export type SerializedWidget =
  | {
      mdxSource: MDXRemoteSerializeResult;
      error: undefined;
    }
  | {
      mdxSource: undefined;
      error: string;
    };

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
      return {
        raw: dashboardWidget,
        serialized: await serializeRawWidget(dashboardWidget.widget),
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

const serializeRawWidget = async (raw: { id: string; source: string }) => {
  try {
    return {
      id: raw.id,
      mdxSource: await serialize(raw.source, {
        mdxOptions: { development: process.env.NODE_ENV === "development" },
      }),
    };
  } catch (e) {
    return {
      id: raw.id,
      error: (e as Error).message,
    };
  }
};

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
