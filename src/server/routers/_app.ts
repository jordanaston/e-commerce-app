import { router } from "../trpc";
import { helloRouter } from "./hello";
import { userRouter } from "./user";
import { productRouter } from "./product";
import { cartRouter } from "./cart";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  product: productRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
