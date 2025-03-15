import CartDescription from "@/components/CartDescription";
import Layout from "@/components/Layout";
import Summary from "@/components/Summary";
import { Button } from "@/components/ui/button";
import { useGetUserInfo } from "@/hooks/getUserInfo";
import { trpc } from "@/utils/trpc";
import { Divider } from "antd";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "sonner";
import { IoTrashOutline } from "react-icons/io5";

const Orders = () => {
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

  const clearCart = trpc.cart.clearCart.useMutation({
    onSuccess: () => {
      utils.cart.getCart.invalidate();
      toast.success("Cart cleared successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to clear cart");
    },
  });

  return (
    <Layout>
      <div className="min-h-screen max-w-screen-lg mx-auto p-8 pb-20 gap-16 sm:p-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p>Items in cart</p>
            <IoCartOutline className="text-xl" />
          </div>
          <Button
            variant={"link"}
            onClick={() => clearCart.mutate()}
            className="hover:text-red hover:no-underline text-sm font-normal"
          >
            {clearCart.isPending ? "Clearing..." : "Clear cart"}
            <IoTrashOutline className="text-xl" />
          </Button>
        </div>
        <Divider className="bg-black opacity-20 mt-2 mb-6" />
        {productData ? (
          productData.map((product, index) => (
            <div key={index} className="flex flex-col items-center mb-8">
              <CartDescription product={product} cart={cart} />
            </div>
          ))
        ) : (
          <p className="text-sm font-normal mb-24">
            Your cart is empty. Head to the store to add some items!
          </p>
        )}
        <Summary />
      </div>
    </Layout>
  );
};

export default Orders;
