import { Prisma } from "@prisma/client";

import { commonSchemas, createDashboardWidgetSchema } from "~/server/contracts";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const defaultDashboardWidgetSelect =
  Prisma.validator<Prisma.DashboardWidgetSelect>()({
    id: true,
    dashboardId: true,
    datasourceId: true,
    widget: true,
    displayedName: true,
  });

export const dashboardWidgetRouter = createTRPCRouter({
  getWidgetsByDashboardId: publicProcedure
    .input(commonSchemas.id())
    .query(({ ctx, input }) => {
      return ctx.db.dashboardWidget.findMany({
        select: defaultDashboardWidgetSelect,
        where: { dashboardId: input },
      });
    }),
  addWidgetToDashboard: publicProcedure
    .input(createDashboardWidgetSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboardWidget.create({
        data: input,
      });
    }),
  removeWidgetFromDashboard: publicProcedure
    .input(commonSchemas.id())
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboardWidget.delete({
        where: { id: input },
      });
    }),
});
