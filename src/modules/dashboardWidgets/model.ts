import { createEffect, createEvent, createStore, sample } from "effector";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { apiClient } from "~/shared/api";

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
  id: string;
  widgetId: string;
  dashboardId: string;
  datasourceId: string | null;
  displayedName: string;
  serialized: SerializedWidget;
};

const $widgets = createStore<DashboardWidget[]>([]);

const getWidgets = createEvent<string>();

const getWidgetsFx = createEffect(async (dashboardId: string) => {
  const dashboardWidgets =
    await apiClient.dashboardWidget.getWidgetsByDashboardId.query(dashboardId);

  return await Promise.all(
    dashboardWidgets.map(
      async ({ id, dashboardId, datasourceId, displayedName, widget }) => {
        return {
          id,
          dashboardId,
          datasourceId,
          displayedName,
          widgetId: widget.id,
          serialized: await serializeRawWidget(widget),
        };
      },
    ),
  );
});

sample({ clock: getWidgets, target: getWidgetsFx });
sample({ clock: getWidgetsFx.doneData, target: $widgets });

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
sample({ clock: getWidgets, target: closeFullscreen });

export const model = {
  $widgets,
  getWidgets,
  $fullscreenWidget,
  openFullscreen,
  closeFullscreen,
};
