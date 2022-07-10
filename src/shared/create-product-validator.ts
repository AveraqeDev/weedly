import { z } from "zod";

const priceSchema = z.preprocess((arg) => {
  if (typeof arg == "string") return parseInt(arg);
  return arg;
}, z.number().min(0.01));

export const createProductValidator = z.object({
  name: z.string().min(4).max(255),
  brand: z.string().min(4).max(255),
  description: z.string().min(5).max(1000).optional(),
  type: z.object({
    value: z.string(),
    label: z.string(),
    extra: z.string().optional(),
  }),
  price: priceSchema,
  tags: z.array(
    z.object({
      value: z.number().min(1),
      label: z.string(),
      extra: z.string().optional(),
    })
  ),
});

export type CreateProductInputType = z.infer<typeof createProductValidator>;
