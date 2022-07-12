import { Product, ProductTag, ReUp as PrismReUp } from "@prisma/client";

export type ReUp = PrismReUp & {
  products: {
    product: Product & {
      tags: ProductTag[];
    };
    addedAt: Date;
  }[];
  updates: {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
