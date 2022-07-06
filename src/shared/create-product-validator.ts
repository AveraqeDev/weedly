import { z } from "zod";

export const createProductValidator = z.object({
  name: z.string().min(4).max(255),
  brand: z.string().min(4).max(255),
  description: z.string().min(5).max(1000).optional(),
  type: z.string().min(5).max(255),
  price: z.number().min(0.01),
  tags: z.array(z.number().min(1)),
});

export type CreateProductInputType = z.infer<typeof createProductValidator>;
