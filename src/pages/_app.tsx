import { trpc } from "@/utils/trpc";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default trpc.withTRPC(App);
