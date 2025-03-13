import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/routers/_app";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: "/api/trpc",
          headers() {
            const token = localStorage.getItem("token");
            return {
              Authorization: token ? `Bearer ${token}` : "",
            };
          },
        }),
      ],
    };
  },
});