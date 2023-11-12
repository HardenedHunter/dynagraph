import { createEffect, createEvent, createStore, forward } from "effector";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import { apiClient } from "~/shared/api";

type WidgetFetchResult =
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

const getWidgets = createEvent();

const getWidgetsFx = createEffect(async () => {
  const widgets = await apiClient.widget.getAllWidgets.query();

  return await Promise.all(widgets.map((raw) => serializeRawWidget(raw)));
});

forward({ from: getWidgets, to: getWidgetsFx });
forward({ from: getWidgetsFx.doneData, to: $widgets });

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
