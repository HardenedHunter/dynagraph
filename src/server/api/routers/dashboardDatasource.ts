import { Prisma } from "@prisma/client";

import {
  commonSchemas,
  createDashboardDatasourceSchema,
} from "~/server/contracts";
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
    .input(commonSchemas.id())
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
    .input(commonSchemas.id())
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboardDatasource.delete({
        where: { id: input },
      });
    }),
});
