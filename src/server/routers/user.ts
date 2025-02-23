import { User } from "@/types/user";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import axios from "axios";
import { z } from "zod";

export const userRouter = router({
  getAllUsers: publicProcedure.query(async () => {
    const response = await axios.get<User[]>("https://fakestoreapi.com/users");
    return response.data;
  }),

  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: input.username,
        password: input.password,
      });
      return response.data.token;
    }),
});
