import z from "zod";

import { validation } from "~/shared/misc";

export const datasourceNameSchema = z.preprocess(
  validation.trim,
  z.string().min(1).max(64),
);

export const datasourceUrlSchema = z.string().min(1).max(512);

export const createDashboardDatasourceSchema = z.object({
  dashboardId: z.string().cuid(),
  name: datasourceNameSchema,
  url: datasourceUrlSchema,
});

export type CreateDashboardDatasourceContract = z.infer<
  typeof createDashboardDatasourceSchema
>;
