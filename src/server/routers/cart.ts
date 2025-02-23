import { router } from "../trpc";
import { z } from "zod";
import { publicProcedure } from "../trpc";
import axios from "axios";
import { Cart } from "@/types/cart";

export const cartRouter = router({
  getCart: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const response = await axios.get<Cart>(
        `https://fakestoreapi.com/carts/user/${input.userId}`
      );
      return response.data;
    }),
});
