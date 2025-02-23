import { Product } from "@/types/product";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import axios from "axios";
// import { z } from "zod";

export const productRouter = router({
  getAllProducts: publicProcedure.query(async () => {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  }),
});
