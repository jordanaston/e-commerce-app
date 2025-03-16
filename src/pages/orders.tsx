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
import { Loader2 } from "lucide-react";

const Orders = () => {
  const { user } = useGetUserInfo();
  const utils = trpc.useUtils();
  const {
    data: cart,
    isLoading: cartLoading,
    error: cartError,
  } = trpc.cart.getCart.useQuery(undefined, {
    enabled: !!user,
  });

  const productIds =
    cart?.products.map((item: { productId: number }) => item.productId) || [];

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = trpc.product.getProductsByIds.useQuery(
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

  if (cartLoading || productLoading)
    return (
      <Layout>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-foreground" />
        </div>
      </Layout>
    );

  if (cartError || productError)
    return (
      <Layout>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-muted-foreground">
            Error loading cart. Please reload the page.
          </p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-screen max-w-screen-lg mx-auto p-8 pb-20">
        <div className="flex justify-between items-center mx-auto">
          <div className="flex items-center gap-2">
            <p>Items in cart</p>
            <IoCartOutline className="text-xl" />
          </div>
          <Button
            variant={"link"}
            onClick={() => clearCart.mutate()}
            className="hover:text-red hover:no-underline text-sm font-normal mr-[-16px] sm:mr-0"
            disabled={clearCart.isPending || !cart?.products.length}
            isLoading={clearCart.isPending}
          >
            Clear cart
            <IoTrashOutline className="text-xl" />
          </Button>
        </div>
        <Divider className="bg-black opacity-20 mt-2 mb-6" />
        {productData ? (
          productData.map((product, index) => (
            <div key={index} className="mb-8">
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
