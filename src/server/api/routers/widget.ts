import { Prisma } from "@prisma/client";

import {
  commonSchemas,
  createWidgetSchema,
  editWidgetSchema,
} from "~/server/contracts";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const defaultWidgetSelect = Prisma.validator<Prisma.WidgetSelect>()({
  id: true,
  source: true,
  name: true,
});

export const widgetRouter = createTRPCRouter({
  getWidgets: publicProcedure.query(({ ctx }) => {
    return ctx.db.widget.findMany({
      select: defaultWidgetSelect,
    });
  }),
  getWidgetById: publicProcedure
    .input(commonSchemas.id())
    .query(({ ctx, input }) => {
      return ctx.db.widget.findFirstOrThrow({
        select: defaultWidgetSelect,
        where: { id: input },
      });
    }),
  createWidget: publicProcedure
    .input(createWidgetSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.widget.create({
        data: input,
      });
    }),
  editWidget: publicProcedure
    .input(editWidgetSchema)
    .mutation(({ ctx, input }) => {
      const { id, name, source } = input;

      return ctx.db.widget.update({
        where: { id },
        data: { name, source },
      });
    }),
  deleteWidget: publicProcedure
    .input(commonSchemas.id())
    .mutation(({ ctx, input }) => {
      return ctx.db.widget.delete({ where: { id: input } });
    }),
});
