import superjson from "superjson";

import { createRouter } from "./context";
import { productRouter } from "./products";
import { reUpRouter } from "./reups";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("reups.", reUpRouter)
  .merge("products.", productRouter);

export type AppRouter = typeof appRouter;
