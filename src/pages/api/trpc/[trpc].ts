import { appRouter } from "@/server/routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "@/server/trpc";
import dbConnect from "@/lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    return trpcNext.createNextApiHandler({
      router: appRouter,
      createContext,
      onError({ error, type, path, input }) {
        console.error(`
          Error occurred on ${path}:
          Type: ${type}
          Input: ${JSON.stringify(input)}
          Error: ${error.message}
          Stack: ${error.stack}
        `);

        if (error.code === "INTERNAL_SERVER_ERROR") {
          console.error("Something went wrong", error);
        }
      },
    })(req, res);
  } catch (err) {
    console.error("Failed to handle request:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
