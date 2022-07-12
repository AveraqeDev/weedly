import { z } from "zod";

export const productValidator = z.array(
  z.object({
    value: z.number().min(1),
    label: z.string(),
    extra: z.string().optional(),
  })
);
