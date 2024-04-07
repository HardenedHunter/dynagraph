import { createEffect, createEvent, createStore, sample } from "effector";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { apiClient } from "~/shared/api";

export type WidgetFetchResult =
  | {
      id: string;
      mdxSource: MDXRemoteSerializeResult;
      error: undefined;
    }
  | {
      id: string;
      mdxSource: undefined;
      error: string;
    };

const $widgets = createStore<WidgetFetchResult[]>([]);

const getWidgets = createEvent<string>();

const getWidgetsFx = createEffect(async (dashboardId: string) => {
  const widgets =
    await apiClient.dashboardWidget.getWidgetsByDashboardId.query(dashboardId);

  return await Promise.all(
    widgets.map((raw) => serializeRawWidget(raw.widget)),
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

export const model = {
  $widgets,
  getWidgets,
};
