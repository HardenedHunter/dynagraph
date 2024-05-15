import z from "zod";

export const createDashboardWidgetSchema = z.object({
  widgetId: z.string().cuid(),
  dashboardId: z.string().cuid(),
  datasourceId: z.string().optional(),
});

export type CreateDashboardWidgetContract = z.infer<
  typeof createDashboardWidgetSchema
>;
