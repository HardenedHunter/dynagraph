import { Prisma } from "@prisma/client";

import { commonSchemas, createDashboardSchema } from "~/server/contracts";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const defaultDashboardSelect = Prisma.validator<Prisma.DashboardSelect>()({
  id: true,
  name: true,
  icon: true,
  color: true,
});

export const dashboardRouter = createTRPCRouter({
  getAllDashboards: publicProcedure.query(({ ctx }) => {
    return ctx.db.dashboard.findMany({
      select: defaultDashboardSelect,
    });
  }),
  getDashboardById: publicProcedure
    .input(commonSchemas.id())
    .query(({ ctx, input }) => {
      return ctx.db.dashboard.findFirstOrThrow({
        where: { id: input },
        select: defaultDashboardSelect,
      });
    }),
  createDashboard: publicProcedure
    .input(createDashboardSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboard.create({
        data: input,
      });
    }),
  deleteDashboard: publicProcedure
    .input(commonSchemas.id())
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboard.delete({ where: { id: input } });
    }),
});
