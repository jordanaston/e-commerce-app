import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/user.models";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(3, "Username must be at least 3 characters")
          .max(20, "Username must be less than 20 characters"),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
          ),
      })
    )
    .mutation(async ({ input }) => {
      const existingUser = await User.findOne({
        username: input.username,
      });
      if (existingUser) {
        throw new Error("Username already taken");
      }

      const user = await User.create({
        username: input.username,
        password: input.password,
      });

      return user.toObject({ hidePassword: true });
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await User.findOne({ username: input.username });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No user found with this username.",
        });
      }

      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        { userId: user._id.toString(), username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
        },
      };
    }),
  getLoggedInUser: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
