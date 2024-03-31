import { createTRPCRouter } from "./trpc";
import { widgetRouter } from "./routers/widget";
import { dashboardRouter } from "./routers/dashboard";
import { dashboardWidgetRouter } from "./routers/dashboardWidget";

export const appRouter = createTRPCRouter({
  widget: widgetRouter,
  dashboard: dashboardRouter,
  dashboardWidget: dashboardWidgetRouter,
});

export type AppRouter = typeof appRouter;
