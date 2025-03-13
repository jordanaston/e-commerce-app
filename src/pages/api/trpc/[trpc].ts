import { appRouter } from "@/server/routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "@/server/trpc";
import dbConnect from "@/lib/mongoose";

dbConnect().catch(console.error);

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error("Something went wrong", error);
    }
  },
});
