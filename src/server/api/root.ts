import { createTRPCRouter } from "~/server/api/trpc";
import { widgetRouter } from "~/shared/api/routers/widget";

export const appRouter = createTRPCRouter({
  widget: widgetRouter,
});

export type AppRouter = typeof appRouter;
