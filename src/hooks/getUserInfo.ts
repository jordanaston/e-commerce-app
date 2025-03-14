import { trpc } from "@/utils/trpc";
import { useLocalStorage } from "./useLocalStorage";

export const useGetUserInfo = () => {
  const [token] = useLocalStorage("token");
  const { data: user, isLoading } = trpc.user.getLoggedInUser.useQuery(
    undefined,
    {
      staleTime: Infinity,
      enabled: !!token,
      retry: false,
      initialData: undefined,
    }
  );

  return { user, isLoading };
};
