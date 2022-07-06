import { ProductType } from "@prisma/client";
import { z } from "zod";
import { createProductValidator } from "../../shared/create-product-validator";
import { prisma } from "../db";
import { createRouter } from "./context";

export const productRouter = createRouter()
  .query("list", {
    async resolve({ ctx }) {
      if (!ctx.user) return [];

      return await prisma.product.findMany({
        include: {
          tags: true,
        },
      });
    },
  })
  .query("get", {
    input: z.object({ id: z.number().positive() }),
    async resolve({ input, ctx }) {
      if (!ctx.user) return [];

      return await prisma.product.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("create", {
    input: createProductValidator,
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      const tags = input.tags ?? [];
      return await prisma.product.create({
        data: {
          name: input.name,
          brand: input.brand,
          description: input.description,
          type: input.type as unknown as ProductType,
          price: input.price,
          tags: {
            connect: tags.map((tagId) => ({ id: tagId })),
          },
        },
      });
    },
  });
