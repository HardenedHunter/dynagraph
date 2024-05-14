import { createTRPCRouter } from "./trpc";
import { widgetRouter } from "./routers/widget";
import { dashboardRouter } from "./routers/dashboard";
import { dashboardWidgetRouter } from "./routers/dashboardWidget";
import { dashboardDatasourceRouter } from "./routers/dashboardDatasource";

export const appRouter = createTRPCRouter({
  widget: widgetRouter,
  dashboard: dashboardRouter,
  dashboardWidget: dashboardWidgetRouter,
  dashboardDatasource: dashboardDatasourceRouter,
});

export type AppRouter = typeof appRouter;
