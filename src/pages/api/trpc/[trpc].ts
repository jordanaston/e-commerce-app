import { appRouter } from "@/server/routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "@/server/trpc";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
