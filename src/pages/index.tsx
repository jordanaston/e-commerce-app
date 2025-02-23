import { trpc } from "@/utils/trpc";

export default function Home() {
  const hello = trpc.hello.useQuery({ name: "tRPC" });
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {!hello.data ? "Loading..." : hello.data.greeting}
    </div>
  );
}
