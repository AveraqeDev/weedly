import { ProductType } from "@prisma/client";
import { z } from "zod";
import { createProductValidator } from "../../shared/create-product-validator";
import { prisma } from "../db";
import { createRouter } from "./context";

type TagOption = {
  value: number;
  label: string;
  extra?: string;
};

export const productRouter = createRouter()
  .query("list", {
    async resolve({ ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");

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
  .query("user-favorites", {
    async resolve({ ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");

      return await prisma.userProductFavorite.findMany({
        where: {
          user: ctx.user.email,
        },
        include: {
          product: {
            include: {
              tags: true,
            },
          },
        },
      });
    },
  })
  .query("user-dislikes", {
    async resolve({ ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");

      return await prisma.userProductDislike.findMany({
        where: {
          user: ctx.user.email,
        },
        include: {
          product: {
            include: {
              tags: true,
            },
          },
        },
      });
    },
  })
  .query("user-ratings", {
    async resolve({ ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");

      return await prisma.productReview.findMany({
        where: {
          user: ctx.user.email,
        },
        include: {
          product: {
            include: {
              tags: true,
            },
          },
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
          type: input.type.value as unknown as ProductType,
          price: input.price,
          tags: {
            connect: tags.map((tag: TagOption) => ({ id: tag.value })),
          },
        },
      });
    },
  })
  .mutation("favorite", {
    input: z.object({ id: z.number().min(1) }),
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      return await prisma.userProductFavorite.create({
        data: { productId: input.id, user: ctx.user.email },
      });
    },
  })
  .mutation("dislike", {
    input: z.object({ id: z.number().min(1) }),
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      return await prisma.userProductDislike.create({
        data: { productId: input.id, user: ctx.user.email },
      });
    },
  })
  .mutation("rate", {
    input: z.object({
      id: z.number().min(1),
      rating: z.number().min(1).max(5),
      review: z.string().min(5).max(1000),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.user) throw new Error("Unauthorized");
      return await prisma.productReview.create({
        data: {
          productId: input.id,
          rating: input.rating,
          review: input.review,
          user: ctx.user.email,
        },
      });
    },
  });
