import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createDashboardWidgetSchema } from "~/server/contracts";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const defaultDashboardWidgetSelect =
  Prisma.validator<Prisma.DashboardWidgetSelect>()({
    id: true,
    dashboardId: true,
    widget: true,
  });

export const dashboardWidgetRouter = createTRPCRouter({
  getWidgetsByDashboardId: publicProcedure
    .input(z.string().min(1))
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
    .input(z.string().min(1))
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboardWidget.delete({
        where: { id: input },
      });
    }),
});
