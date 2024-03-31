import { Prisma } from "@prisma/client";
import { z } from "zod";

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
});
