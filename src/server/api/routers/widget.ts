import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createWidgetSchema } from "~/shared/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const defaultWidgetSelect = Prisma.validator<Prisma.WidgetSelect>()({
  id: true,
  source: true,
  name: true,
});

export const widgetRouter = createTRPCRouter({
  getAllWidgets: publicProcedure.query(({ ctx }) => {
    return ctx.db.widget.findMany({
      select: defaultWidgetSelect,
    });
  }),
  createWidget: publicProcedure
    .input(createWidgetSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.widget.create({
        data: input,
        select: defaultWidgetSelect,
      });
    }),
  deleteWidget: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.widget.delete({ where: { id: input } });
  }),
});
