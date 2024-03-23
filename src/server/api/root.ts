import { createTRPCRouter } from "./trpc";
import { widgetRouter } from "./routers/widget";
import { dashboardRouter } from "./routers/dashboard";

export const appRouter = createTRPCRouter({
  widget: widgetRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
