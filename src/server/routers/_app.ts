import { router } from "../trpc";
import { helloRouter } from "./hello";
import { userRouter } from "./user";
import { productRouter } from "./product";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
