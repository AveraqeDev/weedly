import { z } from "zod";
import { SelectOption } from "../../shared/interfaces/SelectOption";
import { createReUpValidator } from "../../shared/create-reup-validator";
import { prisma } from "../db";
import { createRouter } from "./context";
import { productValidator } from "../../shared/product-validator";

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
      const reUp = await prisma.reUp.findFirst({
        where: { id: input.id },
        include: { products: true, updates: true },
      });
      if (!reUp) throw new Error(`No Reup found with id ${input.id}`);
      if (reUp.user !== ctx.user.email) throw new Error("Unauthorized");
      await prisma.reUpProduct.deleteMany({
        where: {
          reUpId: input.id,
        },
      });
      await prisma.reUpUpdate.deleteMany({ where: { reUpId: input.id } });
      return await prisma.reUp.delete({
        where: { id: input.id },
      });
    },
  })
  .mutation("create", {
    input: createReUpValidator,
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      const products: SelectOption<number>[] = input.products ?? [];
      return await prisma.reUp.create({
        data: {
          user: ctx.user.email,
          date: input.date,
          title: input.title,
          from: input.from,
          total: input.total,
          thoughts: input.thoughts ?? "",
          products: {
            create: products.map((product) => ({
              productId: product.value,
            })),
          },
        },
      });
    },
  })
  .mutation("add-products", {
    input: z.object({ id: z.number(), products: productValidator.min(1) }),
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      const reUp = await prisma.reUp.findFirst({ where: { id: input.id } });
      if (!reUp) throw new Error(`No Reup found with id ${input.id}`);
      if (reUp.user !== ctx.user.email) throw new Error("Unauthorized");
      return await prisma.reUp.update({
        where: {
          id: input.id,
        },
        data: {
          products: {
            createMany: {
              data: input.products.map((product) => ({
                productId: product.value,
              })),
            },
          },
        },
      });
    },
  })
  .mutation("add-update", {
    input: z.object({
      id: z.number(),
      text: z.string().min(5).max(1000),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      const reUp = await prisma.reUp.findFirst({ where: { id: input.id } });
      if (!reUp) throw new Error(`No Reup found with id ${input.id}`);
      if (reUp.user !== ctx.user.email) throw new Error("Unauthorized");
      return await prisma.reUpUpdate.create({
        data: { reUpId: input.id, text: input.text },
      });
    },
  })
  // DEV MUTATION, PLEASE REMOVE
  .mutation("remove-orphans", {
    async resolve(_) {
      try {
        const products = await prisma.reUpProduct.deleteMany({
          where: {
            reUp: undefined,
          },
        });
        const updates = await prisma.reUpUpdate.deleteMany({
          where: {
            reUp: undefined,
          },
        });
        return {
          status: "success",
          message: `Successfully removed ${products.count} Products and ${updates.count} Updates`,
        };
      } catch (error) {
        return { status: "error", message: error };
      }
    },
  })
  .mutation("remove-product", {
    input: z.object({ id: z.number().min(1), reUpId: z.number().min(1) }),
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      const reUp = await prisma.reUp.findFirst({ where: { id: input.reUpId } });
      if (!reUp) throw new Error(`No Reup found with id ${input.id}`);
      if (reUp.user !== ctx.user.email) throw new Error("Unauthorized");
      return await prisma.reUpProduct.deleteMany({
        where: { productId: input.id, reUpId: input.reUpId },
      });
    },
  });
