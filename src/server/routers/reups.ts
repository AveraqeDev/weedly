import { z } from "zod";
import { createReUpValidator } from "../../shared/create-reup-validator";
import { prisma } from "../db";
import { createRouter } from "./context";

type ProductOption = {
  value: number;
  label: string;
  extra?: string;
};

export const reUpRouter = createRouter()
  .query("list", {
    async resolve({ ctx }) {
      if (!ctx.user) return [];

      return await prisma.reUp.findMany({
        where: {
          user: ctx.user.email,
        },
        include: {
          products: {
            select: {
              product: {
                include: {
                  tags: true,
                },
              },
              addedAt: true,
            },
          },
          updates: {
            select: {
              id: true,
              text: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      });
    },
  })
  .query("get", {
    input: z.object({ id: z.number().positive() }),
    async resolve({ input, ctx }) {
      if (!ctx.user) return [];

      return await prisma.reUp.findFirst({
        where: {
          id: input.id,
        },
        include: {
          products: {
            select: {
              product: true,
              addedAt: true,
            },
          },
          updates: {
            select: {
              id: true,
              text: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.number() }),
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      const reUp = await prisma.reUp.findFirst({ where: { id: input.id } });
      if (!reUp) throw new Error(`No Reup found with id ${input.id}`);
      if (reUp.user !== ctx.user.email) throw new Error("Unauthorized");
      return await prisma.reUp.delete({ where: { id: input.id } });
    },
  })
  .mutation("create", {
    input: createReUpValidator,
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      const products: ProductOption[] = input.products ?? [];
      return await prisma.reUp.create({
        data: {
          user: ctx.user.email,
          date: input.date,
          title: input.title,
          from: input.from,
          total: input.total,
          thoughts: input.thoughts ?? "",
          products: {
            create: products.map((product: ProductOption) => ({
              productId: product.value,
            })),
          },
        },
      });
    },
  });
