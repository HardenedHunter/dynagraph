import { z } from "zod";

export const commonSchemas = {
  id: () => z.string().cuid(),
};
