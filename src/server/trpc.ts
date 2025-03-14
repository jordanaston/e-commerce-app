import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";

type JWTPayload = {
  userId: string;
  username: string;
};

interface Context {
  user?: JWTPayload;
}

export const createContext = async ({ req }: CreateNextContextOptions) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { user: undefined };
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return { user: decoded };
  } catch {
    return { user: undefined };
  }
};

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
