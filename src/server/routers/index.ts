import superjson from "superjson";

import { createRouter } from "./context";
import { productRouter } from "./products";
import { reUpRouter } from "./reups";
import { tagRouter } from "./tags";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("reups.", reUpRouter)
  .merge("products.", productRouter)
  .merge("tags.", tagRouter);

export type AppRouter = typeof appRouter;
