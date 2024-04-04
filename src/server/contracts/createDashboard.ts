import z from "zod";

import { validation } from "~/shared/misc";

export const createDashboardSchema = z.object({
  name: z.preprocess(validation.trim, z.string().min(1).max(64)),
  icon: z.string().min(1).max(32),
  color: z.string().min(1).max(32),
});

export type CreateDashboardContract = z.infer<typeof createDashboardSchema>;
