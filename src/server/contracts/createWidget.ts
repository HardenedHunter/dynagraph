import z from "zod";

import { validation } from "~/shared/misc";

export const createWidgetSchema = z.object({
  name: z.preprocess(validation.trim, z.string().min(1).max(64)),
  source: z.preprocess(
    validation.trim,
    z
      .string()
      .min(1)
      .max(2 ** 16),
  ),
});

export type CreateWidgetContract = z.infer<typeof createWidgetSchema>;
