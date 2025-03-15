import { router } from "../trpc";
import { userRouter } from "./user";
import { productRouter } from "./product";
import { cartRouter } from "./cart";

export const appRouter = router({
  user: userRouter,
  product: productRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
