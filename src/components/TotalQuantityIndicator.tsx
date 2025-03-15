import { useGetUserInfo } from "@/hooks/getUserInfo";
import { trpc } from "@/utils/trpc";

const TotalQuantityIndicator = () => {
  const { user } = useGetUserInfo();
  const { data: cart } = trpc.cart.getCart.useQuery(undefined, {
    enabled: !!user,
  });

  const totalQuantity =
    cart?.products.reduce(
      (total: number, item: { quantity: number }) => total + item.quantity,
      0
    ) || 0;

  if (totalQuantity === 0) return null;

  return (
    <div className="flex items-center justify-center bg-red text-white font-bold rounded-full w-3 h-3 text-[8px]">
      {totalQuantity}
    </div>
  );
};

export default TotalQuantityIndicator;
