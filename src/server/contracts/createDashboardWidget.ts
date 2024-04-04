import z from "zod";

export const createDashboardWidgetSchema = z.object({
  widgetId: z.string().cuid(),
  dashboardId: z.string().cuid(),
});

export type CreateDashboardWidgetContract = z.infer<
  typeof createDashboardWidgetSchema
>;