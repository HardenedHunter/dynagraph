import { createTRPCRouter } from "./trpc";
import { widgetRouter } from "./routers/widget";

export const appRouter = createTRPCRouter({
  widget: widgetRouter,
});

export type AppRouter = typeof appRouter;
