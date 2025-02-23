import { User } from "@/types/user";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import axios from "axios";

export const userRouter = router({
  getAllUsers: publicProcedure.query(async () => {
    const response = await axios.get<User[]>("https://fakestoreapi.com/users");
    return response.data;
  }),
});
