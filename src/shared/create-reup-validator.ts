import { z } from "zod";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

const priceSchema = z.preprocess((arg) => {
  if (typeof arg == "string") return parseInt(arg);
  return arg;
}, z.number().min(0.01));

export const createReUpValidator = z.object({
  date: dateSchema,
  title: z.string().min(5).max(255),
  from: z.string().min(5).max(255).optional(),
  total: priceSchema.optional(),
  thoughts: z.string().min(5).max(1000).optional(),
  products: z
    .array(
      z.object({
        value: z.number().min(1),
        label: z.string(),
        extra: z.string().optional(),
      })
    )
    .optional(),
});

export type CreateReUpInputType = z.infer<typeof createReUpValidator>;
