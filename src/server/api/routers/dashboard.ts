import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createDashboardSchema } from "~/shared/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const defaultDashboardSelect = Prisma.validator<Prisma.DashboardSelect>()({
  id: true,
  name: true,
  icon: true,
  color: true,
  createdAt: true,
  updatedAt: true,
});

export const dashboardRouter = createTRPCRouter({
  getAllDashboards: publicProcedure.query(({ ctx }) => {
    return ctx.db.dashboard.findMany({
      select: defaultDashboardSelect,
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
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db.dashboard.delete({ where: { id: input } });
    }),
});
