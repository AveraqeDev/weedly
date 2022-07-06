import { getSession } from "@auth0/nextjs-auth0";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = getSession(opts.req, opts.res);
  return { user: session?.user, req: opts?.req, res: opts?.res };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
