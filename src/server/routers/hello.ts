import { router } from "../trpc";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export const helloRouter = router({
  getGreeting: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.name ?? "world"}!`,
      };
    }),
});