import { z } from "zod";

import { validation } from "~/shared/misc";

export const widgetNameSchema = () =>
  z.preprocess(validation.trim, z.string().min(1).max(64));

export const widgetSourceSchema = () =>
  z
    .string()
    .min(1)
    .max(2 ** 16);
