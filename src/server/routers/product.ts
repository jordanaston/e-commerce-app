import { Product } from "@/types/product";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import axios from "axios";
import { z } from "zod";

export const productRouter = router({
  getAllProducts: publicProcedure.input(z.object({})).query(async () => {
    const response = await axios.get<Product[]>(
      `https://fakestoreapi.com/products`
    );
    return {
      products: response.data,
      nextCursor: response.data.length
        ? String(response.data[response.data.length - 1].id)
        : null,
    };
  }),
  getProductById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const response = await axios.get<Product>(
        `https://fakestoreapi.com/products/${input.id}`
      );
      return response.data;
    }),
  getProductsByIds: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }) => {
      const products = await Promise.all(
        input.ids.map((id) =>
          axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.data)
        )
      );
      return products;
    }),
});
