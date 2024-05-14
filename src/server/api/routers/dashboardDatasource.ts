import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createDashboardDatasourceSchema } from "~/server/contracts";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const defaultDashboardDatasourceSelect =
  Prisma.validator<Prisma.DashboardDatasourceSelect>()({
    id: true,
    dashboardId: true,
    name: true,
    url: true,
  });

export const dashboardDatasourceRouter = createTRPCRouter({
  getDatasourcesByDashboardId: publicProcedure
    .input(z.string().min(1))
    .query(({ ctx, input }) => {
      return ctx.db.dashboardDatasource.findMany({
        select: defaultDashboardDatasourceSelect,
        where: { dashboardId: input },
      });
    }),
  addDatasourceToDashboard: publicProcedure
    .input(createDashboardDatasourceSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboardDatasource.create({
        data: input,
      });
    }),
  removeDatasourceFromDashboard: publicProcedure
    .input(z.string().min(1))
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboardDatasource.delete({
        where: { id: input },
      });
    }),
});
