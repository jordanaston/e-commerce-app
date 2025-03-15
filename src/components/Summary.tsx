import { Button } from "@/components/ui/button";
import { useGetUserInfo } from "@/hooks/getUserInfo";
import { trpc } from "@/utils/trpc";
import { Divider } from "antd";
import { toast } from "sonner";
const Summary = () => {
  const { user } = useGetUserInfo();
  const utils = trpc.useUtils();
  const { data: cart } = trpc.cart.getCart.useQuery(undefined, {
    enabled: !!user,
  });

  const productIds =
    cart?.products.map((item: { productId: number }) => item.productId) || [];

  const { data: productData } = trpc.product.getProductsByIds.useQuery(
    { ids: productIds },
    { enabled: productIds.length > 0 }
  );

  const subtotal =
    productData?.reduce((total, product) => {
      const quantity =
        cart?.products.find(
          (p: { productId: number }) => p.productId === product.id
        )?.quantity || 0;
      return total + product.price * quantity;
    }, 0) || 0;

  const totalItems =
    cart?.products.reduce(
      (total: number, item: { quantity: number }) => total + item.quantity,
      0
    ) || 0;

  const shipping = totalItems * 5;
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + shipping + tax;

  const clearCart = trpc.cart.clearCart.useMutation({
    onSuccess: () => {
      utils.cart.getCart.invalidate();
      toast.success("Your order has been placed!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to place order");
    },
  });

  return (
    <>
      <div className="flex items-center gap-2">
        <p>Summary</p>
      </div>
      <Divider className="bg-black opacity-20 mt-4 mb-6" />
      <div className="flex justify-between mx-8">
        <div className="flex flex-col gap-4 w-[40%]">
          <div className="flex justify-between">
            <p className="text-grey-500">Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-grey-500">Estimated shipping:</p>
            <p>${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-grey-500">Estimated tax:</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-grey-500">Grand total:</p>
            <p className="font-bold">${grandTotal.toFixed(2)}</p>
          </div>
        </div>

        <Button className="w-[25%]" onClick={() => clearCart.mutate()}>
          {clearCart.isPending ? "Placing order..." : "Place order"}
        </Button>
      </div>
    </>
  );
};

export default Summary;
