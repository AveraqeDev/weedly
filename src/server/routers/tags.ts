import { z } from "zod";
import { prisma } from "../db";
import { createRouter } from "./context";

export const tagRouter = createRouter()
  .query("list", {
    async resolve({ ctx }) {
      if (!ctx.user) return [];

      return await prisma.productTag.findMany();
    },
  })
  .query("get", {
    input: z.object({ id: z.number().positive() }),
    async resolve({ input, ctx }) {
      if (!ctx.user) return [];

      return await prisma.productTag.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  });
