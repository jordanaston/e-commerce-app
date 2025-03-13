import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/routers/_app";

function getAuthToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: "/api/trpc",
          headers() {
            const token = getAuthToken();
            return {
              Authorization: token ? `Bearer ${token}` : "",
            };
          },
        }),
      ],
    };
  },
});
