import z from "zod";

import { widgetNameSchema, widgetSourceSchema } from "./shared";

export const createWidgetSchema = z.object({
  name: widgetNameSchema(),
  source: widgetSourceSchema(),
});

export type CreateWidgetContract = z.infer<typeof createWidgetSchema>;
