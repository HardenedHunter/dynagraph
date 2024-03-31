import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createDashboardSchema } from "~/shared/schemas";
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
    .input(z.string().min(1))
    .query(({ ctx, input }) => {
      return ctx.db.dashboard.findFirstOrThrow({
        select: defaultDashboardSelect,
        where: { id: input },
      });
    }),
  createDashboard: publicProcedure
    .input(createDashboardSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboard.create({
        data: input,
        select: defaultDashboardSelect,
      });
    }),
  deleteDashboard: publicProcedure
    .input(z.string().min(1))
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboard.delete({ where: { id: input } });
    }),
});
