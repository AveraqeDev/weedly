import { z } from "zod";

export const createReUpValidator = z.object({
  date: z.date(),
  title: z.string().min(5).max(255),
  from: z.string().min(5).max(255).optional(),
  total: z.number().min(0.01).optional(),
  thoughts: z.string().min(5).max(1000),
  products: z.array(z.number().min(1)).optional(),
});

export type CreateReUpInputType = z.infer<typeof createReUpValidator>;
