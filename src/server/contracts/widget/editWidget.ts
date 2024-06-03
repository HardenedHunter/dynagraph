import z from "zod";

import { commonSchemas } from "../shared";
import { widgetNameSchema, widgetSourceSchema } from "./shared";

export const editWidgetSchema = z.object({
  id: commonSchemas.id(),
  name: widgetNameSchema(),
  source: widgetSourceSchema(),
});

export type EditWidgetContract = z.infer<typeof editWidgetSchema>;
